import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';


function BlogDetails({ match }) {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams()

    useEffect(() => {

        const arrayBufferToBase64 = (buffer) => {
            var binary = '';
            var bytes = [].slice.call(new Uint8Array(buffer));
            bytes.forEach((b) => binary += String.fromCharCode(b));
            return window.btoa(binary);
        };

        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/v1/blog/${id}`);
                const { data } = response;
                let base64Flag = 'data:image/jpeg;base64,';

                if (data) {
                    setBlog({ ...data, image: base64Flag + arrayBufferToBase64(data?.image?.data) });
                } else {
                    setBlog(null);
                }
            } catch (error) {
                console.error(error);
                setBlog(null);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();

    }, [id]);

    if (loading) {
        return <div className='m-5 text-center'>Loading...</div>;
    }

    if (!blog) {
        return <div className='m-5 text-center'>Blog does not exist.</div>;
    }

    return (
        <>
            <Container className='mv-5'>
                <Row>
                    <h1 className="text-center">Blog</h1>
                </Row>
                <Row>

                    <Col key={blog.id} lg={4} md={6} className="mb-6 text-center">
                        <Card>
                            <Card.Img variant="top" src={blog.image} alt="Blog Image" />
                            <Card.Body>
                                <Card.Title>{blog.title}</Card.Title>
                                <Card.Text>{blog.content}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Author: {blog?.authorId?.email}</small>
                            </Card.Footer>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </>
    );
}

export default BlogDetails;
