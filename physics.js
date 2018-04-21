class Physics {
	constructor( context ) {
		this.global = {
			// The global gravity
			// https://en.wikipedia.org/wiki/Gravity_of_Earth
			gravity: new Vector( 0, 9.81 ),
			// Entitys will bounce of the window borders if set to true
			borderCollide: true,
		};
		this.context = context;
		this.entitys = [ ];
		// The ratio of updating and rendering ( timeSpeed : 1)
		// 1 -> Update whenever a new frame is called
		// 0.01 --> One frame applies 1 % of the phyical forces, so
		// after 100 frames, values are applied by the set values in total
		this.timeSpeed = 0.01;
	}

	addEntity( e ){ 
		this.entitys.push( e ); 
	}

	next() {
		for(let e of this.entitys) { e.update( this ) };
	}

	render() {
		this.context.clearRect( 0, 0, this.context.canvas.width, this.context.canvas.height);
		for(let e of this.entitys) { e.render( this.context ); };
	}

	tick() {
		this.next();
		this.render();
		window.requestAnimationFrame( ()=> { this.tick(); } );
	}

	start() {
		this.tick();
	}
}

class Entity {
	constructor( x, y, mass = 0.5 ) {
		this.x = x;
		this.y = y;
		this.localVelocity = new Vector( 1, 1 );
		this.localAcceleration = new Vector( 0, 0 );
		this.hitboxRadius = 5;
		this.mass = mass;

		this.draw = ( x, y, ctx ) => {
			ctx.beginPath();
			ctx.fillStyle = 'white';
			ctx.arc( x, y, this.hitboxRadius, 0, 2 * Math.PI );
			ctx.fill();
		};
	}

	render(ctx) {
		this.draw( this.x, this.y, ctx );
	}

	update( physics ) {
		if( physics.global.borderCollide ) {
			// The moment of inertia has to be calculated before chaning the velocity direction
			if( this.x + this.hitboxRadius >= physics.context.canvas.width || this.x - this.hitboxRadius <= 0) {
				const inertialForce = new Vector(
					force( this.mass, this.localAcceleration.x + physics.global.gravity.x ),
					0
				);
				this.localAcceleration.add( inertialForce );
				this.localVelocity.x *= -1;
			}
			if( this.y + this.hitboxRadius >= physics.context.canvas.height || this.y - this.hitboxRadius <= 0) {
				const inertialForce = new Vector(
					0,
					force( this.mass, this.localAcceleration.y + physics.global.gravity.y )
				);
				this.localAcceleration.add( inertialForce );
				this.localVelocity.y *= -1;
			}
		}
		// Apply linear velocity
		this.x += this.localVelocity.x * physics.timeSpeed;
		this.y += this.localVelocity.y * physics.timeSpeed;
		// Apply local acceleration
		const accelerationForce = new Vector(
			force( this.mass, this.localAcceleration.x ),
			force( this.mass, this.localAcceleration.y )
		);
		this.localVelocity.add( accelerationForce );
		// Apply global gravity
		const gravityForce = new Vector(
			force( this.mass, physics.global.gravity.x ),
			force( this.mass, physics.global.gravity.y )
		);
		this.localVelocity.add( gravityForce );
	}
}

class Vector {
	constructor( x, y ) {
		this.x = x;
		this.y = y;
	}

	add( vector ) {
		this.x += vector.x;
		this.y += vector.y;
	}
}

function force( mass, acceleration ) { return mass * acceleration; }
function acceleration( force, mass) { return force / mass; }
function isBetween( value, a, b ) { 
	if( a < b ) {
		let temp = a;
		a = b;
		b = temp;
	}
	if( value < a && value > b) return true; else return false; }
/*  TODO:
* add global acelleration (wind?)

*/