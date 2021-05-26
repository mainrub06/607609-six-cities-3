import React, { PureComponent } from "react";

interface IState {
  activeFlag: boolean;
}

interface IWithActiveFlag {
  handleItemChange(firstArg: boolean): void;
}

function withActiveFlag<P>(
  Component: React.ComponentType<P & IWithActiveFlag>
) {
  return class withActiveFlagComponent extends PureComponent<P, IState> {
    constructor(props: P) {
      super(props);

      this.handleItemChange = this.handleItemChange.bind(this);

      this.state = {
        activeFlag: false,
      };
    }

    handleItemChange(value: boolean) {
      this.setState({
        activeFlag: value,
      });
    }

    render() {
      return (
        <Component
          {...(this.props as P)}
          isActiveFlag={this.state.activeFlag}
          handleItemChange={this.handleItemChange}
        />
      );
    }
  };
}

export default withActiveFlag;
