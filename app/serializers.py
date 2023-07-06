from rest_framework import serializers
from .models import Student, Event
from datetime import datetime
from django.contrib.auth.models import User

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student 
        fields = ('pk', 'name', 'email', 'document', 'phone', 'registrationDate')

class EventSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = Event
        fields = ('pk', 'event_name', 'description', 'date', 'location', 'time', 'user')
    