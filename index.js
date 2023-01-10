import { menuArray } from "./data.js";
import { orderDetails } from "./orderDetails.js"

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
    if(e.target.dataset.dish){
        addDishToOrder(e.target.dataset.dish)   
    }
})

function addDishToOrder(id){
    const orderObj = {
        name: menuArray[id].name,
        price: menuArray[id].price
    }
    orderDetails.push(orderObj)
    renderOrderDetails()
}

const orderItems = document.getElementById('order-details')

function renderOrderDetails(){
    orderItems.innerHTML = ""
    orderDetails.forEach(function(orderItem){
        orderItems.innerHTML += `<div class="item">
        <p class="dish-name">${orderItem.name}</p>
        <button type="button" class="remove">remove</button>
        <p class="price bill">$${orderItem.price}</p>
      </div>`
    })
}