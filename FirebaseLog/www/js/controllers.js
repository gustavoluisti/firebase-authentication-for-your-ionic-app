angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, user_data) {
  if(user_data){
      $state.go('user');
  }
  else{
    var ref = new Firebase("https://logfirebase.firebaseio.com/");
    $scope.login = function(data){
      if(data == undefined){
        console.log("email or password empty");
      }
      else{
        ref.authWithPassword({
            email    : data.email,
            password : data.password
          }, function(error, authData) {
            console.log(error);
            if (error) {
              console.log("Error creating user:", error);
            } else {
              console.log("Successfully created user account with uid:", authData.uid);
              $state.go('user');
            }
          });
        }
    }

    $scope.fbLogin = function(){
        ref.authWithOAuthPopup("facebook", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
            $state.go('user');
          }
        });
      //}
    };
  }
})

.controller('SignUpCtrl', function($scope, $stateParams) {
    $scope.signup = function(data){
      var ref = new Firebase("https://logfirebase.firebaseio.com/");
      if(data == undefined){
        console.log("email or password empty");
      }
      else{
        ref.createUser({
          email    : data.email,
          password : data.password,
        }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
            alert("sign up succesful");
          }
        });
      }
    };
})

.controller('UserCtrl', function($scope, user_data, $state){
    var ref = new Firebase("https://logfirebase.firebaseio.com/");
    console.log(user_data);
    if(user_data){
      if(user_data.provider == "facebook"){
        $scope.loggedEmail = user_data.facebook.displayName;
        $scope.ImageURL = user_data.facebook.profileImageURL;
      }
      else{
        $scope.loggedEmail = user_data.password.email;
        $scope.ImageURL = user_data.password.profileImageURL;
      }
    }
    else{
      $state.go('login');
    }

    $scope.logout = function(){
      ref.unauth();
      $state.go('login');
    }
});
