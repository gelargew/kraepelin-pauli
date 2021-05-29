from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView

from .serializers import KraepelinSerializer, RoomSerializer
from .models import Kraepelin, Room


class RoomView(ListCreateAPIView):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()


class KraepelinView(ListCreateAPIView):
    serializer_class = KraepelinSerializer
    queryset = Kraepelin.objects.all()