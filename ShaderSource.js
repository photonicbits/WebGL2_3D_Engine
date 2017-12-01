/**
 * Create the vertex and fragment shaders.
 * Always start shaders with "#version 300 es". Dont even add whitespace before this.
 * 
 * Created by betarunex on 2017/05/31.
 */

/**
 * Vertex shaders require 1 default:
 * gl_Position = {some vec4}; // the position in xyzw. 
 * 
 */

var ShaderSource = {
    vertexShaderSource: `#version 300 es
    
    in vec4 vertex_position;
    out vec4 col;               // output to fragment
    out float multi1;
    out float multi2;
    out float multi3;
    out vec4 pos;
    uniform vec4 stretch;       // uniform from program
    uniform mat4 u_camera;
    uniform mat4 u_objectMat;
    uniform mat4 u_projMat;
    uniform mat4 u_viewMat;
    
    void main() {
        multi1 = vertex_position.x;
        multi2 = vertex_position.y;
        multi3 = vertex_position.z;
        //gl_Position =  obj_position + (vertex_position * (u_rotMat+u_camera));           // gl_Position IS ESSENTIAL!!!!!
        mat4 viewProjectionMatrix = u_projMat * u_viewMat;
        gl_Position = viewProjectionMatrix * u_objectMat * vertex_position;
    
        //gl_Position = u_rotMat * vec4(vertex_position.xyz, 1);
        //vec4 sample = vec4(1.4,1.4,1.4,1);
        col = stretch;
        pos = gl_Position;
    
    }`,
    
    fragmentShaderSource: `#version 300 es
    
    precision mediump float; 
    
    in vec4 col;
    in vec4 pos;
    in float multi1;
    in float multi2;
    in float multi3;
    out vec4 outColor;              // ESSENTIAL!!!!!
    
    void main() {
        outColor = col;
        //outColor.r = col.z;
        //outColor.g = sin(outColor.z*sin(multi3*multi1)-cos(outColor.x));
        //outColor.b = cos(multi3+multi3+sin(multi1)*col.x-cos(multi2)+cos(multi3));
        float temp = sin(pos.x*(multi3)+multi2/col.x)*pos.z/3.0;
        float temp2 = (multi1+pos.x*outColor.r/temp)/3.0;
        float temp3 = pos.z*(temp2*col.x/temp);
        outColor.b = cos(cos(temp-pos.x-temp3)*outColor.r);
        outColor.r = cos(multi3*temp)*(sin(temp)*pos.z*outColor.b*pos.y*multi1);
        outColor.g = sin(cos(temp3)-cos(outColor.r)+sin(temp3*col.x)*cos(temp3*temp2));
    }`
}

/**
 * Fragment shaders require only 2 defaults:
 * precision mediump float; // fragment shaders don't have a default precision. "medium precision"
 * out {some name} = {some vec4}; // the final colour of the fragment in rgba
 * 
 * ref code: // outColor.xyzw*vec4/outColor.xw*vec2 sin(0-1) cos(0-1) mod(x,%);
 */


/**
 * This data's "uniform" can be set using the following example
 * var stretchFactor = gl.getUniformLocation(shaderProgram, "stretch");
 * gl.uniform4f(stretchFactor,3.0,15,1,1);
 * 
 * This data's "in" can be set using the following example:
 * For the VBO:
 * // get location
 * var position = gl.getAttribLocation(shaderProgram,"obj_position"); // "gl" is context.
 * // create buffer
 * var positionBuffer = gl.createBuffer();
 * // bind the created buffer to location
 * gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
 * // assign an array to the buffer
 * gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices), gl.STATIC_DRAW);
 * 
 * For the VAO
 * 
 * 
 * 
 * outColor.b = outColor.b*sin(outColor.g)/outColor.r;
    outColor.r = outColor.r*sin(outColor.g)/multi2;
    outColor.g = outColor.g*sin(outColor.g)/outColor.g;

    float temp = multi3/multi2*outColor.b/3.0;
    float temp2 = multi1/multi2*outColor.r;
    outColor.b = cos(cos(temp2*sin(multi2))*outColor.r);
    outColor.r = sin(cos(multi3*temp)/(sin(temp2)*multi1));
    outColor.g = sin(cos(multi3*cos(multi1))/(sin(temp2)*multi2));

    outColor = col;
    //outColor.r = col.z;
    //outColor.g = sin(outColor.z*sin(multi3*multi1)-cos(outColor.x));
    //outColor.b = cos(multi3+multi3+sin(multi1)*col.x-cos(multi2)+cos(multi3));
    float temp = cos(multi3-multi2)*pos.z/3.0;
    float temp2 = (multi1+pos.x*outColor.r/temp)/3.0;
    float temp3 = temp2*col.x/temp;
    outColor.b = cos(cos(temp-pos.x-temp3)*outColor.r);
    outColor.r = cos(multi3*temp)*(sin(temp)*pos.z*outColor.b*pos.y*multi1);
    outColor.g = sin(cos(temp3)-cos(outColor.r)+sin(temp3*col.x)*cos(temp3*temp2));

 * 
 * 
 */

 // gl, vertexShaderSource, fragmentShaderSource