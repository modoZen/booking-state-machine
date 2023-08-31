/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	BaseActionObject,
	Event,
	EventData,
	ResolveTypegenMeta,
	SCXML,
	ServiceMap,
	SingleOrArray,
	State,
	assign,
	createMachine,
} from 'xstate';
import { Typegen0 } from './ejemploJerarquia.typegen';

export interface BookingContext {
	passengers: string[];
	selectedCountry: string;
}

export type BookingEvent =
	| { type: 'START' }
	| { type: 'CONTINUE'; selectedCountry: string }
	| { type: 'ADD'; newPassenger: string }
	| { type: 'DONE' }
	| { type: 'FINISH' }
	| { type: 'CANCEL' }
	| { type: 'ERROR' }
	| { type: 'RETRY' };

export interface Props {
	state?: State<
		BookingContext,
		BookingEvent,
		any,
		{
			value: any;
			context: BookingContext;
		},
		ResolveTypegenMeta<Typegen0, BookingEvent, BaseActionObject, ServiceMap>
	>;
	send?: (
		event: SCXML.Event<BookingEvent> | SingleOrArray<Event<BookingEvent>>,
		payload?: EventData | undefined,
	) => Props['state'];
	context?: BookingContext;
}

const fillContries = {
	initial: 'loading',
	states: {
		loading: {
			on: {
				DONE: 'success',
				ERROR: 'failure',
			},
		},
		success: {},
		failure: {
			on: {
				RETRY: 'loading',
			},
		},
	},
};

const bookingMachine = createMachine(
	{
		context: {
			passengers: [],
			selectedCountry: '',
		},
		tsTypes: {} as import('./ejemploJerarquia.typegen').Typegen0,
		schema: {
			events: {} as BookingEvent,
			context: {} as BookingContext,
		},
		initial: 'initial',
		id: 'buy plane tickets',
		states: {
			initial: {
				on: {
					START: {
						target: 'search',
					},
				},
			},
			search: {
				on: {
					CONTINUE: {
						target: 'passengers',
						actions: assign({
							selectedCountry: (_context, event) => event.selectedCountry,
						}),
					},
					CANCEL: 'initial',
				},
				...fillContries,
			},
			passengers: {
				on: {
					DONE: 'tickets',
					CANCEL: {
						target: 'initial',
						actions: 'clearState',
					},
					ADD: {
						target: 'passengers',
						actions: (context, event) =>
							context.passengers.push(event.newPassenger),
					},
				},
			},
			tickets: {
				on: {
					FINISH: 'initial',
				},
			},
		},
		predictableActionArguments: true,
	},
	{
		actions: {
			clearState: assign({
				passengers: [],
				selectedCountry: '',
			}),
			// addPassenger: assign({
			// 	passengers: (context, event) => [
			// 		...context.passengers,
			// 		event.newPassenger,
			// 	],
			// }),
		},
	},
);

export { bookingMachine };
