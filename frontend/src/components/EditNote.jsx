import React, { useState } from "react";
import axios from "axios";

const EditNote = ({ note, onCancel, onUpdate }) => {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [error, setError] = useState(""); // Error state for validation

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!title.trim() || !content.trim()) {
            setError("Title and content cannot be empty!");
            return;
        }

        setError(""); // Clear error if everything is fine

        await axios.put(`http://localhost:5000/notes/${note.id}`, { title, content });

        onUpdate(); // Refresh notes list
        onCancel(); // Close edit form
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Note</h2>

            {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error if exists */}

            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditNote;
