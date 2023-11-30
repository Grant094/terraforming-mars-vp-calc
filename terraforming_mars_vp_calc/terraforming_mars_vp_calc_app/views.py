from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import *

# Create your views here.
def index(request):
    latest_game = Game.objects.order_by("timestamp")[0]
    context = {
        "latest_game": latest_game,
    }
    return render(request, "terraforming_mars_vp_calc_app/index.html", context)

def game(request, game_id):
    return HttpResponse("You're looking at game %s." % game_id)

def person(request, person_id):
    return HttpResponse("You're looking at person %s." % person_id)