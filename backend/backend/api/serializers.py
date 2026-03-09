from rest_framework import serializers
from .models import TodoList, Comment, Like
from django.contrib.auth.models import User

class TodoSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")
    like_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    # Note: source="post_comment.count" works if you want the count directly
    comments_count = serializers.IntegerField(source="post_comment.count", read_only=True)

    class Meta:
        model = TodoList
        # Added 'username' and 'comments_count' here:
        fields = [
            'id', 'title', 'content', 'created_at', 
            'user', 'username', 'like_count', 
            'is_liked', 'comments_count'
        ]
        read_only_fields = ['user']

    def get_like_count(self, obj):
        # Counts all Like objects related to this post
        return obj.post_like.count()

    def get_is_liked(self, obj):
        # Checks if the CURRENT user has a Like object for this post
        user = self.context['request'].user
        if user.is_authenticated:
            return obj.post_like.filter(user=user).exists()
        return False

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