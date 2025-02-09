import React from 'react'
import logos from '../assets/logo3h.png'

const Footer = () => {

    return (
        <div className='footer'>
            <div className="container footer-container">
                <span>
                    ИП ДЮДИН АЛЕКСАНДР АЛЕКСАНДРОВИЧ <br />
                    Номер счёта: 40802810302740006572 <br />
                    ИНН: 462902828807 <br />
                    ОГРНИП:324508100402612 <br />
                    Банк: АО "АЛЬФА-БАНК" <br />
                    БИК: 044525593 <br /> Кор. счёт : 30101810200000000593 <br />
                    Адрес: Улица Ленина, д. 90, Московская область, р-н Ногинск, г. Ногинск
                </span>
                <img className='mt-3' src={logos} alt="" />
            </div>
        </div>
    )
}

export default Footer