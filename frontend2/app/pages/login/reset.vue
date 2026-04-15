<template>
	<div class="video-wrapper">
		<iframe 
			src="https://www.youtube.com/embed/9tdbzDYe-LA?playlist=9tdbzDYe-LA&loop=1&autoplay=1&mute=0&controls=0&modestbranding=1&rel=0" 
			frameborder="0" 
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
			referrerpolicy="strict-origin-when-cross-origin" 
			allowfullscreen
		></iframe>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: false
});
</script>

<style scoped>
.video-wrapper {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	background-color: #000;
}

.video-wrapper iframe {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 100vw;
	height: 100vh;
	transform: translate(-50%, -50%);
	pointer-events: none;
}

@media (min-aspect-ratio: 9/16) {
	.video-wrapper iframe {
		width: 177.78vh;
		height: 100vh;
	}
}

@media (max-aspect-ratio: 9/16) {
	.video-wrapper iframe {
		width: 100vw;
		height: 56.25vw;
	}
}
</style>