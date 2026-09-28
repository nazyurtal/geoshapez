const variationForms=[
 ['enneperSurface','Enneper surface','wire'],['torusLink','Linked rings','wire'],['rippleVase','Ripple vase','wire'],['spiralShell3','Conical spiral','wire'],['twistedSail','Twisted sail','wire'],['figureKnot','Figure-eight knot','wire'],['harmonicPetals','Harmonic petals','geo'],['arcRosette','Arc rosette','geo'],['wovenLens','Woven lens','geo'],['superformula','Superformula','geo'],['radialTiles','Radial tiles','geo'],['circularLabyrinth','Circular labyrinth','geo'],
 ['rippleCorona','Ripple corona','geo'],['fragmentedOrbit','Fragmented orbit','wire'],['beadedTwist','Beaded twist','wire'],
 ['brokenOrbits','Broken orbits','symbol'],['materialDiscs','Material discs','symbol'],['balanceCircles','Balance circles','symbol'],['arcMatrix','Arc matrix','geo'],['dottedValley','Dotted valley','symbol'],['molecularShell','Molecular shell','wire'],['spatialCircuit','Spatial circuit','wire'],['orbitalInstrument','Orbital instrument','symbol'],
 ['orbitalLenses','Orbital lenses','symbol'],['projectionCone','Projection cone','symbol'],['satelliteDisc','Satellite disc','symbol'],['diamondChain','Diamond chain','symbol'],['compassDisc','Compass disc','symbol'],['pinwheelMark','Pinwheel mark','symbol'],['sunriseBowl','Sunrise bowl','symbol'],['gravityLines','Gravity lines','symbol'],['dashedNova','Dashed nova','symbol'],['binaryMatrix','Binary matrix','symbol'],
 ['starPrism','Star prism','symbol'],['vectorBurst','Vector burst','symbol'],['signalRing','Signal ring','symbol'],
 ['nautilus','Nautilus fan','geo'],['ripplePortal','Ripple portal','geo'],['lotusWeave','Lotus weave','geo'],['ribbonLoop','Ribbon loop','wire'],['orbitalCage','Orbital cage','wire'],['duneField','Dune field','wire'],['pleatedFan','Pleated fan','geo'],['eclipseBands','Eclipse bands','geo'],['resonance','Resonance','geo'],['petalCrown','Petal crown','geo'],['twistedHalo','Twisted halo','wire'],['contourIsland','Contour island','geo'],
 ['orbitNodes','Orbital nodes','symbol'],['satellite','Satellite system','symbol'],['triangleOrbit','Tri-orbit','symbol'],['rayNodes','Ray constellation','symbol'],['cylinderNodes','Cylinder study','symbol'],['vennNodes','Intersection study','symbol'],['chainNodes','Linked circles','symbol'],['squareCircle','Circle & square','symbol'],['nodeGrid','Node matrix','symbol'],['orbitalStack','Orbital stack','symbol'],['axisCircle','Axis study','symbol'],['compass','Compass rose','symbol'],['circleSectors','Circle sectors','symbol'],['circleCross','Circle cross','symbol'],['yinOrbit','Paired orbits','symbol'],['arrowOrbit','Orbit arrows','symbol'],
 ['scallopSeal','Scalloped seal','outline'],['starSeal','Star seal','outline'],['sunSeal','Sun seal','outline'],['ovalSeal','Scalloped oval','outline'],['archFrame','Arch frame','outline'],['heartFrame','Heart frame','outline'],['ticketFrame','Ticket frame','outline'],['stampFrame','Postage frame','outline'],['cloudFrame','Cloud frame','outline'],['flowerFrame','Clover frame','outline'],['archBands','Arch bands','outline'],['teardropFrame','Teardrop frame','outline'],
 ['squareGrid','Square grid','geo'],['circleGrid','Circle grid','geo'],['diagonalTile','Diagonal tile','geo'],['wovenSquare','Woven square','geo'],['opticalSquare','Optical square','geo'],['steppedGrid','Stepped grid','geo'],
 ['warpedTorus','Wave torus','wire'],['saddleTorus','Saddle torus','wire'],['pinchedTorus','Pinched torus','wire'],['flutedSphere','Fluted sphere','wire'],['meltedSphere','Melting sphere','wire'],['spikedSphere','Spiked sphere','wire'],['dentedCube','Dented cube','wire'],['meltedCube','Melting cube','wire'],['crownCube','Crowned cube','wire'],['waveCube','Wave cube','wire']
];
const shapeFamilies={
 warpedTorus:[['warpedTorus','Wave'],['saddleTorus','Saddle'],['pinchedTorus','Pinched']],
 flutedSphere:[['flutedSphere','Fluted'],['meltedSphere','Melting'],['spikedSphere','Spiked']],
 dentedCube:[['dentedCube','Dented'],['meltedCube','Melting'],['crownCube','Crowned'],['waveCube','Wave']]
};
for(const [id,variants] of Object.entries(shapeFamilies)){
 for(const [variant] of variants.slice(1)){const i=variationForms.findIndex(f=>f[0]===variant);if(i>=0)variationForms.splice(i,1)}
 variationForms.find(f=>f[0]===id)[1]={warpedTorus:'Sculpted torus',flutedSphere:'Sculpted sphere',dentedCube:'Sculpted cube'}[id];
}
function appendVariations(s,h){
 const {out,n,tw,tilt,f,path,curve,circle,project}=h;
 const line=(a,b)=>path([a,b]),mark=(x,y)=>out.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${f(4+s.stroke)}" fill="#000000" stroke="none"/>`);
 const ellipse=(cx,cy,rx,ry,a=0)=>curve(t=>{const x=rx*Math.cos(t),y=ry*Math.sin(t);return [cx+x*Math.cos(a)-y*Math.sin(a),cy+x*Math.sin(a)+y*Math.cos(a)]});
 const polygon=(sides,r=160,offset=-Math.PI/2)=>path(Array.from({length:sides+1},(_,i)=>[r*Math.cos(i/sides*TAU+offset),r*Math.sin(i/sides*TAU+offset)]));
 const square=(x,y,r)=>path([[x-r,y-r],[x+r,y-r],[x+r,y+r],[x-r,y+r],[x-r,y-r]]);
 const arc=(cx,cy,r,a,b,ry=r)=>path(Array.from({length:121},(_,i)=>[cx+r*Math.cos(a+(b-a)*i/120),cy+ry*Math.sin(a+(b-a)*i/120)]));

 const filledPath=points=>{path(points);out[out.length-1]=out[out.length-1].replace('/>',' fill="#000000" stroke="none"/>')};
 const solidDot=(x,y,r=10)=>out.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="#000000" stroke="none"/>`);
 const dashedCircle=(x,y,r)=>{circle(x,y,r);out[out.length-1]=out[out.length-1].replace('/>',' stroke-dasharray="4 5"/>')};
 if(s.type==='starPrism'){
  const sides=3+Math.round((n-6)/54*6),inner=80+tw*45;
  const ring=r=>Array.from({length:sides+1},(_,i)=>[r*Math.cos(i/sides*TAU-Math.PI/2),r*Math.sin(i/sides*TAU-Math.PI/2)]);
  path(ring(145));out[out.length-1]=out[out.length-1].replace('/>',' stroke-dasharray="4 5"/>');
  const outer=ring(200),inside=ring(inner);path(outer);path(inside);for(let i=0;i<sides;i++)line(outer[i],inside[i]);
  filledPath(Array.from({length:17},(_,i)=>{let a=i/16*TAU-Math.PI/2,r=i%2?14:39;return[r*Math.cos(a),r*Math.sin(a)]}));
 }
 if(s.type==='vectorBurst'){
  const rays=8+Math.round((n-6)/54*16),a=Math.PI/4+tw*.6-.21;
  for(let i=0;i<rays;i++){let t=i/rays*TAU;line([0,0],[160*Math.cos(t),160*Math.sin(t)])}
  const end=[205*Math.cos(a),205*Math.sin(a)];line([0,0],end);for(const turn of [-.65,.65])line(end,[end[0]-22*Math.cos(a+turn),end[1]-22*Math.sin(a+turn)]);dashedCircle(...end,46);
 }
 if(s.type==='signalRing'){
  const nodes=3+Math.round((n-6)/54*7),radius=83,reach=150+tw*65,step=TAU/nodes;
  arc(0,0,radius,step*.18,TAU-step*.18);
  for(let i=0;i<nodes;i++){let a=-Math.PI/2+i*step,x=radius*Math.cos(a),y=radius*Math.sin(a),ex=reach*Math.cos(a),ey=reach*Math.sin(a);line([x,y],[ex,ey]);solidDot(x,y,10);if(i===1){filledPath([[ex-11,ey-11],[ex+11,ey-11],[ex+11,ey+11],[ex-11,ey+11],[ex-11,ey-11]]);dashedCircle(ex,ey,43)}else solidDot(ex,ey,11)}
 }

 if(s.type==='orbitalLenses'){
  const k=3+Math.round((n-6)/54*4);for(let j=0;j<k;j++){let x=(j/(k-1)-.5)*180,rx=18+Math.abs(j/(k-1)-.5)*65;ellipse(x,0,rx,150);let a=-2+tw*3+j*.5;solidDot(x+rx*Math.cos(a),150*Math.sin(a),4)}
 }
 if(s.type==='projectionCone'){
  const tip=[-185,0],cx=130,rx=45+tw*35,ry=145;ellipse(...tip,9,20);ellipse(cx,0,rx,ry);line([-185,-20],[cx,-ry]);line([-185,20],[cx,ry]);
  ellipse(cx,0,rx*.68,ry*.7);out[out.length-1]=out[out.length-1].replace('/>',' stroke-dasharray="4 5"/>');
  const k=3+Math.round((n-6)/54*4);for(let j=0;j<k;j++){let a=j/k*TAU+.4,x=cx+rx*.65*Math.cos(a),y=ry*.66*Math.sin(a);line(tip,[x,y]);out[out.length-1]=out[out.length-1].replace('/>',' stroke-dasharray="3 6"/>');ellipse(x,y,4+j%2*4,10+j%2*9);if(j%2)out[out.length-1]=out[out.length-1].replace('/>',' fill="#000000"/>')}
 }
 if(s.type==='satelliteDisc'){circle(0,0,115);dashedCircle(0,0,150);solidDot(0,0,25+tw*25);const k=3+Math.round((n-6)/54*6);for(let j=0;j<k;j++){let a=j/k*TAU+tw*TAU,r=j%2?150:115;solidDot(r*Math.cos(a),r*Math.sin(a),4)}}
 if(s.type==='diamondChain'){const k=3+Math.round((n-6)/54*6),r=62+tw*30;for(let j=0;j<k;j++){let x=(j/(k-1)-.5)*160;path([[x,-r],[x+r,0],[x,r],[x-r,0],[x,-r]])}}
 if(s.type==='compassDisc'){circle(0,0,155);const k=4+Math.round((n-6)/54*8);for(let j=0;j<k;j++){let a=j/k*TAU+tw;line([0,0],[65*Math.cos(a),65*Math.sin(a)])}}
 if(s.type==='pinwheelMark'){const k=3+Math.round((n-6)/54*5),reach=145;for(let j=0;j<k;j++){let a=j/k*TAU,b=a+TAU/k*(.35+tw*.5),pts=[[0,0],[reach*Math.cos(a),reach*Math.sin(a)],[reach*Math.cos(b),reach*Math.sin(b)],[0,0]];if(j%2===0)filledPath(pts);else path(pts)}}
 if(s.type==='sunriseBowl'){arc(0,20,155,0,Math.PI);line([-155,20],[155,20]);const k=5+Math.round((n-6)/54*14);for(let j=0;j<k;j++){let a=Math.PI+j/(k-1)*Math.PI,r=75+tw*65+20*Math.sin(a*3);line([0,20],[r*Math.cos(a),20+r*Math.sin(a)])}}
 if(s.type==='gravityLines'){filledPath([[-45,-140],[45,-140],[0,-85],[-45,-140]]);const k=4+Math.round((n-6)/54*8);for(let j=0;j<k;j++){let y=-15+j/(k-1)*125,w=125-j*tw*3;line([-w,y],[w,y])}}
 if(s.type==='dashedNova'){const k=10+Math.round((n-6)/54*18);for(let j=0;j<k;j++){let a=j/k*TAU+tw*.5;line([28*Math.cos(a),28*Math.sin(a)],[160*Math.cos(a),160*Math.sin(a)]);out[out.length-1]=out[out.length-1].replace('/>',' stroke-dasharray="10 16 3 16"/>')}}
 if(s.type==='binaryMatrix'){const k=3+Math.round((n-6)/54*3),gap=260/(k-1),r=gap*(.1+tw*.08);for(let j=0;j<k;j++)for(let i=0;i<k;i++){let x=-130+i*gap,y=-130+j*gap;if((i+j+Math.round(tw*4))%3)solidDot(x,y,r);else circle(x,y,r)}}

 if(s.type==='brokenOrbits'){const k=3+Math.round((n-6)/54*7);for(let j=0;j<k;j++){let r=35+j/(k-1)*140,a=j*.7+tw*TAU;arc(0,0,r,a,a+TAU*.83,r*.65)}}
 if(s.type==='materialDiscs'){const r=65,gap=105+tw*25;circle(-gap,0,r);solidDot(gap,0,r);const k=6+Math.round((n-6)/54*16);for(let j=0;j<k;j++){let d=-r+(j+.5)/k*2*r,l=Math.sqrt(r*r-d*d),c=Math.SQRT1_2;line([(d-l)*c,(d+l)*c],[(d+l)*c,(d-l)*c])}}
 if(s.type==='balanceCircles'){const k=3+Math.round((n-6)/54*3),spacing=65+tw*35;for(let j=0;j<k;j++){let x=(j-(k-1)/2)*spacing;circle(x,0,80);line([x,-115],[x,115]);out[out.length-1]=out[out.length-1].replace('/>',' stroke-dasharray="2 6"/>')}line([-k*spacing/2-35,0],[k*spacing/2+35,0]);out[out.length-1]=out[out.length-1].replace('/>',' stroke-dasharray="2 6"/>')}
 if(s.type==='arcMatrix'){const k=5+Math.round((n-6)/54*9),gap=310/k;for(let j=0;j<k;j++)for(let i=0;i<k;i++){let x=(i-(k-1)/2)*gap,y=(j-(k-1)/2)*gap,a=(i*2+j*3)*.65;arc(x,y,gap*.32,a,a+Math.PI*(.55+1.4*i/(k-1)+tw*.05))}}
 if(s.type==='dottedValley'){line([-185,-115],[185,-115]);const k=28+Math.round(n*.7);for(let j=0;j<k;j++){let u=j/(k-1),x=(u-.5)*360,y=-75+200*Math.pow(Math.sin(u*Math.PI),1+tw*2);solidDot(x,y,1.3)}for(const x of [-185,185]){let sign=Math.sign(x);line([x,-115],[x-sign*15,-123]);line([x,-115],[x-sign*15,-107])}}
 if(s.type==='molecularShell'){
  const rows=7+Math.round((n-6)/54*8),cols=rows*2;
  const pt=(j,i)=>{let v=.08+(j/rows)*(Math.PI-.16),u=i/cols*TAU,r=140*(1+tw*.16*Math.sin(4*u+v)*Math.sin(3*v));return project(r*Math.sin(v)*Math.cos(u),r*Math.sin(v)*Math.sin(u),r*Math.cos(v))};
  for(let j=0;j<=rows;j++)for(let i=0;i<cols;i++){let p=pt(j,i),cluster=(i*7+j*11)%19<5;solidDot(...p,cluster?2.5:1);if(cluster&&j<rows){line(p,pt(j+1,i));line(p,pt(j+1,(i+1)%cols));line(p,pt(j,(i+1)%cols))}}
 }
 if(s.type==='spatialCircuit'){
  const k=3+Math.round((n-6)/54*5);
  for(let j=0;j<k;j++){let r=45+j/(k-1)*130,z=(j/(k-1)-.5)*130;curve(t=>project(r*Math.cos(t),r*Math.sin(t),z));out[out.length-1]=out[out.length-1].replace('/>',' stroke-dasharray="4 7"/>');let a=j*2.4+tw*TAU,p=project(r*Math.cos(a),r*Math.sin(a),z),q=project(r*Math.cos(a),r*Math.sin(a),z+70),b=project(r*Math.cos(a+1.5),r*Math.sin(a+1.5),z+70);path([p,q,b,project(r*Math.cos(a+1.5),r*Math.sin(a+1.5),z)]);solidDot(...p,3);solidDot(...project(r*Math.cos(a+1.5),r*Math.sin(a+1.5),z),3)}
 }
 if(s.type==='orbitalInstrument'){circle(-60,40,95);dashedCircle(-60,40,76);arc(-60,40,113,0,Math.PI);const a=-.4-tw*.4,end=[210*Math.cos(a),210*Math.sin(a)];line([-160,120],end);solidDot(...end,8);for(let j=0;j<2;j++)circle(90+j*20,-42-j*12,18);const k=4+Math.round(n/8);for(let j=0;j<k;j++){let x=25+j*5;line([x,-50],[x+36,12])}}

 if(s.type==='rippleCorona'){
  const rays=48+Math.round((n-6)/54*112),lobes=3+Math.round(tw*3);
  for(const base of [58,160])for(let j=0;j<rays;j++){let a=j/rays*TAU,b=a+.12*Math.sin(lobes*a),inner=base*(.87+.045*Math.cos(lobes*a)),outer=base*(1.08+.14*Math.sin(lobes*a+.6));line([inner*Math.cos(a),inner*Math.sin(a)],[outer*Math.cos(b),outer*Math.sin(b)])}
 }
 if(s.type==='fragmentedOrbit'){
  const rings=3+Math.round((n-6)/54*7);
  for(let j=0;j<rings;j++){let r=85+j/(rings-1)*95;for(let k=0;k<7;k++){let start=k/7*TAU+j*.39,end=start+TAU/7*(.28+.38*((j+k)%3)/2);path(Array.from({length:45},(_,i)=>{let a=start+(end-start)*i/44;return project(r*Math.cos(a),r*Math.sin(a),15*Math.sin(2*a+j*.4)*tw)}));if((j+k)%3===0)out[out.length-1]=out[out.length-1].replace('/>',' stroke-dasharray="2 5"/>')}}
 }
 if(s.type==='beadedTwist'){
  const strands=14+Math.round((n-6)/54*28),ends=[];
  for(let j=0;j<strands;j++){let u=j/(strands-1),a=-Math.PI*.7+u*Math.PI*1.4,side=145,depth=80*(.4+tw),p=project(-side,105*Math.sin(a),depth*Math.cos(a)),q=project(side,-105*Math.sin(a),-depth*Math.cos(a));line(p,q);ends.push([p,5+5*u],[q,10-5*u])}
  for(const [p,r] of ends)circle(...p,r)
 }

 const detail=6+Math.round((n-6)/54*14);
 if(s.type==='enneperSurface'){const pt=(u,v)=>project(65*(u-u*u*u/3+u*v*v),65*(v-v*v*v/3+v*u*u),65*(u*u-v*v));for(let j=0;j<detail;j++){let a=(j/(detail-1)-.5)*(1.7+tw);for(const swap of [false,true])path(Array.from({length:91},(_,i)=>{let b=(i/90-.5)*(1.7+tw);return swap?pt(a,b):pt(b,a)}))}}
 if(s.type==='torusLink'){for(let ring=0;ring<2;ring++)for(let j=0;j<detail;j++){let v=j/detail*TAU;curve(u=>{let r=90+18*Math.cos(v),x=r*Math.cos(u),y=r*Math.sin(u),z=18*Math.sin(v);return ring?project(z+45,y,x*(.7+tw*.3)):project(x-45,y,z)},180)}}
 if(s.type==='rippleVase'){const pt=(u,v)=>{let r=65+30*Math.cos(u*TAU)+tw*20*Math.sin(v*6)*Math.sin(u*Math.PI);return project(r*Math.cos(v),r*Math.sin(v),(u-.5)*270)};for(let j=0;j<detail;j++)curve(v=>pt(j/(detail-1),v));for(let j=0;j<detail;j++)path(Array.from({length:121},(_,i)=>pt(i/120,j/detail*TAU)))}
 if(s.type==='spiralShell3'){for(let j=0;j<Math.max(3,Math.round(detail/2));j++){let phase=j/detail*TAU;path(Array.from({length:401},(_,i)=>{let u=i/400,a=u*TAU*(2+tw*3)+phase,r=15+140*u;return project(r*Math.cos(a),r*Math.sin(a),(u-.5)*240)}))}}
 if(s.type==='twistedSail'){for(let j=0;j<detail;j++){let v=(j/(detail-1)-.5)*230;path(Array.from({length:101},(_,i)=>{let u=(i/100-.5)*280,a=u/280*(.5+tw*2);return project(u,v*Math.cos(a),v*Math.sin(a))}))}}
 if(s.type==='figureKnot'){for(let j=0;j<Math.max(4,Math.round(detail/2));j++){let b=j/Math.max(4,Math.round(detail/2))*TAU;curve(t=>{let r=100+32*Math.cos(2*t)+10*Math.cos(b);return project(r*Math.cos(3*t),r*Math.sin(3*t),45*Math.sin(4*t)+10*Math.sin(b+tw*Math.sin(t)))},480)}}
 if(s.type==='harmonicPetals'){let petals=3+Math.round(tw*6);for(let j=0;j<detail;j++){let a=j/detail*TAU;curve(t=>{let r=100+55*Math.cos(petals*t);return [r*Math.cos(t+a),r*Math.sin(t+a)*.65]},240)}}
 if(s.type==='arcRosette'){let petals=5+Math.round(tw*7);for(let j=0;j<petals;j++){let a=j/petals*TAU;arc(75*Math.cos(a),75*Math.sin(a),85,a-.8,a+Math.PI*1.5)}for(let j=0;j<Math.round(detail/4);j++)circle(0,0,18+j*12)}
 if(s.type==='wovenLens'){for(let j=0;j<detail;j++){let u=j/(detail-1),a=-Math.PI/2+u*Math.PI;line([-150*Math.cos(a),145*Math.sin(a)],[150*Math.cos(a),-145*Math.sin(a)*( .4+tw*.6)])}ellipse(0,0,150,145)}
 if(s.type==='superformula'){let m=3+Math.round(tw*9);for(let j=0;j<Math.max(2,Math.round(detail/3));j++)curve(t=>{let r=(150-j*20)*Math.pow(Math.pow(Math.abs(Math.cos(m*t/4)),2.5)+Math.pow(Math.abs(Math.sin(m*t/4)),2.5),-.45);return[r*Math.cos(t),r*Math.sin(t)]},400)}
 if(s.type==='radialTiles'){let k=6+Math.round(tw*10);for(let j=0;j<k;j++){let a=j/k*TAU,b=(j+.78)/k*TAU;for(let layer=0;layer<Math.round(detail/3);layer++){let r=48+layer*26;path([[r*Math.cos(a),r*Math.sin(a)],[(r+18)*Math.cos(a),(r+18)*Math.sin(a)],[(r+18)*Math.cos(b),(r+18)*Math.sin(b)],[r*Math.cos(b),r*Math.sin(b)],[r*Math.cos(a),r*Math.sin(a)]])}}}
 if(s.type==='circularLabyrinth'){for(let j=0;j<detail;j++){let r=18+j/(detail-1)*160,a=(j%4)*Math.PI/2+tw;arc(0,0,r,a,a+TAU-.35);if(j<detail-1)line([r*Math.cos(a),r*Math.sin(a)],[(r+160/(detail-1))*Math.cos(a),(r+160/(detail-1))*Math.sin(a)])}}
 const count=Math.max(3,Math.round(n/5));
 if(s.type==='orbitNodes'){circle(0,0,120);for(let j=0;j<count;j++){let a=j/count*TAU+tw*TAU,x=120*Math.cos(a),y=120*Math.sin(a);circle(x,y,20+j%3*12);mark(x,y)}}
 if(s.type==='satellite'){circle(0,0,64);for(let j=0;j<count;j++){let a=j/count*TAU+tw,r=120+(j%2)*40,x=r*Math.cos(a),y=r*Math.sin(a);line([0,0],[x,y]);circle(x,y,15+(j%3)*12)}mark(0,0)}
 if(s.type==='triangleOrbit'){for(let j=0;j<3;j++){let a=j/3*TAU+tw*.6;ellipse(0,0,155,38+tw*25,a);mark(155*Math.cos(a),155*Math.sin(a))}for(let j=1;j<Math.max(2,Math.round(n/8));j++)circle(0,0,20*j)}
 if(s.type==='rayNodes'){circle(0,110,22);for(let j=0;j<count+2;j++){let a=Math.PI+(.12+(j/(count+1))*.76)*Math.PI,r=140+tw*65+(j%3)*18;let start=[22*Math.cos(a),110+22*Math.sin(a)],end=[r*Math.cos(a),110+r*Math.sin(a)];line(start,end);if(j%2===0)mark(...end)}}
 if(s.type==='cylinderNodes'){let ry=20+45*Math.sin(tilt);ellipse(0,-120,135,ry);ellipse(0,120,135,ry);for(let j=0;j<count;j++){let a=j/count*TAU+tw;line([135*Math.cos(a),-120+ry*Math.sin(a)],[135*Math.cos(a),120+ry*Math.sin(a)])}mark(-135,-120);mark(90,120+ry*.74)}
 if(s.type==='vennNodes'){let d=40+tw*45,r=115;circle(-d,0,r);circle(d,0,r);let y=Math.sqrt(r*r-d*d);mark(0,y);mark(0,-y);for(let j=1;j<Math.round(n/8);j++)circle(0,0,10*j)}
 if(s.type==='chainNodes'){for(let j=0;j<count;j++){let a=j/(count-1)*Math.PI*1.6+tw,x=140*Math.cos(a),y=140*Math.sin(a);circle(x,y,26);mark(x,y);if(j){let b=(j-1)/(count-1)*Math.PI*1.6+tw;line([140*Math.cos(b),140*Math.sin(b)],[x,y])}}}
 if(s.type==='squareCircle'){let r=90+tw*35;circle(-r/2,20,r);square(r/2,-60,r*.85);line([-r/2,-r+20],[-r/2,r+20]);mark(-r/2,-r+20);mark(-r/2,r+20);for(let j=1;j<Math.round(n/10);j++)circle(r/2,-60,j*12)}
 if(s.type==='nodeGrid'){let k=Math.max(2,Math.round(n/7)),gap=300/(k-1);for(let j=0;j<k;j++)for(let i=0;i<k;i++)circle(-150+i*gap,-150+j*gap,Math.min(24,gap*.28));line([-150,150],[150,-150]);mark(-150,150);mark(150,-150);let t=tw*300;mark(-150+t,150-t)}
 if(s.type==='orbitalStack'){for(let j=0;j<count;j++){let y=-150+j/(count-1)*300,r=40+105*Math.sin(j/(count-1)*Math.PI);ellipse(0,y,r,18+tw*25);if(j%2===0)mark(r,y)}mark(0,-190)}
 if(s.type==='axisCircle'){circle(0,0,105);line([-170,170],[170,-170]);mark(170,-170);for(let j=0;j<count;j++){let a=j/count*TAU+tw;line([125*Math.cos(a),125*Math.sin(a)],[165*Math.cos(a),165*Math.sin(a)])}}
 if(s.type==='compass'){circle(0,0,30);for(let j=0;j<count*2;j++){let a=j/(count*2)*TAU+tw,r=j%2?100:180;line([30*Math.cos(a),30*Math.sin(a)],[r*Math.cos(a),r*Math.sin(a)])}mark(0,0)}
 if(s.type==='circleSectors'){circle(0,0,175);for(let j=0;j<count;j++){let a=j/count*TAU+tw;line([0,0],[175*Math.cos(a),175*Math.sin(a)])}circle(0,0,30+tw*70)}
 if(s.type==='circleCross'){circle(0,0,160);for(let a of [tw*Math.PI/2,tw*Math.PI/2+Math.PI/2])line([-185*Math.cos(a),-185*Math.sin(a)],[185*Math.cos(a),185*Math.sin(a)]);for(let j=1;j<Math.round(n/8);j++)circle(0,0,j*22)}
 if(s.type==='yinOrbit'){circle(0,0,160);let r=60+tw*20;circle(0,-80,r);circle(0,80,r);mark(0,-80);mark(0,80);for(let j=1;j<Math.round(n/10);j++)ellipse(0,0,160-j*10,70-j*5,Math.PI/2)}
 if(s.type==='arrowOrbit'){for(let j=0;j<count;j++){let r=40+j/(count-1)*130,a=j*.5+tw;arc(0,0,r,a,a+Math.PI*1.6);const t=a+Math.PI*1.6,p=[r*Math.cos(t),r*Math.sin(t)];const length=Math.min(14,r*.24),halfWidth=length*.45,back=[p[0]+length*Math.sin(t),p[1]-length*Math.cos(t)];path([[back[0]+halfWidth*Math.cos(t),back[1]+halfWidth*Math.sin(t)],p,[back[0]-halfWidth*Math.cos(t),back[1]-halfWidth*Math.sin(t)]])}}
 if(['scallopSeal','starSeal','sunSeal','ovalSeal','flowerFrame'].includes(s.type)){let lobes=s.type==='flowerFrame'?4:8+Math.round(tw*22),layers=Math.max(1,Math.round(n/12));for(let j=0;j<layers;j++){let base=165-j*12;curve(t=>{let bump=s.type==='starSeal'?Math.abs(((t/TAU*lobes)%1)*2-1):s.type==='sunSeal'?-Math.abs(Math.sin(t*lobes/2)):Math.cos(t*lobes),amp=s.type==='flowerFrame'?25:12+tw*10,r=base+amp*bump;return [r*Math.cos(t),r*Math.sin(t)*(s.type==='ovalSeal'?.65:1)]},720)}}
 if(s.type==='archFrame'||s.type==='archBands'){let k=s.type==='archBands'?Math.max(3,Math.round(n/3)):Math.max(1,Math.round(n/12));for(let j=0;j<k;j++){let r=165-j*(120/Math.max(1,k)),height=90+tw*60;path([[-r,height],[-r,0]]);arc(0,0,r,Math.PI,TAU);line([r,0],[r,height]);if(s.type==='archFrame')line([r,height],[-r,height])}}
 if(s.type==='heartFrame'){for(let j=0;j<Math.max(1,Math.round(n/12));j++){let scale=10-j*.7;curve(t=>[scale*16*Math.sin(t)**3,-scale*(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))*(.8+tw*.3)],400)}}
 if(s.type==='teardropFrame'){for(let j=0;j<Math.max(1,Math.round(n/10));j++){let r=155-j*30;curve(t=>[r*Math.sin(t)*(1-Math.cos(t))*.6,(r*Math.cos(t))*(.8+tw*.4)],300)}}
 if(s.type==='ticketFrame'||s.type==='stampFrame'){let layers=Math.max(1,Math.round(n/12));for(let j=0;j<layers;j++){let w=180-j*13,hgt=110-j*9,k=s.type==='stampFrame'?8+Math.round(tw*8):1,amp=s.type==='stampFrame'?7:15+tw*12;const pts=[];for(let side=0;side<4;side++)for(let i=0;i<=120;i++){let u=i/120,d=amp*Math.abs(Math.sin(u*Math.PI*k));if(side===0)pts.push([-w+2*w*u,-hgt+d]);if(side===1)pts.push([w-d,-hgt+2*hgt*u]);if(side===2)pts.push([w-2*w*u,hgt-d]);if(side===3)pts.push([-w+d,hgt-2*hgt*u])}pts.push(pts[0]);path(pts)}}
 if(s.type==='cloudFrame'){for(let j=0;j<Math.max(1,Math.round(n/12));j++){let scale=1-j*.075,points=[[-120,85],[120,85]],segments=[[[120,85],[205,85],[205,-40],[120,-40]],[[120,-40],[108,-152],[-75,-158],[-92,-54]],[[-92,-54],[-202,-83],[-224,85],[-120,85]]];for(const [a,b,c,d] of segments)for(let i=1;i<=70;i++){let t=i/70,u=1-t;points.push([u*u*u*a[0]+3*u*u*t*b[0]+3*u*t*t*c[0]+t*t*t*d[0],u*u*u*a[1]+3*u*u*t*b[1]+3*u*t*t*c[1]+t*t*t*d[1]])}path(points.map(([x,y])=>[x*scale,y*(.8+tw*.3)*scale]))}}

 if(['squareGrid','circleGrid','diagonalTile','wovenSquare','opticalSquare','steppedGrid'].includes(s.type)){let k=Math.max(2,Math.round(n/3)),r=175,gap=2*r/k;if(s.type!=='steppedGrid')square(0,0,r);if(s.type==='squareGrid'){for(let j=1;j<k;j++){let x=-r+j*gap;line([x,-r],[x,r]);line([-r,x],[r,x])}}if(s.type==='circleGrid'){for(let j=0;j<k;j++)for(let i=0;i<k;i++)circle(-r+(i+.5)*gap,-r+(j+.5)*gap,gap*(.18+tw*.29))}if(s.type==='diagonalTile'){for(let j=0;j<=k*2;j++){let c=-2*r+j*gap;const pts=[];for(let i=0;i<=100;i++){let x=-r+i/100*2*r,y=x*(.5+tw)+c;if(y>=-r&&y<=r)pts.push([x,y])}if(pts.length>1)path(pts)}}if(s.type==='wovenSquare'){for(let j=0;j<=k;j++){let y=-r+j*gap;path(Array.from({length:101},(_,i)=>{let x=-r+i/100*2*r;return [x,y+Math.sin(i/100*Math.PI)*Math.sin(x/35)*tw*gap*.4]}));path(Array.from({length:101},(_,i)=>{let x=-r+i/100*2*r;return [y+Math.sin(i/100*Math.PI)*Math.sin(x/35)*tw*gap*.4,x]}))}}if(s.type==='opticalSquare'){for(let j=0;j<k;j++){let a=j/k*tw*Math.PI,radius=r*(1-j/(k+1));path(Array.from({length:5},(_,i)=>[radius*Math.cos(i*Math.PI/2+a),radius*Math.sin(i*Math.PI/2+a)]))}}if(s.type==='steppedGrid'){for(let j=0;j<k;j++)for(let i=0;i<=j;i++)square(-r+(i+.5)*gap,r-(j+.5)*gap,gap*(.25+tw*.24))}}
 if(['warpedTorus','saddleTorus','pinchedTorus'].includes(s.type)){const pt=(u,v)=>{let major=125,minor=45,w=1+tw*.24*Math.cos(3*u);if(s.type==='pinchedTorus')minor*=.25+.75*Math.abs(Math.sin(u));let r=(major+minor*Math.cos(v))*w,z=minor*Math.sin(v)+(s.type==='saddleTorus'?tw*75*Math.cos(2*u):tw*25*Math.sin(3*u));return project(r*Math.cos(u),r*Math.sin(u),z)};for(let j=0;j<n;j++){let u=j/n*TAU;curve(v=>pt(u,v),128)}for(let j=0;j<Math.max(6,Math.round(n/2));j++){let v=j/Math.max(6,Math.round(n/2))*TAU;curve(u=>pt(u,v),192)}}
 if(['flutedSphere','meltedSphere','spikedSphere'].includes(s.type)){const pt=(u,v)=>{let base=145*Math.sin(v),r=base*(1+(s.type==='flutedSphere'?tw*.18*Math.cos(6*u):tw*.05*Math.sin(5*u))),z=145*Math.cos(v);if(s.type==='meltedSphere')z-=tw*100*Math.exp(-(((v-Math.PI)/.65)**2))*( .55+.45*Math.sin(5*u)**2);if(s.type==='spikedSphere')r+=tw*45*Math.pow(Math.max(0,Math.cos(7*u)),10)*Math.sin(v)**3;return project(r*Math.cos(u),r*Math.sin(u),z)};for(let j=0;j<n;j++)path(Array.from({length:161},(_,i)=>pt(j/n*TAU,i/160*Math.PI)));for(let j=1;j<n;j++)curve(u=>pt(u,j/n*Math.PI),192)}
 if(['dentedCube','meltedCube','crownCube','waveCube'].includes(s.type)){const pt=(x,y,z)=>{let a=x/110,b=y/110,c=z/110,nearTop=Math.max(0,c)**4,nearBottom=Math.max(0,-c)**4,d=tw*65;if(s.type==='dentedCube')z-=d*Math.exp(-(a*a+b*b)*4)*nearTop;if(s.type==='meltedCube')z-=d*(.5+.5*Math.cos(a*6)*Math.cos(b*6))*nearBottom;if(s.type==='crownCube')z+=d*Math.sin(a*6)**2*Math.sin(b*6)**2*nearTop;if(s.type==='waveCube'){x+=tw*22*Math.sin(b*4)*Math.cos(c*3);z+=tw*22*Math.cos(a*3)*Math.sin(b*3)}return project((x-y)*.71,(x+y)*.71,z)};let k=Math.max(5,Math.round(n/2));for(let face=0;face<3;face++)for(let sign of [-1,1])for(let j=0;j<=k;j++){let a=-110+j/k*220;for(let swap of [false,true])path(Array.from({length:65},(_,i)=>{let b=-110+i/64*220,p=swap?[b,a]:[a,b];return face===0?pt(sign*110,p[0],p[1]):face===1?pt(p[0],sign*110,p[1]):pt(p[0],p[1],sign*110)}))}}
 // Bounded strand strandCounts preserve open spaces throughout the density range.
 const strandCount=4+Math.round((n-6)/54*14);
 if(s.type==='nautilus')for(let j=0;j<strandCount;j++){let a=j/strandCount*TAU*(.8+tw*.5),r=35+j/strandCount*115;ellipse(40*Math.cos(a),40*Math.sin(a),r,r*.5,a)}
 if(s.type==='ripplePortal')for(let j=0;j<strandCount;j++){let r=35+j/(strandCount-1)*140;curve(t=>{let d=r+12*Math.sin(3*t+tw*TAU+j*.22);return[d*Math.cos(t),d*Math.sin(t)]},240)}
 if(s.type==='lotusWeave')for(let j=0;j<strandCount;j++){let a=j/strandCount*TAU;curve(t=>{let r=90+75*Math.cos(t),x=r*Math.cos(t),y=r*Math.sin(t)*(.25+tw*.3);return[x*Math.cos(a)-y*Math.sin(a),x*Math.sin(a)+y*Math.cos(a)]},200)}
 if(s.type==='ribbonLoop')for(let j=0;j<strandCount;j++){let w=(j/(strandCount-1)-.5)*65;curve(t=>{let r=135+w*Math.cos(2*t);return project(r*Math.cos(t),r*Math.sin(t),w*Math.sin(2*t)+40*tw*Math.sin(3*t))},240)}
 if(s.type==='orbitalCage')for(let j=0;j<strandCount;j++){let a=j/strandCount*Math.PI;curve(t=>project(170*Math.cos(t)*Math.cos(a),170*Math.cos(t)*Math.sin(a),120*Math.sin(t)*( .5+tw)),200)}
 if(s.type==='duneField')for(let j=0;j<strandCount;j++){let y=(j/(strandCount-1)-.5)*290;path(Array.from({length:181},(_,i)=>{let x=(i/180-.5)*340;return project(x,y,55*Math.sin(x/85+tw*3)*Math.exp(-y*y/30000)+25*Math.cos(y/65+x/120))}))}
 if(s.type==='pleatedFan')for(let j=0;j<strandCount;j++){let u=j/(strandCount-1),a=-Math.PI*.9+u*Math.PI*(.8+tw);path([[0,150],[175*Math.cos(a),175*Math.sin(a)],[140*Math.cos(a+.12),140*Math.sin(a+.12)],[0,150]])}
 if(s.type==='eclipseBands')for(let j=0;j<strandCount;j++){let u=j/(strandCount-1),r=40+u*135;ellipse((1-u)*70*tw,0,r,r*(.45+tw*.35),u*.5)}
 if(s.type==='resonance')for(let j=0;j<strandCount;j++){let y=(j/(strandCount-1)-.5)*260;path(Array.from({length:201},(_,i)=>{let x=(i/200-.5)*360;return[x,y+45*Math.sin(x/(30+tw*50)+j*.35)*Math.exp(-x*x/21000)]}))}
 if(s.type==='petalCrown'){let petals=5+Math.round(tw*7);for(let j=0;j<Math.max(2,Math.round(strandCount/2));j++)curve(t=>{let r=90+j*9+25*Math.cos(petals*t);return[r*Math.cos(t),r*Math.sin(t)]},360)}
 if(s.type==='twistedHalo')for(let j=0;j<strandCount;j++){let a=j/strandCount*TAU;curve(t=>{let r=125+40*Math.cos(t);return project(r*Math.cos(a+tw*.5*Math.sin(t)),r*Math.sin(a+tw*.5*Math.sin(t)),55*Math.sin(t))},160)}
 if(s.type==='contourIsland')for(let j=0;j<strandCount;j++){let u=(j+2)/(strandCount+1);curve(t=>{let r=u*(135+25*Math.sin(3*t+tw*3)+16*Math.cos(5*t));return[r*Math.cos(t),r*Math.sin(t)*.85]},280)}

}
