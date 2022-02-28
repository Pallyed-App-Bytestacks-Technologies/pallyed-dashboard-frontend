import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import FalconCardHeader from 'components/common/FalconCardHeader';

const ProfileSettings = () => {
  let loggedInUser = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (!loggedInUser) {
      console.log('No user');
      history.push('/authentication/card/login');
    }
  }, []);

  // let Nuser = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    firstName: loggedInUser.fname,
    lastName: loggedInUser.lname,
    email: loggedInUser.email,
    phone: 'Phone Number',
    heading: '',
    intro: 'A short description of yourself'
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <Card>
      <FalconCardHeader title="Profile Settings" />
      <Card.Body className="bg-light">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={6} controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                name="firstName"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg={6} controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                name="lastName"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={6} controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={formData.email}
                name="email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg={6} controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                value={formData.phone}
                name="phone"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="heading">
            <Form.Label>Heading</Form.Label>
            <Form.Control
              type="text"
              placeholder="Heading"
              value={formData.heading}
              name="heading"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="intro">
            <Form.Label>Intro</Form.Label>
            <Form.Control
              as="textarea"
              rows={13}
              placeholder="Intro"
              value={formData.intro}
              name="intro"
              onChange={handleChange}
            />
          </Form.Group>
          <div className="text-end">
            <Button variant="primary" type="submit">
              Update
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProfileSettings;
