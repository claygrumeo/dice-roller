/***********************
 * 3D Dice - JS *
 ***********************
 * This JS implements Three.js to get 3D models of dice shapes.
 * The user will be able to interact with the dice for fun with their mouse.
 * When the user selects different types of dice, the 3D model should change to
 * show the shape of the selected die.
 * There is special treatment for D100 as it will show 2 D10 since that's how you
 * roll it in a game, and it looks better than a 100-sided polyhedron.
 */
import { Controller } from "@hotwired/stimulus";
import * as THREE from "three";
import { Mesh } from "three";
// import TrackballControls from "three/trackballcontrols";
import TrackballControls from "https://cdn.jsdelivr.net/npm/three-trackballcontrols@0.9.0/index.min.js";

// Connects to data-controller="threejs"
export default class extends Controller {
  connect() {
    // Calculate a reasonable width for the 3D canvas
    let tempWidth = window.innerWidth / 2;
    if (window.innerWidth / 2 > 900) {
      tempWidth = 400;
    }

    // Create a scene and camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      tempWidth / (window.innerHeight / 2),
      0.1,
      1000
    );
    this.camera.position.z = 2;

    // Create the renderer with transparency
    this.renderer = new THREE.WebGL1Renderer({ alpha: true, antialias: true });

    this.renderer.setSize(tempWidth, window.innerHeight / 2);
    this.renderer.setPixelRatio();

    // Grab the element where the canvas will be appended
    this.threeMain = document.getElementById("three-main");
    this.threeMain.appendChild(this.renderer.domElement);

    // Create all the different geometries that are needed
    this.d4geometry = new THREE.TetrahedronGeometry(0.75);
    this.d6geometry = new THREE.BoxGeometry();
    this.d8geometry = new THREE.OctahedronGeometry(0.75);
    this.d10geometry = this.getD10Geometry(0.75);
    this.d12geometry = new THREE.DodecahedronGeometry(0.75);
    this.d20geometry = new THREE.IcosahedronGeometry(0.75);
    this.d100geometry = this.getD10Geometry(0.4);
    // Create the material
    this.material = new THREE.MeshPhongMaterial({
      color: 0xfca33a,
      shininess: 1,
      transparent: true,
      opacity: 0.75,
    });

    // Create a light source
    this.light = new THREE.PointLight(0xffffff, 1.5, 100);
    this.light.position.set(0, 0, 10);

    // Create the controls that allow you to interact with the shapes
    this.controls = new TrackballControls(
      this.camera,
      this.renderer.domElement
    );
    // Disable zoom and pan functionality
    this.controls.noPan = true;
    this.controls.noZoom = true;
    this.controls.rotateSpeed = 5;

    // Create an array to store all the selected radio buttons
    this.radioGroup = [];

    // Create event listeners for the radio buttons that will change the
    // model shown
    this.d4Radio = document.getElementById("type_D4");
    this.radioGroup.push(this.d4Radio);
    this.d4Radio.addEventListener("click", () => {
      this.setShape(this.d4geometry);
    });
    this.d6Radio = document.getElementById("type_D6");
    this.radioGroup.push(this.d6Radio);
    this.d6Radio.addEventListener("click", () => {
      this.setShape(this.d6geometry);
    });
    this.d8Radio = document.getElementById("type_D8");
    this.radioGroup.push(this.d8Radio);
    this.d8Radio.addEventListener("click", () => {
      this.setShape(this.d8geometry);
    });
    this.d10Radio = document.getElementById("type_D10");
    this.radioGroup.push(this.d10Radio);
    this.d10Radio.addEventListener("click", () => {
      this.setShape(this.d10geometry);
    });
    this.d12Radio = document.getElementById("type_D12");
    this.radioGroup.push(this.d12Radio);
    this.d12Radio.addEventListener("click", () => {
      this.setShape(this.d12geometry);
    });
    this.d20Radio = document.getElementById("type_D20");
    this.radioGroup.push(this.d20Radio);
    this.d20Radio.addEventListener("click", () => {
      this.setShape(this.d20geometry);
    });
    this.d100Radio = document.getElementById("type_D100");
    this.radioGroup.push(this.d100Radio);
    this.d100Radio.addEventListener("click", () => {
      this.setShape(this.d100geometry, true);
    });

