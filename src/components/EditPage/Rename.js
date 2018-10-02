import React from 'react';
import {withModal} from "../common/Modal";
import {patchSessions} from "../common/apiCalls";

export class Rename extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.initValue
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onChangeHandler(e) {
        const value = e.target.value;
        this.setState(() => ({value}));
    }

    async onClickHandler(e) {
        e.preventDefault();
        try {
            await patchSessions(this.props.id, this.state.value);
            this.props.getSessions();
        } catch (err) {
            this.props.onError(err.message);
        }
        this.props.closeModal();
    }

    render() {
        return (
            <form>
                <h3>Rename</h3>
                <input
                    autoFocus
                    type="text"
                    onChange={this.onChangeHandler}
                    value={this.state.value}
                />
                <button onClick={this.onClickHandler}>Save</button>
                <button onClick={this.props.closeModal}>Cancel</button>
            </form>
        );
    }
}

export default withModal(Rename);