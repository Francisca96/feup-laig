/**
 * MyCylinder
 * @constructor
 */
 function MyOpenCylinder(scene, base, top, height, slices, stacks) {
 	CGFobject.call(this,scene);

  this.base = base;
  this.top = top;
	this.height = height;
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 }

 MyOpenCylinder.prototype = Object.create(CGFobject.prototype);
 MyOpenCylinder.prototype.constructor = MyOpenCylinder;

 MyOpenCylinder.prototype.initBuffers = function() {
	this.ang = Math.PI*2/this.slices;
	this.stackSize = this.height/this.stacks;
  var radiusDifference = (this.base - this.top)/this.stacks;

  this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];

		for(i = 0 ; i < this.slices; i++) {
			//NORMAL FOR THIS SLICE : (Math.cos(this.normalAng + this.ang * i), Math.sin(this.normalAng + this.ang * i), 0);
			//x1 = Math.cos(this.ang*i), x2 = Math.cos(this.ang*(i+1)), y1 =..., y2=... only z changes.
			var x1 = Math.cos(this.ang*i);
			var y1 = Math.sin(this.ang*i);
			var x2 = Math.cos(this.ang*(i+1));
			var y2 = Math.sin(this.ang*(i+1));
			for(j = this.stacks, k = 0; j >= 0; j--, k++){
				this.vertices.push(x1 * (this.top + radiusDifference*k), y1 * (this.top + radiusDifference*k), j*this.stackSize);
				this.vertices.push(x2 * (this.top + radiusDifference*k), y2 * (this.top + radiusDifference*k), j*this.stackSize);
				this.texCoords.push(x1, y1);
				this.texCoords.push(x2, y2);
				this.normals.push(x1, y1, 0);
				this.normals.push(x2, y2, 0);
				if(j != 0){
					this.indices.push((i*2*(this.stacks+1))+k*2+1, (i*2*(this.stacks+1))+k*2, (i*2*(this.stacks+1))+k*2+2);
					this.indices.push((i*2*(this.stacks+1))+k*2+2, (i*2*(this.stacks+1))+k*2+3, (i*2*(this.stacks+1))+k*2+1);
				}
			}
		}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
