from django.urls import path
from .views import TodoView, TodoOneView

urlpatterns = [
    path("lists/", TodoView.as_view(), name="list-create"),
    path("lists/<int:pk>", TodoOneView.as_view(), name="list-detail")
]
