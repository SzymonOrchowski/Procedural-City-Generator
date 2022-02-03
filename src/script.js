import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { generateMap } from './envGen'
import { Group } from 'three'

// Settings

const settings = {
    mapSize: 40,
    prob6x2: 0,
    prob5x3: 0,
    prob4x4: 0,
    prob3x2: 0,
    prob2x2: 0,
    prob2x1: 0,
    prob1x1A: 0,
    prob1x1B: 0,
    prob1x1C: 0,
    fogColor: 0xf7dc9c,
    light1Color: 0xffffff,
    light2Color: 0xffffff,
    carColor: 0xffffff,
}

// Presets

// // preset 1 - empty

const presets = [
    {
        name: 'preset1',
        prob6x2: 0,
        prob5x3: 0,
        prob4x4: 0,
        prob3x2: 0,
        prob2x2: 0,
        prob2x1: 0,
        prob1x1A: 0,
        prob1x1B: 0,
        prob1x1C: 0,
        fogColor: '#f7dc9c',
        light1Color: '#ffffff',
        light2Color: '#ffffff',
        carColor: '#ffffff',
    },
    {
        name: 'preset2',
        prob6x2: 6,
        prob5x3: 6,
        prob4x4: 6,
        prob3x2: 6,
        prob2x2: 6,
        prob2x1: 6,
        prob1x1A: 6,
        prob1x1B: 6,
        prob1x1C: 6,
        fogColor: '#f7dc9c',
        light1Color: '#ffffff',
        light2Color: '#ffffff',
        carColor: '#ffffff',
    },
    {
        name: 'preset3',
        prob6x2: 0,
        prob5x3: 0,
        prob4x4: 0,
        prob3x2: 0,
        prob2x2: 0,
        prob2x1: 0,
        prob1x1A: 0,
        prob1x1B: 0,
        prob1x1C: 10,
        fogColor: '#e9e5f2',
        light1Color: '#ffffff',
        light2Color: '#ffffff',
        carColor: '#ffffff',
    },
    {
        name: 'preset4',
        prob6x2: 0,
        prob5x3: 0,
        prob4x4: 0,
        prob3x2: 0,
        prob2x2: 0,
        prob2x1: 0,
        prob1x1A: 0,
        prob1x1B: 10,
        prob1x1C: 0,
        fogColor: '#bceeac',
        light1Color: '#ffffff',
        light2Color: '#fcffc5',
        carColor: '#67442f',
    },
    {
        name: 'preset5',
        prob6x2: 0,
        prob5x3: 0,
        prob4x4: 0,
        prob3x2: 0,
        prob2x2: 0,
        prob2x1: 2,
        prob1x1A: 0,
        prob1x1B: 0,
        prob1x1C: 0,
        fogColor: '#f2b69c',
        light1Color: '#ffffff',
        light2Color: '#ffffff',
        carColor: '#ff0000',
    },
    {
        name: 'preset6',
        prob6x2: 0,
        prob5x3: 0,
        prob4x4: 0,
        prob3x2: 0,
        prob2x2: 0,
        prob2x1: 0,
        prob1x1A: 10,
        prob1x1B: 0,
        prob1x1C: 0,
        fogColor: '#d5eaef',
        light1Color: '#ffffff',
        light2Color: '#ffffff',
        carColor: '#fcc700',
    },
    {
        name: 'preset7',
        prob6x2: 0,
        prob5x3: 9,
        prob4x4: 4,
        prob3x2: 5,
        prob2x2: 0,
        prob2x1: 0,
        prob1x1A: 0,
        prob1x1B: 0,
        prob1x1C: 0,
        fogColor: '#f7dc9c',
        light1Color: '#f8eba4',
        light2Color: '#f0d1a8',
        carColor: '#ffedce',
    },
    {
        name: 'preset8',
        prob6x2: 0,
        prob5x3: 0,
        prob4x4: 0,
        prob3x2: 0,
        prob2x2: 8,
        prob2x1: 0,
        prob1x1A: 0,
        prob1x1B: 0,
        prob1x1C: 0,
        fogColor: '#96bbf2',
        light1Color: '#a1ceff',
        light2Color: '#d8c3ff',
        carColor: '#d8e1fb',
    }
]

// Menu 

document.getElementById('default_fog_color_button').addEventListener('click', (e) => {
    e.preventDefault()
    document.getElementsByName('fog-color')[0].value = '#f7dc9c'
})
document.getElementById('default_light1_color_button').addEventListener('click', (e) => {
    e.preventDefault()
    document.getElementsByName('light1-color')[0].value = '#ffffff'
})
document.getElementById('default_light2_color_button').addEventListener('click', (e) => {
    e.preventDefault()
    document.getElementsByName('light2-color')[0].value = '#ffffff'
})
document.getElementById('default_car_color_button').addEventListener('click', (e) => {
    e.preventDefault()
    document.getElementsByName('car-color')[0].value = '#ffffff'
})

document.getElementById('preset_select').addEventListener('change', (e) => {
    const preset = presets.find(preset => preset.name === e.target.value)
    document.getElementsByName('sixtwo')[0].value = preset.prob6x2
    document.getElementsByName('fivethree')[0].value = preset.prob5x3
    document.getElementsByName('fourfour')[0].value = preset.prob4x4
    document.getElementsByName('threetwo')[0].value = preset.prob5x3
    document.getElementsByName('twotwo')[0].value = preset.prob2x2
    document.getElementsByName('twoone')[0].value = preset.prob2x1
    document.getElementsByName('oneoneA')[0].value = preset.prob1x1A
    document.getElementsByName('oneoneB')[0].value = preset.prob1x1B
    document.getElementsByName('oneoneC')[0].value = preset.prob1x1C
    document.getElementsByName('fog-color')[0].value = preset.fogColor
    document.getElementsByName('light1-color')[0].value = preset.light1Color
    document.getElementsByName('light2-color')[0].value = preset.light2Color
    document.getElementsByName('car-color')[0].value = preset.carColor
})

