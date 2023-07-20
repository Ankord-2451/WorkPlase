import React, { Component} from 'react';
import { Navigate } from 'react-router-dom';
export class Regist extends Component {
 static displayName = Regist.name;
    constructor(props) {
        super(props);
        this.state = {
            role: 0|1,
            login: "",
            password: "",
            name: "",
            email: "",
            profession: "",
            IDofEmployer: Number
        };

        this.image = "Img\\blue.png";

        this.Worker = { height: '0px' };
        this.WForm = {};

        this.Redirect = false;

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.RoleBtn = this.RoleBtn.bind(this);
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
                alert(response);
                if (response === "Was created new account") {
                    this.Redirect = true;
                    this.forceUpdate();
                }
            })
            .catch(error => {
                // Обработка ошибок
                console.error(error);
            });
    };

    RoleBtn() {
        if (this.image === "Img\\red.png") {

            this.image = "Img\\blue.png";
            this.Worker = { height: '0px' };
            this.WForm = { background: 'lightskyblue' };
            this.setState({ role: 1 });
        }
        else {
            this.image = "Img\\red.png";
            this.Worker = { height: '103px' };
            this.WForm = { background: 'firebrick' };
            this.setState({ role: 0 });
        }   
        this.forceUpdate();
    }

    render() {
        if (this.Redirect) {
            return <Navigate to="/" replace={true} />;
        }
      return  (
            <div className="Regist" align="center">
              <div className="text-center">
                  <button className="Role" onClick={this.RoleBtn}><img src={this.image} alt="GOD" width="200px" height="200px"/></button>
                  <form onSubmit={this.onSubmit} style={this.WForm}>

                         <label name="Name">Name :</label>
                         <input type="text" name="name"
                             value={this.state.name}
                             onChange={this.onChange} />
                         <br />

                         <label name="Profession">Profession :</label>
                      <input type="text" name="profession"
                             value={this.state.profession}
                             onChange={this.onChange} />
                      <br />

                      <label name="Email">Email :</label>
                      <input type="email" name="email"
                          value={this.state.email}
                          onChange={this.onChange} />
                      <br />
                      <div className="worker" style={this.Worker}>
                          <label name="IDofEmployer">IDofEmployer :  </label>
                          <input type="number" name="IDofEmployer"
                              value={this.state.IDofEmployer}
                              onChange={this.onChange} />
                          <br />
                      </div>
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
                
                <button type="submit">Create Account</button>
              </form>
             <br />

             </div>
            </div>
        );
    }
}

