import React from "react";

class Upgrades extends React.Component {
  constructor(props) {
    super(props);
    this.task = props.task;
    this.text = props.text;
    this.upgradesClick = props.upgradesClick;
    this.state = {
      cost: 10,
    };
  }
  render() {
    return (
      <button
        className="btn"
        onClick={() => {
          this.upgradeClicked();
        }}
      >
        {this.text + "     -     " + this.state.cost}
      </button>
    );
  }
  upgradeClicked() {
    var canUpgrade = this.upgradesClick(this.state.cost);
    if (canUpgrade === true) {
      this.setState({
        cost: Math.floor(this.state.cost * 2),
      });
    } else if (canUpgrade === "Maxed") {
      this.setState({ cost: canUpgrade });
    }
  }
}

export default Upgrades;
