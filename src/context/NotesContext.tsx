import PropTypes from "prop-types";
import { useToast } from "@/hooks/use-toast";
import { getInitialData } from "@/utils/data";
import React, { createContext, useContext, useState } from "react";

interface Note {
  id: string;
  title: string;
  body: string;
  archived: boolean;
  createdAt: string;
}

interface NotesContextType {
  notes: Note[];
  addNote: (title: string, body: string) => void;
  deleteNote: (id: string) => void;
  archiveNote: (id: string) => void;
  unarchiveNote: (id: string) => void;
  updateNote: (id: string, title: string, body: string) => void;
  getNote: (id: string) => Note | undefined;
  searchNotes: (keyword: string) => Note[];
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notes, setNotes] = useState<Note[]>(getInitialData());
  const { toast } = useToast();
  const addNote = (title: string, body: string) => {
    const newNote = {
      id: `notes-${+new Date()}`,
      title,
      body,
      archived: false,
      createdAt: new Date().toISOString(),
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    toast({
      title: "Note saved",
      description: "Your note has been created successfully.",
    });
  };

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    toast({
      title: "Note deleted",
      description: "Your note has been successfully deleted.",
    });
  };

  const archiveNote = (id: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, archived: true };
        }
        return note;
      })
    );
    toast({
      title: "Note archived",
      description: "Your note has been moved to archives.",
    });
  };

  const unarchiveNote = (id: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, archived: false };
        }
        return note;
      })
    );
    toast({
      title: "Note unarchived",
      description: "Your note has been removed from archives.",
    });
  };

  const updateNote = (id: string, title: string, body: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, title, body };
        }
        return note;
      })
    );
    toast({
      title: "Note saved",
      description: "Your note has been updated successfully.",
    });
  };

  const getNote = (id: string) => {
    return notes.find((note) => note.id === id);
  };

  const searchNotes = (keyword: string) => {
    if (!keyword) return notes;
    return notes.filter((note) =>
      note.title.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        archiveNote,
        unarchiveNote,
        updateNote,
        getNote,
        searchNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

NotesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
