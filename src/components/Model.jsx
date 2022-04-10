import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { USDZExporter } from 'three/examples/jsm/exporters/USDZExporter.js';
import React from 'react';
const Model = (props) => {
  const gltf = useLoader(
    GLTFLoader,
    props.link
  );
  const exporter = new USDZExporter();
  const arraybuffer = exporter.parse( gltf.scene );
  const blob = new Blob( [ arraybuffer ], { type: 'application/octet-stream' } );
  React.useEffect(() => {
  const link = document.body.appendChild( document.createElement( 'a' ) );
  link.href = URL.createObjectURL( blob );
  link.textContent = "Hello World";
  console.log(blob)
  link.download = 'scene.usdz';
  link.rel="ar";
  }, [])
  return(
  <>
    <primitive object={gltf.scene} scale={0.5} />
  </>
  );
};

export default Model
