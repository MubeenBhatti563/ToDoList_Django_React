from rest_framework import serializers
from .models import TodoList, Comment, Like
from django.contrib.auth.models import User

class TodoSerializer(serializers.ModelSerializer):
    """
    Todo List serializer for Lists items
    """
    username = serializers.ReadOnlyField(source="user.username")
    likes_count = serializers.IntegerField(source="post_like.count", read_only=True)
    comments_count = serializers.IntegerField(source="post_comment.count", read_only=True)
    class Meta:
        model = TodoList
        fields = ["id", "title", "content", "username", "user", "likes_count", "comments_count", "created_at"]
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
    
class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer for comment of user on post
    """
    username = serializers.ReadOnlyField(source="user.username")
    class Meta:
        model = Comment
        fields = ["id", "comment", "username", "user", "post", "created_at"]
        read_only_fields = ["user"]

class LikeSerializer(serializers.ModelSerializer):
    """
    Serializer for like of user on post
    """
    class Meta:
        model = Like
        fields = "__all__"
        read_only_fields = ["user"]