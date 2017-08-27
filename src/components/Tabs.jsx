import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import style from '../styles/sass/tabs.scss';
export default class Tabs extends Component {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    defaultActiveIndex: PropTypes.number,
    activeIndex: PropTypes.number,
    onChange: PropTypes.func
  }

  static defaultProps = {
    classPrefix: 'tabs',
    onChange: () => { }
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    const currProps = this.props;

    let activeIndex;
    if ('activeIndex' in currProps) {
      activeIndex = currProps.activeIndex;
    } else if ('defaultActiveIndex' in currProps) {
      activeIndex = currProps.defaultActiveIndex;
    }

    this.state = {
      activeIndex,
      prevIndex: activeIndex
    };
  }

  componentWillReceiveProps(nexProps) {
    if ('activeIndex' in nexProps) {
      this.setState({
        activeIndex: nexProps.activeIndex
      });
    }
  }

  handleClick(activeIndex) {
    const prevIndex = this.state.activeIndex;
    if (this.state.activeIndex !== activeIndex && 'defaultActiveIndex' in this.props) {
      this.setState({
        activeIndex,
        prevIndex
      });
      this.props.onChange({ activeIndex, prevIndex });
    }
  }

  renderTabNav() {
    const { classPrefix, children } = this.props;
    return (
      <TabNav
        key="tabBar"
        classPrefix={classPrefix}
        onTabClick={this.handleClick}
        panels={children}
        activeIndex={this.state.activeIndex}
      ></TabNav>
    );
  }

  renderTabContent() {
    const { classPrefix, children } = this.props;
    return (
      <TabContent
        key="tabcontent"
        classPrefix={classPrefix}
        panels={children}
        activeIndex={this.state.activeIndex}
      >
      </TabContent>
    );
  }

  render() {
    const { className } = this.props;
    const classes = classnames(className, 'wck-tabs');
    return (
      <div className={classes}>
        {this.renderTabNav()}
        {this.renderTabContent()}
      </div>
    );
  }
}

class TabNav extends Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    panels: PropTypes.node,
    activeIndex: PropTypes.number
  }
  getTabs() {
    const { panels, classPrefix, activeIndex } = this.props;
    return React.Children.map(panels, (child) => {
      if (!child) return;
      const order = parseInt(child.props.order, 10);

      let classes = classnames({
        [`${classPrefix}`]: true,
        [`${classPrefix}-active`]: activeIndex === order,
        [`${classPrefix}-disabled`]: child.props.disabled
      });

      let events = {};
      if (!child.props.disabled) {
        events = {
          onClick: this.props.onTabClick.bind(this, order)
        }
      }

      const ref = {};
      if (activeIndex === order) {
        ref.ref = 'activeTab';
      }

      return (
        <li
          role="tab"
          aria-disabled={child.props.disabled ? 'true' : 'false'}
          aria-selected={activeIndex === order ? 'true' : 'false'}
          {...events}
          className={classes}
          key={order}
          {...ref}
        >
          { child.props.tab }
        </li>
      );
    });
  }

  render() {
    const { classPrefix } = this.props;
    const rootClasses = classnames({
      [`${classPrefix}-bar`]: true
    });

    const classes = classnames({
      [`${classPrefix}-nav`]: true
    });

    return (
      <div className={rootClasses} role="tablist">
        <ul className={classes}>
          {this.getTabs()}
        </ul>
      </div>
    );
  }
}

class TabContent extends Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    panels: PropTypes.node,
    activeIndex: PropTypes.number,
    isActive: PropTypes.bool
  };

  getTabPanes() {
    const { classPrefix, activeIndex, panels, isActive } = this.props;
    return React.Children.map(panels, child => {
      if (!child) return;
      const order = parseInt(child.props.order, 10);
      const isActive = activeIndex === order;

      return cloneElement(child, {
        classPrefix,
        isActive,
        children: child.props.children,
        key: `tabpane-${order}`
      });
    });
  }

  render() {
    const { classPrefix } = this.props;
    const classes = classnames({
      [`${classPrefix}-content`]: true
    });

    return (
      <div className={classes}>
        { this.getTabPanes() }
      </div>
    );
  }
}

export class TabPane extends Component {
  static propTypes = {
    tab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]).isRequired,
    order: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    isActive: PropTypes.bool
  };

  render() {
    const { classPrefix, className, isActive, children } = this.props;
    const classes = classnames({
      [className]: className,
      [`${classPrefix}-panel`]: true,
      [`${classPrefix}-active`]: isActive
    });

    return (
      <div
        role="tabpanel"
        className={classes}
        aria-hidden={!isActive}>
        { children }
      </div>
    );
  }
}