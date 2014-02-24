/*
 * Due to the bootstrap mechanism of mocha and chai,
 * it is not possible to run strict here.
 */
require.config({
  baseUrl: '',
  paths: {
    'angular-mocks': 'lib/angular-mocks/angular-mocks',
  },
  shim: {
    'angular-mocks': ['lib/angular/angular'],
    'spec/unit/spec-helper': ['angular-mocks'],
    'spec/e2e/spec-helper': ['angular-mocks']
  },
  urlArgs: 'bust=' + (new Date()).getTime()
});

require(['lib/chai/chai', 'lib/mocha/mocha'], function (chai) {

  expect = chai.expect;
  mocha.setup('bdd');

  require(['spec/unit/spec-helper'], function() {
    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    } else {
      mocha.run();
    }
  });

});
