<script lang="ts">
  import jQuery from "jquery";
  import { onMount } from "svelte";

  import { goto } from "$app/navigation";

  import { login } from "$lib/api/auth_api";

  import { saveSession } from "$lib/helpers/auth_helper";

  import { cardAnimate } from "$lib/utils/animate";
  import { blockCard, unblockCard } from "$lib/utils/block_ui";
  import { notifyDanger } from "$lib/utils/izi_toast";

  let loginForm = $state({
    email: "",
    password: "",
  });

  function visiblePassword() {
    const passwordElement = jQuery("#password");
    const passwordIconElement = jQuery("#password-icon");

    const originalType = passwordElement.data("original-type");

    if (originalType == "password") {
      passwordElement.attr("type", "text");
      passwordElement.data("original-type", "text");
      passwordIconElement.attr("class", "icon-base ti tabler-eye");
    } else {
      passwordElement.attr("type", "password");
      passwordElement.data("original-type", "password");
      passwordIconElement.attr("class", "icon-base ti tabler-eye-off");
    }
  }

  async function authenticate() {
    let payload = {
      email: loginForm.email,
      password: loginForm.password,
    };

    blockCard();

    let result = await login(payload);

    unblockCard();

    if (result.status) {
      let user = result.data;
      let token = result.token.access_token;
      let expiredAt = result.token.expired_at;

      saveSession(user, token, expiredAt);

      await goto("/dashboard/home");
    } else {
      let errorMessage = result.error[0].message;

      notifyDanger(errorMessage);
    }
  }

  function initFormValidation() {
    let loginFormDocumentElement = document.getElementById("loginForm");

    FormValidation.formValidation(loginFormDocumentElement, {
      fields: {
        email: {
          validators: {
            notEmpty: {
              message: "Email tidak boleh kosong !",
            },
            emailAddress: {
              message: "Format email tidak valid !",
            },
          },
        },

        password: {
          validators: {
            notEmpty: {
              message: "Password tidak boleh kosong !",
            },
          },
        },
      },
      plugins: {
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          eleValidClass: "",
          rowSelector: ".mb-3",
        }),
        defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        trigger: new FormValidation.plugins.Trigger(),
        submitButton: new FormValidation.plugins.SubmitButton(),
      },
      init: (instance: { on: (event: string, handler: (e: { element: HTMLElement; messageElement: HTMLElement }) => void) => void }) => {
        instance.on("plugins.message.placed", function (e) {
          if (e.element.parentElement?.classList.contains("input-group")) {
            e.element.parentElement.insertAdjacentElement("afterend", e.messageElement);
          }
        });
      },
    }).on("core.form.valid", async function () {
      await authenticate();
    });
  }

  onMount(() => {
    initFormValidation();
  });
</script>

<div class="authentication-wrapper authentication-basic container-p-y">
  <div class="authentication-inner py-4">
    <div class="card {cardAnimate}">
      <div class="card-body">
        <div class="d-flex justify-content-center mb-2">
          <a href="/">
            <img src="/assets/dashboard/custom/image/logo/logo.png" width="80" alt="Logo" />
          </a>
        </div>

        <form id="loginForm" method="POST" action="javascript:void(0)" enctype="multipart/form-data">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="mb-3">
                <label class="form-label" for="email">Email</label>

                <input type="email" class="form-control" name="email" id="email" bind:value={loginForm.email} placeholder="Masukkan Email" autocomplete="off" />
              </div>
            </div>

            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="mb-3 form-password-toggle">
                <label class="form-label" for="password">Password</label>

                <div class="input-group">
                  <input
                    type="password"
                    class="form-control"
                    name="password"
                    id="password"
                    bind:value={loginForm.password}
                    placeholder="············"
                    data-original-type="password"
                    autocomplete="off" />

                  <button type="button" class="input-group-text cursor-pointer" aria-label="Toggle password visibility" onclick={visiblePassword}>
                    <i class="icon-base ti tabler-eye-off" id="password-icon"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="mb-3">
                <button type="submit" class="btn btn-primary w-100">
                  <i class="icon-base ti tabler-login me-1"></i>
                  Masuk
                </button>
              </div>
            </div>
          </div>
        </form>

        <hr />

        <div class="mb-3">
          <a href="/google/oauth/redirect">
            <button type="button" class="btn btn-secondary w-100">
              <i class="icon-base ti tabler-brand-google me-1"></i>
              Google
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
