import { Trash2 } from 'lucide-react';
import React from 'react';

const CategoryRadio = ({ categories, selected, fetchCategories, handleSelect, handleChange }) => {
  
  
  // delete cateogry
  const deleteCategory = async (id) => {
   const confirmDelete = confirm('Are you sure you want to Delete?');
   if(!confirmDelete) return;
  try {
    const res = await fetch(`http://localhost:3000/api/categories/${id}/delete`, {
      method: 'DELETE'
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert(data.message);
    fetchCategories();

  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="flex  mt-5 gap-3">
      {categories.map((cat) => (
        <label
          key={cat.id}
          onClick={() => handleSelect(cat.id)}
          className={`cursor-pointer relative shadow  px-8 text-nowrap py-5 border text-gray-500  border-gray-200 rounded-xl flex items-center gap-2 transition
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

          <button
           className='absolute -top-3 right-0'
           onClick={() => deleteCategory(cat.id)}
          >
          <Trash2 className='bg-white  rounded-full w-6 h-6' color='red' strokeWidth={1}/>
          </button>

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