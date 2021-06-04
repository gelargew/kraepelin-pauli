import json
from django.core.mail import send_mail
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
        return HttpResponse(status=409)

    user.is_active = False
    user.refresh_token()
    email_body = f'your authentication token is {user.auth_token}'
    send_mail(
        'Verify your account', 
        email_body,
        'kraepelin_pauli@rustmail.com',
        [data['email']],
        True
        )
    user.save()
    print(user.auth_token)

    return JsonResponse(data, status=201)


def user_activate(request):
    if request.method != 'PATCH' or request.user.is_authenticated:
        return HttpResponse(status=400)

    data = json.loads(request.body)
    try:
        password = data.pop('password')
    except KeyError:
        password = None
    try:
        user = User.objects.get(**data)
        if password and user.is_active:
            user.set_password(password)
            user.auth_token = None
            user.save()
            login(request, user)
            return JsonResponse(UserSerializer(user).data, status=200)
        else:
            user.is_active = True
            user.save()
            return HttpResponse(status=200)
        
    except ObjectDoesNotExist:
        return HttpResponse(status=404)

    

def user_logout(request):
    logout(request)

    return JsonResponse(DummyUser, status=200)


def user_update(request):
    if request.method != 'PATCH' or not request.user.is_authenticated:
        return HttpResponse(status=400)
    
    user = request.user
    data = json.loads(request.body)
    try:
        request.user.password == data.pop('password')
    except:
        return HttpResponse(status=400)
    for key, val in data.items():
        setattr(user, key, val)
    user.save()

    return JsonResponse(UserSerializer(user).data, status=200)