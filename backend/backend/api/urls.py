from django.urls import path
from .views import TodoView, TodoOneView, CreateUser

urlpatterns = [
    path("lists/", TodoView.as_view(), name="list-create"),
    path("lists/<int:pk>", TodoOneView.as_view(), name="list-detail"),
    path("user/register/", CreateUser.as_view(), name="user-registration")
]
