<script lang="ts">
  import { onMount } from "svelte";
  import Alert from "$lib/components/Alert.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";

  let { children } = $props();

  function loadScript(src: string) {
    return new Promise<void>((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.body.appendChild(script);
    });
  }

  onMount(() => {
    void (async () => {
      await loadScript("/assets/dashboard/vendor/js/menu.js");
      await loadScript("/assets/dashboard/js/main.js");
    })();
  });
</script>

<div class="layout-wrapper layout-content-navbar">
  <div class="layout-container">
    <Sidebar />

    <div class="layout-page">
      <Navbar />

      <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
          <Alert />

          {@render children()}
        </div>

        <Footer />

        <div class="content-backdrop fade"></div>
      </div>
    </div>
  </div>

  <!-- Overlay -->
  <div class="layout-overlay layout-menu-toggle"></div>

  <!-- Drag Target Area To SlideIn Menu On Small Screens -->
  <div class="drag-target"></div>
</div>
