import React from "react";
import Wallet from "./Wallet";
import Upgrades from "./Upgrades";
import Login from "./Login";
class App extends React.Component {
  constructor(props) {
    super(props);

    console.log(document.getElementsByClassName("bill")[0]);
    this.state = {
      luck: 1,
      clicked: false,
      clickSpeed: 1000,
      totalMoney: 0,
    };
  }
  render() {
    return (
      <div id="body">
        <div className="gridDiv" id="centerDiv">
          <h1>Money: {this.state.totalMoney}</h1>
          <Wallet
            clicked={this.state.clicked}
            packClick={() => this.handleWalletClick()}
            clickSpeed={this.state.clickSpeed}
          />
        </div>
        <div className="gridDiv" id="rightDiv">
          <h1>Upgrades</h1>
          <Upgrades
            text="Click Speed"
            task="upgradeClickSpeed"
            upgradesClick={(cost) => this.handleClickSpeedUpgrade(cost)}
          />

          <Upgrades
            text="Luck"
            task="upgradeLuck"
            upgradesClick={(cost) => this.handleLuckUpgrade(cost)}
          />

          <Upgrades
            text="Money Count"
            task="upgradeMoneyCount"
            upgradesClick={(cost) => this.handleMoneyCountUpgrade(cost)}
          />
        </div>
        <Login
          getGameInfo={this.getGameInfo()}
          setGameInfo={(info) => this.setGameInfo(info)}
        />
        <div id="billsDiv">
          <img
            className="bill"
            src={process.env.PUBLIC_URL + "/bills/bill-1.png"}
            alt="money failed"
          ></img>
        </div>
      </div>
    );
  }

  handleWalletClick() {
    var moneyArr = document.getElementsByClassName("bill");
    var moneySum = 0;
    for (var i = 0; i < moneyArr.length; i++) {
      var moneyValue = this.getMoneyValue();
      moneyArr[i].src =
        process.env.PUBLIC_URL + "/bills/bill-" + moneyValue + ".png";
      moneySum += moneyValue;
    }

    setTimeout(() => {
      this.setState({
        totalMoney: this.state.totalMoney + moneySum,
        clicked: false,
      });
    }, this.state.clickSpeed);

    this.handleMoneyAnimation(moneyArr);
  }

  handleMoneyAnimation(moneyArr) {
    var topPercent = 40,
      yDir = -1,
      xDirsArr = [];

    for (var i = 0; i < moneyArr.length; i++) {
      xDirsArr.push(Math.random() * 2 - 1);
      moneyArr[i].style.left = 40 + "%";
    }
    var animateId = setInterval(() => {
      if (topPercent < 10) {
        yDir *= -1;
        for (var i = 0; i < xDirsArr.length; i++) {
          xDirsArr[i] *= -1;
        }
      }

      topPercent += yDir;

      //Faces money in dir its pointing
      //Looks a little weird it can be improved
      // var angle = (Math.atan2(yDir, xDir) * 180) / Math.PI;
      // money.style.transform = "rotate(" + angle + "deg)";
      for (var i = 0; i < moneyArr.length; i++) {
        moneyArr[i].style.top = topPercent + "%";
        moneyArr[i].style.left =
          xDirsArr[i] + parseFloat(moneyArr[i].style.left) + "%";
      }

      if (topPercent > 40) clearInterval(animateId);
    }, this.state.clickSpeed / 80);
    this.setState({ clicked: true });
  }

  getMoneyValue() {
    var rand = Math.floor(Math.random() * 100) + this.state.luck;
    if (rand > 95) rand = 100;
    else if (rand > 85) rand = 50;
    else if (rand > 70) rand = 20;
    else if (rand > 50) rand = 10;
    else if (rand > 25) rand = 5;
    else rand = 1;

    return rand;
  }

  //Returns true if upgrade completed
  //returns maxed if max upgrade level reached
  //returns false if not enough money for purchase

  handleClickSpeedUpgrade(cost) {
    if (this.state.clickSpeed > 500 && this.state.totalMoney - cost >= 0) {
      this.setState({
        clickSpeed: this.state.clickSpeed - 200,
        totalMoney: this.state.totalMoney - cost,
      });
      return true;
    } else if (this.state.clickSpeed < 500) {
      this.setState({ clickSpeed: 500 });
      return "Maxed";
    } else {
      return false;
    }
  }

  handleLuckUpgrade(cost) {
    if (this.state.luck <= 20 && this.state.totalMoney - cost >= 0) {
      this.setState({
        totalMoney: this.state.totalMoney - cost,
        luck: this.state.luck + 2,
      });
      return true;
    } else if (this.state.luck > 20) {
      this.setState({ luck: 20 });
      return "Maxed";
    } else {
      return false;
    }
  }

  handleMoneyCountUpgrade(cost) {
    if (
      document.getElementsByClassName("bill").length < 5 &&
      this.state.totalMoney - cost >= 0
    ) {
      this.addMoney();
      this.setState({
        totalMoney: this.state.totalMoney - cost,
      });
      return true;
    } else if (document.getElementsByClassName("bill").length >= 5) {
      return "Maxed";
    } else {
      return false;
    }
  }

  addMoney() {
    var newBill = document.createElement("img");
    newBill.src = process.env.PUBLIC_URL + "/bills/bill-1.png";
    document.getElementById("body").appendChild(newBill);
    newBill.className = "bill";
  }

  getGameInfo() {
    return {
      totalMoney: this.state.totalMoney,
      clickSpeed: this.state.clickSpeed,
      luck: this.state.luck,
      moneyCount: document.getElementsByClassName("bill").length,
    };
  }

  setGameInfo(information) {
    this.setState({
      totalMoney: information.totalMoney,
      clickSpeed: information.clickSpeed,
      luck: information.luck,
      moneyCount: information.moneyCount,
    });

    var bills = document.getElementsByClassName("bill");
    console.log(bills);
    while (bills.length > this.state.moneyCount) {
      bills[bills.length - 1].remove();
    }
  }
}

export default App;
