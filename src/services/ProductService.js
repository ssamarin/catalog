import { useDispatch, useSelector } from 'react-redux';
import useHttp from '../hooks/http.hook';
import {
  idsFetched,
  allIdsFetched,
  allProductsFetched,
  idsFetchingError,
  productsFetching,
  productsFetched,
  productsFetchingError,
} from '../Components/ProductList/productListSlice';

function useProductService() {
  const { request } = useHttp();
  const offset = useSelector((state) => state.productList.offset);
  const ids = useSelector((state) => state.productList.ids);
  const allIds = useSelector((state) => state.productList.allIds);
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

  const getAllIds = async (body = JSON.stringify({
    action: 'get_ids',
  })) => {
    try {
      const resp = await request(body);
      const uniqIds = [...new Set(resp.result)];
      dispatch(allIdsFetched(uniqIds));
      return null;
    } catch (e) {
      await getAllIds(body);
      console.error(e);
      return null;
    }
  };

  const getItems = async (body = JSON.stringify({
    action: 'get_items',
    params: { ids },
  })) => {
    dispatch(productsFetching());
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

  const getAllItems = async (body = JSON.stringify({
    action: 'get_items',
    params: { ids: allIds },
  })) => {
    dispatch(productsFetching());
    try {
      const resp = await request(body);
      const uniqueItems = resp.result.reduce((acc, currentItem) => {
        if (!acc.find((item) => item.id === currentItem.id)) {
          acc.push(currentItem);
        }
        return acc;
      }, []);
      dispatch(allProductsFetched(uniqueItems));
    } catch (e) {
      dispatch(productsFetchingError());
      await getAllItems(body);
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
    getAllIds,
    getAllItems,
    getFields,
    filter,
  };
}

export default useProductService;
