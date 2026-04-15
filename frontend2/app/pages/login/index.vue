<template>
	<div class="login-page">
		<canvas ref="bgCanvas" class="bg-canvas" />

		<div class="card">
			<div class="brand">
				<div class="pixel-title" ref="pixelTitle" />
				<p class="subtitle">Que mira gato</p>
			</div>

			<form @submit="submit" :disabled="loading ? 'disabled' : null">
				<div class="field">
					<label>Username</label>
					<input
						v-model="username"
						type="text"
						placeholder="pinga"
						autocomplete="username"
						required
						autofocus
						:disabled="loading"
					/>
				</div>

				<div class="field">
					<label>Password</label>
					<input
						v-model="password"
						type="password"
						placeholder="••••••••"
						autocomplete="current-password"
						required
						minlength="8"
						:disabled="loading"
					/>
				</div>

				<div class="forgot-row">
					<RouterLink :to="resetURL">Forgot password?</RouterLink>
				</div>

				<div v-if="errorMessage" class="error-msg">
					{{ errorMessage }}
				</div>

				<button type="submit" class="btn-primary" :disabled="loading">
					<span v-if="!loading">Entrar</span>
					<span v-else class="loader" />
				</button>
			</form>

			<p class="register-link">
				Nuevo aca?
				<RouterLink :to="rulesURL">Vende tu alma</RouterLink>
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useErrorToast } from "~/composables/useErrorToast";

const { getErrorMessage } = useErrorToast();

const MEDIALUNA_B64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAYUExURfiyd/ndO/9/J/aqCeRcGujUX9ukYwAAAJE7zrAAAAAIdFJOU/////////8A3oO9WQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIDUuMS4xMhMBR3QAAAC4ZVhJZklJKgAIAAAABQAaAQUAAQAAAEoAAAAbAQUAAQAAAFIAAAAoAQMAAQAAAAIAAAAxAQIAEQAAAFoAAABphwQAAQAAAGwAAAAAAAAAYAAAAAEAAABgAAAAAQAAAFBhaW50Lk5FVCA1LjEuMTIAAAMAAJAHAAQAAAAwMjMwAaADAAEAAAABAAAABaAEAAEAAACWAAAAAAAAAAIAAQACAAQAAABSOTgAAgAHAAQAAAAwMTAwAAAAANmnmpXJtwtfAAAAcUlEQVQoU2XNCQ6AMAhEUSha7n9j50NbYyTa5YUplr/aZO6+zrW5jxDFiE3cLhlLk8SDa/2buoVvFJHZdIWJTDtJQAzd1UCbxIsqRErDXmIgIquJpmd4qYhiYteCom4i0iXCJMegbPlQ5pxznQ69lfkAuNwF+ua6tQoAAAAASUVORK5CYII=";
const XDD_B64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAVCAYAAACt4nWrAAACgUlEQVR4AXzVv0tWYRTA8dMVyQpd7MdSQgTpIIkVRCFJQw1Ojf0BDYU0NOWf4NBWbf0BjU2uUUhOKUZQFBFEYJAtipWJvb2fB8/L9fpj+L7n53Oec8/z3PtWY2NjrTs3LhYmJq+02GRy7/Z4i37h8rVWRGxjN189p2ob8e5XDxEDn/5G38i/OLPeHROnRwuDQ8NFPrh/Nx4/nCxMTU2V/DdzL4rc66cUHz78p8S7B46UQgoWx9bPt+XemJ+f37IiTh5dLZu0O+/4dlNKcQGFs6hidcRR99Gvj1+K9hiFdmDjUjwLW4C15bl4u/qqUF/V9eNjIONit26OhDEpxk4OdW1EZSR9rf549nwxZmdnC5lA2kRB+uaxs7Fy4Gd8PrhRzsUmM18Wgjxxfj2aG1T9pwasK2TxR09fxspieajiX+j5XjouRvvHgS982Ax5M09eF9l2R3NMlYUQrM/v92Y3Vwc5niIdGkk9pYOu16h0iEwQhJnV/RknjUUO2u9AgD9HlHZ5dnd7L4zAQhLOhz061EWU8Wki4ZTnyUpxgXSe670aiSRdioHuQPnZOndbSJtpUI6Ywy3FGU3MNxPFmjrbLVp6v1QO2wFrEnRj3VHctYKCEptsfF0TKjhkTwJdQ8BI0CmuiB0TdiaSie+QGPjq+ekzJlR2kJQ0bX6+JvxZrH5t6ZDf6Vwy7ChA3ws59Zj5sq2rfykrp8oJCbCYDboc/kRndHEykUvPDapUOOvUC/putP80ysviI8VWOIvRd1u7bSySsqtM5vP9cHBmPD09Hex6nC6PzM3p24pzeJLcIDvjtxh0fqTNB7a77yUU31Fckg1ANx5IBt9+uPPek/HB4/EfAAD//3tHgiIAAAAGSURBVAMAyJC4Ucj4UKUAAAAASUVORK5CYII=";

