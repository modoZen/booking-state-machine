import { FC } from 'react';
import { Props } from '../machines/bookingMachine';
import './Tickets.css';

export const Tickets: FC<Props> = ({ send, state }) => {
	const finish = () => {
		send?.('FINISH');
	};

	const { context } = state!;

	return (
		<div className='Tickets'>
			<p className='Tickets-description description'>
				Gracias por volar con book a fly 💚
			</p>
			<div className='Tickets-ticket'>
				<div className='Tickets-country'>{context.selectedCountry}</div>
				<div className='Tickets-passengers'>
					<span>✈</span>
					{context.passengers.map(passenger => (
						<p key={passenger}>{passenger}</p>
					))}
				</div>
			</div>
			<button onClick={finish} className='Tickets-finalizar button'>
				Finalizar
			</button>
		</div>
	);
};
