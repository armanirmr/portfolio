import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	ArrowUpRight,
	Asterisk,
	Copy,
	Mail,
	Volume2,
	VolumeX,
	X,
} from "lucide-react";
import "./style.css";

const destinations = [
	{ id: "work", label: "THE WORK", hint: "LAPTOP / PROJECTS", x: -2.65 },
	{ id: "engineer", label: "THE ENGINEER", hint: "MEET ARMANI", x: -0.88 },
	{ id: "toolkit", label: "THE TOOLKIT", hint: "HOW I BUILD", x: 0.9 },
	{ id: "contact", label: "GET IN TOUCH", hint: "OPEN THE LETTER", x: 2.67 },
];

const projects = [
	{
		name: "CHANGEWEFT",
		kind: "AI SOFTWARE DELIVERY",
		note: "Repository-grounded plans, code changes, isolated verification, and traceable diffs.",
		tech: "Next.js · TypeScript · Drizzle · PostgreSQL",
		url: "https://changeweft.armanirmr.workers.dev/",
	},
	{
		name: "BAJA COORDINATOR SERVICES",
		kind: "BILINGUAL CUSTOMER APP",
		note: "English and Spanish experience with validated forms and more accurate data capture.",
		tech: "Next.js · React · i18n",
		url: "https://www.bajacoordinatorservices.com/",
	},
	{
		name: "FULIKULI / FLKL",
		kind: "MUSIC SITE · FULIKULI OS",
		note: "A playful, retro desktop inspired home for the band and its latest release.",
		tech: "Next.js · Motion · Web",
		url: "https://flkl.vercel.app/",
	},
];

const SOUND_PREFERENCE_COOKIE = "portfolio-sound";
function readSoundPreference() {
	const value = document.cookie
		.split(";")
		.map((entry) => entry.trim())
		.find((entry) => entry.startsWith(`${SOUND_PREFERENCE_COOKIE}=`))
		?.split("=")[1];
	return value === "on" ? true : value === "off" ? false : null;
}
function writeSoundPreference(enabled) {
	document.cookie = `${SOUND_PREFERENCE_COOKIE}=${enabled ? "on" : "off"}; Max-Age=31536000; Path=/; SameSite=Lax`;
	soundEnabled = enabled;
}
let soundEnabled = readSoundPreference() === true;
let soundUnlocked = Boolean(navigator.userActivation?.hasBeenActive);
const soundBank = {};
function playSound(name, volume = 0.5) {
	if (!soundEnabled || !soundUnlocked) return;
	try {
		const base =
			soundBank[name] ||
			(soundBank[name] = Object.assign(new Audio(`/sounds/${name}.mp3`), {
				preload: "auto",
			}));
		const clip = base.cloneNode();
		clip.volume = volume;
		clip.play().catch(() => {});
	} catch {}
}

