import React from 'react';
import styled from 'styled-components';

import logo from '../../assets/img/logo.svg';

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  span {
    font-weight: 700;
    font-size: 25px;
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <img src={logo} alt="Valantis" />
      <span>О нас</span>
    </HeaderWrapper>
  );
}

export default Header;
