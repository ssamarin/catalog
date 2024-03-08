import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { incOffset, incCountOfPage, setCountOfPage } from '../ProductList/productListSlice';
import right from '../../assets/icons/right.svg';
import left from '../../assets/icons/left.svg';

const SwitchPageWrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 25px;
  padding: 30px;
  font-size: 25px;

  .bold {
    font-weight: 700;
  }

  input {
    padding: 5px;
    width: 100px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 25px;
    outline: none;
  }

  button {
    width: 100px;
    height: 50px;
    background-color: transparent;

    img {
      width: 20px;
    }
  }

  .danger {
    border: 2px solid #cb1829;
  }
`;

function SwitchPage() {
  const dispatch = useDispatch();
  const countOfPage = useSelector((state) => state.productList.countOfPage);
  const productsLoadingStatus = useSelector((state) => state.productList.productsLoadingStatus);
  const products = useSelector((state) => state.productList.products);
  const [invalidInput, setInvalidInput] = useState(false);

  const switchPage = (count, currentOffset) => {
    dispatch(incCountOfPage(count));
    dispatch(incOffset(currentOffset));
  };

  const onInputSwichPage = (count) => {
    const pageNumber = +count;
    if (count > 0 && count <= 159) {
      dispatch(setCountOfPage(+pageNumber));
      dispatch(incOffset(+pageNumber * 50));
      setInvalidInput(false);
    } else {
      setInvalidInput(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onInputSwichPage(e.target.value);
    }
  };

  if (products.length === 0 || productsLoadingStatus === 'loading') {
    return null;
  }

  return (
    <SwitchPageWrapper>
      <button onClick={() => switchPage(-1, -50)} disabled={countOfPage === 1} type="button">
        <img src={left} alt="left" />
      </button>
      <span>
        Страница
        {' '}
        <input onBlur={(e) => onInputSwichPage(e.target.value)} onKeyDown={handleKeyDown} placeholder={countOfPage} className={invalidInput ? 'danger' : null} type="number" min={1} max={159} />
        {' '}
        из
        {' '}
        159
      </span>
      <button onClick={() => switchPage(1, 50)} disabled={countOfPage === 159} type="button">
        <img src={right} alt="left" />
      </button>
    </SwitchPageWrapper>
  );
}

export default SwitchPage;
