var app = angular.module('starter.services', ["ionic", "ngMessages", "firebase", "ngCordova"]);

// Our Firebase Data Factory retriever
app.factory("FavouriteData", function($firebaseArray) {
    var itemsRef = new Firebase("https://burning-heat-7015.firebaseio.com/");
    return $firebaseArray(itemsRef);
})

// our authenticated user details
app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    var ref = new Firebase("https://burning-heat-7015.firebaseio.com/");
    return $firebaseAuth(ref);
}
]);

app.factory('Categories', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var categories = [
        {
            id: 1,
            name: "Entrees",
            thumb: 'img/categories/entree.jpg',
            items: [
                {
                    id: 1,
                    name: "Seared tuna",
                    price: 14.20,
                    thumb: "img/items/seared_tuna.jpg"
                },
                {
                    id: 2,
                    name: "Rib eye",
                    price: 15.20,
                    thumb: "img/items/rib_eyes.jpg"
                },
                {
                    id: 3,
                    name: "Brick chicken",
                    price: 16.20,
                    thumb: "img/items/brick_chicken.jpg"
                },
                {
                    id: 4,
                    name: "Fried calamari",
                    price: 17.20,
                    thumb: "img/items/fried_calamari.jpg"
                },
                {
                    id: 5,
                    name: "Zuppa",
                    price: 17.20,
                    thumb: "img/items/zuppa.jpg"
                }
            ]
        },
        {
            id: 2,
            name: "Drinks",
            thumb: 'img/categories/drink.jpg',
            items: []
        },
        {
            id: 3,
            name: "Salads",
            thumb: 'img/categories/salad.jpg',
            items: []
        },
        {
            id: 4,
            name: "Fruits",
            thumb: 'img/categories/fruit.jpg',
            items: []
        },
        {
            id: 5,
            name: "Pizzas",
            thumb: 'img/categories/pizza.jpg',
            items: []
        },
        {
            id: 6,
            name: "Sushi",
            thumb: 'img/categories/sushi.jpg',
            items: []
        },
        {
            id: 7,
            name: "Buggers",
            thumb: 'img/categories/bugger.jpg',
            items: []
        },
    ];

    return {
        all: function() {
            return categories;
        },
        remove: function(cat) {
            categories.splice(categories.indexOf(cat), 1);
        },
        get: function(catId) {
            for (var i = 0; i < categories.length; i++) {
                if (categories[i].id === parseInt(catId)) {
                    return categories[i];
                }
            }
            return null;
        }
    };
});


