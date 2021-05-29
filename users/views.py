import json
from django.http.response import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout



from .models import User
from .serializers import UserSerializer

def get_current_user(request):
    context = UserSerializer(request.user).data

    return JsonResponse(context)


def user_login(request):
    if request.method == 'POST':      
        data = json.loads(request.body)
        user = authenticate(**data)
        if user:
            login(request, user)
            context = UserSerializer(user).data
            
            return JsonResponse(context, status=200)

    return HttpResponse(status=400)


def user_register(request):
    if request.user.is_authenticated or request.method != 'POST':

        return HttpResponse(status=400)

    data = json.loads(request.body)
    user = authenticate(**data)
    if not user:
        user = User.objects.create_user(**data)
        user.save()
        login(request, user)
        context = UserSerializer(user).data

        return JsonResponse(context, status=201)

    return HttpResponse(status=400)


def user_logout(request):
    logout(request)
    context = UserSerializer(request.user).data

    return JsonResponse(context, status=200)

