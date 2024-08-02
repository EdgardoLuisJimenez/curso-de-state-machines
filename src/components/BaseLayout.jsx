import { useMachine } from "@xstate/react";
import React from "react";
import { BookingMachine } from "../machines/BookingMachine";

const BaseLayout = () => {
    const [state, send] = useMachine(BookingMachine)

    console.log('Nuestra maquina', state)
    console.log('Matches true', state.matches('initial'));
    console.log('Matches false', state.matches('tickets'));
    console.log('can', state.can('FINISH'));
    return (
        <div>Hola</div>
    )
}

export { BaseLayout }