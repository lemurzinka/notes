import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const AddNote = ({ onNoteAdded }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(""); // Error state for validation

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!title.trim() || !content.trim()) {
            setError("Title and content cannot be empty!");
            return;
        }

        setError(""); // Clear error if everything is fine

        const newNote = { id: uuidv4(), title, content, createdAt: new Date(), updatedAt: new Date() };
        await axios.post("http://localhost:5000/notes", newNote);

        setTitle("");
        setContent("");
        onNoteAdded(); // Оновлюємо список нотаток
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a New Note</h2>

            {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error if exists */}

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Note content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddNote;
