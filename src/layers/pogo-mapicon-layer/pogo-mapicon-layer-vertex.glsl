#define SHADER_NAME pogo-mapicon-layer-vertex

#ifdef GL_ES
precision highp float;
#endif

#pragma glslify: mercatorProject = require(../../../node_modules/deck.gl/shaderlib/mercator-project)
uniform float mercatorScale;


attribute vec3 positions;
attribute vec2 tex_coords;
attribute vec4 instancePositions;
attribute vec3 instanceColors;
attribute vec3 instancePickingColors;

uniform float opacity;
uniform float radius;

uniform mat4 worldMatrix;
uniform mat4 projectionMatrix;

varying vec4 vColor;
varying vec2 vTextureCoord1;


void main(void) {
  vColor = vec4(instanceColors / 255.0, 1.);

  vec2 pos = mercatorProject(instancePositions.xy, mercatorScale);
  vec3 p = vec3(pos, instancePositions.z) + (positions * 18.0);
  vec3 pz = vec3(p.xy, p.z + 1.0);

  gl_Position = projectionMatrix * vec4(pz, 1.0);

  vTextureCoord1 = vec2(tex_coords.x + (instancePositions.w - 1.0) * (1.0/151.0), tex_coords.y);
}
