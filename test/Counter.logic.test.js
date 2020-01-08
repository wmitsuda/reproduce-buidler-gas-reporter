const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');

const Counter = artifacts.require('Counter');

require('chai').should();

contract('Counter (logic)', function () {

  beforeEach(async function () {
    this.counter = await Counter.new();
  })

  it('should have a value', async function () {
    const result = await this.counter.value();
    result.should.be.bignumber.equal('0');
  })

  it('should increase value', async function () {
    await this.counter.increase();
    const result = await this.counter.value();
    result.should.be.bignumber.equal('1');
  })
})