function drawLaptopDisplay(ctx, selected = -1, hovered = -1) {
	const { canvas } = ctx;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#f8e52a";
	ctx.fillRect(0, 0, 512, 320);
	ctx.fillStyle = "#d92e19";
	ctx.fillRect(0, 0, 5, 320);
	ctx.fillStyle = "#27b7c5";
	ctx.fillRect(5, 0, 4, 320);
	ctx.fillStyle = "#f28b18";
	ctx.fillRect(9, 0, 4, 320);
	ctx.fillStyle = "#292820";
	ctx.fillRect(13, 0, 499, 46);
	ctx.fillStyle = "#ffe52c";
	ctx.fillRect(13, 44, 499, 3);
	ctx.fillStyle = "#fff4d7";
	ctx.font = '900 16px "Minerva Modern"';
	ctx.fillText("ARMANI ROMERO  /  WORK", 27, 29);
	ctx.fillStyle = "#8be1e7";
	ctx.font = '700 11px "Minerva Modern"';
	ctx.textAlign = "right";
	ctx.fillText("PROJECT FILES  ·  03", 495, 28);
	ctx.textAlign = "left";
	if (selected >= 0) {
		const p = projects[selected];
		const backHot = hovered === -2,
			visitHot = hovered === -3;
		ctx.fillStyle = backHot ? "#292820" : "#fff4d7";
		ctx.fillRect(24, 54, 133, 25);
		ctx.strokeStyle = "#292820";
		ctx.lineWidth = 2;
		ctx.strokeRect(24, 54, 133, 25);
		ctx.fillStyle = backHot ? "#ffe52c" : "#292820";
		ctx.font = '700 11px "Minerva Modern"';
		ctx.fillText("‹  ALL PROJECTS", 34, 71);
		ctx.fillStyle = "#a72a16";
		ctx.font = '700 12px "Minerva Modern"';
		ctx.fillText(p.kind, 28, 101);
		ctx.fillStyle = "#292820";
		ctx.font = '900 27px "Minerva Modern"';
		ctx.fillText(p.name, 28, 137, 454);
		ctx.fillStyle = "#fff4d7";
		ctx.fillRect(24, 151, 464, 69);
		ctx.strokeStyle = "#292820";
		ctx.lineWidth = 2;
		ctx.strokeRect(24, 151, 464, 69);
		ctx.fillStyle = "#292820";
		ctx.font = 'italic 400 16px "Minerva Modern"';
		wrapCanvasText(ctx, p.note, 36, 176, 438, 21);
		ctx.fillStyle = "#292820";
		ctx.font = '700 10px "Minerva Modern"';
		ctx.fillText("BUILT WITH", 28, 238);
		ctx.fillStyle = "#a72a16";
		ctx.font = '700 12px "Minerva Modern"';
		ctx.fillText(p.tech, 28, 254, 454);
		ctx.fillStyle = visitHot ? "#ff5a25" : "#292820";
		ctx.fillRect(24, 263, 464, 44);
		ctx.strokeStyle = "#292820";
		ctx.lineWidth = 3;
		ctx.strokeRect(24, 263, 464, 44);
		ctx.fillStyle = "#fff4d7";
		ctx.font = '900 16px "Minerva Modern"';
		ctx.fillText("VISIT PROJECT SITE", 40, 291);
		ctx.font = '900 22px "Minerva Modern"';
		ctx.textAlign = "right";
		ctx.fillText("↗", 472, 292);
		ctx.textAlign = "left";
		return;
	}
	ctx.fillStyle = "#292820";
	ctx.font = '700 12px "Minerva Modern"';
	ctx.fillText("PICK A PROJECT TO OPEN ITS FILE", 25, 67);
	ctx.fillStyle = "#a72a16";
	ctx.textAlign = "right";
	ctx.font = '700 11px "Minerva Modern"';
	ctx.fillText("03 PROJECTS", 488, 67);
	ctx.textAlign = "left";
	projects.forEach((p, i) => {
		const y = 80 + i * 67,
			isHot = hovered === i;
		ctx.fillStyle = isHot ? "#ff6428" : "#fff4b2";
		ctx.fillRect(23, y, 465, 58);
		ctx.strokeStyle = "#292820";
		ctx.lineWidth = 2;
		ctx.strokeRect(23, y, 465, 58);
		ctx.fillStyle = "#292820";
		ctx.fillRect(30, y + 7, 43, 44);
		ctx.fillStyle = "#ffe52c";
		ctx.font = '700 14px "Minerva Modern"';
		ctx.textAlign = "center";
		ctx.fillText(`0${i + 1}`, 51, y + 34);
		ctx.textAlign = "left";
		ctx.fillStyle = "#292820";
		ctx.font = '900 19px "Minerva Modern"';
		ctx.fillText(p.name, 86, y + 25, 344);
		ctx.fillStyle = "#554b34";
		ctx.font = 'italic 400 11px "Minerva Modern"';
		ctx.fillText(p.kind, 87, y + 43, 344);
		ctx.fillStyle = "#292820";
		ctx.font = '900 23px "Minerva Modern"';
		ctx.textAlign = "right";
		ctx.fillText("›", 477, y + 39);
		ctx.textAlign = "left";
	});
	ctx.fillStyle = "#292820";
	ctx.fillRect(13, 284, 499, 36);
	ctx.fillStyle = "#ffe52c";
	ctx.font = '700 11px "Minerva Modern"';
	ctx.fillText("SELECT A FILE  /  INSPECT BEFORE VISITING", 25, 307);
}
function drawLaptopSignal(
	ctx,
	pixels,
	uiCanvas,
	uiCtx,
	elapsed,
	animate,
	selected,
	hovered,
) {
	drawLaptopDisplay(uiCtx, selected, hovered);
	if (!animate || elapsed >= 420) {
		ctx.drawImage(uiCanvas, 0, 0);
		return true;
	}
	if (elapsed < 80) {
		for (let i = 0; i < pixels.data.length; i += 4) {
			const n = Math.random() * 255;
			pixels.data[i] = n;
			pixels.data[i + 1] = n * 0.8 + 22;
			pixels.data[i + 2] = n * 0.36;
			pixels.data[i + 3] = 255;
		}
		ctx.putImageData(pixels, 0, 0);
		return false;
	}
	const progress = Math.min(1, (elapsed - 80) / 340),
		ease = 1 - Math.pow(1 - progress, 3),
		height = 16 + (320 - 16) * ease,
		top = (320 - height) / 2;
	ctx.fillStyle = "#1e2426";
	ctx.fillRect(0, 0, 512, 320);
	ctx.save();
	ctx.beginPath();
	ctx.rect(0, top, 512, height);
	ctx.clip();
	ctx.drawImage(uiCanvas, 0, 0);
	ctx.restore();
	if (progress < 0.96) {
		ctx.save();
		ctx.shadowColor = "#7fe6ef";
		ctx.shadowBlur = 9;
		ctx.fillStyle = "#fff4d7";
		ctx.fillRect(0, top - 1, 512, 2);
		ctx.fillRect(0, top + height - 1, 512, 2);
		ctx.restore();
	}
	return progress >= 1;
}
function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
	const words = text.split(" ");
	let line = "";
	for (const word of words) {
		const test = line + word + " ";
		if (ctx.measureText(test).width > maxWidth && line) {
			ctx.fillText(line, x, y);
			line = word + " ";
			y += lineHeight;
		} else line = test;
	}
	ctx.fillText(line, x, y);
}
function drawLetter(ctx) {
	const { canvas } = ctx,
		w = canvas.width,
		h = canvas.height;
	ctx.clearRect(0, 0, w, h);
	ctx.fillStyle = "#fff4d7";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "#c7b99d";
	ctx.lineWidth = 2;
	ctx.strokeRect(16, 16, w - 32, h - 32);
	ctx.fillStyle = "#c22303";
	ctx.font = "bold 19px monospace";
	ctx.fillText("A NOTE FROM COLIMA  /  01", 38, 54);
	ctx.fillStyle = "#292820";
	ctx.font = 'bold 62px "M PLUS Rounded 1c"';
	ctx.fillText("LET’S MAKE", 38, 150);
	ctx.fillStyle = "#c22303";
	ctx.fillText("SOMETHING.", 38, 220);
	ctx.fillStyle = "#514b3e";
	ctx.font = '24px "M PLUS 1p"';
	ctx.fillText("Have a thoughtful idea or a useful problem to solve?", 38, 278);
	ctx.strokeStyle = "#b9aa8e";
	ctx.beginPath();
	ctx.moveTo(38, 316);
	ctx.lineTo(w - 38, 316);
	ctx.stroke();
	ctx.fillStyle = "#625b4c";
	ctx.font = "bold 15px monospace";
	ctx.fillText("WRITE DIRECTLY", 38, 354);
	ctx.fillStyle = "#c22303";
	ctx.font = 'bold 27px "M PLUS Rounded 1c"';
	ctx.fillText("armanirmr@gmail.com", 38, 397);
}
function Diorama({
	active,
	onSelect,
	motion,
	keyboardProject,
	onProjectSelect,
	contactCardRef,
	onSceneError,
}) {
	const host = useRef(null),
		activeRef = useRef(active),
		selectRef = useRef(onSelect),
		motionRef = useRef(motion),
		invalidateScene = useRef(() => {});
	const sceneErrorRef = useRef(onSceneError);
	sceneErrorRef.current = onSceneError;
	const keyboardProjectRef = useRef(keyboardProject),
		projectSelectRef = useRef(onProjectSelect);
	activeRef.current = active;
	selectRef.current = onSelect;
	motionRef.current = motion;
	keyboardProjectRef.current = keyboardProject;
	projectSelectRef.current = onProjectSelect;
	useEffect(() => {
		invalidateScene.current();
	}, [active, motion, keyboardProject]);
	useEffect(() => {
		const el = host.current;
		if (!el) return;
		let cancelled = false,
			stopScene = () => {};
		const initialize = async () => {
			const [
				THREE,
				{ GLTFLoader },
				{ EffectComposer },
				{ RenderPass },
				{ OutlinePass },
				{ OutputPass },
			] = await Promise.all([
				import("./three-runtime.js"),
				import("three/addons/loaders/GLTFLoader.js"),
				import("three/addons/postprocessing/EffectComposer.js"),
				import("three/addons/postprocessing/RenderPass.js"),
				import("three/addons/postprocessing/OutlinePass.js"),
				import("three/addons/postprocessing/OutputPass.js"),
			]);
			if (cancelled) return;
			let disposed = false,
				frame = null,
				hovered = null,
				lastHovered = null,
				lastActive = null,
				focusStarted = 0,
				staticFrame = 0,
				touchOrigin = null,
				suppressClickUntil = 0,
				workFontsReady = false;
			Promise.allSettled([
				document.fonts.load('700 14px "Minerva Modern"'),
				document.fonts.load('900 20px "Minerva Modern"'),
				document.fonts.load('italic 400 14px "Minerva Modern"'),
			]).then(() => {
				workFontsReady = true;
			});
			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(
				33,
				el.clientWidth / el.clientHeight,
				0.1,
				80,
			);
			const baseCamera = new THREE.Vector3(0, 4.2, 12.7),
				baseLook = new THREE.Vector3(0, 0.55, 0),
				mobileBaseCamera = new THREE.Vector3(0, 4.1, 17.5),
				mobileBaseLook = new THREE.Vector3(0, 0.85, 0);
			camera.position.copy(baseCamera);
			camera.lookAt(baseLook);
			const renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true,
			});
			renderer.domElement.setAttribute("aria-hidden", "true");
			renderer.domElement.tabIndex = -1;
			renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
			renderer.setSize(el.clientWidth, el.clientHeight);
			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.PCFShadowMap;
			renderer.outputColorSpace = THREE.SRGBColorSpace;
			renderer.toneMapping = THREE.ACESFilmicToneMapping;
			renderer.toneMappingExposure = 1.12;
			el.appendChild(renderer.domElement);
			const onContextLost = (event) => {
				event.preventDefault();
				sceneErrorRef.current?.(true);
			};
			const onContextRestored = () => {
				sceneErrorRef.current?.(false);
				invalidateScene.current();
			};
			renderer.domElement.addEventListener("webglcontextlost", onContextLost);
			renderer.domElement.addEventListener(
				"webglcontextrestored",
				onContextRestored,
			);
			const composer = new EffectComposer(renderer);
			composer.addPass(new RenderPass(scene, camera));
			const outlinePass = new OutlinePass(
				new THREE.Vector2(el.clientWidth, el.clientHeight),
				scene,
				camera,
			);
			outlinePass.edgeStrength = 2.1;
			outlinePass.edgeThickness = 1.15;
			outlinePass.edgeGlow = 0;
			outlinePass.visibleEdgeColor.set("#352e2a");
			outlinePass.hiddenEdgeColor.set("#352e2a");
			composer.addPass(outlinePass);
			const outputPass = new OutputPass();
			composer.addPass(outputPass);
			scene.add(new THREE.HemisphereLight("#fff6d7", "#75563e", 2));
			const sun = new THREE.DirectionalLight("#fff0b5", 3.4);
			sun.position.set(-4, 8, 6);
			sun.castShadow = true;
			sun.shadow.mapSize.set(1024, 1024);
			scene.add(sun);
			const toonRamp = new THREE.DataTexture(
				new Uint8Array([82, 145, 207, 255]),
				4,
				1,
				THREE.RedFormat,
				THREE.UnsignedByteType,
			);
			toonRamp.minFilter = THREE.NearestFilter;
			toonRamp.magFilter = THREE.NearestFilter;
			toonRamp.wrapS = THREE.ClampToEdgeWrapping;
			toonRamp.generateMipmaps = false;
			toonRamp.needsUpdate = true;
			const toonMaterialCache = new WeakMap();
			const asToonMaterial = (source) => {
				if (source.isMeshToonMaterial) return source;
				if (
					!(
						source.isMeshStandardMaterial ||
						source.isMeshPhysicalMaterial ||
						source.isMeshLambertMaterial ||
						source.isMeshPhongMaterial
					)
				)
					return source;
				let toon = toonMaterialCache.get(source);
				if (!toon) {
					toon = new THREE.MeshToonMaterial({
						color: source.color,
						map: source.map,
						alphaMap: source.alphaMap,
						alphaTest: source.alphaTest,
						transparent: source.transparent,
						opacity: source.opacity,
						side: source.side,
						vertexColors: source.vertexColors,
						flatShading: source.flatShading,
						emissive: source.emissive,
						emissiveMap: source.emissiveMap,
						emissiveIntensity: source.emissiveIntensity,
						normalMap: source.normalMap,
						normalScale: source.normalScale,
						aoMap: source.aoMap,
						aoMapIntensity: source.aoMapIntensity,
						lightMap: source.lightMap,
						lightMapIntensity: source.lightMapIntensity,
						displacementMap: source.displacementMap,
						displacementScale: source.displacementScale,
						displacementBias: source.displacementBias,
						depthTest: source.depthTest,
						depthWrite: source.depthWrite,
						toneMapped: source.toneMapped,
						gradientMap: toonRamp,
					});
					toon.name = source.name;
					toonMaterialCache.set(source, toon);
				}
				return toon;
			};
			const material = (color) =>
				new THREE.MeshToonMaterial({
					color,
					flatShading: true,
					gradientMap: toonRamp,
				});
			const colors = {
				ink: material("#302f2a"),
				cream: material("#f8e9c9"),
				paper: material("#fff4d7"),
				red: material("#c22303"),
				yellow: material("#ffe52c"),
				blue: material("#7fe6ef"),
				sage: material("#a8a77d"),
				brown: material("#856247"),
				white: material("#f4eee0"),
			};
			const add = (parent, geometry, mat, position, scale) => {
				const mesh = new THREE.Mesh(geometry, mat);
				mesh.position.set(...position);
				if (scale) mesh.scale.set(...scale);
				mesh.castShadow = true;
				mesh.receiveShadow = true;
				parent.add(mesh);
				return mesh;
			};
			const floor = add(
				scene,
				new THREE.CircleGeometry(11, 64),
				material("#dfbd82"),
				[0, -0.12, 0],
			);
			floor.rotation.x = -Math.PI / 2;
			floor.receiveShadow = true;
			// Sunny Inaba-like hills and little roofs behind the interactive objects.
			const hillMat = material("#b4aa7a");
			[
				[-6, -3.4, 1.5, 2.1],
				[5.6, -3.8, 1.6, 2.2],
				[-3.6, -4.6, 1.1, 1.5],
				[3.7, -5, 0.95, 1.6],
			].forEach(([x, z, sx, sz], i) => {
				const h = add(
					scene,
					new THREE.SphereGeometry(1, 10, 7),
					i % 2 ? colors.sage : hillMat,
					[x, -0.03, z],
					[sx, 0.66, sz],
				);
				h.receiveShadow = true;
			});
			const glowSun = add(
				scene,
				new THREE.CircleGeometry(1.05, 48),
				new THREE.MeshBasicMaterial({ color: "#f1cf72" }),
				[3.5, 4.2, -4.8],
			);
			const house = (x, z, s, wall, roof) => {
				const g = new THREE.Group();
				g.position.set(x, 0, z);
				g.scale.setScalar(s);
				scene.add(g);
				add(
					g,
					new THREE.BoxGeometry(1.3, 0.85, 0.9),
					material(wall),
					[0, 0.43, 0],
				);
				const cap = add(
					g,
					new THREE.ConeGeometry(0.98, 0.62, 4),
					material(roof),
					[0, 1.08, 0],
				);
				cap.rotation.y = Math.PI / 4;
				add(
					g,
					new THREE.BoxGeometry(0.24, 0.34, 0.035),
					colors.blue,
					[-0.37, 0.45, 0.47],
				);
				add(
					g,
					new THREE.BoxGeometry(0.24, 0.34, 0.035),
					colors.blue,
					[0.37, 0.45, 0.47],
				);
				add(
					g,
					new THREE.BoxGeometry(0.26, 0.53, 0.05),
					colors.red,
					[0, 0.28, 0.48],
				);
			};
			house(-4.25, -2.75, 0.85, "#f0dfbd", "#c22303");
			house(4.35, -3, 0.82, "#e7e2cd", "#7fe6ef");
			const treeMat = material("#88936d");
			[
				[-4.15, -1.3, 0.7],
				[-3.7, -2.5, 0.5],
				[3.7, -1.6, 0.58],
				[4.2, -2.4, 0.72],
			].forEach(([x, z, s]) => {
				add(
					scene,
					new THREE.CylinderGeometry(0.055, 0.1, 0.7, 7),
					colors.brown,
					[x, 0.15, z],
					[s, s, s],
				);
				const t = add(
					scene,
					new THREE.IcosahedronGeometry(0.38, 1),
					treeMat,
					[x, 0.68 * s, z],
					[s, s * 1.3, s],
				);
			});
			// A miniature rail bed anchors the world to its small-town setting.
			[-0.22, 0.22].forEach((z) =>
				add(scene, new THREE.BoxGeometry(8, 0.035, 0.035), colors.ink, [
					0,
					0.01,
					z - 1.55,
				]),
			);
			for (let i = 0; i < 18; i++)
				add(scene, new THREE.BoxGeometry(0.12, 0.035, 0.65), colors.brown, [
					-3.85 + i * 0.46,
					0.005,
					-1.55,
				]);
			const roots = {},
				pieces = {},
				gltfLoader = new GLTFLoader(),
				engineerClips = {},
				toolboxClips = {},
				envelopeClips = {},
				engineerClipLoading = {},
				toolboxClipLoading = {};
			let envelopeCloseLoading = false,
				toolboxDesiredMode = "idle",
				envelopeDesiredMode = "closed";
			const engineerModeForFocus = (id) =>
				id === "engineer"
					? "wave"
					: id === "work"
						? "looking"
						: id === "toolkit"
							? "pointing"
							: "idle";
			const disposeClipScene = (gltf) =>
				gltf.scene.traverse((o) => {
					if (o.geometry) o.geometry.dispose();
					if (o.material) {
						const mats = Array.isArray(o.material) ? o.material : [o.material];
						mats.forEach((m) => {
							if (m.map) m.map.dispose();
							m.dispose();
						});
					}
				});
			const loadEngineerClip = (mode) => {
				const files = {
					wave: "morrillo_waving",
					looking: "morrillo_looking",
					pointing: "morrillo_pointing",
				};
				if (engineerClips[mode] || engineerClipLoading[mode] || !files[mode])
					return;
				engineerClipLoading[mode] = true;
				gltfLoader.load(
					`/models/${files[mode]}.glb`,
					(gltf) => {
						engineerClipLoading[mode] = false;
						if (gltf.animations?.[0]) {
							engineerClips[mode] = gltf.animations[0];
							if (engineerModeForFocus(activeRef.current) === mode)
								playEngineerAnimation(mode);
						}
						disposeClipScene(gltf);
						invalidateScene.current();
					},
					undefined,
					() => {
						engineerClipLoading[mode] = false;
					},
				);
			};
			const loadToolboxClip = (mode) => {
				const files = { open: "toolbox_open", close: "toolbox_close" };
				if (toolboxClips[mode] || toolboxClipLoading[mode] || !files[mode])
					return;
				toolboxClipLoading[mode] = true;
				gltfLoader.load(
					`/models/${files[mode]}.glb`,
					(gltf) => {
						toolboxClipLoading[mode] = false;
						if (gltf.animations?.[0]) {
							toolboxClips[mode] = gltf.animations[0];
							if (toolboxDesiredMode === mode) playToolboxAnimation(mode);
						}
						disposeClipScene(gltf);
						invalidateScene.current();
					},
					undefined,
					() => {
						toolboxClipLoading[mode] = false;
					},
				);
			};
			const loadEnvelopeCloseClip = () => {
				if (envelopeClips.close || envelopeCloseLoading) return;
				envelopeCloseLoading = true;
				gltfLoader.load(
					"/models/envelope_close.glb",
					(gltf) => {
						envelopeCloseLoading = false;
						if (gltf.animations?.[0]) {
							envelopeClips.close = gltf.animations[0];
							if (envelopeDesiredMode === "close")
								playEnvelopeAnimation("close");
						}
						disposeClipScene(gltf);
						invalidateScene.current();
					},
					undefined,
					() => {
						envelopeCloseLoading = false;
					},
				);
			};
			const playEngineerAnimation = (mode) => {
				const state = pieces.engineerAnimation;
				if (!state) return;
				const clip = mode === "idle" ? state.idleClip : engineerClips[mode];
				if (!clip) return;
				const action = state.mixer.clipAction(clip);
				if (state.action === action) {
					if (motionRef.current) action.paused = false;
					else if (!action.paused) {
						action.time = mode === "idle" ? 0 : clip.duration;
						state.mixer.update(0);
						action.paused = true;
					}
					return;
				}
				if (state.action) state.action.fadeOut(0.18);
				action.reset().setEffectiveTimeScale(1).setEffectiveWeight(1);
				action.setLoop(
					mode === "idle" ? THREE.LoopRepeat : THREE.LoopOnce,
					mode === "idle" ? Infinity : 1,
				);
				action.clampWhenFinished = mode !== "idle";
				action.play();
				if (!motionRef.current) {
					action.time = mode === "idle" ? 0 : clip.duration;
					state.mixer.update(0);
					action.paused = true;
				} else action.fadeIn(0.2);
				state.action = action;
				state.mode = mode;
			};
			const setEngineerFocusAnimation = (id) => {
				const mode = engineerModeForFocus(id);
				if (mode !== "idle") loadEngineerClip(mode);
				playEngineerAnimation(mode);
			};
			const playToolboxAnimation = (mode) => {
				const state = pieces.toolboxAnimation,
					clip = toolboxClips[mode];
				if (!state || !clip) return;
				const action = state.mixer.clipAction(clip);
				if (state.action === action) {
					if (motionRef.current) action.paused = false;
					else if (!action.paused) {
						action.time = clip.duration;
						state.mixer.update(0);
						action.paused = true;
					}
					return;
				}
				if (state.action) state.action.fadeOut(0.08);
				action
					.reset()
					.setEffectiveTimeScale(1)
					.setEffectiveWeight(1)
					.setLoop(THREE.LoopOnce, 1);
				action.clampWhenFinished = true;
				action.play();
				if (!motionRef.current) {
					action.time = clip.duration;
					state.mixer.update(0);
					action.paused = true;
				} else action.fadeIn(0.08);
				state.action = action;
			};
			const playEnvelopeAnimation = (mode) => {
				const state = pieces.envelopeAnimation,
					clip = envelopeClips[mode];
				if (!state || !clip) return;
				const action = state.mixer.clipAction(clip);
				if (state.action) state.action.stop();
				action
					.reset()
					.setEffectiveTimeScale(1)
					.setEffectiveWeight(1)
					.setLoop(THREE.LoopOnce, 1);
				action.clampWhenFinished = true;
				action.play();
				if (!motionRef.current) {
					action.time = clip.duration;
					state.mixer.update(0);
					action.paused = true;
				}
				state.action = action;
				state.mode = mode;
			};
			const loadModel = (
				url,
				parent,
				{ height, width, rotation, onLoad } = {},
			) =>
				gltfLoader.load(
					url,
					(gltf) => {
						const model = gltf.scene;
						if (rotation) model.rotation.set(...rotation);
						model.updateMatrixWorld(true);
						const box = new THREE.Box3().setFromObject(model),
							size = box.getSize(new THREE.Vector3()),
							center = box.getCenter(new THREE.Vector3());
						const scale = height ? height / size.y : width / size.x;
						model.scale.setScalar(scale);
						model.position.set(
							-center.x * scale,
							-box.min.y * scale,
							-center.z * scale,
						);
						model.traverse((o) => {
							if (o.isMesh) {
								o.castShadow = true;
								o.receiveShadow = true;
								if (o.material) {
									o.material = Array.isArray(o.material)
										? o.material.map(asToonMaterial)
										: asToonMaterial(o.material);
									const mats = Array.isArray(o.material)
										? o.material
										: [o.material];
									mats.forEach((m) => {
										if (m.map) m.map.colorSpace = THREE.SRGBColorSpace;
									});
								}
							}
						});
						parent.add(model);
						model.updateMatrixWorld(true);
						onLoad?.(model, gltf.animations);
						invalidateScene.current();
					},
					undefined,
					() => {
						if (!cancelled) {
							sceneErrorRef.current?.(true);
							invalidateScene.current();
						}
					},
				);
			const platform = (root) => {
				const p = add(
					root,
					new THREE.CylinderGeometry(0.79, 0.88, 0.16, 8),
					colors.cream,
					[0, -0.04, 0],
				);
				p.castShadow = false;
			};
			// 01 — a proper little laptop: hinged screen, keyboard, trackpad and a living TV-signal display.
			{
				const root = new THREE.Group();
				root.position.set(destinations[0].x, 0.25, 0.05);
				root.userData.dest = "work";
				scene.add(root);
				roots.work = root;
				const laptop = loadModel("/models/laptop.glb", root, { width: 1.58 });
				const screenCanvas = document.createElement("canvas");
				screenCanvas.width = 512;
				screenCanvas.height = 320;
				const ctx = screenCanvas.getContext("2d");
				const pixels = ctx.createImageData(512, 320);
				const uiCanvas = document.createElement("canvas");
				uiCanvas.width = 512;
				uiCanvas.height = 320;
				const uiCtx = uiCanvas.getContext("2d");
				const texture = new THREE.CanvasTexture(screenCanvas);
				texture.colorSpace = THREE.SRGBColorSpace;
				const display = add(
					root,
					new THREE.PlaneGeometry(1.35, 0.91),
					new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }),
					[0, 0.68, -0.54],
				);
				pieces.tv = { ctx, pixels, texture, uiCanvas, uiCtx };
				pieces.screen = display;
				pieces.laptopModel = laptop;
				platform(root);
			}
			// 02 — a soft, blank-faced little engineer. His right arm is animated into a friendly wave.
			{
				const root = new THREE.Group();
				root.position.set(destinations[1].x, 0.02, 0.08);
				root.userData.dest = "engineer";
				scene.add(root);
				roots.engineer = root;
				loadModel("/models/morrillo_idle.glb", root, {
					height: 2.05,
					onLoad: (model, animations) => {
						pieces.engineerModel = model;
						if (!animations?.length) return;
						const mixer = new THREE.AnimationMixer(model),
							state = {
								mixer,
								idleClip: animations[0],
								action: null,
								mode: null,
							};
						pieces.engineerAnimation = state;
						setEngineerFocusAnimation(activeRef.current);
					},
				});
				platform(root);
			}
			// 03 — a real tool case with a hinged lid and three tools that pop up when opened.
			{
				const root = new THREE.Group();
				root.position.set(destinations[2].x, 0.18, 0.06);
				root.userData.dest = "toolkit";
				scene.add(root);
				roots.toolkit = root;
				loadModel("/models/toolbox_idle.glb", root, {
					width: 1.45,
					onLoad: (model) => {
						pieces.toolboxModel = model;
						pieces.toolboxAnimation = {
							mixer: new THREE.AnimationMixer(model),
							action: null,
						};
						playToolboxAnimation(toolboxDesiredMode);
					},
				});
				platform(root);
				const tech = [
					{
						name: "REACT",
						group: "INTERFACE",
						use: "Reusable UI",
						color: "#61dafb",
						logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
					},
					{
						name: "TYPESCRIPT",
						group: "FOUNDATION",
						use: "Safer systems",
						color: "#3178c6",
						logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
					},
					{
						name: "CLAUDE",
						group: "AI WORKFLOWS",
						use: "Faster iteration",
						color: "#d97757",
						logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Claude_AI_symbol.svg",
					},
					{
						name: "RAILS",
						group: "PRODUCT BUILD",
						use: "Ship full stack",
						color: "#cc0000",
						logo: "https://upload.wikimedia.org/wikipedia/commons/6/62/Ruby_On_Rails_Logo.svg",
					},
					{
						name: "POSTGRES",
						group: "DATA",
						use: "Keep it reliable",
						color: "#4169e1",
						logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Logo_PostgreSQL.png",
					},
					{
						name: "OPENAI",
						group: "AI WORKFLOWS",
						use: "Useful AI features",
						color: "#10a37f",
						logo: "https://upload.wikimedia.org/wikipedia/commons/6/66/OpenAI_logo_2025_%28symbol%29.svg",
					},
				];
				pieces.tokens = [];
				const toolkitLogoLoaders = [];
				const makeTabletFace = (tool) => {
					const canvas = document.createElement("canvas");
					canvas.width = 512;
					canvas.height = 304;
					const ctx = canvas.getContext("2d");
					ctx.fillStyle = "#fff7df";
					ctx.fillRect(0, 0, 512, 304);
					ctx.fillStyle = tool.color;
					ctx.fillRect(0, 0, 512, 12);
					ctx.fillStyle = "#8a8170";
					ctx.font = "bold 22px monospace";
					ctx.fillText(tool.group, 157, 82);
					ctx.fillStyle = "#292820";
					ctx.font = 'bold 42px "M PLUS Rounded 1c", sans-serif';
					ctx.fillText(tool.name, 157, 150);
					ctx.fillStyle = "#6e685b";
					ctx.font = '27px "M PLUS Rounded 1c", sans-serif';
					ctx.fillText(tool.use, 157, 207);
					ctx.fillStyle = "#eee5cd";
					ctx.fillRect(30, 72, 106, 160);
					ctx.strokeStyle = "#d0c5a9";
					ctx.lineWidth = 4;
					ctx.strokeRect(30, 72, 106, 160);
					const markCanvas = document.createElement("canvas");
					markCanvas.width = 128;
					markCanvas.height = 128;
					const m = markCanvas.getContext("2d");
					const finish = () => {
						ctx.drawImage(markCanvas, 19, 88, 128, 128);
						texture.needsUpdate = true;
						invalidateScene.current();
					};
					const texture = new THREE.CanvasTexture(canvas);
					texture.colorSpace = THREE.SRGBColorSpace;
					const image = new Image();
					image.crossOrigin = "anonymous";
					image.onload = () => {
						m.clearRect(0, 0, 128, 128);
						const ratio = Math.min(112 / image.width, 136 / image.height),
							w = image.width * ratio,
							h = image.height * ratio;
						m.drawImage(image, (128 - w) / 2, (128 - h) / 2, w, h);
						finish();
					};
					image.onerror = () => {
						m.clearRect(0, 0, 128, 128);
						m.fillStyle = tool.color;
						m.font = "bold 54px Arial";
						m.textAlign = "center";
						m.textBaseline = "middle";
						m.fillText(tool.name.slice(0, 2), 64, 64);
						finish();
					};
					toolkitLogoLoaders.push(() => {
						image.src = tool.logo;
					});
					return texture;
				};
				tech.forEach((tool, i) => {
					const badge = new THREE.Group();
					root.add(badge);
					badge.position.set(0, 0.94, 0);
					badge.visible = false;
					const face = makeTabletFace(tool),
						side = new THREE.MeshToonMaterial({
							color: "#292820",
							gradientMap: toonRamp,
						}),
						front = new THREE.MeshBasicMaterial({ map: face });
					const tablet = new THREE.Mesh(
						new THREE.BoxGeometry(1.12, 0.665, 0.09),
						[side, side, side, side, front, side],
					);
					badge.add(tablet);
					const wide = [
						[-0.2, 2.1, 0.75],
						[1.15, 2.5, 0.45],
						[2.55, 2.0, 0.85],
						[-0.05, 1.2, 0.45],
						[1.35, 1.35, 1.05],
						[2.75, 2.72, 0.65],
					][i];
					const tall = [
						[-0.85, 2.75, 0.62],
						[0.45, 2.85, 0.42],
						[-0.8, 2.05, 0.72],
						[0.5, 2.1, 0.45],
						[-0.85, 1.35, 0.52],
						[0.45, 1.45, 0.75],
					][i];
					pieces.tokens.push({ badge, tablet, side, wide, tall, seed: i });
				});
				pieces.prepareToolkit = () => {
					if (pieces.toolkitPrepared) return;
					pieces.toolkitPrepared = true;
					toolkitLogoLoaders.forEach((load) => load());
				};
			}
			// 04 — user-supplied envelope model with separate open and close actions.
			{
				const root = new THREE.Group();
				root.position.set(destinations[3].x, 0.04, 0.08);
				root.userData.dest = "contact";
				scene.add(root);
				roots.contact = root;
				const envelopeMount = new THREE.Group();
				root.add(envelopeMount);
				pieces.envelopeMount = envelopeMount;
				loadModel("/models/envelope.glb", envelopeMount, {
					width: 1.55,
					rotation: [Math.PI / 2, 0, 0],
					onLoad: (model, animations) => {
						pieces.envelopeModel = model;
						const box = new THREE.Box3().setFromObject(model),
							size = box.getSize(new THREE.Vector3());
						const mouth = new THREE.Vector3(
							(box.min.x + box.max.x) / 2,
							box.min.y + size.y * 0.38,
							box.max.z + 0.025,
						);
						roots.contact.updateMatrixWorld(true);
						pieces.envelopeMouth = roots.contact.worldToLocal(mouth);
						pieces.envelopeAnimation = {
							mixer: new THREE.AnimationMixer(model),
							action: null,
							mode: null,
						};
						envelopeClips.open = animations?.[0];
						if (
							envelopeDesiredMode === "open" &&
							(el.clientWidth >= 650 ||
								contactCardRef?.current?.classList.contains("is-zoom-near") ||
								contactCardRef?.current?.classList.contains("is-zoom-ready"))
						)
							playEnvelopeAnimation("open");
						else if (envelopeDesiredMode === "close")
							playEnvelopeAnimation("close");
					},
				});
				const packet = new THREE.Group();
				packet.position.set(0, -0.82, 0.04);
				packet.visible = el.clientWidth >= 650;
				root.add(packet);
				const backPage = add(
					packet,
					new THREE.BoxGeometry(1.16, 0.86, 0.014),
					colors.blue,
					[-0.014, -0.012, -0.052],
				);
				const middlePage = add(
					packet,
					new THREE.BoxGeometry(1.11, 0.82, 0.014),
					colors.cream,
					[0.008, -0.008, -0.031],
				);
				const topPage = add(
					packet,
					new THREE.BoxGeometry(1.07, 0.78, 0.025),
					colors.paper,
					[0, 0, -0.004],
				);
				const letterCanvas = document.createElement("canvas");
				letterCanvas.width = 800;
				letterCanvas.height = 580;
				const letterCtx = letterCanvas.getContext("2d");
				drawLetter(letterCtx);
				const letterTexture = new THREE.CanvasTexture(letterCanvas);
				letterTexture.colorSpace = THREE.SRGBColorSpace;
				const letterFace = add(
					packet,
					new THREE.PlaneGeometry(1.04, 0.75),
					new THREE.MeshBasicMaterial({ map: letterTexture }),
					[0, 0, 0.009],
				);
				const indexTab = add(
					packet,
					new THREE.BoxGeometry(0.095, 0.17, 0.014),
					colors.red,
					[0.57, 0.22, -0.002],
				);
				const stamp = add(
					packet,
					new THREE.BoxGeometry(0.13, 0.13, 0.012),
					colors.blue,
					[0.425, 0.23, 0.015],
				);
				const clipCurve = new THREE.CatmullRomCurve3([
					new THREE.Vector3(-0.43, 0.27, 0.013),
					new THREE.Vector3(-0.43, 0.36, 0.013),
					new THREE.Vector3(-0.43, 0.435, 0.013),
					new THREE.Vector3(-0.43, 0.447, -0.012),
					new THREE.Vector3(-0.43, 0.425, -0.062),
					new THREE.Vector3(-0.43, 0.28, -0.063),
					new THREE.Vector3(-0.47, 0.235, -0.063),
					new THREE.Vector3(-0.54, 0.245, -0.04),
					new THREE.Vector3(-0.555, 0.28, -0.014),
					new THREE.Vector3(-0.52, 0.29, 0.013),
				]);
				const paperclip = add(
					packet,
					new THREE.TubeGeometry(clipCurve, 48, 0.005, 6, false),
					new THREE.MeshStandardMaterial({
						color: "#706c60",
						metalness: 0.7,
						roughness: 0.32,
					}),
					[0, 0, 0],
				);
				pieces.letterFace = letterFace;
				pieces.letterPacket = packet;
				pieces.letterPages = {
					back: backPage,
					middle: middlePage,
					top: topPage,
					tab: indexTab,
					stamp,
					paperclip,
				};
				platform(root);
			}
			const selectable = Object.values(roots),
				toolkitHitTargets = pieces.tokens.map(({ tablet }) => tablet);
			outlinePass.selectedObjects = selectable;
			const labels = [];
			let labelPointer = null,
				labelFocus = null;
			const labelWorldPosition = new THREE.Vector3();
			destinations.forEach((info) => {
				const node = document.createElement("button");
				node.type = "button";
				node.className = "scene-label";
				node.innerHTML = `<svg class="scene-label-arrow" viewBox="0 0 16 20" aria-hidden="true"><path d="M8 18V3M2 9l6-6 6 6"/></svg><span>${info.label}</span><small>${info.hint}</small>`;
				node.addEventListener("click", (event) => {
					event.stopPropagation();
					selectRef.current(info.id);
				});
				node.addEventListener("pointerenter", () => {
					labelPointer = info.id;
					invalidateScene.current();
				});
				node.addEventListener("pointerleave", () => {
					if (labelPointer === info.id) labelPointer = null;
					invalidateScene.current();
				});
				node.addEventListener("focus", () => {
					labelFocus = info.id;
					invalidateScene.current();
				});
				node.addEventListener("blur", () => {
					if (labelFocus === info.id) labelFocus = null;
					invalidateScene.current();
				});
				el.appendChild(node);
				labels.push({ node, info });
			});
			let screenSelection = -1,
				screenHover = -1,
				hoveredToken = null,
				pinnedToken = null,
				screenMode = "static",
				screenTransitionStart = 0,
				hoverPointerDirty = true;
			const ray = new THREE.Raycaster(),
				pointer = new THREE.Vector2(5, 5);
			const screenRow = (uv) => {
				const y = (1 - uv.y) * 320;
				const row = Math.floor((y - 80) / 67);
				return row >= 0 && row < 3 && y < 80 + row * 67 + 58 ? row : -1;
			};
			const screenHotspot = (uv) => {
				const y = (1 - uv.y) * 320;
				if (screenSelection < 0) return screenRow(uv);
				const x = uv.x * 512;
				if (y >= 54 && y < 79 && x >= 24 && x <= 157) return -2;
				if (x >= 24 && x <= 488 && y >= 263 && y <= 307) return -3;
				return -1;
			};
			const mouseMove = (e) => {
				const r = el.getBoundingClientRect();
				pointer.set(
					((e.clientX - r.left) / r.width) * 2 - 1,
					(-(e.clientY - r.top) / r.height) * 2 + 1,
				);
				hoverPointerDirty = true;
				invalidateScene.current();
			};
			const mouseLeave = () => {
				pointer.set(5, 5);
				screenHover = -1;
				hoveredToken = null;
				hoverPointerDirty = true;
				invalidateScene.current();
			};
			const touchStart = (e) => {
				if (e.pointerType !== "touch" || e.target.tagName !== "CANVAS") return;
				touchOrigin = { x: e.clientX, y: e.clientY };
			};
			const touchEnd = (e) => {
				if (!touchOrigin || e.pointerType !== "touch") return;
				const dx = e.clientX - touchOrigin.x,
					dy = e.clientY - touchOrigin.y;
				touchOrigin = null;
				if (Math.abs(dy) < 52 || Math.abs(dy) < Math.abs(dx) * 1.2) return;
				suppressClickUntil = performance.now() + 450;
				const direction = dy < 0 ? 1 : -1;
				selectRef.current((current) => {
					const index = current
						? destinations.findIndex((item) => item.id === current)
						: -1;
					const next = index + direction;
					return next < 0 ? null : (destinations[next]?.id ?? current);
				});
			};
			const click = (e) => {
				if (performance.now() < suppressClickUntil) return;
				const r = el.getBoundingClientRect();
				pointer.set(
					((e.clientX - r.left) / r.width) * 2 - 1,
					(-(e.clientY - r.top) / r.height) * 2 + 1,
				);
				hoverPointerDirty = true;
				ray.setFromCamera(pointer, camera);
				if (activeRef.current === "work") {
					if (performance.now() - focusStarted < 600) return;
					const hit = ray.intersectObject(pieces.screen, false)[0];
					if (hit?.uv) {
						const y = (1 - hit.uv.y) * 320;
						if (screenSelection >= 0) {
							const x = hit.uv.x * 512;
							if (y >= 54 && y < 79 && x >= 24 && x <= 157) {
								screenSelection = -1;
								projectSelectRef.current(-1);
								playSound("mouse-click"); // <- add
							} else if (x >= 24 && x <= 488 && y >= 263 && y <= 307) {
								// <- add the braces
								playSound("mouse-click"); // <- add
								window.open(
									projects[screenSelection].url,
									"_blank",
									"noopener,noreferrer",
								);
							}
							return;
						}
						const row = screenRow(hit.uv);
						if (row >= 0) {
							screenSelection = row;
							projectSelectRef.current(row);
							playSound("mouse-click");
						}
					}
					return;
				}
				if (activeRef.current === "contact") {
					if (
						(pieces.letterFace &&
							ray.intersectObject(pieces.letterFace, false).length) ||
						(pieces.envelopeModel &&
							ray.intersectObject(pieces.envelopeModel, true).length)
					)
						window.location.href = "mailto:armanirmr@gmail.com";
					return;
				}
				if (activeRef.current === "toolkit") {
					const hit = ray.intersectObjects(toolkitHitTargets, false)[0];
					if (hit) {
						const token = pieces.tokens.find(
							(item) => item.tablet === hit.object,
						);
						pinnedToken = pinnedToken === token?.tablet ? null : token?.tablet;
						invalidateScene.current();
					}
					return;
				}
				if (activeRef.current) return;
				const hits = ray.intersectObjects(selectable, true);
				for (const hit of hits) {
					let p = hit.object;
					while (p && !p.userData.dest) p = p.parent;
					if (p?.userData.dest) {
						playSound("mouse-click");
						selectRef.current(p.userData.dest);
						break;
					}
				}
			};
			const focus = {
				work: {
					pos: new THREE.Vector3(destinations[0].x, 1.15, 4.55),
					look: new THREE.Vector3(destinations[0].x, 0.76, -0.22),
				},
				engineer: {
					pos: new THREE.Vector3(destinations[1].x + 0.25, 1.38, 5.15),
					look: new THREE.Vector3(destinations[1].x + 0.15, 0.95, 0),
				},
				toolkit: {
					pos: new THREE.Vector3(destinations[2].x, 2.7, 6.4),
					look: new THREE.Vector3(destinations[2].x, 1.75, 0),
				},
				contact: {
					pos: new THREE.Vector3(destinations[3].x, 1.85, 4.7),
					look: new THREE.Vector3(destinations[3].x, 0.72, 0),
				},
			};
			const mobileFocus = {
				work: {
					pos: new THREE.Vector3(destinations[0].x, 1.24, 3.35),
					look: new THREE.Vector3(destinations[0].x, 0.78, -0.22),
				},
				engineer: {
					pos: new THREE.Vector3(destinations[1].x + 0.15, 2.05, 6.2),
					look: new THREE.Vector3(destinations[1].x - 0.1, 0.82, 0),
				},
				toolkit: {
					pos: new THREE.Vector3(0.35, 3.05, 8.5),
					look: new THREE.Vector3(0.35, 1.45, 0),
				},
				contact: {
					pos: new THREE.Vector3(destinations[3].x, 1.85, 4.55),
					look: new THREE.Vector3(destinations[3].x, 0.72, 0),
				},
			};
			const contactOriginCamera = camera.clone();
			const touchCancel = (e) => {
				if (e.pointerType === "touch") touchOrigin = null;
			};
			const resize = () => {
				layoutWidth = el.clientWidth;
				layoutHeight = el.clientHeight;
				camera.aspect = layoutWidth / layoutHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(el.clientWidth, el.clientHeight);
				composer.setSize(el.clientWidth, el.clientHeight);
				if (pieces.letterPacket)
					pieces.letterPacket.visible = el.clientWidth >= 650;
				invalidateScene.current();
			};
			el.addEventListener("pointermove", mouseMove);
			el.addEventListener("pointerleave", mouseLeave);
			el.addEventListener("pointerdown", touchStart);
			el.addEventListener("pointerup", touchEnd);
			el.addEventListener("pointercancel", touchCancel);
			el.addEventListener("click", click);
			window.addEventListener("resize", resize);
			let toolkitProgress = 0,
				toolkitFrom = 0,
				toolkitTo = 0,
				toolkitStarted = 0,
				contactProgress = 0,
				contactFrom = 0,
				contactTo = 0,
				contactStarted = 0,
				layoutWidth = el.clientWidth,
				layoutHeight = el.clientHeight;
			const lookTarget = baseLook.clone();
			const started = performance.now();
			let previousFrameTime = started,
				lastMotionState = motionRef.current;
			const animate = () => {
				if (disposed) return;
				frame = null;
				const viewportWidth = layoutWidth,
					compactViewport = viewportWidth < 650,
					now = performance.now(),
					t = (now - started) / 1000,
					delta = Math.min(0.1, (now - previousFrameTime) / 1000),
					activeNow = activeRef.current;
				previousFrameTime = now;
				if (motionRef.current !== lastMotionState) {
					lastMotionState = motionRef.current;
					setEngineerFocusAnimation(activeNow);
					if (activeNow === "toolkit" || toolboxDesiredMode !== "idle")
						playToolboxAnimation(toolboxDesiredMode);
				}
				if (activeNow !== lastActive) {
					hoverPointerDirty = true;
					const wasToolkit = lastActive === "toolkit",
						wasContact = lastActive === "contact";
					lastActive = activeNow;
					focusStarted = now;
					toolkitFrom = toolkitProgress;
					toolkitTo = activeNow === "toolkit" ? 1 : 0;
					toolkitStarted = now;
					contactFrom = contactProgress;
					contactTo = activeNow === "contact" ? 1 : 0;
					contactStarted = now;
					setEngineerFocusAnimation(activeNow);
					if (activeNow === "toolkit" || wasToolkit) {
						toolboxDesiredMode = activeNow === "toolkit" ? "open" : "close";
						if (activeNow === "toolkit") pieces.prepareToolkit?.();
						loadToolboxClip(toolboxDesiredMode);
						playToolboxAnimation(toolboxDesiredMode);
					}
					if (activeNow === "contact") {
						envelopeDesiredMode = "open";
						if (viewportWidth >= 650) playEnvelopeAnimation("open");
						if (compactViewport && contactCardRef?.current) {
							const rect = el.getBoundingClientRect(),
								anchor = roots.contact.localToWorld(
									(
										pieces.envelopeMouth || new THREE.Vector3(0, 0.2, 0.12)
									).clone(),
								);
							contactOriginCamera.position.copy(mobileFocus.contact.pos);
							contactOriginCamera.fov = 33;
							contactOriginCamera.aspect = layoutWidth / layoutHeight;
							contactOriginCamera.updateProjectionMatrix();
							contactOriginCamera.lookAt(mobileFocus.contact.look);
							contactOriginCamera.updateMatrixWorld(true);
							anchor.project(contactOriginCamera);
							const x = (anchor.x * rect.width) / 2,
								y = (-anchor.y * rect.height) / 2;
							contactCardRef.current.style.setProperty(
								"--contact-origin-x",
								`${x}px`,
							);
							contactCardRef.current.style.setProperty(
								"--contact-origin-y",
								`${y}px`,
							);
							contactCardRef.current.style.setProperty(
								"--contact-origin-x-near",
								`${x * 0.08}px`,
							);
							contactCardRef.current.style.setProperty(
								"--contact-origin-y-near",
								`${y * 0.08}px`,
							);
						}
					} else if (wasContact) {
						envelopeDesiredMode = "close";
						loadEnvelopeCloseClip();
						playEnvelopeAnimation("close");
					}
					if (activeNow === "work") {
						screenSelection = -1;
						projectSelectRef.current(-1);
						screenHover = -1;
					}
				}
				if (
					activeNow === "work" &&
					keyboardProjectRef.current !== screenSelection
				)
					screenSelection = keyboardProjectRef.current;
				const compact = compactViewport,
					target = compact
						? activeNow
							? mobileFocus[activeNow]
							: { pos: mobileBaseCamera, look: mobileBaseLook }
						: activeNow
							? focus[activeNow]
							: { pos: baseCamera, look: baseLook };
				if (motionRef.current) {
					camera.position.lerp(
						target.pos,
						compact && activeNow === "contact"
							? 0.095
							: activeNow
								? 0.065
								: 0.075,
					);
					lookTarget.lerp(
						target.look,
						activeNow === "contact" ? 0.095 : activeNow ? 0.07 : 0.075,
					);
				} else {
					camera.position.copy(target.pos);
					lookTarget.copy(target.look);
				}
				const targetFov = compact
					? activeNow === "toolkit"
						? 47
						: activeNow === "contact"
							? 33
							: activeNow
								? 33
								: 47
					: activeNow === "contact"
						? 24
						: activeNow === "toolkit"
							? 37
							: 33;
				const previousFov = camera.fov;
				if (motionRef.current) camera.fov += (targetFov - camera.fov) * 0.075;
				else camera.fov = targetFov;
				if (Math.abs(camera.fov - previousFov) > 0.005)
					camera.updateProjectionMatrix();
				camera.lookAt(lookTarget);
				if (compact && activeNow === "contact" && contactCardRef?.current) {
					const card = contactCardRef.current;
					if (
						!card.classList.contains("is-zoom-near") &&
						camera.position.distanceToSquared(target.pos) < 1 &&
						lookTarget.distanceToSquared(target.look) < 0.25 &&
						Math.abs(camera.fov - targetFov) < 1.5
					) {
						card.classList.add("is-zoom-near");
						if (
							envelopeDesiredMode === "open" &&
							pieces.envelopeAnimation?.mode !== "open"
						)
							playEnvelopeAnimation("open");
					}
					if (
						!card.classList.contains("is-zoom-ready") &&
						camera.position.distanceToSquared(target.pos) < 0.0016 &&
						lookTarget.distanceToSquared(target.look) < 0.0016 &&
						Math.abs(camera.fov - targetFov) < 0.08
					)
						card.classList.add("is-zoom-ready");
				}
				ray.setFromCamera(pointer, camera);
				if (activeNow === "toolkit" && toolkitProgress > 0.48) {
					if (hoverPointerDirty) {
						const tabletHit = ray.intersectObjects(toolkitHitTargets, false)[0];
						hoveredToken = tabletHit
							? pieces.tokens.find((token) => token.tablet === tabletHit.object)
							: null;
						hoverPointerDirty = false;
					}
					hovered = null;
					screenHover = -1;
					renderer.domElement.style.cursor = "default";
				} else {
					hoveredToken = null;
					if (activeNow === "work" && now - focusStarted > 600) {
						const displayHit = ray.intersectObject(pieces.screen, false)[0];
						screenHover = displayHit?.uv ? screenHotspot(displayHit.uv) : -1;
						renderer.domElement.style.cursor =
							screenHover !== -1 ? "pointer" : "default";
					} else {
						screenHover = -1;
						const hits = activeNow
							? []
							: ray.intersectObjects(selectable, true);
						hovered = null;
						for (const hit of hits) {
							let p = hit.object;
							while (p && !p.userData.dest) p = p.parent;
							if (p?.userData.dest) {
								hovered = p;
								break;
							}
						}
						renderer.domElement.style.cursor = hovered ? "pointer" : "default";
					}
				}

				if (hovered !== lastHovered) {
					if (hovered) playSound("pop", 0.4);
					lastHovered = hovered;
				}

				selectable.forEach((root, i) => {
					const id = root.userData.dest,
						isHot = root === hovered || id === activeNow;
					const scale = isHot ? 1.06 : 1;
					if (motionRef.current) {
						root.scale.x += (scale - root.scale.x) * 0.1;
						root.scale.y += (scale - root.scale.y) * 0.1;
						root.scale.z += (scale - root.scale.z) * 0.1;
					} else root.scale.setScalar(scale);
					const float =
						motionRef.current && !activeNow ? Math.sin(t * 1.2 + i) * 0.045 : 0;
					root.position.y =
						(id === "work" ? 0.25 : id === "toolkit" ? 0.18 : 0.02) + float;
					const targetYaw =
						motionRef.current &&
						isHot &&
						!(compactViewport && id === "work" && activeNow === "work")
							? Math.sin(t * 2) * 0.08
							: 0;
					if (motionRef.current)
						root.rotation.y += (targetYaw - root.rotation.y) * 0.08;
					else root.rotation.y = targetYaw;
				});
				const reveal = Math.min(
					1,
					Math.max(0, (now - focusStarted - 180) / 900),
				);
				const ease = motionRef.current
					? 1 - Math.pow(1 - reveal, 3)
					: activeNow
						? 1
						: 0;
				const toolReveal = motionRef.current
					? 1 - Math.pow(1 - Math.min(1, (now - toolkitStarted) / 780), 3)
					: 1;
				toolkitProgress = toolkitFrom + (toolkitTo - toolkitFrom) * toolReveal;
				const letterReveal = motionRef.current
					? 1 - Math.pow(1 - Math.min(1, (now - contactStarted) / 620), 3)
					: 1;
				contactProgress =
					contactFrom + (contactTo - contactFrom) * letterReveal;
				if (pieces.hinge) pieces.hinge.rotation.x = -0.08 - 0.08 * ease;
				pieces.engineerAnimation?.mixer.update(delta);
				pieces.toolboxAnimation?.mixer.update(delta);
				pieces.envelopeAnimation?.mixer.update(delta);
				if (
					compact &&
					activeNow === "contact" &&
					contactCardRef?.current?.classList.contains("is-zoom-ready") &&
					!contactCardRef.current.classList.contains("is-envelope-ready")
				) {
					const state = pieces.envelopeAnimation,
						clip = envelopeClips.open,
						envelopeFinished =
							pieces.envelopeModel &&
							(!clip ||
								(state?.mode === "open" &&
									state.action &&
									state.action.time >= clip.duration - 0.02));
					if (envelopeFinished)
						contactCardRef.current.classList.add("is-envelope-ready");
				}
				if (pieces.letterPacket) {
					pieces.letterPacket.position.y = -0.82 + contactProgress * 1.52;
					pieces.letterPacket.position.x =
						Math.sin(contactProgress * Math.PI) * 0.025;
					pieces.letterPacket.scale.setScalar(0.58 + 0.42 * contactProgress);
					if (pieces.letterPages) {
						const spread = contactProgress;
						pieces.letterPages.back.position.x = -0.014 - 0.012 * spread;
						pieces.letterPages.back.rotation.z = -0.018 * spread;
						pieces.letterPages.middle.position.x = 0.008 + 0.01 * spread;
						pieces.letterPages.middle.rotation.z = 0.014 * spread;
						pieces.letterPages.tab.position.y = 0.22 + 0.025 * spread;
					}
				}
				if (pieces.envelopeMount) {
					const recede = Math.max(0, (contactProgress - 0.42) / 0.58);
					pieces.envelopeMount.position.z = -1.15 * recede;
					pieces.envelopeMount.scale.setScalar(1 - 0.1 * recede);
				}
				if (pieces.tokens)
					pieces.tokens.forEach(({ badge, tablet, side, wide, tall, seed }) => {
						const compact = compactViewport,
							destination = compact ? tall : wide,
							open = activeNow === "toolkit" && toolkitProgress > 0.48,
							isHovered =
								hoveredToken?.tablet === tablet || pinnedToken === tablet,
							phase = seed * 1.71;
						badge.visible = open;
						const floatY =
								motionRef.current && open
									? Math.sin(t * (0.55 + seed * 0.075) + phase) *
										(0.105 + (seed % 3) * 0.018)
									: 0,
							driftX =
								motionRef.current && open
									? Math.sin(t * 0.35 + phase) * 0.105
									: 0,
							driftZ =
								motionRef.current && open
									? Math.cos(t * 0.43 + phase) * 0.055
									: 0;
						const targetX = open
								? destination[0] + driftX
								: ((seed % 3) - 0.9) * 0.08,
							targetY = open
								? destination[1] + floatY + (isHovered ? 0.18 : 0)
								: 0.94,
							targetZ = open ? destination[2] + driftZ : 0;
						if (motionRef.current) {
							badge.position.x += (targetX - badge.position.x) * 0.085;
							badge.position.y += (targetY - badge.position.y) * 0.085;
							badge.position.z += (targetZ - badge.position.z) * 0.085;
						} else badge.position.set(targetX, targetY, targetZ);
						const scale = (compact ? 0.76 : 1) * (isHovered ? 1.1 : 1);
						if (motionRef.current) {
							badge.scale.x += (scale - badge.scale.x) * 0.12;
							badge.scale.y += (scale - badge.scale.y) * 0.12;
							badge.scale.z += (scale - badge.scale.z) * 0.12;
						} else badge.scale.setScalar(scale);
						const targetRotation =
							motionRef.current && open
								? Math.sin(t * (0.38 + seed * 0.045) + phase) * 0.14 +
									(isHovered ? -0.04 : 0)
								: 0;
						if (motionRef.current)
							badge.rotation.z += (targetRotation - badge.rotation.z) * 0.07;
						else badge.rotation.z = targetRotation;
						side.color.set(isHovered ? "#a58a27" : "#292820");
					});
				if (pieces.tv) {
					const { ctx, pixels, texture, uiCanvas, uiCtx } = pieces.tv;
					const workReady =
						activeNow === "work" && now - focusStarted > 320 && workFontsReady;
					if (workReady) {
						const stamp = `work-${screenSelection}-${screenHover}`;
						if (screenMode === "static") {
							drawLaptopDisplay(uiCtx, screenSelection, screenHover);
							screenTransitionStart = now;
							screenMode = "transition";
						}
						if (screenMode === "transition") {
							const done = drawLaptopSignal(
								ctx,
								pixels,
								uiCanvas,
								uiCtx,
								now - screenTransitionStart,
								motionRef.current,
								screenSelection,
								screenHover,
							);
							texture.needsUpdate = true;
							if (done) screenMode = stamp;
						} else if (screenMode !== stamp) {
							drawLaptopDisplay(uiCtx, screenSelection, screenHover);
							ctx.drawImage(uiCanvas, 0, 0);
							texture.needsUpdate = true;
							screenMode = stamp;
						}
					} else if (screenMode !== "static") {
						for (let i = 0; i < pixels.data.length; i += 4) {
							const n = Math.random() * 255;
							pixels.data[i] = n;
							pixels.data[i + 1] = n * 0.8 + 22;
							pixels.data[i + 2] = n * 0.36;
							pixels.data[i + 3] = 255;
						}
						ctx.putImageData(pixels, 0, 0);
						texture.needsUpdate = true;
						screenMode = "static";
					} else if (motionRef.current && ++staticFrame % 4 === 0) {
						for (let i = 0; i < pixels.data.length; i += 4) {
							const n = Math.random() * 255;
							pixels.data[i] = n;
							pixels.data[i + 1] = n * 0.8 + 22;
							pixels.data[i + 2] = n * 0.36;
							pixels.data[i + 3] = 255;
						}
						ctx.putImageData(pixels, 0, 0);
						texture.needsUpdate = true;
					}
				}
				labels.forEach(({ node, info }) => {
					const root = roots[info.id],
						pos = labelWorldPosition.copy(root.position);
					pos.y += info.id === "engineer" ? -0.38 : -0.3;
					pos.project(camera);
					node.style.left = `${(pos.x * 0.5 + 0.5) * layoutWidth}px`;
					node.style.top = `${(-pos.y * 0.5 + 0.5) * layoutHeight}px`;
					node.classList.toggle(
						"is-hovered",
						hovered?.userData.dest === info.id ||
							labelPointer === info.id ||
							labelFocus === info.id,
					);
					node.classList.toggle("is-selected", activeNow === info.id);
					node.setAttribute(
						"aria-pressed",
						activeNow === info.id ? "true" : "false",
					);
				});
				composer.render();
				if (motionRef.current) scheduleFrame();
			};
			const scheduleFrame = () => {
				if (!disposed && frame === null) frame = requestAnimationFrame(animate);
			};
			invalidateScene.current = scheduleFrame;
			scheduleFrame();
			return () => {
				disposed = true;
				if (invalidateScene.current === scheduleFrame)
					invalidateScene.current = () => {};
				if (frame !== null) cancelAnimationFrame(frame);
				pieces.engineerAnimation?.mixer.stopAllAction();
				pieces.toolboxAnimation?.mixer.stopAllAction();
				pieces.envelopeAnimation?.mixer.stopAllAction();
				el.removeEventListener("pointermove", mouseMove);
				el.removeEventListener("pointerleave", mouseLeave);
				el.removeEventListener("pointerdown", touchStart);
				el.removeEventListener("pointerup", touchEnd);
				el.removeEventListener("pointercancel", touchCancel);
				el.removeEventListener("click", click);
				window.removeEventListener("resize", resize);
				renderer.domElement.removeEventListener(
					"webglcontextlost",
					onContextLost,
				);
				renderer.domElement.removeEventListener(
					"webglcontextrestored",
					onContextRestored,
				);
				labels.forEach(({ node }) => node.remove());
				composer.dispose();
				outlinePass.dispose();
				outputPass.dispose();
				toonRamp.dispose();
				renderer.dispose();
				if (renderer.domElement.parentNode === el)
					el.removeChild(renderer.domElement);
				scene.traverse((o) => {
					if (o.geometry) o.geometry.dispose();
					if (o.material) {
						const ms = Array.isArray(o.material) ? o.material : [o.material];
						ms.forEach((m) => {
							if (m.map) m.map.dispose();
							if (m.gradientMap !== toonRamp) m.gradientMap?.dispose();
							m.dispose();
						});
					}
				});
			};
		};
		initialize()
			.then((cleanup) => {
				if (cancelled) cleanup?.();
				else if (cleanup) stopScene = cleanup;
			})
			.catch((error) => {
				if (!cancelled) {
					sceneErrorRef.current?.(true);
					console.error("Unable to initialize the 3D scene", error);
				}
			});
		return () => {
			cancelled = true;
			stopScene();
		};
	}, []);
	return <div className="diorama" ref={host} />;
}

