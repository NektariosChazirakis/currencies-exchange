export interface ServerConvertResponse {
  success: boolean;
  query: {
    from: string,
    to: string,
    amount: number
  },
  info: {
    timestamp: number,
    rate: string
  },
  historical: string,
  date: string,
  result: number
}
