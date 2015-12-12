/* global THREE */

import 'babel-core/polyfill'
import Stats from 'stats.js'
import dat from 'dat-gui'
import 'OrbitControls'

import './main.styl'
import ParticlesMesh from './particles-mesh'


document.body.innerHTML = require('./body.jade')()
const gui = new dat.gui.GUI()
console.log(gui)

class App {
  constructor() {
    this.animate = this.animate.bind(this)
    this.initScene()
    this.initObjects()
    this.initDebug()
    this.animate()
  }

  initScene() {
    const FAR = 800

    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, FAR)
    this.camera.position.set(0, 150, 30)

    // SCENE
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.Fog(0xebf5ff, 100, FAR)

    // LIGHTS
    let ambient = new THREE.AmbientLight(0x444444)
    this.scene.add(ambient)

    let light = new THREE.SpotLight(0xffffff, 1, 0, Math.PI * 0.4, 1)
    light.position.set(0, 40, 80)
    light.target.position.set(0, 0, 0)

    light.castShadow = true
    light.shadowCameraNear = 1
    light.shadowCameraFar = 250
    light.shadowCameraFov = 50

    light.shadowBias = 0.0001
    light.shadowMapWidth = 2048
    light.shadowMapHeight = 2048
    this.scene.add(light)
    this.light = light

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
      color: 0xfff5f5
    })
    let ground = new THREE.Mesh(geometry, planeMaterial)
    ground.position.set(0, 0, 0)
    ground.rotation.x = -Math.PI / 2
    ground.scale.set(10, 10, 10)
    ground.castShadow = false
    ground.receiveShadow = true
    this.scene.add(ground)

    let mesh = new ParticlesMesh()
    mesh.position.set(0, 15, 30)
    mesh.castShadow = true
    mesh.receiveShadow = true
    this.scene.add(mesh)
  }

  initDebug() {
    this.scene.add(new THREE.CameraHelper(this.light.shadow.camera))

    this.stats = new Stats()
    this.stats.domElement.style.position = 'absolute'
    this.stats.domElement.style.top = '0px'
    document.body.appendChild(this.stats.domElement)

  }

  animate(t) {
    requestAnimationFrame(this.animate)
    this.controls.update(t)
    this.renderer.clear()
    this.renderer.render(this.scene, this.camera)

    this.stats.update()
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }


}

new App()
