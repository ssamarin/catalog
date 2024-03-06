import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../../assets/img/logo.svg';

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;

  span {
    font-weight: 700;
    font-size: 25px;
  }

  .active {
    color: #cb1829;
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <NavLink to="/">
        <img src={logo} alt="Valantis" />
      </NavLink>
      <NavLink to="aboutus" className={({ isActive }) => (isActive ? 'active' : null)}>
        <span>О нас</span>
      </NavLink>
    </HeaderWrapper>
  );
}

export default Header;
