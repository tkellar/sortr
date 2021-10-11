import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';
import styled from 'styled-components';
import Workspace from '../components/Workspace';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { WorkspaceViewModel } from '../models';
import workspaceService from '../services/WorkspaceService';


const GradientHeaderContainer = styled.div`
  color: white;
  height: 15vh;
  background: linear-gradient(180deg, #F8F9FA 28.3%, #118AB2 100%);
  display: flex;
  align-items: end;
  justify-content: center;
`;

function Workspaces(): JSX.Element {
  const [workspaces, setWorkspaces] = useState<WorkspaceViewModel[]>([]);
  const { path } = useRouteMatch();

  useEffect(() => {
    const sub = workspaceService.workspaces.subscribe((workspaces) => {
      setWorkspaces(workspaces);
    });

    return () => sub.unsubscribe();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path={path}>
          <GradientHeaderContainer>
            <h1>Workspaces</h1>
          </GradientHeaderContainer>
          <div className="container p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <button className="btn btn-outline-success">
                  <FontAwesomeIcon className="me-1" icon={faPlusCircle} />
                  Add Workspace
                </button>
              </div>

              <div>
                <div className="input-group">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search workspaces..."
                  />
                </div>
              </div>
            </div>
            <ul>
              {workspaces.map((workspace: WorkspaceViewModel) => (
                <li>
                  <Link to={`${path}/${workspace.id}`}>
                    {workspace.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Route>
        <Route path={`${path}/:workspaceId`}>
          <Workspace />
        </Route>
      </Switch>
    </Router>
  );
}

export default Workspaces;
