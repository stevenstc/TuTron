import React, { Component } from "react";
import Utils from "../../utils";
import contractAddress from "../Contract";

const wallet = "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb";

export default class EarnTron extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalInvestors: 0,
      totalInvested: 0,
      sponsor: "Loading..."

    };

    this.deposit = this.deposit.bind(this);
    this.totalInvestors = this.totalInvestors.bind(this);
    this.refer = this.refer.bind(this);

  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    setInterval(() => this.totalInvestors(),1*1000);
    setInterval(() => this.refer(),1*1000);
  };

  async refer() {

    var loc = document.location.href;
    if(loc.indexOf('?')>0){
        var getString = loc.split('?')[1];
        var GET = getString.split('&');
        var get = {};
        for(var i = 0, l = GET.length; i < l; i++){
            var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        
        if (get['ref'].length === 34) {

          this.setState({
            sponsor: get['ref']
          });

        
        }else{

           this.setState({
            sponsor: wallet
          });

        }
        
        
    }else{

       this.setState({
          sponsor: wallet
        });

    }
  };


  async deposit() {

    var loc = document.location.href;
    if(loc.indexOf('?')>0){
        var getString = loc.split('?')[1];
        var GET = getString.split('&');
        var get = {};
        for(var i = 0, l = GET.length; i < l; i++){
            var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        
        if (get['ref'].length === 34) {

          document.getElementById('sponsor').value = get['ref'];            
        }else{

           document.getElementById('sponsor').value = wallet;
        }
        
        
    }else{

        document.getElementById('sponsor').value = wallet; 
    }

    let amount = document.getElementById("amount").value;
    let sponsor = document.getElementById("sponsor").value;


    document.getElementById("amount").value = "";
  
    return Utils.contract.invest(sponsor).send({
      shouldPollResponse: true,
      callValue: amount * 1000000 // converted to SUN
    });
    
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

    const { totalInvestors, totalInvested, sponsor } = this.state;
    
    return (

    <div id="pricing" className="cards-2">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <h2>Multiple ways to Capitalize</h2>
                    <p className="p-heading p-large">We develop different capitalization rates, you can decide and choose according to the capital and interest you want.</p>
                </div> 
            </div>
            <div className="row">
                <div className="col-md-6">
                    <h1>Return investiment of 1% everiday (+0.0416% for hourly)</h1>
                    <div className="according" style={{'textAlign': 'left','fontSize': '1.1rem','listStyle': 'disclosure-closed'}}>
                        <li>YOUTRON7 smart-contract calculate profit up to every deposit since the date it was made. Every hour you will get +0.0416%, every day +1%.</li><br />
                        <li>Smart-contract calculates hold-bonus from your deposit, or last withdraw date. If you did not request payment, it will charge you an additional bonus. After 24 hours +0.05% and so on.</li><br />

                        <li>+0.07% for every 700,000 TRX on platform balance</li> <br />
                    </div>
                        Total invested amount (TRX):<br />
                        <button  className="btn  btn-success"  style={{'width': '100%'}}>{totalInvested} TRX</button><br /><br />
                        Total active participants:<br />
                        <button  className="btn  btn-success"  style={{'width': '100%'}}>{totalInvestors}</button>

                </div>
                <div className="col-md-6">

                    <div className="card">
                        <div className="label">

                        </div>
                        <div className="card-body">
                            <div className="card-title">INVESTIMENT</div>
                            <div className="card-subtitle">earn everisdays</div>
                            <hr className="cell-divide-hr" />
                            <div className="price">
                                <span className="value">+1%</span>
                                <div className="frequency">Daily earning</div>
                            </div>
                            <hr className="cell-divide-hr" />
                            <ul className="list-unstyled li-space-lg">
                                <li className="media">
                                    <i className="fas fa-check"></i><div className="media-body">Dividends every day</div>
                                </li>
                                <li className="media">
                                    <i className="fas fa-check"></i><div className="media-body">Total return +1% * days </div>
                                </li>
                                <li className="media">
                                    <i className="fas fa-check"></i><div className="media-body">0.07% bonus 700,000  trx</div>
                                </li>
                                <li className="media">
                                    <i className="fas fa-check"></i><div className="media-body">TRX minimum investment amount 200 trx</div>
                                </li>

                            </ul>
                            <div>

                                <label>
                                    <div id="patro">Your sponsor is {sponsor}</div>
                                </label>
                                <input type="number" className="form-control" id="amount" placeholder="Min. 200 TRX" style={{'textAlign':'center', 'background': 'transparent', 'color':'white'}} />

                                <label>
                                    Deposit fee 20-50 TRX.
                                </label>
                            </div>
                            <div className="button-wrapper" onClick={() => this.deposit()} style={{'cursor': 'pointer'}}>
                                <a href="#pricing" className="btn-solid-reg page-scroll" style={{'color':'#f7f4f4'}}>INVESTIMENT</a>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
      

    );
  }
}
