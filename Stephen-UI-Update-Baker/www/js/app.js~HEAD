// Ionic Starter App
var SERVER_SIDE_URL             = "sleepy-refuge-89064.herokuapp.com";
var STRIPE_API_PUBLISHABLE_KEY  = "pk_test_h57hQy5dRjVjlM7SoNVYG8Mn";

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ui.router', 'stripe.checkout', 'starter.controllers', 'starter.services', 'nl2br', 'monospaced.elastic', "ngCordova"])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

    .service("CartItemData", function Item(){
        var item = this;
        //item.message = "DefaultHello (Service)/";
        this.setItemData = function(SetValue){
            console.log("Setting Values");
            item = SetValue;
        }

        this.getItemData = function(){
            return item;
        }
    })

.config(function($stateProvider, $urlRouterProvider, StripeCheckoutProvider) {

    // Define your STRIPE_API_PUBLISHABLE_KEY
    StripeCheckoutProvider.defaults({key: STRIPE_API_PUBLISHABLE_KEY});

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js


  // login screen
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'AuthCtrl'
  })

  // register screen
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'AuthCtrl'
  })

  // Home screen
//   .state('home', {
//     url: '/home',
//     templateUrl: 'templates/home.html',
//     controller: 'HomeCtrl'
//   })

  // Community detail
  .state('community', {
    url: '/community',
    templateUrl: 'templates/community.html',
    controller: 'CommunityCtrl'
  })

  // Item detail
  .state('item', {
    url: '/item/:id',
    templateUrl: 'templates/item.html',
    controller: 'ItemCtrl'
  })

  // View favorite items
  .state('favorite', {
    url: '/favorite',
    templateUrl: 'templates/favorite.html',
    controller: 'FavoriteCtrl as first'
  })

  // View post
  .state('post', {
    url: '/post',
    templateUrl: 'templates/post.html',
    controller: 'PostCtrl',
  })


  // View ordered items
  .state('payment', {
    url: '/payment',
    templateUrl: 'templates/payment.html',
    controller: 'PaymentCtrl'
  })

  .state('active', {
    url: '/active',
    templateUrl: 'templates/active.html',
    controller: 'ActiveCtrl'
  })

  .state('checkout', {
    url: '/checkout',
    templateUrl: 'templates/checkout.html',
    controller: 'CheckoutCtrl'
  })

  .state('address', {
    url: '/address',
    templateUrl: 'templates/address.html',
    controller: 'AddressCtrl'
  })

  .state('user', {
    url: '/user',
    templateUrl: 'templates/user.html',
    controller: 'UserCtrl'
  })

  .state('reviews', {
               url: '/reviews',
               templateUrl: 'templates/reviews.html',
               controller: 'ReviewsCtrl'
               })
               
 //states for new pages

//state for firstpayment.html
.state('firstpayment', {
    url: '/firstpayment',
    templateUrl: 'templates/firstpayment.html',
    controller: 'FirstpaymentCtrl'
  })
  
//state for editshop.html
.state('editshop', {
    url: '/editshop',
    templateUrl: 'templates/editshop.html',
    controller: 'EditshopCtrl'
  })
  
//state for bio.html
.state('bio', {
    url: '/bio',
    templateUrl: 'templates/bio.html',
    controller: 'BioCtrl'
  })
  
//state for invitation.html
.state('invitation', {
    url: '/invitation',
    templateUrl: 'templates/invitation.html',
    controller: 'InvitationCtrl'
  })

//state for signupthanks.html
.state('signupthanks', {
    url: '/signupthanks',
    templateUrl: 'templates/signupthanks.html',
    controller: 'SignupthanksCtrl'
  })  
  
//state for whyrubaking.html
.state('whyrubaking', {
    url: '/whyrubaking',
    templateUrl: 'templates/whyrubaking.html',
    controller: 'WhyrubakingCtrl'
  })  
  
//state for editpayment.html
.state('editpayment', {
    url: '/editpayment',
    templateUrl: 'templates/editpayment.html',
    controller: 'EditpaymentCtrl'
  })  

//state for change.html
.state('change', {
    url: '/change',
    templateUrl: 'templates/change.html',
    controller: 'ChangeCtrl'
  })  
  
//state for settings.html
.state('settings', {
    url: '/settings',
    templateUrl: 'templates/settings.html',
    controller: 'SettingsCtrl'
  })

//state for photographer.html
.state('photographer', {
    url: '/photographer',
    templateUrl: 'templates/photographer.html',
    controller: 'PhotographerCtrl'
  })
    
  
//state for support
.state('support', {
    url: '/support',
    templateUrl: 'templates/support.html',
    controller: 'SupportCtrl'
  })
  
//state for shop
.state('shop', {
    url: '/shop',
    templateUrl: 'templates/shop.html',
    controller: 'ShopCtrl'
  })
  
//state for location
.state('location', {
    url: '/location',
    templateUrl: 'templates/location.html',
    controller: 'LocationCtrl'
  })
  
  //state for post2
.state('post2', {
    url: '/post2',
    templateUrl: 'templates/post2.html',
    controller: 'Post2Ctrl'
  })
  
   //state for post3
.state('post3', {
    url: '/post3',
    templateUrl: 'templates/post3.html',
    controller: 'Post3Ctrl'
  })
  
   //state for post4
.state('post4', {
    url: '/post4',
    templateUrl: 'templates/post4.html',
    controller: 'Post4Ctrl'
  })
  
  //state for listing
.state('listing', {
    url: '/listing',
    templateUrl: 'templates/listing.html',
    controller: 'ListingCtrl'
  })
    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/post');

  console.log("Happy");
});