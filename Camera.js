class Camera{
    
    constructor(){
        this.xPos=0;
        this.yPos=0;
        this.zPos=0;

        this.pitch=-0.0; // around x/z
        this.yaw=0.0; // around y
        this.rotAroundEntity=0.0;
        this.distance=15.0;
        this.entity;
        this.speed = 1.0;
        this.boost = 10;
        this.horizontalOffset = 0;
        this.verticalOffset = 0;
        this.z = 0;
        this.pos = [0.,0.,0.];
        this.rot = [0.,0.,0.];
        this.cameraPos = mat4.identityMatrix;
        this.cameraRot = mat4.identityMatrix;
        this.cameraMatrix = mat4.identityMatrix;
    }

    distances(){
        var camDistanceX = distance*Math.cos(Math.cos(pitch));
        var camDistanceY = distance*Math.sin(Math.cos(yaw));
    }

    setEntity(entity){
        this.entity = entity;
    }

    calcPosAndRot(){
        this.yaw = this.entity.rot[1];
        if(this.pitch<-0.4){
            this.pitch=-0.4;
        }else if(this.pitch>0.9){
            this.pitch=0.9;
        }
        this.horizontalOffset = this.distance*Math.cos(this.pitch);
        this.verticalOffset = this.distance*Math.sin(this.pitch);
        var theta = this.yaw;// + this.pitch;

        var offX = this.horizontalOffset*Math.sin(theta);
        var offZ = this.horizontalOffset*Math.cos(theta);
        this.pos[0] = this.entity.pos[0] - offX;
        this.pos[1] = this.entity.pos[1] + this.verticalOffset;// - this.verticalOffset;
        this.pos[2] = this.entity.pos[2] + offZ;
        this.rot[1] = theta;
    }
    calcRot(){

    }
    
    setPos(x,y,z){
        this.x=-x;
        this.y=-y;
        this.z=-z;
    }
    moveCamera(controls,mouseSensitivity){
        var yMouse = controls.mouseMoveY()/mouseSensitivity;
        this.pitch += yMouse*this.speed;
        this.calcPosAndRot();
        this.calcRot();
    }
    getCameraMatrix(){
        this.cameraPos = mat4.translation(this.pos[0],this.pos[1],this.pos[2]);
        this.cameraRot = mat4.rotXYZ(this.rot[0],this.rot[1],this.rot[2]);
        var xRot = mat4.rotationX(this.pitch);
        this.cameraRot = mat4.multiply(this.cameraRot,xRot);
        this.cameraMatrix = mat4.multiply(this.cameraPos,this.cameraRot);
        return this.cameraMatrix;
    }
}