import React from 'react';
import './StepsLayout.css';
import { Welcome } from '../components/Welcome';
import { Search } from '../components/Search';
import { Tickets } from '../components/Tickets';
import { Passengers } from '../components/Passengers';

export const StepsLayout = ({ state, send }) => {
    const renderContent = () => {
        if (state.matches('initial')) return <Welcome send={send} />;
        if (state.matches('search')) return <Search state={state} send={send} />;
        if (state.matches('tickets')) return <Tickets send={send} />;
        if (state.matches('passengers')) return <Passengers send={send} />;
        return null;
    };

    return (
        <div className='StepsLayout'>
            {renderContent()}
        </div>
    );
}; 