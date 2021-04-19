import React, { Component } from "react";
import TronWeb from "tronweb";

import Utils from "../../utils";
import CrowdFunding from "../CrowdFunding";
import Oficina from "../Oficina";
import TronLinkGuide from "../TronLinkGuide";

const FOUNDATION_ADDRESS = "TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg";

var hoy = Date.now();

console.log(hoy);

var launch = 1619222400000;
console.log(launch);

if (hoy<launch) {
  console.log(true);
}else{
  console.log(false);
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tronWeb: {
        installed: false,
        loggedIn: false
      }
    };
  }

  async componentDidMount() {
    await new Promise(resolve => {
      const tronWebState = {
        installed: !!window.tronWeb,
        loggedIn: window.tronWeb && window.tronWeb.ready
      };

      if (tronWebState.installed) {
        this.setState({
          tronWeb: tronWebState
        });

        return resolve();
      }

      let tries = 0;

      const timer = setInterval(() => {
        if (tries >= 10) {

          const TRONGRID_API = "https://api.trongrid.io";

          window.tronWeb = new TronWeb(
            TRONGRID_API,
            TRONGRID_API,
            TRONGRID_API
          );

          this.setState({
            tronWeb: {
              installed: false,
              loggedIn: false
            }
          });
          clearInterval(timer);
          return resolve();
        }

        tronWebState.installed = !!window.tronWeb;
        tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

        if (!tronWebState.installed) {
          return tries++;
        }

        this.setState({
          tronWeb: tronWebState
        });

        resolve();
      }, 100);
    });

    if (!this.state.tronWeb.loggedIn) {
      // Set default address (foundation address) used for contract calls
      // Directly overwrites the address object if TronLink disabled the
      // function call
      window.tronWeb.defaultAddress = {
        hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
        base58: FOUNDATION_ADDRESS
      };

      window.tronWeb.on("addressChange", () => {
        if (this.state.tronWeb.loggedIn) {
          return;
        }

        this.setState({
          tronWeb: {
            installed: true,
            loggedIn: true
          }
        });
      });
    }

    Utils.setTronWeb(window.tronWeb);
  }

  render() {

    var hoy = Date.now();

    var launch = 1617724130000;

    var event = new Date('April 23, 2021 19:00:00 GMT-0500');

    event = ""+event;

    //tiempo del lanzamiento 1619222400000
    // tiempo de prueba 1617724130000


    if ( hoy < launch ) return (
      <>
      <div className='row'>
          <div className='col-xs-12 col-md-12 text-center'>
              <h1>launch Day</h1>
              <br />
              <h1>
                  {event}
              </h1>
          </div>
      </div>

      </>
      );

    if (!this.state.tronWeb.installed) return (
      <>
        <div className="container">
        <TronLinkGuide />
        </div>
      </>
      );

    if (!this.state.tronWeb.loggedIn) return (
      <>
        <div className="container">
        <TronLinkGuide installed />
        </div>
      </>
      );

    return (
      <>

        <CrowdFunding />
        <Oficina />

      </>



      );

  }

}
export default App;

// {tWeb()}
