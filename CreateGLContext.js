/**
 * Reference OpenGL on the html page using canvas
 * 
 * Created by betarunex on 2017/07/05.
 */
var canvas = document.getElementById("canvas");

var gl = canvas.getContext("webgl2");
if(!gl){
    console.log("Failed to load webGL");
}
canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
canvas.onclick = function() {
    console.log("locked on");
    canvas.requestPointerLock();
};
//document.addEventListener('pointerlockchange', "lockChangeAlert", false);
//document.addEventListener('mozpointerlockchange', "lockChangeAlert", false);
// gl