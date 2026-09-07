<script lang="ts">
  let { row = 5, columns = 3 }: { row?: number; columns?: number } = $props();
</script>

<tbody class="placeholder-glow text-center">
  {#each Array(row) as _, rowIndex (rowIndex)}
    <tr>
      {#each Array(columns) as _, columnIndex (columnIndex)}
        <td><span class="placeholder col-4"></span></td>
      {/each}
    </tr>
  {/each}
</tbody>
