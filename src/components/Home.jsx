import React, { Component, Suspense } from 'react';
import { Layout, Panel } from 'react-toolbox/lib/layout';
import { Input } from 'react-toolbox/lib/input';
import { hot } from 'react-hot-loader/root';
import TabMenu from './TabMenu';

const AppBar = React.lazy(() => import('./AppBar'));

class Home extends Component {

    handleChange (name, value) {
        this.setState({ [name]: value });
    };

    render () {
        return (
            <Layout>
                {/* <Layout>
                    <Panel>
                        <Suspense fallback={<div>Loading...</div>}>
                            <AppBar />
                        </Suspense>
                    </Panel>
                </Layout> */}
                <Layout>
                    <Panel>
                        <TabMenu />
                    </Panel>
                </Layout>
            </Layout>
        )
    }
}

export default hot(Home);