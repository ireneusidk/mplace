<template>
	<div class="rules-page">
		<canvas ref="bgCanvas" class="bg-canvas" />

		<div class="card">
			<RouterLink :to="returnTo" class="logo-link">
				<img
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAYUExURfiyd/ndO/9/J/aqCeRcGujUX9ukYwAAAJE7zrAAAAAIdFJOU/////////8A3oO9WQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIDUuMS4xMhMBR3QAAAC4ZVhJZklJKgAIAAAABQAaAQUAAQAAAEoAAAAbAQUAAQAAAFIAAAAoAQMAAQAAAAIAAAAxAQIAEQAAAFoAAABphwQAAQAAAGwAAAAAAAAAYAAAAAEAAABgAAAAAQAAAFBhaW50Lk5FVCA1LjEuMTIAAAMAAJAHAAQAAAAwMjMwAaADAAEAAAABAAAABaAEAAEAAACWAAAAAAAAAAIAAQACAAQAAABSOTgAAgAHAAQAAAAwMTAwAAAAANmnmpXJtwtfAAAAcUlEQVQoU2XNCQ6AMAhEUSha7n9j50NbYyTa5YUplr/aZO6+zrW5jxDFiE3cLhlLk8SDa/2buoVvFJHZdIWJTDtJQAzd1UCbxIsqRErDXmIgIquJpmd4qYhiYteCom4i0iXCJMegbPlQ5pxznQ69lfkAuNwF+ua6tQoAAAAASUVORK5CYII="
					alt="mplace"
					class="logo-img"
				/>
			</RouterLink>

			<h2 class="title">First, let's go over some rules..</h2>
			<p class="desc">These rules are to ensure you have a safe and enjoyable experience on mplace.</p>

			<div class="section">
				<Rules :is-visible="isVisible" />
			</div>

			<RouterLink :to="registerURL" class="btn-primary">
				Continue
			</RouterLink>
		</div>
	</div>
</template>

<script setup lang="ts">
const MEDIALUNA_B64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAYUExURfiyd/ndO/9/J/aqCeRcGujUX9ukYwAAAJE7zrAAAAAIdFJOU/////////8A3oO9WQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIDUuMS4xMhMBR3QAAAC4ZVhJZklJKgAIAAAABQAaAQUAAQAAAEoAAAAbAQUAAQAAAFIAAAAoAQMAAQAAAAIAAAAxAQIAEQAAAFoAAABphwQAAQAAAGwAAAAAAAAAYAAAAAEAAABgAAAAAQAAAFBhaW50Lk5FVCA1LjEuMTIAAAMAAJAHAAQAAAAwMjMwAaADAAEAAAABAAAABaAEAAEAAACWAAAAAAAAAAIAAQACAAQAAABSOTgAAgAHAAQAAAAwMTAwAAAAANmnmpXJtwtfAAAAcUlEQVQoU2XNCQ6AMAhEUSha7n9j50NbYyTa5YUplr/aZO6+zrW5jxDFiE3cLhlLk8SDa/2buoVvFJHZdIWJTDtJQAzd1UCbxIsqRErDXmIgIquJpmd4qYhiYteCom4i0iXCJMegbPlQ5pxznQ69lfkAuNwF+ua6tQoAAAAASUVORK5CYII=";
const XDD_B64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAVCAYAAACt4nWrAAACgUlEQVR4AXzVv0tWYRTA8dMVyQpd7MdSQgTpIIkVRCFJQw1Ojf0BDYU0NOWf4NBWbf0BjU2uUUhOKUZQFBFEYJAtipWJvb2fB8/L9fpj+L7n53Oec8/z3PtWY2NjrTs3LhYmJq+02GRy7/Z4i37h8rVWRGxjN189p2ob8e5XDxEDn/5G38i/OLPeHROnRwuDQ8NFPrh/Nx4/nCxMTU2V/DdzL4rc66cUHz78p8S7B46UQgoWx9bPt+XemJ+f37IiTh5dLZu0O+/4dlNKcQGFs6hidcRR99Gvj1+K9hiFdmDjUjwLW4C15bl4u/qqUF/V9eNjIONit26OhDEpxk4OdW1EZSR9rf549nwxZmdnC5lA2kRB+uaxs7Fy4Gd8PrhRzsUmM18Wgjxxfj2aG1T9pwasK2TxR09fxspieajiX+j5XjouRvvHgS982Ax5M09eF9l2R3NMlYUQrM/v92Y3Vwc5niIdGkk9pYOu16h0iEwQhJnV/RknjUUO2u9AgD9HlHZ5dnd7L4zAQhLOhz061EWU8Wki4ZTnyUpxgXSe670aiSRdioHuQPnZOndbSJtpUI6Ywy3FGU3MNxPFmjrbLVp6v1QO2wFrEnRj3VHctYKCEptsfF0TKjhkTwJdQ8BI0CmuiB0TdiaSie+QGPjq+ekzJlR2kJQ0bX6+JvxZrH5t6ZDf6Vwy7ChA3ws59Zj5sq2rfykrp8oJCbCYDboc/kRndHEykUvPDapUOOvUC/putP80ysviI8VWOIvRd1u7bSySsqtM5vP9cHBmPD09Hex6nC6PzM3p24pzeJLcIDvjtxh0fqTNB7a77yUU31Fckg1ANx5IBt9+uPPek/HB4/EfAAD//3tHgiIAAAAGSURBVAMAyJC4Ucj4UKUAAAAASUVORK5CYII=";

