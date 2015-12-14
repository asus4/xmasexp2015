/* global THREE */
import 'water-material'

export default class SnowGround extends THREE.Mesh {
  constructor() {
    //
    // let normalTex = THREE.ImageUtils.loadTexture('./textures/waternormals.jpg')
    // normalTex.wrapS = normalTex.wrapT = THREE.RepeatWrapping
    let mat = new THREE.MeshPhongMaterial({
      color: 0xfff5f5
    })

    super(new THREE.PlaneBufferGeometry(1000, 1000, 10, 10), mat)
    this.rotation.x = -Math.PI * 0.5
  }

  update(time) {
    // this.material.uniforms.time.value = time
  }
}
