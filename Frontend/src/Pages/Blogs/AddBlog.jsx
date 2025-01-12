import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {motion} from "framer-motion"
import HomeLayout from '../../layout/HomeLayout';
import parse from "html-react-parser";
import { useDispatch} from 'react-redux';
import { addBlog} from '../../Redux/Slices/BlogSlice';

function AddBlog() {
    const dispatch = useDispatch()
    const [content,setContent] = useState('');
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title:"",
        penName:"",
        tags:"",
        description:"",
        thumbnail:"",
    });


    const modules = {
        toolbar:[
            [{header: [1,2,false]}],
            ["bold","italic","underline","strike","blockquote"],
            [{list: "ordered"},{list:"unordered"}],
            ["link","color","image"],
            [{"code-block":true}],
            ["clean"]
        ]
    };

    const formats = [
        "header","bold","italic","underline","strike","blockquote","list","bullet","link","image","code-block","color"
    ]


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setIsSubmitting(true);
        const formDatatToSend = new FormData();
        Object.entries(formData).forEach(([key,value]) => {
            if(value!==null){
                formDatatToSend.append(key,value)
            }
        });
        console.log("Data send",formData);
        formDatatToSend.append('content',content);
        const res = await dispatch(addBlog(formDatatToSend));
        setIsSubmitting(false);
        console.log(res);
        setFormData({
            title:"",
            penName:"",
            tags:"",
            description:"",
            thumbnail:null,
        })
        setContent('');
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setFormData({
                ...formData,
                thumbnail: file
            })
        }
    }



  return (
    <HomeLayout>
        <div className='w-full h-fit flex flex-col p-4 md:p-6'>
            <p className='font-aclonica font-bold text-lg md:text-3xl bg-gradient-to-r from-[#D20C13] to-[#e86329] bg-clip-text text-transparent'>Add Blogs</p>
            <p className='font-normal text-[#b434e3]'>Create your very own <span className='font-creepster'>design...</span></p>
            <div className='grid grid-cols-1 md:grid-cols-2 my-6 gap-6'>
                {/* Form */}
                <form onSubmit={handleSubmit} className='border-2 border-[#D90A14]/30 flex flex-col rounded-xl p-4 md:p-6 font-vazirmatn'>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="title" className='text-[#D90A14]/50 font-aclonica'>Title</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder='Enter the title...' required className="w-full px-3 py-2 rounded-lg border-2 font-aclonica bg-transparent border-gray-300bg-transparent border-[#D90A14]/50 focus:border-[#D90A14] outline-none" />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="penName" className='text-[#D90A14]/50'>Pen Name</label>
                        <input type="text" id="penName" name="penName" value={formData.penName} onChange={handleChange} placeholder='Enter your pen name...' required className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-transparent border-[#D90A14]/50 focus:border-[#D90A14] outline-none" />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="tags" className='text-[#D90A14]/50'>Tag</label>
                        <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} placeholder='Enter tags...' required className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-transparent border-[#D90A14]/50 focus:border-[#D90A14] outline-none" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="description" className='text-[#D90A14]/50'>Description</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder='Enter the description...' required className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-transparent border-[#D90A14]/50 focus:border-[#D90A14] outline-none h-[200px]" />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="thummnail" className='text-[#D90A14]/50'>Thumbnail</label>
                        <input type="file" id="thummnail" name="thummnail" required  className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-transparent border-[#D90A14]/50 focus:border-[#D90A14] outline-none" onChange={handleImageChange} />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="content" className='text-[#D90A14]/50'>Content</label>
                        <ReactQuill
                            theme='snow'
                            value={content}
                            onChange={setContent}
                            modules={modules}
                            formats={formats}
                        />
                    </div>
                    <div>
                        <button type="submit" className='w-full py-2 rounded-lg text-white bg-[#D90A14]/80 hover:bg-[#e86329]'>{isSubmitting ? 'Submitting' : 'Submit'}</button>
                    </div>
                </form>     

                {/* Preview */}
                <div className='border-2 border-[#D90A14]/30 flex flex-col rounded-xl p-4 md:p-6 font-vazirmatn'>
                        <h2 className='font-aclonica font-bold text-lg md:text-3xl bg-gradient-to-r from-[#D20C13] to-[#e86329] bg-clip-text text-transparent mb-4'>Preview</h2>
                        <div className='text-xl font-aclonica font-medium'>
                            {formData.title}
                        </div>
                        <div className='text-sm font-light text-[#b434e3]'>
                            {formData.penName} {formData.penName ? (`: ${new Date().toLocaleDateString()}`) : ""}
                        </div>
                        <div className='text-sm py-3 font-vazirmatn'>
                            {formData.description}
                        </div>
                        <div className='flex gap-x-4 text-[#31b2ed] mb-4'>
                            {formData.tags.split(',').map((tag, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>
                        {formData.thumbnail && (
                            <img 
                                src={URL.createObjectURL(formData.thumbnail)} 
                                alt="Thumbnail preview" 
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                        )}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {parse(content)}
                        </motion.div>
                    </div>


            </div>
        </div>
    </HomeLayout>

)
}


export default AddBlog;