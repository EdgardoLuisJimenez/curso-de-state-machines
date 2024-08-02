import { useMachine } from "@xstate/react";
import React from "react";
import { BookingMachine } from "../machines/BookingMachine";

const BaseLayout = () => {
    const [state, send] = useMachine(BookingMachine)

    console.log('Nuestra maquina', state)
    return (
        <div>Hola</div>
    )
}

export { BaseLayout }