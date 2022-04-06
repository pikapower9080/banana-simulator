/*
  Fun fact: This is the ungliest source code ever.
  I don't want to rewrite the whole thing just so that I can make this more efficent so deal with it.
  By the way I had trouble saving arrays or json or whatever in localstorage so there's a key for every single upgrade :(
*/

const version = "0.5.7"

var points = 0
let bpc = 1
var bulidings = {
  "bananacrate": 0,
  "bananatree": 0,
  "monkey": 0
}
console.log("=0 z0mg a hecker!!1!1")
console.log("Remember that cheating isn't fun!")
const verbose = false // Used for testing and debugging. Maybe there will be an option for this soon?

function logverbose(logtext){
  if(verbose) {
    console.log(logtext)
  }
}
// Localstorage checks
function checkstorage(key, defaultvalue) {
    if (localStorage.getItem(key) == null) {
        localStorage.setItem(key, defaultvalue)
        logverbose("Saved new value " + defaultvalue + " for " + key)
        return defaultvalue
    } else {
        logverbose("Value for " + key + " already exists: " + localStorage.getItem(key))
        return localStorage.getItem(key)
    }
}
function calcprice(defaultprice, amount){
  let n = defaultprice
  for (let index = 0; index < amount; index++) {
      n = Math.floor(n * 1.2)
  }
  return n
}
//bpc = checkstorage("bpc", bpc) // Bpc is now calculated instead of stored. Same goes with any similar code i comment out
bpc = calcbpc()
var username = checkstorage("username", makeUsername())
var buildings_monkeys = checkstorage("buildings_monkeys", 0)
var buildings_bananatrees = checkstorage("buildings_bananatrees", 0)
var buildings_bananacrate = checkstorage("buildings_bananacrate", 0)
var buildings_magikgrow = checkstorage("buildings_magikgrow", 0)
var buildings_forest = checkstorage("buildings_forest", 0)
var buildings_machine = checkstorage("buildings_machine", 0)
var buildings_box = checkstorage("buildings_box", 0)
var buildings_wizard = checkstorage("buildings_wizard", 0)
var buildings_twitter = checkstorage("buildings_twitter", 0)
var price_monkeys = calcprice(7500, buildings_monkeys)
var price_bananatrees = calcprice(1000, buildings_bananatrees)
var price_bananacrate = calcprice(100, buildings_bananacrate)
var price_magikgrow = calcprice(10000, buildings_magikgrow)
var price_forest = calcprice(50000, buildings_forest)
var price_machine = calcprice(100000, buildings_machine)
var price_box = calcprice(200000, buildings_box)
var price_wizard = calcprice(350000, buildings_wizard)
var price_twitter = calcprice(500000, buildings_twitter)
var yield_bananacrate = checkstorage("yield_bananacrate", 1)
var yield_bananatree = checkstorage("yield_bananatree", 2)
var yield_monkey = checkstorage("yield_monkey", 10)
var yield_magikgrow = checkstorage("yield_magikgrow", 20)
var yield_forest = checkstorage("yield_forest", 50)
var yield_machine = checkstorage("yield_machine", 75)
var yield_box = checkstorage("yield_box", 125)
var yield_wizard = checkstorage("yield_wizard", 250)
var yield_twitter = checkstorage("yield_twitter", 400)

var settingselements = {}
settingselements.togglesound = document.getElementById("soundtoggle")
settingselements.allowselect = document.getElementById("allowselect")

function calcbpc(){
  let newbpc = 1
  var buildingsl = [buildings_bananacrate, buildings_bananatrees, buildings_monkeys, buildings_magikgrow, buildings_forest, buildings_machine, buildings_box, buildings_wizard, buildings_twitter]
  var yieldl = [yield_bananacrate, yield_bananatree, yield_monkey, yield_magikgrow, yield_forest, yield_machine, yield_box, yield_wizard, yield_twitter]
  for (let index = 0; index < buildingsl.length; index++) {
    const element = yieldl[index];
    newbpc += buildingsl[index] * yieldl[index]
  }
  return newbpc
}

// I copied this from cookie clicker, litterally (thanks!!!)
function rawFormatter(val){return Math.round(val*1000)/1000;}

var formatLong=[' thousand',' million',' billion',' trillion',' quadrillion',' quintillion',' sextillion',' septillion',' octillion',' nonillion'];
var prefixes=['','un','duo','tre','quattuor','quin','sex','septen','octo','novem'];
var suffixes=['decillion','vigintillion','trigintillion','quadragintillion','quinquagintillion','sexagintillion','septuagintillion','octogintillion','nonagintillion'];
for (var i in suffixes)
{
	for (var ii in prefixes)
	{
		formatLong.push(' '+prefixes[ii]+suffixes[i]);
	}
}

