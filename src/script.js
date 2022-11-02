import "./styles.css";
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/orbitcontrols";
import Planet from "./physics/Planet";

const objects = []
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


const textureLoader = new THREE.TextureLoader()
const suncolorTexture = textureLoader.load('textures/assent/Sun1.jpg',)
const mercurycolorTexture = textureLoader.load('textures/assent/mercury.jpg',)
const marscolorTexture = textureLoader.load('textures/assent/mars.jpg',)
const jupitercolorTexture = textureLoader.load('textures/assent/jupiter.jpg',)
const uranuscolorTexture = textureLoader.load('textures/assent/uranus.jpg',)
const earthcolorTexture = textureLoader.load('textures/assent/earth.jpg',)
const neptunecolorTexture = textureLoader.load('textures/assent/neptune.jpg',)
const saturncolorTexture = textureLoader.load('textures/assent/saturn2.jpg',)
const vinusTexture = textureLoader.load('textures/assent/vinus.jpg',)
const starTexture = textureLoader.load('textures/star.png',)

/**
* mouse
*/
const mouse = new THREE.Vector2()
window.addEventListener('mousemove', (event) => {

  mouse.x = event.clientX / sizes.width * 2 - 1
  mouse.y = -(event.clientY / sizes.height * 2 - 1)

})

/**
* Debug
*/
const gui = new dat.GUI({
  // closed: true,
  width: 400
})
gui.close();


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
* Object
*/
const sun = new Planet(
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, 0),
  699999090000,
  1.98 * Math.pow(10, 30),
  0xFFFFFF
)
sun.mesh.material.map = suncolorTexture
scene.add(sun.mesh)
objects.push(sun)

const au= 150 * Math.pow(10, 9),earth_mass= 5.97 * Math.pow(10, 24)
const parameters = {

  k: 8,
  time_step: 24 * 20 * 20,
  
  //mars
  marsPosion_x: 206655215000,
  marsPosion_y: -4445500,
  marsPosion_z: 0,
  marsvelocity_x: 0,
  marsvelocity_y: 3000,
  marsvelocity_z: -1 * 24 * 1000,
  marsReduis: 47998900000,
  marsMass: 6.39 * Math.pow(10, 23),


  //earth
  earthPosion_x: au,
  earthPosion_y: -124545,
  earthPosion_z: 0,
  earthvelocity_x: 0,
  earthvelocity_y: 2300,
  earthvelocity_z: -1 * 23 * 1000,
  earthReduis: 127420000000,
  earthMass: 5.97 * Math.pow(10, 24),

  //mercury
  mercuryPosion_x: 58000000000,
  mercuryPosion_y: -8500,
  mercuryPosion_z: 0,
  mercuryvelocity_x: 0,
  mercuryvelocity_y: -700,
  mercuryvelocity_z: -1 * 40 * 1000,
  mercuryReduis: 24390000000,
  mercuryMass: 0.0558 * earth_mass,

  //vinus
  vinusPosion_x: 108199995550,
  vinusPosion_y: 2000,
  vinusPosion_z: 0,
  vinusvelocity_x: 0,
  vinusvelocity_y: 0,
  vinusvelocity_z: -1 * 28.65 * 1000,
  vinusReduis: 60520000000,
  vinusMass: 0.815 * earth_mass,

  //jupiter
  jupiterPosion_x: 778330257000,
  jupiterPosion_y: 0,
  jupiterPosion_z: 0,
  jupitervelocity_x: 0,
  jupitervelocity_y: 0,
  jupitervelocity_z: -1 * 12.65 * 1000,
  jupiterReduis: 714940000000,
  jupiterMass: 317.8 * earth_mass,

  //saturn
  saturnPosion_x: 9.57 * au,
  saturnPosion_y: 0,
  saturnPosion_z: 0,
  saturnvelocity_x: 0,
  saturnvelocity_y: 0,
  saturnvelocity_z: -1 * 10.65 * 1000,
  saturnReduis: 603300000000,
  saturnMass: 95.147 * earth_mass,

  //uranus
  uranusPosion_x: 19.17 * au,
  uranusPosion_y: 0,
  uranusPosion_z: 0,
  uranusvelocity_x: 0,
  uranusvelocity_y: 0,
  uranusvelocity_z: -1 * 7.65 * 1000,
  uranusReduis: 2555900000000,
  uranusMass: 14.54 * earth_mass,

  //neptune
  neptunePosion_x: 30.18 * au,
  neptunePosion_y: 0,
  neptunePosion_z: 0,
  neptunevelocity_x: 0,
  neptunevelocity_y: 0,
  neptunevelocity_z: -1 * 5.65 * 1000,
  neptuneReduis: 2475000000000,
  neptuneMass: 17.23 * earth_mass,

  //newplanet
  newPlanetPosision_x: 0.01,
  newPlanetPosision_y: 0.01,
  newPlanetPosision_z: 0.01,
  newPlanetVelocity_x: 0.01,
  newPlanetVelocity_y: 0.01,
  newPlanetVelocity_z: 0.01,
  newPlanetReduis: 0.01,
  newPlanetMess: 0.01,
  createPlanet: () => {

    gui.add(parameters, 'newPlanetPosision_x').min(-(30.18 * 150 * Math.pow(10, 9))).max(30.18 * 150 * Math.pow(10, 9)).step(1)
    gui.add(parameters, 'newPlanetPosision_y').min(-(30.18 * 150 * Math.pow(10, 9))).max(30.18 * 150 * Math.pow(10, 9)).step(1)
    gui.add(parameters, 'newPlanetPosision_z').min(-(30.18 * 150 * Math.pow(10, 9))).max((30.18 * 150 * Math.pow(10, 9))).step(1)
    gui.add(parameters, 'newPlanetVelocity_x').min(-47000).max(47000).step(10)
    gui.add(parameters, 'newPlanetVelocity_y').min(-47000).max(47000).step(10)
    gui.add(parameters, 'newPlanetVelocity_z').min(-47000).max(47000).step(10)
    gui.add(parameters, 'newPlanetMess').min(1).max(1.98 * Math.pow(10, 28)).step(500)
    gui.add(parameters, 'newPlanetReduis').min(1).max(6.96 * Math.pow(10, 12)).step(50).onChange(() => {
      const NewPlanet = new Planet(
        new THREE.Vector3(parameters.newPlanetPosision_x, parameters.newPlanetPosision_y, parameters.newPlanetPosision_z),
        new THREE.Vector3(parameters.newPlanetVelocity_x, parameters.newPlanetVelocity_y, parameters.newPlanetVelocity_z),
        parameters.newPlanetMess,
        parameters.newPlanetReduis,
        0xffffff
      )
      scene.add(NewPlanet.mesh)
      objects.push(NewPlanet)
    })

  }

}
let sunSCALE=parameters.k / au
gui.add(parameters, 'createPlanet')

