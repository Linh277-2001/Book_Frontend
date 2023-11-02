import React, { useState, useEffect } from "react";
import axios from "axios";
import "./User.css";

const User = () => {
  // State để lưu trữ thông tin user và mật khẩu mới
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [newPassword, setNewPassword] = useState("");

  // Sử dụng useEffect để gọi API khi component được tải
  useEffect(() => {
    // Gọi API để lấy thông tin user
    axios
      .get("http://localhost:8080/api/admin/25")
      .then((response) => {
        const { username, password } = response.data;
        setUserData({ username, password });
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }, []); // [] để đảm bảo gọi API chỉ xảy ra một lần khi component được tải

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Xây dựng URL với newPassword được đính kèm
      const url = `http://localhost:8080/api/user/changePassword/25?newPassWord=${newPassword}`;      
      // Gửi yêu cầu đổi mật khẩu đến API
      const response = await axios.put(url);
      console.log("Thành công: ", response);
      setNewPassword('');
      alert("Thay đổi mật khẩu thành công");
    } catch (error) {
      console.error("Lỗi thay đổi mật khẩu: ", error);
      console.log(newPassword);
      alert("Thay đổi mật khẩu không thành công");
    }
  };

  return (
    <>
      <h2 style={{ paddingLeft: "43%", marginBottom: "10px" }}>Change Password</h2>
      <div style={{ marginBottom: "20px" }} className="user-container">
        <div className="user-form">
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
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
