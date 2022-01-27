import './style.css'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { generateMap } from './envGen'
import { Group } from 'three'
import CANNON from 'cannon'

//Function

function runCreationScript(objects) {

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

    const axesHelper = new THREE.AxesHelper(1)

    scene.add(axesHelper)

    // Lights

    const pointLight1 = new THREE.PointLight(0xffaa55, 1, 0)
    scene.add(pointLight1)
    pointLight1.position.y = 10
    pointLight1.position.z = 50
    pointLight1.position.x = 50

    // const pointLight2 = new THREE.PointLight(0xffffff, 0.6, 0)
    // scene.add(pointLight2)
    // pointLight2.position.z = 2
    // pointLight2.position.y = -2
    // pointLight2.position.z = 200
    // pointLight2.position.y = 200

    const pointLight3 = new THREE.PointLight(0xff3333, 0.7, 0)
    pointLight3.position.y = 10
    scene.add(pointLight3)

        
    const light = new THREE.HemisphereLight( 0xffffff, 0x000000, 0.1 ); 
    scene.add( light );

    // Camera

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    camera.position.z = 3
    camera.position.y = 2
    scene.add(camera)

    // Controls

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.enableZoom = false;

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

    const createBuilding1x1A = (position) => {
        // const geometry = new THREE.BoxGeometry( 1, 0.1, 1 );
        // const material = new THREE.MeshLambertMaterial( { color: 0xDDDD00 } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building1x1A_obj.clone();
        mesh.scale.set(.01, .01, .01)
        mesh.position.x = position[0]
        mesh.position.z = position[2]
        mesh.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 4) * 90)
        scene.add( mesh );
    }

    const createBuilding1x1B = (position) => {
        // const geometry = new THREE.BoxGeometry( 1, 0.1, 1 );
        // const material = new THREE.MeshLambertMaterial( { color: 0xDDDD00 } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building1x1B_obj.clone();
        mesh.scale.set(.01, .01, .01)
        mesh.position.x = position[0]
        mesh.position.z = position[2]
        mesh.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 4) * 90)
        scene.add( mesh );
    }

    const createBuilding1x1C = (position) => {
        // const geometry = new THREE.BoxGeometry( 1, 0.1, 1 );
        // const material = new THREE.MeshLambertMaterial( { color: 0xDDDD00 } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building1x1C_obj.clone();
        mesh.scale.set(.01, .01, .01)
        mesh.position.x = position[0]
        mesh.position.z = position[2]
        mesh.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 4) * 90)
        scene.add( mesh );
    }

    const createBuilding2x1 = (position) => {
        // const geometry = new THREE.BoxGeometry( 2, 0.1, 1 );
        // const material = new THREE.MeshLambertMaterial( { color: 0xDD0000 } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building2x1A_obj.clone();
        mesh.scale.set(.01, .01, .01)
        mesh.position.x = position[0] + 0.5
        mesh.position.z = position[2] 
        mesh.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 2) * 180)
        scene.add( mesh );
    }

    const createBuilding2x2 = (position) => {
        // const geometry = new THREE.BoxGeometry( 2, 0.1, 2 );
        // const material = new THREE.MeshLambertMaterial( { color: 0xDD00DD } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building2x2A_obj.clone();
        mesh.scale.set(.01, .01, .01)
        mesh.position.x = position[0] + 0.5
        mesh.position.z = position[2] + 0.5
        mesh.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 4) * 90)
        scene.add( mesh );
    }

    const createBuilding3x2 = (position) => {
        // const geometry = new THREE.BoxGeometry( 3, 0.1, 2 );
        // const material = new THREE.MeshLambertMaterial( { color: 0xAA0000 } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building3x2A_obj.clone();
        mesh.scale.set(.01, .01, .01)
        mesh.position.x = position[0] + 1
        mesh.position.z = position[2] + 0.5
        mesh.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 2) * 180)
        scene.add( mesh );
    }

    const createBuilding2x3 = (position) => {
        // const geometry = new THREE.BoxGeometry( 2, 0.1, 3 );
        // const material = new THREE.MeshLambertMaterial( { color: 0xAA88DD } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building3x2A_obj.clone();
        mesh.scale.set(.01, .01, .01)
        mesh.position.x = position[0] + 0.5
        mesh.position.z = position[2] + 1
        mesh.rotation.y = Math.PI/180 * ((Math.floor(Math.random() * 2) * 180) + 90)
        scene.add( mesh );
    }

    const createBuilding4x4 = (position) => {
        // const geometry = new THREE.BoxGeometry( 4, 0.1, 4 );
        // const material = new THREE.MeshLambertMaterial( { color: 0x0000FF } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building4x4A_obj.clone();
        mesh.scale.set(.01, .01, .01)
        mesh.position.x = position[0] + 1.5
        mesh.position.z = position[2] + 1.5
        scene.add( mesh );
    }

    const createBuilding5x3 = (position) => {
        // const geometry = new THREE.BoxGeometry( 5, 0.1, 3 );
        // const material = new THREE.MeshLambertMaterial( { color: 0x88FF88 } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building5x3A_obj.clone();
        mesh.scale.set(.01, .01, .01)
        mesh.position.x = position[0] + 2
        mesh.position.z = position[2] + 1
        mesh.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 2) * 180)
        scene.add( mesh );
    }

    const createBuilding3x5 = (position) => {
        // const geometry = new THREE.BoxGeometry( 3, 0.1, 5 );
        // const material = new THREE.MeshLambertMaterial( { color: 0x55BB55 } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building5x3A_obj.clone();
        mesh.scale.set(.01, .01, .01)
        mesh.position.x = position[0] + 1
        mesh.position.z = position[2] + 2
        mesh.rotation.y = Math.PI/180 * ((Math.floor(Math.random() * 2) * 180) + 90)
        scene.add( mesh );
    }

    const createBuilding6x2 = (position) => {
        // const geometry = new THREE.BoxGeometry( 6, 0.1, 2 );
        // const material = new THREE.MeshLambertMaterial( { color: 0xFFFFFF } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building6x2A_obj.clone();
        mesh.scale.set(.01, .01, .01)
        mesh.position.x = position[0] + 2.5
        mesh.position.z = position[2] + 0.5
        mesh.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 2) * 180)
        scene.add( mesh );
    }

    const createBuilding2x6 = (position) => {
        // const geometry = new THREE.BoxGeometry( 2, 0.1, 6 );
        // const material = new THREE.MeshLambertMaterial( { color: 0x999999 } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building6x2A_obj.clone();
        mesh.scale.set(.01, .01, .01)
        mesh.position.x = position[0] + 0.5
        mesh.position.z = position[2] + 2.5
        mesh.rotation.y = Math.PI/180 * ((Math.floor(Math.random() * 2) * 180) + 90)
        scene.add( mesh );
    }

    

    const playerPositionStart = [0, 0]
    const movementConstraintsArray = []

    const createMap = (sideElements) => {
        const array = generateMap(sideElements);
        array.forEach(element => {
            if (element.terrainType === 'street') {
                createStreet([element.positionX,1,element.positionZ])
                movementConstraintsArray.push([element.positionX, element.positionZ])
                playerPositionStart[0] = element.positionX,
                playerPositionStart[1] = element.positionZ
            }

            // 6x2

            if (element.terrainType === 'building' && !element.used) {
                const probability = Math.random()
                    if (
                        array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1) &&
                        array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ ) &&
                        array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1) &&
                        array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ) &&
                        array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 1) &&
                        array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ) &&
                        array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 1) &&
                        array.find(square => square.positionX === element.positionX + 4 && square.positionZ === element.positionZ) &&
                        array.find(square => square.positionX === element.positionX + 4 && square.positionZ === element.positionZ + 1) &&
                        array.find(square => square.positionX === element.positionX + 5 && square.positionZ === element.positionZ) &&
                        array.find(square => square.positionX === element.positionX + 5 && square.positionZ === element.positionZ + 1)
                        ) 
                    {
                            if (
                                array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1).used &&
                                array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ ).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ ).used &&
                                array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1).used &&
                                array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ).used &&
                                array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 1).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 1).used &&
                                array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ).used &&
                                array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 1).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 1).used &&
                                array.find(square => square.positionX === element.positionX + 4 && square.positionZ === element.positionZ).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 4 && square.positionZ === element.positionZ).used &&
                                array.find(square => square.positionX === element.positionX + 4 && square.positionZ === element.positionZ + 1).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 4 && square.positionZ === element.positionZ + 1).used &&
                                array.find(square => square.positionX === element.positionX + 5 && square.positionZ === element.positionZ).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 5 && square.positionZ === element.positionZ).used &&
                                array.find(square => square.positionX === element.positionX + 5 && square.positionZ === element.positionZ + 1).terrainType === 'building' && 
                               !array.find(square => square.positionX === element.positionX + 5 && square.positionZ === element.positionZ + 1).used
                                ) 
                            {
                                if (probability > 0.7) {
                                    createBuilding6x2([element.positionX,1,element.positionZ])
                                    array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ).used = true
                                    array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1).used = true
                                    array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ ).used = true
                                    array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1).used = true 
                                    array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ).used = true 
                                    array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 1).used = true 
                                    array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ).used = true 
                                    array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 1).used = true 
                                    array.find(square => square.positionX === element.positionX + 4 && square.positionZ === element.positionZ).used = true 
                                    array.find(square => square.positionX === element.positionX + 4 && square.positionZ === element.positionZ + 1).used = true 
                                    array.find(square => square.positionX === element.positionX + 5 && square.positionZ === element.positionZ).used = true
                                    array.find(square => square.positionX === element.positionX + 5 && square.positionZ === element.positionZ + 1).used = true
                                } 
                            }
                    } 
            }

            // 2x6

            if (element.terrainType === 'building' && !element.used) {
                const probability = Math.random()
                    if (
                        array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX + 1) &&
                        array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX ) &&
                        array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX + 1) &&
                        array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX) &&
                        array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX + 1) &&
                        array.find(square => square.positionZ === element.positionZ + 3 && square.positionX === element.positionX) &&
                        array.find(square => square.positionZ === element.positionZ + 3 && square.positionX === element.positionX + 1) &&
                        array.find(square => square.positionZ === element.positionZ + 4 && square.positionX === element.positionX) &&
                        array.find(square => square.positionZ === element.positionZ + 4 && square.positionX === element.positionX + 1) &&
                        array.find(square => square.positionZ === element.positionZ + 5 && square.positionX === element.positionX) &&
                        array.find(square => square.positionZ === element.positionZ + 5 && square.positionX === element.positionX + 1)
                        ) 
                    {
                            if (
                                array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX + 1).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX + 1).used &&
                                array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX ).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX ).used &&
                                array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX + 1).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX + 1).used &&
                                array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX).used &&
                                array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX + 1).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX + 1).used &&
                                array.find(square => square.positionZ === element.positionZ + 3 && square.positionX === element.positionX).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 3 && square.positionX === element.positionX).used &&
                                array.find(square => square.positionZ === element.positionZ + 3 && square.positionX === element.positionX + 1).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 3 && square.positionX === element.positionX + 1).used &&
                                array.find(square => square.positionZ === element.positionZ + 4 && square.positionX === element.positionX).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 4 && square.positionX === element.positionX).used &&
                                array.find(square => square.positionZ === element.positionZ + 4 && square.positionX === element.positionX + 1).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 4 && square.positionX === element.positionX + 1).used &&
                                array.find(square => square.positionZ === element.positionZ + 5 && square.positionX === element.positionX).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 5 && square.positionX === element.positionX).used &&
                                array.find(square => square.positionZ === element.positionZ + 5 && square.positionX === element.positionX + 1).terrainType === 'building' && 
                               !array.find(square => square.positionZ === element.positionZ + 5 && square.positionX === element.positionX + 1).used
                                ) 
                            {
                                if (probability > 0.7) {
                                    createBuilding2x6([element.positionX,1,element.positionZ])
                                    array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX).used = true
                                    array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX + 1).used = true
                                    array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX ).used = true
                                    array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX + 1).used = true 
                                    array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX).used = true 
                                    array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX + 1).used = true 
                                    array.find(square => square.positionZ === element.positionZ + 3 && square.positionX === element.positionX).used = true 
                                    array.find(square => square.positionZ === element.positionZ + 3 && square.positionX === element.positionX + 1).used = true 
                                    array.find(square => square.positionZ === element.positionZ + 4 && square.positionX === element.positionX).used = true 
                                    array.find(square => square.positionZ === element.positionZ + 4 && square.positionX === element.positionX + 1).used = true 
                                    array.find(square => square.positionZ === element.positionZ + 5 && square.positionX === element.positionX).used = true
                                    array.find(square => square.positionZ === element.positionZ + 5 && square.positionX === element.positionX + 1).used = true
                                } 
                            }
                    } 
            }

            // 5x3

            if (element.terrainType === 'building' && !element.used) {
                const probability = Math.random()
                    if (
                        array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1) &&
                        array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 2) &&
                        array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ) &&
                        array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1) &&
                        array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 2) &&
                        array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ) &&
                        array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 1) &&
                        array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 2) &&
                        array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ) &&
                        array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 1) &&
                        array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 2) &&
                        array.find(square => square.positionX === element.positionX + 4 && square.positionZ === element.positionZ) &&
                        array.find(square => square.positionX === element.positionX + 4 && square.positionZ === element.positionZ + 1) &&
                        array.find(square => square.positionX === element.positionX + 4 && square.positionZ === element.positionZ + 2)
                        ) 
                    {
                            if (
                                array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1).used &&
                                array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 2).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 2).used &&
                                array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ).used &&
                                array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1).used &&
                                array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 2).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 2).used &&
                                array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ).used &&
                                array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 1).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 1).used &&
                                array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 2).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 2).used &&
                                array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ).used &&
                                array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 1).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 1).used &&
                                array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 2).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 2).used &&
                                array.find(square => square.positionX === element.positionX + 4 && square.positionZ === element.positionZ).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 4 && square.positionZ === element.positionZ).used &&
                                array.find(square => square.positionX === element.positionX + 4 && square.positionZ === element.positionZ + 1).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 4 && square.positionZ === element.positionZ + 1).used &&
                                array.find(square => square.positionX === element.positionX + 4 && square.positionZ === element.positionZ + 2).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 4 && square.positionZ === element.positionZ + 2).used 
                                ) 
                            {
                                if (probability > 0.7) {
                                    createBuilding5x3([element.positionX,1,element.positionZ])
                                    array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ).used = true
                                    array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1).used = true
                                    array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 2).used = true
                                    array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ).used = true
                                    array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1).used = true
                                    array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 2).used = true
                                    array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ).used = true
                                    array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 1).used = true
                                    array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 2).used = true
                                    array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ).used = true
                                    array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 1).used = true
                                    array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 2).used = true
                                    array.find(square => square.positionX === element.positionX + 4 && square.positionZ === element.positionZ).used = true
                                    array.find(square => square.positionX === element.positionX + 4 && square.positionZ === element.positionZ + 1).used = true
                                    array.find(square => square.positionX === element.positionX + 4 && square.positionZ === element.positionZ + 2).used = true
                                } 
                            }
                    } 
            }

            // 3x5

            if (element.terrainType === 'building' && !element.used) {
                const probability = Math.random()
                    if (
                        array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX + 1) &&
                        array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX + 2) &&
                        array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX) &&
                        array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX + 1) &&
                        array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX + 2) &&
                        array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX) &&
                        array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX + 1) &&
                        array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX + 2) &&
                        array.find(square => square.positionZ === element.positionZ + 3 && square.positionX === element.positionX) &&
                        array.find(square => square.positionZ === element.positionZ + 3 && square.positionX === element.positionX + 1) &&
                        array.find(square => square.positionZ === element.positionZ + 3 && square.positionX === element.positionX + 2) &&
                        array.find(square => square.positionZ === element.positionZ + 4 && square.positionX === element.positionX) &&
                        array.find(square => square.positionZ === element.positionZ + 4 && square.positionX === element.positionX + 1) &&
                        array.find(square => square.positionZ === element.positionZ + 4 && square.positionX === element.positionX + 2)
                        ) 
                    {
                            if (
                                array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX + 1).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX + 1).used &&
                                array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX + 2).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX + 2).used &&
                                array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX).used &&
                                array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX + 1).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX + 1).used &&
                                array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX + 2).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX + 2).used &&
                                array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX).used &&
                                array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX + 1).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX + 1).used &&
                                array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX + 2).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX + 2).used &&
                                array.find(square => square.positionZ === element.positionZ + 3 && square.positionX === element.positionX).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 3 && square.positionX === element.positionX).used &&
                                array.find(square => square.positionZ === element.positionZ + 3 && square.positionX === element.positionX + 1).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 3 && square.positionX === element.positionX + 1).used &&
                                array.find(square => square.positionZ === element.positionZ + 3 && square.positionX === element.positionX + 2).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 3 && square.positionX === element.positionX + 2).used &&
                                array.find(square => square.positionZ === element.positionZ + 4 && square.positionX === element.positionX).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 4 && square.positionX === element.positionX).used &&
                                array.find(square => square.positionZ === element.positionZ + 4 && square.positionX === element.positionX + 1).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 4 && square.positionX === element.positionX + 1).used &&
                                array.find(square => square.positionZ === element.positionZ + 4 && square.positionX === element.positionX + 2).terrainType === 'building' &&
                               !array.find(square => square.positionZ === element.positionZ + 4 && square.positionX === element.positionX + 2).used 
                                ) 
                            {
                                if (probability > 0.5) {
                                    createBuilding3x5([element.positionX,1,element.positionZ])
                                    array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX).used = true
                                    array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX + 1).used = true
                                    array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX + 2).used = true
                                    array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX).used = true
                                    array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX + 1).used = true
                                    array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX + 2).used = true
                                    array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX).used = true
                                    array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX + 1).used = true
                                    array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX + 2).used = true
                                    array.find(square => square.positionZ === element.positionZ + 3 && square.positionX === element.positionX).used = true
                                    array.find(square => square.positionZ === element.positionZ + 3 && square.positionX === element.positionX + 1).used = true
                                    array.find(square => square.positionZ === element.positionZ + 3 && square.positionX === element.positionX + 2).used = true
                                    array.find(square => square.positionZ === element.positionZ + 4 && square.positionX === element.positionX).used = true
                                    array.find(square => square.positionZ === element.positionZ + 4 && square.positionX === element.positionX + 1).used = true
                                    array.find(square => square.positionZ === element.positionZ + 4 && square.positionX === element.positionX + 2).used = true
                                } 
                            }
                    } 
            }

            // 4x4

            if (element.terrainType === 'building' && !element.used) {
                const probability = Math.random()
                    if (
                        array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1) &&
                        array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 2) &&
                        array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 3) &&
                        array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ) &&
                        array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1) &&
                        array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 2) &&
                        array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 3) &&
                        array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ) &&
                        array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 1) &&
                        array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 2) &&
                        array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 3) &&
                        array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ) &&
                        array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 1) &&
                        array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 2) &&
                        array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 3)
                        ) 
                    {
                            if (
                                array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1).used &&
                                array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 2).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 2).used &&
                                array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 3).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 3).used &&
                                array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ).used &&
                                array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1).used &&
                                array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 2).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 2).used &&
                                array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 3).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 3).used &&
                                array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ).used &&
                                array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 1).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 1).used &&
                                array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 2).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 2).used &&
                                array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 3).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 3).used &&
                                array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ).used &&
                                array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 1).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 1).used &&
                                array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 2).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 2).used &&
                                array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 3).terrainType === 'building' &&
                               !array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 3).used
                                ) 
                            {
                                if (probability > 0.6) {
                                    createBuilding4x4([element.positionX,1,element.positionZ])
                                    array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ).used = true
                                    array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1).used = true
                                    array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 2).used = true
                                    array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 3).used = true
                                    array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ).used = true
                                    array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1).used = true
                                    array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 2).used = true
                                    array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 3).used = true
                                    array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ).used = true
                                    array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 1).used = true
                                    array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 2).used = true
                                    array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 3).used = true
                                    array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ).used = true
                                    array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 1).used = true
                                    array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 2).used = true
                                    array.find(square => square.positionX === element.positionX + 3 && square.positionZ === element.positionZ + 3).used = true
                                } 
                            }
                    } 
            }

            // 2x3

            if (element.terrainType === 'building' && !element.used) {
                const probability = Math.random()
                if (
                    array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX + 1) &&
                    array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX) &&
                    array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX + 1) &&
                    array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX) &&
                    array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX + 1)
                    ) 
                {
                        if (
                            array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX + 1).terrainType === 'building' &&
                           !array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX + 1).used &&
                            array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX).terrainType === 'building' &&
                           !array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX).used &&
                            array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX + 1).terrainType === 'building' &&
                           !array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX + 1).used &&
                            array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX).terrainType === 'building' &&
                           !array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX).used &&
                            array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX + 1).terrainType === 'building' &&
                           !array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX + 1).used
                            ) 
                        {
                            if (probability > 0.5) {
                                createBuilding2x3([element.positionX,1,element.positionZ])
                                array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX).used = true
                                array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX + 1).used = true 
                                array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX).used = true
                                array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX + 1).used = true
                                array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX).used = true
                                array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX + 1).used = true
                            }
                        } 
                }  
            }

            // 3x2

            if (element.terrainType === 'building' && !element.used) {
                const probability = Math.random()
                if (
                    array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1) &&
                    array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ) &&
                    array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1) &&
                    array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ) &&
                    array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 1)
                    ) 
                {
                        if (
                            array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1).terrainType === 'building' &&
                           !array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1).used &&
                            array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ).terrainType === 'building' &&
                           !array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ).used &&
                            array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1).terrainType === 'building' &&
                           !array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1).used &&
                            array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ).terrainType === 'building' &&
                           !array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ).used &&
                            array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 1).terrainType === 'building' &&
                           !array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 1).used
                            ) 
                        {
                            if (probability > 0.5) {
                                createBuilding3x2([element.positionX,1,element.positionZ])
                                array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ).used = true
                                array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1).used = true 
                                array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ).used = true
                                array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1).used = true
                                array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ).used = true
                                array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 1).used = true
                            }
                        } 
                }  
            }

            // 2x2

            if (element.terrainType === 'building' && !element.used) {
                const probability = Math.random()
                if (array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ) &&
                    array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1) &&
                    array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1)
                    ) 
                {
                        if (
                            array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ).terrainType === 'building' &&
                            !array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ).used &&
                            array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1).terrainType === 'building' &&
                            !array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1).used &&
                            array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1).terrainType === 'building' &&
                            !array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1).used
                            ) 
                        {
                            if (probability > 0.5) {
                                createBuilding2x2([element.positionX,1,element.positionZ])
                                array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ).used = true
                                array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ).used = true
                                array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1).used = true 
                                array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1).used = true
                            }
                        } 
                }  
            }

            // 2x1

            if (element.terrainType === 'building' && !element.used) {
                const probability = Math.random()
                if (
                    array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ )
                    ) 
                {
                    if (
                        array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ).terrainType === 'building' &&
                        !array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ).used
                        ) 
                    {
                        if (probability > 0.8) {
                            createBuilding2x1([element.positionX,1,element.positionZ])
                            array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ).used = true
                            array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ).used = true
                        }
                    } 
                }  
            }

            // 1x1

            if (element.terrainType === 'building' && !element.used) 
            {
                const variant = Math.floor(Math.random() * 29.9)
                if (variant < 15) createBuilding1x1A([element.positionX,1,element.positionZ])
                if (variant === 15) createBuilding1x1B([element.positionX,1,element.positionZ])
                if (variant > 15) createBuilding1x1C([element.positionX,1,element.positionZ])
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
                if ((e.key === "a" || e.key === "d") && this.keys.indexOf(e.key) === -1) 
                {
                    this.keys.push(e.key)
                }

                if (e.key === "w" && this.keys.indexOf(e.key) === -1) 
                {
                this.keys.push(e.key)
                if (this.keys.indexOf("s") !== -1) this.keys.splice(this.keys.indexOf("s"), 1)
                }

                if (e.key === "s" && this.keys.indexOf(e.key) === -1) 
                {
                this.keys.push(e.key)
                if (this.keys.indexOf("w") !== -1) this.keys.splice(this.keys.indexOf("w"), 1)
                }
            })
            window.addEventListener('keyup', (e) => {
                if (e.key === "a" || 
                    e.key === "s" ||
                    e.key === "d" ||
                    e.key === "w" ) {
                    this.keys.splice(this.keys.indexOf(e.key), 1)
                    }
            })
        }
    }

    const input = new InputHandler();

    // Player

    const player = car.clone()
    player.scale.set(.0025,.0025,.0025)
    player.position.y = 0.1
    scene.add(player)

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

    // Camera movement smoothe

    let cameraSmooth = 1

    // Speed

    let currentSpeed = 0
    let wheelRotationRatio = 0
    let cameraOffAxisRatio = 0

    // Animations

    function animate() {

        requestAnimationFrame( animate );
        // console.log([thirdPersonCamera.position.x.toFixed(1), thirdPersonCamera.position.z.toFixed(1), currentSpeed])
        console.log(Math.floor(thirdPersonCamera.position.x + 0.5), thirdPersonCamera.position.x.toFixed(2))
        console.log(Math.floor(thirdPersonCamera.position.z + 0.5), thirdPersonCamera.position.z.toFixed(2))
        console.log(movementConstraintsArray.find(streetElement => streetElement[0] === Math.floor(thirdPersonCamera.position.x + 0.5) && streetElement[1] === Math.floor(thirdPersonCamera.position.z + 0.5)))

        // player movement

        if (wheelRotationRatio > 0) wheelRotationRatio -= 1
        if (wheelRotationRatio < 0) wheelRotationRatio += 1
        if (cameraOffAxisRatio > 0) cameraOffAxisRatio -= 1
        if (cameraOffAxisRatio < 0) cameraOffAxisRatio += 1

        camera.position.x = player.position.x + (-0.3 * (cameraOffAxisRatio / 50))

        if (currentSpeed > 0) currentSpeed -= 1
        if (currentSpeed < 0) currentSpeed += 1


        if (input.keys.includes("a")) 
        {
            if (wheelRotationRatio > -10) wheelRotationRatio -= 2
            if (currentSpeed > 0) {
                if (cameraOffAxisRatio < 50) cameraOffAxisRatio += 2
                thirdPersonCamera.rotation.y += 0.04
            } 
            if (currentSpeed < 0) {
                thirdPersonCamera.rotation.y -= 0.04
            } 
            player.children[0].rotation.z = Math.PI / 180 * (30 * wheelRotationRatio/10) 
            player.children[1].rotation.z = -Math.PI / 180 * (30 * wheelRotationRatio/10) 
            player.children[2].rotation.z = Math.PI / 180 * (30 * wheelRotationRatio/10) 
            player.children[4].rotation.z = -Math.PI / 180 * (30 * wheelRotationRatio/10) 

        } else {
            if (wheelRotationRatio < 0 && wheelRotationRatio > -10) {
                player.children[0].rotation.z = Math.PI / 180 * (30 * wheelRotationRatio/10) 
                player.children[1].rotation.z = -Math.PI / 180 * (30 * wheelRotationRatio/10) 
                player.children[2].rotation.z = Math.PI / 180 * (30 * wheelRotationRatio/10) 
                player.children[4].rotation.z = -Math.PI / 180 * (30 * wheelRotationRatio/10) 
            }
        }

        if (input.keys.includes("d")) 
        { 
            if (wheelRotationRatio < 10) wheelRotationRatio += 2
            if (currentSpeed > 0) {
                if (cameraOffAxisRatio > -50) cameraOffAxisRatio -= 2
                thirdPersonCamera.rotation.y -= 0.04
            }
            if (currentSpeed < 0) {
                thirdPersonCamera.rotation.y += 0.04
            }
            player.children[0].rotation.z = Math.PI / 180 * (30 * (wheelRotationRatio/10)) 
            player.children[1].rotation.z = -Math.PI / 180 * (30 * (wheelRotationRatio/10)) 
            player.children[2].rotation.z = Math.PI / 180 * (30 * (wheelRotationRatio/10)) 
            player.children[4].rotation.z = -Math.PI / 180 * (30 * (wheelRotationRatio/10)) 
        } else {
            if (wheelRotationRatio > 0 && wheelRotationRatio < 10) {

                player.children[0].rotation.z = Math.PI / 180 * (30 * (wheelRotationRatio/10)) 
                player.children[1].rotation.z = -Math.PI / 180 * (30 * (wheelRotationRatio/10)) 
                player.children[2].rotation.z = Math.PI / 180 * (30 * (wheelRotationRatio/10)) 
                player.children[4].rotation.z = -Math.PI / 180 * (30 * (wheelRotationRatio/10)) 
            }
        }

        // console.log(Math.floor((thirdPersonCamera.rotation.y / Math.PI) * 4) * Math.PI)

        if (input.keys.includes("w")) {
            
            if (
                movementConstraintsArray.some(streetElement => 
                    (
                        (streetElement[0] === Math.floor(thirdPersonCamera.position.x + 0.5) || streetElement[0] === (thirdPersonCamera.position.x + 0.5) - 1) && 
                        (streetElement[1] === Math.floor(thirdPersonCamera.position.z + 0.5) || streetElement[1] === (thirdPersonCamera.position.x + 0.5) - 1)
                    ))
                )
            {
                thirdPersonCamera.position.x -= (0.05 * currentSpeed/100) * Math.sin(thirdPersonCamera.rotation.y)
                thirdPersonCamera.position.z -= (0.05 * currentSpeed/100) * Math.cos(thirdPersonCamera.rotation.y)
            } 
            else 
            {    
                thirdPersonCamera.position.x += (0.01 * currentSpeed/10) * Math.sin(thirdPersonCamera.rotation.y)
                thirdPersonCamera.position.z += (0.01 * currentSpeed/10) * Math.cos(thirdPersonCamera.rotation.y)
                currentSpeed = 0
            }
            if (currentSpeed < 100) currentSpeed += 2
        } 
        
        if (input.keys.includes("s")) {
            
            if (
                movementConstraintsArray.some(streetElement => 
                    (
                        (streetElement[0] === Math.floor(thirdPersonCamera.position.x + 0.5) || streetElement[0] === (thirdPersonCamera.position.x + 0.5) - 1) && 
                        (streetElement[1] === Math.floor(thirdPersonCamera.position.z + 0.5) || streetElement[1] === (thirdPersonCamera.position.z + 0.5) - 1)
                    ))
                )
            {
                thirdPersonCamera.position.x += (0.025 * Math.abs(currentSpeed)/100) * Math.sin(thirdPersonCamera.rotation.y)
                thirdPersonCamera.position.z += (0.025 * Math.abs(currentSpeed)/100) * Math.cos(thirdPersonCamera.rotation.y)
            } 
            if (movementConstraintsArray.some(streetElement => streetElement[0] === Math.floor(thirdPersonCamera.position.x + 0.5) && streetElement[1] === Math.floor(thirdPersonCamera.position.z + 0.5))) 
            // else
            // { 
            //         thirdPersonCamera.position.x -= (0.01 * Math.abs(currentSpeed)/100) * Math.sin(thirdPersonCamera.rotation.y)
            //         thirdPersonCamera.position.z -= (0.01 * Math.abs(currentSpeed)/100) * Math.cos(thirdPersonCamera.rotation.y)
            //         currentSpeed = 0
            //     }
            if (currentSpeed > -100) currentSpeed -= 2
        } 

        // if (
        //     !movementConstraintsArray.some(streetElement => 
        //         (
        //             (streetElement[0] === Math.floor(thirdPersonCamera.position.x + 0.5) || streetElement[0] === (thirdPersonCamera.position.x + 0.5) - 1) && 
        //             (streetElement[1] === Math.floor(thirdPersonCamera.position.z + 0.5) || streetElement[1] === (thirdPersonCamera.position.z + 0.5) - 1)
        //         ))
        //     )
        // {
        //     thirdPersonCamera.position.x = (0.025 * Math.abs(currentSpeed)/100) * Math.sin(thirdPersonCamera.rotation.y)
        //     thirdPersonCamera.position.z = (0.025 * Math.abs(currentSpeed)/100) * Math.cos(thirdPersonCamera.rotation.y)
        // }

        if (!input.keys.includes("w") && !input.keys.includes("s")) {
            if (currentSpeed > 0) {
                if (movementConstraintsArray.some(streetElement => streetElement[0] === Math.floor(thirdPersonCamera.position.x + 0.5) && streetElement[1] === Math.floor(thirdPersonCamera.position.z + 0.5))) {
                    thirdPersonCamera.position.x -= (0.06 * currentSpeed/100) * Math.sin(thirdPersonCamera.rotation.y)
                    thirdPersonCamera.position.z -= (0.06 * currentSpeed/100) * Math.cos(thirdPersonCamera.rotation.y)
                }
            }
            if (currentSpeed < 0) {
                if (movementConstraintsArray.some(streetElement => streetElement[0] === Math.floor(thirdPersonCamera.position.x + 0.5) && streetElement[1] === Math.floor(thirdPersonCamera.position.z + 0.5))) {
                    thirdPersonCamera.position.x += (0.03 * Math.abs(currentSpeed)/100) * Math.sin(thirdPersonCamera.rotation.y)
                    thirdPersonCamera.position.z += (0.03 * Math.abs(currentSpeed)/100) * Math.cos(thirdPersonCamera.rotation.y)
                }
            }
        }

        controls.target.set(thirdPersonCamera.position.x, thirdPersonCamera.position.y + 0.6, thirdPersonCamera.position.z)
        controls.update();

        renderer.render( scene, camera );

    }
    renderer.clear()
    animate()

}

