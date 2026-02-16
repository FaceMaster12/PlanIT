from django.urls import path
from . import views

urlpatterns = [
    path('tasks/', views.tasks_list, name='tasks_list'),  # <-- use the exact function name
    path('tasks/create/', views.task_create, name='task_create'),
    path('tasks/<int:pk>/update/', views.task_update, name='task_update'),
    path('tasks/<int:pk>/delete/', views.task_delete, name='task_delete'),
 

]
