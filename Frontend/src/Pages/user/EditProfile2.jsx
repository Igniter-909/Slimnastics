import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editAvatar, editProfile, getUser } from '../../Redux/Slices/AuthSlice';
import { useNavigate } from 'react-router-dom';

function EditPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector(state => state.auth.data)
  const Data = data?.data || {};
  const avatar = data?.data?.avatar || "";

  const [image, setImage] = useState({
    previewImage: avatar,
    avatar: null
  });

  const [formData, setFormData] = useState({
    name: Data.name,
    oldPassword: '',
    newPassword: '',
    gender: Data.gender,
    experience:Data.experience,
    expertise: Data.expertise,
    socialMedia: Data.socialMedia,
    bio: Data.bio        
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

  const handleavatar = async(e) => {
    e.preventDefault();
    if(!image.avatar) {
      toast.error("Please select an image to upload");
      return;
    }
    const fData = new FormData();
    fData.append("avatar", image.avatar);
    await dispatch(editAvatar(fData));
    navigate("/profile");
  }

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({...formData, [e.target.name]: e.target.value })
  }

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
    <div className='w-full h-full p-4 flex flex-col border-2 rounded-lg border-red-500/40'>
      <h1 className='w-full text-2xl md:text-3xl font-vazirmatn mb-4'>Edit Profile</h1>
      <div className='w-full flex flex-col md:flex-row gap-6'>
        <form onSubmit={handleavatar} className='w-full md:w-1/4 flex flex-col items-center'>
          <label htmlFor="image_upload" className='cursor-pointer'>     
            <img src={image.previewImage} alt="avatar" className='w-40 h-40 md:w-56 md:h-56 rounded-full object-cover' />
          </label>
          <input type="file" onChange={handleImageUpload} id='image_upload' name='image_upload' className='hidden' />
          <button type="submit" className='mt-4 px-4 py-2 font-medium border-2 border-white/30 rounded-lg hover:bg-white hover:text-black transition-colors duration-300'>Upload</button>
        </form>
        <div className='w-full md:w-3/4'>
          <form onSubmit={handleSubmit} className='w-full space-y-4'>
            <div>
              <label htmlFor="name" className='block text-gray-300 mb-1'>Name</label>
              <input type="text" value={formData.name} onChange={handleChange} id='name' name='name' placeholder='Enter Your name..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='w-full md:w-1/2'>
                <label htmlFor="oldPassword" className='block text-gray-300 mb-1'>Old Password</label>
                <input type="password" id='oldPassword' name='oldPassword' placeholder='Enter old password..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
              </div>
              <div className='w-full md:w-1/2'>
                <label htmlFor="newPassword" className='block text-gray-300 mb-1'>New Password</label>
                <input type="password" id='newPassword' name='newPassword' placeholder='Enter new password..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='w-full md:w-1/3'>
                <label htmlFor="gender" className='block text-gray-300 mb-1'>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} id="gender" className='w-full px-3 py-2 rounded-lg border-2 focus:bg-[#5B0408] border-gray-300 text-gray-200 bg-transparent'>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className='w-full md:w-1/3'>
                <label htmlFor="experience" className='block text-gray-300 mb-1'>Experience</label>
                <input type="number" value={formData.experience} onChange={handleChange} id='experience' name='experience' placeholder='Enter Your Experience..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
              </div>
              <div className='w-full md:w-1/3'>
                <label htmlFor="expertise" className='block text-gray-300 mb-1'>Expertise</label>
                <input type="text" id='expertise' value={formData.expertise} onChange={handleChange} name='expertise' placeholder='Enter Your Expertise..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
              </div>
            </div>
            <div>
              <label htmlFor="socialMedia" className='block text-gray-300 mb-1'>Social Media</label>
              <input type="text" value={formData.socialMedia} onChange={handleChange} id='socialMedia' name='socialMedia' placeholder='Enter social media..' className='w-full px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent' />
            </div>
            <div>
              <label htmlFor="bio" className='block text-gray-300 mb-1'>Bio</label>
              <textarea name="bio" value={formData.bio} onChange={handleChange} id="bio" className='w-full min-h-[100px] max-h-[200px] px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-200 bg-transparent resize-y'></textarea>
            </div>
            <div className='flex justify-center'>
              <button className='bg-[#D90A14] text-white px-6 py-2 rounded-lg hover:bg-[#ea4152] transition-colors duration-300' type='submit'>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditPage;

