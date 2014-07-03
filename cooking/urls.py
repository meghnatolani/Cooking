from django.conf.urls import patterns, include, url
from django.http import *

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from mainapp import errors
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Receipe.views.home', name='home'),
    # url(r'^Receipe/', include('Receipe.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    #url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('mainapp.urls')),
)

#handler404 = 'carpoolsen.carpoolsen.views.errview',
#handler500 = 'carpoolsen.carpoolsen.views.errview',
