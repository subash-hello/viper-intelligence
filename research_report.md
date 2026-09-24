# Comprehensive Three.js 3D Indoor Architecture & Immersive Web Engineering Report

---

## 1. Executive Summary & Industry Showcase

Interactive 3D web environments have evolved from simple model viewers into fully immersive, real-time spatial applications. In architectural visualization, real estate virtual tours, and interactive web experiences, **Three.js** serves as the gold standard WebGL rendering engine.

### Benchmark Examples of 3D Architectural & Interior Websites
1. **Seashore House (by Neotix)**: A premier real-time architectural visualization experience showcasing dynamic sun position/lighting adjustments, baked ambient occlusion, and post-processing depth of field.
2. **IKEA Place & Interactive Room Planners**: Utilize WebXR and Three.js raycasting to allow drag-and-drop placement of furniture in realistic room bounding boxes.
3. **Shapespark Virtual Tours**: Industrial-grade browser walkthrough engine generating lightmaps and baked radiance transfer for photorealistic interior rendering.
4. **House of Gucci / Digital Showrooms**: Immersive first-person virtual galleries utilizing custom shaders, collision boundaries, and interactive hotspot triggers.
5. **Bruno Simon Portfolio**: Demonstrates custom physics-driven navigation, vehicle interaction, and procedural level design in Three.js.

---

## 2. Three.js CDN Specifications & Import Map Setup

### Recommended Version
- **Latest Stable Release**: `0.174.0` (or latest revision r174+)
- **CDN Provider**: **jsDelivr** (preferred for global edge caching and reliability) or **unpkg**.
- **Module Format**: **ES Modules (ESM)** coupled with native browser **Import Maps**.

> [!IMPORTANT]
> Always pin the exact version number (e.g., `@0.174.0`). Never use `@latest` in production to prevent unexpected API breaking changes when Three.js updates monthly.

### Production Boilerplate `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Three.js Immersive 3D Indoor Environment</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body, html { width: 100%; height: 100%; overflow: hidden; background-color: #050508; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    #canvas-container { width: 100vw; height: 100vh; display: block; }
    
    #instructions-overlay {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(10, 15, 25, 0.85); backdrop-filter: blur(8px);
      display: flex; flex-direction: column; justify-content: center; align-items: center;
      color: #ffffff; text-align: center; z-index: 10; cursor: pointer; transition: opacity 0.3s ease;
    }
    #instructions-card {
      background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 40px 60px; border-radius: 16px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
    }
    #instructions-card h1 { font-size: 2rem; margin-bottom: 12px; color: #00e5ff; letter-spacing: 1px; }
    #instructions-card p { font-size: 1rem; color: #cbd5e1; margin-bottom: 8px; }
    .key-badge { background: #334155; padding: 2px 8px; border-radius: 4px; border: 1px solid #475569; font-weight: bold; font-family: monospace; }
  </style>

  <!-- Import Map for Resolving Three.js and Addons -->
  <script type="importmap">
    {
      "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@0.174.0/build/three.module.js",
        "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.174.0/examples/jsm/"
      }
    }
  </script>
</head>
<body>
  <div id="instructions-overlay">
    <div id="instructions-card">
      <h1>ENTER 3D INDOOR ENVIRONMENT</h1>
      <p>Click anywhere to lock pointer controls</p>
      <p><span class="key-badge">W</span> <span class="key-badge">A</span> <span class="key-badge">S</span> <span class="key-badge">D</span> to Walk &nbsp;|&nbsp; <span class="key-badge">Mouse</span> to Look Around</p>
      <p><span class="key-badge">Click</span> on Doors, Monitors, and Servers to Interact</p>
    </div>
  </div>

  <div id="canvas-container"></div>

  <script type="module" src="main.js"></script>
</body>
</html>
```

---

## 3. First-Person Navigation with `PointerLockControls` & WASD Movement

First-person navigation requires capturing mouse movements via the browser `PointerLock` API and processing velocity-based keyboard movements on every frame.

### Code Implementation (`navigation.js`)
```javascript
import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

