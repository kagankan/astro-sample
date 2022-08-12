import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import dollObject from '@/assets/objects/doll.glb';
import cameraMove from '@/assets/objects/camera_move.glb';
// console.log(dollObject);
// モデルを読み込む
const loader = new GLTFLoader();
const model = await loader.loadAsync(cameraMove); // GLTFファイルをURLで指定する
// model.scene.scale.set(0.25, 0.25, 0.25); // 大きさ調整

// 通常のカメラ
// camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
// camera.position.set(0, 0.8, 2.7);

// Blenderから出力したカメラを使う
// https://discourse.threejs.org/t/how-do-i-load-the-camera-from-blender/26464/5
const camera = model.cameras[0] as THREE.PerspectiveCamera;
let scene: THREE.Scene, renderer: THREE.WebGLRenderer;

// アニメーションミキサー（？）
const mixer = new THREE.AnimationMixer(model.scene);
const clips = model.animations;
// const clip = THREE.AnimationClip.findByName(clips, 'Waving');
const clip = THREE.AnimationClip.findByName(clips, 'CameraAction');
const action = mixer.clipAction(clip);
action.play();
const clock = new THREE.Clock();

init();
render();

function init() {
  const container = document.createElement('div');
  document.body.appendChild(container);

  scene = new THREE.Scene();
  scene.add(model.scene);
  console.log(camera.near);
  camera.far = 10;
  console.log(camera.far);
  // 環境光源 (光源が無いとモデルが真っ黒になるので必要)
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);

  // 平行光源 (太陽を模した光源。この光源が無いと、のっぺりしてしまう)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(5, 5, 0);
  scene.add(ambientLight); // 環境光源をシーンに追加
  scene.add(directionalLight); // 並行光源をシーンに追加
  scene.background = new THREE.Color('#ff9999');

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);
  renderer.setAnimationLoop(render);

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// let delta = 0;
// const INTERVAL = 1 / 30;// 30 fps

function render() {
  const SPEED = 0.5;
  const deltaValue = clock.getDelta();
  console.log(deltaValue);
  mixer.update(deltaValue * SPEED);
  renderer.render(scene, camera);
}
