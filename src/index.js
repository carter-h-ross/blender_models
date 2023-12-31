/*-------------------------------------- three js section ---------------------------------------*/

// threejs imports
import * as THREE from 'three';
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const gltfLoader = new GLTFLoader();
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

// starting camera position
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 20;
camera.position.y = 30;
camera.position.x = 20;
camera.lookAt(new THREE.Vector3(0, 0, 0));

// orbit controls
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

//board pieces placed ** currently for development only cubes **
var meshes = [];
const pieceModels = {
  'wp': 'pieces/white-pawn.gltf',
  'wk': 'pieces/white-king.gltf',
  'wq': 'pieces/white-queen.gltf',
  'wr': 'pieces/white-rook.gltf',
  'wb': 'pieces/white-bishop.gltf',
  'wn': 'pieces/white-knight.gltf',
  'bp': 'pieces/black-pawn.gltf',
  'bk': 'pieces/black-king.gltf',
  'bq': 'pieces/black-queen.gltf',
  'br': 'pieces/black-rook.gltf',
  'bb': 'pieces/black-bishop.gltf',
  'bn': 'pieces/black-knight.gltf',
};

// board location planes for raycast and game logic
var prevClickedMesh = null;

/*
function onCanvasClick(event) {
  const canvasBounds = renderer.domElement.getBoundingClientRect();
  const mouse = new THREE.Vector2();
  mouse.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
  mouse.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true); // Set the second parameter to true to check all descendants of an object

  if (intersects.length > 0) {
    const clickedMesh = intersects[0].object;
    let targetObject = clickedMesh;
    while (!targetObject.userData.index && targetObject.parent) {
      targetObject = targetObject.parent;
    }      
  }
}
*/

