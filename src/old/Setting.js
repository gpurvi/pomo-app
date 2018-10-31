import React from 'react';

export const Setting = ({name, type}) => (
    <div>
        {name}
        {type === 'text' ?
            (
                <input type='text' />
            ) :
            (
                <input type='checkbox'/>
            )}

    </div>
);