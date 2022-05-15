import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Divider from 'components/common/Divider';
import SocialAuthButtons from './SocialAuthButtons';

const RegistrationForm = ({ hasLabel }) => {
  // State
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAccepted: false
  });

  let history = useHistory();

  async function registerUser(credentials) {
    return fetch(`https://www.treasurelandtechhomes.com/api/patron/register`, {
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
    const response = await registerUser(formData);
    try {
      if ('user' in response) {
        toast.success(
          `Successfully registered as ${response['user'].fname} ${response['user'].lname}`
        );
        console.log(response);
        history.push('/auth/login');
      }
    } catch (err) {
      console.log(response);
      toast.error(`Email ${formData.email} already exists`);
    }
    // if ('user' in response) {
    //   toast.success(
    //     `Successfully registered as ${formData.fname} ${formData.lname}`
    //   );
    //   history.push('/authentication/card/login');
    // } else {
    //   toast.error('Login Error');
    // }
    //console.log(formData);
    //console.log(`${response['email']}`);
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
        {hasLabel && <Form.Label>First name</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'First name' : ''}
          value={formData.fname}
          name="fname"
          onChange={handleFieldChange}
          type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Last name</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Last Name' : ''}
          value={formData.lname}
          name="lname"
          onChange={handleFieldChange}
          type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Email address</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email address' : ''}
          value={formData.email}
          name="email"
          onChange={handleFieldChange}
          type="text"
        />
      </Form.Group>

      <Row className="g-2 mb-3">
        <Form.Group as={Col} sm={6}>
          {hasLabel && <Form.Label>Password</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'Password' : ''}
            value={formData.password}
            name="password"
            onChange={handleFieldChange}
            type="password"
          />
        </Form.Group>
        <Form.Group as={Col} sm={6}>
          {hasLabel && <Form.Label>Confirm Password</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'Confirm Password' : ''}
            value={formData.confirmPassword}
            name="confirmPassword"
            onChange={handleFieldChange}
            type="password"
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Check type="checkbox" id="acceptCheckbox" className="form-check">
          <Form.Check.Input
            type="checkbox"
            name="isAccepted"
            checked={formData.isAccepted}
            onChange={e =>
              setFormData({
                ...formData,
                isAccepted: e.target.checked
              })
            }
          />
          <Form.Check.Label className="form-label">
            I accept the <Link to="#!">terms</Link> and{' '}
            <Link to="#!">privacy policy</Link>
          </Form.Check.Label>
        </Form.Check>
      </Form.Group>

      <Form.Group className="mb-4">
        <Button
          className="w-100"
          type="submit"
          disabled={
            !formData.lname ||
            !formData.fname ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword ||
            !formData.isAccepted
          }
        >
          Register
        </Button>
      </Form.Group>
      <Divider>or register with</Divider>

      <SocialAuthButtons />
    </Form>
  );
};

RegistrationForm.propTypes = {
  hasLabel: PropTypes.bool
};

export default RegistrationForm;
