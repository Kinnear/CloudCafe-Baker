// Ionic Starter App

/*
- ID (int)
- Name (string)
- stallname (string)
- stallID (string)
- desc (string)
- price (float)
- quantity (int)
- URL (string)
- time (timestamp)
- halal (bool)
- rating (int)
- likes (int)
*/

var firebaseURL = 'https://burning-heat-7015.firebaseio.com/';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', "firebase"]);

// app.constant('firebaseURL', 'https://burning-heat-7015.firebaseio.com/');

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

app.service("Database", ["$firebaseArray", function($firebaseArray, $firebaseObject){
    var reference = new Firebase(firebaseURL);
    return $firebaseArray(reference);
}]);;

app.controller("SendToFireBase", function($scope, Database){
   
   $scope.data = Database;
   
   $scope.AddItem = function()
   {
    //    console.log($scope.form.halal);
       
       // if this is the very first entry in the database
       if($scope.data.length == 0)
       {
           console.log($scope.data);
           $scope.form.id = 1;
       }
       // else we just auto increment the entry in the database
       else
       {
            $scope.form.id = $scope.data[$scope.data.length - 1].id + 1;    
       }
       
       $scope.data.$add({"id" : $scope.form.id,
                        "name" : $scope.form.name,
                        "stallName" : $scope.form.stallName,
                        "stallID" : $scope.form.stallID,
                        "desc" : $scope.form.desc,
                        "price" : $scope.form.price,
                        "quantity" : $scope.form.quantity,
                        "url" : $scope.form.url,
                        "time" : new Date().toString(),
                        "halal" : $scope.form.halal,
                        "rating" : $scope.form.rating,
                        "likes" : $scope.form.likes});
   }
   
});