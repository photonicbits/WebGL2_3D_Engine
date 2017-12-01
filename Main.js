
/**
 * Created by betarunex on 2017/05/31.
 */
// CreateGLContext.js
var glContext = new GLContext();
var gl = glContext.gl;
var canvas = glContext.canvas;
canvas.width  = window.innerWidth; 
canvas.height = window.innerHeight;

var settings = loadSettings(gl.canvas.width,gl.canvas.height);

// Camera.js
var cam = new Camera;

//Keyboard.js
var controls = new Controls(settings,window);

//CreateShaderProgram.js
var shaderProgram = createShadingProgram(gl,ShaderSource.vertexShaderSource,ShaderSource.fragmentShaderSource);

glContext.loadShader(shaderProgram);

//RenderEngine.js
var renderer = new RenderEngine(shaderProgram,gl);

// LoadModelFrames.js

// GameLogic.js
var game = new GameLogic();
game.setup(cam,controls);
renderer.loadRenderer(settings);

//var multi = gl.getUniformLocation(shaderProgram, "multi");
var stopWatch = new StopWatch();
var ticks = 0;
function renderLoop(){
  stopWatch.resetTicker();
  ticks = stopWatch.getTicks();
  controls.updateControls(ticks);
  cam.moveCamera(controls,settings.SENSITIVITY);
  glContext.refresh();
  game.loop(ticks);
  game.render(cam.getCameraMatrix());
  setTimeout(renderLoop,stopWatch.getFrameDelay(settings.SEC_PER_FRAME));
}
renderLoop();

// gl.bindVertexArray(null); // unbind
