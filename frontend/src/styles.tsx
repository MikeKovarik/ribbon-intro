import {useState} from 'react'
import styled, {css} from 'styled-components'
import { useQuery } from 'react-query'
import * as mixins from './styleMixins'
 
const apiUrl = 'http://localhost:3001'

interface Currency {
	countryName: string;
	name: string;
	ammount: number;
	code: string;
	value: number;
}

interface ICurrencies {
	currencies: Currency[];
}

interface ICurrencySelectBox extends ICurrencies {
	value: string;
	onChange: (newVal: string) => void
}

const HorizontalLayout = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-evenly;
`

const ConversionCard = styled.div`
	${mixins.Card}
	display: flex;
	position: sticky;
	top: 50vh;
	transform: translate(0px, -50%);
	width: 18vw;
`

const SubTitle = styled.div`
	${mixins.SubTitle}
	margin-top: 1rem;
	margin-bottom: 0.5rem;
	&:first-child {
		margin-top: 0rem;
	}
`

const ResultValue = styled.span`
	font-size: 2rem;
	line-height: 1.75rem;
	font-weight: 300;
`

const ResultCurrency = styled.span`
	font-weight: 400;
	opacity: 0.6;
	text-transform: uppercase;
	margin-left: 0.5rem;
`

const Input = styled.input`
	width: 100%;
	padding: 0.5rem;
	border: 1px solid rgba(var(--theme-fg), 0.2);
	border-radius: 4px;
	box-sizing: border-box;
`;

const Select = styled.select`
	width: 100%;
	padding: 0.5rem;
	border: 1px solid rgba(var(--theme-fg), 0.2);
	border-radius: 4px;
	box-sizing: border-box;
`;

const Table = styled.table`
	margin: 1rem;
	border-collapse: collapse;
	th {
		${mixins.SubTitle}
	}
	th, td {
		text-align: left;
		padding: 0.5rem 1rem;
	}
	tr:not(:last-child) td {
		border-bottom: 1px solid rgba(var(--theme-fg), 0.2);
	}
`;

const roundPrecision = (num: number) => parseFloat(num.toFixed(2))

const resJson = (res: Response) => res.json()
const fetchCurrencies = () => fetch(apiUrl).then(resJson)
const useCurrencies = () => useQuery('currencies', fetchCurrencies)

export default function App(): JSX.Element {
	const {status, error, data} = useCurrencies()
	switch (status) {
		case 'loading':
			return <span>Loading data</span>
		case 'error':
			return <span>`Error: ${(error as Error).message}`</span>
		default:
			return <CurrencyConverterTable currencies={data} />
	}
}

const CurrencyConverterTable = ({currencies}: ICurrencies) => {
	const [czkValue, setCzkValue] = useState(100)
	const [targetCurrency, setTargetCurrency] = useState('usd')

	let targetCurrencyValue = currencies.find(currency => currency.code === targetCurrency)?.value ?? 0
	let convertedValue = roundPrecision(czkValue / targetCurrencyValue)
	return (
		<HorizontalLayout>
			<CurrencyTable currencies={currencies} />
			<ConversionCard>
				<SubTitle>????stka v K??</SubTitle>
				<Input type="number" value={czkValue} onChange={e => setCzkValue(parseFloat(e.target.value))}></Input>
				<SubTitle>C??lov?? m??na</SubTitle>
				<CurrencySelectBox currencies={currencies} value={targetCurrency} onChange={setTargetCurrency}></CurrencySelectBox>
				<SubTitle>V??sledek</SubTitle>
				<div>
					<ResultValue>{convertedValue}</ResultValue>
					<ResultCurrency>{targetCurrency}</ResultCurrency>
				</div>
			</ConversionCard>
		</HorizontalLayout>
	)
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
		<Table>
			<thead>
				<tr>
					<th>Zem??</th>
					<th>M??na</th>
					<th>Mno??stv??</th>
					<th>K??d</th>
					<th>Kurz</th>
				</tr>
			</thead>
			<tbody>
				{currencies.map(item => <tr key={item.code}>
					<td>{item.countryName}</td>
					<td>{item.name}</td>
					<td>{item.ammount}</td>
					<td>{item.code}</td>
					<td>{item.value}</td>
				</tr>)}
			</tbody>
		</Table>
	)
}
