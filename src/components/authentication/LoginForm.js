import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Divider from 'components/common/Divider';
import SocialAuthButtons from './SocialAuthButtons';

const LoginForm = ({ hasLabel }) => {
  // State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  let history = useHistory();

  async function loginUser(credentials) {
    return fetch(`https://www.treasurelandtechhomes.com/api/patron/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(data => data.json());
  }
  // Handler
  const handleSubmit = async e => {
    e.preventDefault();
    let credentials = {
      email: formData.email,
      password: formData.password
    };
    const response = await loginUser(credentials);
    if ('access_token' in response) {
      toast.success(`Logged in as ${formData.email}`);
      localStorage.setItem('access_token', response['access_token']);
      localStorage.setItem('user', JSON.stringify(response['user']));
      let user = response['user'];
      if (
        user.fname == null ||
        user.lname == null ||
        user.email == null ||
        user.gender == null ||
        user.description == null ||
        user.dob == null
      ) {
        toast.warn('Please complete your Profile');
        history.push('/user/settings');
      } else {
        history.push('/');
      }
    } else {
      toast.error(`Login ${response.error}`);
    }
  };

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Email address</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email address' : ''}
          value={formData.email}
          name="email"
          onChange={handleFieldChange}
          type="email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Password</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Password' : ''}
          value={formData.password}
          name="password"
          onChange={handleFieldChange}
          type="password"
        />
      </Form.Group>

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <Form.Check type="checkbox" id="rememberMe">
            <Form.Check.Input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={e =>
                setFormData({
                  ...formData,
                  remember: e.target.checked
                })
              }
            />
            <Form.Check.Label className="ms-2 mb-0">
              Remember Me
            </Form.Check.Label>
          </Form.Check>
        </Col>

        <Col xs="auto">
          <Link className="fs--1 mb-0" to={`/auth/forgot-password`}>
            Forget Password?
          </Link>
        </Col>
      </Row>

      <Form.Group>
        <Button
          type="submit"
          color="primary"
          className="mt-3 w-100"
          disabled={!formData.email || !formData.password}
        >
          Log in
        </Button>
      </Form.Group>

      <Divider className="mt-4">or log in with</Divider>

      <SocialAuthButtons />
    </Form>
  );
};

LoginForm.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

LoginForm.defaultProps = {
  layout: 'simple',
  hasLabel: false
};

export default LoginForm;
