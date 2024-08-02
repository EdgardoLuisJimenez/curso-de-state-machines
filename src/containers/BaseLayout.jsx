import React from 'react';
import { useMachine } from '@xstate/react';
import { StepsLayout } from './StepsLayout';
import { BookingMachine } from '../machines/BookingMachine'
import './BaseLayout.css';
import { Nav } from '../components/Nav';

const BaseLayout = () => {
    const [state, send] = useMachine(BookingMachine);

    return (
        <div className='BaseLayout'>
            <Nav state={state} send={send} />
            <StepsLayout state={state} send={send} />
        </div>
    );
}

export { BaseLayout }