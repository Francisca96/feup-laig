/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyScoreBoard(scene) {
	CGFobject.call(this,scene);

	this.font = new MyLedFont(this.scene);
	this.scoreboard=new MyUnitCubeQuad(this.scene);
	this.rectangle=new MyRectangle(this.scene, -1, -1, 1, 1);
	this.stepsPanel = new MyPanel(this.scene, 2, 30, this.font);
	this.infoPanel = new MyPanel(this.scene, 2, 15, this.font);
	this.cylinder = new MyCylinder(this.scene, 0.15, 0.15, 2.5, 40, 40);


	this.grayMaterial = new CGFappearance(this.scene);
  this.grayMaterial.setDiffuse(0.2,0.2,0.2,1);
  this.grayMaterial.setSpecular(0.2,0.2,0.2,1);
  this.grayMaterial.setAmbient(0.2,0.2,0.2,1);

	this.nullMaterial = new CGFappearance(this.scene);
	this.nullMaterial.setAmbient(0.8,0.8,0.8,1);
	this.nullMaterial.setDiffuse(0.8,0.8,0.8,1);
	this.nullMaterial.setSpecular(0.8,0.8,0.8,1);

	this.boardMaterial = new CGFappearance(this.scene);
	this.boardMaterial.setAmbient(0.8,0.8,0.8,1);
	this.boardMaterial.setDiffuse(0.8,0.8,0.8,1);
	this.boardMaterial.setSpecular(0.8,0.8,0.8,1);
	this.boardMaterial.loadTexture("../resources/images/scoreboard.png");
}

MyScoreBoard.prototype = Object.create(CGFobject.prototype);
MyScoreBoard.prototype.constructor=MyScoreBoard;

MyScoreBoard.prototype.display = function () {
	var pointDigits = [['-','1'],['-','1']];
	if(this.points[0] >= 0){
		pointDigits[0][0] = String(Math.floor(this.points[0]/10));
		pointDigits[0][1] = String(this.points[0] % 10);
	}
	if(this.points[1] >= 0){
		pointDigits[1][0] = String(Math.floor(this.points[1]/10));
		pointDigits[1][1] = String(this.points[1] % 10);
	}
	var timeDigits = ['-','1'];
	if(this.playTime >= 0){
		timeDigits[0] = String(Math.floor(this.playTime/10));
		timeDigits[1] = String(this.playTime % 10);
	}
	this.scene.setActiveShader(this.font.shader);

	this.scene.pushMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-5, 3, 0);
			this.stepsPanel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-5, 2, 0);
			this.infoPanel.display();
		this.scene.popMatrix();

		this.scene.translate(1.8, 0, 0);

		this.scene.pushMatrix();
			this.scene.scale(0.2, 0.4, 1);
			this.scene.pushMatrix();
				this.scene.translate(-1, 1.5, 0.35);
				this.font.displayWithLetter(timeDigits[0], this.rectangle);
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(1, 1.5, 0.35);
				this.font.displayWithLetter(timeDigits[1], this.rectangle);
			this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.2, 0.4, 1);
			this.scene.translate(-5, -4, 0);
			this.scene.pushMatrix();
				this.scene.translate(-1, 2, 0.35);
				this.font.displayWithLetter(pointDigits[0][0], this.rectangle);
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(1, 2, 0.35);
				this.font.displayWithLetter(pointDigits[0][1], this.rectangle);
			this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.2, 0.4, 1);
			this.scene.translate(5, -4, 0);
			this.scene.pushMatrix();
				this.scene.translate(-1, 2, 0.35);
				this.font.displayWithLetter(pointDigits[1][0], this.rectangle);
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(1, 2, 0.35);
				this.font.displayWithLetter(pointDigits[1][1], this.rectangle);
			this.scene.popMatrix();
		this.scene.popMatrix();

		this.scene.setActiveShader(this.scene.defaultShader);

		this.scene.scale(3.5, 2.7, 0.4);

		this.scene.pushMatrix();
			this.scene.translate(0, 0, 0.6);
			this.scene.scale(0.5, 0.5, 0.5);
			this.boardMaterial.apply();
			this.rectangle.display();
		this.scene.popMatrix();

		this.grayMaterial.apply();
		this.scoreboard.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.translate(0.7, 0, 0);
		this.cylinder.display();
		this.scene.translate(2.3, 0, 0);
		this.cylinder.display();
	this.scene.popMatrix();
};
