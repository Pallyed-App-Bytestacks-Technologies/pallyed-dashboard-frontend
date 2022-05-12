import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from 'components/authentication/LoginForm';

import AuthCardLayout from 'layouts/AuthCardLayout';

const Login = () => {
  return (
    <AuthCardLayout
      leftSideContent={
        <p className="text-white">
          Don't have an account?
          <br />
          <Link
            className="text-white text-decoration-underline"
            to="/auth/register"
          >
            Get started!
          </Link>
        </p>
      }
    >
      <h3>Account Login</h3> <br />
      <p className="text-blue">Login with these demo details</p>
      <p>Email: barry@gmail.com</p>
      <p>Password: 12345</p> <br />
      <LoginForm layout="card" hasLabel />
    </AuthCardLayout>
  );
};

export default Login;
