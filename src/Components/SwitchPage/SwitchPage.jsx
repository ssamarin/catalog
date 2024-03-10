import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import {
  incOffset, changeOffset, incCountOfPage, setCountOfPage,
} from '../ProductList/productListSlice';
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
  const currentBrand = useSelector((state) => state.filters.currentBrand);
  const currentPrice = useSelector((state) => state.filters.currentPrice);
  const [inputValue, setInputValue] = useState(1);
  const [invalidInput, setInvalidInput] = useState(false);
  const [amountOfPages, setAmountOfPages] = useState(159);

  const switchPage = (count, currentOffset) => {
    dispatch(incCountOfPage(count));
    dispatch(incOffset(currentOffset));
    if (count > 0) {
      setInputValue((prev) => prev + 1);
    } else if (count < 0) {
      setInputValue((prev) => prev - 1);
    }
  };

  const onInputSwichPage = (count) => {
    const pageNumber = +count;
    if (pageNumber > 0 && pageNumber <= 159) {
      dispatch(setCountOfPage(+pageNumber));
      if (pageNumber === 1) {
        dispatch(changeOffset(0));
      } else {
        dispatch(changeOffset(+pageNumber * 50));
      }
      setInvalidInput(false);
      setInputValue(count);
    } else {
      setInvalidInput(true);
    }
  };

  const onInputChange = (e) => {
    setInputValue(e);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onInputSwichPage(e.target.value);
    }
  };

  const calcAmountOfPages = () => {
    if (currentBrand !== 'All' || currentPrice !== 'All') {
      setAmountOfPages(1);
      setInputValue(1);
    } else {
      setAmountOfPages(159);
    }
  };

  useEffect(() => {
    calcAmountOfPages();
  }, [currentBrand]);

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
        <input disabled={currentBrand !== 'All' || currentPrice !== 'All'} value={inputValue} onChange={(e) => onInputChange(e.target.value)} onBlur={(e) => onInputSwichPage(e.target.value)} onKeyDown={handleKeyDown} className={invalidInput ? 'danger' : null} type="number" min={1} max={159} />
        {' '}
        из
        {' '}
        {amountOfPages}
      </span>
      <button onClick={() => switchPage(1, 50)} disabled={countOfPage === 159 || invalidInput === true || currentBrand !== 'All' || currentPrice !== 'All'} type="button">
        <img src={right} alt="left" />
      </button>
    </SwitchPageWrapper>
  );
}

export default SwitchPage;
