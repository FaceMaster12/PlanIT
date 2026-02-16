from django.db import models
from django.contrib.auth.models import User

PRIORITY_CHOICES = [
    ('HIGH', 'High'),
    ('MEDIUM', 'Medium'),
    ('LOW', 'Low'),
]

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)  # don't manually set default
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='MEDIUM')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
  
    due_date = models.DateTimeField(null=True, blank=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