const standardization = gui.addFolder('standardization')
standardization.add(parameters, 'k').min(5).max(20).step(0.5).onChange(()=>{sunSCALE=parameters.k/au})
standardization.add(parameters, 'time_step').min(20 * 20).max(90 * 90 * 90).onChange(updateGravity)

//Earth----------------------------------------------
const earth = new Planet(
  new THREE.Vector3(parameters.earthPosion_x, parameters.earthPosion_y, parameters.earthPosion_z),
  new THREE.Vector3(parameters.earthvelocity_x, parameters.earthvelocity_y, parameters.earthvelocity_z),
  parameters.earthReduis,
  parameters.earthMass,
  0xFF0000
)
earth.mesh.material.map = earthcolorTexture
scene.add(earth.mesh)
objects.push(earth)

const EarthYFolder = gui.addFolder('EARTH')
EarthYFolder.add(parameters, 'earthPosion_x')
.min(-(30.18 * 150 * Math.pow(10, 9))).max((30.18 * 150 * Math.pow(10, 9))).step(1000)
.onChange(() => {   earth.position.set(parameters.earthPosion_x, parameters.earthPosion_y, parameters.earthPosion_z) },
                  updateGravity
          )
EarthYFolder.add(parameters, 'earthPosion_y').min(-(30.18 * 150 * Math.pow(10, 9))).max((30.18 * 150 * Math.pow(10, 9))).step(1000).onChange(() => { earth.position.set(parameters.earthPosion_x, parameters.earthPosion_y, parameters.earthPosion_z) }, updateGravity)
EarthYFolder.add(parameters, 'earthPosion_z').min(-(30.18 * 150 * Math.pow(10, 9))).max(30.18 * 150 * Math.pow(10, 9)).step(1).onChange(() => { earth.position.set(parameters.earthPosion_x, parameters.earthPosion_y, parameters.earthPosion_z) }, updateGravity)
EarthYFolder.add(parameters, 'earthvelocity_x')
.min(-47000).max(47000).step(10)
.onChange(() => { earth.velocity.set(parameters.earthvelocity_x, parameters.earthvelocity_y, parameters.earthvelocity_z),
 earth.momentoum = earth.velocity.clone().multiply(earth.getMAss()) }, updateGravity)
