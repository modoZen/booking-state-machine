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
import { Typegen0 } from './bookingMachine.typegen';
import { fetchCountries } from '../utils/api';

export interface BookingContext {
	passengers: string[];
	selectedCountry: string;
	countries: any[];
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

const bookingMachine = createMachine(
	{
		context: {
			passengers: [],
			selectedCountry: '',
			countries: [],
			error: '',
		},
		tsTypes: {} as import('./bookingMachine.typegen').Typegen0,
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
					CANCEL: {
						target: 'initial',
						actions: 'clearState',
					},
				},
				initial: 'loading',
				states: {
					loading: {
						invoke: {
							id: 'getContries',
							src: () => fetchCountries,
							onDone: {
								target: 'success',
								actions: assign({
									countries: (_context, event) => event.data,
								}),
							},
							onError: {
								target: 'failure',
								actions: assign({
									error: 'Fallo el request',
								}),
							},
						},
					},
					success: {},
					failure: {
						on: {
							RETRY: 'loading',
						},
					},
				},
			},
			passengers: {
				on: {
					DONE: {
						target: 'tickets',
						cond: 'moreThanOnePassanger',
					},
					CANCEL: {
						target: 'initial',
						actions: 'clearState',
					},
					ADD: {
						target: 'passengers',
						actions: assign({
							passengers: (context, event) => [
								...context.passengers,
								event.newPassenger,
							],
						}),
					},
				},
			},
			tickets: {
				after: {
					5000: {
						target: 'initial',
						actions: 'clearState',
					},
				},
				on: {
					FINISH: {
						target: 'initial',
						actions: 'clearState',
					},
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
				countries: [],
				error: '',
			}),
			// addPassenger: assign({
			// 	passengers: (context, event) => [
			// 		...context.passengers,
			// 		event.newPassenger,
			// 	],
			// }),
		},
		guards: {
			moreThanOnePassanger: context => context.passengers.length !== 0,
		},
	},
);

export { bookingMachine };
