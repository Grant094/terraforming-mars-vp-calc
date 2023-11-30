from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the TM VP Calc index.")

def game(request, game_id):
    return HttpResponse("You're looking at game %s." % game_id)

def person(request, person_id):
    return HttpResponse("You're looking at person %s." % person_id)