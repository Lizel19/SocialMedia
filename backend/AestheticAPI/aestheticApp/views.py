from rest_framework import exceptions
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from aestheticApp.authentication import create_access_token, JWTAuthentication, create_refresh_token, decode_refresh_token
from rest_framework.authentication import get_authorization_header
from aestheticApp.models import User
from .serializers import UserSerializer,OutfitSerializer
from rest_framework import viewsets
from django.http import HttpResponse
from .models import Outfit


from rest_framework import viewsets


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed/created/edited/deleted.
    """
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer
    update_data_pk_field = 'id'

class OutfitViewSet(viewsets.ModelViewSet):
    queryset = Outfit.objects.all()
    serializer_class = OutfitSerializer

    def post(self, request, *args, **kwargs):
        cover = request.data['cover']
        title = request.data['title']
        Outfit.objects.create(title=title, cover=cover)
        return HttpResponse({'message': 'Outfit created'}, status=200)

class RegisterAPIView(APIView):
    def post(self, request):
        data = request.data
        if data['password'] != data['password_confirm']:
            raise exceptions.APIException('Password not match')
        serializer = UserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class UserAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    def get(self, request):
        return Response(UserSerializer(request.user).data)
        
class LoginAPIView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()
        if user is None:
            raise exceptions.AuthenticationFailed('Invalid Credentials')
        if not user.check_password(password):
            raise exceptions.AuthenticationFailed('Invalid Credentials')
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)
        response = Response()
        response.set_cookie(key='refresh_token', value=refresh_token, httponly=True)
        response.data = {
            'token': access_token
        }
        return response

class RefreshAPIView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        id = decode_refresh_token(refresh_token)
        access_token = create_access_token(id)
        return Response({
            'token': access_token
        })

class LogoutAPIView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie(key='refresh_token')
        response.data = {
            'message': 'success'
        }
        return response
