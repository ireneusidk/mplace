<template>
	<div class="discord-page">
		<canvas ref="bgCanvas" class="bg-canvas" />

		<div class="card">
			<div class="brand">
				<div class="pixel-title" ref="pixelTitle" />
				<p class="subtitle">{{ welcome ? "Discord" : "link discord account" }}</p>
			</div>

			<div v-if="errorMessage" class="error-msg">
				{{ errorMessage }}
			</div>

			<div v-if="discordUserId" class="info-section">
				<p class="info-label">Discord Username</p>
				<p class="info-value">{{ discordUsername }}</p>

				<div v-if="boost" class="boost-msg success">
					<strong v-if="boost === 'booster'">Comeme los huevos</strong>
					<strong v-else-if="boost === 'active'">Thanks for being an active server member!</strong>
					<strong v-else-if="boost === 'special'">You have special member status!</strong>
					<span>Your paint cooldown has been set to {{ cooldown }} seconds.</span>
				</div>

				<div v-else class="boost-msg info">
					You're not eligible for any boosts at this time. You will receive a notification when you become eligible.
				</div>

				<p class="info-text">Querés deslinkear tu cuenta de Discord?</p>
				<p class="info-text">Luego de deslinkear, podrás editar tu nombre de Discord otra vez.</p>
			</div>

			<div v-else class="info-section">
				<p class="info-text">Conecta tu cuenta de Discord a mplace.</p>
				<p class="info-text">Si linkeas tu cuenta de discord al juego tu cooldown de recarga pasara a ser de 15 segundos , si no lo linkeas tendras 30 segundos. Pete.</p>
				<p class="info-text muted">Una vez linkeada tu cuenta a tu Discord tu username de Discord (dentro del juego) no podra ser cambiado.  Podes deslinkearlo cuando quieras.</p>
			</div>

			<form @submit="submit" :disabled="loading ? 'disabled' : null">
				<button
					v-if="discordUserId"
					type="submit"
					class="btn-danger"
					:disabled="loading"
				>
					<span v-if="!loading">Deslikear cuenta de Discord</span>
					<span v-else class="loader" />
				</button>

				<button
					v-else
					type="submit"
					class="btn-discord"
					:disabled="loading"
				>
					<svg v-if="!loading" width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" style="margin-right:8px;">
						<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.053a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
					</svg>
					<span v-if="!loading">Si, inyectame esos 15s</span>
					<span v-else class="loader" />
				</button>
			</form>

			<div v-if="welcome" style="margin-top: 0.75rem;">
				<RouterLink :to="returnTo" class="btn-secondary">
					Nah, me dió paja
				</RouterLink>
			</div>

			<div v-if="!welcome && returnTo !== '/'" style="text-align:center; margin-top: 1rem;">
				<RouterLink :to="returnTo" class="cancel-link">Cancel</RouterLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useErrorToast } from "~/composables/useErrorToast";
import { useUserProfile } from "~/composables/useUserProfile";
import { FetchError } from "ofetch";

const { getErrorMessage } = useErrorToast();
const { fetchUserProfile } = useUserProfile();

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

interface DiscordAuthURLResponse { url: string; }

definePageMeta({ layout: "auth-blank" });

const route = useRoute();
const bgCanvas = ref<HTMLCanvasElement | null>(null);
const pixelTitle = ref<HTMLElement | null>(null);
const loading = ref(false);
const discordUserId = ref<string | null>(null);
const discordUsername = ref<string | null>(null);
const cooldown = ref(0);
const boost = ref<string | null>(null);
const errorMessage = ref<string | null>(null);
const welcome = ref(false);
const returnTo = ref("/");

onMounted(async () => {
	returnTo.value = route.query.r as string ?? "/";
	errorMessage.value = route.query.error as string ?? null;
	welcome.value = route.query.for === "welcome";
	loading.value = true;

	try {
		const config = useRuntimeConfig();
		await $fetch(`${config.public.backendUrl}/discord/configured`);
	} catch (error: unknown) {
		errorMessage.value = error instanceof FetchError && error.statusCode === 503
			? "Discord linking is not available on this instance."
			: getErrorMessage(error);
		loading.value = false;
		return;
	}

	await updateProfile();
	loading.value = false;

	drawPixelTitle();
	initCanvas();
});