const manager = new THREE.LoadingManager(); 

// List of object to load

let car;
let building1x1A_obj;
let building1x1B_obj;
let building1x1C_obj;
let building2x1A_obj;
let building2x2A_obj;
let building3x2A_obj;
let building4x4A_obj;
let building5x3A_obj;
let building6x2A_obj;

manager.onStart = function ( url, itemsLoaded, itemsTotal ) 
{ 
    console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' ); 
}; 
manager.onLoad = function ( ) 
{ 
    console.log( 'Loading complete!'); 
    runCreationScript(
        {
            car,
            building1x1A_obj,
            building1x1B_obj,
            building1x1C_obj,
            building2x1A_obj,
            building2x2A_obj,
            building3x2A_obj,
            building4x4A_obj,
            building5x3A_obj,
            building6x2A_obj,
        }
    );
}; 
manager.onProgress = function ( url, itemsLoaded, itemsTotal ) 
{ 
    console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' ); 
}; 
manager.onError = function ( url ) 
{ 
    console.log( 'There was an error loading ' + url ); 
}; 

// Object Loader

const loader = new FBXLoader( manager ); 

/// Player object load to load manager

loader.load('./objects/car.fbx', function ( object ) { 
    car = object
 } );

/// Building bbjects load to load manager

loader.load('./objects/1x1A.fbx', function ( object ) { 
    building1x1A_obj = object
 } );
loader.load('./objects/1x1B.fbx', function ( object ) { 
    building1x1B_obj = object
} );
loader.load('./objects/1x1C.fbx', function ( object ) { 
    building1x1C_obj = object
} );

loader.load('./objects/2x1A.fbx', function ( object ) { 
    building2x1A_obj = object
 } );
loader.load('./objects/2x2A.fbx', function ( object ) { 
    building2x2A_obj = object
} );

loader.load('./objects/3x2A.fbx', function ( object ) { 
    building3x2A_obj = object
} );

loader.load('./objects/4x4A.fbx', function ( object ) { 
    building4x4A_obj = object
} );

loader.load('./objects/5x3A.fbx', function ( object ) { 
    building5x3A_obj = object
} );

loader.load('./objects/6x2A.fbx', function ( object ) { 
    building6x2A_obj = object
} );

///


