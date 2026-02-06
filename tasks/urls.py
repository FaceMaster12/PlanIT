from django.urls import path
from . import views 


urlpatterns = [
    #path('admin/', admin.site.urls),
    path('', views.task_list, name='task_list'),
    path('create/', views.createTask, name='create_task'),
    path('update/<int:pk>/', views.taskUpdate, name='update_task'),
    path('delete/<int:pk>/', views.taskDeleted, name='delete_task'),
]