export class FirstPersonNavigation {
  constructor(camera, domElement, overlayElement) {
    this.camera = camera;
    this.controls = new PointerLockControls(camera, domElement);
    this.overlay = overlayElement;

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;

    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.prevTime = performance.now();
    this.speed = 45.0; // Acceleration scalar

    this.initListeners();
  }

  initListeners() {
    this.overlay.addEventListener('click', () => {
      this.controls.lock();
    });

    this.controls.addEventListener('lock', () => {
      this.overlay.style.opacity = '0';
      setTimeout(() => { this.overlay.style.display = 'none'; }, 300);
    });

    this.controls.addEventListener('unlock', () => {
      this.overlay.style.display = 'flex';
      this.overlay.style.opacity = '1';
    });

    document.addEventListener('keydown', (e) => this.onKeyDown(e));
    document.addEventListener('keyup', (e) => this.onKeyUp(e));
  }

  onKeyDown(event) {
    switch (event.code) {
      case 'KeyW': case 'ArrowUp': this.moveForward = true; break;
      case 'KeyA': case 'ArrowLeft': this.moveLeft = true; break;
      case 'KeyS': case 'ArrowDown': this.moveBackward = true; break;
      case 'KeyD': case 'ArrowRight': this.moveRight = true; break;
    }
  }

  onKeyUp(event) {
    switch (event.code) {
      case 'KeyW': case 'ArrowUp': this.moveForward = false; break;
      case 'KeyA': case 'ArrowLeft': this.moveLeft = false; break;
      case 'KeyS': case 'ArrowDown': this.moveBackward = false; break;
      case 'KeyD': case 'ArrowRight': this.moveRight = false; break;
    }
  }

  update() {
    if (!this.controls.isLocked) return;

    const time = performance.now();
    const delta = (time - this.prevTime) / 1000;
    this.prevTime = time;

    // Apply friction / damping
    this.velocity.x -= this.velocity.x * 10.0 * delta;
    this.velocity.z -= this.velocity.z * 10.0 * delta;

    this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
    this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
    this.direction.normalize(); // Equalize diagonal strafing speed

    if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * this.speed * delta;
    if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * this.speed * delta;

    // Apply translation to camera
    this.controls.moveRight(-this.velocity.x * delta);
    this.controls.moveForward(-this.velocity.z * delta);
  }
}
```

---

## 4. Building Indoor Environments (Walls, Floors, Ceilings, Doors)

Creating structured architectural spaces in Three.js involves defining wall segments, floors, and door frames using `BoxGeometry`, setting origin pivots on door hinges, and applying procedural repeat textures.

```javascript
import * as THREE from 'three';

export function createIndoorArchitecture() {
  const roomGroup = new THREE.Group();

  // Material Palette
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xeeefef,
    roughness: 0.85,
    metalness: 0.05
  });

  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x3d271d,
    roughness: 0.35,
    metalness: 0.1
  });

  const ceilingMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.95
  });

  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.5
  });

  // Room Dimensions (Meters)
  const width = 12;
  const height = 3.5;
  const depth = 16;
  const wallThickness = 0.2;

  // 1. Floor & Ceiling
  const floor = new THREE.Mesh(new THREE.BoxGeometry(width, wallThickness, depth), floorMaterial);
  floor.position.set(0, -wallThickness / 2, 0);
  floor.receiveShadow = true;
  roomGroup.add(floor);

  const ceiling = new THREE.Mesh(new THREE.BoxGeometry(width, wallThickness, depth), ceilingMaterial);
  ceiling.position.set(0, height + wallThickness / 2, 0);
  ceiling.receiveShadow = true;
  roomGroup.add(ceiling);

  // 2. Peripheral Walls
  // Back Wall
  const backWall = new THREE.Mesh(new THREE.BoxGeometry(width, height, wallThickness), wallMaterial);
  backWall.position.set(0, height / 2, -depth / 2);
  backWall.castShadow = backWall.receiveShadow = true;
  roomGroup.add(backWall);

  // Left Wall
  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, height, depth), wallMaterial);
  leftWall.position.set(-width / 2, height / 2, 0);
  leftWall.castShadow = leftWall.receiveShadow = true;
  roomGroup.add(leftWall);

  // Right Wall
  const rightWall = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, height, depth), wallMaterial);
  rightWall.position.set(width / 2, height / 2, 0);
  rightWall.castShadow = rightWall.receiveShadow = true;
  roomGroup.add(rightWall);

  // 3. Interactive Doorway Setup
  const doorWidth = 1.4;
  const doorHeight = 2.6;
  const doorThickness = 0.08;

  // Door Hinge Pivot Group
  const doorHingeGroup = new THREE.Group();
  // Place pivot at the exact hinge position on the wall frame
  doorHingeGroup.position.set(-2, 0, depth / 2 - wallThickness / 2);

  const doorMesh = new THREE.Mesh(
    new THREE.BoxGeometry(doorWidth, doorHeight, doorThickness),
    new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.4, metalness: 0.1 })
  );
  // Offset mesh inside the group so rotation occurs around the left edge
  doorMesh.position.set(doorWidth / 2, doorHeight / 2, 0);
  doorMesh.castShadow = doorMesh.receiveShadow = true;
  doorMesh.name = "interactive_door";
  doorMesh.userData = { isOpen: false };

  doorHingeGroup.add(doorMesh);
  roomGroup.add(doorHingeGroup);

  return { roomGroup, doorHingeGroup, doorMesh };
}
```

---

## 5. Realistic PBR Materials & Lighting Setup

For realistic indoor spaces, proper selection of physically-based materials (`MeshStandardMaterial` or `MeshPhysicalMaterial`) combined with balanced lights (Ambient, Point, Spot, RectArea) is mandatory.

```javascript
import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

