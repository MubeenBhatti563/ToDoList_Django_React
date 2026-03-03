from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, DestroyAPIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import TodoList, Comment, Like
from django.contrib.auth.models import User
from .serializers import TodoSerializer, UserCreateSerializer, CommentSerializer, LikeSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class TodoView(ListCreateAPIView):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if (user.is_authenticated):
            return TodoList.objects.filter(user=user)
        return TodoList.objects.none()
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class TodoOneView(RetrieveUpdateDestroyAPIView):
    queryset = TodoList.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [IsAdminUser]
    lookup_field = "pk"

    def get_queryset(self):
        return TodoList.objects.filter(user=self.request.user)

class CreateUser(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny]

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class CommentView(ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Comment.objects.all()
        post_id = self.request.query_params.get('post')

        if post_id is not None:
            queryset = queryset.filter(post_id=post_id)

        return queryset
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class LikeView(ListCreateAPIView, DestroyAPIView):
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        # Corrected 'query_params'
        post_id = self.request.query_params.get("post")
        if post_id is not None:
            return Like.objects.filter(post_id=post_id)
        return Like.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def delete(self, request, *args, **kwargs):
        """
        Custom delete to allow un-liking by Post ID instead of Like ID
        """
        post_id = request.data.get('post')
        like = Like.objects.filter(user=request.user, post_id=post_id)
        
        if like.exists():
            like.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "Like not found"}, status=status.HTTP_404_NOT_FOUND)