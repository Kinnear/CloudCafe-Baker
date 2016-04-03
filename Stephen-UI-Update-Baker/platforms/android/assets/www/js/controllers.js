var app = angular.module('starter.controllers', ["ionic", "ngMessages", "firebase", "ngCordova"]);


//app.service('productService', function() {
//  var productList = [];
//
//  var addProduct = function(newObj) {
//    productList.push(newObj);
//  };
//
//  var getProducts = function(){
//    return productList;
//  };
//
//  return {
//    addProduct: addProduct,
//    getProducts: getProducts
//  };
//
//});

app.controller("FavouriteController", function($scope, FavouriteData) {
  $scope.favouriteFata = FavouriteData;
//   $scope.addItem = function() {
//     var name = prompt("What do you need to buy?");
//     if (name) {
//       $scope.items.$add({
//         "name": name
//       });
//     }
//   };
//
//  $scope.callToAddToProductList = function(currObj){
//    console.log("Here!!");
//    console.log(currObj);
//    productService.addProduct(currObj);
//  };
});


// Authentication controller
// Put your login, register functions here
app.controller('AuthCtrl', function($scope, $ionicHistory) {
  // hide back button in next view
  $ionicHistory.nextViewOptions({
    disableBack: true
  });
});

// Item controller
app.controller('ItemCtrl', function($scope, $state, Items, $stateParams) {
    var id = $stateParams.id;

    // get item from service by item id
    $scope.item = Items.get(1);

    // toggle favorite
    $scope.toggleFav = function() {
      $scope.item.faved = !$scope.item.faved;
    }
});

// Favorite controller
app.controller('FavoriteCtrl', function($scope, $state, Items, CartItemData) {

  // get all favorite items
  $scope.items = Items.all()

  // remove item from favorite
  $scope.remove = function(index) {
    $scope.items.splice(index, 1);
  }

  var first = this;
  first.item = CartItemData.getItemData();

  $scope.addtocart = function(index){
    console.log(index);
    CartItemData.setItemData(index);
    first.item = CartItemData.getItemData();
  }


});

// Active controller
app.controller('ActiveCtrl', function($scope, $state, Items, $ionicSideMenuDelegate) {
  // get all items form Items model
  $scope.items = Items.all();

  // toggle favorite
  $scope.toggleFav = function() {
    $scope.item.faved = !$scope.item.faved;
  }

  // disabled swipe menu
  $ionicSideMenuDelegate.canDragContent(false);
});

// Checkout controller
app.controller('CheckoutCtrl', function($scope, $state) {});

app.controller('ReviewsCtrl', function($scope, $state) {});

// Address controller
app.controller('AddressCtrl', function($scope, $state) {
  function initialize() {
    // set up begining position
    var myLatlng = new google.maps.LatLng(21.0227358,105.8194541);

    // set option for map
    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // init map
    var map = new google.maps.Map(document.getElementById("map"),
      mapOptions);

    // assign to stop
    $scope.map = map;
  }
  // load map when the ui is loaded
  $scope.init = function() {
    initialize();
  }
});

// User controller
app.controller('UserCtrl', function($scope, $state) {})


//empty controllers for new pages here

//controller for settings.html
app.controller('SettingsCtrl', function($scope, $state) {})


//controller for Support support.html
app.controller('SupportCtrl', function($scope, $state) {})

//controller for Shop shop.html
app.controller('ShopCtrl', function($scope, $state) {})

//controller for location.html
app.controller('LocationCtrl', function($scope, $state) {})

//controller for payment.html
app.controller('PaymentCtrl', function($scope, $state) {})

//controller for community.html
app.controller('CommunityCtrl', function($scope, $state) {})

//controller for post.html
app.controller('PostCtrl', function($scope, $state) {})

//controller for firstpayment.html
app.controller('FirstpaymentCtrl', function($scope, $state) {})

//controller for editshop.html
app.controller('EditshopCtrl', function($scope, $state) {})

//controller for bio.html
app.controller('BioCtrl', function($scope, $state) {})

//controller for invitation.html
app.controller('InvitationCtrl', function($scope, $state) {})

//controller for signupthanks.html
app.controller('SignupthanksCtrl', function($scope, $state) {})

//controller for whyrubaking.html
app.controller('WhyrubakingCtrl', function($scope, $state) {})

//controller for editpayment.html
app.controller('EditpaymentCtrl', function($scope, $state) {})

//controller for change.html
app.controller('ChangeCtrl', function($scope, $state) {})

//controller for photographer.html
app.controller('PhotographerCtrl', function($scope, $state) {})

//controller for post2.html
app.controller('Post1Ctrl', function($scope, $state) {})

//controller for post2.html
app.controller('Post2Ctrl', function($scope, $state) {})


//controller for post3.html
app.controller('Post3Ctrl', function($scope, $state) {})

//controller for post4.html
app.controller('Post4Ctrl', function($scope, $state) {})


//controller for listingconfirmation.html
app.controller('ListingCtrl', function($scope, $state) {})

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

app.controller("HideNavaigation", function($scope, $state, $ionicHistory){
    
    $scope.isStateLogin = function()
    {
        return $state.is('login');    
    };
});


