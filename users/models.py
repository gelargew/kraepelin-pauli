from django.contrib.auth.models import BaseUserManager, AbstractUser, UserManager
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.

class UserManager(UserManager):
    def get_by_natural_key(self, username:str) -> str:
        try:
            return self.get(username=username)
        except self.model.DoesNotExist:
            return self.get(is_active=True, email=username)


class User(AbstractUser):
    email = models.EmailField(max_length=100, unique=True)
    is_premium = models.BooleanField(default=False)
    room_owner_privileges = models.IntegerField(default=0, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    

    class Meta:
        db_table = 'users'
        verbose_name = 'user'

    def get_username(self):
        return self.email

    def __str__(self) -> str:
        if self.is_staff or self.is_superuser:
            return self.username
        return self.email or '<anonymous>'
    
    def get_full_name(self) -> str:
        full_name = super().get_full_name()
        if full_name:
            return full_name
        return self.get_short_name()

    def get_short_name(self) -> str:
        short_name = super().get_short_name()
        if short_name:
            return short_name
        return self.email

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
