function Card({image,title,description}) {
    return (
        <div className="card bg-base-100 w-96 shadow-xl mt-10 border-b-4 p-8 mb-8">
            <figure className="h-60 rounded">
                <img
                src={image}
                alt="Shoes" />
            </figure>
            <div className="card-body items-center">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Card;