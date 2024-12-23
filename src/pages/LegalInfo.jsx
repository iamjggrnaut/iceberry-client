import React from 'react'

const LegalInfo = () => {

    return (
        <div className='legal-page'>
            <div className="legal-container container pt-4">

                <p className="fs-4">Юридическая информация</p>

                <span>

                    ДЮДИН АЛЕКСАНДР АЛЕКСАНДРОВИЧ (ИП) <br />
                    Номер счёта: 40802810302740006572 <br />
                    {/* Валюта: RUR <br /> */}
                    ИНН: 462902828807 <br />
                    Банк: АО "АЛЬФА-БАНК" <br />
                    БИК: 044525593
                    Кор. счёт : 30101810200000000593 <br />
                    Адрес: Улица Ленина, д. 90, Московская область, р-н Ногинск, г. Ногинск

                </span>

                <br />
                <br />

                <span>
                    Стоимость доставки: фиксированная (500 руб.)
                </span>
            </div>
        </div>
    )
}

export default LegalInfo