<template>
	<div class="header">
		<h1 class="text">Final</h1>
		<span class="icon"></span>
		<h1 class="text">Music</h1>
		<!-- <router-link class="mine" to="/user">
			<i class="icon-mine"></i>
		</router-link> -->
	</div>
</template>

<script setup name="m-header"></script>

<style lang="scss" scoped>
.header {
	height: 44px;
	text-align: center;
	font-size: 0;
	color: $color-theme;
	.icon {
		display: inline-block;
		margin: 6px 9px 0 9px;
		width: 30px;
		height: 32px;
		background-size: 30px 32px;
		vertical-align: top;

		@include bg-image("logo");
	}
	.text {
		display: inline-block;
		line-height: 44px;
		vertical-align: top;
		font-size: $font-size-large;
	}
	.mine {
		position: absolute;
		right: 0;
		top: 0;
		.icon-mine {
			display: block;
			padding: 12px;
			font-size: $font-size-large-x;
			color: $color-theme;
		}
	}
}
</style>
