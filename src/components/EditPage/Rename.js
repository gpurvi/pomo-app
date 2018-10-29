import React from 'react';
import {withModal} from "../common/Modal";
import {Button, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';


export class Rename extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.initValue
        };

        this.ref = React.createRef();

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    //this is hack to get input always focused
    componentDidUpdate() {
        this.ref.current.focus();
    }

    onChangeHandler(e) {
        const value = e.target.value;
        this.setState(() => ({value}));
    }

    async onClickHandler(e) {
        e.preventDefault();
        this.props.renameOnClick(this.state.value, this.props.id);
        this.props.toggle();
    }

    render() {
        const {modalName} = this.props;
        return (
            <React.Fragment>
                <ModalHeader toggle={this.props.toggle}>{modalName}</ModalHeader>
                <ModalBody>
                    <Input
                        innerRef={this.ref}
                        type="text"
                        onChange={this.onChangeHandler}
                        value={this.state.value}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onClickHandler}>Save</Button>
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </React.Fragment>

        );
    }
}

export default withModal(Rename);

