import React, { useContext, useState } from 'react'
import logo from '../assets/logoicon.png'
import { HiPhone } from "react-icons/hi2";
import { FaEnvelope, FaCartShopping } from "react-icons/fa6";

import Modal from 'react-bootstrap/Modal'

import { addItem, removeItem, clearCart, updateQuantity } from '../redux/features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { ServiceFunctions } from '../service/serviceFunctions';

import { IoIosMenu } from "react-icons/io";
import AuthContext from '../service/AuthContext';




const Header = () => {


    const { data, setData, categories, setCategories, active, setActive, pageAmount, chunk, pageNum, detailed, setDetailed } = useContext(AuthContext)

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const increaseAmount = (product) => {
        dispatch(updateQuantity({ ...product, quantity: product.quantity + 1 }));
    };

    const decreaseAmount = (product) => {
        dispatch(updateQuantity({ ...product, quantity: product.quantity - 1 }));
    };

    const navigate = useNavigate()


    const [customerData, setCustomerData] = useState({})

    console.log(cart);


    const [showMobile, setShowMobile] = useState(false)


    return (
        <div className='navpanel'>
            <div className="navcontainer container">
                <h1 className='title'>
                    <img src={logo} alt="" />
                    <span className='fs-3 fw-bold' onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>ICEBERRY SHOP</span>
                </h1>
                <div className='navlinks'>
                    <a href='tel:+79777520413' className='nav-icon phone-icon'>
                        <HiPhone />
                    </a>
                    <a href='mailto:Saha.inna77@mail.ru' className='nav-icon mail-icon'>
                        <FaEnvelope />
                    </a>
                    <span className='nav-icon mobmenu'
                        onClick={e => setShowMobile(!showMobile)}
                    >
                        <IoIosMenu />
                    </span>
                    <span className='nav-icon cart-icon' onClick={handleShow}>
                        <div className="cart-counter">
                            {
                                cart && cart.items && cart.items.length ?
                                    cart.items.length
                                    : 0
                            }
                        </div>
                        <FaCartShopping />
                    </span>
                </div>
                {
                    showMobile ?
                        <div className='mobile-menu'>
                            <div className="container">
                                <div className="side-links  mt-4 mb-3">
                                    <a href='mailto:Saha.inna77@mail.ru' className="side-link me-3">Написать нам</a>
                                    <br />
                                    <a href='tel:+79777520413' className="side-link">Позвонить</a>
                                    {/* <div className="side-link">Информация для покупателей</div> */}
                                </div>
                                <p className="side-title mb-3">
                                    Каталог товаров
                                </p>
                                {
                                    categories && categories.length && categories.map((cat, i) => (
                                        <p
                                            className={cat === active ? 'mb-1 category-active category-name' : "mb-1 category-name"}
                                            key={i}
                                            onClick={e => {
                                                setActive(cat)
                                                setShowMobile(!showMobile)
                                            }}
                                        >
                                            {cat.name || ''}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                        : null
                }
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Корзина</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        cart && cart.items && cart.items.length ?
                            cart.items.map((item, i) => (
                                <div className='cart cart-row' key={i}>

                                    <div className='col'>
                                        <img src={item.imageLink} alt="" className='cart-image' />
                                        <p className='mt-2 fw-bold'>{item.name}</p>
                                    </div>


                                    <p className='col-2 me-2'>{item.quantity * Number(item.priceVariant.price)} руб.</p>

                                    <div className='d-flex gap-2'>

                                        <div className="counter-buttons gap-1">
                                            <button className='secondary-btn sm-btn'
                                                onClick={e => {
                                                    if (item.quantity == 1) {
                                                        e.preventDefault()
                                                    }
                                                    else {
                                                        decreaseAmount(item)
                                                    }
                                                }}
                                            >
                                                -
                                            </button>
                                            {
                                                <div className="counter-num sm-btn">
                                                    {item.quantity}
                                                </div>
                                            }
                                            <button className='secondary-btn sm-btn'
                                                onClick={e => {
                                                    increaseAmount(item)
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div >
                                            <MdDelete className='delete-icon' onClick={e => dispatch(removeItem(item.id))} />
                                        </div>

                                    </div>

                                </div>
                            ))
                            : null
                    }

                    <p>Стоимость доставки: 500 руб.</p>

                    {
                        cart && cart.items && cart.items.length ?
                            <div>
                                <div className='mt-1 mb-1'>
                                    {
                                        cart && cart.items && cart.items.length ?
                                            <div className='d-flex justify-content-between mb-3'>
                                                <span className="fw-bold">Итого: {cart.totalAmount} руб.</span>
                                                <span className="prime-text-link" onClick={e => dispatch(clearCart())}>очистить корзину</span>
                                            </div>
                                            : null
                                    }
                                </div>

                                <div className="payment-form">
                                    <div className='cart-field'>
                                        <label htmlFor="">Адрес</label>
                                        <input type="text" onChange={e => setCustomerData({ ...customerData, address: e.target.value })} />
                                    </div>
                                    <div className='cart-field'>
                                        <label htmlFor="">Имя покупателя</label>
                                        <input type="text" onChange={e => setCustomerData({ ...customerData, customerName: e.target.value })} />
                                    </div>
                                    <div className='cart-field'>
                                        <label htmlFor="">Телефон</label>
                                        <input type="text" onChange={e => setCustomerData({ ...customerData, phone: e.target.value })} />
                                    </div>
                                    <div className='cart-field'>
                                        <label htmlFor="">Email</label>
                                        <input type="text" onChange={e => setCustomerData({ ...customerData, email: e.target.value })} />
                                    </div>
                                    <div className='text-center mt-3'>
                                        <button className="prime-btn"
                                            onClick={e => {
                                                ServiceFunctions.newOrder({ ...customerData, ...cart });
                                                handleClose()
                                            }}
                                        >
                                            Оплатить
                                        </button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <h6>Ваша корзина пуста</h6>
                            </div>
                    }
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Header