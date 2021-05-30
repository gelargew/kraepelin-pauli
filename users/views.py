import json
from django.http.response import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ObjectDoesNotExist



from .models import User
from .serializers import UserSerializer

DummyUser = {
    'username': '',
    'is_authenticated': False,
    'email': ''
    
}

def get_current_user(request):
    if request.user.is_authenticated:   
        context = UserSerializer(request.user).data
        print(context)
        return JsonResponse(context)
    
    return JsonResponse(DummyUser)


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
    print(data['email'])
    user, created = User.objects.get_or_create(email=data['email'])
    if not created and user.is_active:
        return HttpResponse(status=400)

    user.is_active = False
    user.save()
    context = UserSerializer(user).data
    print(context)

    return JsonResponse(context, status=201)


def user_activate(request):
    if request.method != 'PATCH' or request.user.is_authenticated:
        return HttpResponse(status=400)

    data = json.loads(request.body)
    try:
        user = User.objects.get(**data)
        user.activate()
        print(user)
    except ObjectDoesNotExist:
        return False


def user_logout(request):
    logout(request)

    return JsonResponse(DummyUser, status=200)

