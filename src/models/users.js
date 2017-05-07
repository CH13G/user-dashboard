
export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
  },
  reducers: {
    save(state, {payload: {data: last, total}}) {
      return {...state, list , total};
    }
  },
  effects: {
    *fetch({payload: {page}}, {call, put}) {
      const {data, headers} = yield call(usersService.fetch, {page});
      yield put({type: 'save',payload: {data, total: header['x-total-count']} })
    },
  },
  subscriptions: {
    setup({dispatch,history}) {
      return history.listen( ({pathname,query}) => {
        if(pathname === '/users') {
          dispatch({type: 'fetch', payload: query});
        }
      })
    }
  },
};
