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
      props.gravity = 0.0003
    }
    if (props.turbulence == undefined) {
      props.turbulence = new THREE.Vector3(0.002, 0, 0.002)
    }

    super(
      new THREE.BufferGeometry(),
      new THREE.ShaderMaterial({
        vertexShader: require('./shaders/default.vert'),
        fragmentShader: require('./shaders/particle.frag'),
        uniforms: {
          size: {
            type: 'f',
            value: 2.0
          },
          color: {
            type: 'v4',
            value: new THREE.Vector4(1, 1, 1, 0.5)
          },
          texture: {
            type: 't',
            value: THREE.ImageUtils.loadTexture('./textures/snow.png')
          }
        },
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true
      })
    )

    this.count = props.count
    this.area = props.area
    this.gravity = props.gravity
    this.turbulence = props.turbulence

    let positions = new Float32Array(props.count * 3)
    let velocity = new Float32Array(props.count * 3)
    for (let i = 0; i < props.count; i += 3) {
      positions[i] = Math.random() * props.area * 2 - props.area,
      positions[i + 1] = Math.random() * props.area * 2
      positions[i + 2] = Math.random() * props.area * 2 - props.area
    }

    let buffer = new THREE.BufferAttribute(positions, 3, 0).setDynamic(true)
    this.geometry.addAttribute('position', buffer)
    this._velocity = velocity
  }

  update(time) {
    this.rotation.y = time * 0.0001

    let position = this.geometry.attributes.position.array
    let velocity = this._velocity
    for (let i = 0; i < this.count; i += 3) {
      if (position[i + 1] < 0) {
        position[i + 1] = this.area
        velocity[i + 1] = -Math.random() * this.gravity
      }
      velocity[i] += (Math.random() - 0.5) * this.turbulence.x
      velocity[i + 1] += (Math.random() - 0.5) * this.turbulence.y + Math.random() * this.gravity
      velocity[i + 2] += (Math.random() - 0.5) * this.turbulence.z
      position[i] += velocity[i]
      position[i + 1] -= velocity[i + 1]
      position[i + 2] += velocity[i + 2]
    }
    this.geometry.attributes.position.needsUpdate = true
  }
}
