import React, { Component} from 'react';
import { Navigate } from 'react-router-dom';
export class Pr extends Component {
 static displayName = Pr.name;
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            Description: "",
            IDofEmployer: Number
        };

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
        fetch('Project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(response => {
                alert(response);
                if (response === "Was created new project") {
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
      return  (
            <div className="Project" align="center">
              <div className="text-center">
                  <form onSubmit={this.onSubmit}>

                         <label name="Name">Name :</label>
                         <input type="text" name="name"
                             value={this.state.name}
                             onChange={this.onChange} />
                         <br />

                      <label name="Description">Description :</label>
                      <input type="textarea" name="Description"
                          value={this.state.Description}
                             onChange={this.onChange} />
                      <br />
                
                <button type="submit">Create Project</button>
              </form>
             <br />

             </div>
            </div>
        );
    }
}

