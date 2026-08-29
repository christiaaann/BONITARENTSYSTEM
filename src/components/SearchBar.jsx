import { Search } from 'lucide-react';
import React, { useState } from 'react'

const SearchBar = ({ products, searchItem, setSearchItem}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(true); 

  const suggestions = products
    .filter((item) =>
      item.name
        ?.toLowerCase()
        .includes(searchItem.toLowerCase())
    )
    .slice(0, 5);
  
    //======================================== 
   const handleKeyDown = (e) => {
    if (!searchItem) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();

      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        setSearchItem(suggestions[selectedIndex].name);
      }

      setSelectedIndex(-1);
      setShowSuggestions(false)
    }

    if (e.key === "Escape") {
      setSelectedIndex(-1);
    }
  };
 
  return (
  <>
  <div className="w-full  max-w-xl mx-auto">
      <div className="relative flex items-center group">
        
        {/* Sleek Minimalist Search Icon */}
        <div className="absolute left-4 text-stone-900 group-focus-within:text-stone-800 transition-colors duration-300 pointer-events-none z-10">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>

        {/* Frosted Glass Input Field */}
        <input
          value={searchItem}
          onChange={(e) => {
             const value = e.target.value;
             setSearchItem (value)
             setSelectedIndex(-1)
           
             if (value.trim() === "") {
              setShowSuggestions(false);
            } else {
              setShowSuggestions(true);
            }
            }}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search..."
          className="w-full shadow backdrop-blur-md hover:bg-white/60 focus:bg-white/80 text-stone-800 placeholder-stone-400 text-sm font-light tracking-wider pl-11 pr-4 py-2.5 rounded-xl border-2 border-stone-200/50 focus:border-stone-900 focus:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 outline-none"
        />
        
        {/* ====== search suggestions ======= */}
        {showSuggestions && searchItem && suggestions.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden">

          {suggestions.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                setSearchItem(item.name);
                setSelectedIndex(-1);
                 setShowSuggestions(false);
              }}
              className={` flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-stone-700 transition-colors
                ${
                selectedIndex === index
                ? "bg-stone-100 text-stone-900"
                : "hover:bg-stone-50 text-stone-700"
                }
              
                `}
            >
              <Search size={15} />
              {item.name}
            </button>
          ))}

        </div>
      )}
      </div>
    </div>

  </>
  )
}

export default SearchBar