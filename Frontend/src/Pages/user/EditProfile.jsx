import { useState } from "react";
import HomeLayout from "../../layout/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editAvatar, editProfile, getUser } from "../../Redux/Slices/AuthSlice";
import { BsPersonCircle } from 'react-icons/bs';


function EditProfile () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { data } = useSelector((state) => state.auth);
    const Data = data.data;
    console.log(Data)
    const avatar = Data.avatar || "";


    const [formData, setFormData] = useState({
        name:Data.name,
        oldPassword:"",
        newPassword:"",
        gender:Data.gender,
        expertise:Data.expertise,
        experience:Data.experience,
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(editProfile(formData));
        await dispatch(getUser());
        navigate("/")
    }
    const [image,setImage] = useState({
        previewImage: avatar,
        avatar: null
    })


    const handleImageUpload = (e) => {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
    
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
    
            fileReader.onload = () => {
                setImage({
                    previewImage: fileReader.result,
                    avatar: uploadedImage,
                });
            };
        }
    };
    
    const handleAvatar = async (e) => {
        e.preventDefault();
    
        if (!image.avatar) {
            alert("Please upload an image before submitting.");
            return;
        }
    
        const formData = new FormData();
        formData.append("avatar", image.avatar);
    
        await dispatch(editAvatar(formData)); // Adjust API to accept FormData if needed
        navigate("/editProfile");
    };
    

    

    return (
        <HomeLayout>
        <div className="m-0 p-0 ">
            <div className="flex-row sm:flex relative bg-base-300 px-5 pt-20 h-screen">
                <div>
                <h1 className="text-md sm:text-3xl p-0 sm:p-10 font-serif font-bold">Edit Profile</h1>
                <form className="flex justify-center" onSubmit={handleAvatar}>
                <div className="mb-4 flex flex-col justify-center items-center">
                            <label
                                htmlFor="avatar"
                                className="block text-sm font-medium text-gray-700 border-none"
                            >
                                <div className="items-center rounded-full shadow-lg border-solid border-2 ">
                                {image.previewImage ? (
                            <img 
                                className="w-48 h-48 rounded-full m-auto"
                                src={image.previewImage}

                            />
                        ): (
                            <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
                        )}
                                </div>
                            </label>
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                onChange={handleImageUpload}
                                className="hidden"
                                accept=".jpg, .png, .svg, .jpeg"
                            />
                            <button type="submit" className="mt-5 w-fit bg-blue-600 font-serif font-medium text-white rounded-md px-3 py-2 hover:bg-blue-400 border-none">Upload</button>
                        </div>
                </form>
                </div>
                <div className="flex flex-col absolute left-1/4 w-8/12 h-screen py-7 px-7 bg-white rounded-3xl">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="oldPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Old Password
                            </label>
                            <input
                                type="password"
                                id="oldPassword"
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your old Password"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="newPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your new Password"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="gender"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Gender
                            </label>
                            <input
                                type="text"
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your gender"
                            />
                        </div>
                       
                        <div className="mb-4">
                            <label
                                htmlFor="expertise"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Expertise
                            </label>
                            <input
                                type="text"
                                id="expertise"
                                name="expertise"
                                value={formData.expertise}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your expertise"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="experience"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Experience
                            </label>
                            <input
                                type="number"
                                id="experience"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your experience"
                            />
                        </div>
                        <div className="mb-4">
                            <button type="submit" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-400">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </HomeLayout>
    )
}

export default EditProfile;