EarthYFolder.add(parameters, 'earthvelocity_y').min(-47000).max(47000).step(10).onChange(() => { earth.velocity.set(parameters.earthvelocity_x, parameters.earthvelocity_y, parameters.earthvelocity_z), earth.momentoum = earth.velocity.clone().multiply(earth.getMAss()) }, updateGravity)
EarthYFolder.add(parameters, 'earthvelocity_z').min(-47000).max(47000).step(10).onChange(() => { earth.velocity.set(parameters.earthvelocity_x, parameters.earthvelocity_y, parameters.earthvelocity_z), earth.momentoum = earth.velocity.clone().multiply(earth.getMAss()) }, updateGravity)
EarthYFolder.add(parameters, 'earthMass')
.min(1).max(1.98 * Math.pow(10, 28)).step(500)
.onChange(() => { earth.mass = parameters.earthMass , earth.mass_vec.set(earth.mass,earth.mass,earth.mass),
  earth.momentoum = earth.velocity.clone().multiply(earth.getMAss()) }, updateGravity)
EarthYFolder.add(parameters, 'earthReduis')
.min(1).max(1.98 * Math.pow(10, 28)).step(500)
.onChange(() => { earth.raduis = parameters.earthReduis }, updateGravity)
//----------------------------------------------------

//MERCURY----------------------------------------------
const MERCURY = new Planet(
  new THREE.Vector3(parameters.mercuryPosion_x, parameters.mercuryPosion_y, parameters.mercuryPosion_z),
  new THREE.Vector3(parameters.mercuryvelocity_x, parameters.mercuryvelocity_y, parameters.mercuryvelocity_z),
  parameters.mercuryReduis,
  parameters.mercuryMass,
  0x00ff00
)
MERCURY.mesh.material.map = mercurycolorTexture
scene.add(MERCURY.mesh)
objects.push(MERCURY)

const MERCURYFolder = gui.addFolder('MERCURY')
MERCURYFolder.add(parameters, 'mercuryPosion_x').min(-(30.18 * 150 * Math.pow(10, 9))).max((30.18 * 150 * Math.pow(10, 9))).step(1000).onChange(() => { MERCURY.position.set(parameters.mercuryPosion_x, parameters.mercuryPosion_y, parameters.mercuryPosion_z) }, updateGravity)
MERCURYFolder.add(parameters, 'mercuryPosion_y').min(-(30.18 * 150 * Math.pow(10, 9))).max((30.18 * 150 * Math.pow(10, 9))).step(1000).onChange(() => { MERCURY.position.set(parameters.mercuryPosion_x, parameters.mercuryPosion_y, parameters.mercuryPosion_z) }, updateGravity)
MERCURYFolder.add(parameters, 'mercuryPosion_z').min(-(30.18 * 150 * Math.pow(10, 9))).max(30.18 * 150 * Math.pow(10, 9)).step(1).onChange(() => { MERCURY.position.set(parameters.mercuryPosion_x, parameters.mercuryPosion_y, parameters.mercuryPosion_z) }, updateGravity)
MERCURYFolder.add(parameters, 'mercuryvelocity_x').min(-47000).max(47000).step(10).onChange(() => { MERCURY.velocity.set(parameters.mercuryvelocity_x, parameters.mercuryvelocity_y, parameters.mercuryvelocity_z),MERCURY.momentoum = MERCURY.velocity.clone().multiply(MERCURY.getMAss()) }, updateGravity)
MERCURYFolder.add(parameters, 'mercuryvelocity_y').min(-47000).max(47000).step(10).onChange(() => { MERCURY.velocity.set(parameters.mercuryvelocity_x, parameters.mercuryvelocity_y, parameters.mercuryvelocity_z),MERCURY.momentoum = MERCURY.velocity.clone().multiply(MERCURY.getMAss()) }, updateGravity)
MERCURYFolder.add(parameters, 'mercuryvelocity_z').min(-47000).max(47000).step(10).onChange(() => { MERCURY.velocity.set(parameters.mercuryvelocity_x, parameters.mercuryvelocity_y, parameters.mercuryvelocity_z),MERCURY.momentoum = MERCURY.velocity.clone().multiply(MERCURY.getMAss()) }, updateGravity)
MERCURYFolder.add(parameters, 'mercuryMass').min(1).max(1.98 * Math.pow(10, 28)).step(500).onChange(() => { MERCURY.mass = parameters.mercuryMass ,MERCURY.mass_vec.set(MERCURY.mass,MERCURY.mass,MERCURY.mass),MERCURY.momentoum = MERCURY.velocity.clone().multiply(MERCURY.getMAss())}, updateGravity)
MERCURYFolder.add(parameters, 'mercuryReduis').min(1).max(1.98 * Math.pow(10, 28)).step(500).onChange(() => { MERCURY.raduis = parameters.mercuryReduis }, updateGravity)
//----------------------------------------------------


