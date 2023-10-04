import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'antd';
import { Header } from 'antd/es/layout/layout';

export default function MyPost(params) {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/posts/${params.id}`,
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

  useEffect(() => {
    getPosts();
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
        <h1>Posts</h1>
      </Header>
      {data.length === 0 && (
        <h2 style={{ textAlign: 'center' }}>
          Todavía no has creado ningún post
        </h2>
      )}
      {data.map(
        (post) =>
          post && (
            <a href={`/post/${post.id}`}>
              <Card
                key={post.id}
                title={post.title}
                style={{ width: 300, margin: 'auto', marginBottom: '1rem' }}
              >
                <p>{post.content}</p>
              </Card>
            </a>
          )
      )}
    </div>
  );
}
