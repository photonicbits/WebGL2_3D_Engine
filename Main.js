
/**
 * Created by betarunex on 2017/05/31.
 */
// in 
// object position
// object vertices
var globalFrameMultiplier = 0;



// Camera.js
cam = new Camera;






//Keyboard.js
var controls = new Controls(window);

//CreateShaderProgram.js
var shaderProgram = createShadingProgram(gl,vertexShader,fragmentShader);

//RenderEngine.js
var renderer = new RenderEngine(shaderProgram);

// DefineModels.js
modelContainer = new modelsClass(renderer);
modelContainer.addModelFrame(treeFrame);
modelContainer.addModelFrame(cubeFrame);



// LoadModelFrames.js


gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.useProgram(shaderProgram);
//var obj_position = gl.getAttribLocation(shaderProgram,"obj_position"); // 1) get location on GPU for all attribs
//var vertex_position = gl.getAttribLocation(shaderProgram,"vertex_position");
var stretchFactor = gl.getUniformLocation(shaderProgram, "stretch");
//var vertex_position = gl.getUniformLocation(shaderProgram,"vertex_position");
renderer.loadRenderer();
var obj_frame_tree = modelTypes.tree;
var obj_frame_cube = modelTypes.cube;
//modelLoader.loadModelFrameToProgram(shaderProgram,treeFrame);
//modelContainer.addModelFrame(treeFrame,obj_frame_tree);


var tree1 = new Entity(obj_frame_cube);
var cube1 = new Entity(obj_frame_cube);
var cube2 = new Entity(obj_frame_cube);
modelContainer.addModel(tree1);
tree1.pos = [-1,0,-14,1];
cam.setEntity(tree1);
controls.setPlayer(tree1);
modelContainer.addModel(cube1);
cube1.pos = [-1,1,-15,1];
modelContainer.addModel(cube2);
cube2.pos = [1,1,-18,1];
for(var i=0;i<500;i++){
  var cubeNew = new Entity(obj_frame_cube);
  modelContainer.addModel(cubeNew);
  cubeNew.pos = [Math.random()*60-30,Math.random()*60-30,-Math.random()*100-10,1];
}

var allModels = modelContainer.getAllModels();
var multi = gl.getUniformLocation(shaderProgram, "multi");
var time=0.5;
var timeS=0;
var timeC=0;
function renderLoop(){
  gl.uniform4f(stretchFactor,timeS+=0.001,timeS+=0.122,timeC+=0.0032,1);
  time+=0.01;
  timeC=Math.cos(time);
  timeS=Math.sin(time);
  stopWatch.resetTicker();
  globalFrameMultiplier = stopWatch.getTicks();
  controls.updateControls();
  cam.moveCamera(controls);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.uniform1f(multi,timeC);
  modelContainer.render(cam.getCameraMatrix());
  for(var i=0;i<allModels.length;i++){
    //allModels[i].rot[0]+=0.03*Math.random();
    //allModels[i].rot[1]+=0.03*Math.random();
    //allModels[i].rot[2]+=0.03*Math.random();
  }
  allModels[1].rot[1]+=0.039;
  setTimeout(renderLoop,stopWatch.getFrameDelay(FPS));
}
renderLoop();

// gl.bindVertexArray(null); // unbind
