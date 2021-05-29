from django.contrib import admin

from .models import Room, Kraepelin


admin.site.register((Room, Kraepelin))
