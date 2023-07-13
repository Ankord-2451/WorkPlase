import React, { Component } from 'react';

export class Regist extends Component {
 static displayName = Regist.name;
    constructor(props) {
        super(props);
        this.state = { login: "", password: "" };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.Emploer = this.Emploer.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        // Отправка данных формы на сервер
        fetch('Registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(response => {
                // Обработка ответа от сервера
                console.log(response);
            })
            .catch(error => {
                // Обработка ошибок
                console.error(error);
            });
    };
    Emploer() {
         return (
            <div class="login">
             <div class="text-center">
              <form onSubmit={this.onSubmit}>

                         <label name="Name">Name :</label>
                         <input type="text"
                             value={this.state.name}
                             onChange={this.onChange} />
                         <br />

                         <label name="Profession">Profession :</label>
                         <input type="text"
                             value={this.state.profession}
                             onChange={this.onChange} />
                         <br />

                         <label name="Login">Login :</label>
                         <input type="text"
                             value={this.state.login}
                             onChange={this.onChange} />
                         <br />
            

               <label name="Password">Password :</label>                
                <input type="password"
                       value={this.state.password}
                       onChange={this.onChange} />
               <br />
                
                <button type="submit" value="Create Account" />
              </form>
             <br />

             </div>
            </div>
        );
    }

    Worker() {
        return (<div class="login">
            <div class="text-center">
                <form onSubmit={this.onSubmit}>

                    <label name="Login">Login :</label>
                    <input type="text"
                        value={this.state.login}
                        onChange={this.onChange} />
                    <br />


                    <label name="Password">Password :</label>
                    <input type="password"
                        value={this.state.password}
                        onChange={this.onChange} />
                    <br />

                    <button type="submit" value="Create Account" />
                </form>
                <br />

            </div>
        </div>);
    }

    render() {
      return this.Emploer
    }
}

