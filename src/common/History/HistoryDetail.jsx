import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Layout, Button, theme, Table, Spin } from 'antd';
import axios from 'axios';

const { Content } = Layout;


const App = () => {
  const { id } = useParams();

  const [orderDetail, setOrderDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image', // Thay đổi key để hiển thị ảnh thay vì bookId
      key: 'image',
      render: (text, record) => (
        <img src={"http://localhost:5173/"+text} alt={text} style={{ maxWidth: '100px' }} /> //Nhớ sửa đường dẫn quay lại 2 thư mục
      ),
    },
    {
      title: 'Name',
      dataIndex: 'bookName', // Chỉnh sửa key để truy xuất đúng dữ liệu
      key: 'bookName',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity', // Chỉnh sửa key để truy xuất đúng dữ liệu
      key: 'quantity',
    },
    {
      title: 'Amount',
      dataIndex: 'amount', // Chỉnh sửa key để truy xuất đúng dữ liệu
      key: 'amount',
    },
  ];

  useEffect(() => {
    async function fetchOrderDetail() {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/getOrder/${id}`);
        const orderData = response.data;

        // Đoạn code lấy ảnh thay vì bookId
        for (const item of orderData.cartItems) {
          const bookResponse = await axios.get(`http://localhost:8080/api/book/${item.bookId}`);
          item.image = bookResponse.data.photo; // Thay thế bookId thành đường dẫn ảnh
          item.amount= item.amount/item.quantity; //Tính giá tiền trên 1 quyển = Amount/quantity
        }

        setOrderDetail(orderData.cartItems);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách orderDetail từ API:', error);
        setLoading(false);
      }
    }

    fetchOrderDetail();
  }, [id]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer }}>
          <Link to="/history">
            {/* <Button> */}
            <Button type="primary" style={{backgroundColor: "#5d728f", marginLeft: "25px", marginBottom:"15px"}}>
                Back
            </Button>
          </Link>
          {/* <h3>{id}</h3> */}
          {loading ? (
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          ) : (
            <Table dataSource={orderDetail} columns={columns} />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
