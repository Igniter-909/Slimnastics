import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {motion} from "framer-motion"
import { addPlan, deletePlan, getAllPlans, getAPlan, updatePlan } from '../../Redux/Slices/PlanSlice';

function AdminPlans() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [whatToDisplay, setToDisplay] = useState("add");
    const [currentPlanId,setCurrentPlanId] = useState(''); //for storing the current plan id

    //fetching current or selected plan
    const plan = useSelector(state => state.membership.plan);

    // fetching all plans
    const plans = useSelector(state => state.membership.plans);

    const [formData,setFormData] = useState({
        plan: "",
        price: "",
        duration: "",
        description: "",
        benefits: ""
    }) // for adding the plan

    const [formData2,setFormData2] = useState({
        id:"",
        plan:"",
        price:"",
        duration:"",
        description:"",
        benefits:""
    })

    useEffect(() => {
        const fetchPlans = async() => {
            await dispatch(getAllPlans())
        };
        fetchPlans();
    },[dispatch,plan]);

    const handledisplay = (e) => {
        e.preventDefault();
        setToDisplay(e.target.value);
    }

    const handleSelectedPlan = async(e) => {
        e.preventDefault();
        setCurrentPlanId(e.target.value)
        await dispatch(getAPlan(e.target.value));
    }

    useEffect(() => {
        if(currentPlanId && plan){
            setFormData2({
                id: plan._id,
                plan: plan.plan,
                price: plan.price,
                duration: plan.duration,
                description: plan.description,
                benefits: plan.benefits
            })
        }
    },[currentPlanId,plan]);

    const handleAddInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    //update a plan function
    const handleUpdateInputChange = (e) => {
        setFormData2({
           ...formData2,
            [e.target.name]: e.target.value
        })
    }

    //add a plan
    const handleAddPlan = async() => {
        await dispatch(addPlan(formData))
        navigate("/plans")
        setFormData({
            plan: "",
            price: "",
            duration: "",
            description: "",
            benefits:""
        })
    }


