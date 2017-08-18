//  Nice  discussion regarding  Promises chaining/branching  at:
// https://stackoverflow.com/questions/26076511/handling-multiple-catches-in-promise-chain
//https://stackoverflow.com/questions/24662289/when-is-thensuccess-fail-considered-an-antipattern-for-promises/24663315#24663315
//
const doWorkOne = () => {
  return new Promise((resolve, reject) => {
    resolve('Here is some data from One');
  });
};

const doWorkTwo = () => {
  return new Promise((resolve, reject) => {
    resolve('Here is some data from Two');
  });
};

const doWorkThree = () => {
  return new Promise((resolve, reject) => {
    resolve('Here is some data from Three');
  });
};

 // Run chain of Promises:
doWorkOne().then((responseOne) => {
  console.log(responseOne);
  // The return here lets us continue the promise chain.
  // The next then call will fire once doWorkTwo resolve
  return doWorkTwo();
}).then((responseTwo) => {
  console.log(responseTwo);
  return Promise.reject("Rejected by return Promise.reject() between Two and Three"); 
  // throw new Error("responseTwo has problem on board!!!");
  // Amazing: Promise.catch() method catches the Error exception from above.
  // The return from Work Two lets us continue the promise chain to Work Three
  return doWorkThree();
}).then((responseThree) => {
    console.log(responseThree);
}) .catch( (e) => { console.log("catch e:", e);} );

console.log("Promise chain  One Two Three created: ");
