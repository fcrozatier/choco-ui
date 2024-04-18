<script lang="ts">
	import { manageFocus } from "$lib/actions/focus/manageFocus.svelte";

	const focusGroupRadio = manageFocus();
	const focusGroupRadio2 = manageFocus({ onFocus: (_, to) => to.click() });
	const focusGroupCheck = manageFocus();
</script>

<article class="mx-auto max-w-prose">
	<h1>Focus management</h1>
	<p>Here are two example were the default focus is slightly broken.</p>
	<h2>Radio Group</h2>
	<p>
		A radio group has by default a roving focus, where the tab sequence from A to B only focuses one
		item in the radio group, and you can select others with your keyboard arrows. But when you Tab
		from A to B <em>without</em> selecting an item and then back to A, you can observe an
		inconsistency in the focus. It's even more glaring if you discover the ui with your ears through
		a VoiceOver. You were on the first item but land back on the third one! This inconsistency can
		be confusing and makes the focus less
		<a
			href="https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#discernibleandpredictablekeyboardfocus"
		>
			predictable</a
		>. It is also not in line the WAI ARIA recommendation for
		<a
			href="https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents"
			>keyboard navigation inside components</a
		>. Let' fix this!
	</p>

	<h3>Default</h3>
	<button>A</button>

	<fieldset>
		<label><input name="alignment" type="radio" />left</label>
		<label><input name="alignment" type="radio" />center</label>
		<label><input name="alignment" type="radio" />right</label>
	</fieldset>

	<button>B</button>

	<h3>Fixed</h3>
	<button>A</button>

	<fieldset>
		<label><input use:focusGroupRadio name="alignment-fixed" type="radio" />left</label>
		<label><input use:focusGroupRadio name="alignment-fixed" type="radio" />center</label>
		<label><input use:focusGroupRadio name="alignment-fixed" type="radio" />right</label>
	</fieldset>

	<button>B</button>

	<p>
		Notice that in the fixed version the element is not automatically selected when focused. This
		behavior is called <a
			href="https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#decidingwhentomakeselectionautomaticallyfollowfocus"
			>Selection Automatically Follow Focus</a
		>. This is not always desirable, as in the checkbox example below. But we can easily add it back
		with the onFocus callback.
	</p>

	<button>A</button>

	<fieldset>
		<label><input use:focusGroupRadio2 name="alignment-fixed-2" type="radio" />left</label>
		<label><input use:focusGroupRadio2 name="alignment-fixed-2" type="radio" />center</label>
		<label><input use:focusGroupRadio2 name="alignment-fixed-2" type="radio" />right</label>
	</fieldset>

	<button>B</button>

	<h2>Checkbox group</h2>
	<p>
		As stated in the WAI ARIA <a
			href="https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#fundamentalkeyboardnavigationconventions"
			>Fundamental Keyboard Navigation Conventions</a
		>
		<q
			cite="https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#fundamentalkeyboardnavigationconventions"
			>A primary keyboard navigation convention common across all platforms is that the tab and
			shift+tab keys move focus from one UI component to another while other keys, primarily the
			arrow keys, move focus inside of components that include multiple focusable elements. The path
			that the focus follows when pressing the tab key is known as the tab sequence or tab ring.
		</q>
	</p>
	<p>
		But if we want to create a toggle group component, the default behavior is that the tab sequence
		with go through every element of the group. This can be painful for someone navigating a UI with
		a keyboard only to have to tab through all the elements just to go from A to B or from B back to
		A.
	</p>
	<p>Let's fix that!</p>

	<h3>Default</h3>
	<button>A</button>

	<fieldset>
		<label><input name="flavour" type="checkbox" />dark</label>
		<label><input name="flavour" type="checkbox" />milk</label>
		<label><input name="flavour" type="checkbox" />fruit</label>
	</fieldset>

	<button>B</button>

	<h3>Fixed</h3>
	<button>A</button>

	<fieldset>
		<label><input use:focusGroupCheck name="flavour-fixed" type="checkbox" />dark</label>
		<label><input use:focusGroupCheck name="flavour-fixed" type="checkbox" />milk</label>
		<label><input use:focusGroupCheck name="flavour-fixed" type="checkbox" />fruit</label>
	</fieldset>
	<button>B</button>

	<p>The focus management comes with many options: roving, loop, orientation, onFocus</p>
</article>
