import React from 'react'

const ProductVariants = ({
    setVariants,
    updateVariant,
    variants,
    addVariant,
    removeVariant
}) => {
  return (
   <>
           {/* ======================================================
            PRODUCT VARIANTS
        ====================================================== */}

        <div className="space-y-3">

          {/* VARIANT HEADER */}
          <div className="flex items-center justify-between">

            <div>
              <label className="text-xs font-medium text-gray-700">
                Product Variants
              </label>

              <p className="text-[10px] text-gray-400">
                Add size, color, and available stock
              </p>
            </div>

            <button
              type="button"
              onClick={addVariant}
              className="px-3 py-1.5 text-xs font-medium text-[#635BFF] bg-[#635BFF]/10 hover:bg-[#635BFF]/15 rounded-lg transition"
            >
              + Add Variant
            </button>

          </div>


          {/* VARIANTS LIST */}
          <div className="space-y-2">

            {variants.map((variant, index) => (

              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[1fr_1fr_120px_auto] gap-2 p-3 bg-gray-50 border border-gray-200 rounded-xl"
              >

                {/* SIZE */}
                <div className="space-y-1">

                  <label className="text-[10px] font-medium text-gray-500">
                    Size
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Small, Medium, XL"
                    value={variant.size}
                    onChange={(e) =>
                      updateVariant(
                        index,
                        "size",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF]"
                  />

                </div>


                {/* COLOR */}
                <div className="space-y-1">

                  <label className="text-[10px] font-medium text-gray-500">
                    Color
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Red, Emerald Green"
                    value={variant.color}
                    onChange={(e) =>
                      updateVariant(
                        index,
                        "color",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF]"
                  />

                </div>


                {/* STOCK */}
                <div className="space-y-1">

                  <label className="text-[10px] font-medium text-gray-500">
                    Stock
                  </label>

                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={variant.stock}
                    onChange={(e) =>
                      updateVariant(
                        index,
                        "stock",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF]"
                  />

                </div>


                {/* REMOVE BUTTON */}
                <div className="flex items-end">

                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    disabled={variants.length === 1}
                    className="w-full md:w-auto px-3 py-2 text-xs text-red-500 bg-red-50 hover:bg-red-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>
   </>
  )
}

export default ProductVariants