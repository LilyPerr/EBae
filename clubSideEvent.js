var  table = document.getElementById('toPopulate')

//From DataBase recall the items and the prices
function IDed(){
  // print(4)
  var id = document.getElementById('IDNum').value
  var unneeded = document.getElementById('getId')
  var reset = document.getElementById('Welcome')
  var line1 = table.insertRow(-1)
  var item = line1.insertCell()
  var cost = line1.insertCell()
  var button = line1.insertCell()
  var viewer = document.getElementById('tests')
  var viewerP = document.getElementById('test')
  var title = document.getElementsByClassName('title')
  var idRow = document.getElementById('baseRow')

  idRow.innerHTML = '<td>Item</td><td>Price</td><td></td>'
  unneeded.innerHTML = ''
  reset.innerHTML = 'Welcome club number ' + String(id)
  title.innerHTML = 'Add Items To Your Club Event'

  var rows = document.getElementById('toPopulate').getElementsByTagName("tr").length
  if (rows >0){
  item.innerHTML = '<input id = "itemName"></input>'
  cost.innerHTML = '<input id = "itemPrice" type = "number"></input>'
  button.innerHTML = '<button class = "addToEvent" type = "button" onclick = "add();"> Add To Event </button>'
  }
  else{
    //Import the item and prices
    button.innerHTML = '<button class = "addToEvent" type = "button" onclick = "minus();"> Remove From Event </button>'
  }
}



function add(){
  //push to firebase
  var itemName = document.getElementById('itemName').value
  var itemPrice = document.getElementById('itemPrice').value
  //reload from firebase
}

function minus(item){
  //remove the item
}

function test(){
  print(4)
}

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
