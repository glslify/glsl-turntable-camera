precision mediump float;

uniform vec2  iResolution;
uniform float iGlobalTime;

vec2 doModel(vec3 p);

#pragma glslify: raytrace  = require('glsl-raytrace', map = doModel, steps = 50)
#pragma glslify: getNormal = require('glsl-sdf-normal', map = doModel)
#pragma glslify: smin      = require('glsl-smooth-min')
#pragma glslify: camera    = require('./')

vec2 doModel(vec3 p) {
  float s1 = length(p) - 1.0;
  float s2 = length(p - vec3(1, 0, 0)) - 0.5;
  float s3 = length(p + vec3(1, 0, 0)) - 0.5;

  float d = s1;

  d = smin(d, s2, 0.1);
  d = smin(d, s3, 0.1);

  return vec2(d, 0.0);
}

void main() {
  vec3 ro, rd;
  camera(iGlobalTime * 0.8, 3.0, 3.5, iResolution.xy, ro, rd);

  vec3 col = vec3(0.95, 0.95, 1.215);
  vec2 t   = raytrace(ro, rd);

  if (t.x > -0.5) {
    vec3 pos = ro + t.x * rd;
    vec3 nor = getNormal(pos, 0.1);

    col = nor * 0.5 + 0.5;
  }

  gl_FragColor = vec4( col, 1.0 );
}
