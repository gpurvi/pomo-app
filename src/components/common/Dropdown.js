import React from 'react';
// import {connect} from 'react-redux'
import './../../styles/components/SessionName.css';
import {getNames} from "./apiCalls";

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.showDropdown = this.showDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);

        this.state = {
            show: false,
            names: []
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if ((prevState.show !== this.state.show) && this.state.show) {
            document.addEventListener('click', this.closeDropdown);
            try {
                const names = await getNames(5);
                this.setState(() => ({names}));
            } catch (err) {
                //todo implement error handling
            }
        } else if ((prevState.show !== this.state.show) && !this.state.show) {
            document.removeEventListener('click', this.closeDropdown);
        }
    }

    showDropdown() {
        if (!this.props.timerStarted) {
            this.setState(() => ({show: true}));
        }
    }

    closeDropdown() {
        this.setState(() => ({show: false}));
    }

    onClickHandler(e) {
        const name = e.target.textContent;
        //dirty way to reflect e.target.value object
        this.props.onChangeHandler({target: {value: name}})
    }

    render() {
        const class2 = this.props.timerStarted ? 'name-input--active' : undefined;
        return (
            <div className='dropdown'>
                <input
                    onClick={this.showDropdown}
                    className={`${class2} name-input`}
                    readOnly={this.props.timerStarted}
                    onChange={this.props.onChangeHandler}
                    type="text"
                    placeholder="Enter session name"
                    value={this.props.sessionName}
                />
                {
                    this.state.show
                        ? (
                            <ul onClick={this.onClickHandler}
                                className='dropdown-content'>
                                {this.state.names.map((name, i) =>
                                    <li key={i}>{name}</li>
                                )}
                            </ul>
                        ) : null
                }

            </div>
        );
    }
}

export default Dropdown;