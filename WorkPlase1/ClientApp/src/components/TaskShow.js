import React, { Component} from 'react';
import { Navigate } from 'react-router-dom';
export class TaskShow extends Component {
 static displayName = TaskShow.name;
    constructor(props) {
        super(props);
        this.state = {
            Id: Number,
            Name: "",
            Description: "",
            Deadline: Date,
            NameOfWorker: "",
            DateOfStart: Date,
            ProgressInPercentage: Number,
            DateOfCompletion: Date,
            NameOfProject: "",
            Comment: "",
            deadLineChek: true | false
        };

        this.report = {
            Id: Number,
            Description: "",
            IdOfTask: Number,
            Date: Date
        };

        this.reports = [];

        this.Green = { 'color': 'green' };
        this.Red = { 'color': 'red' };

        this.Completed = {};

        this.Redirect = false;
        this.fetchData();
        this.ReportsUpload();

    }

    onChange = (e) => {
        if ((e.target.value <= 100 && e.target.value >= 0)) {
            this.setState({ [e.target.name]: e.target.value });
        }
        if (e.target.value > 100) {
            this.setState({ [e.target.name]: 100 });
        }
        if (e.target.value < 0 || e.target.value==='' )
        {
            this.setState({ [e.target.name]: 0 });
        }
       

    }

    ReportChange = (e) => {
        this.report.Description = e.target.value;
        this.forceUpdate();
    }

    SubmitPrercents = (e) => {
        e.preventDefault();

        // Отправка данных формы на сервер
        const url ='Task/Percent/'+JSON.stringify(this.state.Id);
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.ProgressInPercentage)
        })
            .then(response => response.json())
            .then(response => {
                alert(response);
            })
            .catch(error => {
                // Обработка ошибок
                console.error(error);
            });
     };

    ReportsUpload() {
        const url = 'Reports/get/' + this.props.id;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.reports = data; // Сохраняем данные в переменную класса
                this.forceUpdate();// Принудительно обновляем компонент для отображения данных
            })
            .catch((error) => console.error(error));

    }

    fetchData() {      
        const url = 'Task/One/' + this.props.id;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.setState({Id: data.id });                               
                this.setState({ Name: data.name });
                this.setState({ Description: data.description });
                this.setState({ Deadline: data.deadLine });
                this.setState({ NameOfWorker: data.nameOfWorker });
                this.setState({ DateOfStart: data.dateOfStart });
                this.setState({ ProgressInPercentage: data.progressInPercentage });
                this.setState({ DateOfCompletion: data.dateOfCompletion });
                this.setState({ NameOfProject: data.nameOfProject });
                this.setState({ Comment: data.comment });
                this.setState({ deadLineChek: data.deadLineChek });
                this.selectedItem = data.iDofWorker;
               
                ; // Сохраняем данные в переменную класса
                this.forceUpdate(); // Принудительно обновляем компонент для отображения данных
            })
            .catch((error) => console.error(error));
       
    }

    CommentChek() {
        if (this.state.Comment === '') {
            return (<br />);
        }
        return (
            <div>
                <label>Comment : </label>
                <br />
                <div>{this.state.Comment}</div>
                <br />
            </div>
        );
    }

    SubReport = (e) => {
        e.preventDefault();

        this.report.IdOfTask = this.state.Id;
        
        fetch('/Reports', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.report)
        })
            .then(response => response.json())
            .then(response => {
                alert(response);
                this.report.Description = "";
                this.ReportsUpload();
                this.forceUpdate();
            })
            .catch(error => {
                // Обработка ошибок
                console.error(error);
            });
    }

    DeadLineChek() {
        if (this.state.DateOfCompletion !== null) {
            
            return (<div style={this.Green}>(Completed)</div>);
        }
        else { 
            if (this.state.deadLineChek) {   
               
                return (<div style={this.Red}>(Overdue)</div>);    
           }
            else {      
               
               return (<div style={this.Green}>(Fit)</div>);
           }
        }
    }

    CompletedChek() {
        if (this.state.DateOfCompletion !== null) {
            this.Completed = {
                margin: '0px',
                padding:'0px',
                overflow: 'hidden',
                height: '0px'
            };
        }
        else {
            this.Completed = {
             
            };
        }
    }

    render() {
        if (this.Redirect) {
            return <Navigate to="/" replace={true} />;
        }
      return  (
          <div >
              <div >
                  <span>Date Of Start: {this.state.DateOfStart} - Date Of Completion: {this.state.DateOfCompletion}   deadline: {this.state.Deadline}</span>
                  <br />{this.CompletedChek()}
                  <h1 style={this.IsAlive}>{this.state.Name} {this.DeadLineChek()}</h1>
                 
                  <div className="scale">
                          <hr className="Percent" size="25" width={this.state.ProgressInPercentage + '%'} />
                  </div> 


                  <form style={this.Completed} width="20%" onSubmit={this.SubmitPrercents} >
                      <label>Set Progress : </label>
                          <input width="50px" min={0} max={100}
                          value={this.state.ProgressInPercentage}
                          type="number"
                          name="ProgressInPercentage"
                          onChange={this.onChange} />
                              <button height="20px" type="submit">Set</button>
                          
                      </form>
                    
               
                  <br />
                  <label align="left">Name of project :</label><span>{this.state.NameOfProject}</span>
                  <br />
                  <label align="left">Name of worker : </label><span>{this.state.NameOfWorker}</span>
                  <br />
                  <label align="left">Description : </label>
                  <br />
                  <div>{this.state.Description}</div>                    
                  <br />     
                  {this.CommentChek()}
                  
                  <br />
                  <h4 align="center">reports :</h4>
                  <br />
                  <div className="ReportsContainer">
                  {this.reports.map(item =>
                      <div>
                      <div className="ReportContainer" align="center">
                          <hr className="dividingLine"/>
                          <div className="Report" align="center">
                              {item.date} : {item.description}
                          </div>
                          </div>
                          <br/>
                      </div>
                      )}
                  </div>
                  <div style={this.Completed} className="ReportContainer" align="center">
                          <hr className="dividingLine"/>
                          <div className="Report" align="center">
                          <form  className="ReportF" onSubmit={this.SubReport}>
                              <textarea name="Description" value={this.report.Description} onChange={this.ReportChange} />
                              <button type="submit">post</button>
                          </form>
                          </div>
                          </div>
                          <br/>
             </div>
            </div>
        );
    }
}

