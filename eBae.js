var eventid = 1
var stuff = document.getElementById('racistMF')
var table = document.getElementById('table1')
var itemsInCart = document.getElementById('numItems')
var row = document.getElementById('row')
var items = 0


var manage = row.insertCell(1)
manage.innerHTML = '<h4>Manage Event</h4>' // link to event management page


function load(){
  var x = table.rows.length
  while (x > 1){
    table.deleteRow(-1)
    x = table.rows.length
  }
  var line1 = table.insertRow(1)
  var item = line1.insertCell()

  var button = line1.insertCell()
  var cost = line1.insertCell(1)

  cost.innerHTML = '<button class = "addToCart" type = "button" onclick = "create();"> Create Event </button>'
  //button.innerHTML = '<button class = "addToCart" type = "button" onclick = "engage();"> Engage in Event </button>'

  firebase.database().ref('/user-posts/').once('value').then(function(snapshot){
    clubID = Object.keys(snapshot.val())

    clubEvents = []
    for (i = 0; i < clubID.length; i++ ){
      //console.log(snapshot.val()[clubID[i]]['events'])
      for (j = 0; j< snapshot.val()[clubID[i]]['events'].length; j++){
        //console.log(snapshot.val()[clubID[i]]['events'][j])
        if (typeof snapshot.val()[clubID[i]]['events'][j] !== 'undefined'){
        clubEvents.push(Object.values(snapshot.val()[clubID[i]]['events'][j])[0])
        eventid = j+1
    }}//console.log(clubEvents)
    }

    for (i = 0; i< clubEvents.length; i++){
      var line1 = table.insertRow(1)
      var item = line1.insertCell()
      var button = line1.insertCell()
      var cost = line1.insertCell(1)

      item.innerHTML = clubEvents[i]['event']
      k = i+1
      cost.innerHTML = '<button class = "addToCart" type = "button" onclick = "manage1('.concat(String(k)).concat( ');"> Manage Event </button>')
      button.innerHTML = '<button class = "addToCart" type = "button" onclick = "engage1('.concat(String(k)).concat(');"> Engage in Event </button>')


  }})
}

load()
function create(){
  var name = prompt('Create the name of the event', 'Event')
  var location = prompt('Where is the event?', "Mars")
  var info = prompt('Brief info', 'PLS DONATE')
  //addNewEvent(uid, eid, eventName, location, body)
  addNewEvent(123, eventid, name, location, info)
  eventid +=1
  load()
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

var database = firebase.database();

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


function addNewEvent(uid, eid, eventName, location, body) {
  //uid -> user id
  //eid -> event id
  // A post entry.
  var postDataE = {
    event: eventName,
    user: uid,
    eventID: eid,
    location: location,
    info: body,
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  //updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/events/' + eid + '/' + newPostKey] = postDataE;

  return firebase.database().ref().update(updates);
}

function manage1(id){
  firebase.database().ref('/user-posts/').once('value').then(function(snapshot){
    var name1 = prompt('Name of the thing to sell', 'boba')
    var num = parseInt(prompt('Enter a Price', '0'))

    const url = "http://localhost:3000/sell"
    fetch(url, {
      method: "POST",
      headers: {
        'Authorization': "Basic S2V2aW5GYW4tRWJhZS1QUkQtOTE2ZGU1NmRjLWExMjk5YmZmOlBSRC0xNmRlNTZkYzMzOGItYWIwNy00ZjAzLWI2OGEtM2UyNw==",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        location:"every college road",
        info:"our club fundraiser",
        name:name1,
        price:num
      })
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })


    a = snapshot.val()[123]['events'][id]
    var updates = {}
    updates['/user-posts/' + 123 + '/events/' + id + '/' + 'items' + '/'+ name1] = num
    return firebase.database().ref().update(updates)
  })
}

function engage1  (id){
  localStorage.setItem('eventNumber', id)
  document.location.href = 'clubSideEvent.html'
}
