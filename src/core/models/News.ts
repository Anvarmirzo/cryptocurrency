export interface INewsResponse {
    _type: string;
    webSearchUrl: string;
    value: INews[];
}

export interface INews {
    _type: string;
    name: string;
    url: string;
    image: INewsImage;
    description: string;
    provider: INewsProvider[];
    datePublished: string;
}

export interface INewsImage {
    _type: string;
    thumbnail: {
        _type: string;
        contentUrl: string;
        width: number;
        height: number;
    }
    isLicensed: boolean;
}

export interface INewsProvider {
    _type: string;
    name: string;
    image: INewsImage;
}