<script lang="ts">
  import Button from "chocobytes/components/button/Button.svelte";
</script>

<article class="p-10">
  <Button variant="primary">click me</Button>
  <Button href="/" element={{ onclick: (e) => e.preventDefault() }}>click me</Button>
</article>
