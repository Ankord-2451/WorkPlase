import React, { Component} from 'react';
import { Navigate } from 'react-router-dom';
export class WorkersOfProject extends Component {
    static displayName = WorkersOfProject.name;
    constructor(props) {
        super(props);
        this.state = {
           
        };

        this.workers = [];
        if (this.props.useplase === 'main') {
            this.fetchDataAll()
        }
        else {
            this.fetchDataPart()
        }
    }

    Worker = (e) => {
        this.props.Change(e.target.id);
    }
  
    fetchDataPart() {
        const url = 'Worker/Project' + this.props.IdOfProject;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.workers = data; // Сохраняем данные в переменную класса
                this.forceUpdate(); // Принудительно обновляем компонент для отображения данных
            })
            .catch((error) => console.error(error));
    }

    fetchDataAll() {
        fetch('Worker')
            .then((response) => response.json())
            .then((data) => {
                this.workers = data; // Сохраняем данные в переменную класса
                this.forceUpdate(); // Принудительно обновляем компонент для отображения данных
            })
            .catch((error) => console.error(error));
    }

    render() {
        if (this.Redirect) {
            return <Navigate to="/" replace={true} />;
        }
      return  (
          <div className="WorkerContainer" align="left">                     
              {this.workers.map(item => 
                  <div className="ReportContainer" align="center">
                      <hr className="dividingLine" />
                      <div className="Report" align="center">
                          <button className="menubtn" id={item.id} onClick={this.Worker}>{item.name}</button>
                      </div>
                     
                  </div>)            
              }
           </div>
        );
    }
}

