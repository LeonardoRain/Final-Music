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
	probeType: {
		type: Number,
		default: 0,
	},
});
const emit = defineEmits(["scroll"]);

const rootRef = ref(null);
const scroll = useScroll(rootRef, props, emit);

defineExpose({ scroll });
</script>
