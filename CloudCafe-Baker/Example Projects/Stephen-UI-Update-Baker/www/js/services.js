var app = angular.module('starter.services', ['ionic', "firebase"]);

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