var c = document.querySelector("canvas");
var ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;

let p = new Physics( ctx );

let e = new Entity( c.width/2, c.height/2 );

p.addEntity( e );

p.start();

c.onclick = (e) => {
	p.addEntity( 
		new Entity(
			e.clientX,
			e.clientY
		)
	);
};