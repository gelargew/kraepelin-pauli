from django.db import models
from django.conf import settings
from django.core.validators import int_list_validator, validate_comma_separated_integer_list
from django.utils import timezone

from datetime import timedelta
import string
import random

def generate_unique_key():
    s = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
    return s


class Room(models.Model):
    room_id = models.CharField(default=generate_unique_key, editable=False, max_length=12, primary_key=True)
    title = models.CharField(max_length=100)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.RESTRICT, related_name='created_roomm')
    due_date = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return f'{self.due_date}  -  {self.title} -  {self.kraepelin_set.count()}'


class Kraepelin(models.Model):
    
    NUMERAL_SYSTEM_CHOICES = (
        ('latin', 'latin'),
        ('kanji', 'kanji'),
    )

    STATUS_CHOICES = (
        ('active', 'active'),
        ('expired', 'expired'),
        ('finished', 'finished')
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='result')
    timestamp = models.DateTimeField(auto_now_add=True)
    timeleft = models.IntegerField(default=7200, blank=True)
    numeral_system = models.CharField(choices=NUMERAL_SYSTEM_CHOICES, default='latin', max_length=32)
    numbers = models.CharField(validators=[validate_comma_separated_integer_list], blank=True, null=True, max_length=30000)
    answers = models.CharField(max_length=30000)
    results = models.CharField(validators=[int_list_validator(',', allow_negative=True)], max_length=30000)
    status = models.CharField(choices=STATUS_CHOICES, default='active', max_length=32)
    room = models.ForeignKey(Room, on_delete=models.RESTRICT, null=True, blank=True)


    def __str__(self) -> str:
        return f' {self.status}  -  {self.user}'




