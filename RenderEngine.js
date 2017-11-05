rot=0.1;
rot2=0.1;
class RenderEngine{
  constructor(shader){
    this.shaderProgram = shader;
    this.modelFrames = new Array(); // stored vaos
  }
  loadRenderer(){
    //gl.enable(gl.CULL_FACE); // later
    gl.enable(gl.DEPTH_TEST);
    this.stretchFactor = gl.getUniformLocation(this.shaderProgram, "stretch");
    gl.uniform4f(this.stretchFactor,0.5,0.5,0.5,1);
    this.tempMat = gl.getUniformLocation(this.shaderProgram, "u_temp");
    this.viewMatrix = gl.getUniformLocation(this.shaderProgram, "u_viewMat");
    this.projectionMatrix = gl.getUniformLocation(this.shaderProgram, "u_projMat");
    this.objectMatrix = gl.getUniformLocation(this.shaderProgram, "u_objectMat");
    this.u_camera = gl.getUniformLocation(this.shaderProgram, "u_camera");
    this.projectionMat = mat4.perspective(FOV, SCREEN_RATIO,ZNEAR,ZFAR);
    gl.uniformMatrix4fv(this.projectionMatrix,false,this.projectionMat);
  }

  addModelFrame(modelFrame){
    var vertex_position = gl.getAttribLocation(this.shaderProgram,"vertex_position"); // 1) get location on GPU for all attribs
    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    modelFrame.vao = vao;
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(modelFrame.indices),gl.STATIC_DRAW);
    var positionBuffer = gl.createBuffer();  // 2) create buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);  // 3) bind buffer
    gl.enableVertexAttribArray(vertex_position);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelFrame.vertices),gl.STATIC_DRAW)
    gl.vertexAttribPointer(vertex_position,modelFrame.size,modelFrame.glType,modelFrame.normalize,modelFrame.stride,modelFrame.offset);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
    gl.bindVertexArray(null);
    this.modelFrames[modelFrame.type]=modelFrame;
  }
  getModelFrame(frameType){
      return this.modelFrames[frameType];
  }
  renderArrayOfLists(allModels,cameraMatrix){
    var viewMatrix = mat4.inverse(cameraMatrix);
    gl.uniformMatrix4fv(this.viewMatrix,false,viewMatrix);
    for(var key in allModels){
      var tempFrame = allModels[key][0];
      gl.bindVertexArray(tempFrame.vao);
      this.renderSameModelsList(allModels[key],tempFrame.modelType);
    }
    gl.bindVertexArray(null); // unbind
  }

  renderSameModelsList(allModels,frameType){
    var mframe = this.modelFrames[frameType];
    var translationMat;
    var rotMat;
    var matrix;
    for(var x=0; x<allModels.length; x++){
      var model = allModels[x];
      translationMat = mat4.translation(model.pos[0],model.pos[1],model.pos[2]);
      rotMat = mat4.rotXYZ(model.rot[0],model.rot[1],model.rot[2]);
      matrix = mat4.multiply(translationMat,rotMat);
      gl.uniformMatrix4fv(this.objectMatrix,false,matrix);
       //gl.drawArrays(gl.TRIANGLES, 0, mframe.count);
      gl.drawElements(gl.TRIANGLES, mframe.count, gl.UNSIGNED_SHORT, 0);
    }
  }
  renderModel(model,frameType){
    var mframe = this.modelFrames[frameType];
    gl.bindVertexArray(mframe.vao);
    model.pos[0]=1.0;
    //console.log(model.pos);
    gl.uniform4f(obj_position,model.pos);
    gl.drawArrays(gl.TRIANGLES, 0, mframe.count);
    gl.bindVertexArray(null); // unbind
  }
}