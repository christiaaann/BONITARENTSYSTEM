import { useState, useEffect } from 'react'
import axios from 'axios'
import AddItem from '../admin/AddItem'
import ItemTable from '../admin/ItemTable'
import useProducts from '../hooks/useProducts'

const Inventory = () => {
  // Cloudinary & Image States
  const [previewImage, setPreviewImage] = useState(null)
  const [selectImage, setSelectImages] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [originalImage, setOriginalImage] = useState(null)
  const [removedBgImage, setRemovedBgImage] = useState(null)

  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [modalEnhance, setModalEnchance] = useState(false)

  // Category Modal Form State
  const [standardDays, setStandardDays] = useState("")
  const [securityDeposit, setSecurityDeposit] = useState("")
  const [inventory, setInventory] = useState(false)

  // Hooks
  const { products, fetchProducts } = useProducts()

  const [variants, setVariants] = useState([
    {
      size: "",
      color: "",
      stock: ""
    }
  ])

  // Main Form State
  const [form, setForm] = useState({
    item_code: "",
    name: "",
    price: "",
    discount: "",
    final_price: "",
    security_deposit: "",
    image: "",
    category_id: ""
  })

  // =======================================================
  const generateItemCode = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/apparel/generate-code')
      const data = await res.json()

      setForm(prev => ({
        ...prev,
        item_code: data.item_code
      }))
    } catch (err) {
      console.error('Failed to generate item code:', err)
    }
  }

  // Select image handler
  const handleSelectImage = async (img) => {
    setSelectImages(img)

    const response = await fetch(img)
    const blob = await response.blob()
    const file = new File([blob], "selected.png", { type: blob.type })

    setForm((prev) => ({ ...prev, image: file }))
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const preview = URL.createObjectURL(file)

    setOriginalImage(preview)
    setPreviewImage(preview)
    setImageFile(file)
    setSelectImages(null)
  }

  // Calculate Discounted Price
  const price = Number(form.price) || 0
  const discount = Number(form.discount) || 0
  const discountedPrice = Math.max(0, Math.round(price - discount))

  // ============================================================================= 
  // Submit Product (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name || !form.price) {
      alert('Please fill in Product Name and Price.')
      return
    }

    const formData = new FormData()

    formData.append("item_code", form.item_code || "")
    formData.append("name", form.name)
    formData.append("price", form.price)
    formData.append("discount", form.discount || 0)
    formData.append("final_price", discountedPrice)
    formData.append("security_deposit", form.security_deposit || 0)
    formData.append("category_id", form.category_id || "")

    if (form.image instanceof File) {
      formData.append("image", form.image)
    }

    // Stock comes from variants
    formData.append("variants", JSON.stringify(variants))

    try {
      if (editId) {
        const res = await axios.put(
          `http://localhost:3000/api/apparel/${editId}/edit`,
          formData
        )

        console.log(res.data)
        alert("Product updated successfully!")
      } else {
        const res = await axios.post(
          "http://localhost:3000/api/apparel",
          formData
        )

        console.log(res.data)
        alert("Product added successfully!")
      }

      await fetchProducts()
      resetForm()

    } catch (err) {
      console.error("SAVE PRODUCT ERROR:", err.response?.data || err)
      alert(
        err.response?.data?.error ||
        "Error saving product."
      )
    }
  }

  // ============================================================
  // Reset Form Helper
  const resetForm = () => {
    setForm({
      item_code: "",
      name: "",
      price: "",
      discount: "",
      final_price: "",
      security_deposit: "",
      image: "",
      category_id: ""
    })
    
    setVariants([
      {
        size: "",
        color: "",
        stock: ""
      }
    ])

    setPreviewImage(null)
    setSelectImages(null)
    setImageFile(null)
    setOriginalImage(null)
    setRemovedBgImage(null)
    setSelected("")
    setEditId(null)
    setInventory(false)
    generateItemCode()
  }

  // ============================================================
  // Edit Product Populate (INAYOS: Naka-fetch na ang variants dito)
  const handleEdit = async (item) => {
    setEditId(item.id)

    setForm({
      item_code: item.item_code || "",
      name: item.name || "",
      price: item.price || "",
      discount: item.discount || "",
      final_price: item.final_price || "",
      security_deposit: item.security_deposit || "",
      image: item.image || "",
      category_id: item.category_id || ""
    })

    setSelected(item.category_id || "")
    setPreviewImage(item.image)
    setSelectImages(item.image)
    setOriginalImage(item.image)
    setInventory(true)

    // Fetch full product details para makuha ang variants table rows
    try {
      const res = await fetch(`http://localhost:3000/api/apparel/${item.id}`)
      const fullData = await res.json()

      if (fullData.variants && fullData.variants.length > 0) {
        setVariants(fullData.variants)
      } else {
        setVariants([{ size: "", color: "", stock: "" }])
      }
    } catch (err) {
      console.error("Failed to fetch product variants for edit:", err)
    }
  }

  // Fetch & Add Categories
  const [categories, setCategories] = useState([])
  const [categoryName, setCategoryName] = useState("")

  const addCategory = async () => {
    if (!categoryName) return alert("Enter category name")

    try {
      await axios.post("http://localhost:3000/api/categories", {
        name: categoryName,
      })

      alert("Category added!")
      setCategoryName("")
      fetchCategories()
      setmodalCategories(false)
    } catch (err) {
      console.log(err)
      alert("Category Already Exists")
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/categories")
      const data = await res.json()
      setCategories(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // Category Selection
  const [selected, setSelected] = useState('')
  const handleSelect = (id) => {
    setSelected(id)
    handleChange({
      target: {
        name: "category_id",
        value: id,
      },
    })
  }

  const [modalCategories, setmodalCategories] = useState(false)

  // Remove BG via API
  const handleRemoveBg = async () => {
    try {
      setLoading(true)

      let fileToSend = imageFile

      if (!fileToSend && originalImage) {
        const resFile = await fetch(originalImage)
        const blob = await resFile.blob()
        fileToSend = new File([blob], "edit-image.png", { type: blob.type })
      }

      const formData = new FormData()
      formData.append("image", fileToSend)

      const res = await axios.post("http://localhost:3000/api/removebg", formData)

      const base64Url = res.data.image
      setPreviewImage(base64Url)
      setRemovedBgImage(base64Url)

      await handleSelectImage(base64Url)

      alert("Background removed (preview only). Click Save/Publish to save!")
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Delete Item
  const deleteProduct = async (id) => {
    const confirmDelete = confirm("Are you sure you want to Delete?")
    if (!confirmDelete) return

    try {
      await fetch(`http://localhost:3000/api/apparel/${id}/delete`, {
        method: 'DELETE'
      })

      alert('Deleted')
      fetchProducts()
    } catch (error) {
      console.error(error)
    }
  }

  // AI Usage Stats
  const [usage, setUsage] = useState(null)
  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/removebg/usage")
        const data = await res.json()
        setUsage(data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchUsage()
  }, [])

  return (
    <div>
      <AddItem
        inventory={inventory}
        setInventory={setInventory}
        form={form}
        setForm={setForm}
        variants={variants}
        setVariants={setVariants}
        editId={editId}
        setEditId={setEditId}
        selected={selected}
        setSelected={setSelected}
        categories={categories}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleFileChange={handleFileChange}
        handleRemoveBg={handleRemoveBg}
        handleSelectImage={handleSelectImage}
        previewImage={previewImage}
        selectImage={selectImage}
        setSelectImage={setSelectImages}
        originalImage={originalImage}
        removedBgImage={removedBgImage}
        loading={loading}
        modalEnhance={modalEnhance}
        setModalEnchance={setModalEnchance}
        modalCategories={modalCategories}
        setmodalCategories={setmodalCategories}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        standardDays={standardDays}
        securityDeposit={securityDeposit}
        setSecurityDeposit={setSecurityDeposit}
        addCategory={addCategory}
        fetchCategories={fetchCategories}
        handleSelect={handleSelect}
        discountedPrice={discountedPrice}
        usage={usage}
      />

      <ItemTable
        products={products}
        handleEdit={handleEdit}
        deleteProduct={deleteProduct}
        handleAddProduct={() => {
          resetForm() 
          setInventory(true)
        }}
      />
    </div>
  )
}

export default Inventory