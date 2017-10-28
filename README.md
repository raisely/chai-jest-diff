# Jest-style diffs on Chai equalities

(Based upon [chai-jest-diff](https://github.com/deliciousinsights/chai-jest-diff))

Chai’s assertions have a built-in `showDiff` flag, but do not produce the diff themselves; it’s up to the test runner to produce such output.

The very popular [Mocha](http://mochajs.org/) does that, but Jest doesn’t: its neat diffs are produced internally by its built-in matchers; it doesn’t rely on any sort of metadata to produce diff for third-party assertions.

This Chai plugin tries to fix that, piggybacking on Jest’s `jest-diff` and `jest-matcher-utils` for maximum compatibility with Jest’s built-in expectation output.

# Usage

```js
const chai = require('chai');
const chaiSubset = require('chai-subset');
const chaiSubsetJestDiff = require('chai-jest-diff');

chai.use(chaiSubset);
chai.use(chaiJestDiff());
```

# Options

The plugin factory accepts a boolean argument, `expand`, that mirrors Jest’s `expand` configuration setting, for full-length diffs (instead of close-context diffs).

# Credits

# License

© 2017 Agency Ventures
Original framework © 2017 Delicious Insights

This plugin is provided under the MIT license.  See [`LICENSE.md`](https://github.com/deliciousinsights/chai-jest-diff/blob/master/LICENSE.md) for details.
