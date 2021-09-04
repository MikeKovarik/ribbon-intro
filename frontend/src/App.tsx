import {useState} from 'react';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
 
const queryClient = new QueryClient()
const apiUrl = 'http://localhost:3001'

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<CurrencyConverter />
		</QueryClientProvider>
	)
}

interface Currency {
	countryName: string;
	name: string;
	ammount: number;
	code: string;
	value: number;
}

/*
const Row = ({ className, children }) => (
  <a className={className}>
    {children}
  </a>
)
*/

//const StyledRow = styled(Row)`
const StyledRow = styled.tr`
`

const HorizontalLayout = styled.div`
	display: flex;
`

const ConversionCard = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
	border-radius: 8px;
	box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.4);
`

const Input = styled.input`
	width: 120px;
	padding: 0.5em;
	margin: 0.5em;
	background: #EEE;
	border: 1px solid #DDD;
	border-radius: 4px;
`;

const Select = styled.select`
	width: 120px;
	padding: 0.5em;
	margin: 0.5em;
	background: #EEE;
	border: 1px solid #DDD;
	border-radius: 4px;
`;

function roundPrecision(num: number) {
	return parseFloat(num.toFixed(2))
}

const CurrencyConverter = (): JSX.Element => {
	const { isLoading, error, data } = useQuery('currencies', () => fetch(apiUrl).then(res => res.json()))
	const currencies: Currency[] = data ?? []
	const [czkValue, setCzkValue] = useState(100)
	const [targetCurrency, setTargetCurrency] = useState('usd')

	if (isLoading) return <>Loading...</>
	if (error) return <>An error has occurred: {(error as Error).message}</>

	let targetCurrencyValue = currencies.find(currency => currency.code === targetCurrency)?.value ?? 0
	let convertedValue = roundPrecision(czkValue / targetCurrencyValue)
    console.log('~ czkValue', czkValue)
    console.log('~ targetCurrencyValue', targetCurrencyValue)
    console.log('~ convertedValue', convertedValue)

	return (
		<HorizontalLayout>
			<CurrencyTable currencies={currencies} />
			<ConversionCard>
				<div>
					<span>Částka v Kč</span>
					<Input type="number" value={czkValue} onChange={e => setCzkValue(parseFloat(e.target.value))}></Input> CZK
				</div>
				<div>
					<span>Částka v K4</span>
					<CurrencySelectBox currencies={currencies} value={targetCurrency} onChange={setTargetCurrency}></CurrencySelectBox>
				</div>
				<div>
					<span>Výsledek</span>
					result: {convertedValue}
				</div>
			</ConversionCard>
		</HorizontalLayout>
	)
}

interface ICurrencies {
	currencies: Currency[];
}

interface ICurrencySelectBox extends ICurrencies {
	value: string;
	onChange: (newVal: string) => void
}

const CurrencySelectBox = ({currencies, value, onChange}: ICurrencySelectBox) => {
	return (
		<Select value={value} onChange={e => onChange(e.target.value)}>
			{currencies.map(currency => <option value={currency.code} key={currency.code}>{currency.code.toUpperCase()} - {currency.name}</option>)}
		</Select>
	)
}

const CurrencyTable = ({currencies}: ICurrencies) => {
	return (
		<div className="App">
			<table>
				<tbody>
					{currencies.map(item => <StyledRow key={item.code}>
						<td>{item.countryName}</td>
						<td>{item.name}</td>
						<td>{item.code}</td>
						<td>{item.value}</td>
					</StyledRow>)}
				</tbody>
			</table>
		</div>
	)
}
