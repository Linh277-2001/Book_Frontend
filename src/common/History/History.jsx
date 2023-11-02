import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {EyeOutlined,LeftCircleOutlined } from '@ant-design/icons';
import { Layout, Button, theme, Table } from 'antd';
import axios from 'axios';

const { Content } = Layout;


const App = () => {
  const [orders,setOrders] = useState([]); //Danh sách order

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const columns = [
    {
      title: 'User',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
        title: 'Created',
        dataIndex: 'created',
        key: 'created',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
            <Link to={`./historydetail/${record.id}`}>
            <Button
            icon={<EyeOutlined />}
            style={{ marginRight: '5px' }}
            >
                View
            </Button>
            </Link>
        </span>
      ),
    },
  ];

    useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(`http://localhost:8080/api/allorder`);
        const ordersData = response.data;
  
        // Đoạn code thay user_id bằng name của người mua
        for (const order of ordersData) { //Duyệt qua từng order trong danh sách
          const tmp = order.user_id; // Tạo 1 biến để lưu id
  
          // Gọi API để lấy thông tin người dùng dựa trên biến tmp
          const userResponse = await axios.get(`http://localhost:8080/api/admin/${tmp}`); 
  
          // Cập nhật tên người dùng trong dữ liệu đơn hàng
          order.user_id = userResponse.data.name; // Thay "user_id" bằng trường chứa name trong response
        }
        //Lọc những người dùng có user_id=linh77
        const filteredOrders = ordersData.filter(order => order.user_id === "linh777");

        setOrders(filteredOrders);
        console.log(filteredOrders);
  
        // setOrders(ordersData);
        // console.log(ordersData);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách order từ API 123:', error);
      }
    }
  
    fetchOrders();
  }, []);
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
            {/* Nội dung sẽ đặt ở đây */}
            <Link to="./cart">
                <Button type="primary" style={{backgroundColor: "#5d728f", marginLeft: "25px", marginBottom:"15px"}} icon={<LeftCircleOutlined />}>
                    Cart
                </Button>
            </Link>
            <h3>All Order</h3>
          <Table dataSource={orders} columns={columns} />
          {/* Nội dung sẽ đặt ở đây */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
