import { useDispatch, useSelector } from 'react-redux';
import useHttp from '../hooks/http.hook';
import {
  idsFetched,
  idsFetchingError,
  productsFetching,
  productsFetched,
  productsFetchingError,
} from '../Components/ProductList/productListSlice';

function useProductService() {
  const { request } = useHttp();
  const offset = useSelector((state) => state.productList.offset);
  const ids = useSelector((state) => state.productList.ids);
  const dispatch = useDispatch();

  const getIds = async (body = JSON.stringify({
    action: 'get_ids',
    params: {
      offset,
      limit: 50,
    },
  })) => {
    dispatch(productsFetching());
    try {
      const resp = await request(body);
      const uniqIds = [...new Set(resp.result)];
      dispatch(idsFetched(uniqIds));
      return null;
    } catch (e) {
      dispatch(idsFetchingError());
      await getIds(body);
      console.error(e);
      return null;
    }
  };

  // const getAmountOfPages = async (body = JSON.stringify({
  //   action: 'get_ids',
  // })) => {
  //   try {
  //     const resp = await request(body);
  //     const uniqIds = [...new Set(resp.result)];
  //     return Math.round(uniqIds.length / 50);
  //   } catch (e) {
  //     await getAmountOfPages(body);
  //     console.error(e);
  //     return null;
  //   }
  // };

  const getItems = async (body = JSON.stringify({
    action: 'get_items',
    params: { ids },
  })) => {
    try {
      const resp = await request(body);
      const uniqueItems = resp.result.reduce((acc, currentItem) => {
        if (!acc.find((item) => item.id === currentItem.id)) {
          acc.push(currentItem);
        }
        return acc;
      }, []);
      dispatch(productsFetched(uniqueItems));
    } catch (e) {
      dispatch(productsFetchingError());
      await getItems(body);
      console.error(e);
    }
  };

  const getFields = async (body = JSON.stringify({
    action: 'get_fields',
  })) => {
    await request(body)
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  };

  const filter = async (body = JSON.stringify({
    action: 'filter',
    params: {
      price: 17500.0,
    },
  })) => {
    await request(body)
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  };

  return {
    getIds,
    getItems,
    getFields,
    filter,
  };
}

export default useProductService;