    // Determine which radio is currently checked and load that shape
    this.loadSelection();

    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.originShape.rotation.x += 0.01;
    this.originShape.rotation.y += 0.01;
    if (this.secondShape != null) {
      this.secondShape.rotation.x += 0.01;
      this.secondShape.rotation.y += 0.01;
    }

    this.controls.update();
    this.light.position.copy(this.camera.position);

    this.renderer.render(this.scene, this.camera);
  }

  // D10 is hard to make, I found and adapted a tutorial for this here:
  // https://aqandrew.com/blog/10-sided-die-react/
  getD10Geometry(rad) {
    const sides = 10;
    const radius = rad;
    const vertices = [
      [0, 0, 1],
      [0, 0, -1],
    ].flat();

    // https://github.com/byWulf/threejs-dice/blob/master/lib/dice.js#L499
    for (let i = 0; i < sides; ++i) {
      const b = (i * Math.PI * 2) / sides;
      vertices.push(-Math.cos(b), -Math.sin(b), 0.105 * (i % 2 ? 1 : -1));
    }

    const faces = [
      [0, 2, 3],
      [0, 3, 4],
      [0, 4, 5],
      [0, 5, 6],
      [0, 6, 7],
      [0, 7, 8],
      [0, 8, 9],
      [0, 9, 10],
      [0, 10, 11],
      [0, 11, 2],
      [1, 3, 2],
      [1, 4, 3],
      [1, 5, 4],
      [1, 6, 5],
      [1, 7, 6],
      [1, 8, 7],
      [1, 9, 8],
      [1, 10, 9],
      [1, 11, 10],
      [1, 2, 11],
    ].flat();
    const args = [vertices, faces, radius, 0];
    const pentagonalTrapezohedronGeometry = new THREE.PolyhedronGeometry(
      vertices,
      faces,
      radius,
      0
    );
    return pentagonalTrapezohedronGeometry;
  }

  // Given coordinates and geometry, create the mesh and add the object
  // to the scene.
  createObject(x, y, z, geometry) {
    const geomesh = new THREE.Mesh(geometry, this.material);
    geomesh.position.set(x, y, z);
    this.scene.add(geomesh);

    // Create a wireframe around the mesh
    const wf = new THREE.WireframeGeometry(geometry);
    const edges = new THREE.LineSegments(wf);
    edges.material.color.setHex(0xa88407);

    geomesh.add(edges);
    return geomesh;
  }

  // This function is meant to find which radio button is selected
  loadSelection() {
    // Find which radio button is selected
    let foundID = "";
    this.radioGroup.forEach((radio) => {
      if (radio.hasAttribute("checked")) {
        foundID = radio.id;
      }
    });

    // Based on the found ID, set the corresponding geometry
    let geo = {};
    switch (foundID) {
      case "type_D4":
        geo = this.d4geometry;
        break;
      case "type_D6":
        geo = this.d6geometry;
        break;
      case "type_D8":
        geo = this.d8geometry;
        break;
      case "type_D10":
        geo = this.d10geometry;
        break;
      case "type_D12":
        geo = this.d12geometry;
        break;
      case "type_D20":
        geo = this.d20geometry;
        break;
      case "type_D100":
        geo = this.d100geometry;
        break;
    }

    this.setShape(geo, foundID == "type_D100");
  }

  // To be DRY, this will set a new shape to the canvas
  setShape(geometry, d100 = false) {
    this.scene.children = [];
    if (d100) {
      this.originShape = this.createObject(0.5, 0, 0, this.d100geometry);
      this.secondShape = this.createObject(-0.5, 0, 0, this.d100geometry);
      this.scene.add(this.originShape, this.light);
      this.scene.add(this.secondShape, this.light);
    } else {
      this.originShape = this.createObject(0, 0, 0, geometry);
      this.scene.add(this.originShape, this.light);
    }
  }
}
