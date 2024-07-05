<script lang="ts">
  let { value = 0 }: { value: number } = $props();

  function increment() {
    value++;
  }
</script>

I'm a counter with value {value}

<button onclick={increment}>increment</button>
