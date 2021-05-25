import React, { PureComponent } from "react";

interface IState {
  activeIndex: number;
}

interface IActiveIndex {
  handleItemClick(index: number): void;
}

function withActiveIndex<P>(Component: React.ComponentType<P & IActiveIndex>) {
  return class withActiveIndexComponent extends PureComponent<P, IState> {
    constructor(props: P) {
      super(props);

      this.handleItemClick = this.handleItemClick.bind(this);

      this.state = {
        activeIndex: 0,
      };
    }

    handleItemClick(index: number) {
      this.setState({
        activeIndex: index,
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          activeItemIndex={this.state.activeIndex}
          handleItemClick={this.handleItemClick}
        />
      );
    }
  };
}

export default withActiveIndex;
