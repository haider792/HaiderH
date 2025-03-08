const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const dataPath = path.join(__dirname, 'data', 'tasks.json');

// Middleware
app.use(cors());
app.use(express.json());

// Ensure tasks.json exists
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify([]));
}

// Read tasks from JSON file
const getTasks = () => {
  const tasks = fs.readFileSync(dataPath);
  return JSON.parse(tasks);
};

// Write tasks to JSON file
const saveTasks = (tasks) => {
  fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2));
};

// Get all tasks
app.get('/tasks', (req, res) => {
  try {
    const tasks = getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// Add new task
app.post('/tasks', (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const tasks = getTasks();
    const newTask = {
      id: Date.now().toString(),
      title,
      description: description || '',
      completed: false,
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    saveTasks(tasks);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
});

// Update task
app.put('/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    saveTasks(tasks);
    res.json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;
    const tasks = getTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);

    if (tasks.length === filteredTasks.length) {
      return res.status(404).json({ error: 'Task not found' });
    }

    saveTasks(filteredTasks);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 