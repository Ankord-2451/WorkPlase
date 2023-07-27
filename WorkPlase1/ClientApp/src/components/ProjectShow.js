import React, { Component} from 'react';
import { WorkersOfProject } from "./WorkersOfProject";
export class ProjectShow extends Component {
    static displayName = ProjectShow.name;
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            component: null
        };
      
    }

    onComponentChange = (Component,ID) => {
        this.setState({ component: Component });
        this.setState({ id: ID });
    }


    render() {
        return (
            <div>
                <WorkersOfProject useplase="main" Change={this.onComponentChange} />
                {this.state.id}
                {this.state.component}
            </div>
        );
    }
}

