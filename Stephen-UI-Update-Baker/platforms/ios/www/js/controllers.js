var app = angular.module('starter.controllers', ["ionic", "ngMessages", "firebase", "ngCordova"])



app.controller('MyController', function ($scope, $ionicModal) {
    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
        // Execute action
    });
});

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
    $scope.products = { items: null };
    $scope.products.items = Items.all();

    $scope.$watch(function () { return Items.all() }, function (newVal, oldVal) {
        if (typeof newVal !== 'undefined') {
            $scope.products.items = Items.all();
        }
    });

    // toggle favorite
    $scope.toggleFav = function () {
        $scope.products.item.faved = !$scope.products.item.faved;
    }

    $scope.refresh = function () {
        console.log($scope.products.items);
        $scope.products.items = Items.all();
    }

    $scope.changeItem = function (item) {
        $state.go('change', { ItemData: Items.get(item.id) });
    }

    $scope.alterQuantity = function (id, number) {
        if (number < 0) {
            number = 0;
        }
        Items.editFood(id, number)
    }

    // disabled swipe menu
    $ionicSideMenuDelegate.canDragContent(false);
});

// Checkout controller
app.controller('CheckoutCtrl', function ($scope, $state) { });

app.controller('ReviewsCtrl', function ($scope, $state) { });

// Address controller
// app.controller('AddressCtrl', function ($scope, $state) {
//     function initialize() {
//         // set up begining position
//         var myLatlng = new google.maps.LatLng(21.0227358, 105.8194541);

//         // set option for map
//         var mapOptions = {
//             center: myLatlng,
//             zoom: 16,
//             mapTypeId: google.maps.MapTypeId.ROADMAP
//         };
//         // init map
//         var map = new google.maps.Map(document.getElementById("map"),
//             mapOptions);

//         // assign to stop
//         $scope.map = map;
//     }
//     // load map when the ui is loaded
//     $scope.init = function () {
//         initialize();
//     }
// });

// User controller
app.controller('UserCtrl', function ($scope, $state) { })


//empty controllers for new pages here



//controller for Support support.html
app.controller('SupportCtrl', function ($scope, $state) { })


//controller for payment.html
app.controller('PaymentCtrl', function ($scope, $state) { })

//controller for community.html
app.controller('CommunityCtrl', function ($scope, $state) { })

//controller for post.html
app.controller('PostCtrl', function ($scope, $state) { })



//controller for bio.html
app.controller('BioCtrl', function ($scope, $state) { })


//controller for change.html
app.controller('ChangeCtrl', function ($scope, $state, $stateParams, $timeout) {
    var productID = $stateParams.ItemData.id;
    $scope.transactionData = [];

    // Query for Data from firebase for by FoodID
    var foodReference = new Firebase("https://burning-heat-7015.firebaseio.com/transactions");
    foodReference.orderByChild("foodID").equalTo(productID).on("value", function (dataSnapshot) {

        if (dataSnapshot == null) {
            console.log("No Transaction Data for this product!");
        }
        else {
            $scope.transactionData = [];

            dataSnapshot.forEach(function (childSnapshot) {
                $scope.transactionData.push(childSnapshot.val());
            });

            for (var i = 0; i < $scope.transactionData.length; i++) {

                $scope.transactionData[i].pickupEpoch = new Date($scope.transactionData[i].pickupEpoch * 1000);

                var userReference = new Firebase("https://burning-heat-7015.firebaseio.com/users");
                userReference.orderByChild("facebook").equalTo($scope.transactionData[i].customerID).on("value", function (userSnapshot) {

                    $timeout(function () {
                        for (var i = 0; i < $scope.transactionData.length; i++) {
                            var data = userSnapshot.exportVal();
                            var key = Object.keys(data)[0];

                            $scope.transactionData[i].customerName = userSnapshot.child(key).val().username;
                        }
                    });
                });
            }
        }
    });
})

//controller for photographer.html
app.controller('PhotographerCtrl', function ($scope, $state) { })

