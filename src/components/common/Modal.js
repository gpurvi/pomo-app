import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement(document.querySelector('#root'));

export const withModal = (WrappedComponent) => {
    return class extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                modalIsOpen: false
            };
            this.openModal = this.openModal.bind(this);
            this.closeModal = this.closeModal.bind(this);
        }

        openModal() {
            this.setState({modalIsOpen: true});
        }

        closeModal() {
            this.setState({modalIsOpen: false});
        }

        render() {
            return (
                <div>
                    <button onClick={this.openModal}>{this.props.modalName}</button>
                    <ReactModal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Example Modal"
                    >
                        <WrappedComponent
                            closeModal={this.closeModal}
                            {...this.props}/>
                    </ReactModal>
                </div>
            );
        }
    }
};

