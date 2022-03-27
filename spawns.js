// Controls the spawn of the golden banana currently (More stuff later?)

var shinies = {}
shinies.globalspawndelay = 60000
shinies.goldenbanana = {
    id: "goldenbanana",
    image: "assets/golden_banana.png",
    yieldpercentage: 0.3, // What percent of your current points does it give?
    subtract: false, // Subtract the yield that would be earned?
    weight: 20,
    lifetime: 15 // How many seconds does it stay on screen?
}
shinies.plantain = {
    id: "plantain",
    image: "assets/golden_banana.png",
    yieldpercentage: 0.3,
    subtract: true,
    weight: 3,
    lifetime: 15
}
var shinylist = [shinies.goldenbanana, shinies.plantain]

function weightarray(arr){
    return [].concat(...arr.map((obj) => Array(Math.ceil(obj.weight * 100)).fill(obj))); 
}
function pickweighted(arr){
    var weighted = weightarray(arr)
    return weighted[Math.floor(Math.random() * weighted.length)]
}
class Shiny {
    constructor(shinyobject){
        const shinytemplate = document.getElementById("shinytemplate")
        var clone = shinytemplate.cloneNode(true)
        document.getElementById("shinies").appendChild(clone)
        var img = clone.getElementsByClassName("shiny")[0]
        img.setAttribute("src", shinyobject.image)
        clone.removeAttribute("id")
        clone.removeAttribute("style")
        var identify = clone.getElementsByTagName("div")[0]
        identify.classList.remove("shiny_identify")
        identify.classList.add("shiny_" + shinyobject.id)
        var divwidth = 160
        var divheight = 160
        var posx = (Math.random() * ($(document).width() - divwidth));
        var posy = (Math.random() * ($(document).height() - divheight));
        img.setAttribute("style", `left: ${posx}px; top: ${posy}px;`)
        setTimeout(() => {
            try {
                clone.remove()
            } catch (error) {}
        }, shinies.goldenbanana.lifetime * 1000);
    }
}
function shinyclick(shinyelement){
    var shinytext = shinyelement.getElementsByClassName("shinytext")[0]
    shinytext.setAttribute("style", shinyelement.getElementsByClassName("shiny")[0].getAttribute("style"))
    shinytext.classList.add("fadein")
    var shinytype = shinyelement.getElementsByTagName("div")[0].classList[1].replace("shiny_", "")
    console.debug(shinytype)
    if (shinytype == "goldenbanana") {
        var yieldtogive = calcbpc() * 60
        shinytext.innerHTML = shinytext.innerHTML.replace("%bananas%", commas(String(yieldtogive)))
        shinytext.innerHTML = shinytext.innerHTML.replace("%op%", "+")
        shinytext.innerHTML = shinytext.innerHTML.replace("%type%", "Golden Banana!")
        points = parseInt(points) + parseInt(yieldtogive)
        setTimeout(() => {
            shinyelement.remove()
        }, 1500);
    } else if(shinytype == "plantain") {
        var yieldtotake = calcbpc() * 25
        if (yieldtotake < 1) {
            yieldtotake = 0
        }
        shinytext.innerHTML = shinytext.innerHTML.replace("%bananas%", commas(String(yieldtotake)))
        shinytext.innerHTML = shinytext.innerHTML.replace("%op%", "-")
        shinytext.innerHTML = shinytext.innerHTML.replace("%type%", "Plantain!")
        points = parseInt(points) - parseInt(yieldtotake)
        setTimeout(() => {
            shinyelement.remove()
        }, 1500);
    } else {
        shinyelement.remove()
    }
}

setInterval(() => {
    var selectedshiny = shinylist[Math.floor(Math.random() * shinylist.length)]
    new Shiny(selectedshiny);
}, shinies.globalspawndelay);