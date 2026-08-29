import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import CategoryRadio from '../components/ui/CategoryRadio'
import AddCategories from './AddCategories'
import MainDetails from './MainDetails'


const AddItem = ({
  inventory,
  setInventory,

  form,
  setForm,
  editId,
  setEditId,
   
  variants,
  setVariants,

  selected,
  setSelected,
  categories,

  handleChange,
  handleSubmit,
  handleFileChange,
  handleRemoveBg,
  handleSelectImage,

  previewImage,
  selectImage,
  setSelectImage, // Inayos ang reference dito
  originalImage,
  removedBgImage,

  loading,

  modalEnhance,
  setModalEnchance,

  modalCategories,
  setmodalCategories,

  categoryName,
  setCategoryName,

  securityDeposit,
  setSecurityDeposit,

  addCategory,
  fetchCategories,
  handleSelect,

  discountedPrice,
  usage,
}) => {

  if (!inventory) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20">
      
      <div className="bg-white w-full max-w-5xl h-[90vh] overflow-y-auto rounded-2xl relative flex flex-col animate-in zoom-in duration-200">

        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white z-20">
          
          <div>
            <h1 className="text-xl font-black text-gray-800 tracking-tight uppercase">
              {editId ? 'Edit Product' : 'Create New Item'}
            </h1>

            <p className="text-xs text-gray-400 font-bold uppercase">
              Inventory Management
            </p>
          </div>

          <button
            onClick={() => {
              setInventory(false)
            }}
            className="bg-gray-50 h-10 w-10 rounded-full hover:bg-red-600 hover:text-white flex items-center justify-center font-black transition-all border border-gray-200/60 shadow-sm text-gray-500"
          >
            &times;
          </button>

        </div>

        <div className="p-6 space-y-8 flex-1">

          {/* IMAGE AREA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

            {/* SELECTED IMAGE */}
            <div className="flex flex-col gap-2">

              <label className="text-xs font-black uppercase tracking-wider text-gray-400">
                Selected Product Preview
              </label>

              <div className="w-full h-64 overflow-hidden border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 flex items-center justify-center relative group">

                {selectImage ? (
                  <img
                    src={selectImage}
                    className="w-full h-full object-contain p-4 z-10"
                    alt="Selected Item"
                  />
                ) : (
                  <div className="text-center p-4">
                    <p className="text-sm font-bold text-gray-400">
                      No image selected for upload
                    </p>

                    <p className="text-[10px] text-gray-300 uppercase mt-1">
                      Please upload or choose below
                    </p>
                  </div>
                )}

              </div>
            </div>


            {/* AI IMAGE TOOLS */}
            <div className="border rounded-2xl bg-white border-gray-200 overflow-hidden h-64 flex flex-col shadow-sm relative group">

              <div className="h-44 relative flex items-center justify-center bg-gray-50 border-b border-gray-100 p-4">

                {/* ENHANCE BUTTON */}
                <button
                  onClick={() => {
                    if (loading) return
                    setModalEnchance(true)
                  }}
                  className={`absolute top-3 right-3 bg-white border border-gray-200 px-4 py-1.5 rounded-xl shadow-sm text-xs font-black text-[#2D5B60] uppercase transition-all hover:bg-[#2D5B60] hover:text-white ${
                    loading
                      ? 'opacity-50 cursor-not-allowed'
                      : 'cursor-pointer'
                  }`}
                  disabled={loading}
                >
                  ✨ Enhance?
                </button>


                {/* ENHANCE POPUP */}
                {modalEnhance && (
                  <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

                    <div className="bg-white relative flex flex-col gap-2 items-center w-full max-w-[16rem] shadow-xl p-4 rounded-2xl">

                      <button
                        className="absolute cursor-pointer -top-2 -right-2 bg-red-500 hover:bg-red-600 w-7 h-7 rounded-full text-white font-bold text-sm shadow flex items-center justify-center"
                        onClick={() => setModalEnchance(false)}
                      >
                        &times;
                      </button>

                      <button
                        onClick={handleRemoveBg}
                        className="bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-xs w-full py-2.5 rounded-xl transition-all border border-gray-200/60"
                      >
                        Remove Background
                      </button>

                      <button
                        className="bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-xs w-full py-2.5 rounded-xl transition-all border border-gray-200/60"
                      >
                        AI Generate Background
                      </button>

                    </div>

                  </div>
                )}


                {/* PREVIEW */}
                {loading ? (
                  <div className="flex w-full justify-center items-center">

                    <DotLottieReact
                      src="https://lottie.host/4d3db2ba-0504-4ea0-b045-0903895872a6/zD69dN0v3b.lottie"
                      loop
                      autoplay
                      style={{ width: 100, height: 100 }}
                    />

                  </div>
                ) : previewImage ? (

                  <img
                    src={previewImage}
                    className="w-full h-full object-contain"
                    alt="Process Preview"
                  />

                ) : (

                  <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                    Process monitor idle
                  </p>

                )}

              </div>


              {/* IMAGE SUGGESTIONS */}
              <div className="p-3 bg-white flex justify-between items-center gap-4 flex-1">

                <div className="flex flex-col">

                  <span className="text-[10px] font-black uppercase text-gray-400 leading-none">
                    AI Suggestions
                  </span>

                  <span className="text-[11px] font-bold text-gray-700 mt-0.5">
                    Background options
                  </span>

                </div>


                <div className="flex gap-2 items-center overflow-x-auto max-w-[65%] py-1">

                  {originalImage && (
                    <div className="text-center shrink-0">

                      <img
                        className="cursor-pointer w-10 h-10 object-cover rounded-lg border border-gray-200 hover:border-[#2D5B60]"
                        onClick={() => handleSelectImage(originalImage)}
                        src={originalImage}
                        alt="Original"
                      />

                      <p className="text-[8px] font-bold text-gray-400 uppercase mt-0.5">
                        Original
                      </p>

                    </div>
                  )}


                  {removedBgImage && (
                    <div className="text-center shrink-0">

                      <img
                        src={removedBgImage}
                        onClick={() => handleSelectImage(removedBgImage)}
                        className={`w-10 h-10 object-cover rounded-lg border transition-all ${
                          selectImage === removedBgImage
                            ? "border-blue-500 ring-2 ring-blue-100"
                            : "border-gray-200"
                        }`}
                        alt="No Background"
                      />

                      <p className="text-[8px] font-bold text-gray-400 uppercase mt-0.5">
                        No BG
                      </p>

                    </div>
                  )}

                </div>


                {/* UPLOAD */}
                <div className="shrink-0">

                  <label className="cursor-pointer bg-[#2D5B60] hover:bg-black text-white text-[11px] font-black uppercase tracking-wider px-4 py-2 rounded-xl inline-block shadow-sm">

                    Upload Image

                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                  </label>

                </div>

              </div>

            </div>

          </div>


  <hr className="border-gray-100" />
 {/* ADD CATEGORIES  */}
<AddCategories
  modalCategories={modalCategories}
  setmodalCategories={setmodalCategories}
  categoryName={categoryName}
  setCategoryName={setCategoryName}
  addCategory={addCategory}
/>
  
  {/* CATEGORY */}
<div className="space-y-3">
 <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
  <CategoryRadio
    categories={categories}
    selected={selected}
    fetchCategories={fetchCategories}
    handleSelect={handleSelect}
/>
  </div>
</div>


<hr className="border-gray-100" />

{/* MAIN DETAILS */}
<MainDetails 
  handleSubmit={handleSubmit}
  form={form}
  handleChange={handleChange}
  discountedPrice={discountedPrice}
  previewImage={previewImage}
  usage={usage}
  selectImage={selectImage}
  handleRemoveBg={handleRemoveBg}
  editId={editId}
  variants={variants}
  setVariants={setVariants}
  />
{/* =========================== */}
        </div>

      </div>

    </div>
  )
}

export default AddItem