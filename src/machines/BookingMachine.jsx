import { assign, createMachine, fromPromise } from "xstate";
import { fetchCountries } from "../utils/api";

const fillCountries = {
    initial: 'loading',
    states: {
        loading: {
            invoke: {
                id: 'getCountries',
                src: fromPromise(() => fetchCountries()),
                onDone: {
                    target: 'success',
                    actions: assign({
                        countries: ({ event }) => event.output
                    }),
                },
                onError: {
                    target: 'failure',
                    actions: assign({
                        error: 'Fallo al request'
                    })
                }
            }
        },
        success: {},
        failure: {
            on: {
                RETRY: { target: 'loading' }
            }
        }
    }
}

const BookingMachine = createMachine({
    id: 'Buy plane tickets',
    initial: 'initial',
    context: {
        passengers: [],
        selectedCountry: '',
        countries: [],
        error: '',
    },
    states: {
        initial: {
            on: {
                START: {
                    target: 'search',
                }
            },
        },
        search: {
            on: {
                CONTINUE: {
                    target: 'passengers',
                    actions: assign({
                        selectedCountry: ({ event }) => event.selectedCountry
                    })
                },
                CANCEL: 'initial',
            },
            ...fillCountries
        },
        tickets: {
            after: {
                5000: {
                    target: 'initial',
                    actions: 'cleancontext',
                },
            },
            on: {
                FINISH: 'initial',
            },
        },
        passengers: {
            on: {
                DONE: 'tickets',
                CANCEL: {
                    target: 'initial',
                    actions: 'cleancontext',
                },
                ADD: {
                    target: 'passengers',
                    actions: assign(
                        ({ context, event }) => context.passengers.push(event.newPassenger)
                    )
                }
            },
        },
    },
},
    {
        actions: {
            cleancontext: assign({
                selectedCountry: '',
                passengers: [],
            })
        }
    }
)

export { BookingMachine }