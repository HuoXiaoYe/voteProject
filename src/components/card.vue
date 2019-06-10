<template>
	<div class="card">
		<p class="job">竞选职位{{index+1}}：<span class="small">{{data.name}}</span></p>
		<p class="content">候选人:</p>
		<ul class="list" ref="listWrapper">
			<li class="item" v-for="(item,index) of data.candidateFrontFormList" :key="index">
				<p class="name">{{item.name}}</p>
				<ul class="radio-wrapper">
					<li class="radio-item">
						<input type="radio" :ref="refsArr[index]" @click="changeAgree(agreeArr[index],index)" :id="refsArr[index]+'-1'"
						 :name="'result-'+data.position_id+ '-' + item.candidate_id" :checked="agreeArr[index]" value="1"/>
						<label :for="refsArr[index] + '-1'">同意</label>
					</li>
					<li class="radio-item">
						<input type="radio" :id="refsArr[index]+'-2'" @click="unCkecked" :name="'result-'+data.position_id+ '-' + item.candidate_id" value="2"/>
						<label :for="refsArr[index]+'-2'" >不同意</label>
					</li>
					<li class="radio-item">
						<input type="radio" :id="refsArr[index]+'-3'" @click="unCkecked" :name="'result-'+data.position_id+ '-' + item.candidate_id" value="3"/>
						<label :for="refsArr[index]+'-3'">弃权</label>
					</li>
					<li class="radio-item">
						<input type="radio" :id="refsArr[index]+'-4'" @click="unCkecked" :name="'result-'+data.position_id+ '-' + item.candidate_id" value="4" />
						<label :for="refsArr[index]+'-4'">不了解</label>
					</li>
				</ul>
			</li>



			<li class="item dif-item">
				<p class="name choice-others">另选他人</p>
				<div class="ratio-other">
					<input type="radio" :checked="agreeArr[agreeArr.length-2]" :ref="refsArr[refsArr.length-2]" :id="refsArr[refsArr.length-2] +data.position_id+'-33'"
					  />
					<label :for="refsArr[refsArr.length-2] +data.position_id+'-33'" @click="changeAgreeDif2(agreeArr[agreeArr.length-2],agreeArr.length-2)">其他人</label>
					<input :name="'val1-'+data.position_id" type="text" class="voteother" maxlength="5" :disabled="isEditable">
				</div>
			</li>

			<li class="item dif-item">
				<p class="name choice-others">不发表意见</p>
				<div class="ratio-other">


					<input type="radio" @click="changeAgree(agreeArr[agreeArr.length-1],agreeArr.length-1)" :checked="agreeArr[agreeArr.length-1]"
					 :ref="refsArr[refsArr.length-1]" :id="refsArr[refsArr.length-1] +data.position_id+'-33'" :name="'noRemark-'+data.position_id" />
					<label :for="refsArr[refsArr.length-1] +data.position_id+'-33'" @click="changeAgreeDif(agreeArr[agreeArr.length-1],agreeArr.length-1)">本岗位不发表任何建议</label>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	
	export default {
		name: 'card',
		data() {
			return {
				radio1: 1,
				radio2: 2,
				abc: false,
				refsArr: [],
				agreeArr: [],
				isEditable: true
			}
		},
		props: ['data', "index",""],
		methods: {
			changeAgree(isckecked, index) {
				this.isEditable = true;
				this.refsArr.forEach((item, i) => {
					try {

						this.$refs[item][0].checked = false;
					} catch (e) {
						this.$refs[item].checked = false;
					}
				})

				try {
					this.$refs[this.refsArr[index]][0].checked = true;
				} catch (e) {
					this.$refs[this.refsArr[index]].checked = true;
				}
			},
			changeAgreeDif2(isckecked, index){
				this.refsArr.forEach((item, i) => {
					try {
						this.$refs[item][0].checked = false;
					} catch (e) {
						this.$refs[item].checked = false;
					}
				})
				
				try {
					this.$refs[this.refsArr[index]][0].checked = true;
				} catch (e) {
					this.$refs[this.refsArr[index]].checked = true;
				}
				this.isEditable = false
			},
			changeAgreeDif(isckecked, index) {
				this.refsArr.forEach((item, i) => {
					try {
						this.$refs[item][0].checked = false;
					} catch (e) {
						this.$refs[item].checked = false;
					}
				})

				try {
					this.$refs[this.refsArr[index]][0].checked = true;
				} catch (e) {
					this.$refs[this.refsArr[index]].checked = true;
				}
				this.isEditable = false
				if (this.$refs[this.refsArr[index]].checked) {
					var ulObj = this.$refs['listWrapper']
					var itemArr = ulObj.getElementsByClassName('item')
					// console.log(itemArr[0].getElementsByClassName("radio-item")[0].checked)
					var loopNum = itemArr.length - 2

					for (var i = 0; i < loopNum; i++) {
						var checkedArr = itemArr[i].getElementsByClassName("radio-item");
						// console.log(checkedArr.length)
						for (var j = 1; j < checkedArr.length; j++) {
							checkedArr[j].getElementsByTagName('input')[0].checked = false;
							
						}
					}
				}
			},
			initArr() {
				this.data.candidateFrontFormList.forEach((item, i) => {
					this.agreeArr[i] = false;
					this.refsArr[i] = 'candidate-' + this.data.position_id + '-' + item.candidate_id
				})

				this.agreeArr[this.agreeArr.length] = false;
				this.refsArr[this.refsArr.length] = "vote-other-people"

				this.agreeArr[this.agreeArr.length] = false;
				this.refsArr[this.refsArr.length] = "no-suggestion"

			},
			checkAllRadioSelected() {
				let liArr = this.$refs['listWrapper'].getElementsByClassName('item')
				var agreeFlag = false;
				var noCheckArr = []
				
				
				/* var flag = false; */
				if (liArr[liArr.length - 1].getElementsByTagName('input')[0].checked) {
					return;
				}
				if (liArr[liArr.length - 2].getElementsByTagName('input')[0].checked) {
					if (!liArr[liArr.length - 2].getElementsByTagName('input')[1].value) {
						/* 值为空 */
						this.$msgbox.alert('您所选择的其他人(或民主推荐)不可为空')
						this.$emit("returnsunmit")
						return;
					}else{
						/* 有值且被选中了 */
						/* flag = true */
					}
				
				}
				
				
				for (var i = 0; i < liArr.length - 2; i++) {
					var inpArr = liArr[i].getElementsByTagName('input')
					var checkedFlag = false;
					for (var j = 0; j < inpArr.length; j++) {
						if (inpArr[j].checked) {
							checkedFlag = true;
						}
					};

					if (!checkedFlag) {
						this.$emit("add", 1);
					}
				};

			},
			unCkecked(){
				this.$refs["listWrapper"].getElementsByClassName("dif-item")[1].getElementsByTagName('input')[0].checked = false;
			}
		},
		created() {
			this.initArr()

		}
	}
