<script lang="ts">
  type User = {
    name: string;
    email: string;
    avatarUrl: string;
  };

  let {
    user = {
      name: "User",
      email: "user@example.com",
      avatarUrl: "/assets/dashboard/custom/image/logo/logo.png",
    },
    onLogout,
  }: {
    user?: User;
    onLogout?: () => void | Promise<void>;
  } = $props();

  function handleLogout(event: MouseEvent) {
    event.preventDefault();
    void onLogout?.();
  }
</script>

<nav
  class="layout-navbar container-xxl navbar-detached navbar navbar-expand-xl align-items-center bg-navbar-theme"
  id="layout-navbar"
>
  <div
    class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none"
  >
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a
      class="nav-item nav-link px-0 me-xl-6"
      href="javascript:void(0)"
      aria-label="Toggle menu"
    >
      <i class="icon-base ti tabler-menu-2 icon-md"></i>
    </a>
  </div>

  <div
    class="navbar-nav-right d-flex align-items-center justify-content-end"
    id="navbar-collapse"
  >
    <ul class="navbar-nav flex-row align-items-center ms-md-auto">
      <li class="nav-item dropdown me-3 me-xl-2">
        <!-- svelte-ignore a11y_invalid_attribute -->
        <a
          class="nav-link dropdown-toggle hide-arrow btn btn-icon btn-text-secondary rounded-pill"
          id="nav-theme"
          href="javascript:void(0);"
          aria-label="Toggle theme"
          data-bs-toggle="dropdown"
        >
          <i
            class="icon-base ti tabler-sun icon-22px theme-icon-active text-heading"
          ></i>
          <span class="d-none ms-2" id="nav-theme-text">Tema</span>
        </a>

        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="nav-theme-text"
        >
          <li>
            <button
              type="button"
              class="dropdown-item align-items-center active"
              data-bs-theme-value="light"
              aria-pressed="false"
            >
              <span>
                <i
                  class="icon-base ti tabler-sun icon-22px me-3"
                  data-icon="sun"
                ></i>
                Terang
              </span>
            </button>
          </li>

          <li>
            <button
              type="button"
              class="dropdown-item align-items-center"
              data-bs-theme-value="dark"
              aria-pressed="true"
            >
              <span>
                <i
                  class="icon-base ti tabler-moon-stars icon-22px me-3"
                  data-icon="moon-stars"
                ></i>
                Gelap
              </span>
            </button>
          </li>

          <li>
            <button
              type="button"
              class="dropdown-item align-items-center"
              data-bs-theme-value="system"
              aria-pressed="false"
            >
              <span>
                <i
                  class="icon-base ti tabler-device-desktop-analytics icon-22px me-3"
                  data-icon="device-desktop-analytics"
                ></i>
                Sistem
              </span>
            </button>
          </li>
        </ul>
      </li>

      <li class="nav-item navbar-dropdown dropdown-user dropdown">
        <!-- svelte-ignore a11y_invalid_attribute -->
        <a
          class="nav-link dropdown-toggle hide-arrow p-0"
          href="javascript:void(0);"
          aria-label="User menu"
          data-bs-toggle="dropdown"
        >
          <div class="avatar avatar-online">
            <img src={user.avatarUrl} alt={user.name} class="rounded-circle" />
          </div>
        </a>

        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <div class="dropdown-item mt-0">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0 me-2">
                  <div class="avatar avatar-online">
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      class="rounded-circle"
                    />
                  </div>
                </div>

                <div class="flex-grow-1">
                  <h6 class="mb-0">{user.name}</h6>
                  <small class="text-body-secondary">{user.email}</small>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div class="dropdown-divider"></div>
          </li>

          <li>
            <!-- svelte-ignore a11y_invalid_attribute -->
            <a
              href="javascript:void(0)"
              class="dropdown-item"
              onclick={handleLogout}
            >
              <i class="icon-base ti tabler-logout me-2 ti-sm"></i>
              Keluar
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</nav>