definePageMeta({ layout: "auth-blank" });

const route = useRoute();
const bgCanvas = ref<HTMLCanvasElement | null>(null);
const isVisible = ref(false);
const registerURL = ref("/login/register");
const returnTo = ref("/");

onMounted(async () => {
	const r = route.query.r as string;
	returnTo.value = r ?? "/";
	if (r) {
		const params = new URLSearchParams([["r", r]]);
		registerURL.value = `/login/register?${params.toString()}`;
	}
	isVisible.value = true;
	initCanvas();
});

function initCanvas() {
	const canvas = bgCanvas.value;
	if (!canvas) return;
	const ctx = canvas.getContext("2d");
	if (!ctx) return;

	const img1 = new Image(); img1.src = MEDIALUNA_B64;
	const img2 = new Image(); img2.src = XDD_B64;

	interface Drop {
		x: number; y: number; size: number;
		speed: number; drift: number;
		rot: number; rotSpeed: number;
		alpha: number; img: HTMLImageElement;
	}

	const drops: Drop[] = [];

	function resize() {
		canvas!.width = canvas!.offsetWidth;
		canvas!.height = canvas!.offsetHeight;
	}
	resize();
	window.addEventListener("resize", resize);

	function spawn(randomY = false) {
		const isMed = Math.random() < 0.88;
		const size = isMed ? (16 + Math.random() * 20) : (20 + Math.random() * 28);
		drops.push({
			x: Math.random() * canvas!.width,
			y: randomY ? Math.random() * canvas!.height : -size,
			size,
			speed: 0.5 + Math.random() * 1.1,
			drift: (Math.random() - 0.5) * 0.25,
			rot: Math.random() * Math.PI * 2,
			rotSpeed: (Math.random() - 0.5) * 0.022,
			alpha: 0.5 + Math.random() * 0.5,
			img: isMed ? img1 : img2
		});
	}

	for (let i = 0; i < 120; i++) spawn(true);

	let frame = 0;
	let animId: number;

	function animate() {
		ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
		ctx!.fillStyle = "#0c0a12";
		ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
		frame++;
		if (frame % 6 === 0 && drops.length < 200) spawn(false);
		for (let i = drops.length - 1; i >= 0; i--) {
			const d = drops[i];
			d.y += d.speed;
			d.x += d.drift;
			d.rot += d.rotSpeed;
			if (d.y > canvas!.height + d.size) { drops.splice(i, 1); continue; }
			ctx!.save();
			ctx!.globalAlpha = d.alpha;
			ctx!.translate(d.x, d.y);
			ctx!.rotate(d.rot);
			ctx!.imageSmoothingEnabled = false;
			ctx!.drawImage(d.img, -d.size / 2, -d.size / 2, d.size, d.size);
			ctx!.restore();
		}
		animId = requestAnimationFrame(animate);
	}

	let loaded = 0;
	function onLoad() { if (++loaded === 2) animate(); }
	img1.onload = onLoad;
	img2.onload = onLoad;
	if (img1.complete) onLoad();
	if (img2.complete) onLoad();

	onUnmounted(() => {
		cancelAnimationFrame(animId);
		window.removeEventListener("resize", resize);
	});
}
</script>

<style scoped>
.rules-page {
	position: fixed;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	padding: 1rem;
	box-sizing: border-box;
}

.bg-canvas {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
}

.card {
	position: relative;
	z-index: 2;
	width: 100%;
	max-width: 420px;
	max-height: 90svh;
	overflow-y: auto;
	background: rgba(12, 10, 18, 0.86);
	border-radius: 14px;
	border: 0.5px solid rgba(255, 255, 255, 0.13);
	padding: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	animation: cardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
	box-sizing: border-box;
}

@keyframes cardIn {
	from { opacity: 0; transform: translateY(18px) scale(0.97); }
	to   { opacity: 1; transform: translateY(0) scale(1); }
}

.logo-link {
	display: flex;
	justify-content: center;
	margin-bottom: 0.25rem;
}

.logo-img {
	width: 56px;
	height: 56px;
	image-rendering: pixelated;
}

.title {
	text-align: center;
	font-size: 1.4rem;
	font-weight: 600;
	margin: 0;
	color: white;
}

.desc {
	text-align: center;
	font-size: 13px;
	color: rgba(255, 255, 255, 0.45);
	margin: 0;
}

.section {
	flex: 1;
}

.btn-primary {
	display: block;
	width: 100%;
	padding: 11px;
	background: #e8a020;
	color: #1a0800;
	border: none;
	border-radius: 8px;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	text-align: center;
	text-decoration: none;
	transition: background 0.15s, transform 0.1s;
	box-sizing: border-box;
}

.btn-primary:hover {
	background: #f5b83a;
}

.btn-primary:active {
	transform: scale(0.98);
}
</style>
