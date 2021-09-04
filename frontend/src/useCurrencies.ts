import { useQuery } from 'react-query'
 

export interface ICurrency {
	countryName: string;
	name: string;
	ammount: number;
	code: string;
	value: number;
}

const apiUrl = 'http://localhost:3001'

const resJson = (res: Response) => res.json()
const fetchCurrencies = () => fetch(apiUrl).then(resJson)
const useCurrencies = () => useQuery<ICurrency[], Error>('currencies', fetchCurrencies)

export default useCurrencies
