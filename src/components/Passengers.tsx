import { FC, useState } from 'react';
import { Props } from '../machines/bookingMachine';
import './Passengers.css';

export const Passengers: FC<Props> = ({ state, send }) => {
	const [value, changeValue] = useState('');

	const goToTicket = () => {
		send?.('DONE');
	};

	const onChangeInput = e => {
		changeValue(e.target.value);
	};

	const submit = e => {
		e.preventDefault();
		changeValue('');
	};

	return (
		<form onSubmit={submit} className='Passengers'>
			<p className='Passengers-title title'>
				Agrega a las personas que van a volar ✈️
			</p>
			<input
				id='name'
				name='name'
				type='text'
				placeholder='Escribe el nombre completo'
				required
				value={value}
				onChange={onChangeInput}
			/>
			<div className='Passengers-buttons'>
				<button className='Passengers-add button-secondary' type='submit'>
					Agregar Pasajero
				</button>
				<button
					onClick={goToTicket}
					className='Passenger-pay button'
					type='button'
				>
					Ver mi ticket
				</button>
			</div>
		</form>
	);
};
