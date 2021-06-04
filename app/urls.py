from django.urls import path, re_path
from .views import index, redirect_to_index

urlpatterns = [
    path('', index, name='index'),
    re_path(r'^(?!admin)^(?!api)^(?!media).*', redirect_to_index)
]