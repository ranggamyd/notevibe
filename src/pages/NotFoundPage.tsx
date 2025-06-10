import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 - Page Not Found | NoteVibe";
  }, []);

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <FileQuestion className="h-24 w-24 text-muted-foreground mb-6" />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-muted-foreground text-lg max-w-md mb-8">
        Oops! The page you're looking for doesn't exist or has been moved to
        another location.
      </p>
      <Button onClick={() => navigate("/")} size="lg">
        <Home className="mr-2 h-5 w-5" /> Return Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
