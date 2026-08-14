import { FiSearch } from "react-icons/fi";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <div className="relative">
      <FiSearch
        className="absolute left-3 top-3 text-gray-400"
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="filter-input pl-10"
      />
    </div>
  );
};

export default SearchBar;