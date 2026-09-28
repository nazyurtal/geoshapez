const TAU=Math.PI*2;
const forms=[['torus','Torus','wire'],['sphere','Sphere','wire'],['wave','Wave','wire'],['helix','Helix','wire'],['bloom','Bloom','geo'],['orbit','Orbit','geo'],['tunnel','Tunnel','geo'],['rings','Rings','geo'],['hourglass','Hourglass','wire'],['dots','Dot sphere','dot'],['vortex','Vortex','dot'],['grid','Dot wave','dot'],...extraForms,...variationForms];
const defaults={type:'torus',density:28,twist:35,tilt:58,rotation:-25,axisX:0,axisY:0,axisZ:0,scale:85,stroke:1.2,color:'#000000',bg:'#ffffff'};let state={...defaults};
function geometry(s){if(shapeFamilies[s.type])s={...s,type:shapeFamilies[s.type][s.variant||0][0]};let spatialRadius=0;let out=[],n=s.density,tw=s.twist/100,tilt=s.tilt*Math.PI/180;const f=v=>Number(v.toFixed(3));const path=pts=>out.push('<path d="'+pts.map((p,i)=>(i?'L':'M')+f(p[0])+','+f(p[1])).join(' ')+'"/>');const curve=(fn,steps=160)=>path(Array.from({length:steps+1},(_,i)=>fn(i/steps*TAU)));const circle=(x,y,r)=>out.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}"/>`);const project=(x,y,z)=>{spatialRadius=Math.max(spatialRadius,Math.hypot(x,y,z));const ax=(s.axisX||0)*Math.PI/180,ay=(s.axisY||0)*Math.PI/180,az=(s.axisZ||0)*Math.PI/180;let y1=y*Math.cos(ax)-z*Math.sin(ax),z1=y*Math.sin(ax)+z*Math.cos(ax),x2=x*Math.cos(ay)+z1*Math.sin(ay),z2=-x*Math.sin(ay)+z1*Math.cos(ay),x3=x2*Math.cos(az)-y1*Math.sin(az),y3=x2*Math.sin(az)+y1*Math.cos(az);const depth=y3*Math.sin(tilt)+z2*Math.cos(tilt),perspective=900/Math.max(150,900-depth);return[x3*perspective,(y3*Math.cos(tilt)-z2*Math.sin(tilt))*perspective]};
if(s.type==='torus'){for(let i=0;i<n;i++){let u=i/n*TAU;curve(v=>{let a=v+tw*Math.sin(u)*1.3,r=140+55*Math.cos(a);return project(r*Math.cos(u),r*Math.sin(u),55*Math.sin(a))},100)}for(let i=0;i<Math.max(8,Math.round(n/2));i++){let v=i/Math.max(8,Math.round(n/2))*TAU;curve(u=>{let a=v+tw*Math.sin(u)*1.3,r=140+55*Math.cos(a);return project(r*Math.cos(u),r*Math.sin(u),55*Math.sin(a))})}}
if(s.type==='sphere'){for(let i=0;i<n;i++){let a=i/n*Math.PI;curve(t=>project(185*Math.sin(t)*Math.cos(a+tw*Math.cos(t)),185*Math.sin(t)*Math.sin(a+tw*Math.cos(t)),185*Math.cos(t)))}for(let i=1;i<12;i++){let a=i/12*Math.PI;curve(t=>project(185*Math.sin(a)*Math.cos(t),185*Math.sin(a)*Math.sin(t),185*Math.cos(a)))}}
if(s.type==='wave'){for(let j=0;j<n;j++)path(Array.from({length:121},(_,i)=>{let x=(i/120-.5)*380;return [x,(j/(n-1)-.5)*230+50*Math.sin(i/120*TAU*(1+tw)+j/n*3)*Math.cos(tilt)]}))}
if(s.type==='helix'){for(let j=0;j<n;j++){let y=(j/(n-1)-.5)*310;curve(t=>[150*Math.cos(t+tw*j/n*4),y+45*Math.sin(t)*Math.sin(tilt)])}}
if(s.type==='bloom'){for(let j=0;j<n;j++)curve(t=>{let r=140+45*Math.sin(t*(3+Math.round(tw*6))+j/n*TAU);return [r*Math.cos(t),r*Math.sin(t)]})}
if(s.type==='orbit'){for(let j=0;j<n;j++){let a=j/n*Math.PI;curve(t=>{let x=190*Math.cos(t),y=(20+110*tw)*Math.sin(t)*Math.sin(tilt);return [x*Math.cos(a)-y*Math.sin(a),x*Math.sin(a)+y*Math.cos(a)]})}}
if(s.type==='tunnel'){for(let j=0;j<n;j++){let r=190*Math.pow(1-j/(n+2),1.5),a=j/n*tw*1.8;path(Array.from({length:5},(_,i)=>{let t=i/4*TAU+Math.PI/4+a;return [r*Math.cos(t),r*Math.sin(t)]}))}}
if(s.type==='rings'){for(let j=0;j<n;j++){let r=185*(j+1)/n;circle(0,(185-r)*tw*1.9,r)}}
if(s.type==='hourglass'){for(let j=0;j<n;j++){let y=(j/(n-1)-.5)*340,r=25+Math.pow(Math.abs(y)/170,1.5)*130;curve(t=>[r*Math.cos(t+tw*y/100),y+r*.25*Math.sin(t)*Math.sin(tilt)])}for(let j=0;j<12;j++)path(Array.from({length:100},(_,i)=>{let y=(i/99-.5)*340,r=25+Math.pow(Math.abs(y)/170,1.5)*130,t=j/12*TAU+tw*y/100;return [r*Math.cos(t),y+r*.25*Math.sin(t)*Math.sin(tilt)]}))}
if(s.type==='dots'){for(let j=1;j<n;j++){let a=j/n*Math.PI,k=Math.max(4,Math.round(Math.sin(a)*n*2));for(let i=0;i<k;i++){let t=i/k*TAU+tw*j/7,p=project(185*Math.sin(a)*Math.cos(t),185*Math.sin(a)*Math.sin(t),185*Math.cos(a));out.push(`<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${f(1.3+s.stroke*.7)}" fill="currentColor" stroke="none"/>`)}}}
if(s.type==='vortex'){for(let j=0;j<n;j++)for(let i=0;i<16;i++){let r=25+i*10,t=j/n*TAU+i*tw*.17;out.push(`<circle cx="${f(r*Math.cos(t))}" cy="${f(r*Math.sin(t))}" r="${f(1+i/7+s.stroke*.3)}" fill="currentColor" stroke="none"/>`)}}
if(s.type==='grid'){for(let j=0;j<n;j++)for(let i=0;i<n;i++){let x=(i/(n-1)-.5)*350,y=(j/(n-1)-.5)*350,a=Math.sin(i/n*TAU+tw*6)*Math.cos(j/n*TAU);out.push(`<circle cx="${f(x+a*18)}" cy="${f(y+a*28)}" r="${f(1+(a+1)*1.5+s.stroke*.3)}" fill="currentColor" stroke="none"/>`)}}
appendGeometry(s,{out,n,tw,tilt,f,path,curve,circle,project});
appendVariations(s,{out,n,tw,tilt,f,path,curve,circle,project});
let markup=out.join('');
if(forms.find(form=>form[0]===s.type)?.[2]==='dot') markup=markup.replace(/r="([\d.]+)"/g,(_,radius)=>`r="${f(Number(radius)*s.stroke/1.2)}"`);
const box={minX:Infinity,minY:Infinity,maxX:-Infinity,maxY:-Infinity};
const include=(x,y,r=0)=>{box.minX=Math.min(box.minX,x-r);box.maxX=Math.max(box.maxX,x+r);box.minY=Math.min(box.minY,y-r);box.maxY=Math.max(box.maxY,y+r)};
for(const match of markup.matchAll(/<path d="([^"]+)"/g)){const values=match[1].match(/-?\d+(?:\.\d+)?/g).map(Number);for(let i=0;i<values.length;i+=2)include(values[i],values[i+1])}
for(const match of markup.matchAll(/<circle cx="([^"]+)" cy="([^"]+)" r="([^"]+)"/g))include(+match[1],+match[2],+match[3]);
const center=[(box.minX+box.maxX)/2,(box.minY+box.maxY)/2];let radius=1;
for(const match of markup.matchAll(/<path d="([^"]+)"/g)){const values=match[1].match(/-?\d+(?:\.\d+)?/g).map(Number);for(let i=0;i<values.length;i+=2)radius=Math.max(radius,Math.hypot(values[i]-center[0],values[i+1]-center[1]))}
for(const match of markup.matchAll(/<circle cx="([^"]+)" cy="([^"]+)" r="([^"]+)"/g))radius=Math.max(radius,Math.hypot(+match[1]-center[0],+match[2]-center[1])+(+match[3]));
return {markup,count:out.length,center,radius,bounds:box,spatialRadius}}

const geometryCache=new Map();
function content(s){
 const key=[s.type,s.variant||0,s.density,s.twist,s.tilt,s.stroke,s.axisX,s.axisY,s.axisZ].join(':');
 let g=geometryCache.get(key);
 if(!g){g=geometry(s);geometryCache.set(key,g);if(geometryCache.size>32)geometryCache.delete(geometryCache.keys().next().value)}
 const stableRadius=g.spatialRadius?g.spatialRadius*900/Math.max(150,900-g.spatialRadius):g.radius;const center=g.spatialRadius?[0,0]:g.center;const fit=220/stableRadius*s.scale/100;
 return {markup:`<g id="geoshapez-${s.type}" transform="translate(300 300) rotate(${s.rotation}) scale(${fit}) translate(${-center[0]} ${-center[1]})" fill="none" stroke="#000000" color="#000000" stroke-width="${s.stroke}" stroke-linecap="round" stroke-linejoin="round">${g.markup}</g>`,count:g.count};
}
