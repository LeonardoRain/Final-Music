<template>
	<div ref="rootRef">
		<slot></slot>
	</div>
</template>

<script setup name="scroll">
import { ref, defineProps } from "vue";
import useScroll from "./useScroll";

const props = defineProps({
	click: {
		type: Boolean,
		default: true,
	},
});
const rootRef = ref(null);
useScroll(rootRef, props);
</script>
