import React from 'react';
import RealTodoList from '../containers/RealTodoList';
import FilterList from './FilterList';
import '../styles/reset.css';

export default () => (
    <div>
        <FilterList />
        <RealTodoList />
    </div>
);
