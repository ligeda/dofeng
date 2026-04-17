"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Link from "next/link";

import { Html, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BarChart3,
  Boxes,
  BrainCircuit,
  Cpu,
  Database,
  Globe,
  MonitorCog,
  Router,
  ShieldAlert,
  ShoppingCart,
  Smartphone,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import * as THREE from "three";

type NodeBall = {
  id: string;
  name: string;
  description: string;
  position: [number, number, number];
  radius: number;
};

const NODE_BALLS: NodeBall[] = [
  {
    id: "official-website",
    name: "企业官网",
    description: "围绕品牌形象、业务介绍与线索转化，构建高可信企业门户站点。",
    position: [3.3, 0.8, 1.6],
    radius: 0.23,
  },
  {
    id: "admin-panel",
    name: "后台管理",
    description: "提供权限分级、业务配置与运营数据管理，支撑日常高效运维。",
    position: [-2.1, 2.7, -1.9],
    radius: 0.24,
  },
  {
    id: "data-dashboard",
    name: "数据大屏",
    description: "打通多源数据并实时可视化，帮助管理层快速洞察关键业务趋势。",
    position: [1.4, -2.9, -2.5],
    radius: 0.22,
  },
  {
    id: "mini-program",
    name: "小程序",
    description: "结合轻量触达与高频场景，构建微信生态下的快速业务入口。",
    position: [-3.4, -0.4, 1.2],
    radius: 0.21,
  },
  {
    id: "digital-twin",
    name: "3D孪生",
    description: "以三维可视化映射真实业务对象，实现监控、联动与仿真分析。",
    position: [0.5, 3.5, 1.3],
    radius: 0.2,
  },
  {
    id: "ecommerce",
    name: "线上商城",
    description: "覆盖商品、订单、支付与会员体系，打造完整电商交易闭环。",
    position: [-1.7, -3.1, -1.1],
    radius: 0.2,
  },
  {
    id: "seo",
    name: "SEO",
    description: "优化站内结构与内容语义，提升搜索引擎收录质量和自然排名。",
    position: [2.8, 1.7, -2.6],
    radius: 0.2,
  },
  {
    id: "geo",
    name: "GEO",
    description: "面向生成式搜索场景优化内容可见性，提升AI答案中的品牌曝光。",
    position: [-2.9, -1.6, 2.7],
    radius: 0.2,
  },
  {
    id: "cyber-security",
    name: "网络安全",
    description: "通过攻防加固、漏洞治理与安全审计，构建多层防护体系。",
    position: [1.0, 2.2, -3.4],
    radius: 0.2,
  },
  {
    id: "managed-ops",
    name: "运维托管",
    description: "提供7x24监控告警、故障应急与容量优化，保障系统稳定运行。",
    position: [-0.8, -2.3, 3.5],
    radius: 0.2,
  },
  {
    id: "continuous-iteration",
    name: "持续迭代",
    description: "基于数据反馈持续优化功能体验，推动产品稳定交付与长期演进。",
    position: [2.2, -1.9, 3.1],
    radius: 0.2,
  },
];

const CORE_COLOR = "#3B82F6"; // 主球高亮蓝，保证视觉中心
const NODE_COLOR_BY_ID: Record<string, string> = {
  "official-website": "#FF6B6B",
  "admin-panel": "#34D399",
  "data-dashboard": "#F59E0B",
  "mini-program": "#A78BFA",
  "digital-twin": "#22D3EE",
  ecommerce: "#F97316",
  seo: "#10B981",
  geo: "#F43F5E",
  "cyber-security": "#60A5FA",
  "managed-ops": "#FACC15",
  "continuous-iteration": "#FB7185",
};

const NODE_VISUALS: Record<string, { icon: LucideIcon; label: string }> = {
  "official-website": { icon: Globe, label: "WEB" },
  "admin-panel": { icon: MonitorCog, label: "ADMIN" },
  "data-dashboard": { icon: BarChart3, label: "BI" },
  "mini-program": { icon: Smartphone, label: "MINI" },
  "digital-twin": { icon: Boxes, label: "3D" },
  ecommerce: { icon: ShoppingCart, label: "SHOP" },
  seo: { icon: Router, label: "SEO" },
  geo: { icon: BrainCircuit, label: "GEO" },
  "cyber-security": { icon: ShieldAlert, label: "SAFE" },
  "managed-ops": { icon: Wrench, label: "OPS" },
  "continuous-iteration": { icon: Database, label: "ITER" },
};

const NODE_LINK_BY_ID: Partial<Record<string, string>> = {
  "official-website": "/officialWebsite",
};

const CODE_SNIPPETS = [
  "const app = express();",
  "app.use(express.json());",
  "import { readFile } from 'node:fs/promises';",
  "router.get('/health', (_, res) => res.send('ok'));",
  "const server = createServer(app);",
  "await prisma.user.findMany();",
  "type Result<T> = { data: T; error?: string };",
  "process.env.NODE_ENV === 'production'",
  "socket.on('connect', () => console.log('up'));",
  "export async function GET() { return NextResponse.json({ ok: true }) }",
  "const cache = new Map<string, number>();",
  "Promise.all(tasks).then(handleDone).catch(handleError);",
];

const CODE_COLORS = [
  "#569CD6",
  "#4EC9B0",
  "#DCDCAA",
  "#C586C0",
  "#CE9178",
  "#9CDCFE",
  "#B5CEA8",
  "#D16969",
];

function createSeededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function CodeStreamBackground() {
  const columns = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => {
        const rand = createSeededRandom(20260417 + index * 97);
        const lines = Array.from({ length: 10 }, () => {
          const snippet = CODE_SNIPPETS[Math.floor(rand() * CODE_SNIPPETS.length)];
          const color = CODE_COLORS[Math.floor(rand() * CODE_COLORS.length)];
          return { snippet, color };
        });

        return {
          id: index,
          left: (index / 18) * 100,
          duration: 18 + rand() * 14,
          delay: -rand() * 16,
          reverse: index % 3 === 0,
          opacity: 0.18 + rand() * 0.18,
          scale: 0.86 + rand() * 0.18,
          lines,
        };
      }),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {columns.map((column) => (
        <div
          key={column.id}
          className={`absolute top-0 ${column.reverse ? "animate-code-stream-down" : "animate-code-stream-up"}`}
          style={{
            left: `${column.left}%`,
            animationDuration: `${column.duration}s`,
            animationDelay: `${column.delay}s`,
            opacity: column.opacity,
            transform: `scale(${column.scale})`,
          }}
        >
          {column.lines.map((line, idx) => (
            <p
              key={`${column.id}-${idx}`}
              className="mb-5 whitespace-nowrap font-mono text-[11px] tracking-[0.04em]"
              style={{ color: line.color }}
            >
              {line.snippet}
            </p>
          ))}
        </div>
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(59,130,246,0.14),rgba(2,6,23,0.88)_55%,rgba(0,0,0,1)_100%)]" />
    </div>
  );
}