function drawPixelTitle() {
	const container = pixelTitle.value;
	if (!container) return;
	["M","P","L","A","C","E"].forEach((ch, i) => {
		const wrap = document.createElement("div");
		wrap.style.cssText = "display:grid;gap:2px;grid-template-columns:repeat(5,7px);margin-right:5px;";
		PIXEL_LETTERS[ch].forEach(row => row.forEach(cell => {
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
			size, speed: 0.5 + Math.random() * 1.1,
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
			d.y += d.speed; d.x += d.drift; d.rot += d.rotSpeed;
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
	img1.onload = onLoad; img2.onload = onLoad;
	if (img1.complete) onLoad();
	if (img2.complete) onLoad();

	onUnmounted(() => {
		cancelAnimationFrame(animId);
		window.removeEventListener("resize", resize);
	});
}

const updateProfile = async () => {
	const user = await fetchUserProfile();
	discordUserId.value = user?.discordUserId ?? null;
	discordUsername.value = user?.discord ?? null;
	cooldown.value = Math.floor((user?.charges?.cooldownMs ?? 0) / 1000);
	boost.value = user?.charges?.boost ?? null;
};

const submit = async (e: Event) => {
	e.preventDefault();
	loading.value = true;
	errorMessage.value = null;

	try {
		const config = useRuntimeConfig();
		if (discordUserId.value) {
			await $fetch(`${config.public.backendUrl}/discord/unlink`, {
				method: "POST",
				credentials: "include"
			});
			await updateProfile();
		} else {
			const { url } = await $fetch<DiscordAuthURLResponse>(`${config.public.backendUrl}/discord/auth-url`, {
				method: "POST",
				credentials: "include"
			});
			location.href = url;
		}
	} catch (error: unknown) {
		errorMessage.value = getErrorMessage(error);
	}

	loading.value = false;
};
</script>

<style scoped>
.discord-page {
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
	max-width: 380px;
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

.brand {
	text-align: center;
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

.error-msg {
	background: rgba(220, 60, 60, 0.15);
	border: 0.5px solid rgba(220, 60, 60, 0.35);
	color: #f09090;
	font-size: 13px;
	border-radius: 8px;
	padding: 9px 12px;
}

.info-section {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.info-label {
	font-size: 11px;
	color: rgba(255, 255, 255, 0.4);
	margin: 0;
}

.info-value {
	font-size: 15px;
	color: white;
	font-weight: 500;
	margin: 0 0 0.5rem;
}

.info-text {
	font-size: 13px;
	color: rgba(255, 255, 255, 0.5);
	margin: 0;
	line-height: 1.6;
}

.info-text.muted {
	color: rgba(255, 255, 255, 0.3);
	font-size: 12px;
}

.boost-msg {
	border-radius: 8px;
	padding: 10px 14px;
	font-size: 13px;
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.boost-msg.success {
	background: rgba(40, 180, 100, 0.12);
	border: 0.5px solid rgba(40, 180, 100, 0.3);
	color: #7de8a8;
}

.boost-msg.info {
	background: rgba(80, 140, 255, 0.1);
	border: 0.5px solid rgba(80, 140, 255, 0.25);
	color: rgba(160, 200, 255, 0.8);
}

.btn-discord {
	width: 100%;
	padding: 11px;
	background: #5865F2;
	color: white;
	border: none;
	border-radius: 8px;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background 0.15s, transform 0.1s;
}

.btn-discord:hover:not(:disabled) {
	background: #4752c4;
}

.btn-discord:active:not(:disabled) {
	transform: scale(0.98);
}

.btn-discord:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}

.btn-danger {
	width: 100%;
	padding: 11px;
	background: rgba(220, 60, 60, 0.2);
	color: #f09090;
	border: 0.5px solid rgba(220, 60, 60, 0.4);
	border-radius: 8px;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: background 0.15s, transform 0.1s;
	display: flex;
	align-items: center;
	justify-content: center;
}

.btn-danger:hover:not(:disabled) {
	background: rgba(220, 60, 60, 0.3);
}

.btn-danger:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}

.btn-secondary {
	display: block;
	width: 100%;
	padding: 10px;
	background: rgba(255, 255, 255, 0.06);
	color: rgba(255, 255, 255, 0.5);
	border: 0.5px solid rgba(255, 255, 255, 0.13);
	border-radius: 8px;
	font-size: 14px;
	text-align: center;
	text-decoration: none;
	transition: background 0.15s;
	box-sizing: border-box;
}

.btn-secondary:hover {
	background: rgba(255, 255, 255, 0.1);
}

.cancel-link {
	font-size: 12px;
	color: rgba(255, 255, 255, 0.35);
	text-decoration: none;
}

.cancel-link:hover {
	color: rgba(255, 255, 255, 0.6);
}

.loader {
	width: 16px;
	height: 16px;
	border: 2px solid rgba(255, 255, 255, 0.2);
	border-top-color: white;
	border-radius: 50%;
	animation: spin 0.7s linear infinite;
}

@keyframes spin {
	to { transform: rotate(360deg); }
}
</style>
