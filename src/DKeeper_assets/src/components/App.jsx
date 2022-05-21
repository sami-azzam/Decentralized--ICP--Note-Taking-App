import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { DKeeper } from "../../../declarations/DKeeper";

function App() {
  const [notes, setNotes] = useState([]);
  
  useEffect(()=>{
    fetchData();
  }, [])

  async function fetchData(){
    const noteArray = await DKeeper.getNotes();
    setNotes(noteArray);
  }


  function addNote(newNote) {
    setNotes(prevNotes => {
      return [newNote, ...prevNotes];
    });
    DKeeper.createNote(newNote.title, newNote.content);
  }

  function deleteNote(id) {
    DKeeper.deleteNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
