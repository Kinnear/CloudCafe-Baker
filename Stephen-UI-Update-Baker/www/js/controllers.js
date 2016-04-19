var app = angular.module('starter.controllers', ["ionic", "ngMessages", "firebase", "ngCordova"])

    .directive('flippy', function () {
        return {
            restrict: 'EA',
            link: function ($scope, $elem, $attrs) {

                var options = {
                    flipDuration: ($attrs.flipDuration) ? $attrs.flipDuration : 400,
                    timingFunction: 'ease-in-out',
                };

                // setting flip options
                angular.forEach(['flippy-front', 'flippy-back'], function (name) {
                    var el = $elem.find(name);
                    if (el.length == 1) {
                        angular.forEach(['', '-ms-', '-webkit-'], function (prefix) {
                            angular.element(el[0]).css(prefix + 'transition', 'all ' + options.flipDuration / 1000 + 's ' + options.timingFunction);
                        });
                    }
                });

				/**
				 * behaviour for flipping effect.
				 */
                $scope.flip = function () {
                    $elem.toggleClass('flipped');
                }

            }
        };
    });;



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

app.controller("FavouriteController", function ($scope, FavouriteData) {
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

// Item controller
app.controller('ItemCtrl', function ($scope, $state, Items, $stateParams) {
    var id = $stateParams.id;

    // get item from service by item id
    $scope.item = Items.get(1);

    // toggle favorite
    $scope.toggleFav = function () {
        $scope.item.faved = !$scope.item.faved;
    }
});

// Favorite controller
app.controller('FavoriteCtrl', function ($scope, $state, Items, CartItemData) {

    // get all favorite items
    $scope.items = Items.all()

    // remove item from favorite
    $scope.remove = function (index) {
        $scope.items.splice(index, 1);
    }

    var first = this;
    first.item = CartItemData.getItemData();

    $scope.addtocart = function (index) {
        console.log(index);
        CartItemData.setItemData(index);
        first.item = CartItemData.getItemData();
    }


});

// Active controller
app.controller('ActiveCtrl', function ($scope, $state, Items, $ionicSideMenuDelegate) {
    // get all items form Items model
    $scope.items = Items.all();

    // toggle favorite
    $scope.toggleFav = function () {
        $scope.item.faved = !$scope.item.faved;
    }

    $scope.refresh = function () {
        console.log($scope.items);
        $scope.items = Items.all();
    }

    // disabled swipe menu
    $ionicSideMenuDelegate.canDragContent(false);
});

// Checkout controller
app.controller('CheckoutCtrl', function ($scope, $state) { });

app.controller('ReviewsCtrl', function ($scope, $state) { });

// Address controller
app.controller('AddressCtrl', function ($scope, $state) {
    function initialize() {
        // set up begining position
        var myLatlng = new google.maps.LatLng(21.0227358, 105.8194541);

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
    $scope.init = function () {
        initialize();
    }
});

// User controller
app.controller('UserCtrl', function ($scope, $state) { })


//empty controllers for new pages here

//controller for settings.html
app.controller('SettingsCtrl', function ($scope, $state) { })


//controller for Support support.html
app.controller('SupportCtrl', function ($scope, $state) { })

//controller for Shop shop.html
app.controller('ShopCtrl', function ($scope, $state) { })

//controller for location.html
app.controller('LocationCtrl', function ($scope, $state) { })

//controller for payment.html
app.controller('PaymentCtrl', function ($scope, $state) { })

//controller for community.html
app.controller('CommunityCtrl', function ($scope, $state) { })

//controller for post.html
app.controller('PostCtrl', function ($scope, $state) { })

//controller for firstpayment.html
app.controller('FirstpaymentCtrl', function ($scope, $state) { })

//controller for editshop.html
app.controller('EditshopCtrl', function ($scope, $state) { })

//controller for bio.html
app.controller('BioCtrl', function ($scope, $state) { })

//controller for invitation.html
app.controller('InvitationCtrl', function ($scope, $state) { })

//controller for signupthanks.html
app.controller('SignupthanksCtrl', function ($scope, $state) { })

//controller for whyrubaking.html
app.controller('WhyrubakingCtrl', function ($scope, $state) { })

//controller for editpayment.html
app.controller('EditpaymentCtrl', function ($scope, $state) { })

//controller for change.html
app.controller('ChangeCtrl', function ($scope, $state) { })

//controller for photographer.html
app.controller('PhotographerCtrl', function ($scope, $state) { })

//controller for post2.html
app.controller('Post1Ctrl', function ($scope, $state) { })

//controller for post2.html
app.controller('Post2Ctrl', function ($scope, $state) { })


//controller for post3.html
app.controller('Post3Ctrl', function ($scope, $state) { })

//controller for post4.html
app.controller('Post4Ctrl', function ($scope, $state) { })


//controller for listingconfirmation.html
app.controller('ListingCtrl', function ($scope, $state) { })

app.controller("AddToFood", function ($scope, $parse, GetAllFood, GetAllCategory, $cordovaCamera) {

    $scope.allFood = GetAllFood;
    $scope.newFood;
    $scope.allFoodCategories = GetAllCategory;

    $scope.takePicture = function (scopeValue) {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL, // if camera "Camera.PictureSourceType.CAMERA,"
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {

            // Get the model
            var model = $parse(scopeValue);
            // Assigns a value to it
            model.assign($scope, "data:image/jpeg;base64," + imageData);

            // Apply it to the scope
            $scope.$apply();
            // console.log("Testing" + $scope.img1URI);
            console.log("Picture taken.");
        }, function (err) {
            // An error occured. Show a message to the user
            console.log("Couldn't take a picture, there was an error");
        });
    }

    $scope.AddFood = function () {
        //  console.log($scope.form.categoryID.$id);
        //console.log("$scope.img4URI" + $scope.img4URI);
        console.log("Adding " + newFood)
        $scope.allFood.$add({
            "categoryID": "",
            "description": $scope.newFood.description,
            "foodName": $scope.newFood.foodName,
            "halal": $scope.newFood.halal,
            "img1": $scope.newFood.img1URI,
            "img2": $scope.newFood.img2URI,
            "img3": $scope.newFood.img3URI,
            "img4": $scope.newFood.img4URI,
            "likes": 0,
            "price": $scope.newFood.price,
            "stallID": "",
            "preparationTime": $scope.newFood.prepTime,
            "maxQuantity": $scope.newFood.maxQuantity
        });
    }

});

app.controller("HideNavaigation", function ($scope, $state, $ionicHistory) {

    $scope.isStateLogin = function () {
        return $state.is('login');
    };
});

app.controller('RegisterBaker', function ($scope, $parse, RegistrationDetails, $cordovaCamera) {

    $scope.user = {
        invitationCode: "",
        email: "",
        password: "",
        bakeryImage: null,
        bakeryName: "",
        bakeryAddress: "",
        bakeryPostalCode: "",
        bankAccountNumber: null,
        description: ""
    };

    $scope.takePicture = function (scopeValue) {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL, // if camera "Camera.PictureSourceType.CAMERA,"
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100, // height and width of the image
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {

            // Get the model
            var model = $parse(scopeValue);
            // Assigns a value to it
            model.assign($scope, "data:image/jpeg;base64," + imageData);

            // RegistrationDetails.SetBakeryImage(scope.user.bakeryImage);

            // Apply it to the scope
            $scope.$apply();

            console.log("Picture taken.");
        }, function (err) {
            // An error occured. Show a message to the user
            console.log("Couldn't take a picture, there was an error");
        });
    }

    $scope.SaveRegisterUI = function () {
        console.log("1");
        RegistrationDetails.SetInvitationCode($scope.user.invitationCode);
        RegistrationDetails.SetEmail($scope.user.email);
        RegistrationDetails.SetPassword($scope.user.password);
    }

    $scope.SaveBioUI = function () {
        console.log("2");
        RegistrationDetails.SetBakeryImage($scope.user.bakeryImage);
        RegistrationDetails.SetBakeryName($scope.user.bakeryName);
    }

    $scope.SaveLocationUI = function () {
        console.log("3");
        RegistrationDetails.SetBakeryAddress($scope.user.bakeryAddress);
        RegistrationDetails.SetBakeryPostalCode($scope.user.bakeryPostalCode);
    }

    $scope.SaveFirstPaymentUI = function () {
        console.log("4");
        RegistrationDetails.SetBankAccountNumber($scope.user.bankAccountNumber);
    }

    $scope.SaveWhyrubakingUI = function () {
        console.log("5");
        RegistrationDetails.SetDescription($scope.user.description);
        RegistrationDetails.Debug();
    }

    $scope.ResetAllRegistrationVariables = function () {
        $scope.user = {
            invitationCode: "",
            email: "",
            password: "",
            bakeryImage: null,
            bakeryName: "",
            bakeryAddress: "",
            bakeryPostalCode: "",
            bankAccountNumber: null,
            description: ""
        };
    }
});

app.controller('post2', function ($scope, $state, AddNewFoodService) {
    $scope.newFood = AddNewFoodService;
});

app.controller('post4', function ($scope, $state, $firebaseArray, AddNewFoodService) {
    $scope.newFood = AddNewFoodService;
    $scope.AddFood = function () {
        var ref = new Firebase("https://burning-heat-7015.firebaseio.com/");
        var refFoods = new Firebase("https://burning-heat-7015.firebaseio.com/food");
        var refFoodsAdd = $firebaseArray(refFoods);
        refFoodsAdd.$add({
            "categoryID": "",
            "description": $scope.newFood.description,
            "foodName": $scope.newFood.foodName,
            "halal": $scope.newFood.halal,
            "img1": "",
            "img2": "",
            "img3": "",
            "img4": "",
            "likes": 0,
            "price": $scope.newFood.pricePerServing,
            "endDate": $scope.newFood.endDate,
            "maxQuantity": $scope.newFood.quantityCap
        })
    }
});


app.controller('AddNewFood', function ($scope, $parse, RegistrationDetails, AddNewFoodService, $cordovaCamera, $firebaseArray, $firebaseObject, Auth) {

    var newFood = {
        userID: "",
        foodName: "",
        bakeryImage: "",
        description: "",
        pricePerServing: "",
        quantityCap: "",

    };
    $scope.newFood = AddNewFoodService;
    var FBref = new Firebase("https://burning-heat-7015.firebaseio.com");
    var refFood = FBref.child("food");
    $scope.firebaseAdd = $firebaseArray(refFood);
    //console.log(Auth.$getAuth().uid);
    //console.log(Auth.$getAuth());

    var onComplete = function (error) {
        if (error) {
            console.log('Synchronization failed');
        } else {
            console.log('Synchronization succeeded');
            var newfirebaseProducts = new Firebase("https://burning-heat-7015.firebaseio.com/stalls/-KDdoqZkDI4GCXm0YyZS/products");
            var itemsFB = $firebaseArray(newfirebaseProducts);
            itemsFB.$loaded().then(function () {
                var key = "food1";
                var json = {};
                json[key] = true;
                console.log(json);

                // var newfirebaseProducts = new Firebase("https://burning-heat-7015.firebaseio.com/stalls/-KDdoqZkDI4GCXm0YyZS/products");
                // var itemsFB = $firebaseArray(newfirebaseProducts);
                // itemsFB.$loaded().then(function () {
                //     console.log("Before: " + itemsFB.length);
                // });

                newfirebaseProducts.update(json);
                console.log("Update Called");
            });   
        }
    };

    $scope.takePicture = function (scopeValue) {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL, // if camera "Camera.PictureSourceType.CAMERA,"
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100, // height and width of the image
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {

            // Get the model
            var model = $parse(scopeValue);
            // Assigns a value to it
            model.assign($scope, "data:image/jpeg;base64," + imageData);

            // RegistrationDetails.SetBakeryImage(scope.user.bakeryImage);

            // Apply it to the scope
            $scope.$apply();

            console.log("Picture taken.");
        }, function (err) {
            // An error occured. Show a message to the user
            console.log("Couldn't take a picture, there was an error");
            var refUsers = ref.child("stalls");
        });
    }

    $scope.SavePost = function () {
        RegistrationDetails.
            AddNewFoodService.SetDescription($scope.newFood.userID);
        AddNewFoodService.SetDescription($scope.user.description);
        AddNewFoodService.SetDescription($scope.user.description);
        AddNewFoodService.SetDescription($scope.user.description);
        AddNewFoodService.SetDescription($scope.user.description);
        AddNewFoodService.Debug();
    }

    $scope.AddFood = function () {
        //  console.log($scope.form.categoryID.$id);
        //console.log("$scope.img4URI" + $scope.img4URI);
        //console.log("Adding " + newFood)
        $scope.firebaseAdd.$add({
            "categoryID": "",
            "description": $scope.newFood.description,
            "foodName": $scope.newFood.foodName,
            "halal": $scope.newFood.halal,
            "img1": "",
            "img2": "",
            "img3": "",
            "img4": "",
            "likes": 0,
            "price": $scope.newFood.pricePerServing,
            "stallID": "",
            "preparationTime": $scope.newFood.prepTime,
            "maxQuantity": $scope.newFood.maxQuantity
        }).then(function (ref) {
            console.log("Added " + ref.key());
            // Here, we update our login object.
            console.log(Auth.$getAuth());

            var refUsers = FBref.child("stalls");
            var refUsersCollection = $firebaseArray(refUsers);
            //console.log("What");
            refUsersCollection.$ref().orderByChild("userID").equalTo(Auth.$getAuth().uid).once("value", function (dataSnapshot) {
                var series = dataSnapshot.val();
                var data = dataSnapshot.exportVal();
                //console.log("the");

                if (series) {
                    // This prints the current object in the array of products under their user id
                    console.log(dataSnapshot.child(Object.keys(data)[0]).child("products").val());
                    
                    // This is their user ID
                    console.log(Object.keys(data)[0]);
                    var firebaseProducts = new Firebase("https://burning-heat-7015.firebaseio.com/stalls/" + Object.keys(data)[0].toString());
                    var obj = $firebaseObject(firebaseProducts);
                    obj.$bindTo($scope, "data").then(function () {
                        console.log($scope.data);
                        if ($scope.data.hasOwnProperty("products")) {
                            console.log("HAVE!");

                            var key = ref.key();
                            var json = {};
                            json[key] = true;
                            console.log(json);

                            // var newfirebaseProducts = new Firebase("https://burning-heat-7015.firebaseio.com/stalls/-KDdoqZkDI4GCXm0YyZS/products");
                            // var itemsFB = $firebaseArray(newfirebaseProducts);
                            // itemsFB.$loaded().then(function () {
                            //     console.log("Before: " + itemsFB.length);
                            // });

                            firebaseProducts.child("products").update(json, onComplete);
                            console.log("Update Called");
                            // var newfirebaseProducts = new Firebase("https://burning-heat-7015.firebaseio.com/stalls/-KDdoqZkDI4GCXm0YyZS/products");
                            // var itemsFB = $firebaseArray(newfirebaseProducts);
                            // itemsFB.$loaded().then(function () {
                            //     console.log("After: " + itemsFB.length);
                            // });
                        }
                        else {
                            console.log("NOPE");

                            var key = ref.key();
                            var products = {};
                            products[key] = true;
                            console.log(products);

                            firebaseProducts.child("products").update(products, onComplete);
                            var newfirebaseProducts = new Firebase("https://burning-heat-7015.firebaseio.com/stalls/-KDdoqZkDI4GCXm0YyZS/products");
                            var itemsFB = $firebaseArray(newfirebaseProducts);
                            itemsFB.$loaded().then(function () {
                                console.log(itemsFB.length);
                            });
                            //$scope.data.products = { key : true };
                        }
                    })
                    //console.log(dataSnapshot.child("products").val());
                    //var obj = $firebaseObject(dataSnapshot.child("products"));
                }
            });
        });
    }
});

