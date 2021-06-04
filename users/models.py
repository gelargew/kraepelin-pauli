import string
import random

from django.contrib.auth.models import  AbstractUser, UserManager
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.db import models

def generate_auth_token():
    s = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return s


class User(AbstractUser):
    username = models.CharField(max_length=16, blank=True, null=True)
    email = models.EmailField(max_length=100, unique=True)
    is_premium = models.BooleanField(default=False)
    room_owner_privileges = models.IntegerField(default=0, blank=True)
    auth_token = models.CharField(max_length=10, default=generate_auth_token, editable=False, null=True, blank=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)

    def get_username(self):
        return self.email

    def __str__(self) -> str:
        if self.is_staff or self.is_superuser:
            return self.username
        return self.email or '<anonymous>'


    def validate_unique(self, exclude: None) -> None:
        """
        Since the email address is used as the primary identifier, we must ensure that it is
        unique. However, since this constraint only applies to active users, it can't be done
        through a field declaration via a database UNIQUE index.
        Inactive users can't login anyway, so we don't need a unique constraint for them.
        """
        super().validate_unique(exclude=exclude)    
        if self.email and get_user_model().objects.exclude(id=self.id).filter(is_active=True, email__iexact=self.email).exists():
            msg =_("A customer with the e-mail `{self.email}` already exists.")
            raise ValidationError({'email': msg})

    def activate(self) -> None:
        self.is_active = True
        super().save()
    
    def refresh_token(self):
        self.auth_token = generate_auth_token()
        super().save()