//Mars----------------------------------------------
const Mars = new Planet(
  new THREE.Vector3(parameters.marsPosion_x, parameters.marsPosion_y, parameters.marsPosion_z),
  new THREE.Vector3(parameters.marsvelocity_x, parameters.marsvelocity_y, parameters.marsvelocity_z),
  parameters.marsReduis,
  parameters.marsMass,
  0xffcc00
)
Mars.mesh.material.map = marscolorTexture
scene.add(Mars.mesh)
objects.push(Mars)
const MarsFolder = gui.addFolder('Mars')
MarsFolder.add(parameters, 'marsPosion_x').min(-(30.18 * 150 * Math.pow(10, 9))).max((30.18 * 150 * Math.pow(10, 9))).step(1000).onChange(() => { Mars.position.set(parameters.marsPosion_x, parameters.marsPosion_y, parameters.marsPosion_z) }, updateGravity)
MarsFolder.add(parameters, 'marsPosion_y').min(-(30.18 * 150 * Math.pow(10, 9))).max((30.18 * 150 * Math.pow(10, 9))).step(1000).onChange(() => { Mars.position.set(parameters.marsPosion_x, parameters.marsPosion_y, parameters.marsPosion_z) }, updateGravity)
MarsFolder.add(parameters, 'marsPosion_z').min(-(30.18 * 150 * Math.pow(10, 9))).max(30.18 * 150 * Math.pow(10, 9)).step(1).onChange(() => { Mars.position.set(parameters.marsPosion_x, parameters.marsPosion_y, parameters.marsPosion_z) }, updateGravity)
MarsFolder.add(parameters, 'marsvelocity_x').min(-47000).max(47000).step(10).onChange(() => { Mars.velocity.set(parameters.marsvelocity_x, parameters.marsvelocity_y, parameters.marsvelocity_z),Mars.momentoum = Mars.velocity.clone().multiply(Mars.getMAss()) }, updateGravity)
MarsFolder.add(parameters, 'marsvelocity_y').min(-47000).max(47000).step(10).onChange(() => { Mars.velocity.set(parameters.marsvelocity_x, parameters.marsvelocity_y, parameters.marsvelocity_z),Mars.momentoum = Mars.velocity.clone().multiply(Mars.getMAss()) }, updateGravity)
MarsFolder.add(parameters, 'marsvelocity_z').min(-47000).max(47000).step(10).onChange(() => { Mars.velocity.set(parameters.marsvelocity_x, parameters.marsvelocity_y, parameters.marsvelocity_z),Mars.momentoum = Mars.velocity.clone().multiply(Mars.getMAss()) }, updateGravity)
MarsFolder.add(parameters, 'marsMass').min(1).max(1.98 * Math.pow(10, 28)).step(500).onChange(() => { Mars.mass = parameters.marsMass ,Mars.mass_vec.set(Mars.mass,Mars.mass,Mars.mass),Mars.momentoum = Mars.velocity.clone().multiply(Mars.getMAss())}, updateGravity)
MarsFolder.add(parameters, 'marsReduis').min(1).max(1.98 * Math.pow(10, 28)).step(500).onChange(() => { Mars.raduis = parameters.marsReduis }, updateGravity)
//----------------------------------------------------

//Vinus----------------------------------------------
const Vinus = new Planet(
  new THREE.Vector3(parameters.vinusPosion_x, parameters.vinusPosion_y, parameters.vinusPosion_z),
  new THREE.Vector3(parameters.vinusvelocity_x, parameters.vinusvelocity_y, parameters.vinusvelocity_z),
  parameters.vinusReduis,
  parameters.vinusMass,
  0xff06b7
)
Vinus.mesh.material.map = vinusTexture
scene.add(Vinus.mesh)
objects.push(Vinus)
const VinusFolder = gui.addFolder('Vinus')
VinusFolder.add(parameters, 'vinusPosion_x').min(-(30.18 * 150 * Math.pow(10, 9))).max((30.18 * 150 * Math.pow(10, 9))).step(1000).onChange(() => { Vinus.position.set(parameters.vinusPosion_x, parameters.vinusPosion_y, parameters.vinusPosion_z) }, updateGravity)
VinusFolder.add(parameters, 'vinusPosion_y').min(-(30.18 * 150 * Math.pow(10, 9))).max((30.18 * 150 * Math.pow(10, 9))).step(1000).onChange(() => { Vinus.position.set(parameters.vinusPosion_x, parameters.vinusPosion_y, parameters.vinusPosion_z) }, updateGravity)
VinusFolder.add(parameters, 'vinusPosion_z').min(-(30.18 * 150 * Math.pow(10, 9))).max(30.18 * 150 * Math.pow(10, 9)).step(1).onChange(() => { Vinus.position.set(parameters.vinusPosion_x, parameters.vinusPosion_y, parameters.vinusPosion_z) }, updateGravity)
VinusFolder.add(parameters, 'vinusvelocity_x').min(-47000).max(47000).step(10).onChange(() => { Vinus.velocity.set(parameters.vinusvelocity_x, parameters.vinusvelocity_y, parameters.vinusvelocity_z) ,Vinus.momentoum = Vinus.velocity.clone().multiply(Vinus.getMAss())}, updateGravity)
VinusFolder.add(parameters, 'vinusvelocity_y').min(-47000).max(47000).step(10).onChange(() => { Vinus.velocity.set(parameters.vinusvelocity_x, parameters.vinusvelocity_y, parameters.vinusvelocity_z) ,Vinus.momentoum = Vinus.velocity.clone().multiply(Vinus.getMAss())}, updateGravity)
VinusFolder.add(parameters, 'vinusvelocity_z').min(-47000).max(47000).step(10).onChange(() => { Vinus.velocity.set(parameters.vinusvelocity_x, parameters.vinusvelocity_y, parameters.vinusvelocity_z) ,Vinus.momentoum = Vinus.velocity.clone().multiply(Vinus.getMAss())}, updateGravity)
VinusFolder.add(parameters, 'vinusMass').min(1).max(1.98 * Math.pow(10, 28)).step(500).onChange(() => { Vinus.mass = parameters.vinusMass ,Vinus.mass_vec.set(Vinus.mass,Vinus.mass,Vinus.mass),Vinus.momentoum = Vinus.velocity.clone().multiply(Vinus.getMAss())}, updateGravity)
VinusFolder.add(parameters, 'vinusReduis').min(1).max(1.98 * Math.pow(10, 28)).step(500).onChange(() => { Vinus.raduis = parameters.vinusReduis }, updateGravity)
//----------------------------------------------------