const models = [
  [ // chess boards
    { // standard board
      "path": "chess-boards/standard-board.gltf", 
      "lights": [
        {"color": 0xffffff, "intesity": 3, "distance": 80, "x": 30, "y": 25, "z": 0},
        {"color": 0xffffff, "intesity": 3, "distance": 80, "x": -30, "y": 25, "z": 0},
        {"color": 0xffffff, "intesity": 3, "distance": 80, "x": 0, "y": 25, "z": 30},
        {"color": 0xffffff, "intesity": 3, "distance": 80, "x": 0, "y": 25, "z": -30},
      ],
      "radius": 60, 
      "height": 25,
      "offsetZ": 15,
      "offsetY": 0,
    },
    { // 
      "path": "chess-boards/lava-chess.gltf", 
      "lights": [
        {"color": 0xffffff, "intesity": 3, "distance": 80, "x": 30, "y": 25, "z": 0},
        {"color": 0xffffff, "intesity": 3, "distance": 80, "x": -30, "y": 25, "z": 0},
        {"color": 0xffffff, "intesity": 3, "distance": 80, "x": 0, "y": 25, "z": 30},
        {"color": 0xffffff, "intesity": 3, "distance": 80, "x": 0, "y": 25, "z": -30},
      ],
      "radius": 60, 
      "height": 25,
      "offsetZ": 15,
      "offsetY": 0,
    },
    {
      "path": "chess-boards/double-board.gltf", 
      "lights": [
        {"color": 0xffffff, "intesity": 3, "distance": 160, "x": 60, "y": 25, "z": 0},
        {"color": 0xffffff, "intesity": 3, "distance": 160, "x": -60, "y": 25, "z": 0},
        {"color": 0xffffff, "intesity": 3, "distance": 160, "x": 0, "y": 25, "z": 60},
        {"color": 0xffffff, "intesity": 3, "distance": 160, "x": 0, "y": 25, "z": -60},
      ],
      "radius": 120, 
      "height": 50,
      "offsetZ": 30,
      "offsetY": 0,
    },
  ],
  [
    {
      "path": "pieces/white-queen.gltf", 
      "lights": [
        {"color": 0xffffff, "intesity": 3, "distance": 80, "x": 10, "y": 10, "z": 10},
      ],
      "radius": 10, 
      "height": 5,
      "offsetZ": 2,
      "offsetY": -5,
    },
    {
      "path": "pieces/white-king.gltf", 
      "lights": [
        {"color": 0xffffff, "intesity": 3, "distance": 80, "x": 10, "y": 10, "z": 10},
      ],
      "radius": 10, 
      "height": 5,
      "offsetZ": 2,
      "offsetY": -5.3,
    },
    {
      "path": "pieces/white-knight.gltf", 
      "lights": [
        {"color": 0xffffff, "intesity": 3, "distance": 80, "x": 10, "y": 10, "z": 10},
      ],
      "radius": 8, 
      "height": 5,
      "offsetZ": 2,
      "offsetY": -4,
    },
    {
      "path": "pieces/white-bishop.gltf", 
      "lights": [
        {"color": 0xffffff, "intesity": 3, "distance": 80, "x": 10, "y": 10, "z": 10},
      ],
      "radius": 9, 
      "height": 5,
      "offsetZ": 2,
      "offsetY": -4.5,
    },
    {
      "path": "pieces/white-rook.gltf", 
      "lights": [
        {"color": 0xffffff, "intesity": 3, "distance": 80, "x": 10, "y": 10, "z": 10},
      ],
      "radius": 8, 
      "height": 5,
      "offsetZ": 2,
      "offsetY": -4,
    },
    {
      "path": "pieces/white-pawn.gltf", 
      "lights": [
        {"color": 0xffffff, "intesity": 3, "distance": 80, "x": 10, "y": 10, "z": 10},
      ],
      "radius": 7, 
      "height": 5,
      "offsetZ": 2,
      "offsetY": -4,
    },
  ],
  [
    {
      "path": "pieces/black-queen.gltf", 
      "lights": [
        {"color": 0xffffff, "intesity": 3, "distance": 80, "x": 10, "y": 10, "z": 10},
      ],
      "radius": 10, 
      "height": 5,
      "offsetZ": 2,
      "offsetY": -5,
    },
    {
      "path": "pieces/black-king.gltf", 
      "lights": [
        {"color": 0xffffff, "intesity": 3, "distance": 80, "x": 10, "y": 10, "z": 10},
      ],
      "radius": 10, 
      "height": 5,
      "offsetZ": 2,
      "offsetY": -5.3,
    },
    {
      "path": "pieces/black-knight.gltf", 
      "lights": [
        {"color": 0xffffff, "intesity": 3, "distance": 80, "x": 10, "y": 10, "z": 10},
      ],
      "radius": 8, 
      "height": 5,
      "offsetZ": 2,
      "offsetY": -4,
    },
    {
      "path": "pieces/black-bishop.gltf", 
      "lights": [
        {"color": 0xffffff, "intesity": 3, "distance": 80, "x": 10, "y": 10, "z": 10},
      ],
      "radius": 9, 
      "height": 5,
      "offsetZ": 2,
      "offsetY": -4.5,
    },
    {
      "path": "pieces/black-rook.gltf", 
      "lights": [
        {"color": 0xffffff, "intesity": 3, "distance": 80, "x": 10, "y": 10, "z": 10},
      ],
      "radius": 8, 
      "height": 5,
      "offsetZ": 2,
      "offsetY": -4,
    },
    {
      "path": "pieces/black-pawn.gltf", 
      "lights": [
        {"color": 0xffffff, "intesity": 3, "distance": 80, "x": 10, "y": 10, "z": 10},
      ],
      "radius": 7, 
      "height": 5,
      "offsetZ": 2,
      "offsetY": -4,
    },
  ],
]

