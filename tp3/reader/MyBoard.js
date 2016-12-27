/**
 * MyBoard
 * @constructor
 */
 function MyBoard(scene, du, dv) {
 	CGFobject.call(this,scene);

  var id = 0;
  this.du = du;
  this.dv = dv;
  this.matrix=[];

  for(i = 0; i < this.du; i++){
    this.matrix.push([]);
    for(j = 0; j < this.dv; j++){
      this.matrix[i].push(new MyTile(this.scene, id, null));
      id++;
    }
  }

  this.whiteMaterial = new CGFappearance(this.scene);
  this.whiteMaterial.setDiffuse(1,1,1,1);
  this.whiteMaterial.setSpecular(1,1,1,1);
  this.whiteMaterial.setAmbient(1,1,1,1);

  this.blackMaterial = new CGFappearance(this.scene);
  this.blackMaterial.setDiffuse(0,0,0,1);
  this.blackMaterial.setSpecular(0,0,0,1);
  this.blackMaterial.setAmbient(0.1,0.1,0.1,1);

  this.redMaterial = new CGFappearance(this.scene);
  this.redMaterial.setDiffuse(0.7,0,0,1);
  this.redMaterial.setSpecular(0.7,0,0,1);
  this.redMaterial.setAmbient(0.7,0.1,0.1,1);

  this.yellowMaterial = new CGFappearance(this.scene);
  this.yellowMaterial.setDiffuse(0.8,0.8,0,1);
  this.yellowMaterial.setSpecular(0.8,0.8,0,1);
  this.yellowMaterial.setAmbient(0.8,0.8,0,1);
 }

 MyBoard.prototype = Object.create(CGFobject.prototype);
 MyBoard.prototype.constructor = MyBoard;

 MyBoard.prototype.display = function() {

   this.scene.pushMatrix();
   this.scene.translate(0.5,0,0.5);

     for(var k = 0; k < this.du; k++){
       for(var i = 0; i < this.dv; i++){
         this.scene.pushMatrix();
         if(this.matrix[k][i].selected)
            this.redMaterial.apply();
          else if(this.matrix[k][i].highlighted)
            this.yellowMaterial.apply();
          else if((k+i) % 2 === 0)
            this.whiteMaterial.apply();
          else
            this.blackMaterial.apply();
          this.scene.translate(i, 0, k);
          this.scene.registerForPick(k*this.dv+i+1,this.matrix[k][i]);
          this.matrix[k][i].display();
          if(this.matrix[k][i].piece){
            this.scene.translate(0,0.25,0);
            if(this.matrix[k][i].piece.moving){
              this.matrix[k][i].piece.animation.apply();
            }
            this.matrix[k][i].piece.display();
          }
         this.scene.popMatrix();
       }
     }

    this.scene.popMatrix();
};