function Pipe({
  from,
  to,
}: {
  from: [number, number, number];
  to: [number, number, number];
}) {
  const start = new THREE.Vector3(...from);
  const end = new THREE.Vector3(...to);
  const center = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  const up = new THREE.Vector3(0, 1, 0);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    up,
    direction.clone().normalize(),
  );

  return (
    <group>
      <mesh position={[center.x, center.y, center.z]} quaternion={quaternion}>
        <cylinderGeometry args={[0.05, 0.05, length, 20]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.28}
          metalness={0.18}
          emissive="#ffffff"
          emissiveIntensity={0.12}
        />
      </mesh>
      <FlowPulse from={from} to={to} speed={1.1} />
    </group>
  );
}

function FlowPulse({
  from,
  to,
  speed = 1,
}: {
  from: [number, number, number];
  to: [number, number, number];
  speed?: number;
}) {
  const pulseRef = useRef<THREE.Mesh>(null);
  const start = useMemo(() => new THREE.Vector3(...from), [from]);
  const end = useMemo(() => new THREE.Vector3(...to), [to]);
  const travel = useMemo(() => new THREE.Vector3().subVectors(end, start), [end, start]);
  const seed = useMemo(
    () => createSeededRandom(hashString(`${from.join(",")}|${to.join(",")}`))(),
    [from, to],
  );

  useFrame(({ clock }) => {
    if (!pulseRef.current) return;
    const t = (clock.elapsedTime * speed * 0.45 + seed) % 1;
    pulseRef.current.position.set(
      start.x + travel.x * t,
      start.y + travel.y * t,
      start.z + travel.z * t,
    );
  });

  return (
    <mesh ref={pulseRef}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.15} />
    </mesh>
  );
}

