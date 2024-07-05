<script lang="ts">
  import { buttonVariants, type ButtonProps } from "./index.js";

  let { class: className, children, variant, size, ...rest }: ButtonProps = $props();
</script>

<button class={buttonVariants({ variant, size, className })} {...rest}>
  {@render children()}
</button>
