<script lang="ts">
  let { row = 5, columns = 3 }: { row?: number; columns?: number } = $props();
</script>

<tbody class="text-center">
  {#each Array(row) as _, rowIndex (rowIndex)}
    <tr>
      {#each Array(columns) as _, columnIndex (columnIndex)}
        <td>
          <div class="placeholder-glow">
            <div class="placeholder col-4 rounded-1" style="height: 20px;"></div>
          </div>
        </td>
      {/each}
    </tr>
  {/each}
</tbody>
