import './style.css'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { generateMap } from './envGen'
import { Group } from 'three'

//Function

function runCreationScript() {

    // Canvas

    const canvas = document.querySelector('canvas.webgl')

    // Sizes

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    
    // Renderer

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.shadowMap.enabled = true;


    // Scene & FOG
    const scene = new THREE.Scene()
    const fogColor = new THREE.Color(0xaaaaaa)

    scene.background = fogColor
    scene.fog = new THREE.Fog(fogColor, 0.000025, 20)
    // Lights

    const pointLight1 = new THREE.PointLight(0xffffff, 1, 0)
    scene.add(pointLight1)
    pointLight1.position.z = 3

    const pointLight2 = new THREE.PointLight(0xffffff, 0.6, 0)
    scene.add(pointLight2)
    pointLight2.position.z = 2
    pointLight2.position.y = -2

    const pointLight3 = new THREE.PointLight(0xff0000, 0.5, 0)
    scene.add(pointLight3)
    pointLight2.position.z = 200
    pointLight2.position.y = 200
        
    const light = new THREE.HemisphereLight( 0xffffff, 0x000000, 0.6 ); 
    scene.add( light );

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    // directionalLight.position.y = 2
    // scene.add(directionalLight)

    // Camera

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    camera.position.z = 3
    camera.position.y = 2
    // scene.add(camera)

    // Controls

    const controls = new OrbitControls( camera, renderer.domElement );

    // Scenery Objects

    const createStreet = (position) => {
        const geometry = new THREE.BoxGeometry( 1, 0.1, 1 );
        const material = new THREE.MeshLambertMaterial( { color: 0x666666 } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = position[0]
        mesh.position.y = position[1] - 0.95
        mesh.position.z = position[2]
        mesh.receiveShadow = true;
        scene.add( mesh );
    }

    const fbxLoader = new FBXLoader()
    const buildingGeometry = new THREE.BoxGeometry( 1, 1, 1 );

    const createBuilding1x1 = (position) => {
        fbxLoader.load(
            './objects/1x1.fbx',
            (object) => {
                object.scale.set(.01, .01, .01)
                object.position.x = position[0]
                object.position.z = position[2]
                object.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 4) * 90)
                object.children[0].material.color.r = (Math.random() * 0.3) + 0.3
                object.children[0].material.color.g = (Math.random() * 0.3) + 0.3
                object.children[0].material.color.b = (Math.random() * 0.3) + 0.2
                // object.castShadow = true;
                // object.receiveShadow = true;
                scene.add(object)
            },
            (xhr) => {
                // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
    }

    const createBuilding2x2 = (position) => {
        fbxLoader.load(
            './objects/2x2.fbx',
            (object) => {
                object.scale.set(.01, .01, .01)
                object.position.x = position[0] + 0.5
                object.position.z = position[2] + 0.5
                object.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 4) * 90)
                object.children[0].material.color.r = (Math.random() * 0.3) + 0.4
                object.children[0].material.color.g = (Math.random() * 0.3) + 0.4
                object.children[0].material.color.b = (Math.random() * 0.3) + 0.3
                // object.castShadow = true;
                // object.receiveShadow = true;
                scene.add(object)
            },
            (xhr) => {
                // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
    }

    const playerPositionStart = [0, 0]

    const createMap = (sideElements) => {
        const array = generateMap(sideElements);
        array.forEach(element => {
            if (element.terrainType === 'street') {
                createStreet([element.positionX,1,element.positionZ])
                playerPositionStart[0] = element.positionX,
                playerPositionStart[1] = element.positionZ
            }
            if (element.terrainType === 'building' && !element.used) {
                if (array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ) &&
                    array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1) &&
                    array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1)) {
                        if (array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ).terrainType === 'building' &&
                            array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1).terrainType === 'building' &&
                            array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1).terrainType === 'building'
                        ) {
                            createBuilding2x2([element.positionX,1,element.positionZ])
                            array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ).used = true
                            array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ).used = true
                            array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1).used = true 
                            array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1).used = true
                        } 
                } 
            }
            if (element.terrainType === 'building' && !element.used) {
                createBuilding1x1([element.positionX,1,element.positionZ])
            }
        })
        // controls.target.set(sideElements / 2, 0, sideElements / 2)
        // camera.position.set(sideElements / 2, sideElements * 1.5, -3)
    }

    createMap(50);

    // Keyboard Controls 

    class InputHandler {
        constructor(){
            this.keys = []
            window.addEventListener('keydown', (e) => {
                if ((e.key === "a" || 
                     e.key === "s" ||
                     e.key === "d" ||
                     e.key === "w" ||
                     e.key === "k" ||
                     e.key === "l") && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key)
                }
            })
            window.addEventListener('keyup', (e) => {
                if (e.key === "a" || 
                    e.key === "s" ||
                    e.key === "d" ||
                    e.key === "w" ||
                    e.key === "k" ||
                    e.key === "l") {
                    this.keys.splice(this.keys.indexOf(e.key), 1)
                    }
            })
        }
    }

    const input = new InputHandler();

    // Player

    const playerGeometry = new THREE.SphereBufferGeometry(0.16, 10, 10)
    const playerMaterial = new THREE.MeshLambertMaterial({color: 'red'})
    const player = new THREE.Mesh(playerGeometry, playerMaterial)
    player.position.y = 0.25
    // scene.add(player)
    // console.log(Object.keys(scene.children))
    // console.log(scene.children[4])

    // Camera Player Group

    const thirdPersonCamera = new Group()
    thirdPersonCamera.add(player)
    thirdPersonCamera.add(camera)
    camera.position.set(player.position.x, 0.8, player.position.z + 1)
    thirdPersonCamera.position.x = playerPositionStart[0]
    thirdPersonCamera.position.z = playerPositionStart[1]
    scene.add(thirdPersonCamera)

    // Speed

    let currentSpeed = 0

    // Animations

    function animate() {
        

        requestAnimationFrame( animate );
        // player movement
        if (input.keys.includes("a")) thirdPersonCamera.rotation.y += 0.04
        if (input.keys.includes("d")) thirdPersonCamera.rotation.y -= 0.04

        if (input.keys.includes("w")) {
            if (currentSpeed < 100) currentSpeed += 1
            console.log(currentSpeed)
            thirdPersonCamera.position.x -= (0.06 * currentSpeed/100) * Math.sin(thirdPersonCamera.rotation.y)
            thirdPersonCamera.position.z -= (0.06 * currentSpeed/100) * Math.cos(thirdPersonCamera.rotation.y)
        } else {
            if (currentSpeed > 0) {
                currentSpeed -= 1
                thirdPersonCamera.position.x -= (0.06 * currentSpeed/100) * Math.sin(thirdPersonCamera.rotation.y)
                thirdPersonCamera.position.z -= (0.06 * currentSpeed/100) * Math.cos(thirdPersonCamera.rotation.y)
            }
        }
        if (input.keys.includes("s")) {
            thirdPersonCamera.position.x += 0.06 * Math.sin(thirdPersonCamera.rotation.y)
            thirdPersonCamera.position.z += 0.06 * Math.cos(thirdPersonCamera.rotation.y)
        }

        controls.target.set(thirdPersonCamera.position.x, thirdPersonCamera.position.y + 0.6, thirdPersonCamera.position.z)
        // camera.position.set(player.position.x, 1, player.position.z + 1)

        // controls.target.set(player.position.x, player.position.y, player.position.z)
        // camera.position.set(player.position.x, 3, player.position.z + 2)
        
        // required if controls.enableDamping or controls.autoRotate are set to true
        
        controls.update();

        renderer.render( scene, camera );

    }
    renderer.clear()
    animate()

}

runCreationScript();