//Jupiter----------------------------------------------
const Jupiter = new Planet(
  new THREE.Vector3(parameters.jupiterPosion_x, parameters.jupiterPosion_y, parameters.jupiterPosion_z),
  new THREE.Vector3(parameters.jupitervelocity_x, parameters.jupitervelocity_y, parameters.jupitervelocity_z),
  parameters.jupiterReduis,
  parameters.jupiterMass,
  0x964b00
)
Jupiter.mesh.material.map = jupitercolorTexture
scene.add(Jupiter.mesh)
objects.push(Jupiter)
const JupiterFolder = gui.addFolder('Jupiter')
JupiterFolder.add(parameters, 'jupiterPosion_x').min(-(30.18 * 150 * Math.pow(10, 9))).max((30.18 * 150 * Math.pow(10, 9))).step(1000).onChange(() => { Jupiter.position.set(parameters.jupiterPosion_x, parameters.jupiterPosion_y, parameters.jupiterPosion_z) }, updateGravity)
JupiterFolder.add(parameters, 'jupiterPosion_y').min(-(30.18 * 150 * Math.pow(10, 9))).max((30.18 * 150 * Math.pow(10, 9))).step(1000).onChange(() => { Jupiter.position.set(parameters.jupiterPosion_x, parameters.jupiterPosion_y, parameters.jupiterPosion_z) }, updateGravity)
JupiterFolder.add(parameters, 'jupiterPosion_z').min(-(30.18 * 150 * Math.pow(10, 9))).max(30.18 * 150 * Math.pow(10, 9)).step(1).onChange(() => { Jupiter.position.set(parameters.jupiterPosion_x, parameters.jupiterPosion_y, parameters.jupiterPosion_z) }, updateGravity)
JupiterFolder.add(parameters, 'jupitervelocity_x').min(-47000).max(47000).step(10).onChange(() => { Jupiter.velocity.set(parameters.jupitervelocity_x, parameters.jupitervelocity_y, parameters.jupitervelocity_z) ,Jupiter.momentoum = Jupiter.velocity.clone().multiply(Jupiter.getMAss())}, updateGravity)
JupiterFolder.add(parameters, 'jupitervelocity_y').min(-47000).max(47000).step(10).onChange(() => { Jupiter.velocity.set(parameters.jupitervelocity_x, parameters.jupitervelocity_y, parameters.jupitervelocity_z) ,Jupiter.momentoum = Jupiter.velocity.clone().multiply(Jupiter.getMAss())}, updateGravity)
JupiterFolder.add(parameters, 'jupitervelocity_z').min(-47000).max(47000).step(10).onChange(() => { Jupiter.velocity.set(parameters.jupitervelocity_x, parameters.jupitervelocity_y, parameters.jupitervelocity_z) ,Jupiter.momentoum = Jupiter.velocity.clone().multiply(Jupiter.getMAss())}, updateGravity)
JupiterFolder.add(parameters, 'jupiterMass').min(1).max(1.98 * Math.pow(10, 28)).step(500).onChange(() => { Jupiter.mass = parameters.jupiterMass,Jupiter.mass_vec.set(Jupiter.mass,Jupiter.mass,Jupiter.mass),Jupiter.momentoum = Jupiter.velocity.clone().multiply(Jupiter.getMAss()) }, updateGravity)
JupiterFolder.add(parameters, 'jupiterReduis').min(1).max(1.98 * Math.pow(10, 28)).step(500).onChange(() => { Jupiter.raduis = parameters.jupiterReduis }, updateGravity)
//----------------------------------------------------

