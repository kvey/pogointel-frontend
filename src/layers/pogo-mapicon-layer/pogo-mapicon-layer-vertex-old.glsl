/* vertex shader for the scatterplot-layer */
#define SHADER_NAME pogo-mapicon-layer-vertex

#pragma glslify: random = require(../../../node_modules/deck.gl/shaderlib/random)

#pragma glslify: mercatorProject = require(../../../node_modules/deck.gl/shaderlib/mercator-project)
uniform float mercatorScale;

attribute vec3 positions;
attribute vec3 instancePositions;
attribute vec3 instanceColors;
attribute vec3 instancePickingColors;

uniform float radius;
uniform float opacity;

uniform mat4 worldMatrix;
uniform mat4 projectionMatrix;

varying vec4 vColor;
uniform float renderPickingBuffer;

void main(void) {
  vec2 pos = mercatorProject(instancePositions.xy, mercatorScale);
  // For some reason, need to add one to elevation to show up in untilted mode
  vec3 p = vec3(pos, instancePositions.z + 1.) + positions * radius;
  gl_Position = projectionMatrix * vec4(p, 1.0);

  vColor = vec4(instanceColors / 255.0, 1.);
}
