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
    if(document.getElementById('product-container')){
      // const link = document.getElementById('product-container').appendChild( document.createElement( 'a' ) );
      // link.href = URL.createObjectURL( blob );
      // link.rel="ar";
      // link.style = "top: 0; right: 0; position: absolute;";
      // const img = link.appendChild(document.createElement('img'));
      // img.src="https://threejs.org/examples/files/arkit.png";
      // img.widht="100";
      // img.id="button";
      // link.download = 'asset.usdz';
    }
    console.log(gltf.scene);
    console.log(blob)
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