app.controller('FirebaseRegistration', function ($scope, $state, $firebaseAuth, $firebaseArray, RegistrationDetails) {

    // Include and run this controller only when your form is about to register
    var ref = new Firebase("https://burning-heat-7015.firebaseio.com/");
    var refStalls = new Firebase("https://burning-heat-7015.firebaseio.com/stalls");

    $scope.authObj = $firebaseAuth(ref);
    $scope.firebaseAdd = $firebaseArray(refStalls);

    $scope.RegisterToFirebase = function () {
        // attempt to register a new user
        $scope.authObj.$createUser({
            email: RegistrationDetails.GetEmail(),
            password: RegistrationDetails.GetPassword()
        }).then(function (userData) {
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
            $scope.firebaseAdd.$add(userInfo).then(function (ref) {
                var id = ref.key();
                console.log("added record with id " + id);
            });

            // attempt to login the recently signed up user
            return $scope.authObj.$authWithPassword({
                email: RegistrationDetails.GetEmail(),
                password: RegistrationDetails.GetPassword()
            });
        }).then(function (authData) {
            console.log("Logged in as:", authData.uid);
            $state.go('post');
        }).catch(function (error) {
            console.error("Error: ", error);
        });
    };
});

app.controller('AnimatedLoginCards', function ($scope, $state, $firebaseAuth, $ionicHistory) {

    // hide back button in next view
    $ionicHistory.nextViewOptions({
        disableBack: true
    });

    $scope.isRegisterVisible = false;
    $scope.isInvitationVisible = false;
    $scope.isCheckemailVisible = false;
    $scope.isBakerybioVisible = false;
    $scope.isBakerylocationVisible = false;
    $scope.isBakeryaccountVisible = false;
    $scope.isBakeryreasonVisible = false;

    $scope.class = "class";
    $scope.class2 = "class2";
    $scope.class3 = "class3";
    $scope.class4 = "class4";
    $scope.class5 = "class5";
    $scope.class6 = "class6";
    $scope.class7 = "class7";
    $scope.class8 = "class8";

    $scope.changeClass = function () {
        $scope.class = "animated fadeOutLeft";
        $scope.class2 = "animated fadeInRight";
        $scope.isRegisterVisible = true;
    }

    $scope.changeClass2 = function () {
        $scope.class2 = "animated fadeOutLeft";
        $scope.class3 = "animated fadeInRight";
        $scope.isInvitationVisible = true;
    }

    $scope.changeClass3 = function () {
        $scope.class3 = "animated fadeOutLeft";
        $scope.class4 = "animated fadeInRight";
        $scope.isCheckemailVisible = true;
    }

    $scope.changeClass4 = function () {
        $scope.class2 = "animated fadeOutLeft";
        $scope.class5 = "animated fadeInRight";
        $scope.isBakerybioVisible = true;
    }

    $scope.changeClass5 = function () {
        $scope.class5 = "animated fadeOutLeft";
        $scope.class6 = "animated fadeInRight";
        $scope.isBakerylocationVisible = true;
    }

    $scope.changeClass6 = function () {
        $scope.class6 = "animated fadeOutLeft";
        $scope.class7 = "animated fadeInRight";
        $scope.isBakeryaccountVisible = true;
    }

    $scope.changeClass7 = function () {
        $scope.class7 = "animated fadeOutLeft";
        $scope.class8 = "animated fadeInRight";
        $scope.isBakeryreasonVisible = true;
    }
    
    $scope.ResetAnimatedCardVariables = function () 
    {
        $scope.isRegisterVisible = false;
        $scope.isInvitationVisible = false;
        $scope.isCheckemailVisible = false;
        $scope.isBakerybioVisible = false;
        $scope.isBakerylocationVisible = false;
        $scope.isBakeryaccountVisible = false;
        $scope.isBakeryreasonVisible = false;
    }
});

