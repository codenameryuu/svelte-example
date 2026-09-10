<script lang="ts">
  import { onMount } from "svelte";

  import { createProductCategory } from "$lib/api/product_category_api";

  import { cardAnimate } from "$lib/utils/animate";
  import { blockCard, unblockCard } from "$lib/utils/block_ui";
  import { notifyDanger, notifySuccess } from "$lib/utils/izi_toast";

  let createForm = $state({
    name: "",
    description: "",
  });

  async function createData() {
    let payload = {
      name: createForm.name,
      description: createForm.description,
    };

    blockCard();

    let response = await createProductCategory(payload);

    unblockCard();

    if (response.status) {
      notifySuccess(response.message);

      createForm.name = "";
      createForm.description = "";
    } else {
      notifyDanger(response.message);
    }
  }

  function initFormValidation() {
    let createFormDocumentElement = document.getElementById("createForm");

    FormValidation.formValidation(createFormDocumentElement, {
      fields: {
        name: {
          validators: {
            notEmpty: {
              message: "Nama tidak boleh kosong !",
            },
          },
        },

        description: {
          validators: {
            notEmpty: {
              message: "Deskripsi tidak boleh kosong !",
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
      Swal.fire({
        icon: "question",
        text: "Apakah Anda yakin ingin menyimpan data ini ?",
        showCancelButton: true,
        buttonsStyling: false,
        reverseButtons: true,
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-secondary",
        },
        confirmButtonText: "Simpan",
        cancelButtonText: "Batal",
      }).then(async (result: any) => {
        if (result.isConfirmed) {
          await createData();
        }
      });
    });
  }

  onMount(() => {
    initFormValidation();
  });
</script>

<div class="row">
  <div class="col-xl">
    <form id="createForm" method="POST" action="javascript:void(0)" enctype="multipart/form-data">
      <div class="card {cardAnimate}">
        <div class="card-header sticky-element bg-label-primary d-flex justify-content-sm-between align-items-sm-center flex-column flex-sm-row">
          <h5 class="card-title mb-sm-0">Tambah Data</h5>

          <div class="action-btns">
            <a href="/dashboard/product-category">
              <button type="button" class="btn btn-secondary me-2">
                <i class="icon-base ti tabler-arrow-back-up me-1"></i>
                Kembali
              </button>
            </a>

            <button type="submit" class="btn btn-primary">
              <i class="icon-base ti tabler-checkbox me-1"></i>
              Simpan
            </button>
          </div>
        </div>

        <div class="card-body">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="mb-3">
                <label class="form-label" for="name"> Nama </label>

                <input type="text" class="form-control" name="name" id="name" bind:value={createForm.name} placeholder="Masukkan Nama" autocomplete="off" />
              </div>
            </div>

            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="mb-3">
                <label class="form-label" for="description"> Deskripsi </label>

                <textarea
                  class="form-control"
                  name="description"
                  id="description"
                  bind:value={createForm.description}
                  placeholder="Masukkan Deskripsi"
                  autocomplete="off"
                  cols="30"
                  rows="5"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
