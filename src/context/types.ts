export interface Currency {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply?: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24Hr: string;
}

export interface History {
    priceUsd: string;
    time: number;
    date: string;
}

export interface HisoryResponse {
    data: History[];
    timestamp: number;
}
