import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {INewsResponse} from '../models';

const cryptoNewsApiHeaders = {
    'X-BingApis-SDK': process.env.REACT_APP_CRYPTO_NEWS_BING_API_SDK,
    'X-RapidAPI-Host': process.env.REACT_APP_CRYPTO_NEWS_RAPIDAPI_HOST,
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY
};

const createRequest = (url: string) => ({url, headers: cryptoNewsApiHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_CRYPTO_NEWS_API_URL}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query<INewsResponse, { newsCategory: string, count: number }>({
            query: ({
                        newsCategory,
                        count
                    }) => createRequest(`/news/search?q=${newsCategory}&freshness=Day&textFormat=Raw&safeSearch=Off&count=${count}`),
        })
    })
})

export const {useGetCryptoNewsQuery} = cryptoNewsApi;