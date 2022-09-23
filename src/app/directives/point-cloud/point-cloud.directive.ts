import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, Material, BufferAttribute, Vector3, Color, BufferGeometry, PointsMaterial, Points, Float32BufferAttribute } from 'three'

@Directive({
  selector: '[appPointCloud]'
})
export class PointCloudDirective {
  @Input() pcbFile!: File;
  @Input() color?: string;

  pcdPoints: Points<BufferGeometry, Material | Material[]> | null = null;

  constructor(private el: ElementRef, private r2: Renderer2) { }

  ngOnInit(): void {
    if(!this.pcbFile) throw Error('PointCloud Directive Required Input arrayBuffer missing')
    this.setupSceneAndLoad();
  }

  async setupSceneAndLoad() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;

    const scene = new Scene();
    const camera = new PerspectiveCamera( 75, width / height, 0.1, 1000 );
    const renderer = new WebGLRenderer();
    renderer.setSize( width, height );

    this.r2.appendChild(this.el.nativeElement, renderer.domElement)

    const loader = new PCDLoader();

    camera.position.z = 1;

 
    
    
    const buffer = await this.pcbFile.arrayBuffer();
    
    this.pcdPoints = loader.parse(buffer, this.pcbFile.name);
    
    
    scene.add(this.pcdPoints);
    
    const animate = () => {
      this.setColor();
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    }

    animate();
  }

  setColor() {
    if(!this.pcdPoints) throw Error('PCD points do not exist')

    const color = new Color( this.color ?? '#FFF' );
    const material = this.pcdPoints.material as PointsMaterial;

    material.color.set(color)
  }

}
