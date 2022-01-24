import './style.css'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { generateMap } from './envGen'

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
        antialias: true
    })
    renderer.setSize(sizes.width, sizes.height)

    // Scene
    const scene = new THREE.Scene()


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

    // Objects

    const createStreet = (position) => {
        const geometry = new THREE.BoxGeometry( 1, 0.1, 1 );
        const material = new THREE.MeshLambertMaterial( { color: 0x666666 } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = position[0]
        mesh.position.y = position[1] - 0.95
        mesh.position.z = position[2]
        scene.add( mesh );
    }

    const fbxLoader = new FBXLoader()
    const buildingGeometry = new THREE.BoxGeometry( 1, 1, 1 );

    const createBuilding1x1 = (position, color) => {
        fbxLoader.load(
            './objects/1x1.fbx',
            (object) => {
                object.scale.set(.01, .01, .01)
                object.position.x = position[0]
                object.position.z = position[2]
                object.rotation.y = Math.PI/180 * (Math.floor(Math.random() * 4) * 90)
                scene.add(object)
            },
            (xhr) => {
                // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )
        // const material = new THREE.MeshLambertMaterial( { color: color } );
        // const mesh = new THREE.Mesh( buildingGeometry, material );
        // mesh.position.x = position[0]
        // mesh.position.y = position[1] / 2
        // mesh.scale.y = position[1]
        // mesh.position.z = position[2]
        // scene.add( mesh );
    }

    

    
    // fbxLoader.load(
    //     './objects/1x1.fbx',
    //     (object) => {
    //         // object.traverse(function (child) {
    //         //     if ((child as THREE.Mesh).isMesh) {
    //         //         // (child as THREE.Mesh).material = material
    //         //         if ((child as THREE.Mesh).material) {
    //         //             ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
    //         //         }
    //         //     }
    //         // })
    //         object.scale.set(.01, .01, .01)
    //         object.position.set(10, 0, 0)
    //         scene.add(object)
    //     },
    //     (xhr) => {
    //         console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    //     },
    //     (error) => {
    //         console.log(error)
    //     }
    // )

    // console.log(Object.keys(scene.children))
    // console.log(scene.children[4])

    const createMap = (sideElements) => {
        const array = generateMap(sideElements);
        array.forEach(element => {
            if (element[2] === 'street') {
                createStreet([element[0],1,element[1]])
            }
            if (element[2] === 'building' && !element[5]) {
                createBuilding1x1([element[0],element[4],element[1]], element[3])
            }
        })
        controls.target.set(sideElements / 2, 0, sideElements / 2)
        camera.position.set(sideElements / 2, sideElements * 1.5, -3)
    }

    createMap(10);

    // Animations

    function animate() {

        requestAnimationFrame( animate );
        
        // required if controls.enableDamping or controls.autoRotate are set to true
        
        controls.update();

        renderer.render( scene, camera );

    }
    renderer.clear()
    animate()

}

runCreationScript();
