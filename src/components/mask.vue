<template>
	<div class="mask">
		<div class="confirm-contaienr" v-show="confirm">
			<p class="content">
				请确认您的选票？
			</p>
			<div class="btn-box">
				<button class="layui-btn layui-btn-primary cancel">取消</button>
				<button class="layui-btn layui-btn-normal sure">确认</button>
			</div>
		</div>

		<div class="error-contaienr" v-show="!confirm">
			<p class="content">您有<span class="stress">{{num}}</span>项未选择，</p>
			<p class="content">请回到投票页面进行选择</p>
			<button class="layui-btn layui-btn-danger">知道了</button>
		</div>
	</div>
</template>

<script>
	export default {
		props : ['num','confirm']
	}
</script>

<style>
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
	}

	.mask {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mask .confirm-contaienr,
	.mask .error-contaienr {
		width: 6rem;
		height: 3.6rem;
		padding-top: 1rem;
		box-sizing: border-box;
		background-color: #fff;
		text-align: center;
		border-radius: .2rem;
		font-size: .34rem;
	}

	.mask .confirm-contaienr .btn-box {
		padding-top: .4rem;
	}

	.mask .confirm-contaienr .btn-box button {
		width: 1.8rem;
		border-radius: .2rem;
	}

	/* .contaienr.error-container{
	display: none;
} */
	.mask .error-contaienr .content {
		line-height: .54rem;
		font-size: .28rem;
	}

	.mask .error-contaienr .content .stress {
		color: #005bac;
	}

	.mask .error-contaienr button {
		margin-top: .2rem;
		background-color: #fff;
		color: #bf4c4c;
		width: 2rem;
		border: 1px solid #bf4c4c;
		border-radius: .2rem;
	}
</style>
