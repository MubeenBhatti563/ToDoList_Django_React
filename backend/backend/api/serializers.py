from rest_framework import serializers
from .models import TodoList
from django.contrib.auth.models import User

class TodoSerializer(serializers.ModelSerializer):
    """
    Todo List serializer for Lists items
    """
    class Meta:
        model = TodoList
        fields = "__all__"
        read_only_fields = ['user']

class UserCreateSerializer(serializers.ModelSerializer):
    """
    User creation serializer
    """
    class Meta:
        model = User
        fields = ["id","username", "password", "email"]
        extra_kwargs = {
            "password": {"write_only": True}
        }
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user