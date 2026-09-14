<script lang="ts">
  import MetadataHelper from "$lib/helpers/metadata_helper";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="stylesheet" href="/assets/dashboard/vendor/css/pages/page-auth.css" />

  <title>{MetadataHelper.getMetadata().title}</title>
  <meta name="description" content={MetadataHelper.getMetadata().description} />
  <meta name="keywords" content={MetadataHelper.getMetadata().keywords} />
</svelte:head>

{@render children()}
