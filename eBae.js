var stuff = document.getElementById('racistMF')
var table = document.getElementById('table1')
var line1 = table.insertRow(1)
var item = line1.insertCell()
var cost = line1.insertCell()
var button = line1.insertCell()
var itemsInCart = document.getElementById('numItems')
var items = 0
itemsInCart.innerHTML = items
var amount = 1.5


item.innerHTML = 'Popcorn Chicken'
cost.innerHTML = '$' + String(amount)
button.innerHTML = '<button class = "addToCart" type = "button" onclick = "add();"> Add To Cart </button>'

function add(){
  //push to firebase and refresh page
  items += 1
  itemsInCart.innerHTML = items
}
