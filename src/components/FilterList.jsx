import FilterLink from '../containers/FilterLink';
import React from 'react';
import '../styles/sass/FilterLink';
const FilterList = ({ onClick, filter }) => {
    return (
        <div className="filter-link">
            <FilterLink filter="ALL">全部</FilterLink>
            <FilterLink filter="FINISHED">已完成</FilterLink>
            <FilterLink filter="NOT_FINISHED">未完成</FilterLink>
        </div>
    );
}
export default FilterList;