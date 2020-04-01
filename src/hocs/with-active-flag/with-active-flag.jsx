import React, {PureComponent} from "react";

const withActiveFlag = (Component) => {
  class withActiveFlagComponent extends PureComponent {
    constructor(props) {
      super(props);

      this.handleItemChange = this.handleItemChange.bind(this);

      this.state = {
        activeFlag: false
      };
    }

    handleItemChange(value) {
      this.setState({
        activeFlag: value
      });
    }

    render() {
      const {activeFlag} = this.state;
      return (
        <Component {...this.props} isActiveFlag = {activeFlag} handleItemChange = {this.handleItemChange}/>
      );
    }
  }

  withActiveFlagComponent.propTypes = {};

  return withActiveFlagComponent;
};

export default withActiveFlag;
