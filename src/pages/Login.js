import React, { Component } from 'react';

import '../pages/Login.css';
import twitterLogo from '../twitter.svg';

export default class Login extends Component {
    state = {
        username: ""
    }

    handleInputChange = e => {
        this.setState({ username: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        const { username } = this.state;

        if (!username.length) return;

        localStorage.setItem('username', username);
        console.log(this.props);
        this.props.history.push('/tweets');
    }

    render() {
        return (
            <div className="login-wrapper">
                <img src={twitterLogo} />
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Nome"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                    />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        );
    }
}
