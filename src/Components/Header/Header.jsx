import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  updatePageSearchData,
  updateDbSearchData,
  setCurrentBrand,
  setCurrentPrice,
} from './headerSlice';

import logo from '../../assets/img/logo.svg';
import search from '../../assets/icons/search.svg';
import selectArrow from '../../assets/icons/selectArrow.svg';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;

  .filters {
    display: flex;
    align-items: center;
    column-gap: 25px;

    input {
      width: 280px;
      padding: 8px 8px 8px 44px;
      color: #2b2d35;
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      background: #fff;
      background: url(${search}) no-repeat 12px 8px;
      border: 2px solid #eaeef4;
      border-radius: 18px;
  
      &:focus {
        outline: none;
      }
  
      &:disabled {
        border: 2px solid #cb1829;
      }
    }
  
    .sortByBrand {
      span {
        margin-right: 15px;
        font-weight: 400;
        font-size: 20px;
      }
    }
  
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
  
      &:disabled {
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

  @media (max-width: 1750px) {
    .sortName {
      display: none;
    }

    .aboutUs {
      font-size: 25px;
    }
  }

  @media (max-width: 1370px) {
    flex-direction: column;
    row-gap: 10px;
  }

  @media (max-width: 1050px) {
    .filters {
      flex-direction: column;
      row-gap: 10px;

      select {
        width: 280px;
        background: url(${selectArrow}) no-repeat 250px center;
      }
    }
  }
`;

function Header() {
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.filters.searchData);
  const dbSearchData = useSelector((state) => state.filters.dbSearchData);
  const currentBrand = useSelector((state) => state.filters.currentBrand);
  const currentPrice = useSelector((state) => state.filters.currentPrice);
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

  const prices = [
    'All',
    1100,
    90000,
    2350000,
  ];

  const onChangeSearchData = (e) => {
    dispatch(updatePageSearchData(e.target.value));
  };

  const onChangeDbSearchData = (e) => {
    dispatch(updateDbSearchData(e.target.value));
  };

  return (
    <HeaderWrapper>
      <NavLink to="/">
        <img src={logo} alt="Valantis" />
      </NavLink>
      <div className="filters">
        <input onChange={(e) => onChangeSearchData(e)} value={searchData} type="text" placeholder="Поиск по странице" />
        <input onChange={(e) => onChangeDbSearchData(e)} disabled={currentBrand !== 'All' || currentPrice !== 'All'} value={dbSearchData} type="text" placeholder="Поиск по базе данных" />
        <div className="sortByBrand">
          <span className="sortName">Сортировка по цене</span>
          <select onChange={(e) => dispatch(setCurrentPrice(e.target.value))} disabled={currentBrand !== 'All' || dbSearchData !== ''} name="price">
            {prices.map((price) => (
              <option key={price} value={price}>{price}</option>
            ))}
          </select>
        </div>
        <div className="sortByBrand">
          <span className="sortName">Сортировка по бренду</span>
          <select onChange={(e) => dispatch(setCurrentBrand(e.target.value))} disabled={currentPrice !== 'All' || dbSearchData !== ''} name="brand">
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
      </div>
      <NavLink to="aboutus" className={({ isActive }) => (isActive ? 'active aboutUs' : 'aboutUs')}>
        <span className="aboutUs">О нас</span>
      </NavLink>
    </HeaderWrapper>
  );
}

export default Header;
