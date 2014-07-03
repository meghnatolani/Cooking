import math
from paths import cpspath
from facebook import GraphAPI
import json
from django.http import HttpResponse
from django.utils import timezone
from mainapp.models import *
from django.views.decorators.csrf import csrf_exempt
import datetime
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import redirect, render
from django.db.models import Count, Min, Sum, Avg, Max
import uuid
import jinja2
import smtplib
from mainapp.checker import check
import thread
from django.http import *
from jinja2.ext import loopcontrols
import os
import urllib
import urllib2

def split_space(x):
    return x.strip().split()

jinja_environ = jinja2.Environment(loader=jinja2.FileSystemLoader([cpspath + '/cooking/UI']), extensions=[loopcontrols])
jinja_environ.filters['split_space'] = split_space

month=["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
website = "http://localhost:8000"


#Function to send emails using google smtplib. Takes email id and message as input.            
def send_email(msg, email):
    gmailLogin = 'knorrewebsite'
    gmailPas = 'meghna1234'
    fro = gmailLogin + "@gmail.com"
    
    to = email
    
    server = smtplib.SMTP_SSL('smtp.googlemail.com',SMTP_PORT)
    a = server.login( gmailLogin, gmailPas)
    server.sendmail(fro, to,msg)
    return (1,1)

##Function to send verification mail to user's email after he signs up.
def send_verification_email(request):
    if not request.user.is_authenticated():
        return HttpResponse(jinja_environ.get_template('index.html').render({"author":None}))

    try:
        request.user.author
    except:
        return HttpResponse(jinja_environ.get_template('notice.html').render({"author":None,
                                                                              "text":'No User associated!. Please go back or click  to go to the homepage' , "link": '/'}))
    entry=request.user
    subject = 'Knorre Verification Email'
    msg = 'Subject: %s \n\nYour email has been registered on <site>.\nPlease\
    #click on the following link to verify (or copy paste it in your browser if needed)\n\n\
    #%s/verify?code=%s\n\nIf you have not registered on our website, please ignore.' % (subject, website, entry.author.verified)
    
    x = send_email(msg, entry.email)
    if x[0]==0:
        return x[1]
    
    return HttpResponse(jinja_environ.get_template('notice.html').render({"author":request.user.author, "text":'<p>Verification Email sent! Please Check your email inbox.</p><p>To re-send verification email, click <a href=\'/send_verification_email/\'>here</a>.</p><p>Click <a href=\'/logout_do/\'>here</a> to go to the homepage and log-in again</p>', "link":'0'}))

#Calls index page
def index(request):
    return HttpResponse(jinja_environ.get_template('index.html').render({"author":None}))

#Top rated - featured page
def featured(request):
    return HttpResponse(jinja_environ.get_template('featured.html').render({"author":None}))
  
def biscuit_cake(request):
    return HttpResponse(jinja_environ.get_template('biscuit_cake.html').render({"author":None}))

@csrf_exempt  
def logindo(request):
    author = None
    if request.user.is_authenticated():
        author = request.user.author
    return HttpResponse(jinja_environ.get_template('logindo.html').render({"author":author}))
  
  
def share_recipes(request):
    return HttpResponse(jinja_environ.get_template('share_recipes.html').render({"author":None}))
  
def sandwich(request):
    return HttpResponse(jinja_environ.get_template('sandwich.html').render({"author":None}))
  

def forgot_pass(request):
    return HttpResponse(jinja_environ.get_template('forgot_pass.html').render({"author":None}))

def loggedin(request):
    author = None
    return HttpResponse(jinja_environ.get_template('loggedin.html').render({"author":request.user.author}))  


def biscuit_cake(request):
    return HttpResponse(jinja_environ.get_template('biscuit_cake.html').render({"author":None})) 

    
#Calls the page. If the user us already logged in, s/he will be redirected to dashboard.
@csrf_exempt
def signup(request):
    if request.user.is_authenticated():
        redirect_url = "/"
        if 'redirect_url' in request.REQUEST.keys():
            redirect_url = request.REQUEST['redirect_url']
        return HttpResponse(jinja_environ.get_template('loggedin.html').render({"author":None,"redirect_url":redirect_url}))

    else:
        return HttpResponse(jinja_environ.get_template('logindo.html').render({"author":None}))

    
#Calls the contact us page.
def contactus(request):
    author = None
    #if request.user.is_authenticated():
        #author = request.user.author
    return HttpResponse(jinja_environ.get_template('contact us.html').render({"author":author}))
  

#Called when a user clicks submit on new post form.
def share(request):
    global month
    #check for user login
    #retval = check(request)
    #if retval <> None:
        #return retval
    owner = request.user.author
        
    entry = Recipe(owner=owner,
                 name=request.REQUEST['name'],
                 short_des=request.REQUEST['short_des'], 
                 ingredients=request.REQUEST['ingredients'],
                 calories=request.REQUEST['calories'],
                 cost=request.REQUEST['cost'],
                 steps=request.REQUEST['steps'],
                 status=0,
                 )
    entry.save()
    return HttpResponse(jinja_environ.get_template('notice.html').render({"author":request.user.author,
                                                                          "text":'<p>Shared successfully. </p>Admin will view the recipe and may or may not accept it.',
                                                                          "link": '/loggedin/'}))
@csrf_exempt
def search(request):
    global month
    #check for user login
    author = None
    if request.user.is_authenticated():
        author = request.user.author
    
    name = request.REQUEST['name']
    
    result=Recipe.objects.filter(name=name, status=1)
    temp1=len(result)
    
    if len(result) > 0:
        return HttpResponse(jinja_environ.get_template('search.html').render({"result":result[0],"temp":1,"temp1":temp1}))
    else:
        return HttpResponse(jinja_environ.get_template('search.html').render({"result":None,"temp":0}))


#Call to open user's profile page.Sends data to be displayed.        
def profile(request):
    if not request.user.is_authenticated():
        return HttpResponse(jinja_environ.get_template('index.html').render({"author":None}))

    ##Check if user has an associated author
    ##(This will be false if the admin logs in)
    try:
        request.user.author
    except:
        return HttpResponse(jinja_environ.get_template('notice.html').render({"author":None,
                                                                              "text":'<p>No User associated!.</p><p>Please go back or click OK to go to the homepage</p>',"link":'/'}))

    try:
        authorid = request.REQUEST['id']
        if authorid == request.user.author.pk:
            return HttpResponse(jinja_environ.get_template('profile.html').render({"author":request.user.author, "profiler":request.user.author}))
        else:
            return HttpResponse(jinja_environ.get_template('profile.html').render({"author":request.user.author, "profiler":Author.objects.get(pk=authorid)}))
    except:
        return HttpResponse(jinja_environ.get_template('profile.html').render({"author":request.user.author, "profiler":request.user.author}))
   
  

#The call function for the manage account page.
def manage(request):
    if not request.user.is_authenticated():
        return HttpResponse(jinja_environ.get_template('index.html').render({"author":None}))
    
    
    result=Recipe.objects.filter(owner=request.user.author)
    length=len(result)
    ##Check if user has an associated author
    ##(This will be false if the admin logs in)
    try:
        request.user.author
    except:
        return HttpResponse(jinja_environ.get_template('notice.html').render({"author":None,
                                                                              "text":'<p>No User associated!.</p><p>Please go back or click OK to go to the homepage</p>',"link":'/'}))
    return HttpResponse(jinja_environ.get_template('manage.html').render({"author":request.user.author, "result":result,"length": length}))
    


#The call function for new post form.    
def share_recipes_loggedin(request):
    #retval = check(request)
    #if retval <> None:
        #return retval
    return HttpResponse(jinja_environ.get_template('share_recipes_loggedin.html').render({"author":request.user.author, 'author':request.user.author}))

#The call function for a post page. 
@csrf_exempt
def recipe_page(request):
    retval = check(request)
    if retval <> None:
        return retval
        
    #recipeobj=Recipe.objects.filter(pk=request.REQUEST['key'], status__lte=1)[0]
    return HttpResponse(jinja_environ.get_template('recipe_page.html').render({"author":request.user.author}))


#Called when a user clicks submit button in signup. Here a verification mail is also sent to the user.
@csrf_exempt
def signup_do(request):
   
    username = request.REQUEST['username']
    email = request.REQUEST['email']
    password = request.REQUEST['password']
    
        

    try:
        if len(User.objects.filter(email=email))<>0:
            return HttpResponse(jinja_environ.get_template('notice.html').render({"author":None,
                                                                                  "text":'<p>Someone has already registered using this email.</p><p>If you have forgotten your password, click <a href=\'/forgot_pass/\'</p><p>Click <a href=\'/logindo/\'>here</a> to go back to signup page.</p>',"link":'0'}))
    except:
        pass
    
    if '@' not in email or '.' not in email:
        return HttpResponse(jinja_environ.get_template('notice.html').render({"author":None,
                                                                              "text":'<p>Invalid email, please Enter again.</p><p>Go Back or click OK to go to signup page.</p>',"link":"/logindo/"}))
    
    #car_number = request.REQUEST['car_number']
    
    #if first_name == "":
        #first_name = username
    
    try:
        user = User.objects.create_user(username, email, password)
        #user.first_name = first_name
        #user.last_name = last_name
        user.save()
        entry = Author(user=user)
        
        entry.save()
        
        #send email to user
        login_do(request)
        
        #return send_verification_email(request)
        return HttpResponse(jinja_environ.get_template('notice.html').render({"author":request.user.author, "text":'Signup Successful. Click OK to go to dashboard', "link":'/loggedin/'}))
        
        
    except Exception as e:
        return HttpResponse(jinja_environ.get_template('notice.html').render({"author":None,
                                                                              "text":'<p>Username already exists. Please enter some other username.</p><p>Go Back or click OK to go to signup again.</p>',"link":'/logindo/'}))
    


#Called when a user clicks logout button.
def logout_do(request):
    logout(request)
    redirect_url = "/index/"
    return HttpResponse(jinja_environ.get_template('redirect.html').render({"author":None,"redirect_url":redirect_url}))
    
#Called when a user clicks login button. 
@csrf_exempt
def login_do(request):
    username = request.REQUEST['username']
    password = request.REQUEST['password']
    user = authenticate(username=username, password=password)
    
    if user is not None:
        if user.is_active:
            login(request, user)
            if 'redirect' in request.REQUEST.keys():
                return HttpResponse(jinja_environ.get_template('redirect.html').render({"author":None,"redirect_url":request.REQUEST['redirect'].replace("!!__!!","&")}))
            return HttpResponse(jinja_environ.get_template('redirect.html').render({"author":None,"redirect_url":"/loggedin/"}))
        else:
            # Return a 'disabled account' error message
            if "js" in request.REQUEST.keys():
                return HttpResponse("disabled")
            return HttpResponse(jinja_environ.get_template('notice.html').render({"author":None,
                                                                                "text":'<p>Disabled Account.</p><p>Please go back or click OK to go to the homepage</p>',"link":'/'}))
        
    else:
        # Return an 'invalid login' error message.
        if "js" in request.REQUEST.keys():
            if len(User.objects.filter(username=request.REQUEST['username'])) == 0:
                return HttpResponse("inv_user")
            return HttpResponse("inv_pass")
        return HttpResponse(jinja_environ.get_template('notice.html').render({"author":None,
                                                                              "text":'Invalid Login. Please go back or click OK to go to the homepage',"link":'/'}))
    