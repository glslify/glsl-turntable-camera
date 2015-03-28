# glsl-turntable-camera

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Convenience module for GLSL raytracing that provides a turntable camera for your scene.

If you're looking for more flexibility, you might want
to check out
[glsl-camera-ray](http://github.com/stackgl/glsl-camera-ray).

## Usage

[![NPM](https://nodei.co/npm/glsl-turntable-camera.png)](https://nodei.co/npm/glsl-turntable-camera/)

#### `camera(float angle, float height, float dist, vec2 resolution, out vec3 ro, out vec3 rd)`.

* `angle` is the camera's rotation around the origin in radians.
* `height` is the camera's height relative to the origin.
* `dist` is the distance the camera is placed from the origin.
* `ro` is the ray origin, which gets set as a result of
  calling this function.
* `rd` is the ray direction, a unit vector which gets set as
  a result of calling this function.

``` glsl
vec2 doModel(vec3 p);

#pragma glslify: raytrace = require('glsl-raytrace', map = doModel, steps = 50)
#pragma glslify: camera   = require('glsl-turntable-camera')

void main() {
  // Determine the ray origin/direction:
  vec3 ro, rd;
  camera(iGlobalTime * 0.8, 3.0, 3.5, iResolution.xy, ro, rd);

  // Trace the scene:
  vec2 t = raytrace(ro, rd);
  if (t.x > -0.5) {
    // ...
  }
}
```

## Contributing

See [stackgl/contributing](https://github.com/stackgl/contributing) for details.

## License

MIT. See [LICENSE.md](http://github.com/stackgl/glsl-turntable-camera/blob/master/LICENSE.md) for details.
