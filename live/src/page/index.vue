<template>
	<div>
		<div>
			<button @click="$rl('setLocale', 'en_US')">English</button>
			<button @click="$rl('setLocale', 'pt_BR')">Portuguese</button>
		</div>
		
		{{ $rl('locale', 'HELLO', { person: 'Francisco'}) }}.
		{{ $rl('locale', 'MY_FRIEND') }}
		
		<div v-html="$rl('video', 'hereToCreate')"></div>
		<img :src="$rl('image', 'sierra')">

	</div>
</template>

<script>
	export default {

	}
</script>