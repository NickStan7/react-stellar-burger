import React from "react";
import orderDetails from "./OrderDetails.module.css";
import check from "../../images/done.svg";
import {useSelector} from "react-redux";

function OrderDetails() {
  const order = useSelector((store) => store.orderReducer);
  return (
    <div className={orderDetails.container}>
      <h2 className={orderDetails.number}>{order.orderNumber}</h2>
      <h3 className={orderDetails.info}>идентификатор заказа</h3>
      <img src={check} alt="checkmark icon" className={orderDetails.img} />
      <div className={orderDetails.message}>Ваш заказ начали готовить</div>
      <div className={orderDetails.wait}>
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
}
export default OrderDetails;
