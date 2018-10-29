import React from 'react';
import {connect} from 'react-redux';

export const LoginPage = ({startLogin}) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Pomo app</h1>
            <p>It's time yep</p>
            <button className="button" onClick={startLogin}>Login with Google</button>
        </div>
    </div>
);


export default connect()(LoginPage);