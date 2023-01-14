import { menuArray } from "./data.js";
import { orderDetails } from "./orderDetails.js"

let isPaymentFormRendered = false
const menuItems = document.getElementById('menu-items')

function renderMenuItems(){
    menuArray.forEach(function(item){
        let ingredients = ''
        item.ingredients.forEach(function(ingredient){
            ingredients += `${ingredient},`
        })
        menuItems.innerHTML += `<div class = "dish-item">
        <img src= "./images/${item.name}.png"/>
        <div class="details">
          <p class="dish-name">${item.name}</p>
          <p class="ingredients">${ingredients}</p>
          <p class="price">$${item.price}</p>
        </div>
        <button type="button" class="add-to-cart" data-dish = ${item.id}>+</button>
      </div>
      <div class="line"></div>`
    })
}

renderMenuItems()

document.addEventListener('click', function(e){
    if(e.target.dataset.dish && !isPaymentFormRendered){
        addDishToOrder(e.target.dataset.dish)   
    }
    if(e.target.dataset.id && !isPaymentFormRendered){
        removeDish(e.target.dataset.id)
    }
    if(e.target.id === "checkout-btn" && orderDetails.length >= 1 && !isPaymentFormRendered){
        renderPaymentForm()
    }
    if(e.target.id === "pay-button"){
        if(document.getElementById('name').value.length == 0 || document.getElementById('number').value.length == 0 || document.getElementById('cvv').value.length == 0){
            alert("Empty input fields")
        }
        else{
        orderCompleted()
        }
    }
})

function addDishToOrder(id){
    const orderObj = {
        name: menuArray[id].name,
        price: menuArray[id].price,
    }
    orderDetails.push(orderObj)
    renderOrderDetails()
}

function removeDish(itemIndex){
    orderDetails.splice(itemIndex, 1)
    renderOrderDetails()
}

const orderItems = document.getElementById('order-details')

function renderOrderDetails(){
    if(orderDetails.length >=1){
        document.getElementById('checkout-section').style.display = "block"
    
    let totalPrice = 0
    orderItems.innerHTML = ""
    orderDetails.forEach(function(orderItem, index){
        totalPrice += orderItem.price
        orderItems.innerHTML += `<div class="item">
        <p class="dish-name">${orderItem.name}</p>
        <button type="button" class="remove" data-id = ${index}>remove</button>
        <p class="price bill">$${orderItem.price}</p>
      </div>`
    })
    orderItems.innerHTML += `<div class = "order-line"></div>
    <div class = "item">
    <p class = "dish-name">Total price</p>
    <p class = "price bill">$${totalPrice}</p>
     </div>`
}
else{
    document.getElementById('checkout-section').style.display = "none"
}
}

function renderPaymentForm(){
    isPaymentFormRendered = true
    document.getElementById('form').style.display = "block"
}

function orderCompleted(){
    isPaymentFormRendered = false
    document.getElementById('form').style.display = "none"
    document.getElementById('checkout-section').innerHTML = `<div class = "greeting">
    <p>Thanks, James! Your order is on it's way.</p>
    </div>` 
}