app.controller('LoginBaker', function ($scope, $state, $firebaseAuth, $ionicHistory, RegistrationDetails, Auth) {

    $scope.email = "";
    $scope.password = "";
    $scope.wrongPasswordMessage = "";

    $scope.TryLogin = function () {
        Auth.$authWithPassword({
            email: $scope.email,
            password: $scope.password
        }).then(function (authData) {
            console.log("Logged in as:", authData.uid);
            $state.go("post");
        }).catch(function (error) {
            console.error("Authentication failed:", error);

            $scope.wrongPasswordMessage = "The specified password is incorrect.";
        });
    }
});

app.controller('LogoutAuth', function ($scope, $state, Auth) {

    $scope.Logout = function () {
        Auth.$unauth();
        $state.go('login');
    }
})

app.controller("HideSideBarOnThisView", function ($scope, $ionicSideMenuDelegate) {

    $scope.$on('$ionicView.beforeEnter', function () {
        $ionicSideMenuDelegate.canDragContent(false);
    });
    $scope.$on('$ionicView.leave', function () {
        $ionicSideMenuDelegate.canDragContent(true);
    });
});

app.controller("HideHamburgerMenu", function ($scope, $state) {

    $scope.isStateLogin = function () {

        return $state.is('login') || $state.is('register');
    };
});

app.controller("DeletePreviousNavigation", function ($scope, $ionicHistory) {

    $scope.$on('$ionicView.beforeEnter', function () {
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