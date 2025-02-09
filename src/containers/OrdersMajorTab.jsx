import React, { useContext, useEffect, useState } from 'react'
import { ServiceFunctions } from '../service/serviceFunctions'
import AuthContext from '../service/AuthContext'
import Modal from 'react-bootstrap/Modal'

const OrdersMajorTab = () => {

    const { authToken } = useContext(AuthContext)

    const [orders, setOrders] = useState()

    useEffect(() => {
        ServiceFunctions.getAllOrders(authToken).then(data => data && data.length ? setOrders(data.reverse()) : setOrders(data))
    }, [])

    const [detailed, setDetailed] = useState(null)

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)


    return (
        <div className='major-tab'>

            <p className="fw-bold">Все заказы</p>

            <div className='d-flex sm-text hide'
                style={{
                    fontWeight: 'bold',
                    padding: '8px 0px',
                    borderBottom: '1px solid var(--secondary)',
                }}
            >
                <span className='col'>Имя</span>
                <span className='col-3'>Адрес</span>
                <span className='col-3'>Телефон</span>
                <span className='col-2'>Email</span>
                <span className='col'>Общая стоимость</span>
                <span className='col'>Дата</span>
                <span className='col'>&nbsp;</span>
                <span className='col'>&nbsp;</span>
            </div>

            {
                orders && orders.length && orders.map((item, i) => (
                    <div className='d-flex order-row' key={i}
                        style={{
                            cursor: 'pointer',
                            borderBottom: '1px solid var(--secondary)',
                            paddingBottom: '8px'
                        }}
                    >
                        <span className='col'>{item.customerName}</span>
                        <span className='col-3'>{item.address}</span>
                        <span className='col-3'>{item.phone}</span>
                        <span className='col-2'>{item.email}</span>
                        <span className='col'>{item.totalAmount} руб.</span>
                        <span className='col'>{new Date(item.createdAt).toLocaleDateString()}</span>
                        <span className='col error'
                             onClick={e => {
                                setDetailed(item)
                                handleShow()
                            }}
                        >
                            детали
                            </span>
                        <span className='col error'
                            onClick={e => ServiceFunctions.deleteProduct(item.id)}
                        >
                            удалить
                            </span>
                    </div>
                ))
            }

            {
                detailed &&
                <Modal show={show} onHide={() => {
                    handleClose();
                    setDetailed(null)
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>{detailed.customerName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            detailed?.items?.length ?
                                detailed.items.map((item, i) => (
                                    <div key={i} className='d-flex gap-3 align-items-center mb-3' style={{ fontSize: 14 }}>
                                        <img src={item.imageLink} alt="" className="cart-image" />
                                        <span>{item.name}</span>
                                        <span>{item.quantity} шт. по</span>
                                        <span>{item.priceVariant.weight} гр.</span>
                                        <span>{item.priceVariant.price} руб.</span>
                                    </div>
                                ))
                                : null
                        }
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
            }

        </div>
    )
}

export default OrdersMajorTab