//Saturn----------------------------------------------
const Saturn = new Planet(
  new THREE.Vector3(parameters.saturnPosion_x, parameters.saturnPosion_y, parameters.saturnPosion_z),
  new THREE.Vector3(parameters.saturnvelocity_x, parameters.saturnvelocity_y, parameters.saturnvelocity_z),
  parameters.saturnReduis,
  parameters.saturnMass,
  0x96bb00
)
Saturn.mesh.material.map = saturncolorTexture
scene.add(Saturn.mesh)
objects.push(Saturn)
const SaturnFolder = gui.addFolder('Saturn')
SaturnFolder.add(parameters, 'saturnPosion_x').min(-(30.18 * 150 * Math.pow(10, 9))).max((30.18 * 150 * Math.pow(10, 9))).step(1000).onChange(() => { Saturn.position.set(parameters.saturnPosion_x, parameters.saturnPosion_y, parameters.saturnPosion_z) }, updateGravity)
SaturnFolder.add(parameters, 'saturnPosion_y').min(-(30.18 * 150 * Math.pow(10, 9))).max((30.18 * 150 * Math.pow(10, 9))).step(1000).onChange(() => { Saturn.position.set(parameters.saturnPosion_x, parameters.saturnPosion_y, parameters.saturnPosion_z) }, updateGravity)
SaturnFolder.add(parameters, 'saturnPosion_z').min(-(30.18 * 150 * Math.pow(10, 9))).max(30.18 * 150 * Math.pow(10, 9)).step(1).onChange(() => { Saturn.position.set(parameters.saturnPosion_x, parameters.saturnPosion_y, parameters.saturnPosion_z) }, updateGravity)
SaturnFolder.add(parameters, 'saturnvelocity_x').min(-47000).max(47000).step(10).onChange(() => { Saturn.velocity.set(parameters.saturnvelocity_x, parameters.saturnvelocity_y, parameters.saturnvelocity_z) ,Saturn.momentoum = Saturn.velocity.clone().multiply(Saturn.getMAss())}, updateGravity)
SaturnFolder.add(parameters, 'saturnvelocity_y').min(-47000).max(47000).step(10).onChange(() => { Saturn.velocity.set(parameters.saturnvelocity_x, parameters.saturnvelocity_y, parameters.saturnvelocity_z) ,Saturn.momentoum = Saturn.velocity.clone().multiply(Saturn.getMAss())}, updateGravity)
SaturnFolder.add(parameters, 'saturnvelocity_z').min(-47000).max(47000).step(10).onChange(() => { Saturn.velocity.set(parameters.saturnvelocity_x, parameters.saturnvelocity_y, parameters.saturnvelocity_z) ,Saturn.momentoum = Saturn.velocity.clone().multiply(Saturn.getMAss())}, updateGravity)
SaturnFolder.add(parameters, 'saturnMass').min(1).max(1.98 * Math.pow(10, 28)).step(500).onChange(() => { Saturn.mass = parameters.saturnMass ,Saturn.mass_vec.set(Saturn.mass,Saturn.mass,Saturn.mass),Saturn.momentoum = Saturn.velocity.clone().multiply(Saturn.getMAss())},updateGravity,)
SaturnFolder.add(parameters, 'saturnReduis').min(1).max(1.98 * Math.pow(10, 28)).step(500).onChange(() => { Saturn.raduis = parameters.saturnReduis }, updateGravity)
//----------------------------------------------------

