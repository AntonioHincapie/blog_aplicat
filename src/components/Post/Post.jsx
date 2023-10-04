import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Form, Input, Modal, Space, message } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export default function Post(params) {
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);
  const [commentUpdate, setCommentUpdate] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');

  const getPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/post/${params.id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/comments/${params.id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setComments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = () => {
    form.validateFields().then(async (values) => {
      try {
        const response = await axios.post(
          'http://localhost:3000/comment',
          {
            content: values.comment,
            user_id: userId,
            post_id: params.id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response);
        message.success('Comentario agregado correctamente');
        getPost();
        getComments();
        setCommentVisible(false);
      } catch (error) {
        console.log(error);
        message.error('No se pudo agregar el comentario');
      }
    });
  };

  const handleUpdateComment = () => {
    form.validateFields().then(async (values) => {
      try {
        const response = await axios.put(
          `http://localhost:3000/comment/${commentId}`,
          {
            content: values.comment,
            user_id: userId,
            post_id: params.id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response);
        message.success('Comentario actualizado correctamente');
        getPost();
        getComments();
        setCommentUpdate(false);
        setCommentId(null);
      } catch (error) {
        console.log(error);
        message.error('No se pudo actualizar el comentario');
      }
    });
  };

  const handleEditing = async () => {
    const values = await form.validateFields();
    try {
      const response = await axios.put(
        `http://localhost:3000/post/${params.id}`,
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
      message.success('Post editado correctamente');
      getPost();
      setVisible(false);
    } catch (error) {
      console.log(error);
      message.error('No se pudo editar el post');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/post/${params.id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      message.success('Post eliminado correctamente');
      window.location.href = '/';
    } catch (error) {
      console.log(error);
      message.error('No se pudo eliminar el post');
    }
  };

  const handleCommentDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/comment/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      message.success('Comentario eliminado correctamente');
      getPost();
      getComments();
    } catch (error) {
      console.log(error);
      message.error('No se pudo eliminar el comentario');
    }
  };

  useEffect(() => {
    getPost();
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '2rem',
          color: '#fff',
        }}
      >
        <h1>Post</h1>
      </Header>
      <Modal
        title="Editar post"
        visible={visible}
        style={{ textAlign: 'center' }}
        onOk={handleEditing}
        onCancel={() => {
          setVisible(false);
        }}
        okText="Editar"
        cancelText="Cancelar"
      >
        <Form
          form={form}
          name="modal-confirm"
          style={{ width: '300px', margin: 'auto' }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={() => {
            handleEditing();
          }}
        >
          <Form.Item label="Título" name="title">
            <Input placeholder={data.title} />
          </Form.Item>

          <Form.Item label="Contenido" name="content">
            <Input placeholder={data.content} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Comentar post"
        visible={commentVisible}
        style={{ textAlign: 'center' }}
        onOk={handleComment}
        onCancel={() => {
          setCommentVisible(false);
        }}
        okText="Comentar"
        cancelText="Cancelar"
      >
        <Form
          form={form}
          name="modal-confirm"
          style={{ width: '300px', margin: 'auto' }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={() => {
            handleComment();
          }}
        >
          <Form.Item label="Comentario" name="comment">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Actualizar comentario"
        visible={commentUpdate}
        style={{ textAlign: 'center' }}
        onOk={handleUpdateComment}
        onCancel={() => {
          setCommentUpdate(false) & setCommentId(null);
        }}
        okText="Comentar"
        cancelText="Cancelar"
      >
        <Form
          form={form}
          name="modal-confirm"
          style={{ width: '300px', margin: 'auto' }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={() => {
            handleUpdateComment();
          }}
        >
          <Form.Item label="Comentario" name="comment">
            <Input placeholder="Actualizar comentario" />
          </Form.Item>
        </Form>
      </Modal>

      <Card
        title={data.title}
        style={{
          width: 300,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
        }}
      >
        <p style={{ marginBottom: '3rem' }}>{data.content}</p>
        <Space direction="vertical" style={{ marginBottom: '3rem' }}>
          <p>Comentarios:</p>
          {comments.length === 0 && <p>No hay comentarios</p>}
          {comments.map((comment) => (
            <p key={comment.id}>
              {comment.content}{' '}
              <Button
                type="text"
                size="small"
                onClick={() =>
                  setCommentUpdate(true) & setCommentId(comment.id)
                }
                disabled={
                  comment.user_id !== parseInt(localStorage.getItem('user_id'))
                }
              >
                <EditOutlined />
              </Button>
              <Button
                type="text"
                size="small"
                danger
                onClick={() => handleCommentDelete(comment.id)}
                disabled={
                  comment.user_id !== parseInt(localStorage.getItem('user_id'))
                }
              >
                <DeleteOutlined />
              </Button>
            </p>
          ))}
        </Space>
        <Space direction="horizontal">
          <Button type="primary" onClick={() => setCommentVisible(true)}>
            Comentar
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
            disabled={
              data.user_id !== parseInt(localStorage.getItem('user_id'))
            }
          >
            Editar
          </Button>
          <Button
            type="primary"
            danger
            onClick={handleDelete}
            disabled={
              data.user_id !== parseInt(localStorage.getItem('user_id'))
            }
          >
            Eliminar
          </Button>
        </Space>
      </Card>
    </div>
  );
}
