import React, { useState, useEffect } from "react";
import axios from "axios";
import "./User.css"; // Import CSS file for styling

const User = () => {
  // State để lưu trữ thông tin user
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    image: "",
    address: "",
  });

  // Sử dụng useEffect để gọi API khi component được tải
  useEffect(() => {
    // Gọi API để lấy thông tin user
    axios.get("http://localhost:8080/api/admin/1")
      .then((response) => {
        const { username, password, image, address } = response.data;
        setUserData({ username, password, image, address });
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }, []); // [] để đảm bảo gọi API chỉ xảy ra một lần khi component được tải

  // Hàm xử lý sự kiện khi người dùng thay đổi giá trị trong input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Hàm xử lý khi người dùng nhấn nút "Update"
  const handleUpdate = () => {
    // Gửi dữ liệu cập nhật lên API
    axios.put("http://localhost:8080/api/admin/1", userData)
      .then((response) => {
        console.log("User data updated successfully:", response.data);
        // Cập nhật thành công, bạn có thể thực hiện các hành động khác nếu cần
      })
      .catch((error) => {
        console.error("Error updating user data: ", error);
      });
  };

  return (
    <>
    <h2 style={{paddingLeft: '45%',marginBottom: '10px'}}>User Profile</h2>
    <div style={{marginBottom:'20px'}} className="user-container">
      {/* <h1>User Profile</h1> */}
      <div className="user-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={userData.image}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="address"
            value={userData.address}
            onChange={handleInputChange}
          />
        </div>
        <button className="update-button" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
    </>
  );
};

export default User;