app.controller('RegisterBaker', function($scope, $parse, RegistrationDetails, $cordovaCamera) {
    
    $scope.user = {
                    invitationCode: "",
                    email: "",
                    password: "",
                    bakeryImage: undefined,
                    bakeryName: "",
                    bakeryAddress: "",
                    bakeryPostalCode: "",
                    bankAccountNumber: null,
                    description: ""
                  };
                  
   $scope.takePicture = function(scopeValue)
   {   
        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, // if camera "Camera.PictureSourceType.CAMERA,"
            sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100, // height and width of the image
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
                
                // Get the model
                var model = $parse(scopeValue);
                // Assigns a value to it
                model.assign($scope, "data:image/jpeg;base64," + imageData);
                
                // RegistrationDetails.SetBakeryImage(scope.user.bakeryImage);

                // Apply it to the scope
                $scope.$apply();
                
                console.log("Picture taken.");                
            }, function(err) {
                // An error occured. Show a message to the user
                console.log("Couldn't take a picture, there was an error");
            });
   }
    
    
    $scope.SaveRegisterUI = function()
    {
        RegistrationDetails.SetInvitationCode($scope.user.invitationCode);
        RegistrationDetails.SetEmail($scope.user.email);
        RegistrationDetails.SetPassword($scope.user.password);
    }
    
    $scope.SaveBioUI = function()
    {
        RegistrationDetails.SetBakeryImage($scope.user.bakeryImage);
        RegistrationDetails.SetBakeryName($scope.user.bakeryName);
    }
    
    $scope.SaveLocationUI = function()
    {
        RegistrationDetails.SetBakeryAddress($scope.user.bakeryAddress);
        RegistrationDetails.SetBakeryPostalCode($scope.user.bakeryPostalCode);
    }
    
    $scope.SaveFirstPaymentUI = function()
    {
        RegistrationDetails.SetBankAccountNumber($scope.user.bankAccountNumber);
    }
    
    $scope.SaveWhyrubakingUI = function()
    {
        RegistrationDetails.SetDescription($scope.user.description);
        RegistrationDetails.Debug();
    }
});

app.controller('FirebaseRegistration', function($scope, $firebaseAuth, $firebaseArray, RegistrationDetails){
    
    var ref = new Firebase("https://burning-heat-7015.firebaseio.com/");
    var refStalls = new Firebase("https://burning-heat-7015.firebaseio.com/stalls");
    
    $scope.authObj = $firebaseAuth(ref);
    $scope.firebaseAdd = $firebaseArray(refStalls);
    
    $scope.RegisterToFirebase = function()
    {
        // attempt to register a new user
        $scope.authObj.$createUser({
                email: RegistrationDetails.GetEmail(),
                password: RegistrationDetails.GetPassword()
            }).then(function(userData) {
                console.log("User " + userData.uid + " created successfully!");
                
                RegistrationDetails.SetUserID(userData.uid);
                
                var userInfo = {
                                    userID: RegistrationDetails.GetUserID(),
                                    bakeryImage: RegistrationDetails.GetBakeryImage(),
                                    bakeryName: RegistrationDetails.GetBakeryName(),
                                    bakeryAddress: RegistrationDetails.GetBakeryAddress(),
                                    bakeryPostalCode: RegistrationDetails.GetBakeryPostalCode(),
                                    bankAccountNumber: RegistrationDetails.GetBankAccountNumber(),
                                    description: RegistrationDetails.GetDescription()
                                };
            
                //do processing to add login credentials to store in our database
                $scope.firebaseAdd.$add(userInfo).then(function(ref) {
                    var id = ref.key();
                    console.log("added record with id " + id);
                });     

            // attempt to login the recently signed up user
            return $scope.authObj.$authWithPassword({
                email: RegistrationDetails.GetEmail(),
                password: RegistrationDetails.GetPassword()
            });
            }).then(function(authData) {
                console.log("Logged in as:", authData.uid);
            }).catch(function(error) {
                console.error("Error: ", error);
            });        
    };
});



app.controller('LoginBaker', function($scope, $state, $firebaseAuth, RegistrationDetails){
    
    var ref = new Firebase("https://burning-heat-7015.firebaseio.com/");
    
    $scope.authObj = $firebaseAuth(ref);
    
    $scope.email = "";
    $scope.password = "";
    
    $scope.TryLogin = function()
    {
        $scope.authObj.$authWithPassword({
                email: $scope.email,
                password: $scope.password
            }).then(function(authData) {
                console.log("Logged in as:", authData.uid);
                $state.go("post");
            
            }).catch(function(error) {
            console.error("Authentication failed:", error);
        });
    }
});

app.controller("HideSideBarOnThisView", function($scope, $ionicSideMenuDelegate){
    
    $scope.$on('$ionicView.enter', function(){
        $ionicSideMenuDelegate.canDragContent(false);
    });
    $scope.$on('$ionicView.leave', function(){
        $ionicSideMenuDelegate.canDragContent(true);
    });
  
});

app.controller("HideHamburgerMenu", function($scope, $state){
    
    $scope.isStateLogin = function()
    {
        return $state.is('login');    
    };
});

app.controller("DeletePreviousNavigation", function($scope, $ionicHistory){
    
        $scope.$on('$ionicView.beforeEnter', function() {
            //runs every time the page activates
             $ionicHistory.clearCache();
             $ionicHistory.clearHistory();    
    
            // remove your nav router history
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true,
                historyRoot: true
            });
        });
});