//Uranus----------------------------------------------
const Uranus = new Planet(
  new THREE.Vector3(parameters.uranusPosion_x, parameters.uranusPosion_y, parameters.uranusPosion_z),
  new THREE.Vector3(parameters.uranusvelocity_x, parameters.uranusvelocity_y, parameters.uranusvelocity_z),
  parameters.uranusReduis,
  parameters.uranusMass,
  0x9cbb00
)
Uranus.mesh.material.map = uranuscolorTexture
scene.add(Uranus.mesh)
objects.push(Uranus)
const UranusFolder = gui.addFolder('Uranus')
UranusFolder.add(parameters, 'uranusPosion_x').min(-(30.18 * 150 * Math.pow(10, 9))).max((30.18 * 150 * Math.pow(10, 9))).step(1000).onChange(() => { Uranus.position.set(parameters.uranusPosion_x, parameters.uranusPosion_y, parameters.uranusPosion_z) }, updateGravity)
UranusFolder.add(parameters, 'uranusPosion_y').min(-(30.18 * 150 * Math.pow(10, 9))).max((30.18 * 150 * Math.pow(10, 9))).step(1000).onChange(() => { Uranus.position.set(parameters.uranusPosion_x, parameters.uranusPosion_y, parameters.uranusPosion_z) }, updateGravity)
UranusFolder.add(parameters, 'uranusPosion_z').min(-(30.18 * 150 * Math.pow(10, 9))).max(30.18 * 150 * Math.pow(10, 9)).step(1).onChange(() => { Uranus.position.set(parameters.uranusPosion_x, parameters.uranusPosion_y, parameters.uranusPosion_z) }, updateGravity)
UranusFolder.add(parameters, 'uranusvelocity_x').min(-47000).max(47000).step(10).onChange(() => { Uranus.velocity.set(parameters.uranusvelocity_x, parameters.uranusvelocity_y, parameters.uranusvelocity_z),Uranus.momentoum = Uranus.velocity.clone().multiply(Uranus.getMAss()) }, updateGravity)
UranusFolder.add(parameters, 'uranusvelocity_y').min(-47000).max(47000).step(10).onChange(() => { Uranus.velocity.set(parameters.uranusvelocity_x, parameters.uranusvelocity_y, parameters.uranusvelocity_z),Uranus.momentoum = Uranus.velocity.clone().multiply(Uranus.getMAss()) }, updateGravity)
UranusFolder.add(parameters, 'uranusvelocity_z').min(-47000).max(47000).step(10).onChange(() => { Uranus.velocity.set(parameters.uranusvelocity_x, parameters.uranusvelocity_y, parameters.uranusvelocity_z),Uranus.momentoum = Uranus.velocity.clone().multiply(Uranus.getMAss()) }, updateGravity)
UranusFolder.add(parameters, 'uranusMass').min(1).max(1.98 * Math.pow(10, 28)).step(500).onChange(() => { Uranus.mass = parameters.uranusMass ,Uranus.mass_vec.set(Uranus.mass,Uranus.mass,Uranus.mass),Uranus.momentoum = Uranus.velocity.clone().multiply(Uranus.getMAss()) }, updateGravity)
UranusFolder.add(parameters, 'uranusReduis').min(1).max(1.98 * Math.pow(10, 28)).step(500).onChange(() => { Uranus.raduis = parameters.uranusReduis }, updateGravity)
//----------------------------------------------------

//Neptune---------------------------------------------
const Neptune = new Planet(
  new THREE.Vector3(parameters.neptunePosion_x, parameters.neptunePosion_y, parameters.neptunePosion_z),
  new THREE.Vector3(parameters.neptunevelocity_x, parameters.neptunevelocity_y, parameters.neptunevelocity_z),
  parameters.neptuneReduis,
  parameters.neptuneMass,
  0x9cbbf0
)
Neptune.mesh.material.map = neptunecolorTexture
scene.add(Neptune.mesh)
objects.push(Neptune)
const NeptuneFolder = gui.addFolder('Neptune')
NeptuneFolder.add(parameters, 'neptunePosion_x').min(-(30.18 * 150 * Math.pow(10, 9))).max((30.18 * 150 * Math.pow(10, 9))).step(1000).onChange(() => { Neptune.position.set(parameters.neptunePosion_x, parameters.neptunePosion_y, parameters.neptunePosion_z) }, updateGravity)
NeptuneFolder.add(parameters, 'neptunePosion_y').min(-(30.18 * 150 * Math.pow(10, 9))).max((30.18 * 150 * Math.pow(10, 9))).step(1000).onChange(() => { Neptune.position.set(parameters.neptunePosion_x, parameters.neptunePosion_y, parameters.neptunePosion_z) }, updateGravity)
NeptuneFolder.add(parameters, 'neptunePosion_z').min(-(30.18 * 150 * Math.pow(10, 9))).max(30.18 * 150 * Math.pow(10, 9)).step(1).onChange(() => { Neptune.position.set(parameters.neptunePosion_x, parameters.neptunePosion_y, parameters.neptunePosion_z) }, updateGravity)
NeptuneFolder.add(parameters, 'neptunevelocity_x').min(-47000).max(47000).step(10).onChange(() => { Neptune.velocity.set(parameters.neptunevelocity_x, parameters.neptunevelocity_y, parameters.neptunevelocity_z) ,Neptune.momentoum = Neptune.velocity.clone().multiply(Neptune.getMAss())}, updateGravity)
NeptuneFolder.add(parameters, 'neptunevelocity_y').min(-47000).max(47000).step(10).onChange(() => { Neptune.velocity.set(parameters.neptunevelocity_x, parameters.neptunevelocity_y, parameters.neptunevelocity_z) ,Neptune.momentoum = Neptune.velocity.clone().multiply(Neptune.getMAss())}, updateGravity)
NeptuneFolder.add(parameters, 'neptunevelocity_z').min(-47000).max(47000).step(10).onChange(() => { Neptune.velocity.set(parameters.neptunevelocity_x, parameters.neptunevelocity_y, parameters.neptunevelocity_z) ,Neptune.momentoum = Neptune.velocity.clone().multiply(Neptune.getMAss())}, updateGravity)
NeptuneFolder.add(parameters, 'neptuneMass').min(1).max(1.98 * Math.pow(10, 28)).step(500).onChange(() => { Neptune.mass = parameters.neptuneMass,Neptune.mass_vec.set(Neptune.mass,Neptune.mass,Neptune.mass) ,Neptune.momentoum = Neptune.velocity.clone().multiply(Neptune.getMAss())}, updateGravity)
NeptuneFolder.add(parameters, 'neptuneReduis').min(1).max(1.98 * Math.pow(10, 28)).step(500).onChange(() => { Neptune.raduis = parameters.neptuneReduis }, updateGravity)
//----------------------------------------------------

