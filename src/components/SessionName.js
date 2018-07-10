import React from 'react';

export const SessionName = (props) => (
    <input
        onChange={props.onChangeHandler}
        type="text"
        placeholder="Enter session name"
        value={props.sessionName}
    />
);
