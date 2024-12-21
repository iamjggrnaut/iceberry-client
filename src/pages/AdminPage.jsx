import React, { useContext, useEffect, useState } from 'react'
import GoodsMajorTab from '../containers/GoodsMajorTab'
import OrdersMajorTab from '../containers/OrdersMajorTab'
import { Link } from 'react-router-dom'
import AuthContext from '../service/AuthContext'


const AdminPage = () => {

    const [active, setActive] = useState(1)

    const changeTab = (id) => {
        setActive(id)
    }

    const { logout } = useContext(AuthContext)

    return (
        <div className='admin-page'>
            <div className="admin-container container pt-4">

                <div className="d-flex justify-content-between">
                    <div className='admin-tabs'>
                        <span
                            className={active === 1 ? "admin-tab tab-active" : 'admin-tab'}
                            onClick={e => changeTab(1)}
                        >
                            Ассортимент
                        </span>
                        <span
                            className={active === 2 ? "admin-tab tab-active" : 'admin-tab'}
                            onClick={e => changeTab(2)}
                        >
                            Заказы
                        </span>
                    </div>
                    <div>
                        <Link to={'#'} onClick={logout} >Выйти</Link>
                    </div>
                </div>

                {
                    active === 1 ?
                        <GoodsMajorTab />
                        :
                        <OrdersMajorTab />
                }

                <div className="admin-tabs">

                </div>
            </div>
        </div>
    )
}

export default AdminPage