function FloatingParticles({ paused }: { paused: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const spriteRefs = useRef<(THREE.Sprite | null)[]>([]);
  const lines = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => {
        const rand = createSeededRandom(9091 + index * 131);
        const theta = rand() * Math.PI * 2;
        const phi = Math.acos(rand() * 2 - 1);
        const radius = 4.6 + rand() * 7.4;
        const position = new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta),
        );
        const text = CODE_SNIPPETS[Math.floor(rand() * CODE_SNIPPETS.length)];
        const color = CODE_COLORS[Math.floor(rand() * CODE_COLORS.length)];
        return {
          id: index,
          text,
          color,
          position,
          driftSpeed: 0.2 + rand() * 0.45,
          driftSeed: rand() * Math.PI * 2,
          scale: 1.7 + rand() * 1.25,
        };
      }),
    [],
  );

  const textures = useMemo(
    () =>
      lines.map((line) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) return null;

        canvas.width = 640;
        canvas.height = 80;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = "600 28px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
        context.fillStyle = line.color;
        context.textBaseline = "middle";
        context.fillText(line.text, 14, canvas.height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        return texture;
      }),
    [lines],
  );

  useEffect(() => {
    return () => {
      textures.forEach((texture) => texture?.dispose());
    };
  }, [textures]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      if (!paused) {
        groupRef.current.rotation.y = clock.elapsedTime * 0.04;
        groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.13) * 0.1;
      }
    }

    lines.forEach((line, index) => {
      const sprite = spriteRefs.current[index];
      if (!sprite) return;
      const drift = paused
        ? Math.sin(line.driftSeed) * 0.42
        : Math.sin(clock.elapsedTime * line.driftSpeed + line.driftSeed) * 0.42;
      sprite.position.set(
        line.position.x,
        line.position.y + drift,
        line.position.z,
      );
    });
  });

  return (
    <group ref={groupRef}>
      {lines.map((line, index) => (
        <sprite
          key={line.id}
          ref={(node) => {
            spriteRefs.current[index] = node;
          }}
          position={[line.position.x, line.position.y, line.position.z]}
          scale={[line.scale, line.scale * 0.2, 1]}
        >
          <spriteMaterial
            map={textures[index] ?? undefined}
            transparent
            opacity={0.9}
            depthWrite={false}
            depthTest={false}
          />
        </sprite>
      ))}
    </group>
  );
}

function CoreSphere({
  coreColor,
  paused,
  hideLabel = false,
}: {
  coreColor: string;
  paused: boolean;
  hideLabel?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const shellMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const innerMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (meshRef.current) {
      if (!paused) {
        meshRef.current.rotation.y = t * 0.26;
        meshRef.current.rotation.x = Math.sin(t * 0.25) * 0.08;
      }
    }
    if (shellMaterialRef.current) {
      shellMaterialRef.current.opacity = 0.2 + Math.sin(t * 1.4) * 0.05;
    }
    if (innerMaterialRef.current) {
      innerMaterialRef.current.emissiveIntensity = 0.42 + Math.sin(t * 1.8) * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshPhysicalMaterial
          ref={shellMaterialRef}
          color={coreColor}
          transparent
          opacity={0.24}
          transmission={0.9}
          thickness={0.85}
          roughness={0.05}
          metalness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.58, 48, 48]} />
        <meshStandardMaterial
          ref={innerMaterialRef}
          color={coreColor}
          emissive={coreColor}
          emissiveIntensity={0.45}
          roughness={0.22}
          metalness={0.18}
        />
      </mesh>
      {!hideLabel ? (
        <Html
          center
          transform
          distanceFactor={8}
          zIndexRange={[20, 5]}
          style={{ pointerEvents: "none" }}
        >
          <div className="pointer-events-none flex flex-col items-center text-white">
            <Cpu size={18} />
            <p className="mt-1 text-[10px] font-semibold tracking-[0.2em]">dongliang</p>
          </div>
        </Html>
      ) : null}
    </group>
  );
}

