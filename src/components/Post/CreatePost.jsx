import React from 'react';
import axios from 'axios';
import { Card, Form, Input, Button, message } from 'antd';
import { Header } from 'antd/es/layout/layout';

export default function CreatePost() {
  const [form] = Form.useForm();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');

  const handlePost = async (values) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/post',
        {
          title: values.title,
          content: values.content,
          user_id: userId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      message.success('Post creado correctamente');
      form.resetFields();
    } catch (error) {
      console.log(error);
      message.error('No se pudo crear el post');
    }
  };

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
        <h1>Crear Post</h1>
      </Header>
      <Card
        title="Escribe tu post"
        style={{
          width: 400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
        }}
      >
        <Form
          form={form}
          onFinish={handlePost}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Título"
            name="title"
            rules={[
              {
                required: true,
                message: 'Por favor ingresa el título de tu post',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contenido"
            name="content"
            rules={[
              {
                required: true,
                message: 'Por favor ingresa el contenido de tu post',
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Crear
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
