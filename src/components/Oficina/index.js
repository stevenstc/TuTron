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

    var mydireccion = await window.tronWeb.trx.getAccount();
    mydireccion = window.tronWeb.address.fromHex(mydireccion.address)

    var registered = await Utils.contract.isActive(mydireccion).call();
    //console.log(registered);

    if(registered){

      let loc = document.location.href;
      if(loc.indexOf('?')>0){
        loc = loc.split('?')[0]
      }

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

    var getUserReferralBonus = await Utils.contract.getUserReferralBonus(direccion.address).call();

    //console.log();
    this.setState({
      direccion: window.tronWeb.address.fromHex(direccion.address),
      balanceRef: parseInt(getUserReferralBonus._hex)/1000000,
      totalRef: parseInt(getUserDividends._hex)/1000000,
      invested: parseInt(getUserTotalDeposits._hex)/1000000,
      my: parseInt(getUserAvailable._hex)/1000000,
      withdrawn: parseInt(getUserTotalWithdrawn._hex)/1000000
    });

  };

  async withdraw(){

    const { my } = this.state;

    var RETI_MIN = await Utils.contract.RETI_MIN().call();

    RETI_MIN = parseInt(RETI_MIN._hex)/1000000;

    if ( my >= RETI_MIN ) {
      await Utils.contract.withdrawl().send();
    }else{
      window.alert("El minimo de retiro es "+RETI_MIN+" TRX");
    }

  };


  render() {
    const { balanceRef, totalRef, invested,  withdrawn , my, link } = this.state;

    return (
    <div id="request">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="text-container" style={{'color': '#39ef09','textAlign': 'center'}}>

                        <h1 style={{'color': '#edf2eb#'}}>{invested} TRX IN MY INVESTMENTS</h1>
                       <div className="row">

                                <div className="col-md-6" style={{'border': 'dashed','borderRight': 'none','paddingTop': '30px','paddingBottom': '30px','fontSize': '1.2rem'}}>
                                    <h3><i className="fas fa-coins"></i>Dividends <br />{totalRef} TRX</h3>
                                <p id="wal"></p>
                                    <br />Earning of referrals
                                    <br /><b id="availableReferrerEarnings">{balanceRef}</b> TRX
                                    <br /><br />withdrawable <br />(earning of referrals included).
                                    <br /><b id="withdrawable">{my}</b> TRX
                                    <br />
                                    <br /><a href="#request" className="button-link-1 pushtop-30" onClick={( ) => this.withdraw()}>WITHDRAWAL</a>
                                    <br />
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
                                    <h3><i className="fas fa-user-friends"></i>Referral program <br />{balanceRef} TRX</h3>

                                    <br />Your referral link [
                                    <CopyToClipboard text={link}>
                                      <a href="#request" style={{'cursor': 'pointer', 'color': 'orange'}}>Copy link</a>
                                    </CopyToClipboard>]
                                    <br />
                                    <br /> {link}
                                    <div id="reflink" style={{'fontWeight':'bold'}}></div>
                                    <br />1  Referral （5% de gain） - <b >{parseFloat((balanceRef*0.5).toFixed(6))}</b>
                                    <br />2  Referral （3% de gain） - <b >{parseFloat((balanceRef*0.3).toFixed(6))}</b>
                                    <br />3 Referral （1% de gain） - <b >{parseFloat((balanceRef*0.1).toFixed(6))}</b>
                                    <br />3 Referral （1% de gain） - <b >{parseFloat((balanceRef*0.1).toFixed(6))}</b>

                                    <br />
                                    <br />Total earnings of paid referrals - <b id="referrerEarnings">{balanceRef}</b> TRX

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
