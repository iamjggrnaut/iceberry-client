import React, { useContext, useEffect, useState } from 'react'
import SidePannel from '../components/SidePannel'
import ProductCard from '../components/ProductCard'

import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, clearCart } from '../redux/features/cartSlice';

import Modal from 'react-bootstrap/Modal';
import { ServiceFunctions } from '../service/serviceFunctions';
import AuthContext from '../service/AuthContext';


const ShopPage = () => {

    const { data, setData, categories, setCategories, active, setActive, setDetailed, pageAmount, detailed, chunk, pageNum } = useContext(AuthContext)

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const [quantity, setQuantity] = useState(1)

    const openDetails = (target) => {
        setDetailed(target)
        handleShow()
    }

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const addToCart = (product) => {
        setDetailed(product)
        dispatch(addItem({ ...product, quantity: quantity }));
    };

    console.log(cart);



    return (
        <div className='shop-page'>
            <SidePannel
                categories={categories}
                setCategories={setCategories}
                active={active}
                setActive={setActive}
            />
            <div className="shop-container container">

                <div className="d-flex justify-content-start mb-4">
                    {
                        pageAmount ?
                            new Array(pageAmount).fill(0).map((page, i) => (
                                <div key={i} className={pageNum === i + 1 ? 'page-active page-num' : 'page-num'} onClick={e => setPageNum(i + 1)}>{i + 1}</div>
                            ))
                            : null
                    }
                </div>

                <div className="shop-row row">
                    {
                        chunk && chunk.map((item, i) => (
                            <div key={i} className="col">
                                <ProductCard
                                    {...item}
                                    target={item}
                                    openDetails={openDetails}
                                    addToCart={addToCart}
                                />
                            </div>
                        ))
                    }
                </div>

            </div>

            {
                detailed &&
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{detailed.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img className='card-image' src={detailed.imageLink} alt="" />
                        <p className="mt-2 mb-1">Страна: {detailed.country}</p>
                        <p className="mt-2 mb-1">Вес: {detailed.weight} гр.</p>
                        <p className="mt-2 mb-1">Описание: {detailed.description}</p>
                        <div className="card-price mt-2">
                            <div className="col"><span>Розница: </span><span className='fw-bold'>{detailed.retailPrice} руб.</span></div>
                            <div className="col"><span>Опт: </span><span className='fw-bold'>{detailed.wholesalePrice} руб.</span></div>
                        </div>
                        <p className="mt-2 sm-text">
                            *Оптповая цена применима при заказе от 10 единиц товара.
                        </p>
                        <div className="counter-buttons">
                            <button className='secondary-btn'
                                onClick={e => {
                                    if (quantity === 0) {
                                        e.preventDefault()
                                    }
                                    setQuantity(quantity - 1)
                                }}
                            >
                                -
                            </button>
                            {
                                <div className="counter-num">
                                    {quantity}
                                </div>
                            }
                            <button className='secondary-btn'
                                onClick={e => {
                                    setQuantity(quantity + 1)
                                }}
                            >
                                +
                            </button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='prime-btn' onClick={() => { addToCart(detailed); setDetailed(null); setQuantity(1) }}>
                            В корзину
                        </button>
                    </Modal.Footer>
                </Modal>
            }
        </div>
    )
}

export default ShopPage