import { useState } from "react";
import HomeLayout from "../../layout/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPlan } from "../../Redux/Slices/PlanSlice";


function AddPlan () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const role = useSelector(state => state.auth.role);

    const [formData,setFormData] = useState({
        plan:"",
        description: "",
        price: "",
        duration: ""
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault();
        dispatch(addPlan(formData));
        setFormData({
            plan:"",
            description: "",
            price: "",
            duration: ""
        })
        navigate("/plan")
    }
    
    return (
        <HomeLayout>
        <div className="m-0 p-0 ">
            <div className="flex-row md:flex relative bg-base-300 px-5 pt-20 h-screen">
                <div className="w-full md:w-1/4">
                <h1 className="text-md sm:text-3xl p-0 sm:p-10 font-serif font-bold text-wrap">Add Membership Plan</h1>
                </div>
                <div className="flex flex-col absolute left-1/4 w-8/12 h-fit py-7 px-7 bg-white rounded-3xl">
                    {role==="Admin" && 
                    <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="plan"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Plan Name
                        </label>
                        <input
                            type="text"
                            id="plan"
                            name="plan"
                            value={formData.plan}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter description"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter price"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="duration"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Duration
                        </label>
                        <input
                            type="text"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter duration"
                        />
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-400">
                            Add Plan
                        </button>
                    </div>
                </form>
                    }
                </div>
            </div>
        </div>
        </HomeLayout>
    )
}

export default AddPlan;