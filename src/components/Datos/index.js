import React, { Component } from "react";
import Utils from "../../utils";
import contractAddress from "../Contract";

export default class EarnTron extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalInvestors: 0,
      totalInvested: 0

    };

    this.totalInvestors = this.totalInvestors.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    setInterval(() => this.totalInvestors(),1000);
  };

  async totalInvestors() {

    var totalUsers = await Utils.contract.totalUsers().call();
    //console.log(totalUsers);

    var totalInvested = await Utils.contract.totalInvested().call();
    //console.log(totalInvested);


    this.setState({
      totalInvestors: parseInt(totalUsers._hex),
      totalInvested: parseInt(totalInvested._hex)/1000000,
      

    });

  };

  render() {
    const { totalInvestors, totalInvested } = this.state;

    return (
      <div className="row counters">
            
        <div className="col-lg-4 col-12 text-center">
          <span data-toggle="counter-up">{totalInvestors}</span>
          <p>Inversores Globales</p>
        </div>

        <div className="col-lg-4 col-12 text-center">
          <span data-toggle="counter-up">{totalInvested} TRX</span>
          <p>Invertido Global</p>
        </div>


      </div>



    );
  }
}
