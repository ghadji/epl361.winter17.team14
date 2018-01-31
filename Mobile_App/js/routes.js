angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('eyeReader.newsFeed', {
    url: '/newsfeed',
    views: {
      'side-menu21': {
        templateUrl: 'templates/newsFeed.html',
        controller: 'newsFeedCtrl'
      }
    }
  })

  .state('eyeReader.settings', {
    url: '/settings',
    views: {
      'side-menu21': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('eyeReader.addSources', {
    url: '/addsources',
    views: {
      'side-menu21': {
        templateUrl: 'templates/addSources.html',
        controller: 'addSourcesCtrl'
      }
    }
  })

  .state('eyeReader', {
    url: '/side-menu',
    templateUrl: 'templates/eyeReader.html',
    controller: 'eyeReaderCtrl'
  })

$urlRouterProvider.otherwise('/side-menu/newsfeed')


});