/* global THREE */

import glMatrix from 'gl-matrix'
const vec3 = glMatrix.vec3
const quat = glMatrix.quat

const SCALE = 30

class ShadowGeometry extends THREE.Geometry {

  constructor(lightPosition) {
    super()
    this.light = [lightPosition.x, lightPosition.y, lightPosition.z]

    let cube = new THREE.CubeGeometry(1, 1, 1, 1, 1, 1)
    let sphere = new THREE.SphereGeometry(0.5, 16, 12)

    let count = 0
    for (let y = -1; y <= 1; y += 0.1) {
      for (let x = -1; x <= 1; x += 0.1) {
        count++
        count = 0.5
        if (count % 2 == 0) {
          this.merge(cube, this.calc3DSpace(x, y, (count % 7 + 1)))
        } else {
          this.merge(cube, this.calc3DSpace(x, y, (count % 7 + 1)))
        // this.merge(sphere, this.calc3DSpace(x, y, (count % 7 * 0.5 + 1)))
        }
      }
    }
  }

  calc3DSpace(x, y, size) {
    size = Math.max(1, size)

    let p = [x * SCALE, 0, y * SCALE]
    vec3.lerp(p, this.light, p, 1 / size)

    let d = vec3.distance(p, this.light)

    let rot = quat.rotationTo([],
      vec3.normalize([], p),
      vec3.multiply([], vec3.normalize([], this.light), [1, -1, 1]) //
    )

    let mat = new THREE.Matrix4().compose(
      new THREE.Vector3().fromArray(p),
      new THREE.Quaternion().fromArray(rot),
      //new THREE.Vector3(Math.random() + 0.5, Math.random() + 0.5, Math.random() + 0.5)
      new THREE.Vector3(1, 1, 1)
    )
    return mat
  }
}

export default class ParticlesMesh extends THREE.Mesh {
  constructor(lightPosition) {

    let tex = THREE.ImageUtils.loadTexture('./textures/stripe.png')

    super(
      new ShadowGeometry(lightPosition),
      new THREE.MeshPhongMaterial({
        color: 0xfff5f5,
        map: tex
      })
    )
  }
}
