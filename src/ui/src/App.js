import React, { Component } from 'react';
import { Route, Switch, Redirect, Link } from "react-router-dom";
import Login from "./Login";
import AuthStore from "./AuthStore";
import Home from "./Home";
import CreateAccount from "./CreateAccount";
import axios from "axios/index";
import Header from './Header'

class App extends Component {

    logout = (event) => {
        event.preventDefault();
        AuthStore.removeToken();
        this.setState({});
    };

    componentWillMount() {
        axios.defaults.timeout = 10000;
        axios.defaults.headers.common['Authorization'] = `Bearer ${AuthStore.getToken()}`;
    }


    render() {
        function PrivateRoute({ component: Component, ...rest }) {
            return (
                <Route
                    {...rest}
                    render={(props) => AuthStore.isLoggedIn()
                        ? <Component {...props} />
                        : <Redirect to={{ pathname: '/login' }} />} />
            );
        }


        return (
            <div className='h-100'>
                <Header logout={this.logout} />
                <div className='h-100'>

                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/create" component={CreateAccount} />
                        <PrivateRoute path="/" component={Home} />
                    </Switch>

                </div>
            </div>
        );
    }
}

export default App;
