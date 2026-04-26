const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

let students = [];

// 1. ALL ROUTES GO HERE
app.get('/getStudents', (req, res) => {
    res.json(students);
});

app.post('/addStudent', (req, res) => {
    students.push(req.body);
    res.json({ success: true });
});

app.put('/updateStudent/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < students.length) {
        students[index] = req.body;
        return res.json({ success: true, message: "Updated" });
    }
    res.status(404).json({ success: false, message: "Not found" });
});

// The DELETE route is now placed correctly before app.listen
app.delete('/deleteStudent/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < students.length) {
        students.splice(index, 1);
        return res.json({ success: true, message: "Student deleted successfully!" });
    } else {
        return res.status(404).json({ success: false, message: "Student not found." });
    }
});

// 2. STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// 3. START SERVER (Always keep this at the very bottom)
// 3. START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});