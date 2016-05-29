var app = angular.module('starter.services', ["ionic", "ngMessages", "firebase", "ngCordova"]);

// our authenticated user details
app.factory("Auth", ["$firebaseAuth", function ($firebaseAuth) {
    var ref = new Firebase("https://burning-heat-7015.firebaseio.com/");
    return $firebaseAuth(ref);
}
]);

app.service("CartItemData", function Item() {
    var item = this;
    //item.message = "DefaultHello (Service)/";
    this.setItemData = function (SetValue) {
        console.log("Setting Values");
        item = SetValue;
    }

    this.getItemData = function () {
        return item;
    }
});

app.factory('Items', function ($firebaseArray, $firebaseObject, Auth, $ionicLoading, $ionicPopup, $timeout) {
    var products = { items: [] };
    var refFB = new Firebase("https://burning-heat-7015.firebaseio.com");
    var refUsers = refFB.child("stalls");
    $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>'
    });
    refUsers.orderByChild("userID").equalTo(Auth.$getAuth().uid).on("value", function (dataSnapshot) {
        // User Data, This is to get the key so that I can access their products. 
        var data = dataSnapshot.exportVal();

        var firebaseProducts = new Firebase("https://burning-heat-7015.firebaseio.com/stalls/" + Object.keys(data)[0].toString() + "/products");

        firebaseProducts.on("value", function (snapshot) {

            products.items = [];

            for (i = 0; i < snapshot.numChildren(); i++) {
                var newpost = snapshot.val();
                var refFood = new Firebase("https://burning-heat-7015.firebaseio.com/food/" + Object.keys(newpost)[i]);

                // if any products did update.
                refFood.on("value", function (snapshot2) {

                    var newpost2 = snapshot2.val();

                    // Add any new products updated on the database
                    for (var a = 0; a < products.items.length; a++) {
                        if (products.items[a].id == newpost2.id) {
                            products.items[a] = newpost2;
                            return;
                        }
                    }
                    products.items.push(newpost2);
                });
            }
            $ionicLoading.hide();
        })
    });

    console.log(Auth.$getAuth().uid);


    return {
        all: function () {

            return products.items;
        },
        remove: function (item) {
            products.items.splice(items.indexOf(item), 1);
        },
        get: function (itemId) {
            for (var i = 0; i < products.items.length; i++) {
                if (products.items[i].id == itemId) {
                    return products.items[i];
                }
            }
            return null;
        },
        editFood: function (id, quantity) {
            refFB.child("food").child(id).child("maxQuantity").transaction(function (quantityFromDatabase) {
                
                var intQuantityFromDatabase = parseInt(quantityFromDatabase);

                if ((intQuantityFromDatabase + quantity) <= 0) {
                    return 0;
                } else {
                    return intQuantityFromDatabase + quantity;
                }
            });
        },
        removeAllQuantity: function (id) {
            refFB.child("food").child(id).child("maxQuantity").transaction(function (quantityFromDatabase) { return 0; });
        }
    };
});

app.factory('Cart', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var cart = {
        shipping: 6,
        total: 166,
        items: [
            {
                id: 2,
                name: "Seared Tuna",
                price: 15.20,
                thumb: "img/items/thumbs/seared_tuna.jpg",
                quantity: 2
            },
            {
                id: 3,
                name: "Brick chicken",
                price: 16.20,
                thumb: "img/items/thumbs/brick_chicken.jpg",
                quantity: 3
            },
            {
                id: 4,
                name: "Fried calamari",
                price: 17.20,
                thumb: "img/items/thumbs/fried_calamari.jpg",
                quantity: 1
            },
            {
                id: 5,
                name: "Zuppa",
                price: 17.20,
                thumb: "img/items/thumbs/zuppa.jpg",
                quantity: 2
            }
        ]
    };

    return {
        get: function () {
            return cart;
        }
    };
});

app.factory('StripeCharge', function ($q, $http, StripeCheckout) {
    var self = this;

    /**
     * Connects with the backend (server-side) to charge the customer
     *
     * # Note on the determination of the price
     * In this example we base the $stripeAmount on the object ProductMeta which has been
     * retrieved on the client-side. For safety reasons however, it is recommended to
     * retrieve the price from the back-end (thus the server-side). In this way the client
     * cannot write his own application and choose a price that he/she prefers
     */
    self.chargeUser = function (stripeToken, ProductMeta) {
        var qCharge = $q.defer();

        var chargeUrl = SERVER_SIDE_URL + "/charge";
        var curlData = {
            stripeCurrency: "usd",
            stripeAmount: Math.floor(ProductMeta.priceUSD * 100),  // charge handles transactions in cents
            stripeSource: stripeToken,
            stripeDescription: "Your custom description here"
        };
        $http.post(chargeUrl, curlData)
            .success(
            function (StripeInvoiceData) {
                qCharge.resolve(StripeInvoiceData);
                // you can store the StripeInvoiceData for your own administration
            }
            )
            .error(
            function (error) {
                console.log(error)
                qCharge.reject(error);
            }
            );
        return qCharge.promise;
    };


    /**
     * Get a stripe token through the checkout handler
     */
    self.getStripeToken = function (ProductMeta) {
        var qToken = $q.defer();

        var handlerOptions = {
            name: ProductMeta.title,
            description: ProductMeta.description,
            amount: Math.floor(ProductMeta.priceUSD * 100),
            image: "img/perry.png",
        };

        var handler = StripeCheckout.configure({
            name: ProductMeta.title,
            token: function (token, args) {
                //console.log(token.id)
            }
        })

        handler.open(handlerOptions).then(
            function (result) {
                var stripeToken = result[0].id;
                if (stripeToken != undefined && stripeToken != null && stripeToken != "") {
                    //console.log("handler success - defined")
                    qToken.resolve(stripeToken);
                } else {
                    //console.log("handler success - undefined")
                    qToken.reject("ERROR_STRIPETOKEN_UNDEFINED");
                }
            }, function (error) {
                if (error == undefined) {
                    qToken.reject("ERROR_CANCEL");
                } else {
                    qToken.reject(error);
                }
            } // ./ error
        ); // ./ handler
        return qToken.promise;
    };


    return self;
})

