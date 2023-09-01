import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { Props } from '../types/BookingMachine';
import './Passengers.css';

export const Passengers: FC<Props> = ({ state, send }) => {
	const [value, changeValue] = useState('');

	const goToTicket = () => {
		send?.('DONE');
	};

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		changeValue(e.target.value);
	};

	const submit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		send?.({
			type: 'ADD',
			newPassenger: value,
		});
		changeValue('');
	};

	return (
		<form onSubmit={submit} className='Passengers'>
			<p className='Passengers-title title'>
				Agrega a las personas que van a volar ✈️
			</p>
			{state?.context.passengers.map(passenger => (
				<p className='text' key={passenger}>
					{passenger}
				</p>
			))}
			<input
				id='name'
				name='name'
				type='text'
				placeholder='Escribe el nombre completo'
				required
				value={value}
				onChange={onChangeInput}
				autoFocus
				pattern='^[a-zA-Z]+(?:\s[a-zA-Z]+)*$'
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
