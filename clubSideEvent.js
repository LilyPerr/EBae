var  table = document.getElementById('toPopulate')

//From DataBase recall the items and the prices

var line1 = table.insertRow(-1)
var item = line1.insertCell()
var cost = line1.insertCell()
var button = line1.insertCell()
var viewer = document.getElementById('tests')
var viewerP = document.getElementById('test')

item.innerHTML = '<input id = "itemName"></input>'
cost.innerHTML = '<input id = "itemPrice" type = "number"></input>'
button.innerHTML = '<button class = "addToEvent" type = "button" onclick = "add();"> Add To Event </button>'

function add(){
  //push to firebase
  viewer.innerHTML = document.getElementById('itemName').value
  viewerP.innerHTML = document.getElementById('itemPrice').value
  //reload from firebase
}
