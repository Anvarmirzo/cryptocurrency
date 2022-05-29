import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ICoinsResponse} from '../models';

const cryptoAPIHeaders = {
    'X-RapidAPI-Host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
    'X-RapidAPI-Key': process.env.REACT_APP_CRYPTO_RAPIDAPI_KEY
}

const createRequest = (url: string) => ({url, headers: cryptoAPIHeaders});

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_CRYPTO_API_URL}),
    endpoints: (builder) => ({
        getCryptos: builder.query<ICoinsResponse, number>({
            query: () => createRequest(`/coins`),
        })
    })
})

export const {useGetCryptosQuery} = cryptoApi;