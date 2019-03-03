

var stuff = document.getElementById('racistMF')
var table = document.getElementById('table1')
var line1 = table.insertRow(1)
var item = line1.insertCell()

var button = line1.insertCell()
var itemsInCart = document.getElementById('numItems')
var row = document.getElementById('row')
var items = 0

var cost = line1.insertCell(1)
var manage = row.insertCell(1)
manage.innerHTML = 'Manage Event' // link to event management page

cost.innerHTML = '<button class = "addToCart" type = "button" onclick = "manage();"> Create Event </button>'
button.innerHTML = '<button class = "addToCart" type = "button" onclick = "engage();"> Engage in Event </button>'


firebase.database().ref('/user-posts/').once('value').then(function(snapshot){
  clubID = Object.keys(snapshot.val())

  clubEvents = []
  for (i = 0; i < clubID.length; i++ ){
    clubEvents.push(Object.values(snapshot.val()[clubID[i]]['events'][1])[0]['event'])

  }

  for (i = 0; i< clubEvents.length; i++){
    var line1 = table.insertRow(1)
    var item = line1.insertCell()
    var button = line1.insertCell()
    var cost = line1.insertCell(1)

    item.innerHTML = clubEvents[i]
    cost.innerHTML = '<button class = "addToCart" type = "button" onclick = "manage();"> Manage Event </button>'
    button.innerHTML = '<button class = "addToCart" type = "button" onclick = "engage();"> Engage in Event </button>'




  }

})


var config = {
  apiKey: "AIzaSyB53tt3mrTkPnBuP4NWQiy5ynKjXxlmxW0",
  authDomain: "ebae-adb6d.firebaseapp.com",
  databaseURL: "https://ebae-adb6d.firebaseio.com",
  projectId: "ebae-adb6d",
  storageBucket: "",
  messagingSenderId: "860609061345"
};
firebase.initializeApp(config);

//create database
var database = firebase.database();

//console.log("hello");

//update users
function addNewUser(uid, username, tag, body) {
  // A post entry.
  var postData = {
    club: username,
    user: uid,
    tagLine: tag,
    info: body
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  //updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}

function addItem(eid, item, price){
  firebase.database().ref('eventID/' + eid).set({
    item: price
  })
  test();

}

//update events
function addNewEvent(uid, eid, eventName, location, body) {
  //uid -> user id
  //eid -> event id
  // A post entry.
  var postDataE = {
    event: eventName,
    user: uid,
    eventID: eid,
    location: location,
    info: body
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  //updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/events/' + eid + '/' + newPostKey] = postDataE;

  return firebase.database().ref().update(updates);
}
