import React from "react";
import PropTypes from "prop-types";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  keyword: string;
  onKeywordChange: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ keyword, onKeywordChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onKeywordChange(e.target.value);
  };

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search notes..."
        value={keyword}
        onChange={handleChange}
        className="pl-10"
      />
    </div>
  );
};

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  onKeywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