export function setupLighting(scene) {
  // 1. Soft Ambient Background Lighting
  const ambientLight = new THREE.AmbientLight(0xf0f4f8, 0.4);
  scene.add(ambientLight);

  // 2. Ceiling Recessed Spotlights
  const spotLight = new THREE.SpotLight(0xfffaed, 12.0);
  spotLight.position.set(0, 3.4, 0);
  spotLight.angle = Math.PI / 3;
  spotLight.penumbra = 0.6;
  spotLight.decay = 2;
  spotLight.distance = 15;
  spotLight.castShadow = true;
  
  // Shadow Quality Settings
  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 2048;
  spotLight.shadow.bias = -0.0001;
  spotLight.shadow.radius = 4; // Soft shadows
  scene.add(spotLight);

  // 3. Warm Desk Lamp Point Light
  const deskPointLight = new THREE.PointLight(0xffaa44, 4.0, 6, 2);
  deskPointLight.position.set(-3.0, 1.35, -4.0);
  deskPointLight.castShadow = true;
  deskPointLight.shadow.mapSize.width = 1024;
  deskPointLight.shadow.mapSize.height = 1024;
  scene.add(deskPointLight);

  // 4. Server Room Blue Ambient Glow
  const serverPointLight = new THREE.PointLight(0x00d2ff, 5.0, 5, 2);
  serverPointLight.position.set(3.5, 1.6, -4.0);
  scene.add(serverPointLight);

  // 5. Rectangular Window Light (Simulating Exterior Daylight)
  const rectLight = new THREE.RectAreaLight(0xdbeafe, 8.0, 4.0, 2.5);
  rectLight.position.set(0, 2.0, 7.9);
  rectLight.rotation.y = Math.PI;
  scene.add(rectLight);
}
```

---

## 6. Procedural 3D Furniture & Equipment Generation

Creating procedural furniture allows instant loading without external asset dependencies.

### Procedural Furniture Code Module (`furniture.js`)
```javascript
import * as THREE from 'three';

