<script lang="ts">
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";

  let canvas = $state() as HTMLCanvasElement;

  onMount(() => {
    const loader = new THREE.TextureLoader();
    const scene = new THREE.Scene();
    loader.load("/equirectangular_image_LE_auto_x2.jpg", (data) => {
      data.mapping = THREE.EquirectangularReflectionMapping;
      data.colorSpace = THREE.SRGBColorSpace;
      scene.background = data;
      scene.environment = data;
    });
    const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial());
    scene.add(cube);

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(0, -1, 3);
    scene.add(camera);

    const ambientLight = new THREE.AmbientLight("#ffffff", 10);
    scene.add(ambientLight);

    const controls = new OrbitControls(camera, canvas);
    controls.target.y = 3.5;
    controls.enableDamping = true;

    const renderer = new THREE.WebGLRenderer({ canvas });
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

    // const clock = new THREE.Clock();
    const tick = () => {
      // const elapsedTime = clock.getElapsedTime();
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("resize", resize);
    };
  });
</script>

<canvas class="fixed inset-0 m-0 outline-none" bind:this={canvas}></canvas>
