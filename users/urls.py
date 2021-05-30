from django.urls import path

from .views import user_activate, user_login, user_logout, get_current_user, user_register


urlpatterns = [
    path('current_user/', get_current_user),
    path('login/', user_login),
    path('register/', user_register),
    path('logout/', user_logout),
    path('activate/', user_activate)
]