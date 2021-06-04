from django.shortcuts import redirect, render

# Create your views here.


def index(request):
    return render(request, 'app/index.html')

def redirect_to_index(request):
    return redirect('index')