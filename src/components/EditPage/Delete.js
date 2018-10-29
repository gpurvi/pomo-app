import React from 'react';
import {Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {withModal} from "../common/Modal";

export class Delete extends React.Component {
    constructor(props) {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    async onClickHandler(e) {
        e.preventDefault();
        this.props.deleteOnClick(this.props.initValue, this.props.id);
        this.props.toggle();
    }

    render() {
        return (
            <React.Fragment>
                <ModalHeader toggle={this.props.toggle}>Delete</ModalHeader>
                <ModalBody>
                    Delete session: <span className='font-weight-bold'>{this.props.initValue}</span>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.onClickHandler}>Delete</Button>
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </React.Fragment>
        );
    }
}

export default withModal(Delete);
