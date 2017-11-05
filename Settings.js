canvas.width  = window.innerWidth; 
canvas.height = window.innerHeight;

const FOV = Math.PI*50/180;
const ZNEAR = 1;
const ZFAR = 1000;
const SCREEN_RATIO = gl.canvas.width/gl.canvas.height;
var FPS = 30;

// controls
const KEY_CAM_LEFT = 65;
const KEY_CAM_RIGHT = 68;
const KEY_CAM_UP = 81;
const KEY_CAM_DOWN = 69;
const KEY_CAM_BOOST = 16;
const KEY_CAM_FORWARD = 87;
const KEY_CAM_BACKWARD = 83;
const SENSITIVITY = 200.0;

const SEC_PER_FRAME = 1000/FPS;

