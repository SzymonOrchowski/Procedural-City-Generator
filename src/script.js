import './style.css'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { generateMap } from './envGen'
import { Group } from 'three'

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
    // const fogColor = new THREE.Color(0xaaaaaa)

    // scene.background = fogColor
    // scene.fog = new THREE.Fog(fogColor, 0.000025, 20)

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

    // Camera

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    camera.position.z = 3
    camera.position.y = 2
    scene.add(camera)

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

    const createMap = (sideElements) => {
        const array = generateMap(sideElements);
        array.forEach(element => {
            if (element.terrainType === 'street') {
                createStreet([element.positionX,1,element.positionZ])
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
                        if (probability > 0.6) {
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
        controls.target.set(sideElements / 2, 0, sideElements / 2)
        camera.position.set(sideElements / 2, sideElements * 1.5, -3)
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

    // const thirdPersonCamera = new Group()
    // thirdPersonCamera.add(player)
    // thirdPersonCamera.add(camera)
    // camera.position.set(player.position.x, 0.8, player.position.z + 1)
    // thirdPersonCamera.position.x = playerPositionStart[0]
    // thirdPersonCamera.position.z = playerPositionStart[1]
    // scene.add(thirdPersonCamera)

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

        // controls.target.set(thirdPersonCamera.position.x, thirdPersonCamera.position.y + 0.6, thirdPersonCamera.position.z)
        controls.update();

        renderer.render( scene, camera );

    }
    renderer.clear()
    animate()

}

const manager = new THREE.LoadingManager(); 

// List of object to load

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

/// Objects load to load manager

const loader = new FBXLoader( manager ); 

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


