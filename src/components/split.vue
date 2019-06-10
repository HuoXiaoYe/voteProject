<template>
	<div class="split">
		<div class="department">
			<div class="line"></div>
			<div class="content">{{desc}}</div>
			<div class="line"></div>
		</div>
		<div class="department">
			<div class="line"></div>
			<div class="content">职位数：{{total}}</div>
			<div class="line"></div>
		</div>
	</div>
</template>

<script>
	export default {
		props : ['desc',"total"]
	}
</script>

<style scoped="scoped">
	.split {
		padding-top: .14rem;
		padding-bottom: .24rem;
		line-height: .44rem;
		background-color: #f4f4f4;
		font-size: .28rem;
	}

	.split .department {
		display: flex;
	}

	.split .department .line {
		position: relative;
		flex: 1;
		border-bottom: 1px dashed #ccc;
		top: -.21rem;
	}

	.split .department .content {
		padding: 0 .14rem;
	}
</style>
