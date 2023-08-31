import { FC, ChangeEvent, useState } from 'react';
import { Props } from '../machines/bookingMachine';
import './Search.css';

export const Search: FC<Props> = ({ state, send }) => {
	const [flight, setFlight] = useState('');

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setFlight(event.target.value);
	};

	const goToPassengers = () => {
		send?.({ type: 'CONTINUE', selectedCountry: flight });
	};

	const options = state?.context.countries.map(country => country.name);

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
				{options?.map(option => (
					<option value={option.common} key={option.official}>
						{option.common}
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
