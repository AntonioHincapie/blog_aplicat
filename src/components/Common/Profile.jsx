import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Space } from 'antd';
import { Header } from 'antd/es/layout/layout';

export default function Profile() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/${userId}`, {
        headers: {
          Authorization: token,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
        }}
      >
        <h1>Perfil</h1>
      </Header>
      <Card style={{ width: 300, margin: 'auto', marginBottom: '1rem' }}>
        <Space
          direction="vertical"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p>
            <strong>Nombre de Usuario:</strong> {data.username}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Rol:</strong> {data.role}
          </p>
        </Space>
      </Card>
    </div>
  );
}
