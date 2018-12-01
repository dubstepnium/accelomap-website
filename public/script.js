const socket = io();

socket.on('message', function() {
  console.log('testing');
});

// three.js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 5, 10, 2 );
spotLight.rotation.set( 0, -1, 0 );
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 100;
spotLight.shadow.camera.fov = 100;
scene.add( spotLight );

var controls = new THREE.OrbitControls( camera );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 5;

function createCube(x, y, z) {
  var geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
  var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  cube.position.set(x, y, z);
}

createCube(0, 0, 0);
createCube(1, 0, 0);
createCube(0, 1, 0);
createCube(0, 0, 1);
createCube(1, 1, 0);
createCube(0, 1, 1);
createCube(1, 0, 1);
createCube(1, 1, 1);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
