import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, removeUser } from "../../Redux/Slices/AdminSlice";

const UsersTable = () => {



    const dispatch = useDispatch();

    const {allusers} = useSelector(state => state.admin);
    const [searchTerm, setSearchTerm] = useState("");
    const [dialog,setDialog] = useState(false);
    const [selectedUser,setSelectedUser] = useState("");
	const [filteredUsers, setFilteredUsers] = useState([]);
    
    useEffect(() => {
        const fetchAllUsers = async() => {
            await dispatch(getAllUsers());
        }
        fetchAllUsers();
    },[dispatch])

    useEffect(() => {
        const userData = allusers.filter(user => user?.role === "User");
        setFilteredUsers(userData);
    }, [allusers]);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = userData.filter(
			(user) => user?.role=== "User" && (user?.name?.toLowerCase().includes(term) || user?.email?.toLowerCase().includes(term) || user?.expertise?.toLowerCase().includes(term))
		);
		setFilteredUsers(filtered);
	};

    const deleteAccount = async(_id) => {
        setSelectedUser(_id);
        setDialog(true);
    }
    const handleConfirm = async() => {
        await dispatch(removeUser(selectedUser));
        setFilteredUsers(filteredUsers?.filter(user => user?._id !== selectedUser));
        setDialog(false);
    }

    const handleCancel = () => {
        setDialog(false);
        setSelectedUser("");
    }


	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-[#D90A14]'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Users</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search users...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto max-h-96'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Name
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Email
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Expertise
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Gender
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{filteredUsers.map((user) => (
							<motion.tr
								key={user._id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 h-10 w-10'>
											<div className='h-10 w-10 rounded-full flex items-center justify-center'>
												<img src={user.avatar} alt="profile" className="h-10 w-10 overflow-hidden rounded-full" />
											</div>
										</div>
										<div className='ml-4'>
											<div className='text-sm font-medium text-gray-100'>{user.name}</div>
										</div>
									</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{user.email}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100'>
										{user.expertise}
									</span>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<span
										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
											user.gender === "Male"
												? "bg-green-800 text-red-100"
												: (user.gender === "Female" ? "bg-pink-600 text-pink-100" : "bg-green-800 text-green-100")
										}`}
									>
										{user.gender}
									</span>
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button className='text-red-400 hover:text-red-300' onClick={() => deleteAccount(user._id)}>Delete</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
            {dialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-[#1D1D1D] bg-opacity-90">
                    <div className="bg-black rounded-lg shadow-xl p-6 w-fit">
                        <h2 className="text-lg font-semibold font-vazirmatn text-center text-[#D90A14]">
                            Are you sure to delete this account?
                        </h2>
                          <div className="mt-4 flex justify-between">
                            <button
                                className="px-4 py-2 bg-[#D90A14] text-white rounded hover:bg-[#a22c32]"
                                    onClick={handleConfirm}
                            >
                                OK
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                        
                    </div>
                </div>
              )}    
		</motion.div>
	);
};
export default UsersTable;