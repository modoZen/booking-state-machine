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
	createMachine,
} from 'xstate';
import { Typegen0 } from './bookingMachine.typegen';

export interface BookingContext {}

export type BookingEvent =
	| { type: 'START' }
	| { type: 'CONTINUE' }
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

const bookingMachine = createMachine({
	id: 'buy plane tickets',
	initial: 'initial',
	schema: {
		events: {} as BookingEvent,
		context: {} as BookingContext,
	},
	tsTypes: {} as import('./bookingMachine.typegen').Typegen0,
	states: {
		initial: {
			on: {
				START: 'search',
			},
		},
		search: {
			on: {
				CONTINUE: 'passengers',
				CANCEL: 'initial',
			},
		},
		passengers: {
			on: {
				DONE: 'tickets',
				CANCEL: 'initial',
			},
		},
		tickets: {
			on: {
				FINISH: 'initial',
			},
		},
	},
	predictableActionArguments: true,
});

export { bookingMachine };