//controller for listingconfirmation.html
app.controller('ListingCtrl', function ($scope, $state) { })

app.controller('RegisterBaker', function ($scope, $parse, RegistrationDetails, CordovaImageGalleryService) {

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

    $scope.takePicture = function (scopeValue) {

        var temp = CordovaImageGalleryService.ChoosePictureFromGallery().then(function (imageData) {
            // $scope.bakerProfile.bakeryImage = "data:image/jpeg;base64," + imageData;
            // Get the model
            var model = $parse(scopeValue);
            // Assigns a value to it
            model.assign($scope, "data:image/jpeg;base64," + imageData);

            RegistrationDetails.SetBakeryImage($scope.user.bakeryImage);

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
});

app.controller('AddNewFood', function ($scope, $parse, AddNewFoodService, CordovaImageGalleryService, $firebaseArray, $firebaseObject, Auth, $ionicHistory) {

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

    $scope.takePicture = function (index, scopeValue) {

        var temp = CordovaImageGalleryService.ChoosePictureFromGallery().then(function (imageData) {
            var model = $parse(scopeValue);
            model.assign($scope, "data:image/jpeg;base64," + imageData);

            // Save our image to the service 
            AddNewFoodService.SetFoodImg(index, "data:image/jpeg;base64," + imageData);

            RegistrationDetails.SetBakeryImage("data:image/jpeg;base64," + $scope.user.bakeryImage);

        }, function (err) {
            // An error occured. Show a message to the user
            console.log("Couldn't take a picture, there was an error");
        });
    }

    $scope.AddFood = function () {

        console.log($scope.newFood.description);

        for (var i = 0; i < 4; i++) {
            if (AddNewFoodService.GetFoodImg(i) == undefined) {
                AddNewFoodService.SetFoodImg(i, null);
            }
        }

        $scope.firebaseAdd.$add({
            "categoryID": "",
            "description": $scope.newFood.description,
            "foodName": $scope.newFood.foodName,
            "halal": $scope.newFood.halal,
            "img1": AddNewFoodService.GetFoodImg(0),
            "img2": AddNewFoodService.GetFoodImg(1),
            "img3": AddNewFoodService.GetFoodImg(2),
            "img4": AddNewFoodService.GetFoodImg(3),
            "likes": 0,
            "price": $scope.newFood.pricePerServing,
            "stallID": "",
            "preparationTime": $scope.newFood.prepTime,
            "maxQuantity": $scope.newFood.maxQuantity,
        }).then(function (ref) {
            console.log("Added " + ref.key());

            var addID = $firebaseObject(new Firebase("https://burning-heat-7015.firebaseio.com/food/" + ref.key()));

            addID.$loaded().then(function (data) {
                data.id = ref.key();

                data.$save().then(function (saved) {
                    console.log("saved ID");
                });
            });

            // Here, we update our login object.
            console.log(Auth.$getAuth());

            var refUsers = FBref.child("stalls");
            var refUsersCollection = $firebaseArray(refUsers);

            refUsersCollection.$ref().orderByChild("userID").equalTo(Auth.$getAuth().uid).once("value", function (dataSnapshot) {
                var series = dataSnapshot.val();
                var data = dataSnapshot.exportVal();

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

                            var key = ref.key();
                            var json = {};
                            json[key] = true;
                            console.log(json);

                            firebaseProducts.child("products").update(json);
                        }
                        else {
                            var key = ref.key();
                            var products = {};
                            products[key] = true;
                            console.log(products);

                            firebaseProducts.child("products").update(products);
                        }
                    })
                }
            });
        });
    }
});

