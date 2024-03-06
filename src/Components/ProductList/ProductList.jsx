import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Spinner from '../Spinner';
import useProductService from '../../services/ProductService';
import { productDeleted } from './productListSlice';
import productImg from '../../assets/img/product.png';
import remove from '../../assets/img/remove.svg';

const ProductListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;

  .product {
    display: flex;
    position: relative;
    border: 1px solid #cb1829;
    max-width: 260px;
    flex-direction: column;
    row-gap: 5x;
    text-align: center;

    &__count {
      position: absolute;
      width: 30px;
      height: 30px;
      padding: 5px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #000;
      color: #fff;
      top: 0;
      left: 0;
    }

    button {
      position: absolute;
      width: 30px;
      height: 30px;
      top: 0;
      right: 35px;
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
      font-weight: bold;
      color: #cb1829;
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
  const { getIds, getItems } = useProductService();
  const ids = useSelector((state) => state.productList.ids);
  const products = useSelector((state) => state.productList.products);
  const productsLoadingStatus = useSelector((state) => state.productList.productsLoadingStatus);

  const memoizedGetIds = useMemo(() => getIds, [getIds]);
  const memoizedGetItems = useMemo(() => getItems, [getItems]);

  useEffect(() => {
    memoizedGetIds();
  }, []);

  useEffect(() => {
    if (ids.length > 0) {
      memoizedGetItems();
    }
  }, [ids]);

  const onProductDeleted = (id) => {
    dispatch(productDeleted(id));
  };

  if (productsLoadingStatus === 'loading') {
    return <Spinner />;
  }

  return (
    <ProductListWrapper>
      {products.map((product, i) => (
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
