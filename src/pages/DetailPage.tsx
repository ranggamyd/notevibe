import { Button } from "@/components/ui/button";
import { showFormattedDate } from "@/utils/data";
import { useNotes } from "@/context/NotesContext";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Archive, ArchiveRestore, ArrowLeft, Trash2, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getNote, deleteNote, archiveNote, unarchiveNote, updateNote } =
    useNotes();
  const navigate = useNavigate();

  const note = id ? getNote(id) : undefined;
  const [title, setTitle] = useState(note?.title || "");
  const [body, setBody] = useState(note?.body || "");
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    if (note) {
      document.title = `${note.title} | NoteVibe`;
    } else {
      document.title = "Note Not Found | NoteVibe";
    }
  }, [note]);

  const handleDelete = () => {
    if (note && confirm("Are you sure you want to delete this note?")) {
      deleteNote(note.id);
      navigate("/");
    }
  };

  const handleArchive = () => {
    if (note) {
      archiveNote(note.id);
      navigate("/");
    }
  };

  const handleUnarchive = () => {
    if (note) {
      unarchiveNote(note.id);
      navigate("/archives");
    }
  };

  const handleSave = () => {
    if (note && (title !== note.title || body !== note.body)) {
      updateNote(note.id, title, body);
      setIsEdited(false);
    }
  };

  if (!note) {
    return (
      <div className="container py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Note Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The note you're looking for doesn't exist or has been deleted.
        </p>
        <Button onClick={() => navigate("/")} variant="default">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Notes
        </Button>
      </div>
    );
  }

  return (
    <main className="container py-6">
      <Button variant="default" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div
            contentEditable
            className="text-2xl font-semibold outline-none"
            onInput={(e) => {
              setTitle(e.currentTarget.textContent || "");
              setIsEdited(true);
            }}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className="text-sm text-muted-foreground">
            {showFormattedDate(note.createdAt)}
          </p>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <div
            contentEditable
            className="note-content outline-none min-h-[200px]"
            onInput={(e) => {
              setBody(e.currentTarget.innerHTML);
              setIsEdited(true);
            }}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {isEdited && (
            <Button
              variant="default"
              onClick={handleSave}
              className="hover:bg-primary"
            >
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          )}
          {note.archived ? (
            <Button
              variant="outline"
              onClick={handleUnarchive}
              className="hover:text-primary hover:border-primary"
            >
              <ArchiveRestore className="h-4 w-4 mr-2" /> Unarchive
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={handleArchive}
              className="hover:text-primary hover:border-primary"
            >
              <Archive className="h-4 w-4 mr-2" /> Archive
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleDelete}
            className="hover:text-destructive hover:border-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default DetailPage;
