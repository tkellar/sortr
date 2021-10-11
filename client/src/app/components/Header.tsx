import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import authenticationService from '../services/AuthenticationService';

function Header(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const sub = authenticationService.currentUser.subscribe((user) => {
      setIsLoggedIn(!!user);
    });

    return () => sub.unsubscribe();
  }, []);

  if (isLoggedIn) {
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/workspaces" className="navbar-brand">
            SORTr
          </Link>
        </div>
      </nav>
    );
  }

  return null;
}

export default Header;
