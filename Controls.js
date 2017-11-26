

class Controls{
    constructor(div){
        this.globalKeyArray = {};
        this.globalMouseArray = {"moveX":0,"moveY":0};
        this.player;
        this.temp;
        this.speed = 0.001;
        this.boost = 10;
        this.keys = new Object();
        for(var i=0;i<223;i++){
            this.globalKeyArray[i] = false;
        }
        div.onbeforeunload = () => {//Prevent Ctrl+W on firefox
            this.globalKeyArray[KEY_CAM_DOWN] = false;
            //console.log("test");
            return null;
        };
        div.addEventListener('mousemove', e => {
            //console.log(e);
            this.globalMouseArray["moveX"]+=e.movementX;
            this.globalMouseArray["moveY"]+=e.movementY;
        });
        div.addEventListener('keydown', e => {
            this.globalKeyArray[e.keyCode] = true;
        });
        div.addEventListener('keyup', e => {
            this.globalKeyArray[e.keyCode] = false;
        });
    }

    setPlayer(player){
        this.player=player;
    }

    updateControls(){
        var moveDistance = this.speed*globalFrameMultiplier;
        if(this.getKey(KEY_CAM_BOOST)){
            moveDistance *= this.boost;
        }
        if(this.getKey(KEY_CAM_LEFT)){
            this.player.pos[0]-=Math.cos(this.player.rot[1])*moveDistance;
            this.player.pos[2]-=Math.sin(this.player.rot[1])*moveDistance;
        } if(this.getKey(KEY_CAM_RIGHT)){
            this.player.pos[0]+=Math.cos(this.player.rot[1])*moveDistance;
            this.player.pos[2]+=Math.sin(this.player.rot[1])*moveDistance;
        } if(this.getKey(KEY_CAM_UP)){
            this.player.pos[1]+=moveDistance;
        } if(this.getKey(KEY_CAM_DOWN)){
            this.player.pos[1]-=moveDistance;
        } if(this.getKey(KEY_CAM_FORWARD)){
            this.player.pos[2]-=Math.cos(this.player.rot[1])*moveDistance;
            this.player.pos[0]+=Math.sin(this.player.rot[1])*moveDistance;
        } if(this.getKey(KEY_CAM_BACKWARD)){
            this.player.pos[2]+=Math.cos(this.player.rot[1])*moveDistance;
            this.player.pos[0]-=Math.sin(this.player.rot[1])*moveDistance;
        }
        var xMouse = this.mouseMoveX()/SENSITIVITY;
        this.player.rot[1]+= xMouse; // perfect
    }

    mouseMoveX(){
        this.temp = this.globalMouseArray["moveX"];
        this.globalMouseArray["moveX"]=0;
        return this.temp;
    }
    mouseMoveY(){
        this.temp = this.globalMouseArray["moveY"];
        this.globalMouseArray["moveY"]=0;
        return this.temp;
    }

    getKey(keyValue){
        return this.globalKeyArray[keyValue];
    }

}



