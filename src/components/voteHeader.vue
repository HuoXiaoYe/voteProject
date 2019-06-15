<template>
	<div class="header">
		<div class="desc">
			<img src="../assets/logo.png" alt="">
			<div class="school">
				<p class="big">家里蹲大学</p>
				<p class="small">部门负责人选聘系统</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['success',
			"totalposition",
			"totalelector",
			"totalparticipant"
		]
	}
</script>

<style scoped="scoped">
	.header {
		width: 100%;
	}

	.header .desc {
		display: flex;
		justify-content: center;
		background-color: #005bac;
		color: #fff;
	}

	.header .desc img {
		margin: .4rem 0;
		width: 1.3rem;
		height: 1.3rem;
	}

	.header .desc .school {
		padding-left: .4rem;
	}

	.header .desc .school .big {
		padding-top: .64rem;
		line-height: .58rem;
		font-size: .4rem;
		font-weight: 100;
	}

	.header .desc .school .small {

		padding-top: .15rem;
		line-height: .3rem;
		font-size: .28rem;
		font-weight: 100;
	}
</style>
