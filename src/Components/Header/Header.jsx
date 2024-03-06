import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { updateSearchData } from './headerSlice';

import logo from '../../assets/img/logo.svg';
import search from '../../assets/icons/search.svg';

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;

  .logoAndSearch {
    display: flex;
    align-items: center;
    column-gap: 50px;

    input {
      width: 400px;
      padding: 8px 8px 8px 44px;
      border-radius: 18px;
      border: 2px solid #EAEEF4;
      background: #FFF;
      color: #B8C4DB;
      font-size: 16px;
      font-weight: 400;
      line-height: 150%;
      background: url(${search}) no-repeat 12px 8px;
      color: #2b2d35;
      
      &:focus {
        outline: none;
        border: 2px solid #cb1829;
      }
    }
  }

  span {
    font-weight: 700;
    font-size: 25px;
  }

  .active {
    color: #cb1829;
  }
`;

function Header() {
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.filters.searchData);

  const onChangeSearchData = (e) => {
    dispatch(updateSearchData(e.target.value));
  };

  return (
    <HeaderWrapper>
      <div className="logoAndSearch">
        <NavLink to="/">
          <img src={logo} alt="Valantis" />
        </NavLink>
        <input onChange={(e) => onChangeSearchData(e)} value={searchData} type="text" placeholder="Введите название товара" />
      </div>
      <NavLink to="aboutus" className={({ isActive }) => (isActive ? 'active' : null)}>
        <span>О нас</span>
      </NavLink>
    </HeaderWrapper>
  );
}

export default Header;
