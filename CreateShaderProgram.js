// create shaders on GPU
function createShader(gl,type,source){
	var shader = gl.createShader(type);
	gl.shaderSource(shader,source);
	gl.compileShader(shader);
	var success = gl.getShaderParameter(shader,gl.COMPILE_STATUS);
	if(success){
		return shader;
	}
	console.log("Failed to create shader");
	gl.deleteShader(shader);
}

var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

// create the shading program
function createShadingProgram(gl,vertexShader,fragmentShader){
	var shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram,vertexShader);
	gl.attachShader(shaderProgram,fragmentShader);
	gl.linkProgram(shaderProgram);
	var success = gl.getProgramParameter(shaderProgram,gl.LINK_STATUS);
	if(success){
		return shaderProgram;
	}
	console.log("Failed to create shader program");
	gl.deleteProgram(shaderProgram);
}

 // gl, shaderProgram














 