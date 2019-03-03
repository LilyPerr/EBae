//From DataBase recall the items and the prices
var table = document.getElementById('table1')
var evventNumber = localStorage.getItem('eventNumber')
var priceT = document.getElementById('totalPrice')
var total = 0
var soldIndex = {}


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
function load(){
firebase.database().ref('/user-posts/').once('value').then(function(snapshot){
  items = snapshot.val()[123]['events'][1]['items']
  selling = Object.keys(items)
  price = Object.values(items)
  for (i = 0; i<selling.length; i++){
    var line1 = table.insertRow(1)
    var item = line1.insertCell()
    var button = line1.insertCell()
    var cost = line1.insertCell(1)
    item.innerHTML = selling[i]
    cost.innerHTML = price[i]
    innerString = String(price[i]).concat(',\'').concat(selling[i]).concat('\'')
    button.innerHTML = '<button class = "addToCart" type = "button" onclick = "toCart('.concat(innerString).concat(');"> Add to Kart </button>')
  }
})
}

function toCart(pricey, sold){
  total += pricey
  console.log(total);
  priceT.innerHTML = String(total)
  addOne(sold)
}

function addOne(sold){
  if (sold in soldIndex){
    soldIndex[sold] ++
  }
  else{
    soldIndex[sold] = 1
  }
  console.log(soldIndex);
}

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
// addNewUser(123, "Red Cross", "Advocates for Humanitarian Aid", "We encourage everyone to donate to us or volunteer with us to promote humanitarian aid in the world!");
// addNewEvent(123, 1, "Fundraiser for a Hurriacane", "Caltech", "Please donate to help people affected by devestating hurricanes. Check out our pre-order page for more ways you can help us and donate.")
load()
