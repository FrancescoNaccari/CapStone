export interface TimeSeries {
    meta: TimeSeriesData;
    values: TimeSeriesValue[];
}

export interface TimeSeriesData {
    symbol: string;
    interval:string;
    currency:string;
    exchange_timezone:string;
    exchange:string;
    mic_code:string;
    type:string;
}

export interface TimeSeriesValue {
    datetime: string;
    open:number;
    high:number;
    low:number;
    close:number;
    volume:number;
}