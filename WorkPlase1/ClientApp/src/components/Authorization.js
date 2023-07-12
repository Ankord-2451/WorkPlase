import React, { Component } from 'react';

export class Auth extends Component {
 static displayName = Auth.name;
    constructor(props) {
        super(props);
        this.state = { login: "", password: "" };

        this.onSubmit = this.onSubmit.bind(this);
        this.onloginChange = this.onloginChange.bind(this);
        this.onpasswordChange = this.onpasswordChange.bind(this);
    }

    onloginChange(e) {
        this.setState({ login: e.target.value });
    }
    onpasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        // Отправка данных формы на сервер
        fetch('Authorization', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(data => {
                // Обработка ответа от сервера
                console.log(data);
            })
            .catch(error => {
                // Обработка ошибок
                console.error(error);
            });
    };

    render() {
        return (
            <div class="login">
             <div class="text-center">
                    <form onSubmit={this.onSubmit}>
                        <label name="Login">Login :</label>
                <p>
                    <input type="text"
                        value={this.state.login}
                                onChange={this.onloginChange} />
                         <br />
                        </p>

                        <label name="Password">Password :</label>
                <p>
                    <input type="password"
                        value={this.state.password}
                                onChange={this.onpasswordChange} />
                            <br />
                </p>
                <input type="submit" value="Log in" />
                </form>
                <br />
                <button>Create Account</button>
             </div>
            </div>
        );
    }
}

