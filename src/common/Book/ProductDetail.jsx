import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './Book.css';

const ProductDetail = ({ addToCart }) => { // Pass the addToCart function as a prop
  const { id } = useParams();
  const [productItems, setProductItems] = useState([]);

  useEffect(() => {
    // Fetch product details using the ID from the URL
    fetch(`http://localhost:8080/api/book/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const productData = {
            id: data.id,
            cover: data.photo,
            name: data.name,
            price: data.price,
            discount: 10,
          };
          setProductItems(productData);
        } else {
          console.error("Product not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [id]);

  return (
    <div>
      <div style={{ display: 'flex', margin: '30px 40px' }}>
        <img style={{ width: '30%' }} src={`http://localhost:5173/${productItems.cover}`} alt="Product" />
        <div style={{ display: 'block' }}>
          <h1>{productItems.name}</h1>
          <p>Price: ${productItems.price}.00</p>
          <button className="addbtn" onClick={() => addToCart(productItems)}>
            Buy
          </button>
          <p>+ Thông tin chi tiết của sản phẩm</p>
          <p>+ Cải thiện sự tập trung và tăng cường kỹ năng tư duy, phân tích</p>
          <p>+ Cung cấp kiến thức căn bản về thế giới</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