function App() {
	const [active, setActive] = useState(null),
		[menuOpen, setMenuOpen] = useState(false),
		[soundPreference, setSoundPreference] = useState(readSoundPreference),
		[soundReady, setSoundReady] = useState(() => soundUnlocked),
		[motion, setMotion] = useState(true),
		[prefersReducedMotion, setPrefersReducedMotion] = useState(
			() => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
		),
		[projectSelection, setProjectSelection] = useState(-1),
		[copyStatus, setCopyStatus] = useState(null),
		[sceneUnavailable, setSceneUnavailable] = useState(false),
		[time, setTime] = useState(new Date());
	const menuButtonRef = useRef(null),
		menuPanelRef = useRef(null),
		soundDialogRef = useRef(null),
		menuWasOpen = useRef(false),
		experienceRef = useRef(null),
		contactCardRef = useRef(null),
		copyTimer = useRef(null),
		wheelContext = useRef({ active: null, menuOpen: false }),
		wheelLocked = useRef(false),
		wheelDelta = useRef(0),
		wheelUnlockTimer = useRef(null);
	wheelContext.current = { active, menuOpen };
	const motionEnabled = motion && !prefersReducedMotion;
	const chooseSoundPreference = (enabled) => {
		writeSoundPreference(enabled);
		setSoundPreference(enabled);
	};
	useEffect(() => {
		const unlockSoundForSession = (event) => {
			if (
				event.type === "keydown" &&
				["Tab", "Escape", "Shift", "Control", "Alt", "Meta"].includes(event.key)
			)
				return;
			if (soundUnlocked) return;
			soundUnlocked = true;
			setSoundReady(true);
		};
		document.addEventListener("pointerdown", unlockSoundForSession, true);
		document.addEventListener("click", unlockSoundForSession, true);
		document.addEventListener("keydown", unlockSoundForSession, true);
		return () => {
			document.removeEventListener("pointerdown", unlockSoundForSession, true);
			document.removeEventListener("click", unlockSoundForSession, true);
			document.removeEventListener("keydown", unlockSoundForSession, true);
		};
	}, []);
	useEffect(() => {
		if (soundPreference !== null) return;
		const dialog = soundDialogRef.current;
		const firstButton = dialog?.querySelector("button");
		requestAnimationFrame(() => firstButton?.focus());
		const onKeyDown = (event) => {
			if (event.key === "Escape") {
				event.preventDefault();
				chooseSoundPreference(false);
			} else if (event.key === "Tab" && dialog) {
				const buttons = [...dialog.querySelectorAll("button")];
				if (event.shiftKey && document.activeElement === buttons[0]) {
					event.preventDefault();
					buttons.at(-1)?.focus();
				} else if (!event.shiftKey && document.activeElement === buttons.at(-1)) {
					event.preventDefault();
					buttons[0]?.focus();
				}
			}
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [soundPreference]);
	useEffect(() => {
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setPrefersReducedMotion(media.matches);
		media.addEventListener?.("change", update);
		return () => media.removeEventListener?.("change", update);
	}, []);
	useEffect(() => {
		if (menuOpen) {
			menuWasOpen.current = true;
			requestAnimationFrame(() =>
				menuPanelRef.current?.querySelector("button")?.focus(),
			);
		} else if (menuWasOpen.current) {
			menuWasOpen.current = false;
			menuButtonRef.current?.focus();
		}
	}, [menuOpen]);
	useEffect(() => {
		setProjectSelection(-1);
	}, [active]);
	useEffect(() => {
		const i = setInterval(() => setTime(new Date()), 1000);
		return () => clearInterval(i);
	}, []);
	useEffect(() => () => clearTimeout(copyTimer.current), []);
	useEffect(() => {
		const experience = experienceRef.current;
		if (!experience) return;
		const onWheel = (e) => {
			if (wheelContext.current.menuOpen) return;
			const direction = Math.sign(e.deltaY);
			if (!direction) return;
			const panel = e.target.closest?.(
				".engineer-card-scroll,.focus-contact-card,.accessible-work-tools:focus-within",
			);
			if (panel) {
				const canScroll =
					panel.scrollHeight > panel.clientHeight &&
					(direction > 0
						? panel.scrollTop + panel.clientHeight < panel.scrollHeight - 1
						: panel.scrollTop > 1);
				if (canScroll) return;
			}
			e.preventDefault();
			if (wheelLocked.current) return;
			wheelDelta.current += e.deltaY;
			if (Math.abs(wheelDelta.current) < 36) return;
			const step = Math.sign(wheelDelta.current);
			wheelDelta.current = 0;
			wheelLocked.current = true;
			setActive((current) => {
				const currentIndex = current
					? destinations.findIndex((item) => item.id === current)
					: -1;
				const nextIndex = currentIndex + step;
				return nextIndex < 0 ? null : (destinations[nextIndex]?.id ?? current);
			});
			wheelUnlockTimer.current = setTimeout(() => {
				wheelLocked.current = false;
			}, 900);
		};
		experience.addEventListener("wheel", onWheel, { passive: false });
		return () => {
			experience.removeEventListener("wheel", onWheel);
			clearTimeout(wheelUnlockTimer.current);
		};
	}, []);
	useEffect(() => {
		const onKey = (e) => {
			if (e.key === "Escape") {
				setActive(null);
				setMenuOpen(false);
			}
			const target = e.target;
			if (
				!active &&
				!menuOpen &&
				e.key >= "1" &&
				e.key <= "4" &&
				!target.closest?.('button,a,input,textarea,[contenteditable="true"]')
			)
				setActive(destinations[Number(e.key) - 1].id);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [active, menuOpen]);
	const clock = new Intl.DateTimeFormat("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "America/Mexico_City",
	}).format(time);
	const copy = async () => {
		clearTimeout(copyTimer.current);
		try {
			if (!navigator.clipboard?.writeText)
				throw new Error("Clipboard access is unavailable");
			await navigator.clipboard.writeText("armanirmr@gmail.com");
			setCopyStatus("success");
		} catch {
			setCopyStatus("error");
		}
		copyTimer.current = setTimeout(() => setCopyStatus(null), 2600);
	};
	return (
		<div
			ref={experienceRef}
			className={`experience ${active ? `object-open object-${active}` : ""}`}
		>
			<header className="topbar">
				<a
					className="brand"
					href="#home"
					onClick={(event) => {
						event.preventDefault();
						setActive(null);
						setMenuOpen(false);
					}}
				>
					<span className="brand-seal" aria-hidden="true">
						<Asterisk size={18} />
					</span>
					<span>
						ARMANI <b>ROMERO</b>
					</span>
				</a>
				<div className="status">
					<span className="status-role">
						<i aria-hidden="true" /> SOFTWARE ENGINEER
					</span>
					<span className="status-place">COLIMA, MX</span>
					<time>{clock}</time>
				</div>
				<button
					ref={menuButtonRef}
					className={`menu-button ${menuOpen ? "open" : ""}`}
					onClick={() => setMenuOpen(!menuOpen)}
					aria-label={menuOpen ? "Close navigation" : "Open navigation"}
					aria-expanded={menuOpen}
					aria-controls="destination-menu"
				>
					<i />
					<i />
				</button>
			</header>
			<nav
				id="destination-menu"
				ref={menuPanelRef}
				className={`menu-overlay ${menuOpen ? "visible" : ""}`}
				aria-label="Destination navigation"
				aria-hidden={!menuOpen}
				inert={!menuOpen}
			>
				<div
					className="menu-inner"
					onKeyDown={(e) => {
						if (e.key === "Tab") {
							const buttons = [
									...menuPanelRef.current.querySelectorAll("button"),
								],
								first = buttons[0],
								last = buttons[buttons.length - 1];
							if (e.shiftKey && document.activeElement === first) {
								e.preventDefault();
								last.focus();
							} else if (!e.shiftKey && document.activeElement === last) {
								e.preventDefault();
								first.focus();
							}
						}
					}}
				>
					<span className="menu-caption">CHOOSE YOUR DESTINATION</span>
					{destinations.map((o, i) => (
						<button
							key={o.id}
							onClick={() => {
								setActive(o.id);
								setMenuOpen(false);
							}}
						>
							<small>0{i + 1}</small>
							{o.label}
							<ArrowUpRight aria-hidden="true" />
						</button>
					))}
					<span className="menu-hint">USE THE OBJECTS, OR PRESS 1–4.</span>
				</div>
			</nav>
			<main id="home">
				<section className="explore-screen">
					<div className="sky-wash" />
					<Diorama
						active={active}
						onSelect={setActive}
						motion={motionEnabled}
						keyboardProject={projectSelection}
						onProjectSelect={setProjectSelection}
						contactCardRef={contactCardRef}
						onSceneError={setSceneUnavailable}
					/>
					{sceneUnavailable && (
						<aside
							className="scene-fallback"
							aria-labelledby="scene-fallback-title"
						>
							<div className="scene-fallback-top">
								<span>PORTFOLIO SIGNAL / SAFE MODE</span>
								<Asterisk size={16} aria-hidden="true" />
							</div>
							<h2 id="scene-fallback-title">
								THE 3D VIEW
								<br />
								<em>IS OFFLINE.</em>
							</h2>
							<p>
								The scene couldn’t start, but you can still explore my work and
								get in touch.
							</p>
							<h3>SELECTED WORK</h3>
							<ul>
								{projects.map((project) => (
									<li key={project.name}>
										<a href={project.url} target="_blank" rel="noreferrer">
											<span>
												{project.name}
												<small>{project.kind}</small>
											</span>
											<ArrowUpRight size={18} aria-hidden="true" />
										</a>
									</li>
								))}
							</ul>
							<div className="scene-fallback-actions">
								<a href="mailto:armanirmr@gmail.com">
									<Mail size={15} aria-hidden="true" /> EMAIL ARMANI
								</a>
								<a
									href="https://www.linkedin.com/in/armani-romero/"
									target="_blank"
									rel="noreferrer"
								>
									LINKEDIN <ArrowUpRight size={14} aria-hidden="true" />
								</a>
							</div>
							<button
								className="scene-fallback-retry"
								onClick={() => window.location.reload()}
							>
								RETRY THE 3D SCENE <ArrowRight size={15} aria-hidden="true" />
							</button>
						</aside>
					)}
					<div className="explore-title">
						<h1>
							<span className="hero-line">BUILDING</span>
							<span className="hero-line">
								<em>USEFUL</em>
								<br className="desktop-title-break" />
								<span className="hero-final"> THINGS</span>
								<span className="title-dot">.</span>
							</span>
						</h1>
						<p>
							Full-stack software, thoughtful interfaces, and practical AI
							workflows.
						</p>
						<div className="hero-bottom">
							<button
								className="begin-button"
								onClick={() => setActive("work")}
							>
								EXPLORE MY WORK <ArrowRight size={17} />
							</button>
							<span>SELECTED WORK / 03</span>
						</div>
					</div>
					<div className="screen-instructions">
						<span aria-hidden="true">
							<Asterisk size={16} />
						</span>
						<span className="desktop-instructions">
							SCROLL TO NAVIGATE <b>·</b> HOVER TO EXPLORE <b>·</b> CLICK TO
							STEP INSIDE
						</span>
						<span className="mobile-instructions">
							SWIPE TO MOVE <b>·</b> TAP AN OBJECT
						</span>
					</div>
					<button
						className="sound-button"
						onClick={() => setMotion(!motion)}
						disabled={prefersReducedMotion}
						aria-label={
							prefersReducedMotion
								? "Ambient motion disabled by your reduced motion preference"
								: "Toggle ambient scene motion"
						}
						aria-pressed={motionEnabled}
						title={
							prefersReducedMotion
								? "Motion is off because your device requests reduced motion"
								: "Toggle ambient scene motion"
						}
					>
						<Asterisk size={14} aria-hidden="true" /> MOTION{" "}
						{motionEnabled ? "ON" : "OFF"}
					</button>
					<button
						className={`sound-toggle ${soundPreference && !soundReady ? "is-pending" : ""}`}
						type="button"
						onClick={() => chooseSoundPreference(!soundPreference)}
						aria-label={soundPreference && !soundReady ? "Sound is on; click or tap once to activate audio for this visit" : soundPreference ? "Turn sound off" : "Turn sound on"}
						aria-pressed={Boolean(soundPreference)}
						title={soundPreference && !soundReady ? "Sound is on. Click or tap once anywhere to activate it for this visit." : soundPreference ? "Turn sound off" : "Turn sound on"}
					>
						{soundPreference ? (
							<Volume2 size={15} aria-hidden="true" />
						) : (
							<VolumeX size={15} aria-hidden="true" />
						)}
						<span className="sound-label">{soundPreference ? soundReady ? "SOUND ON" : "SOUND ON · CLICK ONCE" : "SOUND OFF"}</span>
					</button>
					<button className="scroll-cue" onClick={() => setActive("engineer")}>
						MEET THE ENGINEER <ArrowDown size={13} aria-hidden="true" />
					</button>
					{active === "work" && (
						<div
							className="accessible-work-tools"
							role="region"
							aria-label="Laptop project controls"
							aria-live="polite"
						>
							<h2>Projects shown on the laptop</h2>
							{projectSelection < 0 ? (
								<>
									<p>
										Choose a project. The selection also changes on the laptop
										screen.
									</p>
									{projects.map((project, index) => (
										<button
											key={project.name}
											onClick={() => setProjectSelection(index)}
										>
											{project.name}
										</button>
									))}
								</>
							) : (
								<>
									<button onClick={() => setProjectSelection(-1)}>
										Back to all projects
									</button>
									<h3>{projects[projectSelection].name}</h3>
									<p>
										{projects[projectSelection].kind}.{" "}
										{projects[projectSelection].note} Technologies:{" "}
										{projects[projectSelection].tech}.
									</p>
									<a
										href={projects[projectSelection].url}
										target="_blank"
										rel="noreferrer"
									>
										Open the live site <ArrowUpRight size={14} />
									</a>
								</>
							)}
						</div>
					)}
					{active && (
						<>
							<button
								className="exit-focus"
								onClick={() => setActive(null)}
								aria-label="Leave this object"
							>
								<X size={17} />
								<span>BACK TO THE WORLD</span>
							</button>
							<FocusContent
								active={active}
								copy={copy}
								copyStatus={copyStatus}
								contactCardRef={contactCardRef}
							/>
						</>
					)}
				</section>
			</main>
			<footer className="bottom-bar">
				<span className="footer-left">
					© 2026 ARMANI ROMERO <b>·</b> FULL-STACK ENGINEER
				</span>
				<nav className="quick-nav" aria-label="Portfolio sections">
					{destinations.map((o, i) => (
						<button
							key={o.id}
							className={active === o.id ? "current" : ""}
							aria-label={`Go to ${o.label.toLowerCase()}`}
							aria-pressed={active === o.id}
							onClick={() => setActive(o.id)}
						>
							<small aria-hidden="true">0{i + 1}</small>
							<span>
								{o.label.replace("THE ", "").replace("GET IN TOUCH", "CONTACT")}
							</span>
						</button>
					))}
				</nav>
				<div className="footer-social">
					<button onClick={copy} aria-label="Copy email address">
						<Mail size={17} aria-hidden="true" />
						<span>EMAIL</span>
					</button>
				</div>
			</footer>
			{soundPreference === null && (
				<div className="sound-consent-backdrop">
					<section
						ref={soundDialogRef}
						className="sound-consent-dialog"
						role="dialog"
						aria-modal="true"
						aria-labelledby="sound-consent-title"
						aria-describedby="sound-consent-copy"
					>
						<div className="sound-consent-meta">
							<span><Asterisk size={15} aria-hidden="true" /> PORTFOLIO AUDIO</span>
							<span>OPTIONAL</span>
						</div>
						<h2 id="sound-consent-title">A little sound?</h2>
						<p id="sound-consent-copy">
							Small interface sounds add a bit of life to the experience. You can change this any time.
						</p>
						<div className="sound-consent-actions">
							<button className="sound-consent-enable" onClick={() => chooseSoundPreference(true)}>
								<Volume2 size={16} aria-hidden="true" /> ENABLE SOUND
							</button>
							<button className="sound-consent-silent" onClick={() => chooseSoundPreference(false)}>
								CONTINUE SILENTLY
							</button>
						</div>
						<small className="sound-consent-note">YOUR CHOICE IS SAVED ON THIS DEVICE FOR ONE YEAR.</small>
					</section>
				</div>
			)}
			{copyStatus && (
				<div
					className={`toast ${copyStatus === "error" ? "is-error" : ""}`}
					role="status"
					aria-live="polite"
					aria-atomic="true"
				>
					<Asterisk size={16} aria-hidden="true" />
					<span>
						{copyStatus === "success"
							? "EMAIL COPIED — TALK SOON."
							: "COPY FAILED — USE THE EMAIL ADDRESS IN CONTACT."}
					</span>
				</div>
			)}
		</div>
	);
}

function FocusContent({ active, copy, copyStatus, contactCardRef }) {
	const engineerCardRef = useRef(null),
		[showEngineerScrollHint, setShowEngineerScrollHint] = useState(false);
	useEffect(() => {
		const panel = engineerCardRef.current;
		if (active !== "engineer" || !panel) {
			setShowEngineerScrollHint(false);
			return;
		}
		const update = () =>
			setShowEngineerScrollHint(
				panel.scrollHeight > panel.clientHeight + 8 && panel.scrollTop < 12,
			);
		update();
		panel.addEventListener("scroll", update, { passive: true });
		const observer = new ResizeObserver(update);
		observer.observe(panel);
		return () => {
			panel.removeEventListener("scroll", update);
			observer.disconnect();
		};
	}, [active]);
	if (active === "engineer")
		return (
			<div className="focus-ui focus-engineer">
				<div
					ref={engineerCardRef}
					className="engineer-card-scroll"
					tabIndex={0}
					role="region"
					aria-label="Engineer profile details"
				>
					<div className="dossier-top">
						<span>
							<i /> FIELD PERSONNEL FILE
						</span>
						<span>NO. 01&nbsp; / &nbsp;2026</span>
					</div>
					<div className="dossier-name">
						<span className="dossier-spark">
							<Asterisk size={31} />
						</span>
						<div>
							<small>SOFTWARE ENGINEER</small>
							<h2>
								ARMANI
								<br />
								<em>ROMERO.</em>
							</h2>
						</div>
					</div>
					<div className="dossier-location">
						<span>COLIMA, MEXICO</span>
						<span className="dossier-status">
							<i /> AVAILABLE FOR THE RIGHT THING
						</span>
					</div>
					<p className="engineer-intro">
						I’m curious about the problem behind the request. I like shaping a
						clear experience, then building the full stack that makes it
						dependable.
					</p>
					<div className="engineer-focus">
						<span>WHERE I DO MY BEST WORK</span>
						<div>
							<b>USEFUL AI</b>
							<b>BILINGUAL PRODUCTS</b>
							<b>END-TO-END BUILDS</b>
						</div>
					</div>
					<div className="profile-stats">
						<div>
							<b>3+</b>
							<small>YEARS BUILDING</small>
						</div>
						<div>
							<b>ES / EN</b>
							<small>BILINGUAL</small>
						</div>
						<div>
							<b>UI → API</b>
							<small>FULL-STACK</small>
						</div>
					</div>
					<span className="wave-note">
						HEY, NICE TO MEET YOU <Asterisk size={15} />
					</span>
				</div>
				{showEngineerScrollHint && (
					<div className="engineer-scroll-hint">
						<span>MORE BELOW</span>
						<ArrowDown size={13} aria-hidden="true" />
					</div>
				)}
			</div>
		);
	if (active === "contact")
		return (
			<div ref={contactCardRef} className="focus-ui focus-contact-card">
				<div className="contact-card-head">
					<span>
						<Mail size={16} /> LET’S CONNECT
					</span>
					<span>COLIMA · MX</span>
				</div>
				<div className="contact-card-copy">
					<small>HIRING · PROJECTS · COLLABORATION</small>
					<strong>
						LET’S KEEP
						<br />
						<em>IN TOUCH.</em>
					</strong>
					<p>
						Whether you’re hiring, looking for someone to join your team, or
						building something useful, I’d love to hear from you.
					</p>
				</div>
				<a href="mailto:armanirmr@gmail.com" className="contact-email">
					<span>
						<small>EMAIL ARMANI</small>
						<b>armanirmr@gmail.com</b>
					</span>
					<ArrowUpRight size={22} />
				</a>
				<div className="contact-card-actions">
					<button
						onClick={copy}
						aria-label={
							copyStatus === "error"
								? "Try copying email address again"
								: "Copy email address"
						}
					>
						<Copy size={15} />{" "}
						{copyStatus === "success"
							? "COPIED"
							: copyStatus === "error"
								? "TRY AGAIN"
								: "COPY EMAIL"}
					</button>
					<a
						className="linkedin-link"
						href="https://www.linkedin.com/in/armani-romero/"
						target="_blank"
						rel="noreferrer"
					>
						<span className="linkedin-mark" aria-hidden="true">
							in
						</span>{" "}
						CONNECT ON LINKEDIN <ArrowUpRight size={13} />
					</a>
				</div>
				<div className="contact-card-foot">
					<span>
						<i /> OPEN TO ROLES & COLLABORATION
					</span>
					<span>COLIMA / MX</span>
				</div>
			</div>
		);
	return null;
}

createRoot(document.getElementById("root")).render(<App />);
