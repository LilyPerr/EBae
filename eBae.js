var stuff = document.getElementById('racistMF')
var table = document.getElementById('table1')
var line1 = table.insertRow(1)
var item = line1.insertCell()

var button = line1.insertCell()
var itemsInCart = document.getElementById('numItems')
var row = document.getElementById('row')
var items = 0

if (0 == 1){
  var cost = line1.insertCell(1)
  var manage = row.insertCell(1)
  manage.innerHTML = 'Manage Event' // link to event management page
  //item.innerHTML = event Name
  cost.innerHTML = '<button class = "addToCart" type = "button" onclick = "add();"> Edit Event </button>'
  button.innerHTML = '<button class = "addToCart" type = "button" onclick = "add();"> Engage in Event </button>'
}
else{

  //item.innerHTML = event Name
  button.innerHTML = '<button class = "addToCart" type = "button" onclick = "add();"> Engage in Event </button>'
}

function add(){
  //push to firebase and refresh
  items += 1
  itemsInCart.innerHTML = items
}
