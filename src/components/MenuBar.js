// MenuBar.js
import React, { useContext, useState } from 'react';
import { Menu, Input, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import UserSearchComponent from './UserSearchComponent';
import { AuthContext } from '../context/auth';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="large" color="purple">
      <Menu.Item name={user.username} active as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item>
          <UserSearchComponent />
        </Menu.Item>
        <Menu.Item name="logout" onClick={logout} />
        <Menu.Item
          name="about"
          as={Link}
          to="/about"
          position="right" // Adjust the position to the right
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="large" color="purple">
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item>
          <UserSearchComponent />
        </Menu.Item>
        <Menu.Item
          name="login"
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
        <Menu.Item
          name="about"
          as={Link}
          to="/about"
          position="right" // Adjust the position to the right
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;
