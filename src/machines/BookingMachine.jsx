import { assign, createMachine, log } from "xstate";

const BookingMachine = createMachine({
    id: 'Buy plane tickets',
    initial: 'initial',
    context: {
        passengers: [],
        selectedCountry: ''
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
        },
        tickets: {
            on: {
                FINISH: 'initial',
            },
        },
        passengers: {
            on: {
                DONE: 'tickets',
                CANCEL: 'initial',
                ADD: {
                    target: 'passengers',
                    actions: assign(
                        ({context, event}) => context.passengers.push(event.newPassenger)
                    )
                }
            },
        },
    },
},
    {
        actions: {
            imprimirInicio: () => console.log('Imprimir Inicio'),
            imprimirEntrada: () => console.log('Imprimir entrada a search'),
            imprimirSalida: () => console.log('Imprimir salida del search')
        }
    }
)

export { BookingMachine }