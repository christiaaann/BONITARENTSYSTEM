import React, { useState } from 'react'
import ProductCard from '../ProductCard';
import { Search } from 'lucide-react';
const FilterProductCategory = ({ products,
  selectedCategory,
  wishlist,
  searchItem,
  toggleWishlist,
  setPreview,
  handleRent,
  user,
  navigate,}) => {


const filteredProducts = products.filter((item) => {
  const matchesCategory =
    selectedCategory === "" ||
    item.category_id == selectedCategory;

  const matchesSearch =
    item.name
      ?.toLowerCase()
      .includes(searchItem.toLowerCase());

  return matchesCategory && matchesSearch;
});

const rows = [];
for (let i = 0; i < filteredProducts.length; i += 5) {
  rows.push(filteredProducts.slice(i, i + 5));
}


  return (
   <> 
      {filteredProducts.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-4xl mb-3">
          <Search />
        </div>

        <h3 className="text-lg font-medium text-neutral-800">
          No results found
        </h3>

        <p className="text-sm text-neutral-400 mt-1">
          We couldn't find any products matching "{searchItem}"
        </p>
      </div>
    ) : (
      rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="overflow-x-auto lg:overflow-x-hidden"
        >
          <div className="grid grid-flow-col auto-cols-[247px] gap-2">
            {row.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                user={user}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                setPreview={setPreview}
                handleRent={handleRent}
              />
            ))}
          </div>
        </div>
      ))
    )}
   </>

  )
}

export default FilterProductCategory


    