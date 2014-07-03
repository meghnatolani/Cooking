from django.conf.urls import patterns, url
#from django.conf.urls.defaults import handler404, handler500

from mainapp import views, errors
from django.http import *

urlpatterns = patterns('',
    #Actions
    url(r'^$', views.index, name='index'),
    url(r'^share/', views.share, name='share'),
    url(r'^signup_do/', views.signup_do, name='signup_do'),
    url(r'^login_do/', views.login_do, name='login_do'),
    url(r'^logout_do/', views.logout_do, name='logout_do'),
    url(r'^search/', views.search, name='search'),
    #url(r'^search_element/', views.search, name = 'search'),
    url(r'^profile/', views.profile, name='profile'),
    #url(r'^verify/', views.verify, name='verify'),
    url(r'^send_verification_email/', views.send_verification_email, name='send_verification_email'),
    #url(r'^change_pass/', views.change_pass, name = 'change_pass'),
    #url(r'^forgot_password/', views.forgot_password, name = 'forgot_password'),
    #url(r'^search_element/', views.search, name = 'search'),
    #url(r'^reset_edited/', views.reset_edited, name='reset_edited'),
    #url(r'^cancel_share/', views.cancel_share, name='cancel_share'),
    #url(r'^edit_share/', views.edit_share, name='edit_share'),
    
    #Pages
      url(r'^share_recipes_loggedin/', views.share_recipes_loggedin, name='share_recipes_loggedin'),
      url(r'^profile/', views.profile, name='profile'),
      url(r'^signup/', views.signup, name='signup'),
      url(r'^manage/', views.manage, name='manage'),
      url(r'^share_recipes/', views.share_recipes, name='share_recipes'),
      url(r'^logindo/', views.logindo, name='logindo'), 
      url(r'^loggedin/', views.loggedin, name='loggedin'),
      url(r'^featured/', views.featured, name='featured'),
      url(r'^index/', views.index, name = 'index'),
      url(r'^loggedin/', views.loggedin, name = 'loggedin'),
      url(r'^biscuit_cake/', views.biscuit_cake, name = 'biscuit_cake'),
      url(r'^contactus/', views.contactus, name='contactus'),
      url(r'^sandwich/', views.sandwich, name='sandwich'),
      #url(r'^search/', views.search, name='search'),
      url(r'^recipe_page/',views.recipe_page, name='recipe_page'),
      url(r'^forgot_pass/',views.forgot_pass, name='forgot_pass'),
   
 	
    #temp for check
    #url(r'^tempage/', views.tempage, name='tempage'),    
)
