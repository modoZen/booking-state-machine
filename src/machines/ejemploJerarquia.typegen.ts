// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
	'@@xstate/typegen': true;
	internalEvents: {
		'xstate.init': { type: 'xstate.init' };
	};
	invokeSrcNameMap: {};
	missingImplementations: {
		actions: never;
		delays: never;
		guards: never;
		services: never;
	};
	eventsCausingActions: {
		clearState: 'CANCEL';
	};
	eventsCausingDelays: {};
	eventsCausingGuards: {};
	eventsCausingServices: {};
	matchesStates:
		| 'initial'
		| 'passengers'
		| 'search'
		| 'search.failure'
		| 'search.loading'
		| 'search.success'
		| 'tickets'
		| { search?: 'failure' | 'loading' | 'success' };
	tags: never;
}
