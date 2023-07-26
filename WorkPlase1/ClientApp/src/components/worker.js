import React, { Component} from 'react';
import { Navigate } from 'react-router-dom';
export class worker extends Component {
 static displayName = worker.name;
    constructor(props) {
        super(props);
        this.state = {
            Id:Number,
            name: "",
            Description: "",
            deadline:Date,
            IDofWorker: Number,
            DateOfStart: Date,
            ProgressInPercentage: Number,
            DateOfCompletion:Date,
            IDofProject: Number,
            Comment:""
        };

        this.Redirect = false;

        this.workers = [];
        this.selectedItem = '';
        this.fetchData();
        this.Styel = {
            'width':'50%'
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        // Отправка данных формы на сервер
        fetch('Task', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(response => {
                alert(response);
                if (response === "Task was update") {
                    this.Redirect = true;
                    this.forceUpdate();
                }
            })
            .catch(error => {
                // Обработка ошибок
                console.error(error);
            });
    };

    fetchData() {
        // Выполните запрос на сервер для получения данных
        // Здесь используется fetch для примера, но вы можете использовать любую библиотеку AJAX или Axios для запросов к серверу
        fetch('Worker')
            .then((response) => response.json())
            .then((data) => {
                this.workers = data; // Сохраняем данные в переменную класса
                this.forceUpdate(); // Принудительно обновляем компонент для отображения данных
            })
            .catch((error) => console.error(error));
        const url = 'Task/One/' + this.props.id;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    Id: data[0].id});
                this.setState({ name: data[0].name });
                this.setState({ Description: data[0].description });
                this.setState({ deadline: data[0].deadLine });
                this.setState({ IDofWorker: data[0].iDofWorker });
                this.setState({ DateOfStart: data[0].dateOfStart });
                this.setState({ ProgressInPercentage: data[0].progressInPercentage });
                this.setState({ DateOfCompletion: data[0].dateOfCompletion });
                this.setState({ IDofProject: data[0].iDofProject });
                this.setState({ Comment: data[0].comment });
                this.selectedItem = data[0].iDofWorker;
 ; // Сохраняем данные в переменную класса
                this.forceUpdate(); // Принудительно обновляем компонент для отображения данных
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
                              placeholder="Description"/>
                         <br />  
                      </div>

                          <div align="right" style={this.Styel} className="Task-2">
                              <label align="center" name="deadline">deadline :  </label>
                      <input type="datetime-local" name="deadline"
                          value={ this.state.deadline}
                              onChange={this.onChange}
                              />
                      <br />

                     
                      <select name="IDofWorker"
                          value={this.selectedItem}
                          onChange={this.handleSelectChange}>
                          <option value="0">Chose Worker</option>
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
                <button align="center" type="submit">Update Task</button>
              </form>
             <br />
             </div>
            </div>
        );
    }
}

