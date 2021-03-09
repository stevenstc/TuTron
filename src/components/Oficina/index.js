import React, { Component } from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Utils from "../../utils";
import contractAddress from "../Contract";

export default class EarnTron extends Component {
  constructor(props) {
    super(props);

    this.state = {
      direccion: "",
      link: "Haz una inversión para obtener el LINK de referido",
      registered: false,
      balanceRef: 0,
      totalRef: 0,
      invested: 0,
      paidAt: 0,
      my: 0,
      withdrawn: 0

    };

    this.Investors = this.Investors.bind(this);
    this.Link = this.Link.bind(this);
    this.withdraw = this.withdraw.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    setInterval(() => this.Investors(),1000);
    setInterval(() => this.Link(),1000);
  };

  async Link() {
    const {registered} = this.state;
    if(registered){

      let loc = document.location.href;
      if(loc.indexOf('?')>0){
        loc = loc.split('?')[0]
      }
      let mydireccion = await window.tronWeb.trx.getAccount();
      mydireccion = window.tronWeb.address.fromHex(mydireccion.address)
      mydireccion = loc+'?ref='+mydireccion;
      this.setState({
        link: mydireccion,
      });
    }else{
      this.setState({
        link: "Haz una inversión para obtener el LINK de referido",
      });
    }
  }
    

  async Investors() {

    var direccion = await window.tronWeb.trx.getAccount();

    var getUserTotalWithdrawn = await Utils.contract.getUserTotalWithdrawn(direccion.address).call();

    var getUserDividends = await Utils.contract.getUserDividends(direccion.address).call();

    var getUserAvailable = await Utils.contract.getUserAvailable(direccion.address).call();

    var getUserTotalDeposits = await Utils.contract.getUserTotalDeposits(direccion.address).call();

    //console.log();
    this.setState({
      direccion: window.tronWeb.address.fromHex(direccion.address),
      registered: getUserTotalWithdrawn.registered,
      balanceRef: parseInt(getUserTotalWithdrawn._hex)/1000000,
      totalRef: parseInt(getUserTotalWithdrawn._hex)/1000000,
      invested: parseInt(getUserTotalDeposits._hex)/1000000,
      my: parseInt(getUserAvailable._hex)/1000000,
      withdrawn: parseInt(getUserTotalWithdrawn._hex)/1000000
    });

  };

  async withdraw(){
    await Utils.contract.withdraw().send()
  };


  render() {
    const { balanceRef, totalRef, invested,  withdrawn , my, direccion, link} = this.state;

    return (
    <div id="request">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="text-container" style={{'color': '#39ef09','textAlign': 'center'}}>

                        <h1 style={{'color': '#edf2eb#'}}>{invested} TRX IN MY INVESTMENTS</h1>
                       <div className="row">

                                <div className="col-md-6" style={{'border': 'dashed','borderRight': 'none','paddingTop': '30px','paddingBottom': '30px','fontSize': '1.2rem'}}>
                                    <h3><i className="fas fa-coins"></i>Dividends</h3>
                                <p id="wal"></p>
                                    <br />Earning of referrals
                                    <br /><b id="availableReferrerEarnings">0.00</b> TRX
                                    <br /><br />With (earning of referrals included).
                                    <br /><b id="withdrawable">{my}</b> TRX
                                    <br /><a href="javascript:void(0)" className="button-link-1 pushtop-30" id="withdrawButton">WITHDRAWAL</a>
                                    <br />
                                    <div>
                                    You must have at least 20-40 TRX for the transaction fee.
                                    </div>
                                    <br />
                                    Total invested <b className="totalInvestment" >{invested}</b> TRX
                                    <br />
                                    Dividends withdrawn <b className="totalDivs" >{withdrawn}</b> TRX
                                </div>

                                <div className="col-md-6" style={{'border': 'dashed','paddingTop': '30px','paddingBottom': '30px', 'fontSize': '1.2rem'}}>
                                    <h3><i className="fas fa-user-friends"></i>Referral program</h3>
                                    <br />Your referral link [<a onClick="copiarAlPortapapeles('yourRefLink')" style={{'cursor': 'pointer', 'color': 'orange'}}>copy link</a>]
                                    <div id="reflink" style={{'fontWeight':'bold'}}></div>
                                    <br />1  Referral （5% de gain） - <b id="level1RefCount">0</b>
                                    <br />2  Referral （3% de gain） - <b id="level2RefCount">0</b>
                                    <br />3 Referral （1% de gain） - <b id="level3RefCount">0</b>
                                    <br />4 Referral （1% de gain） - <b id="level3RefCount">0</b>

                                    <br />Total earnings of paid referrals - <b id="referrerEarnings">0.00</b> TRX
                                    
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
