import React, { useEffect } from "react";
import NoteCard from "@/components/NoteCard";
import SearchBar from "@/components/SearchBar";
import EmptyState from "@/components/EmptyState";
import { useNotes } from "@/context/NotesContext";
import { useSearchParams } from "react-router-dom";

const HomePage: React.FC = () => {
  const { notes, deleteNote, archiveNote, searchNotes } = useNotes();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const activeNotes = notes.filter((note) => !note.archived);
  const filteredNotes = keyword
    ? searchNotes(keyword).filter((note) => !note.archived)
    : activeNotes;

  const handleKeywordChange = (newKeyword: string) => {
    if (newKeyword) {
      setSearchParams({ keyword: newKeyword });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    document.title = "Home | NoteVibe";
  }, []);

  return (
    <main className="container py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">My Notes</h1>
          <p className="text-muted-foreground">
            {filteredNotes.length} active note
            {filteredNotes.length !== 1 ? "s" : ""}
          </p>
        </div>
        <SearchBar keyword={keyword} onKeywordChange={handleKeywordChange} />
      </div>

      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.body}
              createdAt={note.createdAt}
              archived={note.archived}
              onDelete={deleteNote}
              onArchive={archiveNote}
              onUnarchive={() => {}}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          message={
            keyword
              ? `No notes found for "${keyword}". Try a different search term.`
              : "You don't have any active notes yet. Create one!"
          }
        />
      )}
    </main>
  );
};

export default HomePage;
