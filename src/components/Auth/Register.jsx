import React from 'react';
import axios from 'axios';
import { Form, Input, Button, message, Select, Space } from 'antd';

export default function Register() {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const { username, role, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      return message.error('Las contraseñas no coinciden');
    } else {
      try {
        axios
          .post('http://localhost:3000/register', {
            username,
            role,
            email,
            password,
          })
          .then((response) => {
            localStorage.clear();
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user_id', response.data.data.user.id);
            window.location.href = '/';
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div style={{ width: '300px', margin: 'auto', marginTop: '100px' }}>
      <h2
        style={{
          color: '#1890ff',
          fontWeight: 'bold',
          fontSize: '2rem',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        Regístrate
      </h2>
      <Space direction="vertical" size="large">
        <Form
          form={form}
          onFinish={handleSubmit}
          style={{ width: '400px', margin: 'auto' }}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
        >
          <Form.Item
            label="Nombre de usuario"
            name="username"
            rules={[
              {
                required: true,
                message: 'Por favor ingresa tu nombre de usuario',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Rol" name="role">
            <Select defaultValue="user">
              <Select.Option value="user">Usuario</Select.Option>
              <Select.Option value="admin">Administrador</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Por favor ingresa tu email',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              { required: true, message: 'Por favor ingresa tu contraseña' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirmar contraseña"
            name="confirmPassword"
            rules={[
              { required: true, message: 'Por favor confirma tu contraseña' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Regístrate
            </Button>
          </Form.Item>
        </Form>
      </Space>
      <p>
        ¿Ya tienes una cuenta?{' '}
        <Button type="link" href="/login">
          Inicia sesión
        </Button>
      </p>
    </div>
  );
}
