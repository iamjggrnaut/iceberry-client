import React, { useState } from 'react'

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
                <div className="side-links mobile-hide">
                    <div className="side-link">О нас</div>
                    <div className="side-link">Контакты</div>
                    <div className="side-link">Информация для покупателей</div>
                </div>
            </div>
        </div>
    )
}

export default SidePannel