from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Task
from .forms import TaskForm

#list all the tasks for the logged in user

@login_required
def task_list(request):
    tasks=Task.objects.filter(owner=request.user)
    return render(request, 'tasks/task_list.html', {'tasks': tasks})

#creating new task

@login_required
def createTask(request):
    if request.method =='POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            task= form.save(commit=False)
            task.owner=request.user
            task.save()
            return redirect('task_list')

#Update task
def taskUpdate(request, pk):
    task= get_object_or_404(Task, pk=pk, owner=request.user)
    if request.method== 'POST':
        form= TaskForm(request.POST, isinstance=task)
        if form.is_valid():
            form,save()
            return redirect('task_list')

#Delete task
def taskDeleted(request, pk):
    task= get_object_or_404(Task, pk=pk, owner=request.user)
    if request.method== 'POST':
        task.delete()
        return redirect('task_list')
    return render(request, 'tasks/task_confirm_delete.html', {'task': task})
