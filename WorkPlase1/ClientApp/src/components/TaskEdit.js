import React, { Component} from 'react';
import { Navigate } from 'react-router-dom';
export class TaskEdit extends Component {
 static displayName = TaskEdit.name;
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

        fetch('Task/One/9')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    Id: data[0].id});
                this.setState({ name: data[0].name });
                this.setState({ Description: data[0].description });
                this.setState({ deadline: data[0].deadline });
                this.setState({ IDofWorker: data[0].iDofWorker });
                this.setState({ DateOfStart: data[0].dateOfStart });
                this.setState({ ProgressInPercentage: data[0].progressInPercentage });
                this.setState({ DateOfCompletion: data[0].dateOfCompletion });
                this.setState({ IDofProject: data[0].iDofProject });
                this.setState({ Comment: data[0].comment });
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
          <div class="TaskF" align="center">
              <div class="text-center">
                  <form onSubmit={this.onSubmit} style={this.WForm}>

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
                      
                     <label name="deadline">deadline :  </label>
                      <input type="datetime-local" name="deadline"
                          value={this.state.deadline}
                          onChange={this.onChange} />
                      <br />

                      <label name="IDofWorker">IDofWorker :  </label>
                      <select name="IDofWorker"
                          value={this.selectedItem}
                          onChange={this.handleSelectChange}>
                          <option value="">Chose Worker</option>
                          {this.workers.map(item =>
                              <option key={item.id} value={item.id}>{item.name}</option>
                         )}
                      </select>
                      <br />
                      <label name="Comment">Comment :</label>
                      <input type="textarea" name="Comment"
                          value={this.state.Comment}
                          onChange={this.onChange}
                         plaseholder="this plase can be empty" />
                      <br />  
                      
                
                <button type="submit">Create Task</button>
              </form>
             <br />

             </div>
            </div>
        );
    }
}

