from rest_framework import serializers
from .models import TodoList

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = "__all__"
        read_only_fields = ['user']