app.factory('Items', function($firebaseArray, Auth) {
   
    // Might use a resource here that returns a JSON array
    //   // Some fake testing data
    //   var items = [
    //     {
    //       id: 1,
    //       name: "Rib eye steak",
    //       price: 14.20,
    //       offer: 40,
    //       thumb: "img/items/thumbs/rib_eyes.jpg",
    //       images: [
    //         "img/items/rib_eye_2.jpg",
    //         "img/items/rib_eye_3.jpg",
    //         "img/items/rib_eye_4.jpg"
    //       ],
    //       description: "Beef steak, sauce, french fries",
    //       faved: true,
    //       reviews: [
    //         {
    //           id: 1,
    //           user_id: 1,
    //           username: "Adam",
    //           face: "img/people/adam.jpg",
    //           text: "Incredibly delicious tender steak! Be sure to order more",
    //           images: []
    //         },
    //         {
    //           id: 2,
    //           user_id: 3,
    //           username: "Ben",
    //           face: "img/people/ben.png",
    //           text: "Mmm.... Amazing! Steaks are very good",
    //           images: []
    //         },
    //         {
    //           id: 3,
    //           user_id: 3,
    //           username: "Max",
    //           face: "img/people/max.png",
    //           text: "Incredibly delicious tender steak! Be sure to order more",
    //           images: []
    //         }
    //       ]
    //     },
    //     {
    //       id: 2,
    //       name: "Seared Tuna",
    //       price: 15.20,
    //       offer: 20,
    //       thumb: "img/items/thumbs/seared_tuna.jpg"
    //     },
    //     {
    //       id: 3,
    //       name: "Brick chicken",
    //       price: 16.20,
    //       offer: 40,
    //       thumb: "img/items/thumbs/brick_chicken.jpg"
    //     },
    //     {
    //       id: 4,
    //       name: "Fried calamari",
    //       price: 17.20,
    //       offer: 50,
    //       thumb: "img/items/thumbs/fried_calamari.jpg"
    //     },
    //     {
    //       id: 5,
    //       name: "Zuppa",
    //       price: 17.20,
    //       offer: 20,
    //       thumb: "img/items/thumbs/zuppa.jpg"
    //     }
    //   ];

    var items = [];
    var refFB = new Firebase("https://burning-heat-7015.firebaseio.com");
    var refUsers = refFB.child("stalls");
    var refUsersCollection = $firebaseArray(refUsers);
    refUsersCollection.$ref().orderByChild("userID").equalTo(Auth.$getAuth().uid).once("value", function(dataSnapshot) {
        var data = dataSnapshot.exportVal();
        var firebaseProducts = new Firebase("https://burning-heat-7015.firebaseio.com/stalls/" + Object.keys(data)[0].toString() + "/products");
        var itemsFB = $firebaseArray(firebaseProducts);
        itemsFB.$loaded().then(function(){
            console.log(itemsFB.length);
            for(i = 0; i < itemsFB.length; i++) 
            {
                itemsFB.$ref().on("value", function(snapshot) {
                    var newpost = snapshot.val();
                    var refFood = new Firebase("https://burning-heat-7015.firebaseio.com/food/"+Object.keys(newpost)[i]);
                    var specFoodData = $firebaseArray(refFood);
                    specFoodData.$ref().on("value", function(snapshot2) {
                        var newpost2 = snapshot2.val();
                        console.log(newpost2);
                        items.push(newpost2);
                    });
                })
            }
        })
    });

    console.log(Auth.$getAuth().uid);


    return {
        all: function() {
            return items;
        },
        remove: function(item) {
            items.splice(items.indexOf(item), 1);
        },
        get: function(itemId) {
            for (var i = 0; i < items.length; i++) {
                if (items[i].id === parseInt(itemId)) {
                    return items[i];
                }
            }
            return null;
        }
    };
});

app.factory('Cart', function() {
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
        get: function() {
            return cart;
        }
    };
});

app.factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [
        {
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/people/ben.png',
            messages: [
                {
                    type: 'received',
                    text: 'Hey, How are you? wanna hang out this friday?',
                    image: '',
                    time: 'Thursday 05:55 PM'
                },
                {
                    type: 'sent',
                    text: 'Good, Yes sure why not :D',
                    image: '',
                    time: 'Thursday 05:56 PM'
                },
                {
                    type: 'received',
                    text: 'Check out this view from my last trip',
                    image: '',
                    time: 'Thursday 05:57 PM'
                },
                {
                    type: 'sent',
                    text: 'Looks Great is that view in Canada?',
                    image: '',
                    time: 'Thursday 05:58 PM'
                },
                {
                    type: 'received',
                    text: 'Yes, it\'s in Canada',
                    image: '',
                    time: 'Thursday 05:57 PM'
                }
            ]
        },
        {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/people/max.png'
        },
        {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/people/adam.jpg'
        },
        {

            d: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/people/perry.png'
        },
        {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/people/mike.png'
        },
        {
            id: 5,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/people/ben.png'
        },
        {
            id: 6,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/people/max.png'
        }
    ];

    return {
        all: function() {
            return chats;
        },
        remove: function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
})

