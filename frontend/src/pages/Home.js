import React from 'react';
import { Container, Row } from 'react-bootstrap';
import SubscribeSection from '../components/SubscribeSection';
import BlogPage from './BlogPage';
const Home = () => {
    return (
        <Container className='my-3'>
            <Row>
                <SubscribeSection />
            </Row>
            <Row>
                <div className="jumbotron jumbotron-fluid bg-light my-5">
                    <div className="container">
                        <BlogPage/>
                    </div>
                </div>
            </Row>
        </Container>
    );
};

export default Home;
