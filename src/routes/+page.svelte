<script lang="ts">
  import { Cancellable } from "chocobytes/blocks/cancellable.svelte.js";
  import { choco } from "chocobytes/index.js";
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
  import fragmentShader from "../shaders/fragment.glsl?raw";
  import vertexShader from "../shaders/vertex.glsl?raw";

  let canvas = $state() as HTMLCanvasElement;

  onMount(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#1b120c");
    const textureLoader = new THREE.TextureLoader();
    const gltfLoader = new GLTFLoader();

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100);
    camera.position.x = 8;
    camera.position.y = 8;
    camera.position.z = -12;
    scene.add(camera);

    const ambientLight = new THREE.AmbientLight("#ffffff", 10);
    scene.add(ambientLight);

    const controls = new OrbitControls(camera, canvas);
    controls.target.y = 3;
    controls.enableDamping = true;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

    const resize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    };

    window.addEventListener("resize", resize);

    gltfLoader.load("/bakedModel.glb", (gltf) => {
      const baked = gltf.scene.getObjectByName("baked");
      if (baked) {
        // @ts-ignore
        baked.material.map.anisotropy = 8;
        scene.add(gltf.scene);
      }
    });

    const smokeGeometry = new THREE.PlaneGeometry(1, 1, 16, 64);
    smokeGeometry.translate(0, 0.5, 0);
    smokeGeometry.scale(1.5, 6, 1.5);

    const perlinTexture = textureLoader.load("/perlin.png");
    perlinTexture.wrapS = THREE.RepeatWrapping;
    perlinTexture.wrapT = THREE.RepeatWrapping;

    const smokeMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        uTime: new THREE.Uniform(0),
        uPerlinTexture: new THREE.Uniform(perlinTexture),
      },
      depthWrite: false,
    });

    const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial);
    smoke.position.y = 1.83;
    scene.add(smoke);

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      if ("uTime" in smokeMaterial.uniforms) {
        smokeMaterial.uniforms.uTime.value = elapsedTime;
      }

      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("resize", resize);
    };
  });

  const cancel = new Cancellable();
</script>

<canvas class="fixed inset-0 m-0 outline-none" bind:this={canvas}></canvas>

<article
  class="fixed inset-0 grid items-start justify-center gap-y-12 px-4 text-slate-100 sm:grid-cols-2"
>
  <div class="text-center">
    <div class="mt-20 grid place-items-center">
      <h1 class="font-cursive text-4xl md:text-5xl">Choco <span class="text-coral">UI</span></h1>

      <p class="mt-8 max-w-lg font-light">
        Power your Svelte 5 UI with reactive, accessible, SSR-ready components and headless classes
        in a simple, reusable and extendable fashion.
      </p>
      <div class="mt-12">
        <a href="/guides/introduction" class="bg-coral rounded py-4 px-8" use:choco={cancel}
          >Get Started</a
        >
      </div>
    </div>
  </div>

  <div class=""></div>
</article>

<style>
  a {
    border-radius: var(--radius-sm);
    transition: all 200ms ease-out;

    &[data-active="true"] {
      scale: 0.95;
    }
  }
</style>
