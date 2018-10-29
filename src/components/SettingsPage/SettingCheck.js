import React from 'react';

class SettingCheck extends React.Component {

    render() {
        return (
            <div
                className={`form-check ${this.props.inline ? 'form-check-inline' : ''}`}
            >
                <input className="form-check-input"
                       onChange={this.props.onChange}
                       type="radio"
                       name={this.props.name}
                       id={this.props.id}
                       value={this.props.value}
                       checked={this.props.checked}
                />
                <label
                    className="form-check-label"
                    htmlFor={this.props.id}
                >
                    {this.props.label}
                </label>
            </div>
        );
    }
}


export default SettingCheck;