export function generateOfficeFurniture() {
  const container = new THREE.Group();

  const darkWood = new THREE.MeshStandardMaterial({ color: 0x2b1810, roughness: 0.4, metalness: 0.1 });
  const brushedMetal = new THREE.MeshStandardMaterial({ color: 0x22262d, roughness: 0.25, metalness: 0.85 });
  const fabricDark = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.85 });
  const screenGlass = new THREE.MeshStandardMaterial({ color: 0x050b14, roughness: 0.1, metalness: 0.9 });
  const screenEmissive = new THREE.MeshBasicMaterial({ color: 0x00e5ff });

  // ==========================================
  // 1. MODERN EXECUTIVE DESK
  // ==========================================
  const deskGroup = new THREE.Group();
  
  // Table Top
  const tableTop = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 1.2), darkWood);
  tableTop.position.set(0, 0.74, 0);
  tableTop.castShadow = tableTop.receiveShadow = true;
  deskGroup.add(tableTop);

  // Metal Legs (U-Frame)
  const legGeo = new THREE.BoxGeometry(0.08, 0.74, 1.1);
  const leftLeg = new THREE.Mesh(legGeo, brushedMetal);
  leftLeg.position.set(-1.1, 0.37, 0);
  leftLeg.castShadow = true;
  
  const rightLeg = new THREE.Mesh(legGeo, brushedMetal);
  rightLeg.position.set(1.1, 0.37, 0);
  rightLeg.castShadow = true;

  deskGroup.add(leftLeg, rightLeg);
  deskGroup.position.set(-3.0, 0, -4.0);
  container.add(deskGroup);

  // ==========================================
  // 2. ERGONOMIC SWIVEL CHAIR
  // ==========================================
  const chairGroup = new THREE.Group();

  // Seat Cushion
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.08, 0.55), fabricDark);
  seat.position.set(0, 0.48, 0);
  seat.castShadow = true;
  chairGroup.add(seat);

  // Backrest
  const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.65, 0.06), fabricDark);
  backrest.position.set(0, 0.82, -0.25);
  backrest.castShadow = true;
  chairGroup.add(backrest);

  // Stem & Star Base
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.4), brushedMetal);
  stem.position.set(0, 0.22, 0);
  chairGroup.add(stem);

  for (let i = 0; i < 5; i++) {
    const angle = (i * Math.PI * 2) / 5;
    const baseRay = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.04, 0.05), brushedMetal);
    baseRay.position.set(Math.cos(angle) * 0.14, 0.04, Math.sin(angle) * 0.14);
    baseRay.rotation.y = -angle;
    chairGroup.add(baseRay);
  }

  chairGroup.position.set(-3.0, 0, -2.8);
  container.add(chairGroup);

  // ==========================================
  // 3. CURVED MONITOR & WORKSTATION
  // ==========================================
  const monitorGroup = new THREE.Group();

  // Monitor Frame
  const monitorBezel = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.55, 0.04), screenGlass);
  monitorBezel.position.set(0, 1.1, 0);
  monitorBezel.castShadow = true;
  monitorGroup.add(monitorBezel);

  // Emissive Display Screen Surface
  const screenSurface = new THREE.Mesh(new THREE.PlaneGeometry(0.96, 0.51), screenEmissive);
  screenSurface.position.set(0, 1.1, 0.021);
  screenSurface.name = "interactive_monitor";
  screenSurface.userData = { title: "Command Workstation Terminal", status: "Active" };
  monitorGroup.add(screenSurface);

  // Stand Arm & Base
  const standArm = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.35), brushedMetal);
  standArm.position.set(0, 0.95, -0.06);
  const standBase = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.015, 0.22), brushedMetal);
  standBase.position.set(0, 0.78, -0.02);
  monitorGroup.add(standArm, standBase);

  monitorGroup.position.set(-3.0, 0, -4.0);
  container.add(monitorGroup);

  // ==========================================
  // 4. INDUSTRIAL SERVER RACK CABINET
  // ==========================================
  const serverGroup = new THREE.Group();
  const rackBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 2.4, 1.0),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.9 })
  );
  rackBody.position.set(0, 1.2, 0);
  rackBody.castShadow = rackBody.receiveShadow = true;
  rackBody.name = "interactive_server";
  rackBody.userData = { title: "Mainframe Server Bay #01", load: "24%" };
  serverGroup.add(rackBody);

  // Status LED Lights
  const ledGeo = new THREE.SphereGeometry(0.018, 12, 12);
  const ledGreen = new THREE.MeshBasicMaterial({ color: 0x10b981 });
  const ledBlue = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
  const ledRed = new THREE.MeshBasicMaterial({ color: 0xef4444 });

  for (let y = 0.3; y < 2.2; y += 0.12) {
    const m1 = new THREE.Mesh(ledGeo, ledGreen);
    m1.position.set(-0.38, y, 0.51);
    const m2 = new THREE.Mesh(ledGeo, Math.random() > 0.15 ? ledBlue : ledRed);
    m2.position.set(-0.32, y, 0.51);
    serverGroup.add(m1, m2);
  }

  serverGroup.position.set(4.0, 0, -4.5);
  container.add(serverGroup);

  return container;
}
```

---

## 7. Raycasting for Click Detection & Smooth Door Animations

Raycasting allows interactive selection of objects directly along the camera's line of sight.

```javascript
import * as THREE from 'three';

