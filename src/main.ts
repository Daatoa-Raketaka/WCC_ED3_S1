import { Group, HemisphereLight, PerspectiveCamera, Scene, WebGLRenderer, Color, VSMShadowMap, Vector3, Object3D, DoubleSide, SphereGeometry, MeshStandardMaterial, Mesh } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'

const home = document.getElementById('home') as HTMLElement
const way = document.getElementById('way') as HTMLElement
const sarety = document.getElementById('sarety') as HTMLElement

const overlay = document.querySelector('.overlay') as HTMLElement
const progress = document.querySelector('.progress .bar') as HTMLElement

const pNum = document.getElementById('p-num') as HTMLElement

const cameraNav = {
    home: {
        look: new Vector3(800, 50, -1200),
        pos: { x: 1200, y: 120, z: -800 }
    },
    way: {
        look: new Vector3(5, 130, 1200),
        pos: { x: -1000, y: 100, z: 1000 }
    },
    sarety: {
        look: new Vector3(100, 50, 0),
        pos: { x: 200, y: 120, z: 200 }
    }
}

const bgColor = 0x925519

const scene = new Scene()
scene.background = new Color(bgColor)

let cameraLook = new Vector3(800, 50, -1200)
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
camera.position.set(1200, 120, -800)
camera.lookAt(cameraLook)

const cameraPos = camera.position.clone()

const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: document.getElementById('bg') as HTMLCanvasElement
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = VSMShadowMap;

const hemiLight = new HemisphereLight(0xaaaaaa, 0x555555, 0.5)
scene.add(hemiLight)

const textureLoader = new EXRLoader()
const texture = textureLoader.load('/assets/3D/lakes.exr')

const world = new Mesh(
    new SphereGeometry(2500, 24, 24),
    new MeshStandardMaterial({
        map: texture,
        side: DoubleSide
    })
)

world.rotateY(Math.PI)
scene.add(world)

const fbxLoader = new FBXLoader()

fbxLoader.load('/assets/3D/Menabe.fbx', (obj: Group) => {
    const houses = obj.children[6]

    houses.children.forEach((house: any) => {
        house.material[0].side = DoubleSide
        house.material[1].side = DoubleSide
    })

    obj.children.forEach((child) => {
        configureShadow(child)
    })

    scene.add(obj)
    overlay.style.transform = 'translateY(-100%)'
    overlay.style.opacity = '0'
    
}, (ev) => {
    const loaded = (ev.loaded * 100) / ev.total
    document.body.style.backgroundImage = 'none'
    progress.style.width = loaded + '%'
    pNum.innerText = loaded.toFixed(1) + '%'
})

/** Emit and receive shadow **/
function configureShadow(model: Object3D) {
    model.receiveShadow = true
    model.castShadow = true
}

window.addEventListener('mousemove', (ev) => {
    const offset = 0.2
    const newPos = {
        x: cameraPos.z - (ev.clientX - (window.innerWidth / 2)) * offset,
        y: cameraPos.y + (ev.clientY - (window.innerHeight / 2)) * offset
    }
    camera.position.setZ(newPos.x)
    camera.position.setY(newPos.y)
    camera.lookAt(cameraLook)
})

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
})

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

function addListener(item: HTMLElement, key: 'home' | 'way' | 'sarety') {
    item.addEventListener('click', () => {
        const pos = cameraNav[key].pos

        cameraPos.set(pos.x, pos.y, pos.z)
        cameraLook = cameraNav[key].look
    
        camera.position.set(pos.x, pos.y, pos.z)
        camera.lookAt(cameraLook)
    })
}

addListener(home, 'home')
addListener(way, 'way')
addListener(sarety, 'sarety')

animate()