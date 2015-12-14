/* global THREE */

import Stats from 'stats.js'
import dat from 'dat-gui'
import TWEEN from 'tween.js'
import 'OrbitControls'
import loader from './preloader'

import './main.styl'
import ParticlesMesh from './particles-mesh'
import Snow from './snow'
import SnowGround from './snow-ground'




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
    this.controls.autoRotate = true
    this.controls.autoRotateSpeed = 2.0
    this.controls.maxPolarAngle = Math.PI * 0.45
    window.addEventListener('resize', this.onResize.bind(this))
  }

  initObjects() {
    // GROUND
    this.ground = new SnowGround()
    this.ground.castShadow = false
    this.ground.receiveShadow = true
    this.scene.add(this.ground)

    // Cubes
    let particle = new ParticlesMesh(this.light.position, loader.getResult('stripe'))
    particle.position.set(0, -1, 0)
    particle.castShadow = true
    particle.receiveShadow = true
    this.scene.add(particle)
    this.particle = particle

    // Snow
    this.snow = new Snow(loader.getResult('snow'))
    this.scene.add(this.snow)
  }

  initDebug() {
    // this.scene.add(new THREE.CameraHelper(this.light.shadow.camera))

    this.stats = new Stats()
    this.stats.domElement.style.position = 'absolute'
    this.stats.domElement.style.top = '0px'
    document.body.appendChild(this.stats.domElement)


    this.tweenTime = 1000
    this.gui = new dat.gui.GUI()
    this.gui.add(this.particle.geometry, 'morphIndex', 0, 4)
    this.gui.add(this, 'tweenTime', 500, 10000)
    this.gui.add(this, 'bang')
    this.gui.add(this.particle.position, 'y', -1.1, 1.1)
  }

  bang() {
    let p = {
      t: 1
    }
    let tween = new TWEEN.Tween(p)
    tween.to({
      t: 24.99
    }, this.tweenTime)
    tween.onUpdate(() => {
      this.particle.geometry.morphIndex = p.t
    })
    tween.onComplete(() => {
      this.bang()
    })
    tween.start()
  }

  animate(t = 0) {
    requestAnimationFrame(this.animate)
    TWEEN.update(t)
    this.renderer.clear()

    this.controls.update()
    this.snow.update(t)
    this.particle.update(t)
    this.ground.update(t)

    this.renderer.render(this.scene, this.camera)

    this.stats.update()
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

// load
loader.on('complete', () => {
  new App()
  console.log('%c ❄❆❅ ☃ ❅❆❄ ', 'color:#fff;background:#12293b;font-size:30px;font-weight:bold;')
})
loader.load()