function NodeOrb({
  node,
  nodeColor,
  paused,
  isActive,
  onClick,
}: {
  node: NodeBall;
  nodeColor: string;
  paused: boolean;
  isActive: boolean;
  onClick: () => void;
}) {
  const wrapperRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);
  const shellMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const innerMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const visual = NODE_VISUALS[node.id] ?? { icon: Cpu, label: "NODE" };
  const NodeIcon = visual.icon;
  const handleNodePick = (
    source: "text" | "outer-shell" | "inner-shell" | "hitbox",
    event: { stopPropagation: () => void },
  ) => {
    event.stopPropagation();
    onClick();
  };

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (wrapperRef.current) {
      wrapperRef.current.position.y = paused
        ? node.position[1]
        : node.position[1] + Math.sin(t * 0.9 + node.position[0]) * 0.05;
    }
    if (spinRef.current) {
      if (!paused) {
        spinRef.current.rotation.y = t * 0.55;
      }
    }
    if (shellMaterialRef.current) {
      shellMaterialRef.current.opacity =
        (isActive ? 0.26 : 0.2) + Math.sin(t * 1.5 + node.position[0]) * 0.04;
    }
    if (innerMaterialRef.current) {
      innerMaterialRef.current.emissiveIntensity = isActive ? 0.62 : 0.42;
    }
  });

  return (
    <group ref={wrapperRef} position={node.position}>
      <mesh
        onPointerDown={(event) => handleNodePick("hitbox", event)}
        onPointerUp={(event) => handleNodePick("hitbox", event)}
        onClick={(event) => handleNodePick("hitbox", event)}
      >
        <sphereGeometry args={[node.radius * 1.45, 24, 24]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
      <group
        ref={spinRef}
      >
        <mesh
          onPointerDown={(event) => handleNodePick("outer-shell", event)}
          onPointerUp={(event) => handleNodePick("outer-shell", event)}
          onClick={(event) => handleNodePick("outer-shell", event)}
        >
          <sphereGeometry args={[node.radius * 1.05, 64, 64]} />
          <meshPhysicalMaterial
            ref={shellMaterialRef}
            color={nodeColor}
            transparent
            opacity={0.22}
            transmission={0.88}
            thickness={0.5}
            roughness={0.08}
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>
        <mesh
          onPointerDown={(event) => handleNodePick("inner-shell", event)}
          onPointerUp={(event) => handleNodePick("inner-shell", event)}
          onClick={(event) => handleNodePick("inner-shell", event)}
        >
          <sphereGeometry args={[node.radius * 0.74, 56, 56]} />
          <meshStandardMaterial
            ref={innerMaterialRef}
            color={nodeColor}
            emissive={nodeColor}
            emissiveIntensity={0.42}
            roughness={0.24}
            metalness={0.16}
          />
        </mesh>
        <Html
          center
          transform
          sprite
          distanceFactor={10}
          style={{ pointerEvents: "auto" }}
        >
          <div
            className="pointer-events-auto flex cursor-pointer flex-col items-center text-white"
            onPointerDown={(event) => handleNodePick("text", event)}
            onClick={(event) => handleNodePick("text", event)}
          >
            <NodeIcon size={7} />
            <p className="mt-0.5 text-[5px] font-semibold tracking-[0.08em]">
              {visual.label}
            </p>
          </div>
        </Html>
      </group>
      {isActive ? (
        <Html
          position={[0, 0, 0]}
          center
          zIndexRange={[120, 0]}
          style={{ pointerEvents: "auto" }}
        >
          <div
            className="w-40 rounded-lg border border-slate-200 bg-white/95 p-2 text-slate-900 shadow-xl backdrop-blur-sm antialiased [text-rendering:optimizeLegibility]"
            style={{
              transform: "translate(26px, -84px)",
            }}
          >
            <p className="text-xs leading-4 font-semibold">{node.name}</p>
            <p className="mt-1 text-[11px] leading-4 text-slate-600">{node.description}</p>
            <div className="mt-2 flex justify-end">
              <Link
                href={NODE_LINK_BY_ID[node.id] ?? "#"}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-500"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                查看示例
              </Link>
            </div>
          </div>
        </Html>
      ) : null}
    </group>
  );
}