.factory('StripeCharge', function($q, $http, StripeCheckout) {
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
    self.chargeUser = function(stripeToken, ProductMeta) {
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
            function(StripeInvoiceData) {
                qCharge.resolve(StripeInvoiceData);
                // you can store the StripeInvoiceData for your own administration
            }
            )
            .error(
            function(error) {
                console.log(error)
                qCharge.reject(error);
            }
            );
        return qCharge.promise;
    };


    /**
     * Get a stripe token through the checkout handler
     */
    self.getStripeToken = function(ProductMeta) {
        var qToken = $q.defer();

        var handlerOptions = {
            name: ProductMeta.title,
            description: ProductMeta.description,
            amount: Math.floor(ProductMeta.priceUSD * 100),
            image: "img/perry.png",
        };

        var handler = StripeCheckout.configure({
            name: ProductMeta.title,
            token: function(token, args) {
                //console.log(token.id)
            }
        })

        handler.open(handlerOptions).then(
            function(result) {
                var stripeToken = result[0].id;
                if (stripeToken != undefined && stripeToken != null && stripeToken != "") {
                    //console.log("handler success - defined")
                    qToken.resolve(stripeToken);
                } else {
                    //console.log("handler success - undefined")
                    qToken.reject("ERROR_STRIPETOKEN_UNDEFINED");
                }
            }, function(error) {
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

app.factory('RegistrationDetails', function() {

    var userData = {
        userID: "",
        invitationCode: "",
        email: "",
        password: "",
        bakeryImage: "",
        bakeryName: "",
        bakeryAddress: "",
        bakeryPostalCode: "",
        bankAccountNumber: null,
        description: ""
    };

    return {

        // invitation code
        SetUserID: function(value) { userData.userID = value; },
        GetUserID: function() { return userData.userID; },

        // invitation code
        SetInvitationCode: function(value) { userData.invitationCode = value; },
        GetInvitationCode: function() { return userData.invitationCode; },

        // email
        SetEmail: function(value) { userData.email = value; },
        GetEmail: function() { return userData.email; },

        // password
        SetPassword: function(value) { userData.password = value; },
        GetPassword: function() { return userData.password; },

        // bakery Image
        SetBakeryImage: function(value) { userData.bakeryImage = value; },
        GetBakeryImage: function() { return userData.bakeryImage; },

        // bakery Image
        SetBakeryName: function(value) { userData.bakeryName = value; },
        GetBakeryName: function() { return userData.bakeryName; },

        // bakery address 
        SetBakeryAddress: function(value) { userData.bakeryAddress = value; },
        GetBakeryAddress: function() { return userData.bakeryAddress; },

        // bakery address 
        SetBakeryPostalCode: function(value) { userData.bakeryPostalCode = value; },
        GetBakeryPostalCode: function() { return userData.bakeryPostalCode; },

        // bank account number 
        SetBankAccountNumber: function(value) { userData.bankAccountNumber = value; },
        GetBankAccountNumber: function() { return userData.bankAccountNumber; },

        // description
        SetDescription: function(value) { userData.description = value; },
        GetDescription: function() { return userData.description; },

        Debug: function() {
            //print out debug info
            console.log(userData);
        }
    };
});


app.factory('AddNewFoodService', function() {

    var newFood = {
        foodName: "",
        bakeryImage: "",
        description: "",
        pricePerServing: "",
        quantityCap: "",

    };

    return {

        // bakery Image
        SetFoodName: function(value) { newFood.foodName = value; },
        GetFoodName: function() { return newFood.foodName; },

        // bakery Image
        SetBakeryImage: function(value) { newFood.bakeryImage = value; },
        GetBakeryImage: function() { return newFood.bakeryImage; },

        // description
        SetDescription: function(value) { newFood.description = value; },
        GetDescription: function() { return newFood.description; },

        // price per serving
        SetPricePerServing: function(value) { newFood.pricePerServing = value; },
        GetPricePerServing: function() { return newFood.pricePerServing; },

        // quantity cap
        SetQuantityCap: function(value) { newFood.quantityCap = value; },
        GetQuantityCap: function() { return newFood.quantityCap; },


        Debug: function() {
            //print out debug info
            console.log(newFood);
        }
    };
});
