var app = angular.module('starter.controllers', ['ionic', "firebase", "ui.router", "ngCordova"]);

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

app.controller("AddToFood", function($scope, $parse, GetAllFood, GetAllCategory, $cordovaCamera){
    
   $scope.allFood = GetAllFood;
   
   $scope.allFoodCategories = GetAllCategory;
   
   $scope.takePicture = function(scopeValue) 
   {   
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, // if camera "Camera.PictureSourceType.CAMERA,"
            sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
                
                // Get the model
                var model = $parse(scopeValue);
                // Assigns a value to it
                model.assign($scope, "data:image/jpeg;base64," + imageData);

                // Apply it to the scope
                $scope.$apply();
                // console.log("Testing" + $scope.img1URI);
                console.log("Picture taken.");                
            }, function(err) {
                // An error occured. Show a message to the user
                console.log("Couldn't take a picture, there was an error");
            });
   }
   
   $scope.AddFood = function()
   {
    //  console.log($scope.form.categoryID.$id);
        console.log("$scope.img4URI" + $scope.img4URI);
       
        $scope.allFood.$add({   "categoryID" : $scope.form.categoryID.$id,
                                "description" : $scope.form.description,
                                "foodName": $scope.form.foodName,
                                "halal": $scope.form.halal,
                                "img1": $scope.img1URI,
                                "img2": $scope.img2URI,
                                "img3": $scope.img3URI,
                                "img4": $scope.img4URI,
                                "likes": 0,
                                "price": $scope.form.price,
                                "stallID": $scope.form.stallID
                            });
   }
});

//controller for new.html
app.controller('NewCtrl', function($scope, $state) {})