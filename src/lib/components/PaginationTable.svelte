<script lang="ts">
  function goToPage(targetPage: number) {
    if (targetPage < 1 || targetPage > lastPage || targetPage === page) {
      return;
    }

    void fetchData(targetPage);
  }

  let pageNumbers = $derived.by(() => {
    const pages: number[] = [];

    for (let i = 1; i <= lastPage; i++) {
      pages.push(i);
    }

    return pages;
  });

  let {
    isLoading,
    page,
    perPage,
    lastPage,
    total,
    fetchData,
  }: {
    isLoading: boolean;
    page: number;
    perPage: number;
    lastPage: number;
    total: number;
    fetchData: (page: number) => void;
  } = $props();
</script>

<div class="d-flex justify-content-between">
  <div>
    <span class="text-muted">
      {#if !isLoading}
        {#if total < perPage}
          Menampilkan {total} dari {total} data
        {:else}
          Menampilkan {perPage} dari {total} data
        {/if}
      {/if}
    </span>
  </div>

  <div>
    {#if !isLoading}
      <ul class="pagination pagination-rounded mb-0">
        <li class="page-item first" class:disabled={page <= 1}>
          <!-- svelte-ignore a11y_invalid_attribute -->
          <a class="page-link waves-effect" href="javascript:void(0);" aria-label="First page" onclick={() => goToPage(1)}>
            <i class="icon-base ti tabler-chevrons-left icon-sm"></i>
          </a>
        </li>

        <li class="page-item prev" class:disabled={page <= 1}>
          <!-- svelte-ignore a11y_invalid_attribute -->
          <a class="page-link waves-effect" href="javascript:void(0);" aria-label="Previous page" onclick={() => goToPage(page - 1)}>
            <i class="icon-base ti tabler-chevron-left icon-sm"></i>
          </a>
        </li>

        {#each pageNumbers as pageNumber}
          <li class="page-item" class:active={pageNumber === page}>
            <!-- svelte-ignore a11y_invalid_attribute -->
            <a class="page-link waves-effect" class:waves-light={pageNumber === page} href="javascript:void(0);" onclick={() => goToPage(pageNumber)}>
              {pageNumber}
            </a>
          </li>
        {/each}

        <li class="page-item next" class:disabled={page >= lastPage}>
          <!-- svelte-ignore a11y_invalid_attribute -->
          <a class="page-link waves-effect" href="javascript:void(0);" aria-label="Next page" onclick={() => goToPage(page + 1)}>
            <i class="icon-base ti tabler-chevron-right icon-sm"></i>
          </a>
        </li>

        <li class="page-item last" class:disabled={page >= lastPage}>
          <!-- svelte-ignore a11y_invalid_attribute -->
          <a class="page-link waves-effect" href="javascript:void(0);" aria-label="Last page" onclick={() => goToPage(lastPage)}>
            <i class="icon-base ti tabler-chevrons-right icon-sm"></i>
          </a>
        </li>
      </ul>
    {/if}
  </div>
</div>
