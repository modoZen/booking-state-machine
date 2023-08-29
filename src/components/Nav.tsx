import { FC } from 'react';
import { Props } from '../machines/bookingMachine';
import './Nav.css';

export const Nav: FC<Props> = ({ state, send }) => {
	const goToWelcome = () => {
		send?.('CANCEL');
	};

	return (
		<nav className='Nav'>
			<h1 className='Nav-logo'>Book a fly ✈</h1>
			{!state?.matches('initial') && (
				<button onClick={goToWelcome} className='Nav-cancel button-secondary'>
					Cancelar
				</button>
			)}
		</nav>
	);
};