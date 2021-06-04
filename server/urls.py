from django.urls import path

from .views import RoomView, KraepelinView, sendm

urlpatterns = [
    path('room/', RoomView.as_view()),
    path('kraepelin/', KraepelinView.as_view()),
    path('testmail/', sendm),

]