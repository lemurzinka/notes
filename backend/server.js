const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

const path = require('path');
const DATA_PATH = path.join(__dirname, 'data', 'notes.json');


// Read notes from file
const readNotes = () => {
    try {
        if (!fs.existsSync(DATA_PATH)) {
            console.log("File not found. Creating new file...");
            fs.writeFileSync(DATA_PATH, '[]', 'utf8');
        }
        const data = fs.readFileSync(DATA_PATH, 'utf8');
        console.log("Read notes:", data);
        return JSON.parse(data);
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};


// Write notes to file
const writeNotes = (notes) => {
    fs.writeFileSync(DATA_PATH, JSON.stringify(notes, null, 2), 'utf8');
};

// Get all notes
app.get('/notes', (req, res) => {
    res.json(readNotes());
});

// Create a new note
app.post('/notes', (req, res) => {
    let notes = readNotes();
    const { title, content } = req.body;
    const newNote = { id: notes.length + 1, title, content, createdAt: new Date(), updatedAt: new Date() };

    notes.push(newNote);
    writeNotes(notes);

    res.status(201).json(newNote);
});

// Update a note
app.put('/notes/:id', (req, res) => {
    let notes = readNotes();
    const { id } = req.params;
    const { title, content } = req.body;
    const note = notes.find(n => n.id == id);

    if (!note) return res.status(404).json({ message: "note not found" });

    note.title = title || note.title;
    note.content = content || note.content;
    note.updatedAt = new Date();

    writeNotes(notes);
    res.json(note);
});

// Delete a note
app.delete('/notes/:id', (req, res) => {
    let notes = readNotes();
    const { id } = req.params;
    notes = notes.filter(n => n.id != id);

    writeNotes(notes);
    res.json({ message: "note deleted" });
});

// Start the server
app.listen(5000, () => console.log("server started on port 5000"));
