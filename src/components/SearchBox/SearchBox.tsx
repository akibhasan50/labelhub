import React from "react";
import { InputField } from "../InputField/InputField";
import { FaSearch } from "react-icons/fa";

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  className: string;
  placeholder: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  searchQuery,
  setSearchQuery,
  className,
    placeholder
}) => {
  return (
    <div className={className}>
        <div className="search-icon-tags search-icon">
            <FaSearch></FaSearch>
        </div>
      <InputField
          className='custom-input-style input-box'
        type="text"
        value={searchQuery}
        placeholder={placeholder}
        onChange={(e) => setSearchQuery(e.target.value)}
      ></InputField>

    </div>
  );
};
