import React, { useContext, useEffect, useState } from 'react'
import { ServiceFunctions } from '../service/serviceFunctions'
import Modal from 'react-bootstrap/Modal'
import AuthContext from '../service/AuthContext'

const GoodsMajorTab = () => {

    const { authToken } = useContext(AuthContext)

    const [active, setActive] = useState(1)

    const handleChange = (num) => {
        setActive(num)
    }

    const [goods, setGoods] = useState()
    const [categories, setCategories] = useState()

    useEffect(() => {
        ServiceFunctions.getCategories().then(data => setCategories(data));
        ServiceFunctions.getAllProducts().then(data => setGoods(data))
    }, [])

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)


    const [catName, setCatName] = useState()
    const createCategory = (e, name) => {
        if (!name || name.length === 0) {
            e.preventDefault()
        }
        else {
            ServiceFunctions.addCategory(name).then(data => {
                if (data) {
                    ServiceFunctions.getCategories().then(res => setCategories(res));
                    handleClose()
                }
            })
        }
    }

    const [product, setProduct] = useState({})
    const createProduct = (e, obj) => {
        const values = Object.values(obj)
        if (!values || values.length < 9) {
            console.log('fuck off');
        }
        else {
            ServiceFunctions.createProduct(authToken, product).then(res => {
                if (res) {
                    ServiceFunctions.getAllProducts().then(data => setGoods(data));
                    handleClose()
                }
            })
        }
    }

    console.log(product);



    return (
        <div className='major-tab'>
            <div className='manage-buttons mt-5'>
                <button className={active === 1 ? 'tab-active admin-tab' : 'neutral-btn'}
                    onClick={e => handleChange(1)}
                >
                    Товары
                </button>
                <button className={active === 2 ? 'tab-active admin-tab' : 'neutral-btn'}
                    onClick={e => handleChange(2)}
                >
                    Категории
                </button>
            </div>

            <div className="mt-3 p-2">
                {
                    active === 1 ?
                        <div>
                            <p className='side-link'
                                onClick={handleShow}
                            >
                                Добавить товар
                            </p>
                            {
                                goods && goods.length &&
                                <div className='cat-row fw-bold sm-text'>
                                    <span className='col'>Изображение</span>
                                    <span className='col-3'>Название</span>
                                    <span className='col'>Категория</span>
                                    <span className='col'>Страна</span>
                                    <span className='col'>Цена оптовая</span>
                                    <span className='col'>Цена розничная</span>
                                    <span className='col'>Вес (гр.)</span>
                                    <span className='col'>На складе</span>
                                    <span className='col'>&nbsp;</span>
                                </div>
                            }
                            {
                                goods && goods.length && goods.map((item, i) => (
                                    <div key={i} className='cat-row'>
                                        <div className="col p-1">
                                            <img src={item.imageLink} className='cart-image' alt="" />
                                        </div>
                                        <span className='fw-bold col-3'> {item.name}</span>
                                        <span className='col'> {item.category}</span>
                                        <span className='col'> {item.country}</span>
                                        <span className='col'> {item.wholesalePrice} руб.</span>
                                        <span className='col'> {item.retailPrice} руб.</span>
                                        <span className='col'> {item.weight}</span>
                                        <span className='col'> {item.stock}</span>
                                        <span className='side-link col'
                                            onClick={e => {
                                                ServiceFunctions.deleteProduct(item.id, authToken).then(data => {
                                                    if (data) {
                                                        ServiceFunctions.getAllProducts().then(res => setGoods(res))
                                                    }
                                                })
                                            }}
                                        >
                                            удалить
                                        </span>
                                    </div>
                                )) || 'Товаров нет'
                            }
                        </div>
                        :
                        <div>
                            <p className='side-link'
                                onClick={handleShow}
                            >
                                Добавить категорию
                            </p>
                            {
                                categories && categories.length && categories.map((item, i) => (
                                    <div className='cat-row' key={i}>
                                        <span>{item.name}</span>
                                        <span className='side-link'
                                            onClick={e => {
                                                ServiceFunctions.deleteCategory(item.id, authToken).then(data => {
                                                    if (data) {
                                                        ServiceFunctions.getCategories().then(res => setCategories(res))
                                                    }
                                                })
                                            }}
                                        >
                                            удалить
                                        </span>
                                    </div>
                                )) || 'Категорий нет'
                            }
                        </div>
                }
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {
                            active === 1 ?
                                <div>
                                    Добавить продукт
                                </div>
                                :
                                <div>
                                    Добавить категорию
                                </div>
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        active === 1 ?
                            <div>
                                <div className='cart-field'>
                                    <label htmlFor="">Название товара</label>
                                    <input
                                        type="text"
                                        className='input-field'
                                        onChange={e => setProduct({ ...product, name: e.target.value })}
                                    />
                                </div>
                                <div className='cart-field'>
                                    <label htmlFor="">Категория</label>
                                    <select name="" id=""
                                        onChange={e => setProduct({ ...product, category: e.target.value })}
                                    >
                                        <option value="">Выберите категорию</option>
                                        {
                                            categories && categories.length && categories.map((cat, i) => (
                                                <option key={i} value={cat.name}>{cat.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='cart-field'>
                                    <label htmlFor="">Количество на складе</label>
                                    <input
                                        type="number"
                                        className='input-field'
                                        onChange={e => setProduct({ ...product, stock: Number(e.target.value) })}
                                    />
                                </div>
                                <div className='cart-field'>
                                    <label htmlFor="">Розничная цена</label>
                                    <input
                                        type="text"
                                        className='input-field'
                                        onChange={e => setProduct({ ...product, retailPrice: Number(e.target.value) })}
                                    />
                                </div>
                                <div className='cart-field'>
                                    <label htmlFor="">Оптовая цена</label>
                                    <input
                                        type="text"
                                        className='input-field'
                                        onChange={e => setProduct({ ...product, wholesalePrice: Number(e.target.value) })}
                                    />
                                </div>
                                <div className='cart-field'>
                                    <label htmlFor="">Вес (гр.)</label>
                                    <input
                                        type="text"
                                        className='input-field'
                                        onChange={e => setProduct({ ...product, weight: Number(e.target.value) })}
                                    />
                                </div>
                                <div className='cart-field'>
                                    <label htmlFor="">Страна</label>
                                    <input
                                        type="text"
                                        className='input-field'
                                        onChange={e => setProduct({ ...product, country: e.target.value })}
                                    />
                                </div>
                                <div className='cart-field'>
                                    <label htmlFor="">Описание</label>
                                    <textarea
                                        type="text"
                                        className='input-field'
                                        onChange={e => setProduct({ ...product, description: e.target.value })}
                                    />
                                </div>
                                <div className='cart-field'>
                                    <label htmlFor="">Ссылка на изображение</label>
                                    <input
                                        type="text"
                                        className='input-field'
                                        onChange={e => setProduct({ ...product, imageLink: e.target.value })}
                                    />
                                </div>
                                <div className='text-end'>
                                    <button
                                        className='prime-btn mt-3'
                                        onClick={e => createProduct(e, product)}
                                    >
                                        Создать
                                    </button>
                                </div>
                            </div>
                            :
                            <div>
                                <div className='cart-field'>
                                    <label htmlFor="">Название категории</label>
                                    <input
                                        type="text"
                                        className='input-field'
                                        onChange={e => setCatName(e.target.value)}
                                    />
                                </div>
                                <div className='text-end'>
                                    <button
                                        className='prime-btn mt-3'
                                        onClick={e => createCategory(e, catName)}
                                    >
                                        Создать
                                    </button>
                                </div>
                            </div>
                    }
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default GoodsMajorTab