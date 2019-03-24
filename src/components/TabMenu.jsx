import React, { useState, Suspense } from 'react';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import Spinner from './Spinner';

const CreateEvent = React.lazy(() => import('./CreateEvent'));

const TabMenu = props => {
    const [index, setIndex] = useState(0);
    return (
        <Tabs index={index} onChange={index => setIndex(index)} fixed>
            <Tab label='Create Event'>
                <Suspense fallback={<Spinner />}>
                    <CreateEvent />
                </Suspense>
            </Tab>
            <Tab label='Join Event'>
                <small>This should be the place for joining events</small>
            </Tab>
            <Tab label='View Calendar'>
                <small>This should be the place for viewing my calendar</small>
            </Tab>
        </Tabs>
    )
};

export default TabMenu;