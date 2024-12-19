import React from 'react'

const ProductCard = ({
    id,
    imageLink,
    name,
    category,
    wholesalePrice,
    retailPrice,
    description,
    weight,
    country,
    stock,
    openDetails,
    target,
    addToCart
}) => {

    return (
        <div className='product-card'>
            <img className='card-image' src={imageLink} alt="" />
            <p className='card-title mb-1'>{name}</p>
            <p className='card-title mb-1'>Страна: {country}</p>
            {/* <p className='card-weight mb-1'>Вес: {weight} гр.</p>
            <div className="card-price">
                <div className="col"><span>Розница: </span><span className='fw-bold'>{retailPrice} руб.</span></div>
                <div className="col"><span>Опт: </span><span className='fw-bold'>{wholesalePrice} руб.</span></div>
            </div> */}
            <div className="card-btns">
                <button className="secondary-btn col"
                    onClick={() => openDetails(target)}
                >
                    Заказать
                </button>
                {/* <button className="prime-btn col"
                    onClick={e => {
                        addToCart(target)
                    }}
                >
                    В корзину
                </button> */}
            </div>
        </div>
    )
}

export default ProductCard