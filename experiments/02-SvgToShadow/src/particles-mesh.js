/* global THREE */

export default class ParticlesMesh extends THREE.Mesh {
  constructor() {
    let geometry = new THREE.Geometry()
    let cube = new THREE.CubeGeometry(1, 1, 1, 1, 1, 1)
    let sphere = new THREE.SphereGeometry(0.5)

    let random3d = (s, offset = 0) => {
      return new THREE.Vector3(
        s * Math.random() + offset,
        s * Math.random() + offset,
        s * Math.random() + offset)
    }
    let randomRot3d = (s, offset = 0) => {
      return new THREE.Euler(
        s * Math.random() + offset,
        s * Math.random() + offset,
        s * Math.random() + offset)
    }

    let mat = new THREE.Matrix4()
    let quaternion = new THREE.Quaternion()

    for (let i = 0; i < 50; i++) {
      let pos = random3d(20, -10)
      let rot = randomRot3d(2 * Math.PI)
      let scale = random3d(2.0, 1.0)
      quaternion.setFromEuler(rot, false)
      geometry.merge(cube, mat.compose(pos, quaternion, scale))

      pos = random3d(20, -10)
      rot = randomRot3d(2 * Math.PI)
      scale = random3d(2.0, 1.0)
      quaternion.setFromEuler(rot, false)
      geometry.merge(sphere, mat.compose(pos, quaternion, scale))
    }
    super(
      geometry,
      new THREE.MeshPhongMaterial({
        color: 0xfff5f5
      })
    )
  }
}
