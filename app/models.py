from django.db import models
from django.contrib.auth.models import User
class Event(models.Model):
    event_name = models.CharField(max_length=10000)
    user = models.ForeignKey(User,on_delete= models.CASCADE, default=None)
    description = models.CharField(max_length=100000)
    date = models.DateField(auto_now=False)
    time = models.TimeField(auto_now=False, default=None)
    location = models.CharField(max_length=10000)
    def __str__(self):
        return self.event_name 
