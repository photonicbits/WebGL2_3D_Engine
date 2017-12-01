/**
 * Reference OpenGL on the html page using canvas
 * 
 * Created by betarunex on 2017/07/05.
 */

class GLContext{
    constructor(){
        var canvas = document.getElementById("canvas");
        this.canvas = canvas;
        var gl = this.canvas.getContext("webgl2");
        this.gl = gl;
        if(!gl){
            console.log("Failed to load webGL");
        }
        this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.mozRequestPointerLock;
        this.canvas.onclick = () => {
            console.log("locked on");
            this.canvas.requestPointerLock();
        };
    }

    loadShader(shaderProgram){
        this.gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(gl.COLOR_BUFFER_BIT);
        this.gl.useProgram(shaderProgram);
    }

    refresh(){
        this.gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
}

//document.addEventListener('pointerlockchange', "lockChangeAlert", false);
//document.addEventListener('mozpointerlockchange', "lockChangeAlert", false);
// gl