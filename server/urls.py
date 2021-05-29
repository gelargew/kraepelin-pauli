from django.urls import path

from .views import RoomView, KraepelinView

urlpatterns = [
    path('room/', RoomView.as_view()),
    path('kraepelin/', KraepelinView.as_view())
]