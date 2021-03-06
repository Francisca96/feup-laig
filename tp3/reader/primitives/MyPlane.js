/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyPlane(scene, dimX, dimY, partsX, partsY) {
	CGFobject.call(this,scene);

	this.dimX = dimX;
	this.dimY = dimY;
	this.partsX = partsX;
	this.partsY = partsY;
	this.controlPoints =[
			[this.dimX/2, this.dimY/2, 0],
			[this.dimX/2, -this.dimY/2, 0],
			[-this.dimX/2, this.dimY/2, 0],
			[-this.dimX/2, -this.dimY/2, 0]
	];
	// console.log(this.controlPoints)

	this.plane = new MyPatch(this.scene, 1 , 1, this.partsX, this.partsY, this.controlPoints);
}

MyPlane.prototype = Object.create(CGFobject.prototype);
MyPlane.prototype.constructor=MyPlane;

MyPlane.prototype.display = function () {
		this.plane.display();
};
