
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "xstate.after(5000)#buy plane tickets.tickets": { type: "xstate.after(5000)#buy plane tickets.tickets" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "clearState": "CANCEL" | "FINISH" | "xstate.after(5000)#buy plane tickets.tickets";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "moreThanOnePassanger": "DONE";
        };
        eventsCausingServices: {
          "getContries": "RETRY" | "START";
        };
        matchesStates: "initial" | "passengers" | "search" | "search.failure" | "search.loading" | "search.success" | "tickets" | { "search"?: "failure" | "loading" | "success"; };
        tags: never;
      }
  