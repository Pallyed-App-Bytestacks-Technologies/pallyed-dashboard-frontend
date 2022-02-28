import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { useGoogleLogin } from 'react-google-login';

const CLIENT_ID =
  '330008748481-hnpfedei47cgs9858lfu5knpu4umfq6j.apps.googleusercontent.com';
const values = {
  access_token: ''
};

async function googleLogin(access_token) {
  return fetch(`https://www.treasurelandtechhomes.com/api/patron/auth/google`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(access_token)
  }).then(data => data.json());
}

const SocialAuthButtons = () => {
  let history = useHistory();

  const onSuccess = async res => {
    console.log(res);
    const googleData = res;
    values.access_token = googleData.accessToken;

    const response = await googleLogin(values);
    if ('access_token' in response) {
      toast.success(`Logged in as ${response['user'].email}`);
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
