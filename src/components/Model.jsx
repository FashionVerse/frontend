import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { USDZExporter } from 'three/examples/jsm/exporters/USDZExporter';
import React from 'react';

const Model = (props) => {
  const [data, dataSet] = React.useState(null)
  const gltf = useLoader(
    GLTFLoader,
    props.link
  );
  const parseUSDZ = React.useCallback(async () => {
    const exporter = new USDZExporter();
    const arraybuffer = await exporter.parse( gltf.scene );
    console.log(arraybuffer)
    const blob = new Blob( [ arraybuffer ], { type: 'application/octet-stream' } );
    const link = document.body.appendChild( document.createElement( 'a' ) );
    link.href = URL.createObjectURL( blob );
    link.textContent = "Hello World";
    link.rel="ar";
    console.log(gltf.scene);
    console.log(blob)
    link.download = 'asset.usdz';
  }, [])
  React.useEffect(() => {
    parseUSDZ()
  }, [parseUSDZ])
  return(
  <>
    <primitive object={gltf.scene} scale={0.5} />
  </>
  );
};

export default Model
