export type CreateForm = {
  productCategoryId: string;
  name: string;
  description: string;
  price: string;
  publishedAt: string;
  photoFile: File | null;
};

function getEmptyCreateForm(): CreateForm {
  return {
    productCategoryId: "",
    name: "",
    description: "",
    price: "",
    publishedAt: "",
    photoFile: null,
  };
}

function resetFormPlugins(fv: any) {
  let jQuery = window.jQuery;

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

export { getEmptyCreateForm, resetFormPlugins };