function formatEveryThirdPower(notations)
{
	return function (val)
	{
		var base=0,notationValue='';
		if (!isFinite(val)) return 'Infinity';
		if (val>1000000)
		{
			val/=1000;
			while(Math.round(val)>=1000)
			{
				val/=1000;
				base++;
			}
			if (base>=notations.length) {return 'Infinity';} else {notationValue=notations[base];}
		}
		return (Math.round(val*1000)/1000)+notationValue;
	};
}

// End Copy and Pasted zone

// I wanted to store bananas in localstorage and not cookies and so i just changed these functions because i was too lazy to update all the code.
function setCookie(cname, cvalue, exdays) {
  localStorage.setItem(cname, cvalue)
}
function getCookie(cname) {
  return localStorage.getItem(cname)
}
if (getCookie("save") == null) {
  setCookie("save", 0, 30)
} else {
  points = getCookie("save")
}
// I made it so the commas function returns a shortened value so I didn't have to update all my code
function commas(x) {
  // var cstring = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  if (parseInt(x) <= 1000000){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  } else {
    return formatEveryThirdPower(formatLong)(x)
  }
}
function resetusername() {
  username = makeUsername()
  localStorage.setItem("username", username)
}
function updatecount() {
  document.getElementById("count").innerHTML = `Bananas: ${commas(formatEveryThirdPower(formatLong)(points))}`
  bpc = calcbpc()
  if (parseInt(points) < 0) {
    points = 0
  }
  document.getElementById("bpscount").innerHTML = `+${commas(bpc)} per click` // Fun fact: It used to be called bps for bananas per second!
  document.getElementById("yourname").innerHTML = username + "'s Banana " + getstandlevel() 
  setCookie("save", points, 30)
  localStorage.setItem("buildings_monkeys", buildings_monkeys)
  localStorage.setItem("buildings_bananacrate", buildings_bananacrate)
  localStorage.setItem("buildings_bananatrees", buildings_bananatrees)
  localStorage.setItem("buildings_magikgrow", buildings_magikgrow)
  localStorage.setItem("buildings_forest", buildings_forest)
  localStorage.setItem("buildings_machine", buildings_machine)
  localStorage.setItem("buildings_box", buildings_box)
  localStorage.setItem("buildings_wizard", buildings_wizard)
  localStorage.setItem("buildings_twitter", buildings_twitter)
}
function updatepricetags() {
    document.getElementById("bananacrateprice").innerHTML = commas(price_bananacrate) + " bananas"
    document.getElementById("bananatreeprice").innerHTML = commas(price_bananatrees) + " bananas"
    document.getElementById("monkeyprice").innerHTML = commas(price_monkeys) + " bananas"
    document.getElementById("magikgrowprice").innerHTML = commas(price_magikgrow) + " bananas"
    document.getElementById("forestprice").innerHTML = commas(price_forest) + " bananas"
    document.getElementById("machineprice").innerHTML = commas(price_machine) + " bananas"
    document.getElementById("boxprice").innerHTML = commas(price_box) + " bananas"
    document.getElementById("wizardprice").innerHTML = commas(price_wizard) + " bananas"
    document.getElementById("twitterprice").innerHTML = commas(price_twitter) + " bananas"
}
function updatebulidingcounts() {
  document.getElementById('cratecount').innerHTML = " x" + buildings_bananacrate
  document.getElementById('bananatreecount').innerHTML = " x" + buildings_bananatrees
  document.getElementById('monkeycount').innerHTML = " x" + buildings_monkeys
  document.getElementById('magikgrowcount').innerHTML = " x" + buildings_magikgrow
  document.getElementById('forestcount').innerHTML = " x" + buildings_forest
  document.getElementById('machinecount').innerHTML = " x" + buildings_machine
  document.getElementById('boxcount').innerHTML = " x" + buildings_box
  document.getElementById('wizardcount').innerHTML = " x" + buildings_wizard
  document.getElementById('twittercount').innerHTML = " x" + buildings_twitter
  document.getElementById('yield_bananacrate').innerHTML = `+${yield_bananacrate} Banana(s) per click`
  document.getElementById('yield_bananatree').innerHTML = `+${yield_bananatree} Bananas per click`
  document.getElementById('yield_monkey').innerHTML = `+${yield_monkey} Bananas per click`
  document.getElementById('yield_magikgrow').innerHTML = `+${yield_monkey} Bananas per click`
  document.getElementById('yield_forest').innerHTML = `+${yield_forest} Bananas per click`
  document.getElementById('yield_machine').innerHTML = `+${yield_machine} Bananas per click`
  document.getElementById('yield_box').innerHTML = `+${yield_machine} Bananas per click`
  document.getElementById('yield_wizard').innerHTML = `+${yield_wizard} Bananas per click`
  document.getElementById('yield_twitter').innerHTML = `+${yield_twitter} Bananas per click`
}
function saveyields(){
  localStorage.setItem("yield_bananacrate", yield_bananacrate)
  localStorage.setItem("yield_bananatree", yield_bananatree)
  localStorage.setItem("yield_monkey", yield_monkey)
  localStorage.setItem("yield_magikgrow", yield_magikgrow)
  localStorage.setItem("yield_forest", yield_forest)
  localStorage.setItem("yield_machine", yield_machine)
  localStorage.setItem("yield_box", yield_box)
  localStorage.setItem("yield_wizard", yield_wizard)
  localStorage.setItem("yield_twitter", yield_twitter)
}
function bananaclick() {
    for (let index = 0; index < bpc; index++) {
      points ++
    }
    if (settingselements.togglesound.checked) {
      const clicksound = new Audio("assets/click.wav")
      clicksound.play() 
    }
    updatecount()
}
function addtobpc(amount) {
  for (let index = 0; index < amount; index++) {
    bpc ++
  }
}
function processpurchase(price, bpcamount){
  if (points >= price) {
    points -= price
    addtobpc(bpcamount)
    updatepricetags(); updatebulidingcounts()
  }
}
function storagetest() {
  var testtext = prompt("Enter anything below:")
  try {
    localStorage.setItem("localstorage_test", testtext)
  } catch (error) {
    alert("Oh no! It looks like something's wrong. Your input couldn't be saved. Here's all I know: " + error)
  } finally {
    alert("Ok, finished doing that. Now reload the page and click on the other link to see if your value was saved.")
  }
}
function finishstoragetest() {
  var confirmlstest = confirm("If everything worked as it should have, you should see the text you entered when you click ok.")
  if (confirmlstest == true) {
    alert(localStorage.getItem("localstorage_test"))
  }
}

