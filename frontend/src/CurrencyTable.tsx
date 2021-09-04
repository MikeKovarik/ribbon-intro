import styled from 'styled-components'
import * as mixins from './styleMixins'
import useCurrencies from './useCurrencies'
 

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

const UppercaseTd = styled.td`
	text-transform: uppercase;
`;


export default function CurrencyTable(): JSX.Element {
	const {data} = useCurrencies()
	return (
		<Table>
			<thead>
				<tr>
					<th>Země</th>
					<th>Měna</th>
					<th>Množství</th>
					<th>Kód</th>
					<th>Kurz</th>
				</tr>
			</thead>
			<tbody>
				{data && data.map(item => <tr key={item.code}>
					<td>{item.countryName}</td>
					<td>{item.name}</td>
					<td>{item.ammount}</td>
					<UppercaseTd>{item.code}</UppercaseTd>
					<td>{item.value}</td>
				</tr>)}
			</tbody>
		</Table>
	)
}
