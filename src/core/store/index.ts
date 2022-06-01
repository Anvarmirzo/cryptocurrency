import {configureStore} from '@reduxjs/toolkit'
import {cryptoApi, cryptoNewsApi} from '../services';

export const store = configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer
    },
})