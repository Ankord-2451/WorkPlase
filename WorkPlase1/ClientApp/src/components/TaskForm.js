import React, { Component} from 'react';
import { Navigate } from 'react-router-dom';
export class Task extends Component {
 static displayName = Task.name;
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            Description: "",
            deadline:Date,
            IDofWorker: Number,
            IDofProject: Number
        };

        this.Redirect = false;

        this.data = [];

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
       this.Workers();
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        // Отправка данных формы на сервер
        fetch('Task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(response => {
                alert(response);
                if (response === "Was created new Task") {
                    this.Redirect = true;
                    this.forceUpdate();
                }
            })
            .catch(error => {
                // Обработка ошибок
                console.error(error);
            });
    };

    Workers(e) {
        fetch('Worker', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(response => {
                this.data = response;  
                this.forceUpdate();
            })
            .catch(error => {
                // Обработка ошибок
                console.error(error);
            });
    }

    render() {
        if (this.Redirect) {
            return <Navigate to="/" replace={true} />;
        }
      return  (
            <div align="center">
              <div class="text-center">
                  <form onSubmit={this.onSubmit} style={this.WForm}>

                         <label name="Name">Name :</label>
                         <input type="text" name="name"
                             value={this.state.name}
                             onChange={this.onChange} />
                         <br />

                      <label name="Description">Description :</label>
                      <input type="text" name="Description"
                          value={this.state.Description}
                             onChange={this.onChange} />
                      <br />  
                      
                     <label name="deadline">deadline :  </label>
                      <input type="datetime-local" name="deadline"
                          value={this.state.deadline}
                          onChange={this.onChange} />
                      <br />

                      <label name="IDofWorker">IDofWorker :  </label>
                      <select name="IDofWorker"
                          value={this.state.IDofWorker}
                         onChange={this.onChange}>
                         {this.data.map(item=>
                           <option value={item.Id}>{item.Name}</option>
                         )}
                      </select>
                      <br />

                      
                
                <button type="submit">Create Task</button>
              </form>
             <br />

             </div>
            </div>
        );
    }
}

