import { FC, ChangeEvent, useState } from 'react';
import { Props } from '../machines/bookingMachine';
import './Search.css';

export const Search: FC<Props> = ({ send }) => {
	const [flight, setFlight] = useState('');

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setFlight(event.target.value);
	};

	const goToPassengers = () => {
		send?.({ type: 'CONTINUE', selectedCountry: flight });
	};

	const options = ['Perú', 'Mexico', 'Venezuela', 'Colombia'];

	return (
		<div className='Search'>
			<p className='Search-title title'>Busca tu destino</p>
			<select
				id='country'
				className='Search-select'
				value={flight}
				onChange={handleSelectChange}
			>
				<option value='' disabled>
					Escoge un país
				</option>
				{options.map(option => (
					<option value={option} key={option}>
						{option}
					</option>
				))}
			</select>
			<button
				onClick={goToPassengers}
				disabled={flight === ''}
				className='Search-continue button'
			>
				Continuar
			</button>
		</div>
	);
};
