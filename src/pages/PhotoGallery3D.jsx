import { useState, useMemo, useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

// =========================================
// תצורת הגלריה
// =========================================
const CONFIG = {
  colors: {
    background: '#0a0a0a',
    pastelBorders: ['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA', '#FFD9BA', '#E0BBE4'],
    light: '#ffffff',
  },
  counts: {
    photos: 12, // כמות התמונות להצגה
  },
  animation: {
    transitionSpeed: 2, // מהירות מעבר בין מצבים
  }
}

// =========================================
// קומפוננטת תמונות פולארויד מרחפות
// =========================================
function PhotoCards({ images, sceneState }) {
  const groupRef = useRef()
  const cardsRef = useRef([])

  // יצירת מידע אקראי לכל תמונה
  const cardData = useMemo(() => {
    return images.map((imgSrc, i) => {
      const angle = (i / images.length) * Math.PI * 2
      const radius = 15

      return {
        imgSrc,
        // מיקום ראשוני - פיזור אקראי
        chaosPos: new THREE.Vector3(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40
        ),
        // מיקום סופי - במעגל
        formedPos: new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle * 2) * 5,
          Math.sin(angle) * radius
        ),
        rotation: {
          chaos: new THREE.Euler(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          ),
          formed: new THREE.Euler(0, -angle + Math.PI / 2, 0)
        },
        borderColor: CONFIG.colors.pastelBorders[i % CONFIG.colors.pastelBorders.length],
        wobbleOffset: Math.random() * Math.PI * 2,
        spinSpeed: 0.2 + Math.random() * 0.3
      }
    })
  }, [images])

  // טעינת תמונות
  const textures = useLoader(
    THREE.TextureLoader,
    images
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const transitionProgress = Math.min(1, t / CONFIG.animation.transitionSpeed)

    cardsRef.current.forEach((card, i) => {
      if (!card) return
      const data = cardData[i]

      if (sceneState === 'CHAOS') {
        // מצב כאוס - סיבוב חופשי
        card.rotation.x += data.spinSpeed * 0.01
        card.rotation.y += data.spinSpeed * 0.01
      } else {
        // מצב מסודר - נדנוד עדין
        const wobble = Math.sin(t * 2 + data.wobbleOffset) * 0.05
        card.rotation.z = wobble
        card.position.y = data.formedPos.y + Math.sin(t + i) * 0.3
      }
    })

    // סיבוב כל הקבוצה
    if (groupRef.current && sceneState === 'FORMED') {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {cardData.map((data, i) => {
        const targetPos = sceneState === 'CHAOS' ? data.chaosPos : data.formedPos
        const targetRot = sceneState === 'CHAOS' ? data.rotation.chaos : data.rotation.formed

        return (
          <mesh
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            position={[targetPos.x, targetPos.y, targetPos.z]}
            rotation={[targetRot.x, targetRot.y, targetRot.z]}
          >
            {/* הכרטיס */}
            <boxGeometry args={[3, 4, 0.1]} />
            <meshStandardMaterial color="#ffffff" />

            {/* התמונה */}
            <mesh position={[0, 0.3, 0.051]}>
              <planeGeometry args={[2.7, 2.7]} />
              <meshStandardMaterial map={textures[i]} />
            </mesh>

            {/* התמונה בצד האחורי */}
            <mesh position={[0, 0.3, -0.051]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[2.7, 2.7]} />
              <meshStandardMaterial map={textures[i]} />
            </mesh>

            {/* מסגרת צבעונית */}
            <mesh position={[0, 0, 0.052]}>
              <planeGeometry args={[2.9, 3.5]} />
              <meshStandardMaterial color={data.borderColor} />
            </mesh>

            {/* מסגרת צבעונית בצד האחורי */}
            <mesh position={[0, 0, -0.052]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[2.9, 3.5]} />
              <meshStandardMaterial color={data.borderColor} />
            </mesh>

            {/* אור לכל תמונה */}
            <pointLight position={[0, 0, 2]} intensity={0.5} distance={5} color="#ffffff" />
          </mesh>
        )
      })}
    </group>
  )
}

// =========================================
// הסצינה התלת-מימדית
// =========================================
function Scene({ images, sceneState }) {
  return (
    <>
      {/* מצלמה ובקרות */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        autoRotate={sceneState === 'FORMED'}
        autoRotateSpeed={0.5}
        maxDistance={50}
        minDistance={5}
      />

      {/* תאורה */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffddaa" />

      {/* כוכבים ברקע */}
      <Stars radius={300} depth={60} count={5000} factor={7} />

      {/* התמונות */}
      <PhotoCards images={images} sceneState={sceneState} />

      {/* אפקטים */}
      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.2} />
        <Vignette offset={0.5} darkness={0.5} />
      </EffectComposer>
    </>
  )
}

// =========================================
// הקומפוננטה הראשית
// =========================================
export function PhotoGallery3D() {
  const [sceneState, setSceneState] = useState('FORMED') // CHAOS או FORMED
  const [images, setImages] = useState([])

  // טעינת תמונות ברירת מחדל (דוגמה)
  useEffect(() => {
    // כאן אפשר לטעון תמונות מהשרת או מהמשתמש
    const defaultImages = [
      'https://picsum.photos/400/400?random=1',
      'https://picsum.photos/400/400?random=2',
      'https://picsum.photos/400/400?random=3',
      'https://picsum.photos/400/400?random=4',
      'https://picsum.photos/400/400?random=5',
      'https://picsum.photos/400/400?random=6',
      'https://picsum.photos/400/400?random=7',
      'https://picsum.photos/400/400?random=8',
      'https://picsum.photos/400/400?random=9',
      'https://picsum.photos/400/400?random=10',
      'https://picsum.photos/400/400?random=11',
      'https://picsum.photos/400/400?random=12',
    ]
    setImages(defaultImages)
  }, [])

  const toggleState = () => {
    setSceneState(prev => prev === 'CHAOS' ? 'FORMED' : 'CHAOS')
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: CONFIG.colors.background }}>
      {/* Canvas תלת-מימדי */}
      <Canvas
        camera={{ position: [0, 5, 30], fov: 60 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene images={images} sceneState={sceneState} />
        </Suspense>
      </Canvas>

      {/* כפתורי בקרה */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '15px',
        zIndex: 1000
      }}>
        <button
          onClick={toggleState}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#fff',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          {sceneState === 'CHAOS' ? '🎯 סדר' : '💫 כאוס'}
        </button>
      </div>

      {/* הוראות */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: '#fff',
        background: 'rgba(0,0,0,0.7)',
        padding: '15px',
        borderRadius: '10px',
        fontSize: '14px',
        maxWidth: '250px',
        zIndex: 1000
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>🎨 הוראות שימוש</h3>
        <p style={{ margin: '5px 0' }}>🖱️ גרור עם העכבר לסיבוב</p>
        <p style={{ margin: '5px 0' }}>🔍 גלגלת לזום</p>
        <p style={{ margin: '5px 0' }}>🎯 לחץ על הכפתור למעבר בין מצבים</p>
      </div>
    </div>
  )
}
