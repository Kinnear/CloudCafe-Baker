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
var app = angular.module('starter', ['ionic', "firebase", "ui.router"]);

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

// Gets All categories
app.service("GetAllCategory", ["$firebaseArray", function($firebaseArray, $firebaseObject){
    var reference = new Firebase(firebaseURL + "category");
    return $firebaseArray(reference);
}]);

app.service("GetAllFood", ["$firebaseArray", function($firebaseArray, $firebaseObject){
    var reference = new Firebase(firebaseURL + "food");
    return $firebaseArray(reference);
}]);

app.service("GetAllReviews", ["$firebaseArray", function($firebaseArray, $firebaseObject){
    var reference = new Firebase(firebaseURL + "reviews");
    return $firebaseArray(reference);
}]);

app.service("GetAllStalls", ["$firebaseArray", function($firebaseArray, $firebaseObject){
    var reference = new Firebase(firebaseURL + "stalls");
    return $firebaseArray(reference);
}]);

app.service("GetAllTransactions", ["$firebaseArray", function($firebaseArray, $firebaseObject){
    var reference = new Firebase(firebaseURL + "transactions");
    return $firebaseArray(reference);
}]);


// will rarely be used, as categories will usually already predefined by us!
app.controller("AddToCategory", function($scope, GetAllCategory){
    
   $scope.allCategories = GetAllCategory;
   
   $scope.AddCategory = function()
   {
    $scope.allCategories.$add({  "categoryName" : $scope.form.categoryName,
                        "products" : null
                        });
   }
});

app.controller("AddStall", function($scope, GetAllStalls){
    
   $scope.allStalls = GetAllStalls;
   
   $scope.AddStall = function()
   {
    $scope.allStalls.$add({  "URL" : $scope.form.URL,
                             "description" : $scope.form.description,
                             "products" : $scope.form.products,
                             "stallName":$scope.form.stallName
                        });
   }
});

app.controller("AddTransaction", function($scope, GetAllTransactions){
    
   $scope.allTransactions = GetAllTransactions;
   
   $scope.AddTransactions = function()
   {
    $scope.allTransactions.$add({  "foodID" : $scope.form.foodID,
                             "quantity" : $scope.form.quantity,
                             "timestamp": new Date().toString()
                        });
   }
});

app.controller("AddReview", function($scope, GetAllReviews){
    
   $scope.allReviews = GetAllReviews;
   
   $scope.AddReview = function()
   {
    $scope.allReviews.$add({  "comment" : $scope.form.comment,
                             "foodID" : $scope.form.foodID,
                             "reviewRating": new Date().toString(),
                             "transactionID": $scope.form.foodID,
                        });
   }
});

app.controller("AddToFood", function($scope, GetAllFood, GetAllCategory){
    
   $scope.allFood = GetAllFood;
   
   $scope.allFoodCategories = GetAllCategory;
   
   $scope.AddFood = function()
   {
        $scope.allFood.$add({  "categoryID" : $scope.form.categoryID.$id,
                                "description" : $scope.form.description,
                                "foodName": $scope.form.foodName,
                                "halal": $scope.form.halal,
                                "img1": "bear.jpg",
                                "img2": "happy.jpg",
                                "likes": $scope.form.likes,
                                "price": $scope.form.price,
                                "stallID": $scope.form.stallID
                            });
   }
});