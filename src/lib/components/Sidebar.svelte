<script lang="ts">
  import { page } from "$app/state";

  let urlPath = $derived(page.url.pathname);
</script>

<aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
  <div class="app-brand demo my-3 d-flex align-items-center">
    <a
      href="/dashboard/home"
      class="app-brand-link flex-grow-1 d-flex justify-content-center"
    >
      <span class="app-brand-logo demo"></span>

      <span class="app-brand-text demo menu-text fw-bold">
        <img
          src="/assets/dashboard/custom/image/logo/logo.png"
          width="70"
          alt="Logo"
        />
      </span>
    </a>

    <!-- svelte-ignore a11y_invalid_attribute -->
    <a
      href="javascript:void(0);"
      class="layout-menu-toggle menu-link text-large"
      aria-label="Toggle menu"
    >
      <i class="ti menu-toggle-icon d-none d-xl-block ti-sm align-middle"></i>
      <i class="ti tabler-x d-block d-xl-none ti-sm align-middle"></i>
    </a>
  </div>

  <div class="menu-inner-shadow"></div>

  <ul class="menu-inner py-1">
    <!-- * Home -->
    <li class="menu-item" class:active={urlPath.startsWith("/dashboard/home")}>
      <a href="/dashboard/home" class="menu-link">
        <i class="menu-icon icon-base ti tabler-smart-home"></i>
        <div data-i18n="Beranda">Beranda</div>
      </a>
    </li>

    <!-- * Product Category -->
    <li
      class="menu-item"
      class:active={urlPath.startsWith("/dashboard/product-category")}
    >
      <a href="/dashboard/product-category" class="menu-link">
        <i class="menu-icon icon-base ti tabler-archive"></i>
        <div data-i18n="Kategori Produk">Kategori Produk</div>
      </a>
    </li>

    <!-- * Product -->
    <li
      class="menu-item"
      class:active={urlPath.startsWith("/dashboard/product") &&
        !urlPath.startsWith("/dashboard/product-category")}
    >
      <a href="/dashboard/product" class="menu-link">
        <i class="menu-icon icon-base ti tabler-file-text"></i>
        <div data-i18n="Produk">Produk</div>
      </a>
    </li>

    <!-- * Websocket -->
    <li
      class="menu-item"
      class:active={urlPath.startsWith("/dashboard/websocket")}
    >
      <a href="/dashboard/websocket" class="menu-link">
        <i class="menu-icon icon-base ti tabler-message-circle"></i>
        <div data-i18n="Websocket">Websocket</div>
      </a>
    </li>
  </ul>
</aside>
