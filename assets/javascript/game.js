
var config = {
    apiKey: "AIzaSyDZh0p8UJutt6wmNLIJxDbMQx3Nrb2EzKU",
    authDomain: "rpsgame-1d47e.firebaseapp.com",
    databaseURL: "https://rpsgame-1d47e.firebaseio.com",
    projectId: "rpsgame-1d47e",
    storageBucket: "rpsgame-1d47e.appspot.com",
    messagingSenderId: "471050528383"
  };
  firebase.initializeApp(config);
  //firebase db
  var database = firebase.database();
  var chatbox = "";
  var pla1 ="";
  var pla2 ="";
  // game settings
  var playerName = "";

 // var pla1Choice = database.ref("/player1choice");
 // var pla2Choice = database.ref("/player2choice"); 
  var playerCount = 0;
  var playerNumber = 0;
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");
var chatRef = database.ref("/chatmsg");
// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

   console.log(snap.val().player1)
    // Add user to the connections list.
    var con = connectionsRef.push(true);
    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

// new game
function newGame() {
  window.playerNumber=window.playerCount;
 
}

// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {

  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  $("#userCon").text(snap.numChildren());
  window.playerCount=(snap.numChildren());
});

function chatmsg(){
  console.log("sendmsg")
  if (window.playerNumber == 1) {
    chat1 = $("#chattext").val().trim();
   
   database.ref().update({
      chatmsg: window.pla1+": "+chat1,
   });
  // $("#p1").text(pla1);
  }
    else if (window.playerNumber == 2) {
    chat2 = $("#chattext").val().trim();
    database.ref().update({
    chatmsg: window.pla2+": "+chat2,
   });
  // $("#p2").text(pla2);
  } 
  
  
  }

function namechange(){
  console.log("namechange")
  if (window.playerNumber == 1) {
    pla1 = $("#playerval").val().trim();
   
   database.ref().update({
      player1: pla1,
   });
  // $("#p1").text(pla1);
  }
    else if (window.playerNumber == 2) {
    pla2 = $("#playerval").val().trim();
    database.ref().update({
    player2: pla2,
   });
  // $("#p2").text(pla2);
  } 
  
  

  }
  database.ref().on("value", function(snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val().player2);
    console.log(snapshot.val().player1);
    $("#p1").text(snapshot.val().player1);
    $("#p2").text(snapshot.val().player2);
    window.pla1 = (snapshot.val().player1);
    window.pla2 = (snapshot.val().player2);
    $("#chatbox").append( "\n" + snapshot.val().chatmsg);
    // Change the HTML to reflect
   // $("#name-display").text(snapshot.val().name);
   

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
 $( document ).ready(function() {

 setTimeout(newGame, 500)

});