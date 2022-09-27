import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, Material, BufferAttribute, Vector3, Color, BufferGeometry, PointsMaterial, Points, Float32BufferAttribute } from 'three'

@Directive({
  selector: '[appPointCloud]'
})
export class PointCloudDirective {
  @Input() pcbFile!: File;
  @Input() color?: string;
  @Input() pointSize?: number | null;
  @Input() fov?: number | null;
  @Input() cameraZ?: number | null;
  @Input() cameraY?: number | null;
  @Input() near?: number | null;
  @Input() far?: number | null;

  @Output() pointSizeChange = new EventEmitter<number>();

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
    
    const renderer = new WebGLRenderer();
    renderer.setSize( width, height );

    this.r2.appendChild(this.el.nativeElement, renderer.domElement)

    const loader = new PCDLoader();

    

 
    
    
    const buffer = await this.pcbFile.arrayBuffer();
    
    this.pcdPoints = loader.parse(buffer, this.pcbFile.name);
    this.pointSizeChange.emit(((this.pcdPoints.material as PointsMaterial).size))
    
    
    scene.add(this.pcdPoints);
    
    const animate = () => {
      const width = this.el.nativeElement.clientWidth;
      const height = this.el.nativeElement.clientHeight;
      renderer.setSize( width, height );
      
      this.setParams();
      const camera = this.createCamera();
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    }

    animate();
  }

  setParams() {
    if(!this.pcdPoints) throw Error('PCD points do not exist')

    const color = new Color( this.color ?? '#FFF' );
    const material = this.pcdPoints.material as PointsMaterial;

    material.setValues({
      size: this.pointSize ?? material.size,
      color: color
    });
  }

  createCamera() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    const camera = new PerspectiveCamera( this.fov ?? 75, width / height, this.near ?? 0.1, this.far ?? 1000 );
    camera.position.z = this.cameraZ ?? 1;
    camera.position.y = this.cameraY ?? 0;

    console.log(this.near, this.far);

    return camera;
  }

}
