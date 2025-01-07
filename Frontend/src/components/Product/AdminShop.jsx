import React, { useEffect, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { addProduct, deleteProduct, getAllProducts, getAProduct, updateProduct } from '../../Redux/Slices/ProductSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion"

function AdminShop() {
    const dispatch = useDispatch();
    const [whatToDisplay, setToDisplay] = useState("add");
    const [currentProductId, setCurrentProductId] = useState("");
    const AllProducts = useSelector(state => state.product.allProducts);
    const currentProduct = useSelector(state => state.product.current);

    useEffect(() => {
        const fetchAllProducts = async() => {
            await dispatch(getAllProducts())
        }
        fetchAllProducts();
    }, [dispatch]);

    const [formData, setFormData] = useState({
        name: '', description: '', originalPrice: '', newPrice: "", mfgDate: "",
        expiryDate: "", rating: '', company: "", category: "", size: "", flavor: "", image: ''
    }); 

    const [updateFormData, setUpdateFormData] = useState({
        name: "", description: "",
        originalPrice: "", newPrice: "", mfgDate: "", expiryDate: "",
        rating: '', company: "", category: "", size: "", flavor: ""
    });

    const [previewImage, setPreviewImage] = useState('');

    const handledisplay = (e) => {
        e.preventDefault();
        setToDisplay(e.target.value);
    }

    const handleSelectedPlan = async(e) => {
        e.preventDefault();
        setCurrentProductId(e.target.value)
        await dispatch(getAProduct(e.target.value));
    }

    useEffect(() => {
        if (currentProductId && currentProduct) {
            setUpdateFormData({
                name: currentProduct.name || "",
                description: currentProduct.description || "",
                originalPrice: currentProduct.originalPrice || "",
                newPrice: currentProduct.newPrice || "",
                mfgDate: currentProduct.mfgDate || "",
                expiryDate: currentProduct.expiryDate || "",
                rating: currentProduct.rating || "",
                company: currentProduct.company || "",
                category: currentProduct.category || "",
                size: currentProduct.size || "",
                flavor: currentProduct.flavor || ""
            });
        }
    }, [currentProductId, currentProduct]);

    
    

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const handleUpdateChange = (e) => {
        setUpdateFormData({...updateFormData, [e.target.name]: e.target.value });
    }

    function getImage (e) {
        const uploadedImage = e.target.files[0];
        if(uploadedImage){
            setFormData({
                ...formData,
                image: uploadedImage
            })
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage)
        fileReader.addEventListener("load",function(){
            setPreviewImage(this.result)
        })
    }
}

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formattedMFG = new Date(formData.mfgDate).toISOString().split("T")[0];
        const formattedEXP = new Date(formData.expiryDate).toISOString().split("T")[0];
        const fData = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'mfgDate') {
                fData.append(key, formattedMFG);
            } else if (key === 'expiryDate') {
                fData.append(key, formattedEXP);
            } else {
                fData.append(key, formData[key]);
            }
        });
        await dispatch(addProduct(fData));
        setFormData({
            name: '', description: '', originalPrice: '', newPrice: "", mfgDate: "",
            expiryDate: "", rating: '', company: "", category: "", size: "", flavor: "", image: ''
        })
    }

    const handleUpdateSubmit = async(e) => {
        e.preventDefault();
        const formattedMFG = new Date(updateFormData.mfgDate).toISOString().split("T")[0];
        const formattedEXP = new Date(updateFormData.expiryDate).toISOString().split("T")[0];
        await dispatch(updateProduct([currentProductId,{
            id: currentProductId,
            name: updateFormData.name,
            description: updateFormData.description,
            originalPrice: updateFormData.originalPrice,
            newPrice: updateFormData.newPrice,
            mfgDate: formattedMFG,
            expiryDate: formattedEXP,
            rating: updateFormData.rating,
            company: updateFormData.company,
            category: updateFormData.category,
            size: updateFormData.size,
            flavor: updateFormData.flavor
        }]));
        setCurrentProductId("");
        setUpdateFormData({
            name: "", description: "", originalPrice: "", newPrice: new Date(),
            mfgDate: new Date(), expiryDate: new Date(), rating: "", company: "",
            category: "", size: "", flavor: ""
        })
    }

    const handleDeleteProduct = async(id) => {
        if(window.confirm("Are you sure you want to delete this product?")){
            await dispatch(deleteProduct(id));
        }
    }

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 sm:p-6 my-6 border border-[#D90A14]'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-100 mb-4 sm:mb-0'>Product Settings</h2>
                <div className='relative w-full sm:w-auto'>
                    <select 
                        name="whatToDisplay" 
                        id="whatToDisplay" 
                        className='w-full sm:w-auto bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D90A14]' 
                        onChange={handledisplay}
                    >
                        <option value="add">Add Product</option>
                        <option value="edit">Update Product</option>
                        <option value="delete">Delete Product</option>
                    </select>
                </div>
            </div>

            {whatToDisplay === "add" && (
                <div className='max-w-7xl max-h-[calc(100vh-200px)] overflow-y-auto'>
                    <form className='grid grid-cols-1 sm:grid-cols-2 gap-4' onSubmit={handleSubmit}>
                        <div className='flex flex-col col-span-1 sm:col-span-2 justify-center items-center mb-4'>
                            <label htmlFor="image" className='cursor-pointer'>
                                {previewImage ? (
                                    <img src={previewImage} alt="image" className='w-24 h-24 overflow-hidden rounded-full object-cover' />
                                ) : (
                                    <CgProfile className='w-24 h-24' />
                                )}
                            </label>
                            <input type="file" onChange={getImage} id='image' name='image' className='hidden' />
                        </div>
                        <InputField label="Product Name" name="name" value={formData.name} onChange={handleChange} />
                        <InputField label="Original Price" name="originalPrice" value={formData.originalPrice} onChange={handleChange} type="number" />
                        <InputField label="New Price" name="newPrice" value={formData.newPrice} onChange={handleChange} type="number" />
                        <InputField label="Rating" name="rating" value={formData.rating} onChange={handleChange} type="number" />
                        <InputField label="MFG Date" name="mfgDate" value={formData.mfgDate} onChange={handleChange} type="date" />
                        <InputField label="Expiry Date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} type="date" />
                        <InputField label="Brand" name="company" value={formData.company} onChange={handleChange} />
                        <InputField label="Size" name="size" value={formData.size} onChange={handleChange} type="number" />
                        <InputField label="Flavor" name="flavor" value={formData.flavor} onChange={handleChange} />
                        <InputField label="Category" name="category" value={formData.category} onChange={handleChange} />
                        <div className='flex flex-col col-span-1 sm:col-span-2'>
                            <label htmlFor='description' className='text-white/40'>Description</label>
                            <textarea 
                                name='description' 
                                id='description' 
                                value={formData.description} 
                                onChange={handleChange} 
                                className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2 w-full' 
                                rows="4"
                            />
                        </div>
                        <div className='mt-6 col-span-1 sm:col-span-2 flex justify-end'>
                            <button type='submit' className='w-full sm:w-auto text-[#7738e3] border-2 border-[#7738e3] hover:bg-[#853ddc] hover:text-white hover:font-bold rounded-md p-2'>Add Product</button>
                        </div>
                    </form>
                </div>
            )}

            {whatToDisplay === "edit" && (
                <div className='w-full h-fit flex flex-col gap-4 border-2 border-white/20 rounded-lg p-4 sm:p-6'>
                    <p className='font-aclonica text-2xl sm:text-3xl font-bold mb-4'>Update A Product</p>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="product_selection" className='mb-2'>Select Product</label>
                        <select 
                            id="product_selection" 
                            name="product_selection" 
                            value={currentProductId} 
                            onChange={handleSelectedPlan} 
                            className='w-full py-2 border-b-2 border-gray-300 text-gray-200 bg-[#1d1d1d] outline-none rounded-md'
                        >
                            <option value="">Select Product</option>
                            {AllProducts.map((product) => (
                                <option key={product._id} className='text-[#7738e3]' value={product._id}>
                                    {product.name} + {product.company}
                                </option>
                            ))}
                        </select>
                    </div>
                    <form className='grid grid-cols-1 sm:grid-cols-2 gap-4' onSubmit={handleUpdateSubmit}>
                        <InputField label="Product Name" name="name" value={updateFormData.name} onChange={handleUpdateChange} />
                        <InputField label="Original Price" name="originalPrice" value={updateFormData.originalPrice} onChange={handleUpdateChange} type="number" />
                        <InputField label="New Price" name="newPrice" value={updateFormData.newPrice} onChange={handleUpdateChange} type="number" />
                        <InputField label="Rating" name="rating" value={updateFormData.rating} onChange={handleUpdateChange} type="number" />
                        <InputField label="MFG Date" name="mfgDate" value={updateFormData.mfgDate} onChange={handleUpdateChange} type="date" />
                        <InputField label="Expiry Date" name="expiryDate" value={updateFormData.expiryDate} onChange={handleUpdateChange} type="date" />
                        <InputField label="Brand" name="company" value={updateFormData.company} onChange={handleUpdateChange} />
                        <InputField label="Size" name="size" value={updateFormData.size} onChange={handleUpdateChange} type="number" />
                        <InputField label="Flavor" name="flavor" value={updateFormData.flavor} onChange={handleUpdateChange} />
                        <InputField label="Category" name="category" value={updateFormData.category} onChange={handleUpdateChange} />
                        <div className='flex flex-col col-span-1 sm:col-span-2'>
                            <label htmlFor='description' className='text-white/40'>Description</label>
                            <textarea 
                                name='description' 
                                id='description' 
                                value={updateFormData.description} 
                                onChange={handleUpdateChange} 
                                className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2 w-full' 
                                rows="4"
                            />
                        </div>
                        <div className='mt-6 col-span-1 sm:col-span-2 flex justify-end'>
                            <button type='submit' className='w-full sm:w-auto text-[#7738e3] border-2 border-[#7738e3] hover:bg-[#853ddc] hover:text-white hover:font-bold rounded-md p-2'>Update Product</button>
                        </div>
                    </form>
                </div>
            )}
            
            {whatToDisplay === "delete" && (
                <div className='w-full h-fit flex flex-col gap-4 border-2 border-white/20 rounded-lg p-4 sm:p-6'>
                    <p className='font-aclonica text-2xl sm:text-3xl font-bold mb-4'>Delete A Product</p>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="product_selection" className='mb-2'>Select Product</label>
                        <select 
                            id="product_selection" 
                            name="product_selection" 
                            value={currentProductId} 
                            onChange={handleSelectedPlan} 
                            className='w-full py-2 border-b-2 border-gray-300 text-gray-200 bg-[#1d1d1d] outline-none rounded-md'
                        >
                            <option value="">Select Product</option>
                            {AllProducts.map((product) => (
                                <option key={product._id} className='text-[#7738e3]' value={product._id}>
                                    {product.name} + {product.company}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex justify-end'>
                        <button 
                            onClick={() => handleDeleteProduct(currentProductId)} 
                            className='w-full sm:w-auto text-[#7738e3] border-2 border-[#7738e3] hover:bg-[#853ddc] hover:text-white hover:font-bold rounded-md p-2'
                        >
                            Delete Product
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    )
}

function InputField({ label, name, value, onChange, type = 'text' }) {
    return (
        <div className='flex flex-col'>
            <label htmlFor={name} className='text-white/40'>{label}</label>
            <input
                type={type}
                name={name}
                id={name}
                value={value || ""}
                onChange={onChange}
                className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2 w-full'
            />
        </div>
    )
}

export default AdminShop

