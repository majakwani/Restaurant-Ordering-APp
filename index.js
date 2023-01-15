import { menuArray } from "./data.js";
import { orderDetails } from "./orderDetails.js"

let isPaymentFormRendered = false

const checkoutSection = document.getElementById('checkout-section')
checkoutSection.innerHTML = `
<p class="order heading">Your Order</p>

<div id="order-details"></div>
<div class="checkout">
<button type="button" id="checkout-btn" class="checkout">Complete order</button>
</div>
`

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

function addDishToOrder(id){
    document.getElementById('greeting').style.display = "none"
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

const greetingMessage = document.getElementById('greeting')
isPaymentFormRendered = false
document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault()
    document.getElementById('form').style.display = 'none'
    orderDetails.splice(0, orderDetails.length)
    renderOrderDetails()
    greetingMessage.style.display = "block"
    greetingMessage.innerHTML = `<p>Thanks ${document.getElementById('name').value}! Your order is on its way!</p>`    
})

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
})

renderMenuItems()