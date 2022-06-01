import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    ICoinExchangesResponse,
    ICoinHistoryResponse,
    ICoinResponse,
    ICoinsResponse,
    IExchangesResponse
} from '../models';

const cryptoAPIHeaders = {
    'X-RapidAPI-Host': process.env.REACT_APP_RAPIDAPI_HOST,
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY
}

const createRequest = (url: string) => ({url, headers: cryptoAPIHeaders});

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_CRYPTO_API_URL}),
    endpoints: (builder) => ({
        getCryptos: builder.query<ICoinsResponse, number>({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getExchanges: builder.query<IExchangesResponse, void>({
            query: () => createRequest('/exchanges'),
        }),
        getCryptoDetails: builder.query<ICoinResponse, string>({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query<ICoinHistoryResponse, { coinId: string, timePeriod: string }>({
            query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
        }),
        getCryptoExchanges: builder.query<ICoinExchangesResponse, { coinId: string }>({
            query: ({coinId}) => createRequest(`/coin/${coinId}/exchanges`)
        })
    })
})

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
    useGetCryptoExchangesQuery,
    useGetExchangesQuery
} = cryptoApi;