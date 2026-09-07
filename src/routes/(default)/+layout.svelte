<script lang="ts">
	import { metadata } from '$lib/helpers/metadata_helper';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="stylesheet" href="/assets/dashboard/vendor/css/pages/page-auth.css" />

	<title>{metadata().title}</title>
	<meta name="description" content={metadata().description} />
	<meta name="keywords" content={metadata().keywords} />
</svelte:head>

{@render children()}
