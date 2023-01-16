export interface Currency {
    name: string;
    fa_name: string;
    logo: string;
    accent_color: string;
    symbol: string;
    price: number;
    toman_amount: number;
    min_usdt_value?: any;
    min_usdt_amount: number;
    max_usdt_amount: number;
    min_value?: any;
    max_amount: string;
    min_irr_amount: number;
    max_irr_amount: number;
    priority: number;
    price_round_digit: number;
    amount_round_digit: number;
}
export interface Data {
    currencies: Currency[];
}
export interface PriceResponseDto {
    data: Data;
    status: number;
}