function updateGravity() {

  objects.forEach((planet) => {
    const force = new THREE.Vector3(0, 0, 0)
    objects.forEach((tempPlanet) => {
      if (tempPlanet != planet) {
        const forcetemp = planet.calc_Gravity(tempPlanet)
        force.add(forcetemp)
      }
    })

    planet.momentoum = planet.momentoum.add(force.multiply(planet.getTime(parameters.time_step)));
    const speed = planet.momentoum.clone().divide(planet.getMAss())
    planet.velocity = speed
    const planetPosition = planet.position.clone().add(speed.clone().multiply(planet.getTime(parameters.time_step)))
    planet.position = planetPosition
    planet.mesh.position.x = planet.position.x * sunSCALE
    planet.mesh.position.y = planet.position.y * sunSCALE
    planet.mesh.position.z = planet.position.z * sunSCALE
  }
  

  )
  // console.log(sunSCALE)
  //  console.log("earth", earth.mesh.position)

}


//satrs-----------------------------------------------
const starsGeometry = new THREE.BufferGeometry()
const count = 2000000
const positions = new Float32Array(count * 3)
for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10000
}
starsGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
)
const starsMaterial = new THREE.PointsMaterial()
starsMaterial.size = 5
starsMaterial.map = starTexture

const stars = new THREE.Points(starsGeometry, starsMaterial)
scene.add(stars)
//----------------------------------------------------

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
* Camera
*/
// Base camera
var fov = 25
const camera = new THREE.PerspectiveCamera(fov, sizes.width / sizes.height, 0.1, 2000)
// camera.position.z = 30
camera.position.y = 30
camera.up.set(0, 0, 1)
camera.lookAt(0, 0, 0)
scene.add(camera)
function updateCamera() {
  camera.updateProjectionMatrix()
}
const cameraGui = gui.addFolder('camera')
cameraGui.add(camera, 'fov', 1, 180).onChange(updateCamera)
cameraGui.add(camera, 'zoom').min(0.01).max(1).step(0.01).onChange(updateCamera)
cameraGui.add(camera.position, 'x', 1, 180).onChange(updateCamera)
cameraGui.add(camera.position, 'y', 1, 180).onChange(updateCamera)
cameraGui.add(camera.position, 'z', 1, 180).onChange(updateCamera)
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
* Renderer
*/
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
* Animate
*/
const clock = new THREE.Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // console.log("sun", sun.mesh.position)
  // console.log("earth", earth.mesh.position)
  // console.log("Earth radius: ",earth.mesh)
  // console.log("sun radius: ",sun.mesh)
  // console.log("MERCURY radius: ",MERCURY.mesh)
  // console.log("sun radius: ",sun.position)
  //  console.log("mercury: ",MERCURY.mesh.position)
  //  console.log("mars: ",Mars.mesh.position)
  //  console.log("esrth: ",earth.mesh.position)
  //  console.log("vinus: ",Vinus.mesh.position)
  //  console.log("jupiter: ",Jupiter.mesh.position)
  // console.log(objects[0])
  // console.log(moon)

  updateGravity()

  objects.forEach((planet) => {
    let po = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute([planet.mesh.position.x, planet.mesh.position.y, planet.mesh.position.z], 3)),
      //g.vertices.push(planet.mesh.position)
      new THREE.PointsMaterial({ size: 0.001, color: planet.mesh.material.color })
    )
    //console.log('p',po)
    scene.add(po)
    planet.mesh.rotation.y =  elapsedTime
  })


  // Update controls


  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
