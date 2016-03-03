var app = angular.module('starter.services', ['ionic', "firebase"]);

app.service("CurrentUserData", function()
{
    var authenticationData = null;
    
    return {
            getAuthenticationData: function () {
                return authenticationData;
            },
            setAuthenticationData: function(data) {
                authenticationData = data;
            },
            clearAuthenticationData: function(data) {
                authenticationData = null;
            }
        };    
});

// Gets the entire databse
app.service("GetAll", ["$firebaseArray", function($firebaseArray, $firebaseObject){
    var reference = new Firebase(firebaseURL);
    return $firebaseArray(reference);
}]);

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