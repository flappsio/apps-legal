import { ChangeEvent, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { Model } from '@/components/s21';

export default function ModelPreviewPage() {
  const [screenImage, setScreenImage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setScreenImage(objectUrl);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_35%),_#f5f5f4] text-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-mono uppercase tracking-[0.26em] text-primary">
              3D Preview
            </p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
              Samsung Galaxy S21 Model
            </h1>
          </div>

          <label className="inline-flex cursor-pointer items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:border-black/20 hover:shadow-md">
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            Upload image
          </label>
        </div>

        <div className="relative h-[650px] overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.45),_transparent_55%)]" />

          <Canvas camera={{ position: [0, 0, 42], fov: 7 }} shadows>
            <color attach="background" args={['#f5f5f4']} />
            {/* <fog attach="fog" args={['#f5f5f4', 18, 44]} /> */}

            <ambientLight intensity={1.6} />
            <directionalLight
              position={[4, 6, 4]}
              intensity={2.9}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <pointLight position={[-3, 2, 4]} intensity={16} color="#dbeafe" />
            <pointLight position={[2, -2, 4]} intensity={8} color="#f3e8ff" />

            <Suspense fallback={null}>
              <group rotation={[0.2, -0.85, 0]} position={[0, -0.1, 0]} scale={0.2}>
                <Model screenTextureUrl={screenImage ?? undefined} />
              </group>
              <ContactShadows
                position={[0, -1.7, 0]}
                opacity={0.3}
                scale={24}
                blur={6.5}
                far={5.5}
              />
            </Suspense>

            <OrbitControls
              enablePan={false}
              enableDamping
              minDistance={12}
              maxDistance={35}
              minPolarAngle={Math.PI / 2.9}
              maxPolarAngle={Math.PI / 1.7}
              zoomSpeed={0.9}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
