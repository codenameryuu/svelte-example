<script lang="ts">
  import { onMount, tick } from "svelte";

  import ProductApi from "$lib/api/product_api";
  import ProductCategoryApi from "$lib/api/product_category_api";

  import InputSkeleton from "$lib/components/InputSkeleton.svelte";
  import TextareaSkeleton from "$lib/components/TextareaSkeleton.svelte";

  import HashHelper from "$lib/helpers/hash_helper";
  import FormatterHelper from "$lib/helpers/formatter_helper";

  import { cardAnimate } from "$lib/utils/animate";
  import { blockCard, unblockCard } from "$lib/utils/block_ui";
  import { loadElementDropify } from "$lib/utils/dropify";
  import { notifyDanger, notifySuccess } from "$lib/utils/izi_toast";
  import { loadElementDatetimeFlatpickr } from "$lib/utils/flatpickr";
  import { formatNumberElement } from "$lib/utils/formatter";
  import { loadRegex } from "$lib/utils/regex";
  import { loadElementSelect2 } from "$lib/utils/select2";
  import "$lib/utils/select2_translation";

  let isLoading = $state(true);
  let isReserForm = false;

  let productCategory = $state<any[]>([]);
  let fv: any = null;

  let createForm = $state({
    productCategoryId: "",
    name: "",
    description: "",
    price: "",
    publishedAt: "",
    photoFile: null as File | null,
  });

  async function fetchProductCategory() {
    let payload = {
      isPaginate: false,
      page: 1,
      perPage: 10,
      orderBy: "name",
      orderType: "asc",
    };

    let response = await ProductCategoryApi.getProductCategory(payload);

    if (response.status) {
      productCategory = response.data;
    }
  }

  async function createData() {
    let productCategoryId = HashHelper.decrypt(createForm.productCategoryId);
    let price = FormatterHelper.convertToInteger(createForm.price);

    let payload = {
      productCategoryId: productCategoryId,
      name: createForm.name,
      description: createForm.description,
      price: price,
      publishedAt: createForm.publishedAt,
      photoFile: createForm.photoFile,
    };

    blockCard();

    let response = await ProductApi.createProduct(payload);

    unblockCard();

    if (response.status) {
      notifySuccess(response.message);
      resetForm();
    } else {
      notifyDanger(response.message);
    }
  }

  function resetForm() {
    let jQuery = window.jQuery;
    isReserForm = true;

    createForm.productCategoryId = "";
    createForm.name = "";
    createForm.description = "";
    createForm.price = "";
    createForm.publishedAt = "";
    createForm.photoFile = null;

    let productCategoryIdElement = jQuery("#productCategoryId");
    productCategoryIdElement.val("").trigger("change.select2");

    let publishedAtElement = jQuery("#publishedAt");
    let flatpickrInstance = (
      publishedAtElement[0] as HTMLElement & {
        _flatpickr?: { clear: (triggerChangeEvent?: boolean) => void };
      }
    )?._flatpickr;

    if (flatpickrInstance) {
      flatpickrInstance.clear(false);
    }

    publishedAtElement.next().removeClass("is-invalid");

    let photoFileElement = jQuery("#photoFile");
    let dropifyInstance = photoFileElement.data("dropify") as { clearElement?: () => void } | undefined;
    if (dropifyInstance?.clearElement) {
      dropifyInstance.clearElement();
    }

    photoFileElement.parent().removeClass("border-danger border-2");

    if (fv) {
      fv.resetForm(false);
    }
  }

  function initSelect2() {
    let jQuery = window.jQuery;
    let productCategoryIdElement = jQuery("#productCategoryId");

    if (!productCategoryIdElement.length) {
      return;
    }

    loadElementSelect2(productCategoryIdElement);

    productCategoryIdElement.on("change", function () {
      createForm.productCategoryId = String(productCategoryIdElement.val() ?? "");
    });
  }

  function initFlatpickr() {
    let jQuery = window.jQuery;
    let publishedAtElement = jQuery("#publishedAt");

    loadElementDatetimeFlatpickr(publishedAtElement);

    publishedAtElement.on("change", function () {
      createForm.publishedAt = String(publishedAtElement.val() ?? "");
    });
  }

  function initDropify() {
    let jQuery = window.jQuery;
    let photoFileElement = jQuery("#photoFile");

    loadElementDropify(photoFileElement);

    photoFileElement.on("change", function () {
      let input = photoFileElement[0] as HTMLInputElement;
      createForm.photoFile = input.files?.[0] ?? null;
    });
  }

  function initFormValidation() {
    let createFormDocumentElement = document.getElementById("createForm");

    fv = FormValidation.formValidation(createFormDocumentElement, {
      fields: {
        productCategoryId: {
          validators: {
            notEmpty: {
              message: "Pilih kategori terlebih dahulu !",
            },
          },
        },

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

        price: {
          validators: {
            notEmpty: {
              message: "Harga tidak boleh kosong !",
            },
          },
        },

        publishedAt: {
          validators: {
            callback: {
              callback: function (_input: unknown) {
                if (isReserForm) {
                  return {
                    valid: true,
                  };
                }

                let jQuery = window.jQuery;
                let publishedAtElement = jQuery("#publishedAt");
                let nextElement = publishedAtElement.next();

                if (nextElement.hasClass("is-invalid")) {
                  nextElement.removeClass("is-invalid");
                }

                if (publishedAtElement.val() == "") {
                  nextElement.addClass("is-invalid");

                  return {
                    valid: false,
                    message: "Diterbitkan pada tidak boleh kosong !",
                  };
                }

                return {
                  valid: true,
                };
              },
            },
          },
        },

        photoFile: {
          validators: {
            callback: {
              callback: function (_input: unknown) {
                if (isReserForm) {
                  return {
                    valid: true,
                  };
                }

                let jQuery = window.jQuery;
                let photoFileElement = jQuery("#photoFile");

                photoFileElement.parent().removeClass("border-danger border-2");

                if (photoFileElement.val() == "") {
                  photoFileElement.parent().addClass("border-danger border-2");

                  return {
                    valid: false,
                    message: "Foto tidak boleh kosong !",
                  };
                }

                return {
                  valid: true,
                };
              },
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

    let jQuery = window.jQuery;
    let productCategoryIdElement = jQuery("#productCategoryId");
    productCategoryIdElement.on("change.select2", function () {
      if (isReserForm) {
        return;
      }

      void fv.revalidateField("productCategoryId");
    });
  }

  onMount(async () => {
    isLoading = true;

    await fetchProductCategory();

    isLoading = false;

    await tick();
    loadRegex();
    initSelect2();
    initFlatpickr();
    initDropify();
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
            <a href="/dashboard/product">
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
                <label class="form-label" for="productCategoryId"> Kategori </label>

                {#if isLoading}
                  <InputSkeleton />
                {:else}
                  <select class="form-select" name="productCategoryId" id="productCategoryId" bind:value={createForm.productCategoryId}>
                    <option value=""> Pilih salah satu </option>

                    {#each productCategory as row}
                      <option value={HashHelper.encrypt(row.id)}>
                        {row.name}
                      </option>
                    {/each}
                  </select>
                {/if}
              </div>
            </div>

            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="mb-3">
                <label class="form-label" for="name"> Nama </label>

                {#if isLoading}
                  <InputSkeleton />
                {:else}
                  <input type="text" class="form-control" name="name" id="name" bind:value={createForm.name} placeholder="Masukkan Nama" autocomplete="off" />
                {/if}
              </div>
            </div>

            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="mb-3">
                <label class="form-label" for="description"> Deskripsi </label>

                {#if isLoading}
                  <TextareaSkeleton />
                {:else}
                  <textarea
                    class="form-control"
                    name="description"
                    id="description"
                    bind:value={createForm.description}
                    placeholder="Masukkan Deskripsi"
                    autocomplete="off"
                    cols="30"
                    rows="5"></textarea>
                {/if}
              </div>
            </div>

            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="mb-3">
                <label class="form-label" for="price"> Harga </label>

                {#if isLoading}
                  <InputSkeleton />
                {:else}
                  <div class="input-group">
                    <span class="input-group-text"> Rp </span>
                    <input
                      type="text"
                      class="form-control regex-number"
                      name="price"
                      id="price"
                      bind:value={createForm.price}
                      onkeyup={(e) => {
                        formatNumberElement(e.currentTarget);
                        createForm.price = (e.currentTarget as HTMLInputElement).value;
                      }}
                      onpaste={(e) => {
                        setTimeout(() => {
                          formatNumberElement(e.currentTarget);
                          createForm.price = (e.currentTarget as HTMLInputElement).value;
                        }, 0);
                      }}
                      placeholder="Masukkan Harga"
                      autocomplete="off" />
                  </div>
                {/if}
              </div>
            </div>

            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="mb-3">
                <label class="form-label" for="publishedAt"> Diterbitkan Pada </label>

                {#if isLoading}
                  <InputSkeleton />
                {:else}
                  <input
                    type="text"
                    class="form-control"
                    name="publishedAt"
                    id="publishedAt"
                    bind:value={createForm.publishedAt}
                    placeholder="Masukkan Diterbitkan Pada"
                    autocomplete="off" />
                {/if}
              </div>
            </div>

            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="mb-3">
                <label class="form-label" for="photoFile"> Foto </label>

                {#if isLoading}
                  <TextareaSkeleton />
                {:else}
                  <input type="file" name="photoFile" id="photoFile" data-allowed-file-extensions="jpg jpeg png" data-max-file-size="5M" />
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
