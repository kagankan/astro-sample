import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import cameraMove from '@/assets/models/camera_move.glb';
import dollObject from '@/assets/models/doll.glb';

// モデルを読み込む
const loader = new GLTFLoader();
const modelDoll = await loader.loadAsync(dollObject);
modelDoll.scene.position.set(-2.5, 0, -2.5); // 位置調整
const modelCameraMove = await loader.loadAsync(cameraMove);
modelCameraMove.scene.scale.set(0.5, 0.5, 0.5); // 大きさ調整

// 通常のカメラ
// camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
// camera.position.set(0, 0.8, 2.7);

// Blenderから出力したカメラを使う
// https://discourse.threejs.org/t/how-do-i-load-the-camera-from-blender/26464/5
const camera = modelCameraMove.cameras[0] as THREE.PerspectiveCamera;
const scene = new THREE.Scene();
let renderer: THREE.WebGLRenderer;

// アニメーションミキサー（？）
const mixerCameraMove = new THREE.AnimationMixer(modelCameraMove.scene);
const clipsCameraMove = modelCameraMove.animations;
const clipCameraMove = THREE.AnimationClip.findByName(clipsCameraMove, 'CameraAction');
const actionCameraMove = mixerCameraMove.clipAction(clipCameraMove);
actionCameraMove.play();
scene.add(modelCameraMove.scene);

const mixerDoll = new THREE.AnimationMixer(modelDoll.scene);
const clipsDoll = modelDoll.animations;
const clipDoll = THREE.AnimationClip.findByName(clipsDoll, 'Waving');
const actionDoll = mixerDoll.clipAction(clipDoll);
actionDoll.play();
scene.add(modelDoll.scene);

const clock = new THREE.Clock();
let delta = 0;
// フレームレート調整
// https://stackoverflow.com/questions/11285065/limiting-framerate-in-three-js-to-increase-performance-requestanimationframe
const INTERVAL = 1 / 20;

const render = () => {
  delta += clock.getDelta();
  if (delta < INTERVAL) return;
  console.log(delta);
  mixerCameraMove.update(delta * 0.2);
  mixerDoll.update(delta);
  renderer.render(scene, camera);

  delta = delta % INTERVAL;
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const init = () => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  // camera.far = 10;
  console.log(camera.near);
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
  onWindowResize();
  renderer.setAnimationLoop(render);

  window.addEventListener('resize', onWindowResize);
};

init();
