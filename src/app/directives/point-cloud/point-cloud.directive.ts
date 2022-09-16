import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three'

@Directive({
  selector: '[appPointCloud]'
})
export class PointCloudDirective {
  @Input() pcbFile!: File;

  constructor(private el: ElementRef, private r2: Renderer2) { }

  ngOnInit(): void {
    if(!this.pcbFile) throw Error('PointCloud Directive Required Input arrayBuffer missing')
    this.setupSceneAndLoad();
  }

  async setupSceneAndLoad() {
    const scene = new Scene();
    const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    this.r2.appendChild(this.el.nativeElement, renderer.domElement)

    const loader = new PCDLoader();

    camera.position.z = 1;

 
    
    
    const buffer = await this.pcbFile.arrayBuffer();
    const points = loader.parse(buffer, this.pcbFile.name)
    scene.add(points);
    
    const animate = () => {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    }

    animate();
  }

}
