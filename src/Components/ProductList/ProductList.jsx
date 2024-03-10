import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Spinner from '../Spinner';
import useProductService from '../../services/ProductService';
import { productDeleted } from './productListSlice';
import productImg from '../../assets/img/product.png';
import remove from '../../assets/icons/remove.svg';

const ProductListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;

  .product {
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 300px;
    padding: 10px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 8px; 
    box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
    row-gap: 5px;

    &__count {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      padding: 5px;
      color: #fff;
      background-color: #000;
      border-radius: 50%;
    }

    button {
      position: absolute;
      top: 0;
      right: 35px;
      width: 30px;
      height: 30px;
      background-color: transparent;

      img {
        width: 30px;
        height: 30px;
      }
    }

    &__name {
      max-width: 100%;
    }

    &__brand {
      color: #cb1829;
      font-weight: bold;
    }

    &__price {
      font-weight: bold;
    }

    &__id {
      font-weight: bold;
    }
  }

  img {
    min-width: 100px;
    height: 200px;
  }
`;

function ProductList() {
  const dispatch = useDispatch();
  const {
    getIds,
    getItems,
    filterByPrice,
    filterByBrand,
    filterByProductName,
  } = useProductService();
  const ids = useSelector((state) => state.productList.ids);
  const offset = useSelector((state) => state.productList.offset);
  const products = useSelector((state) => state.productList.products);
  const productsLoadingStatus = useSelector((state) => state.productList.productsLoadingStatus);
  const pageSearchData = useSelector((state) => state.filters.pageSearchData);
  const currentBrand = useSelector((state) => state.filters.currentBrand);
  const currentPrice = useSelector((state) => state.filters.currentPrice);
  const dbSearchData = useSelector((state) => state.filters.dbSearchData);

  const memoizedGetIds = useMemo(() => getIds, [getIds]);
  const memoizedGetItems = useMemo(() => getItems, [getItems]);
  const memoizedFilterByBrand = useMemo(() => filterByBrand, [filterByBrand]);
  const memoizedFilterByPrice = useMemo(() => filterByPrice, [filterByPrice]);
  const memoizedFilterByProductName = useMemo(() => filterByProductName, [filterByProductName]);

  useEffect(() => {
    memoizedGetIds();
  }, [offset]);

  useEffect(() => {
    if (ids.length > 0) {
      memoizedGetItems();
    }
  }, [ids]);

  useEffect(() => {
    if (currentBrand !== 'All') {
      memoizedFilterByBrand(currentBrand);
    } else {
      memoizedGetIds();
    }
  }, [currentBrand]);

  useEffect(() => {
    if (currentPrice !== 'All') {
      memoizedFilterByPrice(currentPrice);
    } else {
      memoizedGetIds();
    }
  }, [currentPrice]);

  useEffect(() => {
    if (dbSearchData !== '') {
      memoizedFilterByProductName(dbSearchData);
    } else {
      memoizedGetIds();
    }
  }, [dbSearchData]);

  const onProductDeleted = (id) => {
    dispatch(productDeleted(id));
  };

  const pageSearchProducts = (search) => {
    if (search.length === 0) {
      return products;
    }
    const pageSearchingProducts = products.filter(
      (product) => product.product.indexOf(search) > -1,
    );
    return pageSearchingProducts;
  };

  const visibleProducts = pageSearchProducts(pageSearchData);

  if (productsLoadingStatus === 'loading') {
    return <Spinner />;
  }

  if (visibleProducts.length === 0) {
    return <div className="nothing">Товары не найдены</div>;
  }

  return (
    <ProductListWrapper>
      {visibleProducts.map((product, i) => (
        <div className="product" key={product.id}>
          <span className="product__count">{i + 1}</span>
          <button onClick={() => onProductDeleted(product.id)} aria-label="remove product" type="button">
            <img src={remove} alt="remove product" />
          </button>
          <img src={productImg} alt={product.product} />
          <span className="product__name">{product.product}</span>
          <span className="product__brand">{product.brand ? product.brand : null}</span>
          <span className="product__price">{product.price}</span>
          <span className="product__id">{`id ${product.id.slice(0, 8)}...`}</span>
        </div>
      ))}
    </ProductListWrapper>
  );
}

export default ProductList;
