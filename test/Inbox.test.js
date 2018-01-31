const assert = require('assert');
const ganache = require('ganache-cli'); //local ethereum test network
const Web3 = require('web3'); //web3 is always imported as a constructor
const provider = ganache.provider();  //provider for test network
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const INITIAL_STRING = 'Contract Deployed';
const UPDATED_STRING = 'Message Updated';

beforeEach(async () => {
  //get list of all generated local test network accounts
  accounts = await web3.eth.getAccounts();

  //use an account to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING]})
    .send({ from: accounts[0], gas : '1000000'});
    inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deploys a contract',  () => {
    assert.ok(inbox.options.address);
  });
  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });
  it('can update the message', async () => {
    //don't need to set modifying method, can use trans
    await inbox.methods.setMessage(UPDATED_STRING).send({from: accounts[0]});
    const message = await inbox.methods.message().call();
    assert.equal(message, UPDATED_STRING);
  });
})
