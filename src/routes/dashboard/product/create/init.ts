import { loadElementDropify } from "$lib/utils/dropify";
import { loadElementDatetimeFlatpickr } from "$lib/utils/flatpickr";
import { loadElementSelect2 } from "$lib/utils/select2";
import "$lib/utils/select2_translation";

function initSelect2(onChange: (value: string) => void) {
  let jQuery = window.jQuery;
  let productCategoryIdElement = jQuery("#productCategoryId");

  if (!productCategoryIdElement.length) {
    return;
  }

  loadElementSelect2(productCategoryIdElement);

  productCategoryIdElement.on("change", function () {
    onChange(String(productCategoryIdElement.val() ?? ""));
  });
}

function initFlatpickr(onChange: (value: string) => void) {
  let jQuery = window.jQuery;
  let publishedAtElement = jQuery("#publishedAt");

  loadElementDatetimeFlatpickr(publishedAtElement);

  publishedAtElement.on("change", function () {
    onChange(String(publishedAtElement.val() ?? ""));
  });
}

function initDropify(onChange: (file: File | null) => void) {
  let jQuery = window.jQuery;
  let photoFileElement = jQuery("#photoFile");

  loadElementDropify(photoFileElement);

  photoFileElement.on("change", function () {
    let input = photoFileElement[0] as HTMLInputElement;
    onChange(input.files?.[0] ?? null);
  });
}

function initFormValidation(options: {
  isResetting: () => boolean;
  onValid: () => void | Promise<void>;
}) {
  let createFormDocumentElement = document.getElementById("createForm");

  let fv = FormValidation.formValidation(createFormDocumentElement, {
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
              if (options.isResetting()) {
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
              if (options.isResetting()) {
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
        await options.onValid();
      }
    });
  });

  let jQuery = window.jQuery;
  let productCategoryIdElement = jQuery("#productCategoryId");

  productCategoryIdElement.on("change.select2", function () {
    if (options.isResetting()) {
      return;
    }

    void fv.revalidateField("productCategoryId");
  });

  return fv;
}

export { initSelect2, initFlatpickr, initDropify, initFormValidation };
