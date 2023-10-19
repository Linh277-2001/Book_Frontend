import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <i className="fa fa-long-arrow-alt-right"></i>
      </button>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <i className="fa fa-long-arrow-alt-left"></i>
      </button>
    </div>
  );
};

const FlashCard = ({ addToCart }) => {
  const [productItems, setProductItems] = useState([]);
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    // Gửi yêu cầu GET đến API để lấy danh sách sản phẩm
    fetch("http://localhost:8080/api/book/all")
      .then((response) => response.json())
      .then((data) => {
        // Xử lý dữ liệu từ API thành đối tượng productItems
        const updatedProductItems = data.map((book) => ({
          id: book.id,
          cover: book.photo ,
          name: book.name,
          price: book.price,
          discount: 10,
        }));

        // Cập nhật productItems trong trạng thái
        setProductItems(updatedProductItems);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      });
  }, []); // Thêm mảng rỗng để useEffect chỉ gọi một lần sau khi component được render

  return (
    <>
      <Slider {...settings}>
        {productItems.map((item) => {
          return (
            <div className="box" key={item.id}>
              <div className="product mtop">
                <div className="img">
                  <span className="discount">{item.discount}% Off</span>
                  <img style={{maxWidth:200, marginLeft:42}} src={'http://localhost:5173/'+item.cover} alt="Không tìm thấy ảnh" />
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
      </Slider>
    </>
  );
};

export default FlashCard;
