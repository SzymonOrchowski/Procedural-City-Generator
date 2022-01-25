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

    const building1x1Geometry = objects.building1x1Object.children[0].geometry

    const createBuilding1x1A = (position) => {
        const geometry = new THREE.BoxGeometry( 1, 0.1, 1 );
        const material = new THREE.MeshLambertMaterial( { color: 0xDDDD00 } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = position[0]
        mesh.position.z = position[2]
        mesh.receiveShadow = true;
        scene.add( mesh );
        // const object = building1x1Object.clone();
        // object.scale.set(.01, .01, .01)
        // object.position.x = position[0]
        // object.position.z = position[2]
        // object.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 4) * 90)
        // scene.add(object)
    }

    const createBuilding1x1B = (position) => {
        const geometry = new THREE.BoxGeometry( 1, 0.1, 1 );
        const material = new THREE.MeshLambertMaterial( { color: 0xAAAA00 } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = position[0]
        mesh.position.z = position[2]
        mesh.receiveShadow = true;
        scene.add( mesh );
        // const object = building1x1Object.clone();
        // object.scale.set(.01, .01, .01)
        // object.position.x = position[0]
        // object.position.z = position[2]
        // object.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 4) * 90)
        // scene.add(object)
    }

    const createBuilding1x1C = (position) => {
        const geometry = new THREE.BoxGeometry( 1, 0.1, 1 );
        const material = new THREE.MeshLambertMaterial( { color: 0x888800 } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = position[0]
        mesh.position.z = position[2]
        mesh.receiveShadow = true;
        scene.add( mesh );
        // const object = building1x1Object.clone();
        // object.scale.set(.01, .01, .01)
        // object.position.x = position[0]
        // object.position.z = position[2]
        // object.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 4) * 90)
        // scene.add(object)
    }

    const createBuilding2x1 = (position) => {
        const geometry = new THREE.BoxGeometry( 2, 0.1, 1 );
        const material = new THREE.MeshLambertMaterial( { color: 0xDD0000 } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = position[0] + 0.5
        mesh.position.z = position[2] 
        scene.add( mesh );
    }

    const createBuilding2x2 = (position) => {
        const geometry = new THREE.BoxGeometry( 2, 0.1, 2 );
        const material = new THREE.MeshLambertMaterial( { color: 0xDD00DD } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = position[0] + 0.5
        mesh.position.z = position[2] + 0.5
        mesh.receiveShadow = true;
        scene.add( mesh );
        // const object = building2x2Object.clone();
        // object.scale.set(.01, .01, .01)
        // object.position.x = position[0] + 0.5
        // object.position.z = position[2] + 0.5
        // object.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 4) * 90)
        // scene.add(object)
    }

    const createBuilding3x2 = (position) => {
        const geometry = new THREE.BoxGeometry( 3, 0.1, 2 );
        const material = new THREE.MeshLambertMaterial( { color: 0xAA0000 } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = position[0] + 1
        mesh.position.z = position[2] + 0.5
        mesh.receiveShadow = true;
        scene.add( mesh );
    }

    const createBuilding2x3 = (position) => {
        const geometry = new THREE.BoxGeometry( 2, 0.1, 3 );
        const material = new THREE.MeshLambertMaterial( { color: 0xAA88DD } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = position[0] + 0.5
        mesh.position.z = position[2] + 1
        mesh.receiveShadow = true;
        scene.add( mesh );
    }

    const createBuilding4x4 = (position) => {
        const geometry = new THREE.BoxGeometry( 4, 0.1, 4 );
        const material = new THREE.MeshLambertMaterial( { color: 0x0000FF } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = position[0] + 1.5
        mesh.position.z = position[2] + 1.5
        mesh.receiveShadow = true;
        scene.add( mesh );
    }

    const createBuilding5x3 = (position) => {
        const geometry = new THREE.BoxGeometry( 5, 0.1, 3 );
        const material = new THREE.MeshLambertMaterial( { color: 0x88FF88 } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = position[0] + 2
        mesh.position.z = position[2] + 1
        mesh.receiveShadow = true;
        scene.add( mesh );
    }

    const createBuilding3x5 = (position) => {
        const geometry = new THREE.BoxGeometry( 3, 0.1, 5 );
        const material = new THREE.MeshLambertMaterial( { color: 0x55BB55 } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = position[0] + 1
        mesh.position.z = position[2] + 2
        mesh.receiveShadow = true;
        scene.add( mesh );
    }

    const createBuilding6x2 = (position) => {
        const geometry = new THREE.BoxGeometry( 6, 0.1, 2 );
        const material = new THREE.MeshLambertMaterial( { color: 0xFFFFFF } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = position[0] + 2.5
        mesh.position.z = position[2] + 0.5
        mesh.receiveShadow = true;
        scene.add( mesh );
    }

    const createBuilding2x6 = (position) => {
        const geometry = new THREE.BoxGeometry( 2, 0.1, 6 );
        const material = new THREE.MeshLambertMaterial( { color: 0x999999 } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = position[0] + 0.5
        mesh.position.z = position[2] + 2.5
        mesh.receiveShadow = true;
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
                const variant = Math.floor(Math.random() * 2.99)
                if (variant === 0) createBuilding1x1A([element.positionX,1,element.positionZ])
                if (variant === 1) createBuilding1x1B([element.positionX,1,element.positionZ])
                if (variant === 2) createBuilding1x1C([element.positionX,1,element.positionZ])
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
let building1x1Object;
let building2x2Object;

manager.onStart = function ( url, itemsLoaded, itemsTotal ) 
{ 
    console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' ); 
}; 
manager.onLoad = function ( ) 
{ 
    console.log( 'Loading complete!'); 
    runCreationScript(
        {
            building1x1Object,
            building2x2Object
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
const loader = new FBXLoader( manager ); 

loader.load('./objects/1x1.fbx', function ( object ) { 
    building1x1Object = object
 } );

loader.load('./objects/2x2.fbx', function ( object ) { 
    building2x2Object = object
} );


