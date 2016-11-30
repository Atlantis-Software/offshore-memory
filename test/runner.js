/**
 * Run integration tests
 *
 * Uses the `offshore-adapter-tests` module to
 * run mocha tests against the appropriate version
 * of Offshore.  Only the interfaces explicitly
 * declared in this adapter's `package.json` file
 * are tested. (e.g. `queryable`, `semantic`, etc.)
 */


/**
 * Module dependencies
 */

var util = require('util');
var mocha = require('mocha');
var log = require('captains-log')();
var TestRunner = require('offshore-adapter-tests');
var Adapter = require('../lib/adapter');



// Grab targeted interfaces from this adapter's `package.json` file:
var package = {},
  interfaces = [],
  features = [];
try {
  package = require('../package.json');
  interfaces = package.offshoreAdapter.interfaces;
  features = package.offshoreAdapter.features;
} catch (e) {
  throw new Error(
    '\n' +
    'Could not read supported interfaces from `offshoreAdapter.interfaces`' + '\n' +
    'in this adapter\'s `package.json` file ::' + '\n' +
    util.inspect(e)
  );
}



log.info('Testing `' + package.name + '`, a Offshore adapter.');
log.info('Running `offshore-adapter-tests` against ' + interfaces.length + ' interfaces...');
log.info('( ' + interfaces.join(', ') + ' )');
console.log();



/**
 * Integration Test Runner
 *
 * Uses the `offshore-adapter-tests` module to
 * run mocha tests against the specified interfaces
 * of the currently-implemented Offshore adapter API.
 */
new TestRunner({

  // Mocha opts
  mocha: {
    bail: true
  },

  // Load the adapter module.
  adapter: Adapter,

  // Default connection config to use.
  config: {
    schema: false
  },

  // The set of adapter interfaces to test against.
  // (grabbed these from this adapter's package.json file above)
  interfaces: interfaces,
  
  // The set of adapter features to test against.
  // (grabbed these from this adapter's package.json file above)
  features: features,

  // Most databases implement 'semantic' and 'queryable'.
  
  // Return code non zero if any test fails
  failOnError: true
});
