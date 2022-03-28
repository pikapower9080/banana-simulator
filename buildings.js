class building {
    constructor(name, description, price, defaultyield, image){
        var template = document.getElementById("shop_template")
        var clone = template.cloneNode(true)
        var shop = document.getElementById("shop")
        clone.removeAttribute("style")
        var icon = clone.getElementsByClassName("shopicon")[0]
        icon.setAttribute("src", image)
        var price = clone.getElementsByClassName("shopcardprice")[0]
        price.innerHTML = `${price} Bananas`
        var label = clone.getElementsByClassName("itemlabel")[0]
        label.innerHTML = name
        var info = clone.getElementsByClassName("shopcard-info")[0]
        info.innerHTML = description
        var yield = clone.getElementsByClassName("shopcard-yield")[0]
        yield.innerHTML = `+${defaultyield} Bananas per click`
        shop.appendChild(clone)
        $(clone).click(function(){
            
        })
    }
}