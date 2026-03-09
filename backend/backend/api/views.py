from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, DestroyAPIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import TodoList, Comment, Like
from django.contrib.auth.models import User
from .serializers import TodoSerializer, UserCreateSerializer, CommentSerializer, LikeSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, AllowAny, IsAuthenticated
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

class LikeView(ListCreateAPIView):
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request, *args, **kwargs):
        post_id = request.data.get('post')
        # Check if this user already liked this post
        existing_like = Like.objects.filter(user=request.user, post_id=post_id)
        
        if existing_like.exists():
            # If it exists, UNLIKE it (Delete)
            existing_like.delete()
            return Response({"detail": "Unliked"}, status=status.HTTP_204_NO_CONTENT)
        
        # If it doesn't exist, LIKE it (Create)
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
