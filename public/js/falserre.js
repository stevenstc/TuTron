window.onload = async function() {
  if (!window.tronWeb) {
    const HttpProvider = TronWeb.providers.HttpProvider;
  /*  const fullNode = new HttpProvider('https://api.trongrid.io');
    const solidityNode = new HttpProvider('https://api.trongrid.io');
    const eventServer = 'https://api.trongrid.io/';
*/

const defaultPrivateKey = "TBNne3w43vVf5JHkouuQP7euck3LQVz6YX";
const fullNode = new HttpProvider('https://api.trongrid.io:8090'); // Full node http endpoint
const solidityNode = new HttpProvider('https://api.trongrid.io:8091'); // Solidity node http endpoint

const eventServer = 'https://api.trongrid.io/'; // Contract events http endpoint
    const tronWeb = new TronWeb(
        fullNode,
        solidityNode,
        eventServer
    );
    
    const address= "TVpkUPW83niwUygfELaq4ZB9U5zvYeKKvb";
    //const buyresult= tronWeb.getEventResult(address, {eventName:"BUY", size:100, filters:{from: "TCAAJ4oqPLoEnEVmsFZJUp75ocfV9cqSuH"}});
    
    //const amount=tronWeb.trx.getTransactionInfo("bd845e912b5c256cbbe64625662e8927f5fd26b3469490a8d176802d96a51f21");
    //console.log(amount);
   //console.log(await buyresult);
//console.log(buyresult.values("__proto__"));
//const propertyNames2 = Object.values(buyresult);
//console.log(propertyNames2);
//const propertyNames = Object.values(await buyresult);
//const propertyNames = Object.values(await buyresult);

//console.log(propertyNames);

//console.log(propertyNames["0"]["result"]["amount"]);

//const parsedJSON = JSON.parse(propertyNames);
/*Object.keys(propertyNames).forEach(item => console.log("item: "+propertyNames["0"]["result"]["amount"]));
let totalmonto= 0;
for (let key of Object.keys(propertyNames)) {
  let mealName = propertyNames[key]["result"]["amount"];
  // ... do something with mealName
  console.log("monto");
  if (mealName!=undefined)
  {
  mealName= mealName.toString();
  totalmonto+=parseInt(
      mealName);
  }
  console.log(mealName);
}
*/
alert ("Total de inversión: "+totalmonto);
/*
let result= JSON.stringify(buyresult);

//console.log(result);
result = Object.keys(propertyNames).map((key) => [Number(key), propertyNames[key]]);
*/
//console.log(result);
//console.log(JSON.parse(result));

//const tronGrid = new TronGrid(tronWeb);
  //alert (await tronWeb.trx.getBalance(address));

const balance = await tronWeb.trx.getBalance(address);
   window.tronWeb = tronWeb;
   /* if(window.tronWeb){
        document.getElementById('wal').innerHTML='you wallet  is '+window.tronWeb.defaultAddress.base58+'<br>'
    }*/


  }
  //console.log(tronWeb.account.getTransactions("TVpkUPW83niwUygfELaq4ZB9U5zvYeKKvb", {only_to: true}));
};



if(window.tronWeb && window.tronWeb.defaultAddress.base58){
     document.getElementById('wal').innerHTML='you wallet  is '+window.tronWeb.defaultAddress.base58+'<br>'

     document.getElementById('reflink').innerHTML='<div id="yourRefLink" style="font-weight:bold; color:orange;">https://youtron777.com/?ref='+window.tronWeb.defaultAddress.base58+'</div>Copy your referral link.<br>'
    }else {
    document.getElementById('reflink').innerHTML='<div id="yourRefLink" style="font-weight:bold;">There is not link...</div>You will get your referral link after the investment.<br>'
   }


function evaluar3() {

                        var tipos=(document.getElementById("tres").value)*(1000000);
                        alert (tipos);
                        var tipo=tipos/1000000;
                        var atributo = document.getElementById('patro').innerHTML;
                        atributo = atributo.replace('you sponsor is ', '');
                          alert (atributo);
                        if (tipo >  69.9999) {
                            alert("Do you want to invest "+tipo+" TRX? and you sponsor is "+atributo)
                            gettronweb(tipos,atributo);
                        }else{
                            alert("the minimum amount is 70 TRX")

                            }
                         }

/* acion tronweb*/
 function gettronweb(tipos,atributo){
            if(window.tronWeb && window.tronWeb.defaultAddress.base58){
               swal({
                      title: "congratulations, you just need to confirm. Are you sure to invest?",
                      text: "su direccion de billetera TRX en tronlink es: "+window.tronWeb.defaultAddress.base58,
                      icon: "success",
                      buttons: true,
                      dangerMode: true,
                    })
                    .then((willDelete) => {
                      if (willDelete) {
                         async function triggercontract(){
                          try {
                              let instance = await tronWeb.contract().at('TVpkUPW83niwUygfELaq4ZB9U5zvYeKKvb');
alert (instance);
                              let res = await instance.invest(atributo).send({
                                  feeLimit:100_000_000,
                                  callValue:tipos,
                                  shouldPollResponse:true
                              });


                              alert(atributo);

                          } catch (error) {
                              alert(error);
                          }
                      }

                      triggercontract();
                      } else {
                        //swal("Your imaginary file is safe!");
                      }
                    });

                var tronweb = window.tronWeb;

                console.log(tronweb);


            }else  {
            swal({
                      title: "Debes ingresar en tu billetera",
                      text: "No se hallo una billetera trx ",
                      //icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    })

                    }

        }


function copiarAlPortapapeles(id_elemento) {
  var aux = document.createElement("input");
  aux.setAttribute("value", document.getElementById(id_elemento).innerHTML);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
}
