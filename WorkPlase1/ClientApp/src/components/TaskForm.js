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
            IDofProject: Number,
            Comment:""
        };

        this.Redirect = false;

        this.workers = [];
        this.selectedItem = '';
        this.fetchData();

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        // ќтправка данных формы на сервер
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
                // ќбработка ошибок
                console.error(error);
            });
    };

    fetchData() {
        // ¬ыполните запрос на сервер дл€ получени€ данных
        // «десь используетс€ fetch дл€ примера, но вы можете использовать любую библиотеку AJAX или Axios дл€ запросов к серверу
        fetch('Worker')
            .then((response) => response.json())
            .then((data) => {
                this.workers = data; // —охран€ем данные в переменную класса
                this.forceUpdate(); // ѕринудительно обновл€ем компонент дл€ отображени€ данных
            })
            .catch((error) => console.error(error));
    }

    handleSelectChange = (e) => {
        this.selectedItem = e.target.value;
        this.setState({ IDofWorker: e.target.value });
    };

    render() {
        if (this.Redirect) {
            return <Navigate to="/" replace={true} />;
        }
      return  (
          <div className="TaskF">
              <div className="text-center">
                  <form onSubmit={this.onSubmit} style={this.WForm}>

                      <input type="text" name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          placeholder="name" />
                      <br />
                      <div className="Task">
                          <div align="left" style={this.Styel}>
                              <textarea name="Description"
                                  value={this.state.Description}
                                  onChange={this.onChange}
                                  placeholder="Description" />
                              <br />
                          </div>

                          <div align="right" style={this.Styel} className="Task-2">
                              <label align="center" name="deadline">deadline :  </label>
                              <input type="datetime-local" name="deadline"
                                  value={this.state.deadline}
                                  onChange={this.onChange}
                              />
                              <br />


                              <select name="IDofWorker"
                                  value={this.selectedItem}
                                  onChange={this.handleSelectChange}>
                                  <option value="">Chose Worker</option>
                                  {this.workers.map(item =>
                                      <option key={item.id} value={item.id}>{item.name}</option>
                                  )}
                              </select>
                              <br />

                              <input type="textarea" name="Comment"
                                  value={this.state.Comment}
                                  onChange={this.onChange}
                                  placeholder="Comment : this plase can be empty" />
                              <br />
                          </div>
                      </div>
                      <br />
                <button type="submit">Create Task</button>
              </form>
             <br />

             </div>
            </div>
        );
    }
}

