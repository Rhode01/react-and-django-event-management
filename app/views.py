from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import Student,Event
from django.contrib.sessions.models import Session
from .serializers import StudentSerializer, EventSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

@api_view(['GET'])
def get_user_data(request):
    if request.user.is_authenticated:
        user = User.objects.get(id=request.user.id)
        user_data = {
            'username': user.username,
            'id': user.id,
        }
        return Response({'success':True, 'user':user_data})
    else:
        return Response({'error': 'User not authenticated'})
    
@api_view(['POST'])
def login_user(request):
    if request.method =="POST":
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # token, _ = Token.objects.get_or_create(user=user)
            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                # 'token': token.key 
            }
            return Response({'success': True,'user':user_data},status=status.HTTP_200_OK)
        else:
            return Response({'success': False, 'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
@api_view(['POST'])
def signup_page(request):
    if request.method == "POST":
        username = request.data.get('username')
        pswd = request.data.get('password')
        if User.objects.all().filter(username=username).exists():
            return Response({'success': False, 'error':'Username already exists'})
        else:
            new_user = User.objects.create_user(username, password=pswd)
            new_user.save();
            return Response({'success': True,'info':'Successfully created a new account'})
@api_view(['GET'])
def logout_user(request):
    if request.method== 'GET':
        logout(request)
        return Response({'success':True})      
@api_view(['POST'])
def add_event(request):
    if request.method== "POST":
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            event_date = serializer.validated_data['date']
            event_time = serializer.validated_data['time']
            user = serializer.validated_data['user']
            if Event.objects.filter(date=event_date, time=event_time).exists():
                return Response({'success': False, 'error': 'An event already exists on the same date and time.'})
            else:
                serializer.save(user=user);  
                return Response({'success':True, 'info':'successfully created new event'},status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response({'success': False, 'error':'failed to create the event'})

@api_view(['GET'])
def user_Events(request,userID):
    if request.method == 'GET':
        events = Event.objects.filter(user=userID)
        serializer = EventSerializer(events, many=True)
        return Response({'success': True, 'events': serializer.data})

@api_view(['GET'])
def user_Clicked_Events(request,userId,eventId):
    if request.method == 'GET':
        events = Event.objects.filter(id=eventId,user=userId)
        serializer = EventSerializer(events, many=True)
        return Response({'success': True, 'event': serializer.data})

