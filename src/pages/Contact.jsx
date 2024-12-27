import React from 'react'

const Contact = () => {

    return (
        <div className='legal-page'>
            <div className="legal-container container pt-4">
                <h5>Контакты</h5>
                <br />
                <a href="https://wa.me/79913403537" target='_blank' className="side-link-a">WhatsApp</a>
                <br />
                <a href="https://t.me/iceberry_y" target='_blank' className="side-link-a">Telegram</a>
                <div className="d-flex gap-2">
                    <p>Электронная почта:</p>
                    <a href="mailto:iceberryshop@mail.ru" className="side-link-a" target='_blank'>Email</a>
                </div>
                <p className="mb-2 mt-2">
                    Отдел работы с юридическими лицами:
                </p>
                <div className="d-flex gap-2">
                    <p className='mb-1'>Электронная почта:</p>
                    <a href="mailto:iceberryshop@mail.ru" className="side-link-a" target='_blank'>Email</a>
                </div>
                <div className="d-flex gap-2">
                    <p>Тел.:</p>
                    <a href="tel:79913403537" className="side-link-a">+79913403537</a>
                </div>
            </div>
        </div>
    )
}

export default Contact