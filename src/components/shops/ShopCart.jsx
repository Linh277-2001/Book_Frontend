import React, { useState, useEffect } from "react";

const ShopCart = ({ addToCart }) => {
  const [shopItems, setShopItems] = useState([]);
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    // Gửi yêu cầu GET đến API để lấy danh sách sản phẩm
    fetch("http://localhost:8080/api/book/all")
      .then((response) => response.json())
      .then((data) => {
        // Xử lý dữ liệu từ API thành đối tượng shopItems
        const updatedShopItems = data.map((book) => ({
          id: book.id,
          cover: book.photo,
          name: book.name,
          price: book.price,
          discount: 10,
        }));

        // Cập nhật shopItems trong trạng thái
        setShopItems(updatedShopItems);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      });
  }, []); // Thêm mảng rỗng để useEffect chỉ gọi một lần sau khi component được render

  return (
    <>
      {shopItems.map((item, index) => {
        return (
          <div className="box" key={item.id}>
            <div className="product mtop">
              <div className="img">
                <span className="discount">{item.discount}% Off</span>
                <img src={'http://localhost:5173/'+item.cover} alt='Không tìm thấy ảnh' />
                {/* <p>{'http://localhost:5173/'+shopItems.cover}</p> */}
                <div className="product-like">
                  <label>{count}</label> <br />
                  <i className="fa-regular fa-heart" onClick={increment}></i>
                </div>
              </div>
              <div className="product-details">
                <h3>{item.name}</h3>
                <div className="rate">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </div>
                <div className="price">
                  <h4>${item.price}.00 </h4>
                  <button onClick={() => addToCart(item)}>
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ShopCart;
