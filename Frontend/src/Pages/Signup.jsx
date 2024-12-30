import { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../Redux/Slices/AuthSlice";

function Signup () {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage,setPreviewImage] = useState("");

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        role: 'User',
        DOB: '',
        gender: '',
        joinDate: "",
        experience: 0,
        expertise: '',
        avatar: ""
    })

    function getImage (event) {
        event.preventDefault();
        const uploadedImage = event.target.files[0];
        if(uploadedImage){
            setFormData({
                ...formData,
                avatar : uploadedImage
            })
        };
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load",function () {
            setPreviewImage(this.result)
        })
    };

    async function onSignup (event) {
        event.preventDefault();
        // console.log(formData)
        // if(!formData.email || !formData.password || !formData.name || !formData.gender){
        //     toast.error("Please enter all the details")
        //     return;
        // }

        const Data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            Data.append(key, value);
        });
        console.log(Data)
        const res = await dispatch(signupUser(Data));
        if(res?.payload?.success) 
            navigate("/");
        setFormData({
            email: '',
            password: '',
            name: '',
            role: 'User',
            DOB: '',
            gender: '',
            joinDate: "",
            experience: 0,
            expertise: '',
            avatar: ""
        });

        setPreviewImage("");
    }



    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
            <form noValidate onSubmit={(e) => onSignup(e)} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-black w-fit shadow-[0_0_10px_black]">
                <h1 className="text-center text-2xl font-bold">Signup Page</h1>
                <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage} />
                        ) : (
                            <BsPersonCircle className='w-24 h-24 rounded-full m-auto' />
                        )}
                    </label>
                    <input 
                        onChange={getImage}
                        className="hidden"
                        type="file"
                        name="image_uploads"
                        id="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg"
                    />
                
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input 
                    type="email"
                    required
                    id="email"
                    name="email"
                    placeholder="Enter you email..."
                    className="bg-transaparent px-2 py-1 border"
                    value={formData.email}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input 
                        type="password"
                        required
                        id="password"
                        name="password"
                        placeholder="Enter your password..."
                        className="bg-transaparent px-2 py-1 border"
                        value={formData.password}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="font-semibold">Name</label>
                        <input 
                        type="text"
                        required
                        id="name"
                        name="name"
                        placeholder="Enter you name..."
                        className="bg-transaparent px-2 py-1 border"
                        value={formData.name}
                        onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="DOB" className="font-semibold">DOB</label>
                        <input 
                        type="date"
                        style={{ padding: "5px", fontSize: "16px" }}
                        required
                        id="DOB"
                        name="DOB"
                        placeholder="DOB"
                        className="bg-transaparent px-2 py-1 border"
                        value={formData.DOB}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="gender" className="font-semibold">Gender</label>
                        <select
                            name="gender"
                            id="gender"
                            className="font-semibold px-10 py-1 border"
                            onChange={handleInputChange}
                            value={formData.gender} 
                        >
                            <option value="" disabled>
                                Select Gender
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                        <label htmlFor="role" className="font-semibold">Role</label>
                        <select
                            name="role"
                            id="role"
                            className="font-semibold px-10 py-1 border"
                            onChange={handleInputChange}
                            value={formData.role} 
                        >
                            <option value="" disabled>
                                Select Role
                            </option>
                            <option value="User">User</option>
                            <option value="Trainer">Trainer</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="joinDate" className="font-semibold">Join Date</label>
                        <input 
                        type="date"
                        style={{ padding: "5px", fontSize: "16px" }}
                        required
                        id="joinDate"
                        name="joinDate"
                        placeholder="Join Date..."
                        className="bg-transaparent px-2 py-1 border"
                        value={formData.joinDate}
                        onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="experience" className="font-semibold">Experience</label>
                        <input 
                        type="number"
                        required
                        id="experience"
                        name="experience"
                        placeholder="Enter you experience..."
                        className="bg-transaparent px-2 py-1 border"
                        value={formData.experience}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="expertise" className="font-semibold">Expertise</label>
                        <input 
                        type="text"
                        required
                        id="expertise"
                        name="expertise"
                        placeholder="Enter you expertise..."
                        className="bg-transaparent px-2 py-1 border"
                        value={formData.expertise}
                        onChange={handleInputChange}
                        />
                    </div>
                </div>
                <button type="submit" className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                        Create account
                    </button>

                    <p className="text-center">
                        Already have an account ? <Link to="/login" className='link text-accent cursor-pointer'> Login</Link>
                    </p>
            </form>
        </div>
    )
}

export default Signup;