<template>
	<div class="card" ref="Democraticvote">
		<p class="job">竞选职位
			{{index+1}}：<span class="small">
				{{data.name}}</span></p>
		<div class="item">
			<input :ref="refsArr[0]" type="radio" :id="refsArr[0]" :checked="checkedArr[0]" />
			<label :for="refsArr[0]" @click="changeAgreeDif(refsArr[0])">民主推荐</label>
			<input type="text" maxlength="5" class="voteother" :disabled="isEditable" :name="'val1-'+data.position_id">
		</div>
		<div class="item">
			<input :ref="refsArr[1]" :name="'noRemark-'+data.position_id" type="radio" :id="refsArr[1]" v-model="checkedArr[1]" />
			<label :for="refsArr[1]" @click="changeAgree(refsArr[1])">本岗位不发表任何建议</label>
		</div>
		<p class="desc">候选人按姓氏字母顺序排列</p>
		{{data.position_id}}
	</div>
</template>

<script>
	export default {
		data() {
			return {
				checkedArr: [false, false],
				refsArr: [],
				isEditable: true
			}
		},
		props: ["data", "index"],
		methods: {
			
			checkAllRadioSelected() {
				let liArr = this.$refs["Democraticvote"].getElementsByClassName('item')
				// console.log(liArr[1])
			
				if (liArr[1].getElementsByTagName('input')[0].checked) {
					return;
				}
				if (liArr[0].getElementsByTagName('input')[0].checked) {
					this.$msgbox.alert('您所选择的其他人(或民主推荐)不可为空')
					this.$emit("returnsunmit")
					return;
				}
				this.$emit("add", 1);
			},
			changeAgree(refstr, bool) {
				this.isEditable = true
				this.refsArr.forEach((item, i) => {
					this.$refs[item].checked = false;
				})
				this.$refs[refstr].checked = true;
			},
			changeAgreeDif(refstr) {
				console.log(this.refsArr)
				
				this.refsArr.forEach((item, i) => {
					console.log(item)
					this.$refs[item].checked = false;
				})
				this.$refs[refstr].checked = true;

				this.isEditable = false
			},
			initRefsArr() {
				this.refsArr[0] = "commend-other" + this.data.position_id;
				this.refsArr[1] = "no-suggestion" + this.data.position_id;
			}
		},
		created(){
			this.initRefsArr()
		}
	}
</script>

<style scoped="scoped">
	.card {
		font-size: .28rem;
		padding: .2rem .2rem 0 .2rem;
	}

	.card .job {
		padding-bottom: .1rem;
		font-size: .34rem;
	}

	.card .job .small {
		font-size: .28rem;
	}

	.card .item {
		padding: .2rem;
		height: .6rem;
		line-height: .6rem;
		border-bottom: 1px solid #ececec;
		font-size: .28rem;
	}

	.card .voteother {
		border-bottom: 1px solid #999;
		width: 1.8rem;
		margin-left: .1rem;
		text-align: center;
	}

	.card .voteother.input {
		font-family: "microsoft yahei";
	}

	.card input[type="radio"] {
		display: none;
	}

	.card input[type="radio"]+label {
		padding-left: .44rem;
	}

	.card input[type="radio"]+label::before {
		content: "\a0";
		display: inline-block;
		vertical-align: middle;
		font-size: .28rem;
		width: .4rem;
		height: .4rem;
		margin-right: .1rem;
		border-radius: 50%;
		border: 1px solid #005bac;
		line-height: 1.2rem;
		box-sizing: border-box;
	}

	.card input[type="radio"]:checked+label::before {
		display: inline-block;
		background-color: #005bac;
		background-clip: content-box;
		vertical-align: middle;
	}

	.card input[type="radio"]:checked+label::after {
		display: inline-block;
		background-color: #fff;
		width: .2rem;
		height: .2rem;
		background-clip: content-box;
		vertical-align: middle;
	}

	.card .item {
		padding-top: .1rem;
		padding-left: .1rem;
	}

	.card .desc {
		height: .64rem;
		line-height: .64rem;
		font-size: .26rem;
		text-align: center;
		color: #aeaeae;
	}

	input:disabled {
		background-color: #fff;
	}
</style>
