import styled from 'styled-components'
import useCurrencies from './useCurrencies'
import CurrencyTable from './CurrencyTable'
import CurrencyConverter from './CurrencyConverter'
 

const HorizontalLayout = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-evenly;
`

const AlignedCurrencyConverter = styled(CurrencyConverter)`
	position: sticky;
	top: 50vh;
	transform: translate(0px, -50%);
	width: 18vw;
`

export default function App(): JSX.Element {
	const {status, error} = useCurrencies()
	switch (status) {
		case 'loading':
			return <span>Loading data</span>
		case 'error':
			return <span>`Error: ${(error as Error).message}`</span>
		default:
			return (
				<HorizontalLayout>
					<CurrencyTable />
					<AlignedCurrencyConverter />
				</HorizontalLayout>
			)
	}
}