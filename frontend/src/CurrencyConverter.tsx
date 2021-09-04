import {useState} from 'react'
import styled from 'styled-components'
import * as mixins from './styleMixins'
import useCurrencies from './useCurrencies'
 

const Card = styled.div`
	${mixins.Card}
	display: flex;
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

export default function CurrencyConverter({className}: {className?: string}): JSX.Element {
	const {data} = useCurrencies()
	const [czkValue, setCzkValue] = useState(100)
	const [targetCurrency, setTargetCurrency] = useState('usd')
	let targetCurrencyValue = data?.find(currency => currency.code === targetCurrency)?.value ?? 0
	let convertedValue = roundPrecision(czkValue / targetCurrencyValue)
	return (
		<Card className={className}>
			<SubTitle>Částka v Kč</SubTitle>
			<Input type="number" value={czkValue} onChange={e => setCzkValue(parseFloat(e.target.value))}></Input>
			<SubTitle>Cílová měna</SubTitle>
			<CurrencySelectBox value={targetCurrency} onChange={setTargetCurrency}></CurrencySelectBox>
			<SubTitle>Výsledek</SubTitle>
			<div>
				<ResultValue>{convertedValue}</ResultValue>
				<ResultCurrency>{targetCurrency}</ResultCurrency>
			</div>
		</Card>
	)
}

interface ICurrencySelectBox {
	value: string;
	onChange: (newVal: string) => void
}

const CurrencySelectBox = ({value, onChange}: ICurrencySelectBox): JSX.Element => {
	const {data} = useCurrencies()
	return (
		<Select value={value} onChange={e => onChange(e.target.value)}>
			{data && data.map(currency => <option value={currency.code} key={currency.code}>{currency.code.toUpperCase()} - {currency.name}</option>)}
		</Select>
	)
}

const roundPrecision = (num: number): number => parseFloat(num.toFixed(2))