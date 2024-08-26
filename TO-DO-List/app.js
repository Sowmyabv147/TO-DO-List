$(document).ready(function() {
    // Load tasks from localStorage
    loadTasks();

    // Add a new task
    $('#add-task-btn').click(function() {
        const taskText = $('#new-task').val();
        if (taskText) {
            addTask(taskText);
            $('#new-task').val('');
        }
    });

    // Mark task as completed
    $(document).on('click', '.complete-btn', function() {
        const li = $(this).closest('li');
        li.toggleClass('completed');
        saveTasks();
    });

    // Edit an existing task
    $(document).on('click', '.edit-btn', function() {
        const li = $(this).closest('li');
        const newText = prompt('Edit your task:', li.text());
        if (newText) {
            li.contents().first().replaceWith(newText);
            saveTasks();
        }
    });

    // Delete a task
    $(document).on('click', '.delete-btn', function() {
        $(this).closest('li').remove();
        saveTasks();
    });

    // Function to add a task
    function addTask(taskText) {
        const taskItem = `<li>${taskText} 
            <button class="complete-btn">Complete</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </li>`;
        $('#task-list').append(taskItem);
        saveTasks();
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = `<li class="${task.completed ? 'completed' : ''}">${task.text} 
                <button class="complete-btn">Complete</button>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </li>`;
            $('#task-list').append(taskItem);
        });
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        $('#task-list li').each(function() {
            const text = $(this).contents().first().text();
            const completed = $(this).hasClass('completed');
            tasks.push({ text, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
