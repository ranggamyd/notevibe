import React from "react";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";
import parser from "html-react-parser";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { showFormattedDate } from "@/utils/data";
import { Archive, ArchiveRestore, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NoteCardProps {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onUnarchive: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  id,
  title,
  body,
  createdAt,
  archived,
  onDelete,
  onArchive,
  onUnarchive,
}) => {
  const truncatedBody =
    body.length > 100 ? `${body.substring(0, 100)}...` : body;

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">
          <Link
            to={`/notes/${id}`}
            className="hover:text-primary transition-colors"
          >
            {title}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {showFormattedDate(createdAt)}
        </p>
      </CardHeader>
      <CardContent className="flex-1">
        <div
          className={cn(
            "text-sm text-muted-foreground overflow-hidden line-clamp-4"
          )}
        >
          {parser(truncatedBody)}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-end gap-2">
        {archived ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUnarchive(id)}
            className="hover:text-primary hover:border-primary"
          >
            <ArchiveRestore className="h-4 w-4 mr-1" /> Unarchive
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onArchive(id)}
            className="hover:text-primary hover:border-primary"
          >
            <Archive className="h-4 w-4 mr-1" /> Archive
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(id)}
          className="hover:text-destructive hover:border-destructive"
        >
          <Trash2 className="h-4 w-4 mr-1" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

NoteCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};

export default NoteCard;
