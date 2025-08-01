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
  private targetZ = 70;
  private cameraZ = 30;

  private paused = false;
  private effectEnabled = true;

  ngAfterViewInit(): void {
     const deviceMemory = (navigator as any).deviceMemory;
    if (navigator.hardwareConcurrency <= 2 || deviceMemory && deviceMemory <= 2) {
      this.effectEnabled = false;
      return;
    }


    this.initThree();
    this.animate();

    window.addEventListener('resize', this.onWindowResize);
    window.addEventListener('scroll', this.onScroll, { passive: true });
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onWindowResize);
    window.removeEventListener('scroll', this.onScroll);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private onScroll = () => {
    this.scrollY = window.scrollY || window.pageYOffset;
  };

  private onVisibilityChange = () => {
    if (document.hidden) {
      cancelAnimationFrame(this.animationId);
      this.paused = true;
    } else if (this.paused) {
      this.paused = false;
      this.animate();
    }
  };

  private initThree() {
    const canvas = this.canvasRef.nativeElement;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setClearColor(0x000000, 1);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x000000, 0.015);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 5, this.cameraZ);
    this.camera.lookAt(0, 0, 0);

    const starsCount = window.innerWidth > 1280 ? 40000 : 20000;
    const radius = 49;
    const branches = 11;
    const spin = 1;
    const randomness = 0.1;
    const randomnessPower = 2.0;

    const positions = new Float32Array(starsCount * 3);
    const colors = new Float32Array(starsCount * 3);

    const insideColor = new THREE.Color('#1b3984');
    const outsideColor = new THREE.Color('#1b3984');

    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      const radiusVal = Math.random() * radius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = radiusVal * spin;

      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radiusVal;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radiusVal * 0.5;
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radiusVal;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radiusVal + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radiusVal + randomZ;

      const mixedColor = insideColor.clone().lerp(outsideColor, radiusVal / radius);
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    this.galaxyGeometry = new THREE.BufferGeometry();
    this.galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    this.galaxyMaterial = new THREE.PointsMaterial({
      size: 0.07,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.galaxyPoints = new THREE.Points(this.galaxyGeometry, this.galaxyMaterial);
    this.scene.add(this.galaxyPoints);
  }

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);

    this.galaxyPoints.rotation.y += 0.0015;

    const maxScroll = 500;
    const scrollPercent = Math.min(this.scrollY, maxScroll) / maxScroll;
    this.targetZ = 70 - 40 * scrollPercent;
    this.cameraZ += (this.targetZ - this.cameraZ) * 0.05;

    this.camera.position.z = this.cameraZ;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
  };

  private onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
}
