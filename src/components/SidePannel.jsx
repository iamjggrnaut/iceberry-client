import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SidePannel = ({ categories, active, setActive }) => {



    return (
        <div className='sidepanel'>
            <div>
                <p className="side-title mb-3">
                    Каталог товаров
                </p>
                <div className='categories'>
                    {
                        categories && categories.length && categories.map((cat, i) => (
                            <p
                                className={cat === active ? 'mb-1 category-active category-name' : "mb-1 category-name"}
                                key={i}
                                onClick={e => setActive(cat)}
                            >
                                {cat.name}
                            </p>
                        ))
                    }
                </div>
            </div>
            <div>
                <div className="side-links ">
                    <Link to={'/legal'} className="side-link me-3">Правовая информация</Link>
                    <br />
                    <a href='mailto:Saha.inna77@mail.ru' className="side-link me-3">Написать нам</a>
                    <br />
                    <a href='tel:+79777520413' className="side-link">Позвонить</a>
                    {/* <div className="side-link">Информация для покупателей</div> */}
                </div>
            </div>
        </div>
    )
}

export default SidePannel