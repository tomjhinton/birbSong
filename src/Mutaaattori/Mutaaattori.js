import { OrbitControls , shaderMaterial, Center, Text, Float, Point, Points} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


import * as random from "maath/random";
import * as buffer from "maath/buffer";
import * as misc from "maath/misc";





export default function Experience(){
 

 
  const gltf = useLoader(GLTFLoader, 'dancer.gltf')
  const cover = useLoader(TextureLoader, 'cover.jpeg')


  let plane = new THREE.PlaneGeometry( 40, 40, 40, 40 );


  const box = random.inBox(new Float32Array( gltf.nodes.mesh_0.geometry.attributes.position.array.length), { sides: [2, 2, 2] });
  const final = box.slice(0) // final buffer that will be used for the points mesh
 

      
    const PointMaterial = shaderMaterial(

        {
            uTime: 0,
            uResolution: {x: screen.width, y: screen.height},
            uTexture: cover
            
           
        },
        vertexShader,
        fragmentShader,
    
        
    )
    extend({PointMaterial})

   

const ref = useRef()
// Hold state for hovered and clicked events
const [hovered, hover] = useState(false)
const [clicked, click] = useState(false)




const pointMaterial = useRef()
useFrame((state, delta) => {
   pointMaterial.current.uTime += delta

  //   if (
  //    pointMaterial.current.uResolution.x === 0 &&
  //    pointMaterial.current.uResolution.y === 0
  //   ) {
  //    pointMaterial.current.uResolution.x = screen.width;
  //    pointMaterial.current.uResolution.y = screen.height;
     
  //   }
})


useFrame(({ clock }) => {
  const et = clock.getElapsedTime();
  const t = misc.remap(Math.sin(et *.2), [-1, 1], [0, 1]);
  const t2 = misc.remap(Math.cos(et * 3), [-1, 1], [0, 1]);

  // buffer.rotate(box, {
  //   q: q.setFromAxisAngle(rotationAxis, t2 * 0.1),
  // });

  buffer.lerp(box, gltf.nodes.mesh_0.geometry.attributes.position.array, final, t);
});



    return(

<>
<OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/>


        


     <Points positions={final} stride={3} ref={ref} >
       <pointMaterial ref={pointMaterial} depthWrite={false} transparent />
     </Points>


     <Text
        
        font="Basement.otf"
        scale={.1 }
        // maxWidth={1}
        position={ [ .0, 0.65, 0 ] }
       
        >
          {'Mutaaattori'.toUpperCase()}
          <meshBasicMaterial color={'white'} />

        
        </Text>
  
      </>
    )
}