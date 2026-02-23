from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import TodoList
from .serializers import TodoSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser

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
    