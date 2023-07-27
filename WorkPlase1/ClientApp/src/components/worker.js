import React, { Component} from 'react';
export class Worker extends Component {
 static displayName = Worker.name;
    constructor(props) {
        super(props);
        this.state = {
            Id:Number,
            Name: "",
            PrisePerHour: Number,
            HoursOfWork: Number,
            Profession: ""
        };

        this.Redirect = false;

        this.Tasks = [];

        this.form = {
             all: 'unset',
             display: 'flex',
            'align-items': 'center',
             gap: '2px' 
        }
       
        this.fetchData();
       
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const url = 'Worker/Prise/' + this.props.id;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.PrisePerHour)
        })
            .then(response => response.json())
            .then(response => {
                alert(response);
                if (response === "Prise per houre was update") {
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
        const url = 'Worker/byID/' + this.props.id;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ Id: data.id});
                   
                this.setState({ Name: data.name });
                this.setState({ PrisePerHour: data.prisePerHour });
                this.setState({ HoursOfWork: data.hoursOfWork });
                this.setState({ Profession: data.profession });

            })
            .catch((error) => console.error(error));
        const url2 = 'Task/worker/' + this.props.id;

        fetch(url2)
            .then((response) => response.json())
            .then((data) => {
                this.Tasks = data;
                this.forceUpdate();
            })
            .catch((error) => console.error(error));
    }

    Task = (e) => {
        this.props.Change("TaskShow",e.target.id);
    }

    render() {
      return  (
          <div>
             
              <h1 align="center">{this.state.Name}</h1>
              <br />
              <br />
              <div className="flex-around-worker">
                  <h2 >
                  <lable>Hours Of Work:</lable>
                  {this.state.HoursOfWork}
              </h2>
                  <form onSubmit={this.onSubmit} style={this.form}>
                  <h2>Prise Per Hour :</h2>
                      <input type="number" min="1" name="PrisePerHour"
                             value={this.state.PrisePerHour}
                          onChange={this.onChange} />                    
                <button type="submit">Set</button>
              </form>
                  <h2 >
                  <lable>Salary :</lable>
                  {this.state.HoursOfWork*this.state.PrisePerHour}$
                  </h2>
              </div>
              <br />
              <br />
              <h2 align="center">
                  <lable>Profession :</lable>
                  {this.state.Profession}
              </h2>
              <br />
              <br />
              <h2 align="center">Tasks :</h2>
              <div align="center">             
                      {this.Tasks.map(item =>
                          <div className="ReportContainer" align="center">
                              <hr className="dividingLine" />
                              <div className="Report" align="center">
                                  <button className="menubtn" id={item.id} onClick={this.Task}>{item.name}  {item.dateOfStart}</button>
                              </div>

                          </div>)
                      }
              </div>
            </div>
        );
    }
}

