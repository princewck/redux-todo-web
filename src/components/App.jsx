import React from 'react';
import RealTodoList from '../containers/RealTodoList';
import FilterList from './FilterList';
import Tabs, { TabPane } from './Tabs';
import '../styles/reset.css';

export default () => (
    <div>
        <FilterList />
        <RealTodoList />
        <Tabs className="wck-tab" classPrefix={'liying'} defaultActiveIndex={1} onChange={() => { console.log('changed') }}>
            {
                React.Children.map([1, 2, 3, 4, 5], i => {
                    return (
                        <TabPane order={`${i}`} tab={ <div>TAB-{i}</div> }>
                          <div style={{ width: '100%', color: 'green', fontSize: '25px', textAlign: 'center', paddingTop: '30px' }}>
                            Tab content {i}
                          </div>
                        </TabPane>
                    );
                })
            }
        </Tabs>
    </div>
);
