import React from 'react';

const CategoryRadio = ({ categories, selected, handleSelect, handleChange }) => {
  return (
    <div className="flex mt-5 gap-3">
      {categories.map((cat) => (
        <label
          key={cat.id}
          onClick={() => handleSelect(cat.id)}
          className={`cursor-pointer shadow w-full px-4 text-nowrap py-5 border text-gray-500  border-gray-200 rounded-xl flex items-center gap-2 transition
          ${
            selected === cat.id
              ? "border-blue-500 bg-blue-50 "
              : ""
          }`}
        >
          {/* Hidden radio */}
          <input
            type="radio"
            name="category_id"
            value={cat.id}
            checked={selected === cat.id}
            readOnly
            className="hidden"
          />

          {/* Custom radio circle */}
          <div
            className={`w-4 h-4 rounded-full border flex items-center justify-center
            ${
              selected === cat.id
                ? "border-blue-500"
                : "border-gray-400"
            }`}
          >
            {selected === cat.id && (
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            )}
          </div>

          <span>{cat.name}</span>
        </label>
      ))}
    </div>
  );
};

export default CategoryRadio;