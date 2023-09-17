 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
 import { getDatabase, ref, push, onValue, remove } from 
 "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

 const appSettings = {
     databaseURL: "https://realtime-database-8be7c-default-rtdb.asia-southeast1.firebasedatabase.app/"
 }
 const app = initializeApp(appSettings)
 const database = getDatabase(app)
 const shoppingListInDB = ref(database, "shoppingList")

 const inputEL = document.getElementById("input-field")
 const addBtnEL = document.getElementById("add-btn")
const shopList = document.getElementById("shopping-list")

 addBtnEL.addEventListener("click", function() {
    let inputValue = inputEL.value

    push(shoppingListInDB, inputValue)
    
    clearInputEL()
 })
onValue(shoppingListInDB, function (snapshot) {

    if(snapshot.exists()){
   let itemsArray = Object.entries(snapshot.val())
 
    clearShopList()

    for (let i = 0; i < itemsArray.length; i++) {
         let currentItem = itemsArray[i]
       let currentItemID = currentItem[0]
       let currentItemValue = currentItem[1]
        appendItemToShopList(currentItem)
    
    }
 }else {
    shopList.innerHTML = "No item here...yet"
}

 })
   function clearShopList(){
    shopList.innerHTML = ""
 }


 function clearInputEL() {
    inputEL.value = ""
 }
 function appendItemToShopList(item) {
  let itemID = item[0]
 let itemValue = item[1]
  let newEl = document.createElement("li")
  newEl.textContent = itemValue

 newEl.addEventListener("click", function() {
   let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
     remove(exactLocationOfItemInDB)
  })
  shopList.append(newEl)
  console.log(item)
 }
