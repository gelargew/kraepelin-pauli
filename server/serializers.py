from rest_framework import serializers

from .models import Room, Kraepelin


class KraepelinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kraepelin
        fields = '__all__'


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'