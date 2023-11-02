import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {Link} from "react-router-dom";

const SearchResult = () => {
  const { query } = useParams(); // Lấy giá trị tìm kiếm từ URL

  const [result, setResult] = useState([]);

  useEffect(() => {
    async function fetchResult() {
      try {
        const response = await axios.get(`http://localhost:8080/api/book/search?name=${query}`);
        setResult(response.data);

      } catch (error) {
        console.error('Lỗi:', error);
      }
    }
    fetchResult();
  }, [query]);

  return (
    <>
    <h3 style={{marginLeft:'2%'}}>Kết quả tìm kiếm của: {query}</h3>
    {result.map((item, index) => {  //Lưu ý trả về 1 mảng book, nên phải duyệt từng đối tượng trong mảng
        return (
          <div style={{marginLeft: '2%'}} className="box" key={item.id}>
            <div className="product mtop">
              <div className="img">
                <span className="discount">10% Off</span>
                <Link to={`../book/${item.id}`}>
                  <img src={'http://localhost:5173/'+item.photo} alt='Không tìm thấy ảnh' />
                </Link>
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
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SearchResult;
