import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import authenticationService from '../services/AuthenticationService';
import { Redirect } from 'react-router-dom';

const LoginBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.blue};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginPane = styled.div`
  width: 25vw;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.grey100};
`;

function Login(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectTo, setRedirectTo] = useState(null);

  async function submit() {
    const user = await authenticationService.login(username, password);

    if (user) {
      // TODO: Redirect to the route they were originally redirected from
      setRedirectTo('/workspaces');
    }

    // TODO: Handle invalid username/password
  }

  if (redirectTo) {
    return <Redirect to={redirectTo} />
  }

  return (
    <LoginBackground>
      <LoginPane>
        <h3 className="text-center text-dark">SORTr</h3>
        <div className="p-3">
          <div className="input-group">
            <div className="input-group-text">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <input
              className="form-control"
              type="text"
              placeholder="Username"
              value={username}
              onInput={(event) => setUsername((event.target as HTMLInputElement).value)}
            />
          </div>
          <div className="input-group mt-3">
            <div className="input-group-text">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <input
              className="form-control"
              type="text"
              placeholder="Password"
              value={password}
              onInput={(event) => setPassword((event.target as HTMLInputElement).value)}
            />
          </div>
          <div className="d-grid mt-3">
            <button className="btn btn-success" type="button" onClick={submit}>
              Log In
            </button>
          </div>
        </div>
      </LoginPane>
    </LoginBackground>
  );
}

export default Login;
