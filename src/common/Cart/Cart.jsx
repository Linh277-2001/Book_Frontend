import React, { useState } from "react";
import "./style.css";
// import { hover } from "@testing-library/user-event/dist/hover";

const Cart = ({ CartItem, addToCart, decreaseQty, removeFromCart }) => {

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const totalPrice = CartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  const handlePay = () => {
    // Kiểm tra xem địa chỉ và số điện thoại có được nhập không
    if (address.trim() === "" || phone.trim() === "") {
      alert("Please enter address and phone number before payment.");
      return;
    }
    // Tạo một đối tượng chứa thông tin cần gửi lên API
    const data = {
      orderDescription: "New Order",
      cartItems: CartItem.map(item => ({
        bookId: item.id,
        quantity: item.qty,
      })),
      userEmail: "linh555@gmail.com",
      userName: "linh555",
      address,
      phone,
    };

    // Gửi dữ liệu đến API bằng fetch hoặc axios
    fetch("http://localhost:8080/api/placeOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          // Xử lý khi thanh toán thành công, ví dụ: làm sạch giỏ hàng bằng cách tải lại trang
          window.location.reload();
        } else {
          // Xử lý khi thanh toán không thành công
          console.error("Lỗi khi thanh toán:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi thanh toán:", error);
      });
  };

  return (
    <>
      <section className='cart-items'>
        <div className='container d_flex'>
          <div className='cart-details'>
            {CartItem.length === 0 && (
              <h1 className='no-items product'>No Items are added in Cart</h1>
            )}

            {CartItem.map((item) => {
              const productQty = item.price * item.qty;

              return (
                <div className='cart-list product d_flex' key={item.id}>
                  <div className='img'>
                    <img src={'http://localhost:5173/' + item.cover} alt='' />
                  </div>
                  <div className='cart-details'>
                    <h3>{item.name}</h3>
                    <h4>
                      ${item.price}.00 * {item.qty}
                      <span>${productQty}.00</span>
                    </h4>
                  </div>
                  <div className='cart-items-function'>
                    <div className='removeCart'>
                      <button
                        className='removeCart'
                        onClick={() => removeFromCart(item.id)} // Sử lý sự kiện xóa items khỏi giỏ hàng
                      >
                        <i style={{cursor: "pointer"}} className='fa-solid fa-xmark'></i>
                      </button>
                    </div>
                    <div className='cartControl d_flex'>
                      <button className='incCart' onClick={() => addToCart(item)}>
                        <i style={{cursor: "pointer"}} className='fa-solid fa-plus'></i>
                      </button>
                      <button className='desCart' onClick={() => decreaseQty(item)}>
                        <i style={{cursor: "pointer"}} className='fa-solid fa-minus'></i>
                      </button>
                    </div>
                  </div>
                  <div className='cart-item-price'></div>
                </div>
              );
            })}
          </div>

          <div className='cart-total product'>
            <h2>Cart Summary</h2>
            <div className='d_flex'>
              <h4>Total Price :</h4>
              <h3>${totalPrice}.00</h3>
            </div>
            <div className="d_flex item_pay">
              <h4>Address</h4>
              <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="d_flex item_pay">
              <h4>Phone</h4>
              <input
                type="text"
                placeholder="Enter your phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="d_flex item_pay">
              <button className="pay" onClick={handlePay}>
                PAY
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
