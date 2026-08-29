import React from 'react'
import ProductVariants from './ProductVariants'

const MainDetails = ({
  handleSubmit,
  form,
  handleChange,
  discountedPrice,
  previewImage,
  usage,
  selectImage,
  handleRemoveBg,
  editId,
  variants,
  setVariants
}) => {

  // ============================================================

  // Add new variant
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        size: "",
        color: "",
        stock: ""
      }
    ])
  }

  // Update variant
  const updateVariant = (index, field, value) => {
    setVariants((prev) =>
      prev.map((variant, i) =>
        i === index
          ? {
              ...variant,
              [field]: value
            }
          : variant
      )
    )
  }

  // Remove variant
  const removeVariant = (index) => {
    setVariants((prev) =>
      prev.filter((_, i) => i !== index)
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">

      {/* Header Section */}
      <div className="pb-2 border-b border-gray-100">
        <h1 className="text-base font-semibold text-gray-900 tracking-tight">
          Main Details
        </h1>

        <p className="text-xs text-gray-400">
          Fill in apparel information and pricing metrics
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* ======================================================
            ROW 1: ITEM CODE & PRODUCT NAME
        ====================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* ITEM CODE */}
          <div className="space-y-1.5">

            <label className="text-xs font-medium text-gray-700">
              Item Code / SKU
            </label>

            <input
              className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-colors"
              type="text"
              disabled
              name="item_code"
              placeholder="e.g., GWN-001"
              value={form.item_code || ''}
            />

          </div>

          {/* PRODUCT NAME */}
          <div className="space-y-1.5">

            <label className="text-xs font-medium text-gray-700">
              Product Name
            </label>

            <input
              className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-colors"
              type="text"
              name="name"
              placeholder="e.g., Long Ball Gown"
              value={form.name || ''}
              onChange={handleChange}
              required
            />

          </div>

        </div>

     <ProductVariants
      addVariant={addVariant}
      removeVariant={removeVariant}
      updateVariant={updateVariant}
      variants={variants}
      setVariants={setVariants}
     />

        {/* ======================================================
            ROW 3: PRICE, DISCOUNT, SECURITY DEPOSIT
        ====================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* PRICE */}
          <div className="space-y-1.5">

            <label className="text-xs font-medium text-gray-700">
              Rental Price (₱)
            </label>

            <input
              className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-colors"
              type="number"
              name="price"
              placeholder="0"
              value={form.price || ''}
              onChange={handleChange}
              required
            />

          </div>


          {/* DISCOUNT */}
          <div className="space-y-1.5">

            <label className="text-xs font-medium text-gray-700">
              Discount (%) / Amount
            </label>

            <input
              className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-colors"
              type="number"
              name="discount"
              placeholder="Optional Discount"
              value={form.discount || ''}
              onChange={handleChange}
            />

          </div>


          {/* SECURITY DEPOSIT */}
          <div className="space-y-1.5">

            <label className="text-xs font-medium text-gray-700">
              Security Deposit (₱)
            </label>

            <input
              className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-colors"
              type="number"
              name="security_deposit"
              placeholder="0"
              value={form.security_deposit || ''}
              onChange={handleChange}
            />

          </div>

        </div>


        {/* ======================================================
            PRICE SUMMARY
        ====================================================== */}

        <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-200/80">

          <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
            Calculated Metrics
          </span>

          <div className="flex items-baseline gap-2 mt-1">

            <span className="text-xs font-medium text-gray-500">
              Final Rental Price:
            </span>

            <span className="text-lg font-bold text-[#635BFF]">
              ₱{(
                discountedPrice ||
                form.price ||
                0
              ).toLocaleString()}
            </span>

          </div>

        </div>


        {/* ======================================================
            SUBMIT BUTTON
        ====================================================== */}

        <div className="pt-3 border-t border-gray-100 flex justify-end">

          <button
            type="submit"
            disabled={!selectImage && !editId}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-medium transition-all ${
              !selectImage && !editId
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#635BFF] hover:bg-[#534be0] text-white shadow-sm active:scale-95"
            }`}
          >

            {editId
              ? 'Update Product Profile'
              : 'Publish Item To Store'}

          </button>

        </div>

      </form>

    </div>
  )
}

export default MainDetails