const fullWidth = window.innerWidth;
const fullHeight = window.innerHeight;
const viewWidth = window.innerWidth;
const viewHeight = window.innerHeight;
var navR = 0;
var navC = 0;
var isLoading = false;
var pageLoaded = false;
var lights = [];
var currentModel;
function switchModel(r,c) {
  if(isLoading) return;
  isLoading = true;

  // Remove previous lights from the scene and empty the array
  for (let light of lights) {
    scene.remove(light);
  }
  lights = [];

  // Remove the current model
  if (currentModel) {
    scene.remove(currentModel);
    currentModel.traverse(function(child) {
      if (child.isMesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
  }

  gltfLoader.load(`models/${models[r][c]["path"]}`, function(gltf) {
    console.log("loading gltf model")
    // adding the model to the scene
    currentModel = gltf.scene;
    scene.add(currentModel);
    // adding lights to scene
    for (let lightData of models[r][c]["lights"]) {
      const light = new THREE.PointLight(lightData["color"], lightData["intensity"], lightData["distance"]);
      light.position.set(lightData["x"], lightData["y"], lightData["z"]);
      lights.push(light);
      scene.add(light);
    }
    radius = models[r][c]["radius"];
    height = models[r][c]["height"];
    offsetZ = models[r][c]["offsetZ"];
    offsetY = models[r][c]["offsetY"];
    currentModel.position.set(offsetZ,offsetY,0);
    pageLoaded = true;
    isLoading = false;
  }, undefined, function(error) {
      console.error(error);
  });
}

switchModel(0,0);

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight);

function rgbToHex(r, g, b) {
  var redHex = r.toString(16).padStart(2, '0');
  var greenHex = g.toString(16).padStart(2, '0');
  var blueHex = b.toString(16).padStart(2, '0');
  return parseInt(redHex + greenHex + blueHex, 16);
}

// background
let backgrounds = {
  "space clouds": "space_clouds.jpg", 
  "mountain": "mountain.jpg",
  "falling lights": "falling_lights.jpg",
  "black": "white_background.jpeg",
  "night sky": "night_sky.jpg",
  "nebula": "nebula.jpg",
  "future_abstract": "future_abstract.jpg",
  "green blue nebula": "green_blue_nebula.jpg",
  "gold_abstract": "gold_abstract.jpg",
  "colors": "colors.jpg",
}
let keys = Object.keys(backgrounds);
let currentBackgroundIndex = 9;

let background_texture = new THREE.TextureLoader().load(`backgrounds/${backgrounds[keys[currentBackgroundIndex]]}`);
scene.background = background_texture;

// Listen to keydown event
window.addEventListener('keydown', function(event) {
  switch (event.key) {
    case 'ArrowRight':
      if (navC == models[navR].length - 1) {
        navC = 0;
      } else {
        navC++;
      }
      switchModel(navR,navC);
      break;
    case 'ArrowLeft':
      if (navC == 0) {
        navC = models[navR].length - 1;
      } else {
        navC--;
      }
      switchModel(navR,navC);
      break;
    case 'ArrowUp':
      if (navR == 0) {
        navR = models.length - 1;
      } else {
        navR--;
      }
      navC = 0;
      switchModel(navR,navC);
      break;
    case 'ArrowDown':
      if (navR == models.length - 1) {
        navR = 0;
      } else {
        navR++;
      }
      navC = 0;
      switchModel(navR,navC);
      break;
    case 'w':
      currentBackgroundIndex++;
      if (currentBackgroundIndex >= keys.length) {
        currentBackgroundIndex = 0;
      }
      break;
    case 's':
      currentBackgroundIndex--;
      if (currentBackgroundIndex < 0) {
        currentBackgroundIndex = keys.length - 1;
      }
      break;
  }
  let newBackgroundTexture = new THREE.TextureLoader().load(`backgrounds/${backgrounds[keys[currentBackgroundIndex]]}`);
  scene.background = newBackgroundTexture;
});

// downloading models
document.querySelector('.download-model-button').addEventListener('click', downloadModel);

function downloadModel() {
  const modelPath = `models/${models[navR][navC]["path"]}`;
  const a = document.createElement('a');
  a.href = modelPath;
  const modelName = modelPath.split('/').pop();
  a.download = modelName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// directional light
var pointLights = [];
function addPointLight(color, intensity, distance, position) {
  const pointLight = new THREE.PointLight(color, intensity, distance);
  pointLight.position.set(position.x, position.y, position.z);
  pointLights.push(pointLight);
  scene.add(pointLight);
}
function clearPointLights() {
  for (var light of pointLights) {
    scene.remove(light);
  }
  pointLights = [];
}

// main loop
let spin = false;
let height = 0;
let angle = 0;
let radius = 0;
let offsetZ = 0;
let offsetY = 0;
function stopSpin() {
  spin = false;
}
function startSpin() {
  spin = true;
}
startSpin();
function animate() {
  
  if (spin && pageLoaded) {
    camera.position.set(0 , height, radius);
    camera.lookAt(0,0,0)
    currentModel.rotation.y += 0.003;
  }
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);