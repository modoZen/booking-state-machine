import { assign, createMachine } from 'xstate';
import { fetchCountries } from '../utils/api';
import { BookingContext, BookingEvent } from '../types/BookingMachine';

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
		},
		guards: {
			moreThanOnePassanger: context => context.passengers.length !== 0,
		},
	},
);

export { bookingMachine };
