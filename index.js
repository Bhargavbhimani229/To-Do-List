const express = require('express');
const app = express();
const port = 3000;

let tasks = [];
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { tasks });
});


app.post('/add', (req, res) => {
    const { id, task } = req.body; 
    tasks.push({ id, task }); 
    res.redirect('/'); 
});

app.get('/delete', (req, res) => {
    const taskId = req.query.id;
    tasks = tasks.filter(task => task.id !== taskId); 
    res.redirect('/'); 
});

app.get('/edit', (req, res) => {
    const taskId = req.query.id;
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        res.render('edit', { task });
    } else {
        res.redirect('/'); 
    }
});

app.post('/edit', (req, res) => {
    const { id, task } = req.body; 
    let taskToUpdate = tasks.find(t => t.id === id);
    if (taskToUpdate) {
        taskToUpdate.task = task; 
    }
    res.redirect('/'); 
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
