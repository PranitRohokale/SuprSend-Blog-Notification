import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_API}/api/v1/blog/all`)
      .then(response => {
        // setBlogs(response.data);
        // console.log(response.data);

        let base64Flag = 'data:image/jpeg;base64,';
        const allBlogs = response?.data?.map((blogInfo) => ({
          ...blogInfo,
          image: base64Flag + arrayBufferToBase64(blogInfo?.image?.data)
        }))

        console.log(allBlogs);
        setBlogs(allBlogs)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Container className='mv-5'>
        <Row>
          <h1 className="text-center">Blogs</h1>
        </Row>
        <Row>
          {blogs.map(blog => {
            const trimmedContent = blog.content.length > 200 ? blog.content.slice(0, 200) + '...' : blog.content;

            return (
              <Col key={blog.id} lg={4} md={6} className="mb-4" style={{ maxHeight: "50%" }}>
                <Card>
                  <Card.Img variant="top" src={blog.image} alt="Blog Image" width={250} height={250} />
                  <Card.Body>
                    <Card.Title>{blog.title}</Card.Title>
                    <Card.Text>{trimmedContent}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">Author: {blog?.authorId?.email}</small>
                    <Link to={`/blog/${blog?._id}`}>
                      <Button variant="primary" className='m-2'>View Blog</Button>
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
            )
          }
          )}
        </Row>
      </Container>
    </>
  );
};

export default BlogPage;
