import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
export class Auth extends Component {
 static displayName = Auth.name;
    constructor(props) {
        super(props);
        this.state = { login: "", password: "" };

        this.Redirect = false;

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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
            .then(response => {
                // Обработка ответа от сервера
                if (response === "yes") { 
                    this.Redirect = true;
                    this.forceUpdate();
                }
            })
            .catch(error => {
                // Обработка ошибок
                console.error(error);
            });
        
    };

    render() {
        if (this.Redirect) {
            return <Navigate to="/" replace={true} />;
        }
        return (
            <div class="login">
             <div class="text-center">
                    <form onSubmit={this.onSubmit}>
                    <label name="Login">Login :</label>               
                    <input type="text" name="login"
                           value={this.state.login}
                            onChange={this.onChange} />
                    <br />
                        

                    <label name="Password">Password :</label>                
                    <input type="password" name="password"
                           value={this.state.password}
                            onChange={this.onChange} />
                    <br />
                
                <input type="submit" value="Log in" />
                </form>
                <br />
                    <Link tag={Link} to="/Regist">Create Account</Link>
             </div>
            </div>
        );
    }
}

