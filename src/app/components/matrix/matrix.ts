import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-matrix',
  template: `<canvas #canvasRef class="w-full h-full block"></canvas>`,
  styleUrls: ['./matrix.scss']
})
export class Matrix implements AfterViewInit, OnDestroy {
  @ViewChild('canvasRef', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animationId = 0;

  private galaxyGeometry!: THREE.BufferGeometry;
  private galaxyMaterial!: THREE.PointsMaterial;
  private galaxyPoints!: THREE.Points;

  private scrollY = 0;

  ngAfterViewInit(): void {
    this.initThree();
    this.animate();
    window.addEventListener('resize', this.onWindowResize);
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onWindowResize);
    window.removeEventListener('scroll', this.onScroll);
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.renderer.dispose();
  }

  private onScroll = () => {
    this.scrollY = window.scrollY || window.pageYOffset;
  }

  private initThree() {
    const canvas = this.canvasRef.nativeElement;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 1);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 70);
    this.camera.lookAt(0, 0, 0);

    const starsCount = 100010;
    const radius = 50;
    const branches = 4;
    const spin = 0.3;
    const randomness = 0.2;
    const randomnessPower = 3;

    const positions = new Float32Array(starsCount * 3);
    const colors = new Float32Array(starsCount * 3);

    const insideColor = new THREE.Color(0x1b3984);
    const outsideColor = new THREE.Color(0x1b3984);

    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;

      const radiusVal = Math.random() * radius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;

      const spinAngle = radiusVal * spin;

      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radiusVal;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radiusVal;
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radiusVal;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radiusVal + randomX;
      positions[i3 + 1] = randomY * 0.2;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radiusVal + randomZ;

      const mixedColor = insideColor.clone();
      mixedColor.lerp(outsideColor, radiusVal / radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    this.galaxyGeometry = new THREE.BufferGeometry();
    this.galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    this.galaxyMaterial = new THREE.PointsMaterial({
      size: 0.15,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    this.galaxyPoints = new THREE.Points(this.galaxyGeometry, this.galaxyMaterial);
    this.scene.add(this.galaxyPoints);
  }

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);

    // Galaxy rotates on its own
    this.galaxyPoints.rotation.y += 0.0015;

    // Camera moves based on scrollY
    // Example: move camera closer/farther on Z-axis
    // Clamp scroll effect so camera doesn't zoom too much
    const maxScroll = 1000;  // max scroll amount to consider
    const scrollPercent = Math.min(this.scrollY, maxScroll) / maxScroll;

    // Camera moves between z=70 (top) to z=30 (scrolled down)
    this.camera.position.z = 70 - 20 * scrollPercent;

    // Optional: move camera slightly up/down on Y-axis too
    this.camera.position.y = 10 * scrollPercent /0.1;

    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