app.controller('FirebaseRegistration', function ($scope, $state, $firebaseAuth, $firebaseArray, RegistrationDetails, $ionicLoading, $ionicPopup) {

    // Include and run this controller only when your form is about to register
    var ref = new Firebase("https://burning-heat-7015.firebaseio.com/");
    var refStalls = new Firebase("https://burning-heat-7015.firebaseio.com/stalls");

    $scope.authObj = $firebaseAuth(ref);
    $scope.firebaseAdd = $firebaseArray(refStalls);

    $scope.RegisterToFirebase = function () {

        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });

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
            $ionicLoading.hide();

            RegistrationDetails.ResetAllRegistrationVariables();

            $state.go('post');
        }).catch(function (error) {
            $ionicLoading.hide();

            $ionicPopup.alert({

                title: 'Registration Failed', // String. The title of the popup.

                cssClass: '', // String, The custom CSS class name

                subTitle: error, // String (optional). The sub-title of the popup.

                template: '', // String (optional). The html template to place in the popup body.

                templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.

                okText: 'Start over', // String (default: 'OK'). The text of the OK button.

                okType: '', // String (default: 'button-positive'). The type of the OK button.

            });
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
        console.log($scope.class3);
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

    $scope.ResetAnimatedCardVariables = function () {
        $scope.isRegisterVisible = false;
        $scope.isInvitationVisible = false;
        $scope.isCheckemailVisible = false;
        $scope.isBakerybioVisible = false;
        $scope.isBakerylocationVisible = false;
        $scope.isBakeryaccountVisible = false;
        $scope.isBakeryreasonVisible = false;
    }
});

app.controller('LoginBaker', function ($scope, $state, $firebaseAuth, $ionicHistory, RegistrationDetails, Auth, $ionicLoading, $ionicPopup) {

    $scope.email = "";
    $scope.password = "";
    $scope.wrongPasswordMessage = "";

    $scope.TryLogin = function () {

        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });

        Auth.$authWithPassword({
            email: $scope.email,
            password: $scope.password
        }).then(function (authData) {
            console.log("Logged in as:", authData.uid);

            $scope.email = "";
            $scope.password = "";
            $scope.wrongPasswordMessage = "";

            $ionicLoading.hide();
            $state.go("post");
        }).catch(function (error) {
            console.error("Authentication failed:", error);

            $scope.wrongPasswordMessage = "Incorrect Password";
            $ionicLoading.hide();

            $ionicPopup.alert({

                title: 'Login Failed', // String. The title of the popup.

                cssClass: '', // String, The custom CSS class name

                subTitle: 'Please check your credentials', // String (optional). The sub-title of the popup.

                template: '', // String (optional). The html template to place in the popup body.

                templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.

                okText: 'Retry', // String (default: 'OK'). The text of the OK button.

                okType: '', // String (default: 'button-positive'). The type of the OK button.

            });
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

app.controller("NavHistoryModifier", function ($scope, $ionicHistory) {

    $scope.NextViewIsNavRoot = function () {
        // remove your nav router history
        $ionicHistory.nextViewOptions({
            disableBack: false,
            historyRoot: true
        });
    }
});

app.controller("DisplayUserBakeryImage", function ($scope, UserBakerProfile) {

    $scope.userBakerProfile = UserBakerProfile.GetProfile();

    $scope.$on('bakeryUser:updated', function (event, data) {
        // you could inspect the data to see if what you care about changed, or just update your own scope
        $scope.userBakerProfile = UserBakerProfile.GetProfile();
        // console.log($scope.userBakerProfile.bakeryImage);
    });
});
//Edits the profile for the baker
app.controller('ProfileEditor', function ($scope, UserBakerProfile, CordovaImageGalleryService) {

    $scope.bakerProfile = UserBakerProfile.GetProfile();

    $scope.$on('bakeryUser:updated', function (event, data) {
        // you could inspect the data to see if what you care about changed, or just update your own scope
        $scope.bakerProfile = UserBakerProfile.GetProfile();
    });

    $scope.modifyProfile = function () {
        UserBakerProfile.UpdateProfile();
    }

    $scope.updateProfilePicture = function () {
        var temp = CordovaImageGalleryService.ChoosePictureFromGallery().then(function (imageData) {
            $scope.bakerProfile.bakeryImage = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // An error occured. Show a message to the user
            console.log("Couldn't take a picture, there was an error");
        });
    }
});