export class InteractionManager {
  constructor(camera, scene, doorHingeGroup) {
    this.camera = camera;
    this.scene = scene;
    this.doorHingeGroup = doorHingeGroup;
    this.raycaster = new THREE.Raycaster();
    this.centerVector = new THREE.Vector2(0, 0); // Always pointer lock center
    
    this.isAnimatingDoor = false;

    window.addEventListener('click', () => this.onClick());
  }

  onClick() {
    this.raycaster.setFromCamera(this.centerVector, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    if (intersects.length > 0) {
      const target = intersects[0].object;
      console.log('Raycast hit target:', target.name, target.userData);

      if (target.name === 'interactive_door') {
        this.toggleDoor(target);
      } else if (target.name === 'interactive_monitor') {
        alert(`[TERMINAL INTERACTION]\nTitle: ${target.userData.title}\nStatus: ${target.userData.status}`);
      } else if (target.name === 'interactive_server') {
        alert(`[SERVER RACK BAY]\nTitle: ${target.userData.title}\nCurrent Load: ${target.userData.load}`);
      }
    }
  }

  toggleDoor(doorMesh) {
    if (this.isAnimatingDoor) return;
    this.isAnimatingDoor = true;

    const isOpen = doorMesh.userData.isOpen;
    const targetAngle = isOpen ? 0 : Math.PI / 2; // 90 degree rotation
    const startAngle = this.doorHingeGroup.rotation.y;
    
    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = () => {
      const now = performance.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1.0);
      
      // Smooth Cubic Ease-Out curve
      const ease = 1 - Math.pow(1 - progress, 3);

      this.doorHingeGroup.rotation.y = startAngle + (targetAngle - startAngle) * ease;

      if (progress < 1.0) {
        requestAnimationFrame(animate);
      } else {
        doorMesh.userData.isOpen = !isOpen;
        this.isAnimatingDoor = false;
      }
    };

    animate();
  }
}
```

---

## 8. 3D Text & Overlay Labels (`CSS2DRenderer` & Dynamic Text)

`CSS2DRenderer` creates HTML labels linked to 3D spatial coordinates.

```javascript
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

