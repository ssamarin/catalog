import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import useProductService from '../../services/ProductService';

function ProductList() {
  const { getIds, getItems } = useProductService();
  const ids = useSelector((state) => state.productList.ids);
  // const products = useSelector((state) => state.productList.products);

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

  return (
    <div>
      ProductList
    </div>
  );
}

export default ProductList;
