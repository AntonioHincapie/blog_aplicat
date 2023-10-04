import React from 'react';
import {
  CoffeeOutlined,
  FolderOpenOutlined,
  EditOutlined,
  SettingOutlined,
  FrownOutlined,
} from '@ant-design/icons';
import { Menu, Popconfirm } from 'antd';

export default function NavBar() {
  const userId = localStorage.getItem('user_id');
  const items = [
    {
      label: 'Posts',
      key: 'all-posts',
      icon: <CoffeeOutlined />,
    },
    {
      label: 'Mis Posts',
      key: 'my-posts',
      icon: <FolderOpenOutlined />,
    },
    {
      label: 'Crear Post',
      key: 'create-post',
      icon: <EditOutlined />,
    },
    {
      label: 'Perfil',
      key: 'profile',
      icon: <SettingOutlined />,
    },
    {
      label: (
        <Popconfirm
          title="¿Estás seguro de que quieres cerrar sesión?"
          onConfirm={() => {
            localStorage.clear();
            window.location.href = '/';
          }}
          onCancel={() => {}}
          okText="Sí"
          cancelText="No"
        >
          Cerrar sesión
        </Popconfirm>
      ),
      key: 'logout',
      icon: <FrownOutlined />,
    },
  ];
  const onClick = (e) => {
    if (e.key === 'all-posts') {
      window.location.href = '/';
    } else if (e.key === 'my-posts') {
      window.location.href = `/my-posts/${userId}`;
    } else if (e.key === 'create-post') {
      window.location.href = '/create-post';
    } else if (e.key === 'profile') {
      window.location.href = '/profile';
    }
  };
  return (
    <Menu
      onClick={onClick}
      mode="horizontal"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      items={items}
    />
  );
}