app.factory('RegistrationDetails', function () {

    var userData = {
        userID: "",
        invitationCode: "",
        email: "",
        password: "",
        bakeryImage: "",
        contactNumber: "",
        bakeryName: "",
        bakeryAddress: "",
        bakeryPostalCode: "",
        bankAccountNumber: null,
        description: ""
    };

    return {

        // invitation code
        SetUserID: function (value) { userData.userID = value; },
        GetUserID: function () { return userData.userID; },

        // invitation code
        SetInvitationCode: function (value) { userData.invitationCode = value; },
        GetInvitationCode: function () { return userData.invitationCode; },

        // email
        SetEmail: function (value) { userData.email = value; },
        GetEmail: function () { return userData.email; },

        // password
        SetPassword: function (value) { userData.password = value; },
        GetPassword: function () { return userData.password; },

        // bakery Image
        SetBakeryImage: function (value) { userData.bakeryImage = value; },
        GetBakeryImage: function () { return userData.bakeryImage; },

        // contact number
        SetContactNumber: function (value) { userData.contactNumber = value; },
        GetContactNumber: function () { return userData.contactNumber; },

        // bakery Image
        SetBakeryName: function (value) { userData.bakeryName = value; },
        GetBakeryName: function () { return userData.bakeryName; },

        // bakery address 
        SetBakeryAddress: function (value) { userData.bakeryAddress = value; },
        GetBakeryAddress: function () { return userData.bakeryAddress; },

        // bakery address 
        SetBakeryPostalCode: function (value) { userData.bakeryPostalCode = value; },
        GetBakeryPostalCode: function () { return userData.bakeryPostalCode; },

        // bank account number 
        SetBankAccountNumber: function (value) { userData.bankAccountNumber = value; },
        GetBankAccountNumber: function () { return userData.bankAccountNumber; },

        // description
        SetDescription: function (value) { userData.description = value; },
        GetDescription: function () { return userData.description; },

        ResetAllRegistrationVariables: function () {
            userData = {
                userID: "",
                invitationCode: "",
                email: "",
                password: "",
                bakeryImage: "",
                contactNumber: "",
                bakeryName: "",
                bakeryAddress: "",
                bakeryPostalCode: "",
                bankAccountNumber: null,
                description: ""
            };
        },

        Debug: function () {
            //print out debug info
            console.log(userData);
        }
    };
});

app.service('UserBakerProfile', function ($rootScope, Auth, $firebaseObject, $ionicLoading, $ionicPopup) {

    var userFirebaseObject = null;

    Auth.$onAuth(function (authData) {

        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });

        if (authData) {

            var FBref = new Firebase("https://burning-heat-7015.firebaseio.com/stalls/");
            FBref.orderByChild("userID").equalTo(Auth.$getAuth().uid).on("value", function (dataSnapshot) {

                var userFirebaseReference = new Firebase("https://burning-heat-7015.firebaseio.com/stalls/" + Object.keys(dataSnapshot.val())[0]);

                userFirebaseObject = new $firebaseObject(userFirebaseReference);

                userFirebaseObject.$loaded().then(function (data) {
                    $ionicLoading.hide();
                })
                    .catch(function (error) {
                        console.error("Error:", error);
                        $ionicLoading.hide();
                    });

                $rootScope.$broadcast('bakeryUser:updated', userFirebaseObject);
            });

        } else {
            console.log("The user is logged out and hence we aren't able to get any user data.");
            $ionicLoading.hide();
        }
    });

    return {
        GetProfile: function () { return userFirebaseObject; },
        UpdateProfile: function () {

            userFirebaseObject.$save().then(function (ref) {
                console.log("successfully saved!");
                $ionicPopup.alert({
                    title: 'Success!',
                    template: 'Successfully Updated!'
                });
            }, function (error) {
                console.log("Error:", error);
            });
        }
    };
});

app.factory('CordovaImageGalleryService', function ($cordovaCamera, $parse) {

    return {

        // Returns a promise that contains the image data
        // use .then(function name(params) {
        //  //params contains all the info from the response
        // })
        ChoosePictureFromGallery: function () {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL, // if camera "Camera.PictureSourceType.CAMERA,"
                sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 512, // height and width of the image
                targetHeight: 512,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            return $cordovaCamera.getPicture(options);
        }
    };
});

app.factory('AddNewFoodService', function () {

    var newFood = {
        foodName: "",
        img: [],
        description: "",
        pricePerServing: "",
        quantityCap: "",
    };

    return {

        // bakery Image
        SetFoodName: function (value) { newFood.foodName = value; },
        GetFoodName: function () { return newFood.foodName; },

        // description
        SetDescription: function (value) { newFood.description = value; },
        GetDescription: function () { return newFood.description; },

        // price per serving
        SetPricePerServing: function (value) { newFood.pricePerServing = value; },
        GetPricePerServing: function () { return newFood.pricePerServing; },

        // quantity cap
        SetQuantityCap: function (value) { newFood.quantityCap = value; },
        GetQuantityCap: function () { return newFood.quantityCap; },

        // bakery Image
        SetFoodImg: function (index, value) { newFood.img[index] = value; },
        GetFoodImg: function (index) { return newFood.img[index]; },

        GetAllPropertiesOfFood: function () { return newFood; },

        Debug: function () {
            //print out debug info
            console.log(newFood);
        }
    };
});

