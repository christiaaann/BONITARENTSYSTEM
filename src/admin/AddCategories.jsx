import React from 'react'

const AddCategories = ({ 
  modalCategories,
  setmodalCategories,
  categoryName,
  setCategoryName,
  addCategory
}) => {
  return (
    <>
      {/* Header & Trigger Button */}
      <div className="flex gap-2 p-4">
        <div className="flex flex-col">
          <h1 className="text-base font-bold text-gray-900 tracking-tight">
            Product Category
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Classify your new stock items
          </p>
        </div>

        <button
          type="button"
          onClick={() => setmodalCategories(true)}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#635BFF]/10 text-[#635BFF] hover:bg-[#635BFF] hover:text-white rounded-full font-semibold text-xs transition-all duration-200 shadow-sm active:scale-95"
        >
          <span className="text-base leading-none">+</span>
          <span>Add Category</span>
        </button>
      </div>

      {/* CATEGORY MODAL */}
      {modalCategories && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Subtle Backdrop Blur */}
          <div 
            className="fixed inset-0 bg-slate-900/20 transition-opacity" 
            onClick={() => setmodalCategories(false)} 
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-md bg-white rounded-2xl border border-gray-100 p-6 transform transition-all">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Add Custom Category
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Set up category specifications & rules
                </p>
              </div>

              <button
                type="button"
                onClick={() => setmodalCategories(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content / Form */}
            <div className="mt-5 space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  Category Name
                </label>

                <input
                  type="text"
                  placeholder="e.g., Gown, Barong, Gear"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50/80 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/20 transition-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setmodalCategories(false)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={addCategory}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#635BFF] hover:bg-[#5851EA] rounded-xl shadow-md shadow-[#635BFF]/20 transition-all active:scale-95"
                >
                  Save Category
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default AddCategories