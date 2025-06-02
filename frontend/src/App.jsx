import React, { useState } from "react";
import NotesList from "./components/NotesList";
import AddNote from "./components/AddNote";
import "./App.css";

const App = () => {
    const [updateList, setUpdateList] = useState(false);

    return (
        <div className="container">
            <h1>Notes App 📝</h1>
            <AddNote onNoteAdded={() => setUpdateList(!updateList)} />
            <NotesList key={updateList} />
        </div>
    );
};

export default App;
