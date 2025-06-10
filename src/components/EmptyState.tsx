import React from "react";
import PropTypes from "prop-types";
import { FileQuestion } from "lucide-react";

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
      <h2 className="text-xl font-semibold mb-2">No Notes Found</h2>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
};

export default EmptyState;
