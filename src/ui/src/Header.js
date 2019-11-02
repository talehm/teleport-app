import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect, Link } from "react-router-dom";
import Login from "./Login";
import AuthStore from "./AuthStore";
import Home from "./Home";
import CreateAccount from "./CreateAccount";
import axios from "axios/index";
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
    createAccount = (event) => {
        event.preventDefault();
        this.props.history.push("/create");
    };
    render() {
        const logout = <button className="link-button nav-link" onClick={this.props.logout}> Logout</button>;

        return (
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">Teleport</div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item active">
                            <button className="link-button" onClick={this.createAccount}>Create new user</button>
                            {AuthStore.isLoggedIn() && logout}
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(App);
