import React, { useEffect, useState } from "react";
import axios from "axios";
import EditNote from "./EditNote";

const NotesList = () => {
    const [notes, setNotes] = useState([]); // Stores the list of notes
    const [editingNote, setEditingNote] = useState(null); // Tracks the note being edited
    const [search, setSearch] = useState(""); // Search input state
    const [searchDate, setSearchDate] = useState(""); // New state for date filter

    // Fetches notes from the backend
    const fetchNotes = () => {
        axios.get("http://localhost:5000/notes")
            .then(response => setNotes(response.data))
            .catch(error => console.error("Error fetching notes:", error));
    };

    useEffect(() => { fetchNotes(); }, []);

    // Deletes a note by ID
    const deleteNote = async (id) => {
        await axios.delete(`http://localhost:5000/notes/${id}`);
        fetchNotes();
    };

    return (
        <div>
            <h2>Notes List</h2>

            {/* Search input */}
            <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Date filter */}
            <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
            />

            {editingNote ? (
                <EditNote note={editingNote} onCancel={() => setEditingNote(null)} onUpdate={fetchNotes} />
            ) : (
                <ul>
                    {notes
                        .filter(note => note.title.toLowerCase().includes(search.toLowerCase())) // Search by title
                        .filter(note => !searchDate || new Date(note.createdAt).toISOString().split("T")[0] === searchDate) // Filter by date
                        .map(note => (
                            <li key={`${note.id}-${note.createdAt}`}>
                            <h3>{note.title}</h3>
                                <p>{note.content}</p>
                                <button onClick={() => setEditingNote(note)}>✏ Edit</button>
                                <button onClick={() => deleteNote(note.id)}>❌ Delete</button>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};

export default NotesList;
