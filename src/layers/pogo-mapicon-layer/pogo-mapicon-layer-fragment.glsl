#define SHADER_NAME pogo-mapicon-layer-fragment

#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord1;
varying vec4 vColor;

uniform sampler2D uSampler;


void main(void) {
  //gl_FragColor = vec4(1., 1., 0., 1.);
  //gl_FragColor = vColor;

  gl_FragColor = texture2D(uSampler, vTextureCoord1);

  //gl_FragColor = vec4(texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)).rgb, 1.0); 


}
