import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { BookText, FilePlus, Archive } from "lucide-react";

const NavBar: React.FC = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <BookText className="h-6 w-6 mr-2" />
          <Link to="/" className="text-xl font-bold">
            NoteVibe
          </Link>
        </div>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Button
            asChild
            variant={location.pathname === "/" ? "default" : "ghost"}
            className="text-sm font-medium transition-colors"
          >
            <Link to="/">Notes</Link>
          </Button>
          <Button
            asChild
            variant={location.pathname === "/archives" ? "default" : "ghost"}
            className="text-sm font-medium transition-colors"
          >
            <Link to="/archives">
              <Archive className="h-4 w-4 mr-2" />
              Archives
            </Link>
          </Button>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Button asChild variant="outline">
            <Link to="/notes/new">
              <FilePlus className="h-4 w-4 mr-2" />
              Add Note
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
