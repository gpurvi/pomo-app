import React from 'react';
import {connect} from 'react-redux';
import Downshift from 'downshift';
import {getNames} from "./apiCalls";
import {changeName} from "../../actions/timer";
import XIcon from './XIcon';
import ArrowIcon from './ArrowIcon';
import '../../styles/components/common/dropdown.css';

class DropdownV1 extends React.Component {
    constructor(props) {
        super(props);

        this.handleValueChange = this.handleValueChange.bind(this);

        this.state = {
            value: '',
            show: false,
            names: []
        };
    }

    async componentDidMount() {
        const names = await getNames();
        this.setState(({names}));
    }

    handleValueChange(changes) {
        if (changes.hasOwnProperty('selectedItem')) {
            this.setState({value: changes.selectedItem})
        } else if (changes.hasOwnProperty('inputValue')) {
            this.setState({value: changes.inputValue})
        }
        if (changes.inputValue !== undefined) {
            this.props.dispatch(changeName(changes.inputValue));
        }
    }

    render() {
        const {value, names} = this.state;
        const {timerStarted, breakTimerStarted, sessionName} = this.props;
        const timerRunning = timerStarted || breakTimerStarted;
    console.log(sessionName);
        return (
            <Downshift
                selectedItem={value}
                onStateChange={this.handleValueChange}
                initialInputValue={sessionName}
            >
                {({
                      getInputProps,
                      getItemProps,
                      getMenuProps,
                      isOpen,
                      inputValue,
                      highlightedIndex,
                      selectedItem,
                      clearSelection,
                      getToggleButtonProps,
                  }) => (
                    <div className='dropdown'>
                        <div className='position-relative'>
                            <input {...getInputProps({
                                disabled: timerRunning,
                                placeholder: 'Enter name',
                                className: `dropdown__input ${isOpen ? ' dropdown__input--is-open' : undefined}
                                 ${timerRunning ? 'dropdown__input--disabled' : ' dropdown__input--not-disabled'}`
                            })} />
                            {!timerRunning ? (
                                (selectedItem || sessionName) ? (
                                    <XIcon clearSelection={clearSelection}/>
                                ) : (
                                    <ArrowIcon {...getToggleButtonProps({
                                        className: 'dropdown__controller-button',
                                        isOpen
                                    })}
                                    />
                                )
                            ) : null}
                        </div>
                        <div className='position-relative'>
                            <ul {...getMenuProps({
                                className: `dropdown__menu ${isOpen ? undefined : ' dropdown__menu--is-not-open'}`
                            })}>
                                {isOpen
                                    ? names
                                        .filter(item => !inputValue || item.includes(inputValue.toLowerCase()))
                                        .map((item, index) => (
                                            <li
                                                {...getItemProps({
                                                    key: index,
                                                    index,
                                                    item,
                                                    className: `dropdown__item
                                                    ${highlightedIndex === index ? ' dropdown__item--active' : undefined}
                                                    ${selectedItem === item ? ' dropdown__item--selected' : undefined}`
                                                })}
                                            >
                                                {item}
                                            </li>
                                        ))
                                    : null}
                            </ul>
                        </div>
                    </div>
                )}
            </Downshift>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.timer
});

export default connect(mapStateToProps)(DropdownV1);