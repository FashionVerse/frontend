import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Model = (props) => {
  const gltf = useLoader(
    GLTFLoader,
    props.link
  );
  return <primitive object={gltf.scene} scale={0.5} />;
};

export default Model
