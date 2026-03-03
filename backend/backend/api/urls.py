from django.urls import path
from .views import TodoView, TodoOneView, CreateUser, CommentView, LikeView

urlpatterns = [
    # Todo Paths
    path("lists/", TodoView.as_view(), name="list-create"),
    path("lists/<int:pk>/", TodoOneView.as_view(), name="list-detail"),
    # User Registration
    path("user/register/", CreateUser.as_view(), name="user-registration"),
    # Comments (Remove <int:pk> here to allow filtering via ?post=ID)
    path("comments/", CommentView.as_view(), name="comment-list-create"),
    # Likes (Remove <int:pk> here to allow filtering via ?post=ID)
    path("likes/", LikeView.as_view(), name="like-list-create"),
]
