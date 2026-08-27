import { useState, useEffect } from 'react';

interface SearchBoxProps {
  onSearch: (keyword: string) => void;
  placeholder?: string;
}

export default function SearchBox({ onSearch, placeholder }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(inputValue.trim());
    }, 400);
    return () => clearTimeout(timer);
  }, [inputValue, onSearch]);

  return (
    <div className="search-wrapper">
      <span className="search-icon">&#128269;</span>
      <input
        type="text"
        className="search-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder ?? 'Tim kiem theo ten mon hoc...'}
      />
    </div>
  );
}
