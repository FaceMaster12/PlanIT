async function loadTasks() {
    const response = await fetch('/api/tasks/');
    const tasks = await response.json();
    const ul = document.getElementById('task-list');
    ul.innerHTML = '';

   tasks.forEach(task => {
      const li = document.createElement('li');

    li.innerHTML = `
    <div class="task-info">
        <input type="checkbox" ${task.completed ? 'checked' : ''}
            onchange="toggleTask(${task.id}, this.checked)">
        <strong style="${task.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
            ${task.title}
        </strong>
        <span class="priority ${task.priority.toLowerCase()}">
            ${task.priority}
        </span>
        ${getDueStatus(task.due_date)}
    </div>
    <div class="task-actions">
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    </div>
`;

    ul.appendChild(li);
});

}

async function toggleTask(id, completed) {
    await fetch(`/api/tasks/${id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        body: JSON.stringify({ completed: completed })
    });
}

async function deleteTask(id) {
    await fetch(`/api/tasks/${id}/`, {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
    loadTasks();
}

function getCSRFToken() {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        .split('=')[1];
}

document.addEventListener('DOMContentLoaded', loadTasks);

async function createTask() {
    const title = document.getElementById('new-task').value;
    const priority = document.getElementById('task-priority').value;
    const dueDate = document.getElementById('task-due-date').value;

    await fetch('/api/tasks/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        body: JSON.stringify({
            title: title,
            priority: priority,
            due_date: dueDate ? new Date(dueDate).toISOString() : null
        })
    });

    loadTasks();
}


function getDueStatus(dueDate) {
    if (!dueDate) return '';

    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

    if (diff < 0) {
        return `<span class="due overdue">Overdue</span>`;
    } else if (days === 0 && hours <= 24) {
        return `<span class="due today">Due in ${hours}h</span>`;
    } else {
        return `<span class="due normal">Due in ${days}d</span>`;
    }
}
