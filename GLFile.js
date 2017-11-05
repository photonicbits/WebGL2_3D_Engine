
/**
 * Created by betarunex on 2017/05/31.
 */
// in 
// object position
// object vertices
var globalFrameMultiplier = 0;

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.useProgram(shaderProgram);
//var obj_position = gl.getAttribLocation(shaderProgram,"obj_position"); // 1) get location on GPU for all attribs
//var vertex_position = gl.getAttribLocation(shaderProgram,"vertex_position");
var stretchFactor = gl.getUniformLocation(shaderProgram, "stretch");
//var vertex_position = gl.getUniformLocation(shaderProgram,"vertex_position");
modelContainer.renderer.loadRenderer();
var obj_frame_tree = modelTypes.tree;
var obj_frame_cube = modelTypes.cube;
//modelLoader.loadModelFrameToProgram(shaderProgram,treeFrame);
//modelContainer.addModelFrame(treeFrame,obj_frame_tree);
//modelLoader.loadModelFrameToProgram(shaderProgram,personFrame);
//modelContainer.addModelFrame(personFrame,obj_frame_person);

var tree1 = new Entity(obj_frame_cube);
var cube1 = new Entity(obj_frame_cube);
var cube2 = new Entity(obj_frame_cube);
modelContainer.addModel(tree1);
tree1.pos = [-1,0,-14,1];
cam.setEntity(tree1);
keyboard.setPlayer(tree1);
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
// renderloop
var multi = gl.getUniformLocation(shaderProgram, "multi");
var time=0.5;
var timeS=0;
var timeC=0;
function renderLoop(){
  gl.uniform4f(stretchFactor,timeS+=0.001,timeS+=0.122,timeC+=0.0032,1);
  time+=0.01;
  timeC=Math.cos(time);
  timeS=Math.sin(time);
  //tree1.rot[1]+=0.001;
  stopWatch.resetTicker();
  globalFrameMultiplier = stopWatch.getTicks();
  keyboard.updateControls();
  cam.moveCamera(keyboard);
  //console.log(stopWatch.getFrameDelay(FPS));
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.uniform1f(multi,timeC);
  modelContainer.render(cam.getCameraMatrix());
  //cam.rot[1]+=0.0005*stopWatch.getTicks();
  //cam.pos[2]=-50;
  for(var i=0;i<allModels.length;i++){
    //allModels[i].rot[0]+=0.03*Math.random();
    //allModels[i].rot[1]+=0.03*Math.random();
    //allModels[i].rot[2]+=0.03*Math.random();
  }
  allModels[1].rot[1]+=0.039;
  //allModels[0].rot[1]+=.003;
  //allModels[0].rot[0]+=0.021;
  //allModels[0].pos[0]+=0.002;
  setTimeout(renderLoop,stopWatch.getFrameDelay(FPS));
}
renderLoop();
// gl.bindVertexArray(null); // unbind
