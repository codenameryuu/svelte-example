<script lang="ts">
  import { onMount } from "svelte";
  import Swal from "sweetalert2";

  import { getProductCategory, deleteProductCategory } from "$lib/api/product_category_api";

  import TableSkeleton from "$lib/components/TableSkeleton.svelte";
  import PaginationTable from "$lib/components/PaginationTable.svelte";

  import CheckHelper from "$lib/helpers/check_helper";

  import { cardAnimate } from "$lib/utils/animate";
  import { blockCard, unblockCard } from "$lib/utils/block_ui";
  import { notifyDanger, notifySuccess } from "$lib/utils/izi_toast";
  import HashHelper from "$lib/helpers/hash_helper";

  let isLoading = $state(true);

  let data = $state<any[]>([]);
  let pagination = $state<any>({});

  let page = $state(1);
  let perPage = $state(10);
  let orderBy = $state("name");
  let orderType = $state("asc");
  let lastPage = $derived(Number(pagination.last_page) || 1);
  let total = $derived(Number(pagination.total) || 0);

  let filter = $state({
    name: "",
  });

  async function fetchData(targetPage = page) {
    isLoading = true;
    page = targetPage;

    let filterPayload: Record<string, string> = {};

    if (CheckHelper.isset(filter.name)) {
      filterPayload.name = filter.name;
    }

    let payload = {
      isPaginate: true,
      page: page,
      perPage: perPage,
      orderBy: orderBy,
      orderType: orderType,
      ...(Object.keys(filterPayload).length > 0 && {
        filter: filterPayload,
      }),
    };

    let response = await getProductCategory(payload);

    if (response.status) {
      data = response.data;
      pagination = response.pagination;
    }

    isLoading = false;
  }

  async function handlePerPageChange() {
    await fetchData(1);
  }

  async function handleFilter(e: SubmitEvent) {
    e.preventDefault();

    let filterModal = document.getElementById("filterModal");

    if (filterModal) {
      let modal = bootstrap.Modal.getInstance(filterModal) || new bootstrap.Modal(filterModal);
      modal.hide();
    }

    await fetchData(1);
  }

  async function handleDelete(hashId: string) {
    Swal.fire({
      icon: "question",
      text: "Apakah Anda yakin ingin menghapus data ini ?",
      showCancelButton: true,
      buttonsStyling: false,
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-secondary",
      },
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        blockCard();

        let id = HashHelper.decrypt(hashId);

        let payload = {
          productCategoryId: id,
        };

        let response = await deleteProductCategory(payload);

        if (response.status) {
          notifySuccess(response.message);
        } else {
          notifyDanger(response.message);
        }

        unblockCard();

        await fetchData(1);
      }
    });
  }

  onMount(async () => {
    await fetchData(1);
  });
</script>

<div class="row">
  <div class="col-xl">
    <div class="card {cardAnimate}">
      <div class="card-header bg-label-primary d-flex justify-content-sm-between align-items-sm-center flex-column flex-sm-row">
        <h5 class="card-title mb-sm-0">Tabel Kategori Produk</h5>

        <div>
          <button type="button" class="btn btn-info me-2" data-bs-toggle="modal" data-bs-target="#filterModal">
            <i class="icon-base ti tabler-filter me-1"></i>
            Filter
          </button>

          <a href="/dashboard/product-category/create">
            <button type="button" class="btn btn-primary">
              <i class="icon-base ti tabler-plus me-1"></i>
              Tambah
            </button>
          </a>
        </div>
      </div>

      <div class="card-body">
        <div class="d-flex align-items-center gap-2 my-4">
          <label class="form-label mb-0" for="perPage">Tampilkan</label>

          <select class="form-select w-auto" id="perPage" bind:value={perPage} onchange={handlePerPageChange}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>

          <span class="text-muted">entri</span>
        </div>

        <div class="table-responsive">
          <table class="table table-bordered mt-5">
            <thead class="text-center">
              <tr>
                <th> No </th>

                <th> Nama </th>

                <th> Aksi </th>
              </tr>
            </thead>

            {#if isLoading}
              <TableSkeleton row={perPage} columns={3} />
            {:else}
              <tbody class="text-center">
                {#if data.length > 0}
                  {#each data as row, index}
                    <tr>
                      <td class="text-center">
                        {index + 1}
                      </td>

                      <td>
                        {row.name}
                      </td>

                      <td>
                        <div class="dropdown">
                          <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-label="Menu aksi">
                            <i class="icon-base ti tabler-dots-vertical"></i>
                          </button>

                          <div class="dropdown-menu">
                            <a class="dropdown-item text-success" href="/dashboard/product-category/edit/{HashHelper.encrypt(row.id)}">
                              <i class="icon-base ti tabler-edit me-1"></i>
                              Ubah
                            </a>

                            <!-- svelte-ignore a11y_invalid_attribute -->
                            <a class="dropdown-item text-danger" href="javascript:void(0);" onclick={() => handleDelete(HashHelper.encrypt(row.id))}>
                              <i class="icon-base ti tabler-trash me-1"></i>
                              Hapus
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  {/each}
                {:else}
                  <tr>
                    <td colspan="3" class="text-center">Tidak ada data yang tersedia pada tabel ini</td>
                  </tr>
                {/if}
              </tbody>
            {/if}
          </table>
        </div>
      </div>

      <div class="card-footer">
        <PaginationTable {isLoading} {page} {perPage} {lastPage} {total} {fetchData} />
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="filterModal" tabindex="-1">
  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Filter</h5>

        <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <form id="filterForm" method="GET" enctype="multipart/form-data" onsubmit={handleFilter}>
        <div class="modal-body">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="mb-3">
                <label class="form-label" for="filterName"> Nama </label>

                <input
                  type="text"
                  class="form-control"
                  name="filter[name]"
                  id="filterName"
                  bind:value={filter.name}
                  placeholder="Masukkan Nama"
                  autocomplete="off" />
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            <i class="icon-base ti tabler-x me-1"></i>
            Batal
          </button>

          <button type="submit" class="btn btn-primary">
            <i class="icon-base ti tabler-checkbox me-1"></i>
            Terapkan
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
