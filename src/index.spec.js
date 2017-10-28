const chai = require('chai');
const chaiSubset = require('chai-subset');
const chaiSubsetJestDiff = require('./index');

const expect = chai.expect;
chai.use(chaiSubset);
chai.use(chaiSubsetJestDiff());

describe('Jest-style diffing', () => {
  const expected = { firstName: 'bob',
    parents: [
      { firstName: 'Jane' },
    ]
  };

  const nonMatch = {
    parents: [
      { lastName: 'Benjamin' },
    ]
  };

  const match = {
    firstName: 'bob',
    parents: [
      { firstName: 'Jane' },
      { firstName: 'Alan' },
    ]
  }

  it('should work for chaiSubset', () => {
    expect(() => {
      expect(nonMatch).to.containSubset(expected);
    }).to.throw(/Expected value to containSubset:.*bob.*Received:.*Benjamin(?!Difference)/s);
  });

  it('should not throw when object does contain', () => {
    expect(match).to.containSubset(expected);
  });
})
