import React from 'react';
import {Button, Modal} from 'reactstrap';

export const withModal = (WrappedComponent) => {
    return class extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                modal: false
            };

            this.toggle = this.toggle.bind(this);
        }

        toggle() {
            this.setState({
                modal: !this.state.modal
            });
        }

        render() {
            return (
                <div>
                    <Button
                        color="secondary"
                        size='sm'
                        onClick={this.toggle}
                    >
                        {this.props.modalName}
                    </Button>
                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.props.className}
                    >
                        <WrappedComponent
                            toggle={this.toggle}
                            {...this.props}/>
                    </Modal>
                </div>
            );
        }
    }
};
