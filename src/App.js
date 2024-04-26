import { Canvas } from '@react-three/fiber'
import { Environment, FaceLandmarker, FaceControls, Stats } from '@react-three/drei'
import { EffectComposer, Autofocus } from '@react-three/postprocessing'
import { useControls } from 'leva'
delete globalThis.process?.versions?.node

const bokehScaleMinMax = [0, 100]
export default function App() {
  return (
    <Canvas>
      <FaceLandmarker>
        <Scene />
      </FaceLandmarker>
    </Canvas>
  )
}

function Scene() {
  const gui = useControls({
    sphereSize: { value: 1, min: 0, max: 5 },
    bokehScale: { value: 70, min: bokehScaleMinMax[0], max: bokehScaleMinMax[1] }
  })

  return (
    <>
      <mesh>
        <sphereGeometry args={[gui.sphereSize, 64, 64]} />
        <meshPhysicalMaterial clearcoat={1} envMapIntensity={2} roughness={0} color="black" />
      </mesh>
      <Environment files="https://storage.googleapis.com/abernier-portfolio/lebombo_2k.hdr" background />

      <FaceControls offsetScalar={15} />

      <ambientLight intensity={1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      <EffectComposer>
        <Autofocus debug={0.02} focusRange={0.001} bokehScale={gui.bokehScale} />
      </EffectComposer>

      <Stats />
    </>
  )
}
