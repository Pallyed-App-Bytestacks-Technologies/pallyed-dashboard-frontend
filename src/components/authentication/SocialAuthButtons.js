import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGoogleLogin } from 'react-google-login';

const CLIENT_ID =
  '330008748481-hnpfedei47cgs9858lfu5knpu4umfq6j.apps.googleusercontent.com';

const SocialAuthButtons = () => {
  const onSuccess = res => {
    console.log(res);
  };

  const onFailure = res => {
    console.error(`Login Failed:`, res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: CLIENT_ID
  });

  return (
    <Form.Group className="mb-0">
      <Row>
        <Col sm={6} className="pe-sm-1">
          <Button
            variant=""
            size="sm"
            className="btn-outline-google-plus mt-2 w-100"
            onClick={() => {
              signIn();
            }}
          >
            <FontAwesomeIcon
              icon={['fab', 'google-plus-g']}
              transform="grow-8"
              className="me-2"
            />{' '}
            google
          </Button>
        </Col>
        <Col sm={6} className="ps-sm-1">
          <Button
            variant=""
            size="sm"
            className="btn-outline-facebook mt-2 w-100"
          >
            <FontAwesomeIcon
              icon={['fab', 'facebook-square']}
              transform="grow-8"
              className="me-2"
            />{' '}
            facebook
          </Button>
        </Col>
      </Row>
    </Form.Group>
  );
};

export default SocialAuthButtons;
