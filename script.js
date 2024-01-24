function ll(x){return 1/(1+Math.exp(-x));}
function onclick(elem, func) {elem.addEventListener("click", func);}
function grab(classname){return document.getElementsByClassName(classname)[0];}
function add(type, parentclass, childclass, top, left){
  parent = grab(parentclass);
  child = document.createElement(type);
  child.style.top = String(top)+"px";
  child.style.left = String(left)+"px";
  child.className = childclass;
  parent.appendChild(child);}

async function load() {
  patch = grab("dropdown").value
  mainurl = "https://www.aluneaiserver.com/";

  poproles = await (await fetch(mainurl+'data/setup/poproles')).json();
  rolechamps = await (await fetch(mainurl+'data/setup/rolechamps')).json();
  names = await (await fetch(mainurl+'data/setup/names')).json();
  roledict = await (await fetch(mainurl+'data/setup/roledict')).json();
  namedict = await (await fetch(mainurl+'data/setup/namedict')).json();
  total = await (await fetch(mainurl+'data/'+patch+'/total')).json();
  games = await (await fetch(mainurl+'data/'+patch+'/games')).json();
  roledeltas = await (await fetch(mainurl+'data/'+patch+'/roledeltas')).json();
  basedeltas = await (await fetch(mainurl+'data/'+patch+'/basedeltas')).json();
  synergies = await (await fetch(mainurl+'data/'+patch+'/synergies')).json();
  counters = await (await fetch(mainurl+'data/'+patch+'/counters')).json();

  roledeltas[null] = [0, 0, 0, 0, 0]; basedeltas[null] = 0;
  for (let i = 0; i < 166; i++) {synergies[i][null] = 0; counters[i][null] = 0;}
  zeros = Array(166).fill(0); zeros[null] = 0;
  counters[null] = zeros; synergies[null] = zeros;
  namedict["del"] = null; namedict["vi"] = 145;
  console.log('Last Updated 1/24/2024 12:08')

  grab("words6").textContent = total+" Matches Analyzed"
  display()}

role = ["Top", "Jungle", "Middle", "Bottom", "Support"];
titles = ["", "Name", "Score", "Base", "Pick"];

nl = [null, null, null, null, null];
myrole = 0; showall = 0; cf = 1;
team = [null, null, null, null, null];
enemy = [null, null, null, null, null];

ci = "Assets/Champion_icon_"

for (let i = 0; i < 5; i++) {
  add("div", "main", "x"+i+" y1 slab txt", 100, i*100);
  add("img", "main", "x"+i+" y2 big", 150, i*100);
  add("div", "main", "x"+i+" y3 slab txt", 250, i*100);
  add("div", "main", "x"+i+" y4 slab txt", 350, i*100);
  add("img", "main", "x"+i+" y5 big", 400, i*100);
  add("div", "main", "x"+i+" y6 slab txt", 500, i*100);
  add("button", "main", "x"+i+" y7 rb big", 0, (i+6)*100);
  add("div", "main", "x"+i+" y8 slab txt", 100, (i+6)*100);
  grab("x"+i+" y2").src = "Assets/"+role[i]+".png";
  grab("x"+i+" y5").src = "Assets/"+role[i]+".png";
  grab("x"+i+" y7").style.backgroundImage = "url('"+"Assets/"+role[i]+".png"+"')";
  grab("x"+i+" y8").textContent = titles[i];
  onclick(grab("x"+i+" y7"), function() {myrole = i ; display()});}

function buildscroll() {
  grab("scroll").remove()
  add("div", "main", "scroll", 150, 600);
  for (let i = 0; i < champlist.length; i++) {
    add("img", "scroll", "small xx1 yy"+i, 50*i, 0);
    add("img", "scroll", "small xx2 yy"+i, 50*i, 50);
    add("div", "scroll", "slab txt xx3 yy"+i, 50*i, 100);
    add("div", "scroll", "slab txt xx4 yy"+i, 50*i, 200);
    add("div", "scroll", "slab txt xx5 yy"+i, 50*i, 300);
    add("div", "scroll", "slab txt xx6 yy"+i, 50*i, 400);
    grab("xx1 yy"+i).src = "Assets/Specialist.png";
    grab("xx2 yy"+i).src = "Assets/NoChampionSquare.png";}}

grab("form0").placeholder = "Eg. 'Aphelios' or 'aphel' or 'aph bot'";

function onenter(x) {if (event.keyCode == 13) {onsubmit(x);}}
grab("form0").addEventListener("keypress", function() {onenter(0)});
grab("form1").addEventListener("keypress", function() {onenter(1)});

onclick(grab("random"), function() {randomize(); display()});
onclick(grab("filter"), function() {showall = 1 - showall; display()});
onclick(grab("cf"), function() {cf = 1 - cf; display()});
onclick(grab("reset"), function() {team = [...nl]; enemy = [...nl]; display()});
onclick(grab("switch"), function() {[team, enemy] = [enemy, team]; display()})

load()
