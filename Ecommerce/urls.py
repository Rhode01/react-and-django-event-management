
from django.contrib import admin
from django.urls import path, re_path
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/login/$', views.login_user),
    re_path(r'^api/signup/$', views.signup_page),
    re_path(r'^api/userSession/$',views.get_user_data),
    re_path(r'^api/logout/$',views.logout_user),
    re_path(r'^api/addEvent/$', views.add_event),
    re_path(r'^api/userEvents/(?P<userID>\d+)/$', views.user_Events),
    re_path(r'^api/event/(?P<userId>\d+)/(?P<eventId>\d+)/$', views.user_Clicked_Events),
]
