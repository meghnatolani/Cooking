#from facebook import GraphAPI
import json
from django.http import HttpResponse
from django.utils import timezone
from mainapp.models import *
from django.views.decorators.csrf import csrf_exempt
import datetime
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import redirect
from django.db.models import Count, Min, Sum, Avg
import uuid
import jinja2
import smtplib
from mainapp.checker import check
jinja_environ = jinja2.Environment(loader=jinja2.FileSystemLoader([cpspath + '/cooking/UI']));

def err404(request):
    rider = None
    return HttpResponse(jinja_environ.get_template('404.htm').render({"author":None}))
    return HttpResponse("Error")