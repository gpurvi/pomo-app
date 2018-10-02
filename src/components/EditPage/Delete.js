import React from 'react';
import {withModal} from "../common/Modal";
import {deleteSessions} from "../common/apiCalls";

export class Delete extends React.Component {
    constructor(props) {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    async onClickHandler(e) {
        e.preventDefault();
        try {
            await deleteSessions(this.props.id);
            this.props.getSessions();
        } catch (err) {
            this.props.onError(err.message);
        }
        this.props.closeModal();
    }

    render() {
        return (
            <div>
                <h2>Delete</h2>
                <p>Delete session {this.props.initValue}</p>
                <button onClick={this.onClickHandler}>Delete</button>
                <button onClick={this.props.closeModal}>Cancel</button>
            </div>
        );
    }
}

export default withModal(Delete);