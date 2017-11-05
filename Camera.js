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

    // change pos, pitch, zoom

    // horizontal and vertical

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
        //this.horizontalOffset = this.distance*Math.cos(theta);
        //this.verticalOffset = this.distance*Math.sin(theta);
        this.pos[0] = this.entity.pos[0] - offX;
        this.pos[1] = this.entity.pos[1] + this.verticalOffset;// - this.verticalOffset;
        this.pos[2] = this.entity.pos[2] + offZ;
        this.rot[1] = theta;
        //this.rot[0] = -offX/this.horizontalOffset;
        //this.rot[2] = 1-offZ/this.horizontalOffset;
        //this.rot[0] = this.pitch*Math.cos(theta);
        // this.rot[3] = this.pitch*Math.sin(theta);
        // this.yaw = 1 - this.entity.rot[1] + this.rotAroundEntity;
    }
    calcRot(){

    }
    

    setPos(x,y,z){
        this.x=-x;
        this.y=-y;
        this.z=-z;
    }
    moveCamera(controls){
        //var moveDistance = this.speed*globalFrameMultiplier;
        //if(controls.getKey(KEY_CAM_BOOST)){
        //    moveDistance *= this.boost;
       // }
        //var tempPos = [0,0,0,1];
        //var tempRot = [0,0,0,1];
        //var xMouse = controls.mouseMoveX()/SENSITIVITY;
        var yMouse = controls.mouseMoveY()/SENSITIVITY;
        /*
        if(controls.getKey(KEY_CAM_LEFT)){
            tempPos[0]-=moveDistance;
        } if(controls.getKey(KEY_CAM_RIGHT)){
            tempPos[0]+=moveDistance;
        } if(controls.getKey(KEY_CAM_UP)){
            tempPos[1]+=moveDistance;
        } if(controls.getKey(KEY_CAM_DOWN)){
            tempPos[1]-=moveDistance;
        } if(controls.getKey(KEY_CAM_FORWARD)){
            tempPos[2]-=moveDistance;
        } if(controls.getKey(KEY_CAM_BACKWARD)){
            tempPos[2]+=moveDistance;
        }
        */
        
       // this.rot[1]+= xMouse*this.speed; // perfect
        //this.rot[0]+= yMouse*this.speed;//+ Math.cos(rot[1]);
        
        this.pitch += yMouse*this.speed;
        //this.yaw += xMouse*this.speed;
        this.calcPosAndRot();
        this.calcRot();
        //this.rot[2]+=yMouse*Math.cos(this.rot[1]);
        //console.log(Math.cos(this.rot[0]));
        //this.rot[2]+= tempRot[0]*Math.cos(this.rot[1]);//*Math.cos(this.rot[1]);//*Math.cos(tempRot[0]);
        //this.rot[2]+= tempRot[0]*Math.cos(this.rot[1]);//*Math.sin(this.rot[1]);
        //this.rot[0]+=0.001 + tempRot[0]*Math.sin(this.rot[1]);
        //this.rot[0]-= tempRot[0]*Math.sin(this.rot[1]);
        //this.cameraPos = mat4.translation(tempPos[0],tempPos[1],tempPos[2]);
        //this.cameraRot = mat4.rotXYZ(this.rot[0],this.rot[1],this.rot[2]);
        //this.cameraMatrix = mat4.multiply(this.cameraRot,this.cameraPos);
        //this.pos[0]+=this.cameraMatrix[12];
        //this.pos[1]+=this.cameraMatrix[13];
        //this.pos[2]+=this.cameraMatrix[14];
        //this.rot[1]+= tempRot[1];
        //this.rot[0]+= this.cameraMatrix[3];//+this.cameraMatrix[11]+tempRot[0];
        //this.rot[1]+= this.cameraMatrix[6];
        //this.rot[0]+=
        //this.rot[1]+=
       // console.log(this.cameraMatrix);
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

cam = new Camera;