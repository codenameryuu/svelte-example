<script lang="ts">
  import { cardAnimate } from "$lib/helpers/animate_helper";
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
            <h5 class="mb-0">10</h5>

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
            <h5 class="mb-0">10</h5>

            <small> Produk </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
