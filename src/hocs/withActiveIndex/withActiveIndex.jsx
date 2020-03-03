import React, {PureComponent} from "react";

const withActiveIndex = (Component) => {
  class withActiveIndexComponent extends PureComponent {
    constructor(props) {
      super(props);

      this.handleItemClick = this.handleItemClick.bind(this);

      this.state = {
        activeIndex: 0
      };
    }

    handleItemClick(index) {
      this.setState({
        activeIndex: index
      });
    }

    render() {
      const {activeIndex} = this.state;
      return (
        <Component {...this.props} activeItemIndex = {activeIndex} handleItemClick = {this.handleItemClick}/>
      );
    }
  }

  withActiveIndexComponent.propTypes = {};

  return withActiveIndexComponent;
};

export default withActiveIndex;
