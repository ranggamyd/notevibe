import { ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import NoteForm from "@/components/NoteForm";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNotes } from "@/context/NotesContext";

const NewNotePage: React.FC = () => {
  const { addNote } = useNotes();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Create New Note | NoteVibe";
  }, []);

  const handleSubmit = (title: string, body: string) => {
    addNote(title, body);
    navigate("/");
  };

  return (
    <main className="container py-6">
      <Button variant="default" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="max-w-3xl mx-auto">
        <NoteForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
};

export default NewNotePage;
