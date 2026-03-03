from django.db import models
from django.contrib.auth.models import User

class TodoList(models.Model):
    """
    Represents a task list entry owned by a specific user.
    """
    title = models.CharField(max_length=150) # null=False is default in Django
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) # Renamed for clarity
    
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name="todos" # Allows user.todos.all()
    )

    class Meta:
        verbose_name = "Todo List"
        verbose_name_plural = "Todo Lists"
        ordering = ['-created_at'] # Newest first

    def __str__(self):
        return f"{self.title} | {self.user.username}"
    
class Comment(models.Model):
    """
    Comments on each post by user
    """
    comment = models.CharField(max_length=250)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="user_comment"
    )
    post = models.ForeignKey(
        TodoList,
        on_delete=models.CASCADE,
        related_name="post_comment"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]
    
    def __str__(self):
        return self.comment
    
class Like(models.Model): # Singular name
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name="user_like"
    )
    post = models.ForeignKey(
        TodoList, 
        on_delete=models.CASCADE, 
        related_name="post_like"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'post'], 
                name='unique_user_like'
            )
        ]

    def __str__(self):
        return f"{self.user.username} liked {self.post.title}"