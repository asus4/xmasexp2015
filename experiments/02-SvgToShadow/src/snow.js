/* global THREE */

export default class Snow extends THREE.Points {
  constructor(props = {}) {
    if (props.area == undefined) {
      props.area = 100
    }
    if (props.count == undefined) {
      props.count = 10000
    }
    if (props.gravity == undefined) {
      props.gravity = 0.0001
    }
    if (props.turbulence == undefined) {
      props.turbulence = new THREE.Vector3(0.001, 0, 0.001)
    }

    let geometry = new THREE.Geometry()
    for (let i = 0; i < props.count; ++i) {
      let v = new THREE.Vector3(
        Math.random() * props.area * 2 - props.area,
        Math.random() * props.area * 2,
        Math.random() * props.area * 2 - props.area
      )
      v.velocity = new THREE.Vector3(0, 0, 0)
      geometry.vertices.push(v)
    }

    super(
      geometry,
      new THREE.PointsMaterial({
        size: 1,
        map: THREE.ImageUtils.loadTexture('./textures/snow.png'),
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true
      })
    )
    this.area = props.area
    this.gravity = props.gravity
    this.turbulence = props.turbulence
  }

  update() {
    this.rotation.y += 0.001

    let vertices = this.geometry.vertices
    vertices.forEach((v) => {
      if (v.y < 0) {
        v.y = this.area
        v.velocity.y = -Math.random() * this.gravity
      }

      v.velocity.x += (Math.random() - 0.5) * this.turbulence.x
      v.velocity.y += (Math.random() - 0.5) * this.turbulence.y - Math.random() * this.gravity
      v.velocity.z += (Math.random() - 0.5) * this.turbulence.z
      v.add(v.velocity)
    })
    this.geometry.verticesNeedUpdate = true
  }
}
