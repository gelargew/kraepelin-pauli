from django.urls import path

from .views import RoomView, KraepelinView

urlpatterns = [
    path('rooms/', RoomView.as_view()),
    path('kraepelins/', KraepelinView.as_view())
]