<script lang="ts">
  import { onMount } from "svelte";

  import { getProduct } from "$lib/api/product_api";
  import { getProductCategory } from "$lib/api/product_category_api";

  import { cardAnimate } from "$lib/utils/animate";

  let isLoading = $state(true);
  let productCount = $state(0);
  let productCategoryCount = $state(0);

  onMount(async () => {
    let productResponse = await getProduct(1, 10, "name", "asc");
    let productCategoryResponse = await getProductCategory(1, 10, "name", "asc");

    if (productResponse.status) {
      productCount = productResponse.pagination.total;
    }

    if (productCategoryResponse.status) {
      productCategoryCount = productCategoryResponse.pagination.total;
    }

    isLoading = false;
  });
</script>

<div class="row">
  <!-- * Product Category -->
  <div class="col-lg-6 col-md-6 col-sm-12">
    <div class="card {cardAnimate}">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div class="badge rounded-pill bg-label-info me-3 p-2">
            <i class="icon-base ti tabler-archive"></i>
          </div>

          <div class="card-info">
            <h5 class="mb-0">
              {#if isLoading}
                <span class="placeholder-glow">
                  <span class="placeholder col-12" aria-hidden="true"></span>
                </span>
              {:else}
                {productCategoryCount}
              {/if}
            </h5>

            <small> Kategori Produk </small>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- * Product -->
  <div class="col-lg-6 col-md-6 col-sm-12">
    <div class="card {cardAnimate}">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div class="badge rounded-pill bg-label-success me-3 p-2">
            <i class="icon-base ti tabler-file-text"></i>
          </div>

          <div class="card-info">
            <h5 class="mb-0">
              {#if isLoading}
                <span class="placeholder-glow">
                  <span class="placeholder col-12" aria-hidden="true"></span>
                </span>
              {:else}
                {productCount}
              {/if}
            </h5>

            <small> Produk </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
