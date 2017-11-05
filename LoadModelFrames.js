var indices = new Float32Array([
    0,1,2,3,4,5
]);
var vertices = new Float32Array([
1.0, -.70, .40,
0.0, 0.4, -0.4,
0.7, -.30, 0.5,
0.7, -.30, -0.5,
-.30, .4, .60,
0.7, 0.4, 0.5
]);
var treeFrame = new modelFrame(vertices,indices,"tree");
modelContainer.addModelFrame(treeFrame);

indices2 = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,   // left
  ];
var vertices2 = new Float32Array([
  // Front face
  -1.0, -1.0,  1.0,
   1.0, -1.0,  1.0,
   1.0,  1.0,  1.0,
  -1.0,  1.0,  1.0,
  
  // Back face
  -1.0, -1.0, -1.0,
  -1.0,  1.0, -1.0,
   1.0,  1.0, -1.0,
   1.0, -1.0, -1.0,
  
  // Top face
  -1.0,  1.0, -1.0,
  -1.0,  1.0,  1.0,
   1.0,  1.0,  1.0,
   1.0,  1.0, -1.0,
  
  // Bottom face
  -1.0, -1.0, -1.0,
   1.0, -1.0, -1.0,
   1.0, -1.0,  1.0,
  -1.0, -1.0,  1.0,
  
  // Right face
   1.0, -1.0, -1.0,
   1.0,  1.0, -1.0,
   1.0,  1.0,  1.0,
   1.0, -1.0,  1.0,
  
  // Left face
  -1.0, -1.0, -1.0,
  -1.0, -1.0,  1.0,
  -1.0,  1.0,  1.0,
  -1.0,  1.0, -1.0,
]);
var cubeFrame = new modelFrame(vertices2,indices2,"cube");
modelContainer.addModelFrame(cubeFrame);
/*
class modelLoader{
    static loadModelFrameToProgram(shaderProgram,modelFrame){
        var obj_position = gl.getAttribLocation(shaderProgram,"obj_position"); // 1) get location on GPU for all attribs
        var stretchFactor = gl.getUniformLocation(shaderProgram, "stretch");
        var vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        modelFrame.vao = vao;
        var positionBuffer = gl.createBuffer();  // 2) create buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);  // 3) bind buffer
        gl.enableVertexAttribArray(obj_position);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelFrame.vertices),gl.STATIC_DRAW)
        gl.vertexAttribPointer(obj_position,modelFrame.size,modelFrame.glType,modelFrame.normalize,modelFrame.stride,modelFrame.offset);
        gl.bindBuffer(gl.ARRAY_BUFFER,null);
        gl.bindVertexArray(null);
    }
}
*/