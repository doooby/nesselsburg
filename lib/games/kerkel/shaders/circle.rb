
NesselsburgSprockets::ShadersLoader.add :vs_circle, __FILE__, <<VS_CIRCLE
varying vec2 vUV;
void main() {
  vUV = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
VS_CIRCLE

NesselsburgSprockets::ShadersLoader.add :fs_circle, __FILE__, <<FS_CIRCLE
uniform vec3 strokeCol;
uniform float radius;
uniform float stroke;
varying vec2 vUV;
void main() {
  float d = distance(vUV, vec2(.5, .5));
  if(d>=radius && d<stroke) gl_FragColor = vec4(strokeCol, 1.);
  else discard;
}
FS_CIRCLE

NesselsburgSprockets::ShadersLoader.add :fs_filled_circle, __FILE__, <<FS_FILLED_CIRCLE
uniform vec3 innerCol;
uniform vec3 strokeCol;
uniform float radius;
uniform float stroke;
varying vec2 vUV;
void main() {
  float d = distance(vUV, vec2(.5, .5));
  if(d<radius) gl_FragColor = vec4(innerCol, 1.);
  else if(d>=radius && d<stroke) gl_FragColor = vec4(strokeCol, 1.);
  else discard;
}
FS_FILLED_CIRCLE