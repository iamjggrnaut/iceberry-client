import React, { useContext, useEffect, useState } from 'react'
import { ServiceFunctions } from '../service/serviceFunctions'
import Modal from 'react-bootstrap/Modal'
import AuthContext from '../service/AuthContext'

import { CiEdit } from "react-icons/ci";
import { staticUrl, URL } from '../service/config';
import axios from 'axios';


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

    const [product, setProduct] = useState({ priceVariants: [] })

    const [priceVariant, setPriceVariant] = useState({})




    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };



    const handleUpload = async () => {
        if (!image) {
            return alert("Выберите файл")
        }
        const formData = new FormData();
        formData.append('static', image);

        try {
            const response = await axios.post(URL + '/uploadFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            setProduct({ ...product, imageLink: staticUrl + response.data })
        } catch (error) {
            console.error("Ошибка загрузки файла:", error);
            console.log(error);

            alert("Ошибка загрузки файла")
        }
    }

    const handleUploadEdit = async () => {
        if (!image) {
            return alert("Выберите файл")
        }
        const formData = new FormData();
        formData.append('static', image);

        try {
            const response = await axios.post(URL + '/uploadFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            setForEdit({ ...forEdit, imageLink: staticUrl + response.data })
        } catch (error) {
            console.error("Ошибка загрузки файла:", error);
            console.log(error);

            alert("Ошибка загрузки файла")
        }
    }

    const createProduct = (e, obj) => {
        const values = Object.values(obj)
        if (!values) {
        }
        else {
            ServiceFunctions.createProduct(authToken, product).then(res => {
                if (res) {
                    ServiceFunctions.getAllProducts().then(data => setGoods(data));
                    handleClose();
                    setProduct({
                        priceVariants: [],
                    });
                    setPriceVariant({ weight: '', price: '' })
                    setImage(null)
                    setImageUrl(null)
                }
            })
        }
    }

    const [forEdit, setForEdit] = useState()
    const [editing, setEditing] = useState(false)

    console.log(forEdit);



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
                                    {/* <span className='col'>Цена оптовая</span>
                                    <span className='col'>Цена розничная</span>
                                    <span className='col'>Вес (гр.)</span> */}
                                    <span className='col-2'>Варианты цен</span>
                                    <span className='col'>На складе</span>
                                    <span className='col'>&nbsp;</span>
                                    <span className=''>&nbsp;</span>
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
                                        {/* <span className='col'> {item.wholesalePrice} руб.</span>
                                        <span className='col'> {item.retailPrice} руб.</span>
                                        <span className='col'> {item.weight}</span> */}
                                        <span className='col-2'>
                                            {
                                                item.priceVariants ?
                                                    item.priceVariants.map((el, i) => (
                                                        <div key={i}>
                                                            <span>{el.weight} гр. {el.price} руб.</span>
                                                            {/* <br /> */}
                                                        </div>
                                                    ))
                                                    : '-'
                                            }
                                        </span>
                                        <span className='col'> {item.stock}</span>
                                        <span className='side-link me-3'
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
                                        <span className='side-link fs-3' onClick={e => {
                                            setForEdit(item);
                                            setEditing(true)
                                        }}>
                                            <CiEdit />
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

                                <h6 className='mt-4'>Ценовые варианты</h6>
                                <span className="sm-text">Цену и вес вводить через ТОЧКУ</span>
                                <div className='cart-field'>
                                    <label htmlFor="">Вес</label>
                                    <input
                                        type="number"
                                        className='input-field'
                                        onChange={e => setPriceVariant({ ...priceVariant, weight: e.target.value })}
                                    />
                                </div>
                                <div className='cart-field mb-4'>
                                    <label htmlFor="">Цена</label>
                                    <input
                                        type="number"
                                        className='input-field'
                                        onChange={e => setPriceVariant({ ...priceVariant, price: e.target.value })}
                                    />
                                </div>
                                <div className='mb-3'>
                                    {
                                        product.priceVariants.map((item, i) => (
                                            <div className="price-tag">
                                                <span>{item.weight} гр.</span>
                                                <span>{item.price} руб.</span>
                                            </div>
                                        ))
                                    }
                                </div>

                                <div>
                                    <button className="neutral-btn"
                                        onClick={e => {
                                            setProduct({ ...product, priceVariants: [...product.priceVariants, priceVariant] });
                                            setPriceVariant({});
                                        }}
                                    >
                                        Добавить
                                    </button>
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
                                {/* <div className='cart-field'>
                                    <label htmlFor="">Ссылка на изображение</label>
                                    <input
                                        type="text"
                                        className='input-field'
                                        onChange={e => setProduct({ ...product, imageLink: e.target.value })}
                                    />
                                </div> */}

                                <div className='cart-field'>
                                    <label htmlFor="">Изображение</label>
                                    <input type="file" onChange={handleFileChange} />
                                    {image && <button type='button' className='neutral-btn' onClick={handleUpload} >Загрузить изображение</button>}
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

            {
                forEdit ?
                    <Modal show={editing} onHide={() => { setEditing(); setForEdit() }}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <div>
                                    Изменение товара
                                </div>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <div>
                                <div className='cart-field'>
                                    <label htmlFor="">Название товара</label>
                                    <input
                                        type="text"
                                        className='input-field'
                                        defaultValue={forEdit.name}
                                        onChange={e => setForEdit({ ...forEdit, name: e.target.value })}
                                    />
                                </div>
                                <div className='cart-field'>
                                    <label htmlFor="">Категория</label>
                                    <select name="" id=""
                                        defaultValue={forEdit.category}
                                        onChange={e => setForEdit({ ...forEdit, category: e.target.value })}
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
                                        defaultValue={forEdit.stock}
                                        onChange={e => setForEdit({ ...forEdit, stock: Number(e.target.value) })}
                                    />
                                </div>
                                {/* 
                    <h6 className='mt-4'>Ценовые варианты</h6>
                    <div className='cart-field'>
                        <label htmlFor="">Вес</label>
                        <input
                            type="number"
                            className='input-field'
                            onChange={e => setForEdit({ ...priceVariant, weight: e.target.value })}
                        />
                    </div>
                    <div className='cart-field mb-4'>
                        <label htmlFor="">Цена</label>
                        <input
                            type="number"
                            className='input-field'
                            onChange={e => setForEdit({ ...priceVariant, price: e.target.value })}
                        />
                    </div> */}

                                {/* <div>
                        <button className="neutral-btn"
                            onClick={e => {
                                setProduct({ ...product, priceVariants: [...product.priceVariants, priceVariant] });
                                setPriceVariant({});
                            }}
                        >
                            Добавить
                        </button>
                    </div> */}


                                <div className='cart-field'>
                                    <label htmlFor="">Страна</label>
                                    <input
                                        type="text"
                                        className='input-field'
                                        defaultValue={forEdit.country}
                                        onChange={e => setForEdit({ ...forEdit, country: e.target.value })}
                                    />
                                </div>
                                <div className='cart-field'>
                                    <label htmlFor="">Описание</label>
                                    <textarea
                                        type="text"
                                        className='input-field'
                                        onChange={e => setForEdit({ ...forEdit, description: e.target.value })}
                                    />
                                </div>


                                <div className='cart-field'>
                                    <label htmlFor="">Изображение</label>
                                    <input type="file" onChange={handleFileChange} />
                                    {image && <button type='button' className='neutral-btn' onClick={handleUploadEdit} >Загрузить изображение</button>}
                                </div>


                                {/* 
                                <div className='cart-field'>
                                    <label htmlFor="">Ссылка на изображение</label>
                                    <input
                                        type="text"
                                        className='input-field'
                                        onChange={e => setForEdit({ ...forEdit, imageLink: e.target.value })}
                                    />
                                </div> */}
                                <div className='text-end'>
                                    <button
                                        className='prime-btn mt-3'
                                        onClick={e => {
                                            ServiceFunctions.updateProduct(forEdit.id, forEdit, authToken);
                                            setForEdit();
                                            setEditing(false)
                                        }}
                                    >
                                        Обновить
                                    </button>
                                </div>
                            </div>


                        </Modal.Body>
                        <Modal.Footer>

                        </Modal.Footer>
                    </Modal> : null
            }

        </div>
    )
}

export default GoodsMajorTab