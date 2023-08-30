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
		id: 'buy plane tickets',
		initial: 'initial',
		schema: {
			events: {} as BookingEvent,
			context: {} as BookingContext,
		},
		tsTypes: {} as import('./bookingMachine.typegen').Typegen0,
		context: {
			passengers: [],
			selectedCountry: '',
		},
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
