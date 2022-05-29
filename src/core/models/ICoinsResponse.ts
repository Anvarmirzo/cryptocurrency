export interface ICoinsResponse {
    status: string;
    data: {
        stats: IStat;
        coins: ICoin[];
    }
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
}