function BallNetwork({
  activeId,
  onActiveChange,
}: {
  activeId: string | null;
  onActiveChange: (id: string | null) => void;
}) {
  const ROTATE_DURATION_SECONDS = 0.5;
  // If you feel focused node is slightly off-center, tweak this value (e.g. -0.03 ~ 0.03).
  const FOCUS_X_COMPENSATION = 0;

  const structureRef = useRef<THREE.Group>(null);
  const themedNodes = useMemo(
    () =>
      NODE_BALLS.map((node) => ({
        ...node,
        color: NODE_COLOR_BY_ID[node.id] ?? "#E2E8F0",
      })),
    [],
  );
  const targetDirectionRef = useRef(new THREE.Vector3());
  const targetQuatRef = useRef(new THREE.Quaternion());
  const identityQuatRef = useRef(new THREE.Quaternion());
  const focusForwardRef = useRef(new THREE.Vector3(0, 0, 1));
  const cameraRightRef = useRef(new THREE.Vector3());
  const worldUpRef = useRef(new THREE.Vector3(0, 1, 0));
  const fromQuatRef = useRef(new THREE.Quaternion());
  const toQuatRef = useRef(new THREE.Quaternion());
  const animationProgressRef = useRef(1);
  const lastTargetIdRef = useRef<string | null>(null);

  const startRotationAnimation = (structure: THREE.Group, target: THREE.Quaternion) => {
    fromQuatRef.current.copy(structure.quaternion);
    toQuatRef.current.copy(target);
    animationProgressRef.current = 0;
  };

  useFrame(({ camera }, delta) => {
    const structure = structureRef.current;
    if (!structure) return;

    let desiredQuat = identityQuatRef.current;
    if (activeId) {
      const targetNode = themedNodes.find((node) => node.id === activeId);
      if (!targetNode) return;

      targetDirectionRef.current
        .set(targetNode.position[0], targetNode.position[1], targetNode.position[2])
        .normalize();

      // Always focus to current camera-facing direction, so selected node comes to screen center.
      focusForwardRef.current.copy(camera.position).normalize();
      cameraRightRef.current
        .crossVectors(worldUpRef.current, focusForwardRef.current)
        .normalize();
      focusForwardRef.current
        .addScaledVector(cameraRightRef.current, FOCUS_X_COMPENSATION)
        .normalize();

      targetQuatRef.current.setFromUnitVectors(
        targetDirectionRef.current,
        focusForwardRef.current,
      );
      desiredQuat = targetQuatRef.current;
    }

    if (lastTargetIdRef.current !== activeId) {
      startRotationAnimation(structure, desiredQuat);
      lastTargetIdRef.current = activeId;
    }

    if (animationProgressRef.current < 1) {
      animationProgressRef.current = Math.min(
        1,
        animationProgressRef.current + delta / ROTATE_DURATION_SECONDS,
      );
      const t = animationProgressRef.current;
      structure.quaternion.copy(fromQuatRef.current).slerp(toQuatRef.current, t);
      return;
    }

    structure.quaternion.copy(toQuatRef.current);
  });

  return (
    <group onPointerMissed={() => onActiveChange(null)}>
      <ambientLight intensity={0.75} />
      <directionalLight position={[6, 8, 5]} intensity={1.25} />
      <pointLight position={[-6, -4, -6]} intensity={0.6} />
      <pointLight position={[0, 0, 0]} intensity={0.7} color="#60a5fa" />
      <FloatingParticles paused={Boolean(activeId)} />

      <group ref={structureRef}>
        <CoreSphere
          coreColor={CORE_COLOR}
          paused={Boolean(activeId)}
          hideLabel={Boolean(activeId)}
        />

        {themedNodes.map((node) => (
          <group key={node.id}>
            <Pipe from={[0, 0, 0]} to={node.position} />
            <NodeOrb
              node={node}
              nodeColor={node.color}
              paused={Boolean(activeId)}
              isActive={activeId === node.id}
              onClick={() => onActiveChange(node.id)}
            />
          </group>
        ))}
      </group>
    </group>
  );
}

export default function Home() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-slate-100">
      <CodeStreamBackground />
      <Canvas
        className="relative z-10 h-screen w-screen"
        camera={{ position: [0, 0.6, 8], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ scene }) => {
          scene.background = null;
        }}
      >
        <BallNetwork activeId={activeNodeId} onActiveChange={setActiveNodeId} />
        <OrbitControls
          enablePan={false}
          minDistance={4.2}
          maxDistance={13}
          autoRotate={!activeNodeId}
          autoRotateSpeed={0.45}
        />
      </Canvas>

      <div className="pointer-events-none absolute top-6 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/20 bg-black/55 px-4 py-2 text-sm text-slate-200 backdrop-blur">
        拖拽旋转 · 滚轮缩放 · 点击彩色节点查看说明
      </div>

      <style jsx>{`
        .animate-code-stream-up {
          animation-name: codeStreamUp;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .animate-code-stream-down {
          animation-name: codeStreamDown;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes codeStreamUp {
          0% {
            transform: translateY(115vh);
          }
          100% {
            transform: translateY(-120vh);
          }
        }
        @keyframes codeStreamDown {
          0% {
            transform: translateY(-120vh);
          }
          100% {
            transform: translateY(115vh);
          }
        }
      `}</style>
    </main>
  );
}
