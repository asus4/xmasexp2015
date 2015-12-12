/* global THREE */

import 'babel-core/polyfill'
import './main.styl'
import dat from 'dat-gui'
import 'OrbitControls'

document.body.innerHTML = require('./body.jade')()
const gui = new dat.gui.GUI()

class App {
  constructor() {
    this.animate = this.animate.bind(this)
    this.initScene()
    this.initObjects()
    this.animate()
  }

  initScene() {
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 3000)
    this.camera.position.set(700, 50, 1900)

    // SCENE
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.Fog(0x59472b, 1000, 3000)

    // LIGHTS
    let ambient = new THREE.AmbientLight(0x444444)
    this.scene.add(ambient)

    let light = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 2, 1)
    light.position.set(0, 1500, 1000)
    light.target.position.set(0, 0, 0)

    light.castShadow = true

    light.shadowCameraNear = 1200
    light.shadowCameraFar = 2500
    light.shadowCameraFov = 50

    // light.shadowCameraVisible = true

    light.shadowBias = 0.0001
    light.shadowMapWidth = 2048
    light.shadowMapHeight = 2048

    this.scene.add(light)

    // RENDERER
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    this.renderer.setClearColor(this.scene.fog.color)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.autoClear = false

    //
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFShadowMap

    //
    document.body.appendChild(this.renderer.domElement)

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
    window.addEventListener('resize', this.onResize.bind(this))
  }

  initObjects() {
    // GROUND
    let geometry = new THREE.PlaneBufferGeometry(100, 100)
    let planeMaterial = new THREE.MeshPhongMaterial({
      color: 0xffdd99
    })
    let ground = new THREE.Mesh(geometry, planeMaterial)
    ground.position.set(0, 0, 0)
    ground.rotation.x = -Math.PI / 2
    ground.scale.set(100, 100, 100)
    ground.castShadow = false
    ground.receiveShadow = true
    this.scene.add(ground)

    let mesh = new THREE.Mesh(new THREE.BoxGeometry(1600, 170, 250), planeMaterial)
    mesh.position.set(0, 200, 20)
    mesh.castShadow = true
    mesh.receiveShadow = true
    this.scene.add(mesh)
  }

  animate(t) {
    // console.log(t)
    requestAnimationFrame(this.animate)

    this.controls.update()
    this.renderer.clear()
    this.renderer.render(this.scene, this.camera)
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }


}

new App()
