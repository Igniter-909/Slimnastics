import React, { useEffect, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { addProduct, deleteProduct, getAllProducts, getAProduct, updateProduct } from '../../Redux/Slices/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';

function AdminShop() {

    const dispatch = useDispatch()

    const [whatToDisplay,setToDisplay] = useState("add");

    const handledisplay = (e) => {
       e.preventDefault();
       setToDisplay(e.target.value);
    }

    const [currentProductId,setCurrentProductId] = useState("");

    const AllProducts = useSelector(state => state.product.allProducts);
    const currentProduct = useSelector(state => state.product.current);

    //for fetching all products at the start of page rendering
    useEffect(() => {
        const fetchAllProducts = async() => {
            await dispatch(getAllProducts())
        }
        fetchAllProducts();
    },[dispatch]);

    //for adding a product
    const [formData,setFormData] = useState({
        name: '',
        description: '',
        originalPrice: '',
        newPrice:"",
        mfgDate:"",
        expiryDate:"",
        rating:'',
        company:"",
        category:"",
        size:"",
        flavor:"",
        image: ''
     });


     //for updating Product
    const [updateFormData, setUpdateFormData] = useState({
        id: currentProduct._id,
        name: currentProduct.name,
        description: currentProduct.description,
        originalPrice: currentProduct.originalPrice,
        newPrice: currentProduct.newPrice,
        mfgDate: currentProduct.mfgDate,
        expiryDate: currentProduct.expiryDate,
        rating: currentProduct.rating,
        company: currentProduct.company,
        category: currentProduct.category,
        size: currentProduct.size,
        flavor: currentProduct.flavor
     });



     //get current plan
     const handleSelectedPlan = async(e) => {
        e.preventDefault();
        setCurrentProductId(e.target.value)
        await dispatch(getAProduct(e.target.value));
     }

     //handling add product change
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    //handling update product
    const handleUpdateChange = (e) => {
        setUpdateFormData({...updateFormData, [e.target.name]: e.target.value });
    }

    // for displaaying preview image
    const [previewImage, setPreviewImage] = useState('');

    function getImage (e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage){
            setFormData({
                ...formData,
                image: uploadedImage
            })
        }
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage)
        fileReader.addEventListener("load",function(){
            setPreviewImage(this.result)
        })
    }
    
    console.log(AllProducts)

    //add product 
    const handleSubmit = async(e) => {
        e.preventDefault();
        const formattedMFG = new Date(formData.mfgDate).toISOString().split("T")[0];
        const formattedEXP = new Date(formData.expiryDate).toISOString().split("T")[0];
        const fData = new FormData();
        fData.append('name',formData.name);
        fData.append('description',formData.description);
        fData.append('originalPrice',formData.originalPrice);
        fData.append('newPrice',formData.newPrice);
        fData.append('mfgDate',formattedMFG);
        fData.append('expiryDate',formattedEXP);
        fData.append('rating',formData.rating);
        fData.append('company',formData.company);
        fData.append('category',formData.category);
        fData.append('size',formData.size);
        fData.append('flavor',formData.flavor);
        fData.append('image',formData.image);
        await dispatch(addProduct(fData));
        setFormData({
            name: '',
            description: '',
            originalPrice: '',
            newPrice:"",
            mfgDate:"",
            expiryDate:"",
            rating:'',
            company:"",
            category:"",
            size:"",
            flavor:"",
            image: ''
        })
    }
    const handleUpdateSubmit = async(e) => {
        e.preventDefault();
        const formattedMFG = new Date(updateFormData.mfgDate).toISOString().split("T")[0];
        const formattedEXP = new Date(updateFormData.expiryDate).toISOString().split("T")[0];
        const ffData = new FormData();
        ffData.append('id',updateFormData.id);
        ffData.append('name',updateFormData.name);
        ffData.append('description',updateFormData.description);
        ffData.append('originalPrice',updateFormData.originalPrice);
        ffData.append('newPrice',updateFormData.newPrice);
        ffData.append('mfgDate',formattedMFG);
        ffData.append('expiryDate',formattedEXP);
        ffData.append('rating',updateFormData.rating);
        ffData.append('company',updateFormData.company);
        ffData.append('category',updateFormData.category);
        ffData.append('size',updateFormData.size);
        ffData.append('flavor',updateFormData.flavor)
        await dispatch(updateProduct(ffData));
        setCurrentProductId("");
        setUpdateFormData({
            id: "",
            name: "",
            description: "",
            originalPrice: "",
            newPrice: new Date(),
            mfgDate: new Date(),
            expiryDate: new Date(),
            rating: "",
            company: "",
            category: "",
            size: "",
            flavor: ""
        })
    }

    //delete a product

    const handleDeleteProduct = async(id) => {
        if(window.confirm("Are you sure you want to delete this product?")){
            await dispatch(deleteProduct(id));
        }
    }

  return (
    <>
        <p className='text-2xl font-rubik text-[#7738e3]'>Shop Settings</p>
        <select name="whatToDisplay" id="whatToDisplay" className='bg-[#1d1d1d] border-2 border-[#7738e3] rounded-lg py-3' onChange={handledisplay}>
            <option value="add">Add Product</option>
            <option value="edit">Edit Product</option>
            <option value="delete">Delete Product</option>
        </select>
                {whatToDisplay === "add" && (
                    <div className='w-full h-fit flex flex-col gap-4 border-2 border-white/20 rounded-lg p-6'>
                    <p className='font-aclonica text-3xl font-bold'>Add A Product</p>
                    <form className='grid grid-cols-2 gap-4' onSubmit={handleSubmit}>
                        <div className='flex flex-col col-span-2 justify-center items-center'>
                            <label htmlFor="image" className='cursor-pointer'>
                                {previewImage? (
                                    <img src={previewImage} alt="image" className='w-24 h-24 overflow-hidden rounded-full' />
                                ) : (
                                    <CgProfile className='w-24 h-24' />
                                )}
                            </label>
                            <input type="file" onChange={getImage} id='image' name='image' className='hidden' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='name' className='text-white/40'>Product Name</label>
                            <input type='text' name='name' id='name' value={formData.name} onChange={handleChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='originalPrice' className='text-white/40'>Original Price</label>
                            <input type='number' name='originalPrice' id='originalPrice' value={formData.originalPrice} onChange={handleChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='newPrice' className='text-white/40'>New Price</label>
                            <input type='number' name='newPrice' id='newPrice' value={formData.newPrice} onChange={handleChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='rating' className='text-white/40'>Rating</label>
                            <input type='number' name='rating' id='rating' value={formData.rating} onChange={handleChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='mfgDate' className='text-white/40'>MFG Date</label>
                            <input type='date' name='mfgDate' id='mfgDate' value={formData.mfgDate} onChange={handleChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='expiryDate' className='text-white/40'>Expiry Date</label>
                            <input type='date' name='expiryDate' id='expiryDate' value={formData.expiryDate} onChange={handleChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='company' className='text-white/40'>Brand</label>
                            <input type='text' name='company' id='company' value={formData.company} onChange={handleChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='size' className='text-white/40'>Size</label>
                            <input type='number' name='size' id='size' value={formData.size} onChange={handleChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='flavor' className='text-white/40'>Flavor</label>
                            <input type='text' name='flavor' id='flavor' value={formData.flavor} onChange={handleChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='category' className='text-white/40'>Category</label>
                            <input type='text' name='category' id='category' value={formData.category} onChange={handleChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='flex flex-col col-span-2'>
                            <label htmlFor='description' className='text-white/40'>Description</label>
                            <textarea name='description' id='description' value={formData.description} onChange={handleChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='mt-6 col-span-2 flex justify-end'>
                            <button type='submit' className='text-[#7738e3] border-2 border-[#7738e3] hover:bg-[#853ddc] hover:text-white hover:font-bold rounded-md p-2'>Add Product</button>
                        </div>
                        
                        
                    </form>
                </div>
                )}

                {whatToDisplay === "edit" && (
                    <div className='w-full h-fit flex flex-col gap-4 border-2 border-white/20 rounded-lg p-6'>
                    <p className='font-aclonica text-3xl font-bold'>Update A Product</p>

                    <div className='flex flex-col'>
                        <label htmlFor="product_selection">Select Product</label>
                        <select id="product_selection" name="product_selection" value={currentProductId} onChange={handleSelectedPlan} className='w-full py-2  border-b-2 border-gray-300 text-gray-200 bg-[#1d1d1d] outline-none'>
                            <option value="">Select Product</option>
                            {AllProducts.map((product) => {
                                return <option key={product._id} className='text-[#7738e3]' value={product._id}>{product.name} + {product.company}</option>
                            })}
                        </select>
                    </div>
                    <form className='grid grid-cols-2 gap-4' onSubmit={handleUpdateSubmit}>
                        <div className='flex flex-col'>
                            <label htmlFor='name' className='text-white/40'>Product Name</label>
                            <input type='text' name='name' id='name' value={updateFormData.name} onChange={handleUpdateChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='originalPrice' className='text-white/40'>Original Price</label>
                            <input type='number' name='originalPrice' id='originalPrice' value={updateFormData.originalPrice} onChange={handleUpdateChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='newPrice' className='text-white/40'>New Price</label>
                            <input type='number' name='newPrice' id='newPrice' value={updateFormData.newPrice} onChange={handleUpdateChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='rating' className='text-white/40'>Rating</label>
                            <input type='number' name='rating' id='rating' value={updateFormData.rating} onChange={handleUpdateChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='mfgDate' className='text-white/40'>MFG Date</label>
                            <input type='date' name='mfgDate' id='mfgDate' value={updateFormData.mfgDate} onChange={handleUpdateChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='expiryDate' className='text-white/40'>Expiry Date</label>
                            <input type='date' name='expiryDate' id='expiryDate' value={updateFormData.expiryDate} onChange={handleUpdateChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='company' className='text-white/40'>Brand</label>
                            <input type='text' name='company' id='company' value={updateFormData.company} onChange={handleUpdateChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='size' className='text-white/40'>Size</label>
                            <input type='number' name='size' id='size' value={updateFormData.size} onChange={handleUpdateChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='flavor' className='text-white/40'>Flavor</label>
                            <input type='text' name='flavor' id='flavor' value={updateFormData.flavor} onChange={handleUpdateChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='category' className='text-white/40'>Category</label>
                            <input type='text' name='category' id='category' value={updateFormData.category} onChange={handleUpdateChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='flex flex-col col-span-2'>
                            <label htmlFor='description' className='text-white/40'>Description</label>
                            <textarea name='description' id='description' value={updateFormData.description} onChange={handleUpdateChange} className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2' />
                        </div>
                        <div className='mt-6 col-span-2 flex justify-end'>
                            <button type='submit' className='text-[#7738e3] border-2 border-[#7738e3] hover:bg-[#853ddc] hover:text-white hover:font-bold rounded-md p-2'>Update Product</button>
                        </div>
                        
                        
                    </form>
                </div>
                )}
                
                {whatToDisplay === "delete" && (
                    <div className='w-full h-fit flex flex-col gap-4 border-2 border-white/20 rounded-lg p-6'>
                    <p className='font-aclonica text-3xl font-bold'>Delete A Product</p>
                    <div className='flex flex-col'>
                        <label htmlFor="product_selection">Select Product</label>
                        <select id="product_selection" name="product_selection" value={currentProductId} onChange={handleSelectedPlan} className='w-full py-2  border-b-2 border-gray-300 text-gray-200 bg-[#1d1d1d] outline-none'>
                            <option value="">Select Product</option>
                            {AllProducts.map((product) => {
                                return <option key={product._id} className='text-[#7738e3]' value={product._id}>{product.name} + {product.company}</option>
                            })}
                        </select>
                    </div>

                    <div className='flex justify-end'>
                        <button onClick={handleDeleteProduct} className='text-[#7738e3] border-2 border-[#7738e3] hover:bg-[#853ddc] hover:text-white hover:font-bold rounded-md p-2'>Delete Product</button>
                    </div>

                </div>
                )}

    </>
  )
}

export default AdminShop