<template>
	<div class="card">
		<p class="job">竞选职位{{index+1}}：<span class="small">{{data.name}}</span></p>
		<p class="content">候选人:</p>
			<ul class="list">
				<li class="item" v-for="(item,index) of data.candidateFrontFormList" :key="index">
					<p class="name">{{item.name}}</p>
					<ul class="radio-wrapper">
						<li class="radio-item">
							<input type="radio" :ref="refsArr[index]" @click="changeAgree(agreeArr[index],index)" :id="refsArr[index]+'-1'"
							 :name="'result-'+data.position_id+ '-' + item.candidate_id" :checked="agreeArr[index]" />
							<label :for="refsArr[index] + '-1'">同意</label>
						</li>
						<li class="radio-item">
							<input type="radio" :id="refsArr[index]+'-2'" :name="'result-'+data.position_id+ '-' + item.candidate_id" />
							<label :for="refsArr[index]+'-2'">不同意</label>
						</li>
						<li class="radio-item">
							<input type="radio" :id="refsArr[index]+'-3'" :name="'result-'+data.position_id+ '-' + item.candidate_id" />
							<label :for="refsArr[index]+'-3'">弃权</label>
						</li>
						<li class="radio-item">
							<input type="radio" :id="refsArr[index]+'-4'" :name="'result-'+data.position_id+ '-' + item.candidate_id" />
							<label :for="refsArr[index]+'-4'">不了解</label>
						</li>
					</ul>
				</li>
				<li class="item">
					<p class="name choice-others">另选他人</p>
					<div class="ratio-other">
						<input type="radio" :checked="agreeArr[agreeArr.length-1]" :ref="refsArr[refsArr.length-1]" :id="refsArr[refsArr.length-1] +data.position_id+'-33'" :name="'val1-'+data.position_id" />
						<label :for="refsArr[refsArr.length-1] +data.position_id+'-33'" @click="changeAgree(agreeArr[agreeArr.length-1],agreeArr.length-1)">其他人</label>
						<input type="text" class="voteother">
					</div>
				</li>
			</ul>


		<p class="desc" @click="test()">候选人按姓氏字母顺序排列</p>
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
				agreeArr: []

			}
		},
		props:['data',"index"],
		methods: {
			changeAgree(isckecked, index) {

				this.refsArr.forEach((item,i) => {
					/* console.log(this.$refs[item][0].checked) */
					
					/* console.log(this.$refs[item][0].checked) */
					/* this.$refs[item].checked = false; */
					
					/* console.log(typeof(this.$refs[item][0])) */
					try{
						this.$refs[item][0].checked = false;
					}catch(e){
						this.$refs[item].checked = false;
					}
				
					
				})
				
				/* console.log(this.$refs['vote-other-people'].checked) */
				try{
					this.$refs[this.refsArr[index]][0].checked = true;
				}catch(e){
					this.$refs[this.refsArr[index]].checked = true;
				}
				
				/* console.log(this.$refs[this.refsArr[index]].checked) */
				/* console.log(this.refsArr[index])
				console.log(this.$refs[this.refsArr[index]].length)
				console.log(index) */
			},
			initArr() {
				this.data.candidateFrontFormList.forEach((item, i) => {
					this.agreeArr[i] = false;
					this.refsArr[i] = 'candidate-' + this.data.position_id + '-' + item.candidate_id
				})

				this.agreeArr[this.agreeArr.length] = false;
				this.refsArr[this.refsArr.length] = "vote-other-people"


				/* console.log(this.data.candidateFrontFormList)
				console.log(this.agreeArr)
				console.log(this.refsArr) */

			}
		},
		watch: {
			radio1(newval) {
				console.log(newval);
			}
		},
		created(){
			this.initArr()
		}
	}
</script>

<style>
	.card {
		padding: .2rem .2rem 0 .2rem;
	}

	.card .job {
		padding-left: .2rem;
		line-height: .64rem;
		font-size: .32rem;
		border-bottom: 1px solid #ececec;
	}

	.card .job .small {
		font-size: .28rem;
	}

	.card .content {
		padding-left: .3rem;
		line-height: .64rem;
		font-size: .32rem;
		border-bottom: 1px solid #ececec;
	}

	.card .list {
		font-size: .2rem;
	}

	.card .list .item {
		padding: .2rem;
		height: 1rem;
		line-height: .35rem;
		border-bottom: 1px solid #ececec;
		font-size: .28rem;
	}

	.card .list .item .name {
		padding-left: .1rem;
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
		margin-left: .4rem;
		text-align: center;
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
	}

	.card .list .item .vote-other {
		position: relative;
		left: -.26rem;

		border-bottom: none;
	}

	.card .list .item .layui-form-radioed>i {
		color: #005BAC;
	}

		{
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
