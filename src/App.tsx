import "./App.css";
import HomePage from "@/pages/HomePage";
import NavBar from "@/components/NavBar";
import DetailPage from "@/pages/DetailPage";
import ArchivePage from "@/pages/ArchivePage";
import NewNotePage from "@/pages/NewNotePage";
import NotFoundPage from "@/pages/NotFoundPage";
import { Toaster } from "@/components/ui/toaster";
import { NotesProvider } from "@/context/NotesContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <NotesProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/archives" element={<ArchivePage />} />
              <Route path="/notes/new" element={<NewNotePage />} />
              <Route path="/notes/:id" element={<DetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Toaster />
        </div>
      </Router>
    </NotesProvider>
  );
}

export default App;
