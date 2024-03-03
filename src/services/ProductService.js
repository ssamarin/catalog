import { useSelector } from 'react-redux';
import useHttp from '../hooks/http.hook';

function useProductService() {
  const { request } = useHttp();
  const offset = useSelector((state) => state.productList.offset);

  const getIds = async (body = JSON.stringify({
    action: 'get_ids',
    params: {
      offset,
      limit: 50,
    },
  })) => {
    await request(body)
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  };

  const getItems = async (body = JSON.stringify({
    action: 'get_items',
    params: { ids: ['1789ecf3-f81c-4f49-ada2-83804dcc74b0'] },
  })) => {
    await request(body)
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
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