document.getElementById('generate-button').addEventListener('click', () => {
    window.scrollTo(0, 0)
    document.getElementById('main_menu').style.display = 'none'
    settings.mapSize = Number(document.getElementsByName('mapsize')[0].value)
    settings.prob6x2 = Number(document.getElementsByName('sixtwo')[0].value)
    settings.prob5x3 = Number(document.getElementsByName('fivethree')[0].value)
    settings.prob4x4 = Number(document.getElementsByName('fourfour')[0].value)
    settings.prob3x2 = Number(document.getElementsByName('threetwo')[0].value)
    settings.prob2x2 = Number(document.getElementsByName('twotwo')[0].value)
    settings.prob2x1 = Number(document.getElementsByName('twoone')[0].value)
    settings.prob1x1A = Number(document.getElementsByName('oneoneA')[0].value)
    settings.prob1x1B = Number(document.getElementsByName('oneoneB')[0].value)
    settings.prob1x1C = Number(document.getElementsByName('oneoneC')[0].value)
    settings.fogColor = document.getElementsByName('fog-color')[0].value
    settings.light1Color = document.getElementsByName('light1-color')[0].value
    settings.light2Color = document.getElementsByName('light2-color')[0].value
    settings.carColor = document.getElementsByName('car-color')[0].value
    document.getElementById('back-to-menu-button').style.display = 'block'
    document.getElementById('mobile-controler-container').style.display = 'block'
    runCreationScript(settings)
})


//Function

