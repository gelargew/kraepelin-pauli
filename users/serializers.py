from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 
            'email', 
            'first_name', 
            'last_name', 
            'is_authenticated', 
            'is_premium', 
            'room_owner_privileges', 
            'auth_token'
            )