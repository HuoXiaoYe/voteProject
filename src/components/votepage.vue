<template>
	<div class="vote-contaienr" ref="menuWrapper" id="abccc" v-if="totalPageDisplay">
		<div class="contaienr">
			<vote-header :success="success" :totalposition="totalPosition" :totalelector="totalElector" :totalparticipant="totalParticipant"></vote-header>
			<!-- <footer-container v-show="!success"></footer-container> -->

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
						<commendcard ref="card" @add="totalUnCheckedNum" @returnsunmit="returnSubmit" :data="item" :index="index"></commendcard>
						<greyspace></greyspace>
					</div>
					<!-- <commendcard :data="item" :index="index"></commendcard> -->

				</form>
			</div>

			<!-- <footer-container v-show="!success"></footer-container> -->
			<div class="button" @click="postdata" v-show="!success">
				提交选票
			</div>
			<vote-success v-show="success"></vote-success>
		</div>


	</div>
</template>
<script>
	import voteHeader from './voteHeader.vue'
	import footerContainer from './footer.vue'
	import split from './split.vue'
	import card from './card.vue'
	import voteSuccess from "./success.vue"
	import commendcard from './recommendcard.vue'
	import greyspace from './greyspace.vue'
	// var apiUrl = "http://officalwechat.wh.bjtu.edu.cn:7080/api001"
	// var apiUrl = "http://:7080/api001"
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
				isReturnSubmit: 0,
				totalPageDisplay: false
			}
		},
		methods: {
    // 给子元素调用的方法 如果子元素有未选中的input，unCheckedNum会增1.
			totalUnCheckedNum(num) {
				this.unCheckedNum += parseInt(num);
			},
      // 从服务器获取数据的函数
			getData() {
				// this.$axios.get(this.HOST + "/front/voteResult/toAdd?pwd=" + this.id).then((data) => {
				this.$axios.get("http://officalwechat.wh.bjtu.edu.cn:7080/api001/front/voteResult/toAdd?pwd=" + this.id + "&rnd=" +
					Math.random()).then((data) => {
					if (data.data.value && data.data.value == -1) {
						this.$msgbox.alert(data.data.label);
						return;
					}
					this.totalPageDisplay = true;
					this.data = data.data;
				}).catch((err) => {
					console.log(err)
				})
			},
       // 给子元素调用的方法 如果子组件中 选中了另选他人 但没有填写内容，则isReturnSubmit 自增
			returnSubmit() {
				this.isReturnSubmit += 1
			},
      // 向服务器发送数据的函数，有可能验证不通过，所以重置一些属性
			postdata() {
				this.$refs.card.forEach((item) => {
					item.checkAllRadioSelected()
				})
				this.isSubmit()
				this.unCheckedNum = 0;
				this.isReturnSubmit = 0;
			},
       // 判断是否向服务器发送数据的函数
			isSubmit(obj) {
        var str = '';
				if (this.unCheckedNum) {
				  str += `您一共有${this.unCheckedNum}项未选择`;	
				}
        if (this.isReturnSubmit) {
				  str += ` 另选他人(或民主推荐不可为空)`;	
				}
        if(str){
          alert(str)
          return
        }
				if (this.isReturnSubmit == 0) {
					this.$msgbox.confirm('确认提交您的选票').then(() => {
						var form = document.querySelector("#form1");
						var formdata = new FormData(form);
						// this.$axios.post(this.HOST + '/front/voteResult/add', formdata)
						this.$axios.post('http://officalwechat.wh.bjtu.edu.cn:7080/api001/front/voteResult/add?rnd=' + Math.random(),
								formdata)
							.then((response) => {
								// alert(response.data.label);
								this.$msgbox.alert(response.data.label);
								// alert(response.data.value);
								// console.log(response)
								var res = response.data.value
								if (res == 1) {
									this.success = true;
									return;
								}
							})
							.catch(function(error) {
								console.log(error);
							});
					})
				}
			}
		},
		created() {
			this.getData()
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
	.vote-contaienr .button {
		line-height: 1.1rem;
		background-color: #005BAC;
		color: #fff;
		text-align: center;
	}
</style>