export function setupCSS2DLabels(scene) {
  // 1. Initialize CSS2DRenderer
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';
  labelRenderer.domElement.style.pointerEvents = 'none'; // Critical: allow canvas clicks
  document.body.appendChild(labelRenderer.domElement);

  // 2. Helper to attach label to 3D Position
  const addLabel = (text, position) => {
    const div = document.createElement('div');
    div.className = 'label-tag';
    div.style.background = 'rgba(15, 23, 42, 0.9)';
    div.style.color = '#38bdf8';
    div.style.border = '1px solid #0284c7';
    div.style.padding = '4px 10px';
    div.style.borderRadius = '6px';
    div.style.fontSize = '12px';
    div.style.fontFamily = 'monospace';
    div.style.boxShadow = '0 0 12px rgba(56, 189, 248, 0.3)';
    div.textContent = text;

    const cssObject = new CSS2DObject(div);
    cssObject.position.copy(position);
    scene.add(cssObject);
  };

  // Label Positions
  addLabel("COMMAND TERMINAL [CLICK]", new THREE.Vector3(-3.0, 1.6, -4.0));
  addLabel("MAINFRAME RACK [CLICK]", new THREE.Vector3(4.0, 2.5, -4.5));
  addLabel("MAIN ENTRANCE DOOR", new THREE.Vector3(-1.3, 2.8, 7.8));

  return labelRenderer;
}
```

---

## 9. Performance Optimization Techniques for Complex 3D Indoor Scenes

When rendering detailed architectural environments, maintaining a stable 60 FPS requires memory management and draw-call reduction strategies.

| Optimization Technique | Implementation Strategy | Impact |
| :--- | :--- | :--- |
| **`InstancedMesh`** | Replace individual geometry duplicates (chairs, lights, wall brackets) with a single `InstancedMesh`. | Reduces 500+ draw calls down to 1 single draw call. |
| **Shadow Map Budgeting** | Limit shadow-casting lights to 1-2 primary point/spotlights. Disable shadow casting on small detailed sub-meshes. | Decreases frame rendering time by up to 60%. |
| **Pixel Ratio Capping** | Limit renderer pixel ratio: `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`. | Prevents 4K screens from over-rendering. |
| **Frustum Culling** | Ensure `mesh.frustumCulled = true` (default in Three.js) for off-screen room objects. | Saves GPU processing for invisible objects. |
| **Geometry & Material Disposal** | Call `.dispose()` on geometries, materials, and textures when removing rooms dynamically. | Prevents WebGL memory leaks. |
| **Bake Lighting / AO Maps** | Bake static lighting and ambient occlusion in Blender into texture maps instead of relying on real-time lights. | Dramatically improves visual realism while keeping light count low. |

---

## 10. Free 3D Model CDN Sources & Asset Repositories

When integrating pre-built 3D models (GLTF / GLB format) via CDN, the following repositories are recommended:

1. **Khronos glTF Sample Assets**:
   - **CDN URL Format**: `https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/<ModelName>/glTF-Binary/<ModelName>.glb`
   - **Description**: Standard, validated PBR models (DamagedHelmet, Lantern, Corset).
2. **Three.js Examples Model Repository**:
   - **CDN URL Format**: `https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/`
   - **Description**: Lightweight models (Parrot, Shadower, Michelle, WoodenChair).
3. **Poly Haven (CC0 Free Assets)**:
   - **Website**: [polyhaven.com](https://polyhaven.com)
   - **Description**: High-quality CC0 3D models, PBR textures, and HDRIs for environment backgrounds.

### GLTFLoader CDN Integration Snippet
```javascript
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const modelUrl = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/DamagedHelmet/DamagedHelmet.glb';

loader.load(
  modelUrl,
  (gltf) => {
    const model = gltf.scene;
    model.position.set(0, 1.2, -2.0);
    model.scale.set(0.5, 0.5, 0.5);
    scene.add(model);
  },
  (xhr) => {
    console.log(`Loading GLTF Model: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`);
  },
  (error) => {
    console.error('GLTF Loading Error:', error);
  }
);
```

---

## 11. Complete Integration Main Application Script (`main.js`)

Below is the complete single-entry orchestrator that ties all modules together into a running 3D scene.

```javascript
import * as THREE from 'three';
import { FirstPersonNavigation } from './navigation.js';
import { createIndoorArchitecture } from './architecture.js';
import { setupLighting } from './lighting.js';
import { generateOfficeFurniture } from './furniture.js';
import { InteractionManager } from './interaction.js';
import { setupCSS2DLabels } from './labels.js';

// 1. Setup Scene, Camera, Renderer
const container = document.getElementById('canvas-container');
const overlay = document.getElementById('instructions-overlay');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0f19);
scene.fog = new THREE.FogExp2(0x0a0f19, 0.035);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.7, 5); // Eye-level height (1.7 meters)

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
container.appendChild(renderer.domElement);

// 2. Initialize Subsystems
const navigation = new FirstPersonNavigation(camera, renderer.domElement, overlay);
const { roomGroup, doorHingeGroup } = createIndoorArchitecture();
scene.add(roomGroup);

setupLighting(scene);

const furniture = generateOfficeFurniture();
scene.add(furniture);

const interactionManager = new InteractionManager(camera, scene, doorHingeGroup);
const labelRenderer = setupCSS2DLabels(scene);

// 3. Window Resize Handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
});

// 4. Main Animation Loop
function animate() {
  requestAnimationFrame(animate);

  navigation.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

animate();
```
