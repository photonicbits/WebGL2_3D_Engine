var globalKeyArray = {};
var globalMouseArray = {"moveX":0,"moveY":0};

class Keyboard{
    constructor(div){
        this.player;
        this.temp;
        this.speed = 0.001;
        this.boost = 10;
        this.keys = new Object();
        for(var i=0;i<223;i++){
            globalKeyArray[i] = false;
        }
        div.onbeforeunload = function () {//Prevent Ctrl+W on firefox
            globalKeyArray[KEY_CAM_DOWN] = false;
            //console.log("test");
            return null;
        };
        div.addEventListener('mousemove', function (e){
            //console.log(e);
            globalMouseArray["moveX"]+=e.movementX;
            globalMouseArray["moveY"]+=e.movementY;
        });
        div.addEventListener('keydown', function (e) {
            globalKeyArray[e.keyCode] = true;
        });
        div.addEventListener('keyup', function (e) {
            globalKeyArray[e.keyCode] = false;
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
        //var yMouse = this.mouseMoveY()/SENSITIVITY;
        this.player.rot[1]+= xMouse; // perfect
         //+ Math.cos(rot[1]);
    }

    mouseMoveX(){
        this.temp = globalMouseArray["moveX"];
        globalMouseArray["moveX"]=0;
        return this.temp;
    }
    mouseMoveY(){
        this.temp = globalMouseArray["moveY"];
        globalMouseArray["moveY"]=0;
        return this.temp;
    }

    getKey(keyValue){
        return globalKeyArray[keyValue];
    }

}

var keyboard = new Keyboard(window);

