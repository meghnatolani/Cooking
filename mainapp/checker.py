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

jinja_environ = jinja2.Environment(loader=jinja2.FileSystemLoader([cpspath + '/cooking/UI']));

#Checker function used to see if user is logged in and verified etc. Made separately instead of writing repeatedly
def check(request):
    
    #Check if user is logged in
    if not request.user.is_authenticated():
        return HttpResponse(jinja_environ.get_template('index.html').render({"author":None}))

    #Check if user has an associated author
    #(This will be false if the admin logs in)
    try:
        request.user.author
    except:
        return HttpResponse(jinja_environ.get_template('notice.html').render({"author":None,
                                                                              "text":'<p>No User associated!.</p><p>Please go back or click OK to log out.</p>',"link":'/logout_do/'}))
    
    #Check if user has been verified
    #if request.user.author.verified <> '1':
        #return HttpResponse(jinja_environ.get_template('notice.html').render({"author":request.user.author,
                                                                              #"text":'<p>Your account has not been verified. Please check your email and click on the verification link.<p>To re-send verification email, click <a href=\'/send_verification_email/\'>here</a><p>',
                                                                              #"link":'0'}))

    return None 
