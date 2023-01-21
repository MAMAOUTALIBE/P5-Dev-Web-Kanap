const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null){
   let itemPrice = 0 
   let imgUrl, altText
}

fetch(`http://localhost:3000/api/products/${id}`)

.then((Response) => Response.json())
.then((res) => handleData(res))

function handleData( duck) {
    console.log({ duck })
    const { altTxt, colors, description, imageUrl, name, price, _id } =duck
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    makeImage(imageUrl, altTxt)
    maketitle(name)
    makePice(price)
    makeDescription(description)
    makeColors(colors)
}
function  makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null ) parent.appendChild(image)
}
function maketitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
    
}
function makePice(price) {
const span = document.querySelector("#price")
if (span != null) span.textContent = price
}
function makeDescription(description){
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}
function makeColors(colors){
    const select = document.querySelector("#colors")
    if (select != null) {
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
        })
    }
}

const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick)

function handleClick() {
    const colors = document.querySelector("#colors").value
        const quantity = document.querySelector("#quantity").value
        if (IsCartInValid  (colors, quantity)) return
        saveCarte (colors, quantity)
        redirectToCart()
       
}
function saveCarte (color, quantity){
    const data = {
        id: id,
        quantity:  Number(quantity),
        colors: colors,
        price: itemPrice,
        imageUrl: imgUrl,
        altTxt: altText
    }
    localStorage.setItem(id, JSON.stringify(data))
}
function IsCartInValid(colors, quantity) {
    if (colors  == null || colors === "" || quantity == null || quantity == 0){
        alert("plaese select a color and quantity")
        return true
    }
}
function redirectToCart(){
    window.location.href = "cart.html"
}
