const { TestHelper } = require('@openzeppelin/cli');
const { Contracts, ZWeb3 } = require('@openzeppelin/upgrades');
const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');


ZWeb3.initialize(web3.currentProvider);

const Counter = Contracts.getFromLocal('Counter');

require('chai').should();

contract('Counter (upgradeable)', function () {

  beforeEach(async function () {
    this.project = await TestHelper();
    this.proxy = await this.project.createProxy(Counter);
  })

  it('should have a value', async function () {
    const result = await this.proxy.methods.value().call();
    result.should.be.bignumber.equal('0');
  })

  it('should increase value', async function () {
    await this.proxy.methods.increase().send();
    const result = await this.proxy.methods.value().call();
    result.should.be.bignumber.equal('1');
  })
})