import { Link } from "react-router-dom";

function Card2({plan,description,duration,_id}) {
    
    return (
        <div key={_id} className="card lg:card-side bg-base-100 shadow-xl">
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                alt="Album" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{plan.toUpperCase()}</h2>
                <p>{description}</p>
                <p className="card-title">Duration : {duration} days</p>
                <div className="card-actions justify-end">
                <div className="flex gap-4 justify-center items-center">
                <button className="w-fit bg-lime-400 text-black font-bold px-3 py-3 rounded-full hover:bg-purple-500"><Link to={`/plan/${_id}`}>View</Link></button>
                
                </div>
                </div>
            </div>
        </div>
    )
}

export default Card2;