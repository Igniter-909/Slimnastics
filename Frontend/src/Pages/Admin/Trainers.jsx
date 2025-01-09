import React, { useState } from 'react'
import ProfileLayout from '../../layout/ProfileLayout'
import Header from '../../components/Common/Header'
import { useDispatch } from 'react-redux'
import { signupUser } from '../../Redux/Slices/AuthSlice';
import { CgProfile } from 'react-icons/cg';
import {motion} from "framer-motion";
import TrainerTable from '../../components/Trainer/TrainerTable';

function Trainers() {

    const dispatch = useDispatch();
    const [formData,setFormData] = useState({
        name: '',
        email: '',
        password: '',
        DOB: '',
        avatar: '',
        bio: '',
        experience: '',
        expertise:"",
        role:"Trainer",
        socialMedia: '',
        gender: "",
        joinDate:"",
    })

    const [previewImage,setPreviewImage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const getImage = (e) => {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage){
            setFormData({
                ...formData,
                avatar: uploadedImage
            })
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load",function() {
            setPreviewImage(this.result)
        })}
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const Data = new FormData();
        Object.entries(formData).forEach(([key,value]) => {
            Data.append(key,value)
        });
        const res = await dispatch(signupUser(Data));
        if(res?.payload?.success){
            setFormData({
                name: '',
                email: '',
                password: '',
                DOB: '',
                avatar: '',
                bio: '',
                experience: '',
                expertise:"",
                role:"Trainer",
                socialMedia: '',
                gender: "",
                joinDate:"",
            })
        };
        setPreviewImage("");
    }

  return (
    <ProfileLayout>
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title={"Trainers"} />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>

            <TrainerTable />

            <motion.div 
                className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 sm:p-6 my-6 border border-[#D90A14]'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-100 mb-4 sm:mb-0'>Add Trainer</h2>
            </div>
            <div className='max-w-7xl max-h-[calc(100vh-200px)] overflow-y-auto flex flex-col'>
                <form className='grid grid-cols-1 sm:grid-cols-2 gap-4' onSubmit={handleSubmit}>
                    <div className='flex flex-col col-span-1 sm:col-span-2 justify-center items-center mb-4'>
                        <label htmlFor="avatar" className='cursor-pointer'>
                            {previewImage ? (
                                <img src={previewImage} alt="avatar" className='w-24 h-24 overflow-hidden rounded-full object-cover' />
                                ) : (
                                <CgProfile className='w-24 h-24' />
                            )}
                        </label>
                        <input type="file" onChange={getImage} id='avatar' name='avatar' className='hidden' />
                    </div>
                    <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
                    <InputField label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
                    <InputField label="Password" name="password" value={formData.password} onChange={handleChange} type="password" />
                    <InputField label="DOB" name="DOB" value={formData.DOB} onChange={handleChange} type="date" />
                    <InputField label="Join Date" name="joinDate" value={formData.joinDate} onChange={handleChange} type="date" />
                    <InputField label="Experience" name="experience" value={formData.experience} onChange={handleChange} type="number" />
                    <InputField label="Expertise" name="expertise" value={formData.expertise} onChange={handleChange} />
                    <InputField label="Social Media" name="socialMedia" value={formData.socialMedia} onChange={handleChange}/>
                    <InputField label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
                    <div className='flex flex-col col-span-1 sm:col-span-2'>
                        <label htmlFor='bio' className='text-white/40'>Bio</label>
                        <textarea 
                            name='bio' 
                            id='bio' 
                            value={formData.bio} 
                            onChange={handleChange} 
                            className='border-b-2 bg-transparent outline-none border-[#7738e3] rounded-md p-2 w-full' 
                            rows="4"
                        />
                    </div>
                    <div className='mt-6 col-span-1 sm:col-span-2 flex justify-end'>
                        <button type='submit' className='w-full sm:w-auto text-[#7738e3] border-2 border-[#7738e3] hover:bg-[#853ddc] hover:text-white hover:font-bold rounded-md p-2'>Add Trainer</button>
                    </div>
                </form>
            </div>
            </motion.div>
            
            </main>
        </div>
        
    </ProfileLayout>
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

export default Trainers