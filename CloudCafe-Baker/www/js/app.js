// Ionic Starter App

var firebaseURL = 'https://burning-heat-7015.firebaseio.com/';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', "firebase", "ui.router", "ngCordova", 'starter.controllers', 'starter.services']);

// app.constant('firebaseURL', 'https://burning-heat-7015.firebaseio.com/');

app.config(function($stateProvider, $urlRouterProvider){
    
    $urlRouterProvider.otherwise('add-food');
    
    $stateProvider
        .state('add-food', {
            url:'/add-food',
            templateUrl: 'add-food.html',
            controller:"AddToFood"
        })
        .state('add-stall', {
            url:'/add-stall',
            templateUrl: 'add-stall.html',
            controller:"AddStall"
        });
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});