import {css} from 'styled-components'

export const Card = css`
	flex-direction: column;
	padding: 1rem;
	border-radius: 8px;
	box-shadow: 0px 6px 25px rgba(0, 0, 0, 0.3);
`

export const SubTitle = css`
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 600;
	opacity: 0.6;
`

export const Input = css`
	outline: none;
	width: 100%;
	padding: 0.5rem;
	border-radius: 4px;
	box-sizing: border-box;
	border: 1px solid rgba(var(--theme-fg), 0.2);
	&:hover {
		border-color: rgba(var(--theme-fg), 0.3);
	}
	&:focus,
	&:active {
		border-color: rgba(var(--theme-fg), 0.4);
	}
`;