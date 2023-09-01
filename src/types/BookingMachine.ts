import { Event, EventData, SingleOrArray, StateFrom } from 'xstate';
import { Country } from './Country';
import { bookingMachine } from '../machines/bookingMachine';

export interface BookingContext {
	passengers: string[];
	selectedCountry: string;
	countries: Country[];
	error: string;
}

export type BookingEvent =
	| { type: 'START' }
	| { type: 'CONTINUE'; selectedCountry: string }
	| { type: 'ADD'; newPassenger: string }
	| { type: 'DONE' }
	| { type: 'FINISH' }
	| { type: 'RETRY' }
	| { type: 'CANCEL' };

export interface Props {
	state?: StateFrom<typeof bookingMachine>;
	send?: (
		event: SingleOrArray<Event<BookingEvent>>,
		payload?: EventData,
	) => void;
}
