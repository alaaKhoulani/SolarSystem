import * as THREE from "three";
import { Matrix3, Vector3 } from "three";

class Planet {
  constructor(
    position,
    velocity,
    raduis,
    mass,
    color,
  ) {
    const SCALE = 1 / 1495073333000
    this.position = position//.clone().multiplyScalar(Math.pow(10,-10))
    this.velocity = velocity
    this.raduis = raduis//Math.pow(10,6)
    this.mass = mass
    this.mass_vec = new THREE.Vector3(mass, mass, mass)
    this.momentoum = this.velocity.clone().multiplyScalar(this.mass)
    this.mesh = new THREE.Mesh(
      new THREE.SphereBufferGeometry(
        SCALE * this.raduis, 32, 32
      ),
      new THREE.MeshBasicMaterial({})

    )
    this.mesh.position.x = this.position.x * SCALE//Math.pow(10,9)
    this.mesh.position.y = this.position.y * SCALE///Math.pow(10,9)
    this.mesh.position.z = this.position.z * SCALE///  this.SCALE//Math.pow(10,9)


  }

  getMAss() {
    let one = new THREE.Vector3(1, 1, 1)
    let c = new THREE.Vector3(300000, 300000, 300000)
    c.multiply(c)

    let temp_speed = this.velocity
    temp_speed.multiply(temp_speed)

    temp_speed.divide(c) // v^2 / C^2
     
    one.sub(temp_speed) // 1 -  v^2 / C^2
    let newvec = new THREE.Vector3(
      Math.sqrt(one.x),
      Math.sqrt(one.y),
      Math.sqrt(one.z)
    ) // sqrt(  1 -  v^2 / C^2  )
   
    return this.mass_vec.clone().divide(newvec)
  }

 getTime(time) {
  let one = new THREE.Vector3(1, 1, 1)
  let c = new THREE.Vector3(300000, 300000, 300000)
  c.multiply(c)

  let temp_speed = this.velocity
  temp_speed.multiply(temp_speed)

  temp_speed.divide(c)
  
  one.sub(temp_speed)
  let newvec = new THREE.Vector3(
    Math.sqrt(one.x),
    Math.sqrt(one.y),
   Math.sqrt(one.z)
  )
  let time_vec = new THREE.Vector3(time, time, time)
  return time_vec.clone().divide(newvec)
}  


  calc_Gravity(planet) {
    let r = this.position.clone().sub(planet.position)
    const r_mag = r.length()
    const r_Hat = r.divideScalar(r_mag)
    let mass1 = this.getMAss()
    let mass2 = planet.getMAss()
    const force = r_Hat.multiply(mass1.multiply(mass2))
    force.multiplyScalar(-1 * 6.67 * Math.pow(10, -11) / (r_mag * r_mag))
    // const force = r_Hat.multiplyScalar(-1 * 6.67 * Math.pow(10, -11) * this.mass * planet.mass / (r_mag * r_mag))
    return force
  }
}
export default Planet;


