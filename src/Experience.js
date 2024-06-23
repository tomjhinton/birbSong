import {  useGLTF, Text, Float } from "@react-three/drei"
import { OrbitControls , shaderMaterial, Center} from '@react-three/drei'
import { EffectComposer } from '@react-three/postprocessing'
import { useRef , useEffect, useState, useMemo} from "react"
import { Perf } from "r3f-perf"
import * as THREE from 'three'
import { useThree } from "@react-three/fiber"
import { Suspense } from "react"


import Mutaaattori from "./Mutaaattori/Mutaaattori.js"






export default function Experience(){



    return <>
      <OrbitControls makeDefault enableZoom={true}/>
      <Center>
      
        <Mutaaattori />
        </Center>

    </>
}