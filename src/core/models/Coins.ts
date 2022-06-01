import {IExchange} from './Exchanges';

export interface ICoinsResponse {
    status: string;
    data: {
        stats: IStat;
        coins: Pick<ICoin,
            'uuid' |
            'symbol' |
            'name' |
            'color' |
            'iconUrl' |
            'marketCap' |
            'price' |
            'btcPrice' |
            'listedAt' |
            'change' |
            'rank' |
            'coinrankingUrl' |
            'sparkline'>[];
    }
}

export interface ICoinResponse {
    status: string;
    data: {
        coin: ICoin;
    }
}

export interface ICoinHistoryResponse {
    status: string;
    data: {
        change: string;
        history: ICoinHistory[];
    }
}

export interface ICoinExchangesResponse {
    status: string;
    data: {
        stats: {
            '24hVolume': string;
            total: number;
        };
        exchanges: IExchange[];
    }
}


export interface ICoinHistory {
    price: string;
    timestamp: number;
}

export interface IStat {
    total: number;
    totalCoins: number;
    totalMarkets: number;
    totalExchanges: number;
    totalMarketCap: string;
    total24hVolume: string;
}

export interface ICoin {
    uuid: string;
    symbol: string;
    name: string;
    color: string;
    iconUrl: string;
    marketCap: string;
    price: string;
    btcPrice: string;
    listedAt: number;
    change: string;
    rank: number;
    coinrankingUrl: string;
    sparkline: string[];
    '24hVolume': string;
    allTimeHigh: {
        price: string;
        timestamp: number;
    }
    description: string;
    links: ICoinLink[];
    lowVolume: boolean;
    numberOfExchanges: number;
    numberOfMarkets: number;
    priceAt: number;
    supply: ICoinSupply;
    tier: number;
    websiteUrl: string;
}

export interface ICoinLink {
    name: string;
    type: string;
    url: string;
}

export interface ICoinSupply {
    circulating: string;
    confirmed: boolean;
    total: string;
}