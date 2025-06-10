import PropTypes from "prop-types";
import { Save } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NoteFormProps {
  onSubmit: (title: string, body: string) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [titleError, setTitleError] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setTitleError(newTitle.trim() === "");
  };

  const handleBodyInput = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerHTML;
    setBody(content);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === "") {
      setTitleError(true);
      return;
    }

    onSubmit(title, body);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Note</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Note title..."
              className={titleError ? "border-destructive" : ""}
            />
            {titleError && (
              <p className="text-destructive text-sm">Title cannot be empty</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">Content</Label>
            <div
              id="body"
              contentEditable
              onInput={handleBodyInput}
              className="min-h-[200px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              data-placeholder="Write your note here..."
            ></div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full sm:w-auto">
            <Save className="mr-2 h-4 w-4" /> Save Note
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

NoteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default NoteForm;
