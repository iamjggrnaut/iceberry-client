import React, { useContext, useEffect, useState } from "react";
import { ServiceFunctions } from "../service/serviceFunctions";
import AuthContext from "../service/AuthContext";
import Modal from "react-bootstrap/Modal";
import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const OrdersMajorTab = () => {
  const { authToken } = useContext(AuthContext);

  const [orders, setOrders] = useState();

  useEffect(() => {
    ServiceFunctions.getAllOrders(authToken).then((data) =>
      data && data.length ? setOrders(data.reverse()) : setOrders(data)
    );
  }, []);

  const [detailed, setDetailed] = useState(null);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  console.log(orders);

  return (
    <div className="major-tab">
      <p className="fw-bold">Все заказы</p>

      <div
        className="d-flex sm-text hide"
        style={{
          fontWeight: "bold",
          padding: "8px 0px",
          borderBottom: "1px solid var(--secondary)",
        }}
      >
        <span className="col">Имя</span>
        <span className="col-2">Адрес</span>
        <span className="col-2">Телефон</span>
        <span className="col-2">Email</span>
        <span className="col">Общая стоимость</span>
        <span className="col">Дата</span>
        <span className="col">Статус</span>
        <span className="col">&nbsp;</span>
        <span className="col">&nbsp;</span>
      </div>

      {orders &&
        orders.length &&
        orders.map((item, i) => (
          <div
            className="d-flex order-row align-items-center"
            key={i}
            style={{
              cursor: "pointer",
              borderBottom: "1px solid var(--secondary)",
              paddingBottom: "8px",
              fontSize: 14,
            }}
          >
            <span className="col">{item.customerName}</span>
            <span className="col-2">{item.address}</span>
            <span className="col-2">{item.phone}</span>
            <span className="col-2">{item.email}</span>
            <span className="col">{item.totalAmount} руб.</span>
            <span style={{ marginLeft: 8 }} className="col">
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
            <span className="col">
              {item.paymentStatus === "Pending" ? (
                <button
                  className="prime-btn"
                  style={{ fontSize: 12, padding: "4px 8px", marginTop: 4 }}
                  onClick={(e) =>
                    ServiceFunctions.updateStatus(item.id, authToken)
                  }
                >
                  Отгрузить
                </button>
              ) : (
                "Отгружен"
              )}
            </span>
            <span
              style={{ marginLeft: 8 }}
              className="col primary fs-5 text-end me-3"
              onClick={(e) => {
                setDetailed(item);
                handleShow();
              }}
            >
              <FaRegEye />
            </span>
            <span
              className="col error fs-5"
              onClick={(e) => ServiceFunctions.deleteOrder(item.id, authToken)}
            >
              <MdDelete />
            </span>
          </div>
        ))}

      {detailed && (
        <Modal
          show={show}
          onHide={() => {
            handleClose();
            setDetailed(null);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>{detailed.customerName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {detailed?.items?.length
              ? detailed.items.map((item, i) => (
                  <div
                    key={i}
                    className="d-flex gap-3 align-items-center mb-3"
                    style={{ fontSize: 14 }}
                  >
                    <img src={item.imageLink} alt="" className="cart-image" />
                    <span>{item.name}</span>
                    <span>{item.quantity} шт. по</span>
                    <span>{item.priceVariant.weight} гр.</span>
                    <span>
                      {Number(item.priceVariant.price) * item.quantity} руб.
                    </span>
                  </div>
                ))
              : null}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default OrdersMajorTab;
