import { FC } from 'react';
import { Welcome } from '../components/Welcome';
import { Search } from '../components/Search';
import { Passengers } from '../components/Passengers';
import { Tickets } from '../components/Tickets';
import { Props } from '../machines/bookingMachine';
import './StepsLayout.css';

export const StepsLayout: FC<Props> = ({ state, send }) => {
	const renderContent = () => {
		if (state?.matches('initial')) return <Welcome send={send} />;
		if (state?.matches('search')) return <Search send={send} />;
		if (state?.matches('passengers'))
			return <Passengers state={state} send={send} />;
		if (state?.matches('tickets')) return <Tickets send={send} />;
	};

	return <div className='StepsLayout'>{renderContent()}</div>;
};
