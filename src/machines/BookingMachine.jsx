import { createMachine } from "xstate";

const BookingMachine = createMachine({
    id: 'Buy plane tickets',
    initial: 'initial',
    states: {
        initial: {
            on: {
                START: 'search'
            },
        },
        search: {
            CONTINUE: 'passengers',
            CANCEL: 'initial',
        },
        tickets: {
            on: {
                FINISH: 'initial',
            },
        },
        passengers: {
            on: {
                DONE: 'tickets',
                DONE: 'tickets',
                CANCEL: 'initial',
            },
        },
    },
})

export { BookingMachine }