function changelog(){
  document.getElementById("version").innerHTML = version
  document.getElementById("changelog").showModal()
}
function infobtn(element){
  changelog()
  element.classList.add("rotateanim2")
  setTimeout(() => {
    element.classList.remove("rotateanim2")
  }, 1000);
}
var settingsdb = false
function opensettings(element){
  if (settingsdb == false) {
    settingsdb = true
    element.classList.add("rotateanim")
    document.getElementById("settingsdialog").showModal()
    setTimeout(() => {
      element.classList.remove("rotateanim")
      settingsdb = false
    }, 1000);
  }
}
function hidechangelogtilupdate(){
  localStorage.setItem("lastversion", version)
  document.getElementById("changelog").close()
}
// Show the changelog popup
if (localStorage.getItem("lastversion") && localStorage.getItem("lastversion") == version) {
  console.log("Not showing changelog since it's been hidden until the next update.")
} else {
  changelog()
}
var clbbdb = false // Stands for changelog big banana debounce
$("#changelogbigbanana").click(function(){
  if (clbbdb == false) {
    clbbdb = true
    document.getElementById("changelogbigbanana").classList.add("rotateanim")
    document.getElementById("changelogbigbanana").classList.remove("shakeanim")
    setTimeout(() => {
      document.getElementById("changelogbigbanana").classList.remove("rotateanim")
      document.getElementById("changelogbigbanana").classList.add("shakeanim")
      clbbdb = false
    }, 500);
  }
})
settingselements.allowselect.addEventListener("input", function(event){
  if (settingselements.allowselect.checked == true) {
    document.getElementsByTagName("html")[0].style.setProperty("--user-select-rule", "all")
  } else {
    document.getElementsByTagName("html")[0].style.setProperty("--user-select-rule", "none")
  }
})

// If you've made it this far: Here's how to activate cheats. Click the settings heading text 5-6 times and booh yeah!
var stitle = document.getElementById("settingstitle")
var stitleclicks = 0
$("#settingstitle").click(function(){
  if (stitleclicks >= 5) {
    stitle.innerHTML = "Cheats menu :o"
    $("#cheatsmenu").show()
  } else {
    stitleclicks ++
  }
})
var cheats = {}
cheats.addBananas = function(amount){
  for (let i = 0; i < amount; i++) {
    points ++
  }
  updatecount()
}
cheats.resetUpgrades = function(){
  localStorage.setItem("p_upgrades", "")
}
cheats.infinite = function(){
  points = 9999999999999999999999999
  updatecount()
}
cheats.multiplyby = function(amount){
  points = (points*1) * amount
}
cheats.clearBananas = function(){
  points = 0
  updatecount()
}

function onupdate(){
  updatepricetags()
  updatebulidingcounts()
  updatecount()
  bpc = calcbpc()
}
onupdate()
setInterval(() => {
  updatecount()
}, 100);