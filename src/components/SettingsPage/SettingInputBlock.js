import React from 'react';
import {FormGroup, Label, FormFeedback, FormText} from 'reactstrap';
import SettingInput from "./SettingInput";


export default class SettingInputBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invalid: false
        };
        this.onInvalid = this.onInvalid.bind(this);
    }

    onInvalid(value) {
        this.setState(() => ({invalid: value}));
    }


    render() {
        const {id, maxValue, value, addBlock, removeBlock, onBlur, name, label} = this.props;
        return (
            <FormGroup row>
                <Label for={id} className="col-5 col-form-label">{label} timer duration</Label>
                <div className="col-7">

                        <SettingInput
                            invalid={this.onInvalid}
                            maxValue={maxValue}
                            id={id}
                            value={value}
                            addBlock={addBlock}
                            removeBlock={removeBlock}
                            onBlur={onBlur}
                            name={name}
                        />


                    <FormText
                        className={this.state.invalid ? 'd-none' : ''}
                    >
                        Enter number from 1 to 360. Number represents minutes.
                    </FormText>
                    <FormFeedback>Must be number from 1 to 360</FormFeedback>
                </div>
            </FormGroup>
        );
    }
}