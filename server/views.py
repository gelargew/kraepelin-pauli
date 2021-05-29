from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from django.core.mail import send_mass_mail,send_mail
from django.conf import settings
from django.http import HttpResponse

from .serializers import KraepelinSerializer, RoomSerializer
from .models import Kraepelin, Room


class RoomView(ListCreateAPIView):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()


class KraepelinView(ListCreateAPIView):
    serializer_class = KraepelinSerializer
    queryset = Kraepelin.objects.all()



def sendm(request):
    y = send_mail('heelo', 'bodymessage', 'KPauliApp', recipient_list=['gelargew@gmail.com',])
    print(y)

    return HttpResponse(status=200)