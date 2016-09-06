#define SHADER_NAME pogo-mapicon-layer-fragment

#ifdef GL_ES
precision highp float;
#endif

varying vec4 vColor;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;


void main(void) {
  gl_FragColor = vec4(1., 0., 0., 1.);

  //gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));

  //gl_FragColor = vec4(texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)).rgb, 1.0); 


}
