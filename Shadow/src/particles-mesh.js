/* global THREE */

import glMatrix from 'gl-matrix'
const vec3 = glMatrix.vec3
const quat = glMatrix.quat

const SIZE = 40
const COUNT = SIZE * SIZE
const SCALE = 15

class Cube {
  constructor() {
    this.velocity = [0, 0, 0]
    this.pos = [0, 0, 0]
    this.morphs = []
  }

  addMorph(transpose) {
    this.morphs.push(transpose)
  }

  update(index) {
    vec3.subtract(this.velocity, this.morphs[index].pos, this.pos)
    vec3.scale(this.velocity, this.velocity, 0.1)

    this.velocity[0] += (Math.random() - 0.5) * 0.02
    this.velocity[1] += (Math.random() - 0.5) * 0.02
    this.velocity[2] += (Math.random() - 0.5) * 0.02
    // transpose
    return {
      pos: vec3.add(this.pos, this.pos, this.velocity),
      rot: this.morphs[index].rot
    }
  }
}
// static geometry
Cube.geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1).vertices.map((v) => {
  return [v.x, v.y, v.z]
})

// class ShadowGeometry extends THREE.BufferGeometry {
class ShadowGeometry extends THREE.Geometry {

  constructor(lightPosition, frames) {
    super()
    this.morphIndex = 0
    this.light = [lightPosition.x, lightPosition.y, lightPosition.z]

    let templates = []
    let indexes = [0, 1, 2, 3]
    indexes.forEach((i) => {
      let cube = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
      this.setUvTile(cube, i, 0.25)
      templates.push(cube)
    })

    this.cubes = []
    for (let i = 0; i < COUNT; ++i) {
      this.merge(templates[i % 4])

      let x = (i % SIZE * 2 - SIZE) * 0.05
      let y = (i / SIZE * 2 - SIZE) * 0.05
      let t = this.get3DTransform(x, y, 1)
      let cube = new Cube()
      cube.addMorph(t)
      this.cubes.push(cube)
    }

    frames.forEach((frame) => {
      this.imageToMorph(frame, this.cubes)
    })
  }

  imageToMorph(img, cubes) {
    let canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height

    let ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, img.width, img.height)

    let pixels = ctx.getImageData(0, 0, img.width, img.height).data
    let len = img.width * img.height

    for (let i = 0; i < len; i++) {
      let x = (i % SIZE * 2 - SIZE) * 0.05
      let y = (i / SIZE * 2 - SIZE) * 0.05
      let t = this.get3DTransform(x, y, pixels[i * 4] * 0.008)
      cubes[i].addMorph(t)
    // console.log(`[${x},${y}] = ${pixels[i * 4]}`)
    }
  }

  get3DTransform(x, y, size) {
    size = Math.max(1, size)
    let p = [x * SCALE, 0, y * SCALE]
    vec3.lerp(p, this.light, p, 1 / size)
    // let d = vec3.distance(p, this.light)
    let rot = quat.rotationTo([],
      vec3.normalize([], p),
      vec3.multiply([], vec3.normalize([], this.light), [1, -1, 1])
    )
    return {
      pos: p,
      rot
    }
  }

  setUvTile(geometry, x, w) {
    geometry.faceVertexUvs[0].forEach((uvs) => {
      uvs.forEach((uv) => {
        uv.x = (uv.x + x) * w
      })
    })
  }

  update() {
    let index = Math.floor(this.morphIndex)
    let p = []
    for (let i = 0; i < COUNT; ++i) {
      let transpose = this.cubes[i].update(index)
      for (let j = 0; j < 8; ++j) {
        vec3.transformQuat(p, Cube.geometry[j], transpose.rot)
        vec3.add(p, p, transpose.pos)
        this.vertices[i * 8 + j].set(p[0], p[1], p[2])
      }
    }
    this.verticesNeedUpdate = true
  }
}

export default class ParticlesMesh extends THREE.Mesh {
  constructor(lightPosition, texImage, frames) {
    let tex = new THREE.Texture(texImage)
    tex.needsUpdate = true

    super(new ShadowGeometry(lightPosition, frames),
      new THREE.MeshPhongMaterial({
        map: tex
      })
    )
  }

  update() {
    this.geometry.update()
  }
}
