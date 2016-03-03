var app = angular.module('starter.controllers', ['ionic', "firebase", "ui.router", "ngCordova"]);

app.controller("FacebookAuthentication", function($scope, CurrentUserData){

    $scope.userData = CurrentUserData.getAuthenticationData();
    $scope.loggedIn = false;
    
    // check if the user is logged in straight away
    var ref = new Firebase(firebaseURL);
    ref.onAuth(authDataCallback);

    $scope.LoginFacebook = function(value)
    {
        ref.authWithOAuthPopup(value, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
                // $scope.loggedIn = false;
            } else {
                console.log("Authenticated successfully with payload:", authData);
                
                // Apply our scope outside of angular on our html as well.
                $scope.$apply();
            }
        });
    }

    $scope.LogoutAuthentication = function()
    {
        ref.unauth();
        CurrentUserData.clearAuthenticationData();
        $scope.userData = null;
        $scope.loggedIn = false;
    };
    
    function authDataCallback(authData) 
    {
        if (authData) 
        {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            
            CurrentUserData.setAuthenticationData(authData);
            
            $scope.userData = CurrentUserData.getAuthenticationData();
            $scope.loggedIn = true;
            console.log("logged in code executed");
            console.log("Logged in is: " + $scope.loggedIn);
            // $scope.currentUsername = authData.facebook.displayName;
        }
        else 
        {
            console.log("User is logged out");
        }
    }
});


// // we would probably save a profile when we register new users on our site
// // we could also read the profile to see if it's null
// // here we will just simulate this with an isNewUser boolean
// var isNewUser = true;
// var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
// ref.onAuth(function(authData) {
//   if (authData && isNewUser) {
//     // save the user's profile into the database so we can list users,
//     // use them in Security and Firebase Rules, and show profiles
//     ref.child("users").child(authData.uid).set({
//       provider: authData.provider,
//       name: getName(authData)
//     });
//   }
// });
// // find a suitable name based on the meta info given by each provider
// function getName(authData) {
//   switch(authData.provider) {
//      case 'password':
//        return authData.password.email.replace(/@.*/, '');
//      case 'twitter':
//        return authData.twitter.displayName;
//      case 'facebook':
//        return authData.facebook.displayName;
//   }
// }
// {
//   "users": {
//     "c20f3bea-906f-4cd6-b38a-175bb4506287": {
//       "provider": "password",
//       "name": "bobtony"
//     },
//     "1376ecee-fc04-4809-9de9-ff41747e12a7": {
//       "provider": "twitter",
//       "name": "Andrew Lee"
//     },
//     "9550be91-ab5d-41c1-8cd0-24c883586071": {
//       "provider": "facebook",
//       "name": "James Tamplin"
//     }
//   }
// }

app.controller("AddUser", function($scope, GetAll){
   
//    $scope.all = GetAll;
   var temp = new Firebase("https://burning-heat-7015.firebaseio.com/");
    
   $scope.AddUser = function()
   {
        // console.log($scope.form.categoryID.$id);
        // console.log("$scope.img4URI" + $scope.img4URI);
        // temp.set({  
        //             "users":{
        //                 "userID":
        //                 {
        //                     "username": "Kinnear",
        //                     "baker": true,
        //                     "stallID": 18821912
        //                 }
        //             }
    
        //          });
   }
});

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