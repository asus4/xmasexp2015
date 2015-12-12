/* global THREE */

const SCALE = 30

class ShadowGeometry extends THREE.Geometry {

  constructor(lightPosition) {
    super()
    this.lightPosition = lightPosition
    console.log(lightPosition)

    let cube = new THREE.CubeGeometry(1, 1, 1, 1, 1, 1)
    let sphere = new THREE.SphereGeometry(0.5, 16, 12)

    let count = 0
    for (let y = -1; y <= 1; y += 0.2) {
      for (let x = -1; x <= 1; x += 0.2) {
        count++
        if (count % 2 == 0) {
          this.merge(cube, this.calc3DSpace(x, y, (count % 3 + 1)))
        } else {
          this.merge(sphere, this.calc3DSpace(x, y, (count % 3 + 1)))
        }
      }
    }
  }

  calc3DSpace(x, y, size) {
    let p = new THREE.Vector3(
      x * SCALE,
      0,
      y * SCALE
    )

    // let pos = new THREE.Vector3(x, y, size).multiplyScalar(10)
    // let rot = new THREE.Quaternion()
    // let scale = new THREE.Vector3(1, 1, 1)
    let mat = new THREE.Matrix4().identity()
    // return mat.makeTranslation(x * 10, y * 10 + 15, (size - 1.5) * 10)
    return mat.makeTranslation(p.x, p.y, p.z)
  // return mat.compose(pos, rot, scale)
  }
}

export default class ParticlesMesh extends THREE.Mesh {
  constructor(lightPosition) {
    super(
      new ShadowGeometry(lightPosition),
      new THREE.MeshPhongMaterial({
        color: 0xfff5f5
      })
    )
  }
}