</script>

<style>
	.card {
		padding: .2rem .2rem 0 .2rem;
	}

	.card .job {
		padding-left: .1rem;
		line-height: .64rem;
		font-size: .34rem;
		border-bottom: 1px solid #ececec;
	}

	.card .job .small {
		font-size: .3rem;
	}

	.card .content {
		padding-left: .3rem;
		line-height: .64rem;
		font-size: .32rem;
		border-bottom: 1px solid #ececec;
	}

	.card .list {
		font-size: .28rem;
	}

	.card .list .item {
		margin: .2rem;
		margin-left: .48rem;
		height: 1rem;
		line-height: .35rem;
		border-bottom: 1px solid #ececec;
		font-size: .28rem;
	}

	.card .list .dif-item {
		margin-left: .2rem;
	}

	.card .list .dif-item label {
		margin-left: .24rem;
	}

	.card .list .item .name {
		margin-left: .1rem;
	}

	.card .list .item .vote-other {
		display: inline-block;
		width: 2.4rem;
		height: .44rem;
		padding-left: .7rem;
		border-bottom: 1px solid #bbb;
	}

	.card .list .item .input[] .card .list .item .name {
		font-size: .28rem;
		line-height: .46rem;
	}

	.card .list .item .checkbox {
		display: flex;
		justify-content: space-between;
		padding: .1rem .3rem;
	}

	.card .list .item .checkbox div {
		font-size: .28rem;
		line-height: .4rem;
	}

	.card .list .item .checkbox input {
		position: relative;
		top: -.03rem;
		width: .44rem;
		padding: 1rem;
		border-radius: 50%;
		color: #fff;
		zoom: 150%;
	}

	.card .list .item .voteother {
		border-bottom: 1px solid #999;
		width: 1.8rem;
		margin-left: .1rem;
		text-align: center;
	}

	.card .list .item input.voteother {
		font-family: "microsoft yahei";
		position: relative;
		bottom: .1rem;
	}

	.card .list .item .ratio-other {
		padding-top: .1rem;
		padding-left: .1rem;
	}




	input[type="radio"] {
		display: none;
	}

	input[type="radio"]+label::before {
		content: "\a0";
		display: inline-block;
		vertical-align: middle;
		font-size: .28rem;
		width: .4rem;
		height: .4rem;
		margin-right: .1rem;
		border-radius: 50%;
		border: 1px solid #005bac;
		/* text-indent: .15em; */
		line-height: 1.2rem;
		box-sizing: border-box;
	}

	input[type="radio"]:checked+label::before {
		display: inline-block;
		background-color: #005bac;
		background-clip: content-box;
		vertical-align: middle;
	}

	input[type="radio"]:checked+label::after {
		display: inline-block;
		background-color: #fff;
		width: .2rem;
		height: .2rem;
		background-clip: content-box;
		vertical-align: middle;
	}

	input:disabled {
		/* background-color: #999; */
		background-color: #fff;
		/* border: 1px solid red; */
		border-bottom: 1px solid red !important;
	}



	.card .list .item .radio-wrapper {
		display: flex;
		padding: .2rem 0 0 .1rem;
		/* line-height: .44rem; */
	}

	.card .list .item .radio-item {
		padding-left: .4rem;
	}

	.card .list .item .radio-item:nth-child(1) {
		padding-left: 0;
	}

	.card .list .item .choice-others {
		padding-bottom: .1rem;
		font-size: .32rem;
	}

	.card .list .item .vote-other {
		position: relative;
		left: -.26rem;

		border-bottom: none;
	}

	.card .list .item .layui-form-radioed>i {
		color: #005BAC;
	}


	.card .list .item .vote-other .line {
		position: relative;
		left: 1.5rem;
		top: -.4rem;
		border-bottom: 1px solid #666;
	}

	.card .desc {
		height: .64rem;
		line-height: .64rem;
		font-size: .26rem;
		text-align: center;
		color: #aeaeae;
	}
</style>
