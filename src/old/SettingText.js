import React from 'react';

// export default class SettingText extends React.Component {
//     constructor(props) {
//         super(props);
//         this.onChangeHandler = this.onChangeHandler.bind(this);
//     }
//
//     onChangeHandler(e) {
//         const value = e.target.value;
//         this.setState(() => ({value}));
//     }
//
//     render() {
//         return (
//             <div>
//                 {this.props.name}
//                 <input type='text' onChange={this.onChangeHandler} value={this.state.value}/>
//             </div>
//         );
//     }
// }


const SettingText = ({name, value, onChangeHandler, nameAttr, onBlur}) => (
    <div>
        {name}
        <input

            onBlur={onBlur}
            name={nameAttr}
            type='text'
            onChange={onChangeHandler}
            value={value}
        />
    </div>
);

export default SettingText;

