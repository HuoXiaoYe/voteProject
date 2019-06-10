<template>
	<div class="footer">
		<div class="bar"></div>
		<div class="info">
			<div class="title">
				<span class="iconfont">&#xe62d;</span>
				<div class="content">说明</div>
			</div>
			<ul class="info-list">
				<li class="item">1. 若选中“另选他人”，则必须填写姓名并且所有候选人需要分别进行选择，但是不能选同意</li>
				<li class="item">2. 若选中“民主推荐”，则必须填写姓名</li>
				<li class="item">3. 选票一旦提交，结果将不可更改</li>
			</ul>
		</div>
		<div class="bar"></div>
	</div>

</template>

<script>
</script>

<style scoped="scoped">
	.footer {
		color: red;
	}

	.footer .bar {
		
		height: .2rem;
		background-color: #f4f4f4;
	}

	.footer .info {
		padding: .28rem;
		line-height: .34rem;
	}

	.footer .info .title {
		display: flex;
		padding-bottom: .1rem;
		font-size: .32rem;
		line-height: .46rem;
	}

	.footer .info .title .content {
		padding-left: .1rem;
	}

	.footer .info .info-list {
		/* padding-left: .28rem; */
	}

	.footer .info .info-list .item {
		font-size: .3rem;
		line-height: .44rem;
	}

	
</style>
