export interface IExchangesResponse {
    status: string;
    data: {
        stats: {
            '24hVolume': string;
            'total': number;
        },
        exchanges: IExchange[]
    }
}


export interface IExchange {
    uuid: string;
    name: string;
    iconUrl: string;
    verified: boolean;
    recommended: boolean;
    numberOfMarkets: number;
    coinrankingUrl: string;
    btcPrice: string;
    rank: number;
    '24hVolume': string;
    price: string;
}