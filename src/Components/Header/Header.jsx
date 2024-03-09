import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { updateSearchData, setCurrentBrand } from './headerSlice';

import logo from '../../assets/img/logo.svg';
import search from '../../assets/icons/search.svg';
import selectArrow from '../../assets/icons/selectArrow.svg';

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

  .filtersAndAboutUs{
    display: flex;
    align-items: center;
    column-gap: 50px;

    select {
      width: 200px;
      height: 40px;
      padding: 6px 6px 6px 12px;
      overflow: hidden;
      color: #2b2d35;
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      background: #fff;
      background: url(${selectArrow}) no-repeat 170px center;
      border: 2px solid #eaeef4;
      border-radius: 8px;
      cursor: pointer;
      appearance: none;
  
      &:focus {
        outline: none;
      }
    }

    span {
      font-weight: 700;
      font-size: 25px;
    }
  }

  .active {
    color: #cb1829;
  }
`;

function Header() {
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.filters.searchData);
  const brands = [
    'All',
    'Piaget',
    'Jacob & Co',
    'Cartier',
    'Bibigi',
    'Van Cleef & Arpels',
    'Pomellato', 'Bvlgari',
    'Pasquale Bruni',
    'ЭПЛ Якутские бриллианты',
    'Chopard', 'Baraka', 'Casato',
    'Imma',
    'Faberge',
    'Roberto Coin',
    'Damiani',
    'Carrera y Carrera',
    'De Beers',
    'Audemars Piguet',
    'Mikimoto',
    'Giorgio Visconti',
    'Stephen Webster',
    'Chaumet',
    'Tiffany & Co',
    'Franck Muller',
    'De Grisogono',
    'Mauboussin',
    'Casa Gi',
    'Alfieri & St.John',
  ];

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
      <div className="filtersAndAboutUs">
        <select onChange={(e) => dispatch(setCurrentBrand(e.target.value))} name="brand">
          {brands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
        <NavLink to="aboutus" className={({ isActive }) => (isActive ? 'active' : null)}>
          <span>О нас</span>
        </NavLink>
      </div>
    </HeaderWrapper>
  );
}

export default Header;