//update a plan
    const handleUpdatePlan = async() => {
        await dispatch(updatePlan({
            id:currentPlanId,
            plan:formData2.plan,
            price:formData2.price,
            duration:formData2.duration,
            description:formData2.description,
            benefits:formData2.benefits
        }));

        setCurrentPlanId("");
        setFormData2({
            id: "",
            plan:"",
            price:"",
            duration:"",
            description:"",
            benefits:""
        })
    }

    const handleDeletePlan = async(id) => {
            if(window.confirm("Are you sure you want to delete this plan?")){
                await dispatch(deletePlan(id));
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
            <h2 className='text-xl font-semibold text-gray-100 mb-4 sm:mb-0'>Plan Settings</h2>
            <div className='relative w-full sm:w-auto'>
                <select 
                    name="whatToDisplay" 
                    id="whatToDisplay" 
                    className='w-full sm:w-auto bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D90A14]' 
                    onChange={handledisplay}
                >
                    <option value="add">Add Plan</option>
                    <option value="edit">Update Plan</option>
                    <option value="delete">Delete Plan</option>
                </select>
            </div>
        </div>

        {whatToDisplay === "add" && (
            <div className='max-w-7xl max-h-[calc(100vh-200px)] overflow-y-auto'>
                <form className='grid grid-cols-1 sm:grid-cols-2 gap-4' onSubmit={handleAddPlan}>
                    <InputField label="Plan Title" name="plan" value={formData.plan} onChange={handleAddInputChange} />
                    <InputField label="Price" name="price" value={formData.price} onChange={handleAddInputChange} type="number" />
                    <InputField label="Duration" name="duration" value={formData.duration} onChange={handleAddInputChange} type="number" />
                    <div className='flex flex-col col-span-1 sm:col-span-2'>
                        <label htmlFor='benefits' className='text-white/40'>Benefits</label>
                            <textarea 
                                name='benefits' 
                                id='benefits' 
                                value={formData.benefits} 
                                onChange={handleAddInputChange} 
                                className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2 w-full' 
                                rows="4"
                            />
                    </div>
                    <div className='flex flex-col col-span-1 sm:col-span-2'>
                        <label htmlFor='description' className='text-white/40'>Description</label>
                            <textarea 
                                name='description' 
                                id='description' 
                                value={formData.description} 
                                onChange={handleAddInputChange} 
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
                <p className='font-aclonica text-2xl sm:text-3xl font-bold mb-4'>Update A Plan</p>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="product_selection" className='mb-2'>Select Plan</label>
                        <select 
                            id="product_selection" 
                            name="product_selection" 
                            value={currentPlanId} 
                            onChange={handleSelectedPlan} 
                            className='w-full py-2 border-b-2 border-gray-300 text-gray-200 bg-[#1d1d1d] outline-none rounded-md'
                        >
                            <option value="">Select Product</option>
                            {plans.map((plan) => (
                                <option key={plan._id} className='text-[#7738e3]' value={plan._id}>
                                    {plan.plan}
                                </option>
                            ))}
                        </select>
                    </div>
                    <form className='grid grid-cols-1 sm:grid-cols-2 gap-4' onSubmit={handleUpdatePlan}>
                        <InputField label="Plan Title" name="plan" value={formData2.plan} onChange={handleUpdateInputChange} />
                        <InputField label="Price" name="price" value={formData2.price} onChange={handleUpdateInputChange} type="number" />
                        <InputField label="Duration" name="duration" value={formData2.duration} onChange={handleUpdateInputChange} type="number" />
                        <div className='flex flex-col col-span-1 sm:col-span-2'>
                            <label htmlFor='benefits' className='text-white/40'>Benefits</label>
                            <textarea 
                                name='benefits' 
                                id='benefits' 
                                value={formData2.benefits} 
                                onChange={handleUpdateInputChange} 
                                className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2 w-full' 
                                rows="4"
                            />
                        </div>
                        <div className='flex flex-col col-span-1 sm:col-span-2'>
                            <label htmlFor='description' className='text-white/40'>Description</label>
                            <textarea 
                                name='description' 
                                id='description' 
                                value={formData2.description} 
                                onChange={handleUpdateInputChange} 
                                className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2 w-full' 
                                rows="4"
                            />
                        </div>
                        <div className='mt-6 col-span-1 sm:col-span-2 flex justify-end'>
                            <button type='submit' className='w-full sm:w-auto text-[#7738e3] border-2 border-[#7738e3] hover:bg-[#853ddc] hover:text-white hover:font-bold rounded-md p-2'>Update Plan</button>
                        </div>
                        <div className='mt-2 text-gray-300/35'>*Note: Changing price will affect customers who have already subscribed to this plan.</div>
                        <div className='mt-2 text-gray-300/35'>*Note: Changing duration,benefits and description will not affect customers who have already subscribed to this plan. You will need to update their subscription manually.</div>
                    </form>
                </div>
            )}

            
        {whatToDisplay === "delete" && (
            <div className='w-full h-fit flex flex-col gap-4 border-2 border-white/20 rounded-lg p-4 sm:p-6'>
                <p className='font-aclonica text-2xl sm:text-3xl font-bold mb-4'>Delete A Plan</p>
                <div className='flex flex-col mb-4'>
                    <label htmlFor="plan_selection" className='mb-2'>Select Plan</label>
                    <select 
                        id="plan_selection" 
                        name="plan_selection" 
                        value={currentPlanId} 
                        onChange={handleSelectedPlan} 
                        className='w-full py-2 border-b-2 border-gray-300 text-gray-200 bg-[#1d1d1d] outline-none rounded-md'
                    >
                        <option value="">Select Plan</option>
                        {plans.map((plan) => (
                            <option key={plan._id} className='text-[#7738e3]' value={plan._id}>
                                {plan.plan}
                            </option>
                        ))}
                    </select>
                </div>
                    <div className='flex justify-end'>
                        <button 
                            onClick={() => handleDeletePlan(currentPlanId)} 
                            className='w-full sm:w-auto text-[#7738e3] border-2 border-[#7738e3] hover:bg-[#853ddc] hover:text-white hover:font-bold rounded-md p-2'
                        >
                            Delete Plan
                        </button>
                    </div>
                    <div className='mt-2 text-gray-300/35'>*Note: Deleting a plan will affect customers who have already subscribed to this plan.</div>
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

export default AdminPlans