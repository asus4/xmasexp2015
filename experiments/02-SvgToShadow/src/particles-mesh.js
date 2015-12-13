/* global THREE */

import glMatrix from 'gl-matrix'
const vec3 = glMatrix.vec3
const quat = glMatrix.quat

const SCALE = 30

class ShadowGeometry extends THREE.BufferGeometry {

  constructor(lightPosition) {
    super()
    this.light = [lightPosition.x, lightPosition.y, lightPosition.z]

    let cubes = [0, 1, 2, 3].map((i) => {
      let cube = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
      this.setUvTile(cube, i)
      return cube
      })
      let geometry = new THREE.Geometry()

      const STEP = 0.05
      let count = 0
      for (let y = -1; y <= 1; y += STEP) {
        for (let x = -1; x <= 1; x += STEP) {
          geometry.merge(cubes[count % 4], this.calc3DSpace(x, y, (Math.random() * 2.0 + 1.0)))
          count++
        }
      }

      this.fromGeometry(geometry)
      console.log(this.attributes)
      let position = this.attributes.position.array
      console.log(`count:${count}  verts:${geometry.vertices.length} pos:${position.length}`)
    }

    calc3DSpace(x, y, size) {
      size = Math.max(1, size)

      let p = [x * SCALE, 0, y * SCALE]
      vec3.lerp(p, this.light, p, 1 / size)

      // let d = vec3.distance(p, this.light)

      let rot = quat.rotationTo([],
        vec3.normalize([], p),
        vec3.multiply([], vec3.normalize([], this.light), [1, -1, 1])
      )

      let mat = new THREE.Matrix4().compose(
        new THREE.Vector3().fromArray(p),
        new THREE.Quaternion().fromArray(rot),
        //new THREE.Vector3(Math.random() + 0.5, Math.random() + 0.5, Math.random() + 0.5)
        new THREE.Vector3(1, 1, 1)
      )
      return mat
    }

    setUvTile(geometry, x) {
      geometry.faceVertexUvs[0].forEach((uvs) => {
        uvs.forEach((uv) => {
          uv.x = (uv.x + x) * 0.25
        })
      })
      geometry.uvsNeedUpdate = true
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

    update(time) {
      console.log(time)
    }
  }
