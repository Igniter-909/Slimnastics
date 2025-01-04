import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editAvatar, editProfile, getUser } from '../../Redux/Slices/AuthSlice';
import { useNavigate } from 'react-router-dom';

function EditPage() {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = useSelector(state => state.auth.data)
    const Data = data.data || {};
    const avatar = data.data.avatar || "";

    // handle image data
    const [image,setImage] = useState({
        previewImage: avatar,
        avatar: null
    })
    // handle image upload
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
    // handle form submit

    const handleavatar = async(e) => {
        e.preventDefault();
        if(!image.avatar) {
            toast.error("Please select an image to upload");
            return;
        }
        const fData = new FormData();
        fData.append("avatar",image.avatar);
        await dispatch(editAvatar(fData));
        navigate("/profile");
    }

    // handle form data
    const [formData,setFormData] = useState({
        name: Data.name,
        oldPassword: '',
        newPassword: '',
        gender:Data.gender,
        experience:Data.experience,
        expertise:Data.expertise,
        socialMedia:Data.socialMedia,
        bio:Data.bio        
    })

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value })
    }
    // handle form submit

    const handleSubmit = async(e) => {
        e.preventDefault();
        await dispatch(editProfile(formData));
        await dispatch(getUser());
        navigate("/profile");
        setFormData({
            name: formData.name,
            oldPassword: '',
            newPassword: '',
            gender: formData.gender,
            experience: formData.experience,
            expertise: formData.expertise,
            socialMedia: formData.socialMedia,
            bio: formData.bio,
        })
    }

  return (
    <div className='w-full h-fit p-6 pb-0 flex flex-col border-2 rounded-lg border-white/60 mx-5'>
          <p className='w-full h-fit text-3xl font-vazirmatn'>Edit Profile</p>
          <div className='w-full h-fit flex gap-6 p-6 '>
            <form onSubmit={handleavatar}>
                <label htmlFor="image_upload">     
                    <img src={image.previewImage} alt="avatar" className='overflow-hidden h-56 w-56 rounded-full' />
                </label>
                <input type="file" onChange={handleImageUpload} id='image_upload' name='image_upload' className='hidden' />
                <button type="submit" className='mt-6 px-3 py-1 font-extralight border-2 border-white/30 rounded-lg hover:bg-white hover:font-bold hover:text-black'>Upload</button>
  
            </form>
            <div className='w-3/4 h-fit flex flex-col gap-6 '>
              <div className='w-full h-fit flex flex-col gap-2 border-2 border-white/20 rounded-lg p-2'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor="name" className='block text-gray-300 mb-2'>Name</label>
                        <input type="text" value={formData.name} onChange={handleChange} id='name' name='name' placeholder='Enter Your name..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                    </div>
                    <div className='flex gap-5 w-full'>
                        <div className='mb-4 w-1/2'>
                            <label htmlFor="oldPassword" className='block text-gray-300 mb-2'>Old Password</label>
                            <input type="password" id='oldPassword' name='oldPassword' placeholder='Enter old password..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                        </div>
                        <div className='mb-4 w-1/2'>
                            <label htmlFor="newPassword" className='block text-gray-300 mb-2'>New Password</label>
                            <input type="password" id='newPassword' name='newPassword' placeholder='Enter new password..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                        </div>
                    </div>
  
                    <div className='flex gap-5'>
                        <div className='w-full mb-4'>
                            <label htmlFor="gender" className='block text-gray-300 mb-2'>Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} id="gender" className='w-full px-3 py-2 rounded-lg border-2 focus:bg-[#5B0408] border-gray-300 text-gray-200 bg-transparent'>
                               <option value="">Select Gender</option>
                                 <option value="Male">Male</option>
                                 <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='w-full mb-4'>
                            <label htmlFor="experience" className='block text-gray-300 mb-2'>Experience</label>
                            <input type="number" value={formData.experience} onChange={handleChange} id='experience' name='experience' placeholder='Enter Your Experience..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                        </div>
                        <div className='w-full mb-4'>
                        <label htmlFor="expertise" className='block text-gray-300 mb-2'>Expertise</label>
                             <input type="text" id='expertise' value={formData.expertise} onChange={handleChange} name='expertise' placeholder='Enter Your Expertise..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                        </div>
                    </div>
                    <div className='w-full mb-4'>
                        <label htmlFor="socialMedia" className='block text-gray-300 mb-2'>Social Media</label>
                             <input type="text" value={formData.socialMedia} onChange={handleChange} id='socialMedia' name='socialMedia' placeholder='Enter social media..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
                        </div>
                        <div className='w-full mb-4'>
                        <label htmlFor="bio" className='block text-gray-300/35'>Bio</label>
                        <textarea name="bio" value={formData.bio} onChange={handleChange} id="bio" className='w-full min-h-[100px] max-h-[400px] resize-y p-2 border-2 rounded-lg bg-transparent outline-none'></textarea>
                </div>
                        <div className='w-full flex justify-center'>
                            <button className='bg-[#D90A14] text-white my-2 px-4 py-2 rounded-lg w-full hover:bg-[#ea4152]' type='submit'>Update</button>
                    </div>
                </form>
            </div>
                

        </div>
    </div>
  </div>
  )
}

export default EditPage;