function runCreationScript(settings) {

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
    // const fogColor = new THREE.Color(0xf7dc9c)
    const fogColor = new THREE.Color(settings.fogColor)

    scene.background = fogColor
    scene.fog = new THREE.Fog(fogColor, 0.000025, 25)

    // Camera

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    camera.position.z = 3
    camera.position.y = 2
    scene.add(camera)

    // Resize 

    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize(){

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    // Lights

    const pointLight1 = new THREE.PointLight(settings.light1Color, 0.4, 0)
    scene.add(pointLight1)
    pointLight1.position.y = 10
    pointLight1.position.z = 50
    pointLight1.position.x = 50

    
    const pointLight3 = new THREE.PointLight(settings.light2Color, 0.4, 0)
    pointLight3.position.y = 10
    scene.add(pointLight3)
    
    
    const light = new THREE.HemisphereLight( 0xffffff, 0x000000, 0.1 ); 
    scene.add( light );

    // Light over the player added in thirdPersonCamera
    const pointLight2 = new THREE.PointLight(0xffffff, 0.8, 0)

    // Controls

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.enableZoom = false;
    controls.enabled = false;

    // Scenery Objects

    let mixersArray = [];

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
        const mesh = building1x1A_obj.scene.clone();
        mesh.position.x = position[0]
        mesh.position.z = position[2]
        mesh.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 4) * 90)
        scene.add( mesh );
        const material1 = mesh.children[0].children.filter(element => element.name === "Cube016")[0].material
        material1.roughness = 1
    }

    const createBuilding1x1B = (position) => {
        // const geometry = new THREE.BoxGeometry( 1, 0.1, 1 );
        // const material = new THREE.MeshLambertMaterial( { color: 0xDDDD00 } );
        // const mesh = new THREE.Mesh( geometry, material );
        // console.log(building1x1B_obj)
        const mesh1x1B = building1x1B_obj.scene.clone();
        mesh1x1B.position.x = position[0]
        mesh1x1B.position.z = position[2]
        // mesh1x1B.position.y = -1.5
        mesh1x1B.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 4) * 90)
        scene.add( mesh1x1B );

        let animationMixerFor1x1B;

        animationMixerFor1x1B = new THREE.AnimationMixer(mesh1x1B);
		animationMixerFor1x1B.clipAction( building1x1B_obj.animations[0] ).startAt(Math.random() * 10).play();

        mixersArray.push(animationMixerFor1x1B)
    }

    const createBuilding1x1C = (position) => {
        // const geometry = new THREE.BoxGeometry( 1, 0.1, 1 );
        // const material = new THREE.MeshLambertMaterial( { color: 0xDDDD00 } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building1x1C_obj.scene.clone();
        mesh.position.x = position[0]
        mesh.position.z = position[2]
        mesh.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 4) * 90)
        scene.add( mesh );
    }

    const createBuilding2x1 = (position) => {
        // const geometry = new THREE.BoxGeometry( 2, 0.1, 1 );
        // const material = new THREE.MeshLambertMaterial( { color: 0xDD0000 } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building2x1A_obj.scene.clone();
        mesh.position.x = position[0] + 0.5
        mesh.position.z = position[2] 
        mesh.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 2) * 180)
        scene.add( mesh );
    }

    const createBuilding2x2 = (position) => {
        // const geometry = new THREE.BoxGeometry( 2, 0.1, 2 );
        // const material = new THREE.MeshLambertMaterial( { color: 0xDD00DD } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building2x2A_obj.scene.clone();
        mesh.position.x = position[0] + 0.5
        mesh.position.z = position[2] + 0.5
        mesh.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 4) * 90)
        scene.add( mesh );

        let mixer;

        mixer = new THREE.AnimationMixer(mesh);
		mixer.clipAction( building2x2A_obj.animations[0] ).startAt(Math.random() * 1).play();

        mixersArray.push(mixer)
    }

    const createBuilding3x2 = (position) => {
        // const geometry = new THREE.BoxGeometry( 3, 0.1, 2 );
        // const material = new THREE.MeshLambertMaterial( { color: 0xAA0000 } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building3x2A_obj.scene.clone();
        mesh.position.x = position[0] + 1
        mesh.position.z = position[2] + 0.5
        mesh.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 2) * 180)
        scene.add( mesh );
    }

    const createBuilding2x3 = (position) => {
        // const geometry = new THREE.BoxGeometry( 2, 0.1, 3 );
        // const material = new THREE.MeshLambertMaterial( { color: 0xAA88DD } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building3x2A_obj.scene.clone();
        mesh.position.x = position[0] + 0.5
        mesh.position.z = position[2] + 1
        mesh.rotation.y = Math.PI/180 * ((Math.floor(Math.random() * 2) * 180) + 90)
        scene.add( mesh );
    }

    const createBuilding4x4 = (position) => {
        // const geometry = new THREE.BoxGeometry( 4, 0.1, 4 );
        // const material = new THREE.MeshLambertMaterial( { color: 0x0000FF } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building4x4A_obj.scene.clone();
        mesh.children[0].children[0].material.roughness = 0.8
        mesh.children[0].children[2].material.metalness = 0.2
        mesh.position.x = position[0] + 1.5
        mesh.position.z = position[2] + 1.5
        scene.add( mesh );
    }

    const createBuilding5x3 = (position) => {
        // const geometry = new THREE.BoxGeometry( 5, 0.1, 3 );
        // const material = new THREE.MeshLambertMaterial( { color: 0x88FF88 } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building5x3A_obj.scene.clone();
        mesh.position.x = position[0] + 2
        mesh.position.z = position[2] + 1
        mesh.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 2) * 180)
        scene.add( mesh );

        const mixer1 = new THREE.AnimationMixer(mesh);

        mixer1.clipAction( building5x3A_obj.animations[0] ).play();

        mixersArray.push(mixer1)
    }

    const createBuilding3x5 = (position) => {
        // const geometry = new THREE.BoxGeometry( 3, 0.1, 5 );
        // const material = new THREE.MeshLambertMaterial( { color: 0x55BB55 } );
        // const mesh = new THREE.Mesh( geometry, material );
        
        const mesh = building5x3A_obj.scene.clone();
        mesh.position.x = position[0] + 1
        mesh.position.z = position[2] + 2
        mesh.rotation.y = Math.PI/180 * ((Math.floor(Math.random() * 2) * 180) + 90)
        scene.add(mesh)

        const mixer1 = new THREE.AnimationMixer(mesh);

        mixer1.clipAction( building5x3A_obj.animations[0] ).play();

        mixersArray.push(mixer1)

    }

    const createBuilding6x2 = (position) => {
        // const geometry = new THREE.BoxGeometry( 6, 0.1, 2 );
        // const material = new THREE.MeshLambertMaterial( { color: 0xFFFFFF } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building6x2A_obj.scene.clone();
        mesh.position.x = position[0] + 2.5
        mesh.position.z = position[2] + 0.5
        mesh.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 2) * 180)
        scene.add( mesh );
    }

    const createBuilding2x6 = (position) => {
        // const geometry = new THREE.BoxGeometry( 2, 0.1, 6 );
        // const material = new THREE.MeshLambertMaterial( { color: 0x999999 } );
        // const mesh = new THREE.Mesh( geometry, material );
        const mesh = building6x2A_obj.scene.clone();
        mesh.position.x = position[0] + 0.5
        mesh.position.z = position[2] + 2.5
        mesh.rotation.y = Math.PI/180 * ((Math.floor(Math.random() * 2) * 180) + 90)
        scene.add( mesh );
    }

    const playerPositionStart = [0, 0]
    const streetSquaresArray = []
    const buildingSquaresArray = []

    const createMap = (sideElements) => {
        const array = generateMap(sideElements);
        array.forEach(element => {
            if (element.terrainType === 'street') {
                createStreet([element.positionX,1,element.positionZ])
                streetSquaresArray.push([element.positionX, element.positionZ])
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
                                if (probability > (10 - settings.prob6x2) / 10) {
                                    createBuilding6x2([element.positionX,1,element.positionZ])
                                    buildingSquaresArray.push([element.positionX, element.positionZ])
                                    buildingSquaresArray.push([element.positionX, element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX + 1, element.positionZ])
                                    buildingSquaresArray.push([element.positionX + 1, element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX + 2, element.positionZ])
                                    buildingSquaresArray.push([element.positionX + 2, element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX + 3, element.positionZ])
                                    buildingSquaresArray.push([element.positionX + 3, element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX + 4, element.positionZ])
                                    buildingSquaresArray.push([element.positionX + 4, element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX + 5, element.positionZ])
                                    buildingSquaresArray.push([element.positionX + 5, element.positionZ + 1])
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
                                    buildingSquaresArray.push([element.positionX, element.positionZ])
                                    buildingSquaresArray.push([element.positionX + 1 ,element.positionZ])
                                    buildingSquaresArray.push([element.positionX + 2 ,element.positionZ])
                                    buildingSquaresArray.push([element.positionX + 3 ,element.positionZ])
                                    buildingSquaresArray.push([element.positionX + 4 ,element.positionZ])
                                    buildingSquaresArray.push([element.positionX + 5 ,element.positionZ])
                                    buildingSquaresArray.push([element.positionX, element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX + 1 ,element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX + 2 ,element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX + 3 ,element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX + 4 ,element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX + 5 ,element.positionZ + 1])
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
                                if (probability > (10 - settings.prob6x2) / 10) {
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
                                    buildingSquaresArray.push([element.positionX, element.positionZ])
                                    buildingSquaresArray.push([element.positionX, element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX, element.positionZ + 2])
                                    buildingSquaresArray.push([element.positionX, element.positionZ + 3])
                                    buildingSquaresArray.push([element.positionX, element.positionZ + 4])
                                    buildingSquaresArray.push([element.positionX, element.positionZ + 5])
                                    buildingSquaresArray.push([element.positionX + 1, element.positionZ])
                                    buildingSquaresArray.push([element.positionX + 1, element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX + 1, element.positionZ + 2])
                                    buildingSquaresArray.push([element.positionX + 1, element.positionZ + 3])
                                    buildingSquaresArray.push([element.positionX + 1, element.positionZ + 4])
                                    buildingSquaresArray.push([element.positionX + 1, element.positionZ + 5])
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
                                if (probability > (10 - settings.prob5x3) / 10) {
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
                                    buildingSquaresArray.push([element.positionX, element.positionZ])
                                    buildingSquaresArray.push([element.positionX + 1, element.positionZ])
                                    buildingSquaresArray.push([element.positionX + 2, element.positionZ])
                                    buildingSquaresArray.push([element.positionX + 3, element.positionZ])
                                    buildingSquaresArray.push([element.positionX + 4, element.positionZ])
                                    buildingSquaresArray.push([element.positionX, element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX + 1, element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX + 2, element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX + 3, element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX + 4, element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX, element.positionZ + 2])
                                    buildingSquaresArray.push([element.positionX + 1, element.positionZ + 2])
                                    buildingSquaresArray.push([element.positionX + 2, element.positionZ + 2])
                                    buildingSquaresArray.push([element.positionX + 3, element.positionZ + 2])
                                    buildingSquaresArray.push([element.positionX + 4, element.positionZ + 2])
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
                                if (probability > (10 - settings.prob5x3) / 10) {
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
                                    buildingSquaresArray.push([element.positionX, element.positionZ])
                                    buildingSquaresArray.push([element.positionX, element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX, element.positionZ + 2])
                                    buildingSquaresArray.push([element.positionX, element.positionZ + 3])
                                    buildingSquaresArray.push([element.positionX, element.positionZ + 4])
                                    buildingSquaresArray.push([element.positionX + 1, element.positionZ])
                                    buildingSquaresArray.push([element.positionX + 1, element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX + 1, element.positionZ + 2])
                                    buildingSquaresArray.push([element.positionX + 1, element.positionZ + 3])
                                    buildingSquaresArray.push([element.positionX + 1, element.positionZ + 4])
                                    buildingSquaresArray.push([element.positionX + 2, element.positionZ])
                                    buildingSquaresArray.push([element.positionX + 2, element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX + 2, element.positionZ + 2])
                                    buildingSquaresArray.push([element.positionX + 2, element.positionZ + 3])
                                    buildingSquaresArray.push([element.positionX + 2, element.positionZ + 4])
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
                                if (probability > (10 - settings.prob4x4) / 10) {
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
                                    buildingSquaresArray.push([element.positionX, element.positionZ])
                                    buildingSquaresArray.push([element.positionX + 1, element.positionZ])
                                    buildingSquaresArray.push([element.positionX + 2, element.positionZ])
                                    buildingSquaresArray.push([element.positionX + 3, element.positionZ])
                                    buildingSquaresArray.push([element.positionX, element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX + 1, element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX + 2, element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX + 3, element.positionZ + 1])
                                    buildingSquaresArray.push([element.positionX, element.positionZ + 2])
                                    buildingSquaresArray.push([element.positionX + 1, element.positionZ + 2])
                                    buildingSquaresArray.push([element.positionX + 2, element.positionZ + 2])
                                    buildingSquaresArray.push([element.positionX + 3, element.positionZ + 2])
                                    buildingSquaresArray.push([element.positionX, element.positionZ + 3])
                                    buildingSquaresArray.push([element.positionX + 1, element.positionZ + 3])
                                    buildingSquaresArray.push([element.positionX + 2, element.positionZ + 3])
                                    buildingSquaresArray.push([element.positionX + 3, element.positionZ + 3])
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
                            if (probability > (10 - settings.prob3x2) / 10) {
                                createBuilding2x3([element.positionX,1,element.positionZ])
                                array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX).used = true
                                array.find(square => square.positionZ === element.positionZ && square.positionX === element.positionX + 1).used = true 
                                array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX).used = true
                                array.find(square => square.positionZ === element.positionZ + 1 && square.positionX === element.positionX + 1).used = true
                                array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX).used = true
                                array.find(square => square.positionZ === element.positionZ + 2 && square.positionX === element.positionX + 1).used = true
                                buildingSquaresArray.push([element.positionX, element.positionZ])
                                buildingSquaresArray.push([element.positionX + 1, element.positionZ])
                                buildingSquaresArray.push([element.positionX, element.positionZ + 1])
                                buildingSquaresArray.push([element.positionX + 1, element.positionZ + 1])
                                buildingSquaresArray.push([element.positionX, element.positionZ + 2])
                                buildingSquaresArray.push([element.positionX + 1, element.positionZ + 2])
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
                            if (probability > (10 - settings.prob3x2) / 10) {
                                createBuilding3x2([element.positionX,1,element.positionZ])
                                array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ).used = true
                                array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1).used = true 
                                array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ).used = true
                                array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1).used = true
                                array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ).used = true
                                array.find(square => square.positionX === element.positionX + 2 && square.positionZ === element.positionZ + 1).used = true
                                buildingSquaresArray.push([element.positionX, element.positionZ])
                                buildingSquaresArray.push([element.positionX + 1, element.positionZ])
                                buildingSquaresArray.push([element.positionX + 2, element.positionZ])
                                buildingSquaresArray.push([element.positionX, element.positionZ + 1])
                                buildingSquaresArray.push([element.positionX + 1, element.positionZ + 1])
                                buildingSquaresArray.push([element.positionX + 2, element.positionZ + 1])
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
                            if (probability > (10 - settings.prob2x2) / 10) {
                                createBuilding2x2([element.positionX,1,element.positionZ])
                                array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ).used = true
                                array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ).used = true
                                array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ + 1).used = true 
                                array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ + 1).used = true
                                buildingSquaresArray.push([element.positionX, element.positionZ])
                                buildingSquaresArray.push([element.positionX + 1, element.positionZ])
                                buildingSquaresArray.push([element.positionX, element.positionZ + 1])
                                buildingSquaresArray.push([element.positionX + 1, element.positionZ + 1])
                            }
                        } 
                }  
            }

            // // 2x1

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
                        if (probability > (10 - settings.prob2x1) / 10) {
                            createBuilding2x1([element.positionX,1,element.positionZ])
                            array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ).used = true
                            array.find(square => square.positionX === element.positionX + 1 && square.positionZ === element.positionZ).used = true
                            buildingSquaresArray.push([element.positionX, element.positionZ])
                            buildingSquaresArray.push([element.positionX + 1, element.positionZ])
                        }
                    } 
                }  
            }

            // 1x1

            if (element.terrainType === 'building' && !element.used) 
            {
                const variant = Math.floor(Math.random() * 30)
                array.find(square => square.positionX === element.positionX && square.positionZ === element.positionZ).used = true
                buildingSquaresArray.push([element.positionX,element.positionZ])

                let proportionRatio = 30 / (settings.prob1x1A + settings.prob1x1B + settings.prob1x1C)
                if (proportionRatio === Infinity) proportionRatio = 0
                const lowerRangeValue = settings.prob1x1A * proportionRatio
                const higherRangeValue = settings.prob1x1B * proportionRatio + lowerRangeValue

                console.log((settings.prob1x1A + settings.prob1x1B + settings.prob1x1C))
                if (variant >= 0 && variant < lowerRangeValue) {
                    if (Math.random() > (10 - settings.prob1x1A) / 10) {
                        createBuilding1x1A([element.positionX,1,element.positionZ])
                    }
                }
                if (variant >= lowerRangeValue && variant < higherRangeValue) {
                    if (Math.random() > (10 - settings.prob1x1B) / 10) {
                        createBuilding1x1B([element.positionX,1,element.positionZ])
                    }
                }
                if (variant >= higherRangeValue && variant <= 30) {
                    if (Math.random() > (10 - settings.prob1x1C) / 10) {
                        createBuilding1x1C([element.positionX,1,element.positionZ])
                    }
                }
            }

        })
        // controls.target.set(sideElements / 2, 0, sideElements / 2)
        // camera.position.set(sideElements / 2, sideElements * 1.5, -3)
    }

    createMap(settings.mapSize);

    // Keyboard Controls 

    class InputHandler {
        constructor(){
            this.keys = []
            window.addEventListener('keydown', (e) => {

                if ((
                    e.key === "a" || 
                    e.key === "d" || 
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight") && this.keys.indexOf(e.key) === -1) 
                    {
                        this.keys.push(e.key)
                    }

                if ((
                    e.key === "w" || 
                    e.key === "ArrowUp"
                    ) && this.keys.indexOf(e.key) === -1) 
                    {
                        this.keys.push(e.key)
                        if (this.keys.indexOf("s") !== -1) this.keys.splice(this.keys.indexOf("s"), 1)
                    }

                if ((
                    e.key === "s" ||
                    e.key === "ArrowDown") && this.keys.indexOf(e.key) === -1) 
                    {
                        this.keys.push(e.key)
                        if (this.keys.indexOf("w") !== -1) this.keys.splice(this.keys.indexOf("w"), 1)
                    }

            })
            window.addEventListener('keyup', (e) => {
                if (e.key === "a" || 
                    e.key === "s" ||
                    e.key === "d" ||
                    e.key === "w" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight" ||
                    e.key === "ArrowUp" ||
                    e.key === "ArrowDown") 
                    {
                    this.keys.splice(this.keys.indexOf(e.key), 1)
                    }
            })

            // mobile controls
            document.getElementById('LF').addEventListener('touchstart', () => {
                this.keys.push("w")
                this.keys.push("a")
            })
            document.getElementById('LF').addEventListener('touchend', () => {
                this.keys.splice(this.keys.indexOf("w"), 1)
                this.keys.splice(this.keys.indexOf("a"), 1)
            })
            document.getElementById('LF').addEventListener('touchmove', () => {
                this.keys.splice(this.keys.indexOf("w"), 1)
                this.keys.splice(this.keys.indexOf("a"), 1)
            })
            document.getElementById('F').addEventListener('touchstart', () => {
                this.keys.push("w")
            })
            document.getElementById('F').addEventListener('touchend', () => {
                this.keys.splice(this.keys.indexOf("w"), 1)
            })
            document.getElementById('F').addEventListener('touchmove', () => {
                this.keys.splice(this.keys.indexOf("w"), 1)
            })
            document.getElementById('RF').addEventListener('touchstart', () => {
                this.keys.push("w")
                this.keys.push("d")
            })
            document.getElementById('RF').addEventListener('touchend', () => {
                this.keys.splice(this.keys.indexOf("w"), 1)
                this.keys.splice(this.keys.indexOf("d"), 1)
            })


            document.getElementById('L').addEventListener('touchstart', () => {
                this.keys.push("a")
            })
            document.getElementById('L').addEventListener('touchend', () => {
                this.keys.splice(this.keys.indexOf("a"), 1)
            })
            document.getElementById('L').addEventListener('touchmove', () => {
                this.keys.splice(this.keys.indexOf("a"), 1)
            })
            document.getElementById('R').addEventListener('touchstart', () => {
                this.keys.push("d")
            })
            document.getElementById('R').addEventListener('touchend', () => {
                this.keys.splice(this.keys.indexOf("d"), 1)
            })
            document.getElementById('R').addEventListener('touchmove', () => {
                this.keys.splice(this.keys.indexOf("d"), 1)
            })


            document.getElementById('LB').addEventListener('touchstart', () => {
                this.keys.push("s")
                this.keys.push("a")
            })
            document.getElementById('LB').addEventListener('touchend', () => {
                this.keys.splice(this.keys.indexOf("s"), 1)
                this.keys.splice(this.keys.indexOf("a"), 1)
            })
            document.getElementById('LB').addEventListener('touchmove', () => {
                this.keys.splice(this.keys.indexOf("s"), 1)
                this.keys.splice(this.keys.indexOf("a"), 1)
            })
            document.getElementById('B').addEventListener('touchstart', () => {
                this.keys.push("s")
            })
            document.getElementById('B').addEventListener('touchend', () => {
                this.keys.splice(this.keys.indexOf("s"), 1)
            })
            document.getElementById('B').addEventListener('touchmove', () => {
                this.keys.splice(this.keys.indexOf("s"), 1)
            })
            document.getElementById('LB').addEventListener('touchstart', () => {
                this.keys.push("s")
                this.keys.push("d")
            })
            document.getElementById('LB').addEventListener('touchend', () => {
                this.keys.splice(this.keys.indexOf("s"), 1)
                this.keys.splice(this.keys.indexOf("d"), 1)
            })
            document.getElementById('LB').addEventListener('touchmove', () => {
                this.keys.splice(this.keys.indexOf("s"), 1)
                this.keys.splice(this.keys.indexOf("d"), 1)
            })
        }
    }

    const input = new InputHandler();

    // Player

    const player = car.scene
    player.scale.set(.25,.25,.25)
    const playerWheelFrontL = player.children.filter(object => object.name === 'Front-L')[0]
    const playerWheelFrontR = player.children.filter(object => object.name === 'Front-R')[0]
    const playerWheelBackL = player.children.filter(object => object.name === 'Back-L')[0]
    const playerWheelBackR = player.children.filter(object => object.name === 'Back-R')[0]
    const playerBody = player.children.filter(object => object.name === 'Body')[0]
    const playerBodyMaterial = playerBody.children.filter(object => object.name === 'Cube008')[0].material
    playerBodyMaterial.color.set(settings.carColor)
    player.position.y = 0.1
    scene.add(player)

    // Camera Player Group

    const thirdPersonCamera = new Group()
    thirdPersonCamera.add(player)
    thirdPersonCamera.add(camera)
    thirdPersonCamera.add(pointLight2)
    camera.position.set(player.position.x, 0.8, player.position.z + 1)
    thirdPersonCamera.position.x = playerPositionStart[0]
    thirdPersonCamera.position.z = playerPositionStart[1]
    pointLight2.position.x = thirdPersonCamera.position.x
    pointLight2.position.z = thirdPersonCamera.position.z - 1
    pointLight2.position.y = 0.3
    scene.add(thirdPersonCamera)

    // Speed

    let currentSpeed = 0
    let wheelRotationRatio = 0
    let cameraOffAxisRatio = 0

    // Clock

    const clock = new THREE.Clock();
    
    // Animations

    function animate() {

        requestAnimationFrame( animate );
        const delta = clock.getDelta();

        // player movement

        if (wheelRotationRatio > 0) wheelRotationRatio -= 1
        if (wheelRotationRatio < 0) wheelRotationRatio += 1
        if (cameraOffAxisRatio > 0) cameraOffAxisRatio -= 1
        if (cameraOffAxisRatio < 0) cameraOffAxisRatio += 1

        camera.position.x = player.position.x + (-0.3 * (cameraOffAxisRatio / 50))

        if (currentSpeed > 0) currentSpeed -= 1
        if (currentSpeed < 0) currentSpeed += 1


        if (input.keys.includes("a") || input.keys.includes("ArrowLeft")) 
        {
            if (wheelRotationRatio > -10) wheelRotationRatio -= 2
            if (currentSpeed > 0) {
                if (cameraOffAxisRatio < 50) cameraOffAxisRatio += 2
                thirdPersonCamera.rotation.y += 0.04 * -wheelRotationRatio/10
            } 
            if (currentSpeed < 0) {
                thirdPersonCamera.rotation.y -= 0.04 * -wheelRotationRatio/10
            } 
           
            playerWheelFrontL.rotation.y = Math.PI / 180 * (30 * wheelRotationRatio/10) 
            playerWheelFrontR.rotation.y = -Math.PI / 180 * (30 * wheelRotationRatio/10) 
            playerWheelBackL.rotation.y = -Math.PI / 180 * (30 * wheelRotationRatio/10) 
            playerWheelBackR.rotation.y = Math.PI / 180 * (30 * wheelRotationRatio/10) 

        } else {
            if (wheelRotationRatio < 0 && wheelRotationRatio > -10) {
                playerWheelFrontL.rotation.y = Math.PI / 180 * (30 * wheelRotationRatio/10) 
                playerWheelFrontR.rotation.y = -Math.PI / 180 * (30 * wheelRotationRatio/10) 
                playerWheelBackL.rotation.y = -Math.PI / 180 * (30 * wheelRotationRatio/10) 
                playerWheelBackR.rotation.y = Math.PI / 180 * (30 * wheelRotationRatio/10) 
            }
        }

        let currentSquareBuilding = buildingSquaresArray.find(buildingTerrain => 
            (buildingTerrain[0] - thirdPersonCamera.position.x) <= 0.5 && 
            (buildingTerrain[0] - thirdPersonCamera.position.x) >= -0.5 &&
            (buildingTerrain[1] - thirdPersonCamera.position.z) <= 0.5 && 
            (buildingTerrain[1] - thirdPersonCamera.position.z) >= -0.5
            )

        if (input.keys.includes("d") || input.keys.includes("ArrowRight")) 
        { 
            if (wheelRotationRatio < 10) wheelRotationRatio += 2
            if (currentSpeed > 0) {
                if (cameraOffAxisRatio > -50) cameraOffAxisRatio -= 2
                thirdPersonCamera.rotation.y -= 0.04 * wheelRotationRatio/10
            }
            if (currentSpeed < 0) {
                thirdPersonCamera.rotation.y += 0.04 * wheelRotationRatio/10
            }
            playerWheelFrontL.rotation.y = Math.PI / 180 * (30 * (wheelRotationRatio/10)) 
            playerWheelFrontR.rotation.y = -Math.PI / 180 * (30 * (wheelRotationRatio/10)) 
            playerWheelBackL.rotation.y = -Math.PI / 180 * (30 * (wheelRotationRatio/10)) 
            playerWheelBackR.rotation.y = Math.PI / 180 * (30 * (wheelRotationRatio/10)) 
        } else {
            if (wheelRotationRatio > 0 && wheelRotationRatio < 10) {

                playerWheelFrontL.rotation.y = Math.PI / 180 * (30 * (wheelRotationRatio/10)) 
                playerWheelFrontR.rotation.y = -Math.PI / 180 * (30 * (wheelRotationRatio/10)) 
                playerWheelBackL.rotation.y = -Math.PI / 180 * (30 * (wheelRotationRatio/10)) 
                playerWheelBackR.rotation.y = Math.PI / 180 * (30 * (wheelRotationRatio/10)) 
            }
        }

        if (input.keys.includes("w") || input.keys.includes("ArrowUp")) {
                // thirdPersonCamera.position.x -= (0.05 * currentSpeed/100) * Math.sin(thirdPersonCamera.rotation.y)
                // thirdPersonCamera.position.z -= (0.05 * currentSpeed/100) * Math.cos(thirdPersonCamera.rotation.y)
            if (!currentSquareBuilding)
            {
                thirdPersonCamera.position.x -= (0.05 * currentSpeed/100) * Math.sin(thirdPersonCamera.rotation.y)
                thirdPersonCamera.position.z -= (0.05 * currentSpeed/100) * Math.cos(thirdPersonCamera.rotation.y)
            } 
            else 
            {    
                thirdPersonCamera.position.x += (0.05 * currentSpeed/100) * Math.sin(thirdPersonCamera.rotation.y)
                thirdPersonCamera.position.z += (0.05 * currentSpeed/100) * Math.cos(thirdPersonCamera.rotation.y)
                currentSpeed = 0
            }
            if (currentSpeed < 100) currentSpeed += 2
        } 
        
        if (input.keys.includes("s") || input.keys.includes("ArrowDown")) {

            if (!currentSquareBuilding) {
                thirdPersonCamera.position.x += (0.025 * Math.abs(currentSpeed)/100) * Math.sin(thirdPersonCamera.rotation.y)
                thirdPersonCamera.position.z += (0.025 * Math.abs(currentSpeed)/100) * Math.cos(thirdPersonCamera.rotation.y)
                }
            else
            { 
                thirdPersonCamera.position.x -= (0.01 * Math.abs(currentSpeed)/100) * Math.sin(thirdPersonCamera.rotation.y)
                thirdPersonCamera.position.z -= (0.01 * Math.abs(currentSpeed)/100) * Math.cos(thirdPersonCamera.rotation.y)
                currentSpeed = 0
            }

            if (currentSpeed > -100) currentSpeed -= 2
        } 

        if (!input.keys.includes("w") && !input.keys.includes("s") && !input.keys.includes("ArrowUp") && !input.keys.includes("ArrowDown")) {
            if (currentSpeed > 0) {
                if (streetSquaresArray.some(streetElement => streetElement[0] === Math.floor(thirdPersonCamera.position.x + 0.5) && streetElement[1] === Math.floor(thirdPersonCamera.position.z + 0.5))) {
                    thirdPersonCamera.position.x -= (0.06 * currentSpeed/100) * Math.sin(thirdPersonCamera.rotation.y)
                    thirdPersonCamera.position.z -= (0.06 * currentSpeed/100) * Math.cos(thirdPersonCamera.rotation.y)
                }
            }
            if (currentSpeed < 0) {
                if (streetSquaresArray.some(streetElement => streetElement[0] === Math.floor(thirdPersonCamera.position.x + 0.5) && streetElement[1] === Math.floor(thirdPersonCamera.position.z + 0.5))) {
                    thirdPersonCamera.position.x += (0.03 * Math.abs(currentSpeed)/100) * Math.sin(thirdPersonCamera.rotation.y)
                    thirdPersonCamera.position.z += (0.03 * Math.abs(currentSpeed)/100) * Math.cos(thirdPersonCamera.rotation.y)
                }
            }
        }

        if (!!currentSquareBuilding) 
        {
            if ((currentSquareBuilding[0] - thirdPersonCamera.position.x) <= 0.5 && (currentSquareBuilding[0] - thirdPersonCamera.position.x) > 0)
            {
                if ((currentSquareBuilding[1] - thirdPersonCamera.position.z) <= 0.5 && (currentSquareBuilding[1] - thirdPersonCamera.position.z) > 0)
                {
                    // console.log('pierwszy')
                    currentSpeed = 0
                    if (((currentSquareBuilding[0] - 0.6) - thirdPersonCamera.position.x) > ((currentSquareBuilding[1] - 0.6) - thirdPersonCamera.position.z)) {
                        // console.log('pierwszy AAA !!!')
                        thirdPersonCamera.position.x = currentSquareBuilding[0] - 0.6
                    } else {
                        // console.log('pierwszy BBB !!!')
                        thirdPersonCamera.position.z = currentSquareBuilding[1] - 0.6
                    }
                }
    
                if ((currentSquareBuilding[1] - thirdPersonCamera.position.z) >= -0.5 && (currentSquareBuilding[1] - thirdPersonCamera.position.z) <= 0)
                {
                    // console.log('drugi', Math.abs((currentSquareBuilding[0] + 0.6) - thirdPersonCamera.position.x), Math.abs((currentSquareBuilding[1] - 0.6) - thirdPersonCamera.position.z))
                    currentSpeed = 0
                    if (Math.abs((currentSquareBuilding[0] + 0.6) - thirdPersonCamera.position.x) > Math.abs((currentSquareBuilding[1] - 0.6) - thirdPersonCamera.position.z)) {
                        // console.log('drugie AAA')
                        thirdPersonCamera.position.x = currentSquareBuilding[0] - 0.6
                    } else {
                        // console.log('drugie BBB !!!')
                        thirdPersonCamera.position.z = currentSquareBuilding[1] + 0.6
                    }
                }
            }

            if ((currentSquareBuilding[0] - thirdPersonCamera.position.x) >= -0.5 && (currentSquareBuilding[0] - thirdPersonCamera.position.x) <= 0)
            {
                if ((currentSquareBuilding[1] - thirdPersonCamera.position.z) <= 0.5 && (currentSquareBuilding[1] - thirdPersonCamera.position.z) > 0)
                {
                    //  console.log('trzeci', Math.abs((currentSquareBuilding[0] - 0.6) - thirdPersonCamera.position.x), Math.abs((currentSquareBuilding[1] - 0.6) + thirdPersonCamera.position.z))
                    currentSpeed = 0
                    if (Math.abs((currentSquareBuilding[0] - 0.6) - thirdPersonCamera.position.x) > Math.abs((currentSquareBuilding[1] - 0.6) + thirdPersonCamera.position.z)) {
                        // console.log('trzeci AAA !!!')
                        thirdPersonCamera.position.x = currentSquareBuilding[0] + 0.6
                    } else {
                        // console.log('trzeci BBB !!!')
                        thirdPersonCamera.position.z = currentSquareBuilding[1] - 0.6
                    }
                }
    
                if ((currentSquareBuilding[1] - thirdPersonCamera.position.z) >= -0.5 && (currentSquareBuilding[1] - thirdPersonCamera.position.z) <= 0)
                {
                    // console.log('czwarty', Math.abs((currentSquareBuilding[0] - 0.6) - thirdPersonCamera.position.x), Math.abs((currentSquareBuilding[1] - 0.6) + thirdPersonCamera.position.z))
                    currentSpeed = 0
                    if (Math.abs((currentSquareBuilding[0] - 0.6) - thirdPersonCamera.position.x) > Math.abs((currentSquareBuilding[1] - 0.6) - thirdPersonCamera.position.z)) {
                        // console.log('czwarte AAA !!!')
                        thirdPersonCamera.position.x = currentSquareBuilding[0] + 0.6
                    } else {
                        // console.log('czwarte BBB !!!')
                        thirdPersonCamera.position.z = currentSquareBuilding[1] + 0.6
                    }
                }
            }

        } else {
            console.log('street')
        }

        controls.target.set(thirdPersonCamera.position.x, thirdPersonCamera.position.y + 0.6, thirdPersonCamera.position.z)
        
        mixersArray.forEach(mixer => {mixer.update(delta)})
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
    document.getElementById('loading_screen').style.display = "block"
    document.getElementById('range_mapsize_disp').value = document.getElementById('mapsize').value
    document.getElementById('range_mapsize_disp2').value = document.getElementById('mapsize').value
    document.getElementById('sixtwo_disp').value = document.getElementById('sixtwo').value
    document.getElementById('fivethree_disp').value = document.getElementById('fivethree').value
    document.getElementById('fourfour_disp').value = document.getElementById('fourfour').value
    document.getElementById('threetwo_disp').value = document.getElementById('threetwo').value
    document.getElementById('twotwo_disp').value = document.getElementById('twotwo').value
    document.getElementById('twoone_disp').value = document.getElementById('twoone').value
    document.getElementById('oneoneA_disp').value = document.getElementById('oneoneA').value
    document.getElementById('oneoneB_disp').value = document.getElementById('oneoneB').value
    document.getElementById('oneoneC_disp').value = document.getElementById('oneoneC').value
    console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' ); 
}; 
manager.onLoad = function ( ) 
{ 
    document.getElementById('loading_screen').style.display = "none"
    document.getElementById('main_menu').style.display = "block"
    console.log( 'Loading complete!'); 
    // runCreationScript(settings);
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

const gltfloader = new GLTFLoader( manager);

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

gltfloader.setDRACOLoader(dracoLoader)

/// Player object load to load manager

gltfloader.load('./objects/car.glb', function ( object ) { 
    car = object
 } );

/// Building bbjects load to load manager

gltfloader.load('./objects/1x1A.glb', function ( object ) { 
    building1x1A_obj = object
 } );
gltfloader.load('./objects/1x1B.glb', function ( object ) { 
    building1x1B_obj = object
} );
gltfloader.load('./objects/1x1C.glb', function ( object ) { 
    building1x1C_obj = object
} );

gltfloader.load('./objects/2x1A.glb', function ( object ) { 
    building2x1A_obj = object
 } );
 gltfloader.load('./objects/2x2A.glb', function ( object ) { 
    building2x2A_obj = object
} );

gltfloader.load('./objects/3x2A.glb', function ( object ) { 
    building3x2A_obj = object
} );

gltfloader.load('./objects/4x4A.glb', function ( object ) { 
    building4x4A_obj = object
} );

gltfloader.load('./objects/5x3A.glb', function ( object ) { 
    building5x3A_obj = object
} );

gltfloader.load('./objects/6x2A.glb', function ( object ) { 
    building6x2A_obj = object
} );

///


