#define SHADER_NAME pogo-mapicon-layer-vertex

#pragma glslify: random = require(../../../node_modules/deck.gl/shaderlib/random)

#pragma glslify: mercatorProject = require(../../../node_modules/deck.gl/shaderlib/mercator-project)
uniform float mercatorScale;


attribute vec3 positions;
attribute vec2 texCoords;
attribute vec3 instancePositions;
attribute vec3 instanceColors;
attribute vec3 instancePickingColors;

uniform float opacity;

uniform mat4 worldMatrix;
uniform mat4 projectionMatrix;

varying vec2 vTextureCoord;
varying vec4 vColor;

void main(void) {
 vec2 pos = mercatorProject(instancePositions.xy, mercatorScale);
 // For some reason, need to add one to elevation to show up in untilted mode

 vec3 p = vec3(pos, instancePositions.z + 1.) + positions * 100.0;
 gl_Position = projectionMatrix * vec4(p, 1.0);
 gl_Position = projectionMatrix * vec4(positions * 100.0, 1.0)

 vColor = vec4(instanceColors / 255.0, 1.);
 vTextureCoord = texCoords;




 //
 // vec3 p = vec3(positions.xy, positions.z + 1.) * 100.0;
 // gl_Position = projectionMatrix * vec4(positions, 1.0);
 // vTexCoord = texCoords;
 // vColor = vec4(instanceColors / 255.0, 1.);
 //
 //
}
