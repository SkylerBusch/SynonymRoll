// .flat

stuff = [222, true, ['calm', 'composure'], ['chilly', {weed: [['calm', 'composure'], ['chilly', {weed:'hip'}]]}]]

format = x => {
  if(  x instanceof Array  ) return `[${x.map(format).join(", ")}]`;
  if(typeof x === "string" ) return `"${x}"`;
  if(!(x instanceof Object)) return `${x}`; 
  return `{${Object.entries(x)
                   .map(([k,v])=>`${k}: ${format(v)}`)
                   .join(", ")}}`;
}

console.log(format(stuff))

//console.log(format(stuff).split(' ').reverse().join(' '))

// ["calm","composure","chilly","hip"]

/* makePlayer = (x,y) => {
  p = {x:x, y:y, hp:100};
  p.announceSelf = () => console.log(
    `Hi, I am player. my x=${p.x}, my y=${p.y}, and my hp=${p.hp}`);
  return p;
};
myPlayer = makePlayer(200,300);
myPlayer.announceSelf(); */