<template>
  <div style="height:100%">
    <div id="vertexshader" v-show="isShow">
      attribute float scale; void main() { vec4 mvPosition = modelViewMatrix *
      vec4( position, 1.0 ); gl_PointSize = scale * ( 300.0 / - mvPosition.z );
      gl_Position = projectionMatrix * mvPosition; }
    </div>

    <div id="fragmentshader" v-show="isShow">
      uniform vec3 color; void main() { if ( length( gl_PointCoord - vec2( 0.5,
      0.5 ) ) > 0.475 ) discard; gl_FragColor = vec4( color, 1.0 ); }
    </div>
    <div id="container" style="height: 100%;width: 100%"></div>
  </div>
</template>

<script>
// import * as THREE from 'three'
let SEPARATION = 100,
  AMOUNTX = 50,
  AMOUNTY = 50;

let container;
let camera, scene, renderer;

let particles,
  count = 0;

let mouseX = 0,
  mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
export default {
  name: "ball",
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    init() {
      container = document.getElementById("container");
      // document.body.appendChild( container );

      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      camera.position.z = 1000;

      scene = new THREE.Scene();

      //

      var numParticles = AMOUNTX * AMOUNTY;

      var positions = new Float32Array(numParticles * 3);
      var scales = new Float32Array(numParticles);

      var i = 0,
        j = 0;

      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
          positions[i + 1] = 0; // y
          positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z

          scales[j] = 1;

          i += 3;
          j++;
        }
      }

      var geometry = new THREE.BufferGeometry();
      geometry.addAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.addAttribute("scale", new THREE.BufferAttribute(scales, 1));

      var material = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(0x097bdb) }
        },
        vertexShader: document.getElementById("vertexshader").textContent,
        fragmentShader: document.getElementById("fragmentshader").textContent
      });

      //

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      //

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      // stats = new Stats();
      // container.appendChild( stats.dom );

      container.addEventListener("mousemove", this.onDocumentMouseMove, false);
      container.addEventListener("touchstart", this.onDocumentTouchStart, {
        passive: false
      });
      container.addEventListener("touchmove", this.onDocumentTouchMove, {
        passive: false
      });
      //

      window.addEventListener("resize", this.onWindowResize, false);
    },

    onWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    },

    //

    onDocumentMouseMove(event) {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    },

    onDocumentTouchStart(event) {
      if (event.touches.length === 1) {
        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
      }
    },

    onDocumentTouchMove(event) {
      if (event.touches.length === 1) {
        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
      }
    },

    //

    animate() {
      requestAnimationFrame(this.animate);

      this.render();
      // stats.update();
    },

    render() {
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y = 364;
      camera.lookAt(scene.position);

      var positions = particles.geometry.attributes.position.array;
      var scales = particles.geometry.attributes.scale.array;

      var i = 0,
        j = 0;

      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          positions[i + 1] =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;

          scales[j] =
            (Math.sin((ix + count) * 0.3) + 1) * 8 +
            (Math.sin((iy + count) * 0.5) + 1) * 8;

          i += 3;
          j++;
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.scale.needsUpdate = true;

      renderer.render(scene, camera);
      renderer.setClearColor("#13194B", 1.0);
      count += 0.1;
    }
  },
  mounted() {
    // console.log(document.getElementById("vertexshader"))
    this.init();
    this.animate();
  }
};
</script>
<style>
canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>