import React, { Component} from 'react';
import { WorkersOfProject } from "./WorkersOfProject";
export class ProjectShow extends Component {
    static displayName = ProjectShow.name;
    constructor(props) {
        super(props);
        this.state = {
           id:null
        };

       
    }

    onIDChange = (ID) =>{
        this.setState({ id: ID });
    }


    render() {
        return (
            <div>
                <WorkersOfProject useplase="main" Change={this.onIDChange} />
                {this.state.id}
            </div>
        );
    }
}

