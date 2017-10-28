const diff = require('jest-diff')
const { matcherHint, printExpected, printReceived } = require('jest-matcher-utils');

function chaiSubsetJestDiff (expand = false) {
  return (chai, { flag }) => {
    const Assertion = chai.Assertion;
    Assertion.overwriteMethod('containSubset', function (_super) {
      return function containSubset (expected) {
        let pass = true;

        try {
          _super.apply(this, arguments);
        } catch(e) {
          pass = false;
        }

        const received = flag(this, 'object')
        const kind = 'containSubset';
        const message = pass
          ? buildMessage({ expected, received, hintParam: `.not.to.${kind}`, introSuffix: `not to ${kind}`, expand })
          : buildMessage({ expected, received, hintParam: `.to.${kind}`, introSuffix: `to ${kind}`, showDiff: true, expand })

        this.assert(pass, message, message, expected, received, false)
      };
    });
  }
}

function buildMessage ({ expected, received, hintParam, introSuffix, showDiff, expand }) {
  const diffString = showDiff ? diff(expected, received, { expand }) : null

  return matcherHint(hintParam) +
    '\n\n' +
    `Expected value ${introSuffix}:\n` +
    `  ${printExpected(expected)}\n` +
    `Received:\n` +
    `  ${printReceived(received)}` +
    (diffString ? `\n\nDifference:\n\n${diffString}` : '')
}

module.exports = chaiSubsetJestDiff;
