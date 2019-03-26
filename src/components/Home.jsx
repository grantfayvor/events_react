import React, { Component } from 'react';
import { Layout, Panel } from 'react-toolbox/lib/layout';
import { hot } from 'react-hot-loader/root';
import TabMenu from './TabMenu';
import Button from 'react-toolbox/lib/button';
import APIService from '../services/ApiService';
import Dragify from '../services/Dragify';
import Spinner from './Spinner';
// import './create.event.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    handleChange (name, value) {
        this.setState({ [name]: value });
    }

    tryAuthentication = () => {
        var urlString = window.location.href,
            url = new URL(urlString),
            code = url.searchParams.get("code");
        var authURL = '/_events/v1/auth/google/callback?';
        url.searchParams.forEach((value, key) => {
            value = value.replace(/\s/g, "+");
            authURL += `${key}=${value}&`;
        });
        authURL = authURL.replace(/\&\s*$/, "");
        if (code) {
            this.setState({ isLoading: true });
            APIService.get(authURL, {}, response => {
                if (!response.data) {
                    throw new Error("An error occurred while trying to log in");
                }
                window.sessionStorage.setItem("token", response.data.token);
                window.history.pushState({}, '', url.origin + url.pathname);
                this.setState({ isLoading: false });
            });
        }
    };

    componentWillMount () {
        this.tryAuthentication();
    }

    componentDidMount () {
        setImmediate(() => {
            Dragify(document.getElementById("draggable"));
        });
    }

    render () {
        return (
            <Layout>
                <Layout>
                    {
                        this.state.isLoading ?
                            <Panel>
                                <Spinner />
                            </Panel> :
                            <Panel>
                                <TabMenu />
                                <Button href="/_events/v1/auth/google" id="draggable" className="profileButton" /* onMouseDown={dragMouseDown} */ icon="add" floating ripple accent mini />
                            </Panel>
                    }
                </Layout>
            </Layout>
        )
    }
}

export default hot(Home);