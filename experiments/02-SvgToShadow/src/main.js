/* global THREE */

//import 'babel-core/polyfill'
import Stats from 'stats.js'
import dat from 'dat-gui'
import 'OrbitControls'

import './main.styl'
import ParticlesMesh from './particles-mesh'
import Snow from './snow'

document.body.innerHTML = require('./body.jade')()

class App {
  constructor() {
    this.animate = this.animate.bind(this)
    this.initScene()
    this.initObjects()
    this.initDebug()
    this.animate()
  }

  initScene() {
    const FAR = 400

    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, FAR)
    this.camera.position.set(0, 150, 30)

    // SCENE
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.Fog(0x12293b, 30, FAR)

    // LIGHTS
    let ambient = new THREE.AmbientLight(0x555555)
    this.scene.add(ambient)

    let light = new THREE.SpotLight(0xffffff, 0.7, 0, Math.PI * 0.4, 1)
    light.position.set(0, 30, 90)
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
      antialias: false
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

    // Cubes
    let particle = new ParticlesMesh(this.light.position)
    particle.position.set(0, -1, 0)
    particle.castShadow = true
    particle.receiveShadow = true
    this.scene.add(particle)
    this.particle = particle

    // Snow
    this.snow = new Snow()
    this.scene.add(this.snow)
  }

  initDebug() {
    this.scene.add(new THREE.CameraHelper(this.light.shadow.camera))

    this.stats = new Stats()
    this.stats.domElement.style.position = 'absolute'
    this.stats.domElement.style.top = '0px'
    document.body.appendChild(this.stats.domElement)

    this.gui = new dat.gui.GUI()
    this.gui.add(this.particle.geometry, 'morphIndex', 0, 2)
  }

  animate(t) {
    requestAnimationFrame(this.animate)
    this.renderer.clear()

    this.controls.update()
    this.snow.update(t)
    this.particle.update(t)

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
console.log('%c ❄❆❅ Merry ☃ Christmas ❅❆❄ ', 'color:#fff;background:#12293b;font-size:30px;font-weight:bold;')
