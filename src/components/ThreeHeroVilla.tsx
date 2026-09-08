import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { HOTSPOTS, GALLERY_ITEMS } from '../data/mockData';
import { Hotspot, GalleryItem } from '../types';
import {
  Sun,
  Moon,
  Sunset,
  Compass,
  Layers,
  Eye,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Box,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2
} from 'lucide-react';

interface ThreeHeroVillaProps {
  onSelectHotspot: (hotspot: Hotspot) => void;
  selectedHotspot: Hotspot | null;
  onSelectGalleryItem?: (item: GalleryItem) => void;
  theme?: 'light' | 'dark';
}

export type LightingMode = 'day' | 'sunset' | 'night';
export type HeroMode = '3d' | 'photo';

export const ThreeHeroVilla: React.FC<ThreeHeroVillaProps> = ({
  onSelectHotspot,
  selectedHotspot,
  onSelectGalleryItem,
  theme = 'dark'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [heroMode, setHeroMode] = useState<HeroMode>('3d');
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [lightingMode, setLightingMode] = useState<LightingMode>(() => theme === 'light' ? 'day' : 'night');
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [isOrbiting, setIsOrbiting] = useState<boolean>(false);

  // Sync lighting mode when site theme toggles
  useEffect(() => {
    setLightingMode(theme === 'light' ? 'day' : 'night');
  }, [theme]);

  // Screen coordinates for 2D hotspot overlays projected from 3D space
  const [projectedHotspots, setProjectedHotspots] = useState<
    { id: string; name: string; x: number; y: number; visible: boolean }[]
  >([]);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialsRef = useRef<THREE.Material[]>([]);
  const lightsRef = useRef<{
    sun: THREE.DirectionalLight;
    ambient: THREE.AmbientLight;
    poolLight: THREE.PointLight;
    interiorLight1: THREE.PointLight;
    interiorLight2: THREE.PointLight;
    sunsetRim: THREE.DirectionalLight;
  } | null>(null);
  const waterMeshRef = useRef<THREE.Mesh | null>(null);
  const carGroupRef = useRef<THREE.Group | null>(null);

  // Camera animation target states
  const targetCamPos = useRef(new THREE.Vector3(5.5, 3.8, 8.5));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.2, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.2, 0));

  // Mouse interaction state
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const sphericalCoords = useRef({ radius: 10.5, phi: Math.PI / 3.2, theta: Math.PI / 4 });

  // Update lighting conditions
  const applyLighting = useCallback((mode: LightingMode, scene: THREE.Scene, currentTheme: 'light' | 'dark' = 'dark') => {
    if (!lightsRef.current) return;
    const { sun, ambient, poolLight, interiorLight1, interiorLight2, sunsetRim } = lightsRef.current;

    const isLight = currentTheme === 'light' || document.body.classList.contains('theme-light');

    if (mode === 'day') {
      const bgColor = isLight ? 0xebf2f8 : 0x0e1015;
      scene.background = new THREE.Color(bgColor);
      scene.fog = new THREE.FogExp2(bgColor, isLight ? 0.015 : 0.025);
      sun.color.setHex(0xfffbf0);
      sun.intensity = isLight ? 3.0 : 2.4;
      sun.position.set(10, 15, 10);
      ambient.color.setHex(isLight ? 0x94a3b8 : 0x3a4252);
      ambient.intensity = isLight ? 2.0 : 1.2;
      poolLight.intensity = 1.5;
      interiorLight1.intensity = 2.0;
      interiorLight2.intensity = 2.0;
      sunsetRim.intensity = 0.2;
    } else if (mode === 'sunset') {
      const bgColor = isLight ? 0xf5e6dd : 0x1a1215;
      scene.background = new THREE.Color(bgColor);
      scene.fog = new THREE.FogExp2(bgColor, 0.02);
      sun.color.setHex(0xff8c42);
      sun.intensity = 3.2;
      sun.position.set(14, 5, 8);
      ambient.color.setHex(isLight ? 0xc49a88 : 0x422d36);
      ambient.intensity = 1.4;
      poolLight.intensity = 3.5;
      interiorLight1.intensity = 4.5;
      interiorLight2.intensity = 4.5;
      sunsetRim.color.setHex(0xffaa55);
      sunsetRim.intensity = 2.8;
    } else {
      // Night (Obsidian Luxury)
      scene.background = new THREE.Color(0x0b0c0e);
      scene.fog = new THREE.FogExp2(0x0b0c0e, 0.032);
      sun.color.setHex(0x6080b0);
      sun.intensity = 0.5;
      sun.position.set(-6, 12, -6);
      ambient.color.setHex(0x181e2b);
      ambient.intensity = 0.8;
      poolLight.intensity = 5.5;
      poolLight.color.setHex(0x38bdf8);
      interiorLight1.intensity = 6.5;
      interiorLight2.intensity = 6.5;
      sunsetRim.intensity = 0.0;
    }
  }, []);

  useEffect(() => {
    if (sceneRef.current) {
      applyLighting(lightingMode, sceneRef.current, theme);
    }
  }, [lightingMode, theme, applyLighting]);

  // Wireframe toggle
  useEffect(() => {
    materialsRef.current.forEach((mat) => {
      if ('wireframe' in mat) {
        (mat as THREE.MeshStandardMaterial).wireframe = isWireframe;
      }
    });
  }, [isWireframe]);

  // Hotspot selection triggers camera glide
  useEffect(() => {
    if (selectedHotspot) {
      targetCamPos.current.set(...selectedHotspot.cameraPosition);
      targetLookAt.current.set(...selectedHotspot.cameraTarget);
      setActiveHotspotId(selectedHotspot.id);
    }
  }, [selectedHotspot]);

  // Auto-play timer for photo perspective mode
  useEffect(() => {
    if (heroMode !== 'photo' || !isAutoPlay) return;
    const timer = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroMode, isAutoPlay]);

  const resetCamera = () => {
    targetCamPos.current.set(5.5, 3.8, 8.5);
    targetLookAt.current.set(0, 1.2, 0);
    setActiveHotspotId(null);
  };

  const handleFlyToAngle = (pos: [number, number, number], target: [number, number, number], hotspotId?: string) => {
    if (heroMode !== '3d') setHeroMode('3d');
    targetCamPos.current.set(...pos);
    targetLookAt.current.set(...target);
    if (hotspotId) {
      setActiveHotspotId(hotspotId);
      const hs = HOTSPOTS.find((h) => h.id === hotspotId);
      if (hs) onSelectHotspot(hs);
    } else {
      setActiveHotspotId(null);
    }
  };

  // Build the complete 3D Villa model
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(5.5, 3.8, 8.5);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    // Materials list for wireframe tracking
    const trackedMaterials: THREE.Material[] = [];
    const registerMat = <T extends THREE.Material>(m: T): T => {
      trackedMaterials.push(m);
      return m;
    };

    // Material definitions
    const stoneWallMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xeeece6,
        roughness: 0.85,
        metalness: 0.05
      })
    );

    const darkBasaltMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x22262e,
        roughness: 0.7,
        metalness: 0.2
      })
    );

    const woodLouversMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x96603a,
        roughness: 0.65,
        metalness: 0.1
      })
    );

    const glassMat = registerMat(
      new THREE.MeshPhysicalMaterial({
        color: 0xdff3ff,
        transmission: 0.75,
        opacity: 0.85,
        transparent: true,
        roughness: 0.08,
        ior: 1.52,
        reflectivity: 0.9
      })
    );

    const warmInteriorMat = registerMat(
      new THREE.MeshBasicMaterial({
        color: 0xffe2b0
      })
    );

    const poolWaterMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        roughness: 0.15,
        metalness: 0.85,
        transparent: true,
        opacity: 0.88
      })
    );

    const grassMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x3d5a3a,
        roughness: 0.95
      })
    );

    const paverMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0xdcd8d0,
        roughness: 0.9
      })
    );

    materialsRef.current = trackedMaterials;

    // Lighting setup
    const sun = new THREE.DirectionalLight(0xfffbf0, 2.4);
    sun.position.set(10, 15, 10);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 35;
    sun.shadow.camera.left = -10;
    sun.shadow.camera.right = 10;
    sun.shadow.camera.top = 10;
    sun.shadow.camera.bottom = -10;
    sun.shadow.bias = -0.0005;
    scene.add(sun);

    const ambient = new THREE.AmbientLight(0xe6edf5, 1.2);
    scene.add(ambient);

    const poolLight = new THREE.PointLight(0x38bdf8, 2.0, 8);
    poolLight.position.set(-2.2, 0.1, 2.0);
    scene.add(poolLight);

    const interiorLight1 = new THREE.PointLight(0xffb356, 2.5, 7);
    interiorLight1.position.set(0.5, 1.2, 0.5);
    scene.add(interiorLight1);

    const interiorLight2 = new THREE.PointLight(0xffcc77, 2.2, 6);
    interiorLight2.position.set(1.5, 2.2, 0.2);
    scene.add(interiorLight2);

    const sunsetRim = new THREE.DirectionalLight(0xff7e47, 0.2);
    sunsetRim.position.set(-10, 4, -8);
    scene.add(sunsetRim);

    lightsRef.current = {
      sun,
      ambient,
      poolLight,
      interiorLight1,
      interiorLight2,
      sunsetRim
    };

    // --- ARCHITECTURAL VILLA GEOMETRY ---
    const villaGroup = new THREE.Group();
    scene.add(villaGroup);

    // Ground & Plot Base
    const groundGeo = new THREE.BoxGeometry(22, 0.4, 20);
    const groundMesh = new THREE.Mesh(groundGeo, grassMat);
    groundMesh.position.y = -0.2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // Stone Terrace Plinth
    const plinthGeo = new THREE.BoxGeometry(10.5, 0.35, 9);
    const plinthMesh = new THREE.Mesh(plinthGeo, paverMat);
    plinthMesh.position.set(0, 0.175, 0.5);
    plinthMesh.receiveShadow = true;
    villaGroup.add(plinthMesh);

    // --- Ground Floor Main Living Block ---
    const gfLivingGeo = new THREE.BoxGeometry(4.8, 2.4, 4.2);
    const gfLivingMesh = new THREE.Mesh(gfLivingGeo, stoneWallMat);
    gfLivingMesh.position.set(0.2, 1.4, 0.2);
    gfLivingMesh.castShadow = true;
    gfLivingMesh.receiveShadow = true;
    villaGroup.add(gfLivingMesh);

    // Double Height Glass Curtain Wall
    const glassWallGeo = new THREE.BoxGeometry(4.2, 2.2, 0.15);
    const glassWallMesh = new THREE.Mesh(glassWallGeo, glassMat);
    glassWallMesh.position.set(0.2, 1.4, 2.3);
    villaGroup.add(glassWallMesh);

    // Interior Warm Lit Glow Core
    const interiorGlowGeo = new THREE.BoxGeometry(3.6, 1.8, 3.4);
    const interiorGlowMesh = new THREE.Mesh(interiorGlowGeo, warmInteriorMat);
    interiorGlowMesh.position.set(0.2, 1.3, 0.4);
    villaGroup.add(interiorGlowMesh);

    // Ground Floor Mullions / Framing
    const mullionMat = registerMat(
      new THREE.MeshStandardMaterial({ color: 0x181a1f, roughness: 0.4 })
    );
    for (let i = -1.8; i <= 1.8; i += 0.9) {
      const mullionGeo = new THREE.BoxGeometry(0.08, 2.25, 0.18);
      const mullion = new THREE.Mesh(mullionGeo, mullionMat);
      mullion.position.set(i + 0.2, 1.4, 2.32);
      villaGroup.add(mullion);
    }

    // --- First Floor Cantilevered Master Wing ---
    const ffWingGeo = new THREE.BoxGeometry(4.4, 2.2, 4.6);
    const ffWingMesh = new THREE.Mesh(ffWingGeo, darkBasaltMat);
    ffWingMesh.position.set(1.4, 3.4, 0.8);
    ffWingMesh.castShadow = true;
    ffWingMesh.receiveShadow = true;
    villaGroup.add(ffWingMesh);

    // Cantilever Balcony Deck
    const balconyDeckGeo = new THREE.BoxGeometry(3.8, 0.18, 1.8);
    const balconyDeckMesh = new THREE.Mesh(balconyDeckGeo, woodLouversMat);
    balconyDeckMesh.position.set(1.4, 2.35, 3.2);
    balconyDeckMesh.castShadow = true;
    balconyDeckMesh.receiveShadow = true;
    villaGroup.add(balconyDeckMesh);

    // Balcony Glass Railing
    const railingGeo = new THREE.BoxGeometry(3.8, 0.85, 0.08);
    const railingMesh = new THREE.Mesh(railingGeo, glassMat);
    railingMesh.position.set(1.4, 2.85, 4.05);
    villaGroup.add(railingMesh);

    // Left & Right railing return
    const sideRailingGeo = new THREE.BoxGeometry(0.08, 0.85, 1.8);
    const leftRailing = new THREE.Mesh(sideRailingGeo, glassMat);
    leftRailing.position.set(-0.45, 2.85, 3.2);
    villaGroup.add(leftRailing);
    const rightRailing = new THREE.Mesh(sideRailingGeo, glassMat);
    rightRailing.position.set(3.25, 2.85, 3.2);
    villaGroup.add(rightRailing);

    // Decorative Architectural Wood Louvers on Facade
    for (let y = 2.6; y <= 4.2; y += 0.2) {
      const louverGeo = new THREE.BoxGeometry(1.6, 0.06, 0.25);
      const louver = new THREE.Mesh(louverGeo, woodLouversMat);
      louver.position.set(2.8, y, 3.15);
      villaGroup.add(louver);
    }

    // --- Left Wing: Entry Portico & Garage Canopy ---
    const porticoRoofGeo = new THREE.BoxGeometry(3.8, 0.22, 4.0);
    const porticoRoof = new THREE.Mesh(porticoRoofGeo, darkBasaltMat);
    porticoRoof.position.set(-3.0, 2.3, 1.5);
    porticoRoof.castShadow = true;
    villaGroup.add(porticoRoof);

    // Portico Slender Steel Columns
    const colGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.1, 16);
    const col1 = new THREE.Mesh(colGeo, mullionMat);
    col1.position.set(-4.6, 1.15, 3.2);
    col1.castShadow = true;
    villaGroup.add(col1);

    const col2 = new THREE.Mesh(colGeo, mullionMat);
    col2.position.set(-1.4, 1.15, 3.2);
    col2.castShadow = true;
    villaGroup.add(col2);

    // --- Luxury Car in Driveway ---
    const carGroup = new THREE.Group();
    carGroup.position.set(-3.0, 0.35, 1.8);
    carGroupRef.current = carGroup;

    const carBodyMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: 0x1a202c,
        metalness: 0.95,
        roughness: 0.15
      })
    );
    const carLower = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.45, 3.2), carBodyMat);
    carLower.castShadow = true;
    carGroup.add(carLower);

    const carCabin = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.4, 1.8), glassMat);
    carCabin.position.set(0, 0.38, -0.2);
    carCabin.castShadow = true;
    carGroup.add(carCabin);

    // Car Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.15, 24);
    wheelGeo.rotateZ(Math.PI / 2);
    const wheelMat = registerMat(new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 }));
    [
      [-0.8, -0.05, 0.9],
      [0.8, -0.05, 0.9],
      [-0.8, -0.05, -0.9],
      [0.8, -0.05, -0.9]
    ].forEach(([x, y, z]) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.position.set(x, y, z);
      carGroup.add(wheel);
    });

    villaGroup.add(carGroup);

    // --- Infinity Reflection Pool ---
    const poolBasinGeo = new THREE.BoxGeometry(2.8, 0.4, 4.6);
    const poolBasin = new THREE.Mesh(poolBasinGeo, paverMat);
    poolBasin.position.set(-2.2, 0.1, 2.0);
    villaGroup.add(poolBasin);

    const poolWaterGeo = new THREE.PlaneGeometry(2.4, 4.2, 32, 32);
    poolWaterGeo.rotateX(-Math.PI / 2);
    const poolWater = new THREE.Mesh(poolWaterGeo, poolWaterMat);
    poolWater.position.set(-2.2, 0.28, 2.0);
    waterMeshRef.current = poolWater;
    villaGroup.add(poolWater);

    // Pool Stepping Stones
    for (let z = 0.5; z <= 3.5; z += 1.0) {
      const stepGeo = new THREE.BoxGeometry(0.7, 0.1, 0.5);
      const step = new THREE.Mesh(stepGeo, paverMat);
      step.position.set(-0.7, 0.32, z);
      villaGroup.add(step);
    }

    // --- Rooftop Pergola & Planter ---
    const pergolaMat = woodLouversMat;
    for (let x = -0.5; x <= 2.8; x += 0.45) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 3.4), pergolaMat);
      slat.position.set(x, 4.65, 0.6);
      villaGroup.add(slat);
    }

    // --- Landscaping Greenery (Architectural Cypress Trees & Minimalist Planters) ---
    const treeTrunkMat = registerMat(new THREE.MeshStandardMaterial({ color: 0x4a3525 }));
    const foliageMat = registerMat(new THREE.MeshStandardMaterial({ color: 0x2b4c2b, roughness: 0.8 }));

    const createTree = (x: number, z: number, scale = 1.0) => {
      const tree = new THREE.Group();
      tree.position.set(x, 0.3, z);

      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 1.2 * scale, 8), treeTrunkMat);
      trunk.position.y = 0.6 * scale;
      trunk.castShadow = true;
      tree.add(trunk);

      const foliage = new THREE.Mesh(
        new THREE.ConeGeometry(0.65 * scale, 2.4 * scale, 8),
        foliageMat
      );
      foliage.position.y = (1.2 + 1.1) * scale;
      foliage.castShadow = true;
      tree.add(foliage);

      return tree;
    };

    scene.add(createTree(4.2, 3.5, 1.1));
    scene.add(createTree(4.8, 1.8, 1.3));
    scene.add(createTree(4.5, -0.5, 0.9));
    scene.add(createTree(-5.4, 3.8, 1.0));
    scene.add(createTree(-5.8, 1.5, 1.2));

    // Planter box along driveway
    const planterBox = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.45, 0.6), darkBasaltMat);
    planterBox.position.set(-3.0, 0.22, 4.4);
    villaGroup.add(planterBox);

    // Initial lighting call
    applyLighting(lightingMode, scene);

    // --- MOUSE & ORBIT EVENTS ---
    const handlePointerDown = (e: PointerEvent) => {
      // Only drag with left mouse button, do not hijack touch scrolling
      if (e.pointerType === 'touch') return;
      if (e.button !== 0) return;
      isDragging.current = true;
      setIsOrbiting(true);
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.current.targetX = normX;
      mouse.current.targetY = normY;

      if (isDragging.current) {
        const deltaX = e.clientX - previousMousePosition.current.x;
        const deltaY = e.clientY - previousMousePosition.current.y;

        sphericalCoords.current.theta -= deltaX * 0.007;
        sphericalCoords.current.phi = Math.max(
          0.2,
          Math.min(Math.PI / 2.05, sphericalCoords.current.phi + deltaY * 0.007)
        );

        // Calculate new camera position
        const { radius, phi, theta } = sphericalCoords.current;
        targetCamPos.current.x = targetLookAt.current.x + radius * Math.sin(phi) * Math.sin(theta);
        targetCamPos.current.y = targetLookAt.current.y + radius * Math.cos(phi);
        targetCamPos.current.z = targetLookAt.current.z + radius * Math.sin(phi) * Math.cos(theta);

        previousMousePosition.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerUp = () => {
      isDragging.current = false;
      setIsOrbiting(false);
    };

    const handleWheel = (e: WheelEvent) => {
      // Allow natural page scrolling when user scrolls over the banner!
      // Only zoom 3D model if user explicitly holds Ctrl/Meta or Alt key.
      if (e.ctrlKey || e.metaKey || e.altKey) {
        e.preventDefault();
        sphericalCoords.current.radius = Math.max(
          5,
          Math.min(18, sphericalCoords.current.radius + e.deltaY * 0.01)
        );
        const { radius, phi, theta } = sphericalCoords.current;
        targetCamPos.current.x = targetLookAt.current.x + radius * Math.sin(phi) * Math.sin(theta);
        targetCamPos.current.y = targetLookAt.current.y + radius * Math.cos(phi);
        targetCamPos.current.z = targetLookAt.current.z + radius * Math.sin(phi) * Math.cos(theta);
      }
      // If neither key is held, do NOT preventDefault - allows normal window scrolling!
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('wheel', handleWheel, { passive: false });

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const projectHotspotsToScreen = () => {
      if (!cameraRef.current || !containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      const results = HOTSPOTS.map((h) => {
        const worldPos = new THREE.Vector3(...h.position);
        worldPos.project(cameraRef.current!);

        // Screen space check
        const visible = worldPos.z < 1.0;
        const x = ((worldPos.x + 1) * width) / 2;
        const y = ((-worldPos.y + 1) * height) / 2;

        return {
          id: h.id,
          name: h.name,
          x,
          y,
          visible
        };
      });

      setProjectedHotspots(results);
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      // Subtle breathing parallax if not actively dragging
      if (!isDragging.current && !activeHotspotId) {
        const floatX = Math.sin(elapsedTime * 0.3) * 0.35 + mouse.current.x * 0.6;
        const floatY = Math.cos(elapsedTime * 0.25) * 0.2 + mouse.current.y * 0.4;
        camera.position.x += (targetCamPos.current.x + floatX - camera.position.x) * 0.04;
        camera.position.y += (targetCamPos.current.y + floatY - camera.position.y) * 0.04;
        camera.position.z += (targetCamPos.current.z - camera.position.z) * 0.04;
      } else {
        camera.position.lerp(targetCamPos.current, 0.05);
      }

      currentLookAt.current.lerp(targetLookAt.current, 0.06);
      camera.lookAt(currentLookAt.current);

      // Water ripple oscillation
      if (waterMeshRef.current) {
        const posAttr = waterMeshRef.current.geometry.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
          const u = posAttr.getX(i);
          const v = posAttr.getY(i);
          const wave = Math.sin(u * 5 + elapsedTime * 2.2) * 0.018 + Math.cos(v * 4 + elapsedTime * 1.8) * 0.014;
          posAttr.setZ(i, wave);
        }
        posAttr.needsUpdate = true;
      }

      // Project hotspots to 2D screen
      projectHotspotsToScreen();

      renderer.render(scene, camera);
    };

    animate();

    // Resize handling
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [applyLighting, activeHotspotId]);

  const handleZoom = (direction: 'in' | 'out') => {
    const delta = direction === 'in' ? -1.5 : 1.5;
    sphericalCoords.current.radius = Math.max(
      5,
      Math.min(18, sphericalCoords.current.radius + delta)
    );
    const { radius, phi, theta } = sphericalCoords.current;
    targetCamPos.current.x = targetLookAt.current.x + radius * Math.sin(phi) * Math.sin(theta);
    targetCamPos.current.y = targetLookAt.current.y + radius * Math.cos(phi);
    targetCamPos.current.z = targetLookAt.current.z + radius * Math.sin(phi) * Math.cos(theta);
  };

  return (
    <div
      ref={containerRef}
      data-cursor={heroMode === '3d' ? 'ORBIT 3D' : 'VIEW'}
      className="relative w-full h-full min-h-[620px] lg:min-h-[820px] overflow-hidden select-none"
    >
      {/* 3D WebGL Canvas - always kept mounted so WebGL context stays ready */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full block touch-pan-y transition-opacity duration-500 ${
          heroMode === '3d'
            ? 'opacity-100 cursor-grab active:cursor-grabbing pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* PHOTO PERSPECTIVE MODE: High-Res Real Architectural Villa Photos (All 13 Images) */}
      {heroMode === 'photo' && (
        <div className="absolute inset-0 z-10 animate-in fade-in duration-500">
          <img
            key={GALLERY_ITEMS[photoIndex].id}
            src={GALLERY_ITEMS[photoIndex].imageUrl}
            alt={GALLERY_ITEMS[photoIndex].title}
            className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-700"
          />
          {/* Subtle multi-stop gradient ensuring text & buttons remain 100% readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-black/40 to-black/60 pointer-events-none" />

          {/* Left & Right Arrow Quick Navigation */}
          <button
            onClick={() => setPhotoIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#121418]/80 hover:bg-[#dfb776] text-white hover:text-[#0b0c0e] border border-white/15 transition-all shadow-2xl backdrop-blur-md cursor-pointer pointer-events-auto"
            title="Previous Perspective"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setPhotoIndex((prev) => (prev + 1) % GALLERY_ITEMS.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#121418]/80 hover:bg-[#dfb776] text-white hover:text-[#0b0c0e] border border-white/15 transition-all shadow-2xl backdrop-blur-md cursor-pointer pointer-events-auto"
            title="Next Perspective"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Photo Information & Fullscreen Action */}
          <div className="absolute top-20 left-6 sm:top-24 sm:left-12 z-20 max-w-lg pointer-events-auto text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono tracking-widest uppercase bg-[#dfb776] text-[#0b0c0e] px-2.5 py-0.5 rounded-xs font-semibold">
                {GALLERY_ITEMS[photoIndex].categoryLabel || GALLERY_ITEMS[photoIndex].category}
              </span>
              <span className="text-[11px] font-mono text-[#dfb776] bg-black/60 px-2 py-0.5 rounded-xs border border-white/10">
                {String(photoIndex + 1).padStart(2, '0')} / {String(GALLERY_ITEMS.length).padStart(2, '0')}
              </span>
            </div>

            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mb-1 drop-shadow-md">
              {GALLERY_ITEMS[photoIndex].title}
            </h3>

            <div className="flex items-center gap-3 text-xs font-mono text-gray-300 mb-3">
              <span>{GALLERY_ITEMS[photoIndex].area}</span>
              <span>•</span>
              <span className="text-gray-400">{GALLERY_ITEMS[photoIndex].location}</span>
            </div>

            {onSelectGalleryItem && (
              <button
                onClick={() => onSelectGalleryItem(GALLERY_ITEMS[photoIndex])}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:text-[#dfb776] bg-black/70 hover:bg-black/90 px-3 py-1.5 rounded-xs border border-white/20 transition-colors shadow-lg cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#dfb776]" />
                <span>INSPECT FULL RESOLUTION</span>
              </button>
            )}
          </div>

          {/* Bottom Thumbnail Strip of all 13 high-res villa photos */}
          <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-30 px-6 sm:px-12 pointer-events-auto">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-7xl mx-auto">
              {GALLERY_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setPhotoIndex(idx)}
                  className={`relative flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-xs overflow-hidden border transition-all cursor-pointer ${
                    photoIndex === idx
                      ? 'border-[#dfb776] ring-2 ring-[#dfb776]/50 scale-105 shadow-lg shadow-black/50'
                      : 'border-white/20 hover:border-white/60 opacity-60 hover:opacity-100'
                  }`}
                  title={`${item.title} (${item.area})`}
                >
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-0.5 right-1 text-[8px] font-mono text-white bg-black/60 px-1 rounded-xs">
                    {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3D MODE: Interactive Hotspot Beacons */}
      {heroMode === '3d' &&
        projectedHotspots.map((spot) => {
          if (!spot.visible) return null;
          const hotspotData = HOTSPOTS.find((h) => h.id === spot.id);
          const isSelected = activeHotspotId === spot.id;

          return (
            <div
              key={spot.id}
              style={{
                transform: `translate(${spot.x}px, ${spot.y}px)`
              }}
              className="absolute top-0 left-0 -ml-4 -mt-4 z-20 pointer-events-auto transition-transform duration-75"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (hotspotData) onSelectHotspot(hotspotData);
                }}
                className={`group relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#dfb776] ring-4 ring-[#dfb776]/40 scale-125'
                    : 'bg-white/90 hover:bg-[#dfb776] text-[#0b0c0e] shadow-lg shadow-black/20 hover:scale-110'
                }`}
                title={spot.name}
              >
                {/* Ripple wave */}
                <span className="absolute -inset-1.5 rounded-full bg-[#dfb776]/40 animate-ping" />
                <Eye className={`w-4 h-4 ${isSelected ? 'text-[#0b0c0e]' : 'text-[#0b0c0e] group-hover:text-[#0b0c0e]'}`} />

                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center pointer-events-none whitespace-nowrap">
                  <div className="bg-[#121418]/95 backdrop-blur-md text-white px-2.5 py-1 rounded-xs text-[11px] font-mono tracking-wider shadow-xl border border-[#dfb776]/30">
                    {spot.name}
                  </div>
                  <div className="w-2 h-2 bg-[#121418]/95 rotate-45 -mt-1 border-r border-b border-[#dfb776]/30" />
                </div>
              </button>
            </div>
          );
        })}

      {/* Top Floating Control HUD */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex flex-wrap items-center gap-2 pointer-events-auto">
        {/* Dual Mode Switcher: [ 3D MODEL ] <--> [ PHOTO VIEWS ] */}
        <div className="flex items-center bg-[#121418]/90 backdrop-blur-md p-1 rounded-full border border-white/15 shadow-2xl">
          <button
            onClick={() => setHeroMode('3d')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              heroMode === '3d'
                ? 'bg-[#dfb776] text-[#0b0c0e] font-semibold shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
            title="Interactive 3D WebGL Villa Model"
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D Model</span>
          </button>
          <button
            onClick={() => setHeroMode('photo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              heroMode === 'photo'
                ? 'bg-[#dfb776] text-[#0b0c0e] font-semibold shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
            title="Real Architectural Villa Photos (13)"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Photos (13)</span>
          </button>
        </div>

        {/* 3D Model Specific Controls: Lighting, Zoom, CAD Blueprint, Reset */}
        {heroMode === '3d' ? (
          <>
            {/* Lighting Mode Switcher */}
            <div className="flex items-center bg-[#121418]/90 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-xl">
              <button
                onClick={() => setLightingMode('day')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  lightingMode === 'day'
                    ? 'bg-[#dfb776] text-[#0b0c0e] shadow-md font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
                title="Daytime Sunlight"
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Day</span>
              </button>
              <button
                onClick={() => setLightingMode('sunset')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  lightingMode === 'sunset'
                    ? 'bg-[#dfb776] text-[#0b0c0e] shadow-md font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
                title="Golden Hour Sunset"
              >
                <Sunset className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sunset</span>
              </button>
              <button
                onClick={() => setLightingMode('night')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  lightingMode === 'night'
                    ? 'bg-[#dfb776] text-[#0b0c0e] shadow-md font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
                title="Twilight Night"
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Night</span>
              </button>
            </div>

            {/* Zoom In & Out */}
            <div className="flex items-center bg-[#121418]/90 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-xl">
              <button
                onClick={() => handleZoom('in')}
                className="p-1.5 rounded-full text-white/80 hover:text-[#dfb776] hover:bg-white/10 transition-colors cursor-pointer"
                title="Zoom In 3D Scene"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleZoom('out')}
                className="p-1.5 rounded-full text-white/80 hover:text-[#dfb776] hover:bg-white/10 transition-colors cursor-pointer"
                title="Zoom Out 3D Scene"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Wireframe Architectural Blueprint Toggle */}
            <button
              onClick={() => setIsWireframe(!isWireframe)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-all border cursor-pointer ${
                isWireframe
                  ? 'bg-[#0ea5e9] text-white border-[#0ea5e9]/50 shadow-lg shadow-[#0ea5e9]/20 font-semibold'
                  : 'bg-[#121418]/90 text-white/80 border-white/10 hover:text-white'
              }`}
              title="Toggle CAD Wireframe Blueprint"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isWireframe ? 'Solid CAD' : 'X-Ray Blueprint'}</span>
            </button>

            {/* Reset Camera Orbit */}
            <button
              onClick={resetCamera}
              className="p-2 rounded-full bg-[#121418]/90 text-white/80 border border-white/10 hover:text-[#dfb776] backdrop-blur-md transition-all cursor-pointer"
              title="Reset Camera View"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          /* Photo Mode Controls: Auto-Play Play/Pause */
          <div className="flex items-center bg-[#121418]/90 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-xl">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                isAutoPlay
                  ? 'bg-[#dfb776]/20 text-[#dfb776] border border-[#dfb776]/40'
                  : 'text-gray-400 hover:text-white'
              }`}
              title={isAutoPlay ? 'Pause Slideshow' : 'Play Slideshow'}
            >
              {isAutoPlay ? <Pause className="w-3 h-3 text-[#dfb776]" /> : <Play className="w-3 h-3" />}
              <span>{isAutoPlay ? 'Auto-Advancing' : 'Paused'}</span>
            </button>
          </div>
        )}
      </div>

      {/* 3D Mode: Architectural Vantage Point Shortcuts */}
      {heroMode === '3d' && (
        <div className="hidden md:flex absolute top-20 right-6 z-20 flex-col items-end gap-1.5 pointer-events-auto">
          <span className="text-[9px] font-mono tracking-widest uppercase text-gray-400 mb-1">
            VANTAGE ANGLES
          </span>
          <button
            onClick={resetCamera}
            className="text-[11px] font-mono tracking-wider text-gray-300 hover:text-[#dfb776] bg-[#121418]/80 hover:bg-[#121418] border border-white/10 hover:border-[#dfb776]/40 px-2.5 py-1 rounded-xs backdrop-blur-md transition-all cursor-pointer"
          >
            Overview Facade
          </button>
          <button
            onClick={() => handleFlyToAngle([3.2, 3.0, 3.8], [1.8, 2.0, 1.0], 'cantilever-balcony')}
            className={`text-[11px] font-mono tracking-wider border px-2.5 py-1 rounded-xs backdrop-blur-md transition-all cursor-pointer ${
              activeHotspotId === 'cantilever-balcony'
                ? 'bg-[#dfb776]/20 text-[#dfb776] border-[#dfb776]'
                : 'text-gray-300 hover:text-[#dfb776] bg-[#121418]/80 border-white/10 hover:border-[#dfb776]/40'
            }`}
          >
            Skyline Deck (420 Sq.Ft.)
          </button>
          <button
            onClick={() => handleFlyToAngle([-3.8, 1.8, 4.0], [-2.0, 0.1, 1.8], 'infinity-pool')}
            className={`text-[11px] font-mono tracking-wider border px-2.5 py-1 rounded-xs backdrop-blur-md transition-all cursor-pointer ${
              activeHotspotId === 'infinity-pool'
                ? 'bg-[#dfb776]/20 text-[#dfb776] border-[#dfb776]'
                : 'text-gray-300 hover:text-[#dfb776] bg-[#121418]/80 border-white/10 hover:border-[#dfb776]/40'
            }`}
          >
            Reflection Pool (38-Ft)
          </button>
          <button
            onClick={() => handleFlyToAngle([0.8, 2.0, 4.2], [0.0, 1.0, 0.2], 'double-height-living')}
            className={`text-[11px] font-mono tracking-wider border px-2.5 py-1 rounded-xs backdrop-blur-md transition-all cursor-pointer ${
              activeHotspotId === 'double-height-living'
                ? 'bg-[#dfb776]/20 text-[#dfb776] border-[#dfb776]'
                : 'text-gray-300 hover:text-[#dfb776] bg-[#121418]/80 border-white/10 hover:border-[#dfb776]/40'
            }`}
          >
            Living Atrium (22-Ft)
          </button>
          <button
            onClick={() => handleFlyToAngle([-1.6, 1.2, 5.5], [-1.2, 0.3, 2.8], 'smart-entry')}
            className={`text-[11px] font-mono tracking-wider border px-2.5 py-1 rounded-xs backdrop-blur-md transition-all cursor-pointer ${
              activeHotspotId === 'smart-entry'
                ? 'bg-[#dfb776]/20 text-[#dfb776] border-[#dfb776]'
                : 'text-gray-300 hover:text-[#dfb776] bg-[#121418]/80 border-white/10 hover:border-[#dfb776]/40'
            }`}
          >
            Smart Portico & EV
          </button>
        </div>
      )}

      {/* Orbit Tip Bottom Left HUD */}
      {heroMode === '3d' && (
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 flex items-center gap-2 pointer-events-none">
          <div className="bg-[#121418]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white/90 text-[11px] font-mono flex items-center gap-2 shadow-xl">
            <Compass className="w-3.5 h-3.5 text-[#dfb776] animate-spin-slow" />
            <span>Interactive 3D Villa • Drag to Orbit • Click Hotspots to Inspect</span>
          </div>
        </div>
      )}
    </div>
  );
};
