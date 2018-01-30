const assert = require('assert');
const ganache = require('ganache-cli'); //local ethereum test network
const Web3 = require('web3'); //web3 is always imported as a constructor
const web3 = new Web3(ganache.provider()); //provider for test network


//test template for mocha
// class Car {
//   park(){
//     return 'stopped';
//   }
//
//   drive(){
//     return 'vroom';
//   }
// }
// 
// let car;
//
// beforeEach(() => {
//   car = new Car();
// })
//
// describe('Car', () => {
//   it('park should return string', () => {
//     assert.equal(car.park(), 'stopped');
//   })
//
//   it('drive should return string', () => {
//     assert.equal(car.drive(), 'vroom');
//   })
// })
