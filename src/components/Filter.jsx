import React from 'react';

const Filter = ({onClick, children, active}) => {
    if (active) 
        return <span>{ children }</span>;
    return (
        <a href="#" onClick={e => {
                e.preventDefault();
                onClick();
            }}>
            { children }
        </a>
    );
};

export default Filter;