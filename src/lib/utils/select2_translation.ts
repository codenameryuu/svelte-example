interface Select2Amd {
  define: (name: string, deps: string[], factory: () => unknown) => unknown;
  require: unknown;
}

interface Select2Fn {
  (options?: Record<string, unknown>): JQuery;
  amd?: Select2Amd;
}

interface Select2InputArgs {
  input: { length: number };
  maximum: number;
  minimum: number;
}

const select2IdTranslation = {
  errorLoading: () => "Data tidak boleh diambil.",
  inputTooLong: (args: Select2InputArgs) => `Hapuskan ${args.input.length - args.maximum} huruf`,
  inputTooShort: (args: Select2InputArgs) => `Masukkan ${args.minimum - args.input.length} huruf lagi`,
  loadingMore: () => "Mengambil data…",
  maximumSelected: (args: Pick<Select2InputArgs, "maximum">) => `Anda hanya dapat memilih ${args.maximum} pilihan`,
  noResults: () => "Tidak ada data yang sesuai",
  searching: () => "Mencari…",
  removeAllItems: () => "Hapus semua item",
};

function registerSelect2Translation() {
  let jQuery = window.jQuery;

  let select2 = jQuery.fn.select2 as Select2Fn;
  let amd = select2.amd;

  if (!amd?.define) {
    return;
  }

  amd.define("select2/i18n/id", [], () => select2IdTranslation);
}

registerSelect2Translation();

export { registerSelect2Translation, select2IdTranslation };