const PIXEL_LETTERS: Record<string, number[][]> = {
	M: [[1,0,0,0,1],[1,1,0,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1]],
	P: [[1,1,1,0,0],[1,0,0,1,0],[1,1,1,0,0],[1,0,0,0,0],[1,0,0,0,0]],
	L: [[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
	A: [[0,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],
	C: [[0,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,0]],
	E: [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,1,1,1]]
};

const LETTER_COLORS = ["#f5b83a","#e8a020","#f07020","#f5d040","#e86030","#f0c030"];

interface LoginResponse {
	success: boolean;
	error?: string;
}

definePageMeta({ layout: "auth-blank" });

const router = useRouter();
const route = useRoute();
const { fetchUserProfile } = useUserProfile();
const { getErrorMessage: _getErr } = useErrorToast();

const bgCanvas = ref<HTMLCanvasElement | null>(null);
const pixelTitle = ref<HTMLElement | null>(null);
const loading = ref(false);
const username = ref("");
const password = ref("");
const errorMessage = ref<string | null>(null);
const rulesURL = ref("/login/rules");
const resetURL = ref("/login/reset");

onMounted(async () => {
	const returnTo = route.query.r as string;
	if (returnTo) {
		const params = new URLSearchParams([["r", returnTo]]);
		rulesURL.value = `/login/rules?${params.toString()}`;
		resetURL.value = `/login/reset?${params.toString()}`;
	}

	try {
		if (await fetchUserProfile()) {
			done(true);
		}
	} catch { /* ignore */ }

	drawPixelTitle();
	initCanvas();
});

function done(replace = false) {
	const returnTo = route.query.r as string ?? "/";
	if (replace) router.replace(returnTo);
	else router.push(returnTo);
}

function drawPixelTitle() {
	const container = pixelTitle.value;
	if (!container) return;
	["M","P","L","A","C","E"].forEach((ch, i) => {
		const wrap = document.createElement("div");
		wrap.style.cssText = "display:grid;gap:2px;grid-template-columns:repeat(5,7px);margin-right:5px;";
		const grid = PIXEL_LETTERS[ch];
		grid.forEach(row => row.forEach(cell => {
			const px = document.createElement("div");
			px.style.cssText = `width:7px;height:7px;border-radius:0;background:${cell ? LETTER_COLORS[i] : "transparent"};`;
			wrap.appendChild(px);
		}));
		container.appendChild(wrap);
	});
}

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

const submit = async (e: Event) => {
	e.preventDefault();
	loading.value = true;
	errorMessage.value = null;

	try {
		const config = useRuntimeConfig();
		const { success, error } = await $fetch<LoginResponse>(`${config.public.backendUrl}/login`, {
			method: "POST",
			credentials: "include",
			body: { username: username.value, password: password.value }
		});
		if (success) done();
		else throw new Error(error);
	} catch (error: unknown) {
		errorMessage.value = getErrorMessage(error);
	}

	loading.value = false;
};
</script>

<style scoped>
.login-page {
	position: fixed;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
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
	width: 340px;
	background: rgba(12, 10, 18, 0.86);
	border-radius: 14px;
	border: 0.5px solid rgba(255, 255, 255, 0.13);
	padding: 2rem 2rem 1.75rem;
	animation: cardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes cardIn {
	from { opacity: 0; transform: translateY(18px) scale(0.97); }
	to   { opacity: 1; transform: translateY(0) scale(1); }
}

.brand {
	text-align: center;
	margin-bottom: 1.75rem;
}

.pixel-title {
	display: inline-flex;
	gap: 4px;
	align-items: flex-end;
	margin-bottom: 0.5rem;
}

.subtitle {
	color: rgba(255, 255, 255, 0.4);
	font-size: 12px;
	margin: 0;
	letter-spacing: 0.5px;
}

.field {
	margin-bottom: 0.9rem;
}

.field label {
	display: block;
	font-size: 12px;
	color: rgba(255, 255, 255, 0.45);
	margin-bottom: 5px;
}

.field input {
	width: 100%;
	box-sizing: border-box;
	padding: 10px 12px;
	border-radius: 8px;
	border: 0.5px solid rgba(255, 255, 255, 0.13);
	background: rgba(255, 255, 255, 0.06);
	color: white;
	font-size: 14px;
	outline: none;
	transition: border-color 0.15s;
}

.field input:focus {
	border-color: rgba(248, 185, 80, 0.5);
}

.field input::placeholder {
	color: rgba(255, 255, 255, 0.2);
}

.forgot-row {
	text-align: right;
	margin-bottom: 1.25rem;
}

.forgot-row a {
	font-size: 12px;
	color: rgba(248, 185, 80, 0.55);
	text-decoration: none;
}

.forgot-row a:hover {
	color: rgba(248, 185, 80, 0.9);
}

.error-msg {
	background: rgba(220, 60, 60, 0.15);
	border: 0.5px solid rgba(220, 60, 60, 0.35);
	color: #f09090;
	font-size: 13px;
	border-radius: 8px;
	padding: 9px 12px;
	margin-bottom: 1rem;
}

.btn-primary {
	width: 100%;
	padding: 11px;
	background: #e8a020;
	color: #1a0800;
	border: none;
	border-radius: 8px;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	margin-bottom: 1.25rem;
	transition: background 0.15s, transform 0.1s;
	display: flex;
	align-items: center;
	justify-content: center;
}

.btn-primary:hover:not(:disabled) {
	background: #f5b83a;
}

.btn-primary:active:not(:disabled) {
	transform: scale(0.98);
}

.btn-primary:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}

.loader {
	width: 16px;
	height: 16px;
	border: 2px solid rgba(26, 8, 0, 0.3);
	border-top-color: #1a0800;
	border-radius: 50%;
	animation: spin 0.7s linear infinite;
}

@keyframes spin {
	to { transform: rotate(360deg); }
}

.register-link {
	text-align: center;
	font-size: 12px;
	color: rgba(255, 255, 255, 0.3);
	margin: 0;
}

.register-link a {
	color: #e8a020;
	text-decoration: none;
	font-weight: 500;
}

.register-link a:hover {
	color: #f5b83a;
}
</style>
