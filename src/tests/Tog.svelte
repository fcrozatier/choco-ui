<script lang="ts">
	let value = $state(false);
</script>

<button onclick={() => (value = !value)}>{value}</button>
