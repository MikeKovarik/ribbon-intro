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
	${mixins.Input}
`;

const Select = styled.select`
	${mixins.Input}
`;

const Button = styled.button`
	${mixins.Input}
	margin-top: 1rem;
	text-transform: uppercase;
	border: none;
	background-color: rgba(var(--theme-fg), 0.7);
	color: rgb(var(--theme-bg));
	&:hover {
		background-color: rgba(var(--theme-fg), 0.5);
	}
	&:active {
		background-color: rgba(var(--theme-fg), 0.6);
	}
`;

export default function CurrencyConverter({className}: {className?: string}): JSX.Element {
	const {data} = useCurrencies()
	const [czkValue, setCzkValue] = useState(100)
	const [targetCurrency, setTargetCurrency] = useState('usd')
	const [convertedValue, setConvertedValue] = useState(0)
	let targetCurrencyValue = data?.find(currency => currency.code === targetCurrency)?.value ?? 0
	const convert = () => setConvertedValue(roundPrecision(czkValue / targetCurrencyValue))
	const onCurrencyChange = (code: string) => {
		setTargetCurrency(code)
		setConvertedValue(0)
	}
	return (
		<Card className={className}>
			<SubTitle>Částka v Kč</SubTitle>
			<Input type="number" value={czkValue} onChange={e => setCzkValue(parseFloat(e.target.value))}></Input>
			<SubTitle>Cílová měna</SubTitle>
			<CurrencySelectBox value={targetCurrency} onChange={onCurrencyChange}></CurrencySelectBox>
			<Button onClick={convert}>Převést</Button>
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