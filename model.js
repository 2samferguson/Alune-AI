function randomize() {
  for (let i = 0; i < 5; i++) {
    team[i] = rolechamps[i][Math.floor(Math.random()*rolechamps[i].length)];
    enemy[i] = rolechamps[i][Math.floor(Math.random()*rolechamps[i].length)];}}

function compute(id, r, side){
  te = [team, enemy][side];
  en = [enemy, team][side];
  s = cf*basedeltas[id]+roledeltas[id][r];
  for (let i = 0; i < 5; i++) {
    if (i != r) {s += synergies[id][te[i]];}
    s += counters[id][en[i]];}
  return 100*ll(s)-50}

function onsubmit(x) {
  qval = grab("form"+x).value.toLowerCase().split(" ");
  qchamp = namedict[qval[0]];
  qrole = poproles[qchamp];
  if (qval.length > 1){qrole = roledict[qval[1]];}
  [team, enemy][x][qrole] = qchamp;
  if (qchamp == undefined){[team, enemy][x][qrole] = null;}
  grab("form"+x).value = null;
  grab("form"+x).placeholder = "";
  display()}

function predict(p) {
  for (let i = 0; i < 5; i++) {
    p += basedeltas[team[i]] + roledeltas[team[i]][i];
    p -= basedeltas[enemy[i]] + roledeltas[enemy[i]][i];
    for (let j = 0; j < 5; j++) {
      if (i != j) {p += synergies[team[i]][team[j]]/2;}
      if (i != j) {p -= synergies[enemy[i]][enemy[j]]/2;}
      p += counters[team[i]][enemy[j]];}}
  grab("bar1").textContent = (100*ll(p)).toFixed(2);
  grab("bar2").textContent = (100*ll(-p)).toFixed(2);
  grab("bar1").style.width = String((490*ll(p)).toFixed(2))+"px";
  grab("bar2").style.left = String((490*ll(p)).toFixed(2))+"px";
  grab("bar2").style.width = String((490*ll(-p)).toFixed(2))+"px";}

function display(){
  for (let j = 0; j < 2; j++) {
    side = [team, enemy][j]
    for (let i = 0; i < 5; i++) {
      if (side[i] == null){
        grab("x"+i+" y"+(3*j+1)).textContent = null;
        grab("x"+i+" y"+(3*j+2)).src = "Assets/"+role[i]+".png";
        grab("x"+i+" y"+(3*j+3)).textContent = null;
        continue;}

      score = compute(side[i], i, j)
      showscore = ["+ ", "- "][+(score < 0)]+Math.abs(score).toFixed(2)
      grab("x"+i+" y"+(3*j+1)).textContent = names[side[i]];
      grab("x"+i+" y"+(3*j+2)).src = ci+names[side[i]]+".png";
      grab("x"+i+" y"+(3*j+3)).textContent = showscore;
      grab("x"+i+" y"+(3*j+3)).style.color = ["lime", "red"][+(score < 0)^j];}}

  grab("filter").textContent=["Show all Champions","Filter by Role"][showall];
  grab("cf").textContent=["Restore Default Scoring","Flatten Base Scores"][cf];

  function compare(a, b){return compute(b, myrole, 0) - compute(a, myrole, 0);}
  function argsort(){return champlist.sort(compare);}
  champlist = rolechamps[myrole];
  if (showall == 1) {champlist = [...Array(166).keys()];}
  order = argsort();
  buildscroll();
  predict(0);

  for (let i = 0; i < champlist.length; i++) {
    j = order[i]
    score = compute(j, myrole, 0)
    showscore = ["+ ", "- "][+(score < 0)]+Math.abs(score).toFixed(2)
    grab("xx1 yy"+i).src = "Assets/"+role[myrole]+".png";
    grab("xx2 yy"+i).src = ci+names[j]+".png";
    grab("xx3 yy"+i).textContent = names[j];
    grab("xx4 yy"+i).textContent = showscore;
    grab("xx4 yy"+i).style.color = ["lime", "red"][+(score < 0)];
    grab("xx5 yy"+i).textContent = (100*ll(basedeltas[j])).toFixed(2);
    grab("xx6 yy"+i).textContent = (100*

    games[j][myrole]/total).toFixed(2);}}
