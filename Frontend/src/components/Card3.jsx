const Card3 = (user) => {

    const role = user?.user?.role;

    return (
        <div key={user?.user?._id}>
            {role==="Trainer" && 
                <div className="card bg-base-100 w-96 shadow-xl mt-10 border-b-4 p-8 mb-8">
                    <figure className="h-60 rounded">
                        <img
                        src={user.user.avatar}
                        alt="Shoes" />
                    </figure>
                    <div className="card-body items-center">
                        <h2 className="card-title">{user?.user?.name?.toUpperCase()}</h2>
                        <p>Experience: {user?.user?.experience}</p>
                        <p>Expertise: {user?.user?.expertise?.toUpperCase()}</p>
                        <div className="card-actions">
                            <button className="btn btn-primary">View Profile</button>
                        </div>
                    </div>
                </div>
            }
            {role === "User" && 
            <div className="card bg-base-100 w-96 shadow-xl mt-10 border-b-4 p-8 mb-8">
            <figure className="h-60 rounded-full">
                <img
                src={user?.user?.avatar}
                alt="Shoes" />
            </figure>
            <div className="card-body items-center">
                <h2 className="card-title">{user?.user?.name?.toUpperCase()}</h2>
                <div className="card-actions">
                    <button className="btn btn-primary">View Profile</button>
                </div>
            </div>
        </div>
            }
        </div>
    )
}
export default Card3;