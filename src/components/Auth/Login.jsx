import React from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';

export default function Login() {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const { email, password } = values;
    try {
      axios
        .post('http://localhost:3000/login', {
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
        Iniciar sesión
      </h2>
      <Form
        form={form}
        onFinish={handleSubmit}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa tu nombre de usuario',
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
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Iniciar sesión
          </Button>
        </Form.Item>
      </Form>
      <p>
        ¿No tienes una cuenta?{' '}
        <Button href="/register" type="link">
          Regístrate
        </Button>
      </p>
    </div>
  );
}
