<template>
	<div class="vote-contaienr" ref="menuWrapper" id="abccc">
		<div class="contaienr">
			<vote-header :success="success" :totalposition="totalPosition" :totalelector="totalElector" :totalparticipant="totalParticipant"></vote-header>


			<div class="main" v-show="!success">
				<form id="form1" method="post">
					<input type="hidden" name="pwd" :value="id">
					<split desc="部门负责人竞选投票" :total="data.positionFrontFormList1.length"></split>
					<div v-for="(item,index) of data.positionFrontFormList1" :key="index">
						<card @func="isSubmit" @returnsunmit="returnSubmit" ref="card" :data="item" @add="totalUnCheckedNum" :index="index"></card>
						<greyspace></greyspace>
					</div>
					<split desc="部门负责人民主推荐" v-if="data.positionFrontFormList2.length" :total="data.positionFrontFormList2.length"></split>
					<div v-for="(item,index) of data.positionFrontFormList2" :key="index+100">
						<!-- <card :data="item" @func="isSubmit" @add="totalUnCheckedNum" ref="card" :index="index"></card> -->
						<commendcard ref="card" @add="totalUnCheckedNum" @returnsunmit="returnSubmit"  :data="item" :index="index"></commendcard>
						<greyspace></greyspace>
					</div>
					<!-- <commendcard :data="item" :index="index"></commendcard> -->

				</form>
			</div>

			<footer-container v-show="!success"></footer-container>
			<div class="button" @click="postdata" v-show="!success">
				提交选票
			</div>
			<vote-success v-show="success"></vote-success>
		</div>


	</div>
</template>
<script>
	import BScroll from "better-scroll"
	import voteHeader from './voteHeader.vue'
	import footerContainer from './footer.vue'
	import split from './split.vue'
	import card from './card.vue'
	import voteSuccess from "./success.vue"
	import commendcard from './recommendcard.vue'
	import greyspace from './greyspace.vue'
	export default {
		name: 'HelloWorld',
		data() {
			return {
				data: {
					positionFrontFormList1: [],
					positionFrontFormList2: [],
				},
				id: this.$route.params.id,
				scroll: '',
				confirmTicket: '',
				unCheckedNum: 0,
				success: false,
				totalPosition: 0,
				totalElector: 0,
				totalParticipant: 0,
				isReturnSubmit: 0
			}
		},
		methods: {
			totalUnCheckedNum(num) {
				this.unCheckedNum += parseInt(num);
			},
			getData() {
				this.$axios.get(this.HOST + "/front/voteResult/toAdd?pwd=" + this.id).then((data) => {
					this.data = data.data;
					console.log(this.data);
				}).catch((err) => {
					console.log(err)
				})
			},
			returnSubmit() {
				this.isReturnSubmit += 1
			},
			postdata() {
				this.$refs.card.forEach((item) => {
					item.checkAllRadioSelected()
				})
				console.log(this.unCheckedNum)
				this.isSubmit()
				this.unCheckedNum = 0;
			},
			initScroll() {
				var el = document.getElementsByClassName('vote-contaienr')[0]
				this.scroll = new BScroll(el, {
					click: true
				})
				console.log(this.scroll)
			},
			isSubmit(obj) {
				if (this.unCheckedNum) {
					this.$msgbox.alert(`您一共有${this.unCheckedNum}项未选择`)
					return;
				} 
				if(this.isReturnSubmit == 0) {
					this.$msgbox.confirm('确认提交您的选票').then(() => {
						var form = document.querySelector("#form1");
						var formdata = new FormData(form);
						this.$axios.post(this.HOST + '/front/voteResult/add', formdata)
							.then(function(response) {
								console.log(response);
							})
							.catch(function(error) {
								console.log(error);
							});

						this.success = true;
					})
					return
				}
			}
		},
		created() {
			this.getData()
			console.log(2)
		},
		mounted() {
			var obj = document.getElementById('abccc')
			console.log(obj)
			this.$nextTick(() => {
				this.initScroll()

			});
		},
		/* 	watch: {
				data() {
					this.totalPosition += this.data.positionFrontFormList1 + this.data.positionFrontFormList2;
					this.data.positionFrontFormList1.forEach(item => {
						this.totalElector += item.candidateFrontFormList.length;
					})
					this.data.positionFrontFormList2.forEach(item => {
						this.totalElector += item.candidateFrontFormList.length;
					})
				}
			}, */

		components: {
			split,
			footerContainer,
			card,
			voteHeader,
			voteSuccess,
			commendcard,
			greyspace
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.vote-contaienr {
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
	}

	.vote-contaienr .button {
		line-height: 1.1rem;
		background-color: #005BAC;
		color: #fff;
		text-align: center;
	}
</style>
