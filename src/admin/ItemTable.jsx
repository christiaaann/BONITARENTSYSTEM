import React, { useState } from 'react'
import { 
  Pencil, 
  Trash2, 
  PackageX, 
  Calendar, 
  Tag, 
  Search, 
  X, 
  Plus, 
  Filter 
} from 'lucide-react'

const ItemTable = ({ 
  products = [], 
  handleEdit, 
  deleteProduct, 
  handleAddProduct 
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Kumuha ng unique categories para sa filter dropdown
  const categories = ['All', ...new Set(products.map((item) => item.category_name).filter(Boolean))]

  // Filter logic para sa Search at Category
  const filteredProducts = products.filter((item) => {
    const query = searchTerm.toLowerCase().trim()
    
    const matchesSearch =
      !query ||
      item.name?.toLowerCase().includes(query) ||
      item.category_name?.toLowerCase().includes(query) ||
      String(item.id).toLowerCase().includes(query)

    const matchesCategory =
      selectedCategory === 'All' || item.category_name === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="w-full bg-white border border-stone-200/80 shadow-sm overflow-hidden mt-2">
      
      {/* Header Area: Title, Search, Category Filter & Add Product Button */}
      <div className="p-4 border-b border-stone-200/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-stone-50/40">
        
        {/* Left Side: Search Bar & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search gown, category, ID..."
              className="w-full pl-9 pr-8 py-2 bg-white text-xs text-stone-800 placeholder-stone-400 rounded-xl border border-stone-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 outline-none transition-all shadow-xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5 rounded-full hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Category Filter Dropdown */}
          <div className="relative w-full sm:w-auto flex items-center">
            <Filter className="w-3.5 h-3.5 absolute left-3 text-stone-400 pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto pl-8 pr-7 py-2 bg-white text-xs text-stone-700 rounded-xl border border-stone-200 focus:border-violet-500 outline-none cursor-pointer shadow-xs appearance-none font-medium"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Side: Add Product Button & Item Counter */}
        <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-stone-200/60">
          <span className="text-xs text-stone-500 font-medium whitespace-nowrap">
            Showing <span className="text-stone-900 font-semibold">{filteredProducts.length}</span> of {products.length}
          </span>

          <button
            onClick={handleAddProduct}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 active:scale-95 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse font-sans">
          {/* Table Header */}
          <thead>
            <tr className="bg-stone-50/80 border-b border-stone-200/80 text-[11px] font-semibold tracking-wider text-stone-500 uppercase">
              <th className="py-3.5 px-4 text-center w-16">ID</th>
              <th className="py-3.5 px-4 text-center w-20">Image</th>
              <th className="py-3.5 px-4">Product Name</th>
              <th className="py-3.5 px-4 text-center">Rental Price</th>
              <th className="py-3.5 px-4 text-center">Total Stock</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Created Date</th>
              <th className="py-3.5 px-4 text-center w-28">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-stone-50/60 transition-colors duration-150 group"
                >
                  {/* ID */}
                  <td className="py-3 px-4 text-center font-mono text-[11px] text-stone-400 font-medium">
                    #{item.id}
                  </td>

                  {/* Image */}
                  <td className="py-3 px-4">
                    <div className="w-12 h-14 mx-auto rounded-lg bg-stone-100 border border-stone-200/60 overflow-hidden flex items-center justify-center shadow-xs">
                      {item.image ? (
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          src={item.image}
                          alt={item.name}
                        />
                      ) : (
                        <span className="text-[10px] text-stone-400">No img</span>
                      )}
                    </div>
                  </td>

                  {/* Product Name */}
                  <td className="py-3 px-4 font-semibold text-stone-800 max-w-[200px] truncate">
                    {item.name}
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4 text-center">
                    {item.discount > 0 ? (
                      <div className="flex flex-col items-center justify-center">
                        <span className="line-through text-[11px] text-stone-400">
                          ₱{Number(item.price).toLocaleString()}
                        </span>
                        <span className="text-emerald-600 font-bold text-xs">
                          ₱{Number(item.final_price).toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <span className="text-stone-900 font-bold">
                        ₱{Number(item.final_price || item.price).toLocaleString()}
                      </span>
                    )}
                  </td>

{/* Stock / Availability */}
<td className="py-3 px-4 text-center">
  {(() => {
    // Kuhanin ang stock value mula sa totalstock o stock property
    const stockCount = item.totalstock !== undefined ? item.totalstock : (item.stock || 0);

    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium ${
          stockCount > 0
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
            : 'bg-rose-50 text-rose-600 border border-rose-200/60'
        }`}
      >
        {stockCount > 0 ? `${stockCount} in stock` : 'Out of stock'}
      </span>
    );
  })()}
</td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600 font-medium text-[11px]">
                      <Tag className="w-3 h-3 text-stone-400" />
                      <span>{item.category_name || 'Uncategorized'}</span>
                    </div>
                  </td>

                  {/* Created At */}
                  <td className="py-3 px-4 text-stone-500 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-stone-400 flex-shrink-0" />
                      <span>
                        {new Date(item.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleEdit(item)}
                        title="Edit Item"
                        className="p-1.5 rounded-lg text-stone-500 hover:text-violet-600 hover:bg-violet-50 transition-colors cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => deleteProduct(item.id)}
                        title="Delete Item"
                        className="p-1.5 rounded-lg text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              /* Empty State */
              <tr>
                <td colSpan="8" className="py-12 text-center text-stone-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <PackageX className="w-8 h-8 text-stone-300" />
                    <p className="text-xs font-medium">
                      {searchTerm || selectedCategory !== 'All'
                        ? 'No items found matching your filters.'
                        : 'No items found in inventory.'}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ItemTable