import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three'

@Directive({
  selector: '[appPointCloud]'
})
export class PointCloudDirective {

  constructor(private el: ElementRef, private r2: Renderer2) { }

  ngOnInit(): void {
    this.setupSceneAndLoad();
  }

  setupSceneAndLoad() {
    const scene = new Scene();
    const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    this.r2.appendChild(this.el.nativeElement, renderer.domElement)

    const loader = new PCDLoader();

    camera.position.z = 1;

    loader.load(
      // resource URL
      '../../../assets/pcds/bun045_Structured.pcd',
      // called when the resource is loaded
      function ( points ) {
        console.log('loaded')
    
        scene.add( points );
    
      },
      // called when loading is in progresses
      function ( xhr ) {
    
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
      },
      // called when loading has errors
      function ( error ) {
    
        console.log( 'An error happened', error );
    
      }
    );

    const animate = () => {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    }

    animate();
  }

}
