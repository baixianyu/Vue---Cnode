<template>
  <div>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div id="box" v-if="!spinShow">
      <div class="left">
        <div class="content">
            <div class="conHead">
                <h1>{{d.title}}</h1>
                <div>
                  <span v-if="d.create_at">发布于：{{d.create_at.slice(0,10)}}</span>
                  <span v-if="d.author">作者：{{d.author.loginname}}</span>
                  <span>{{d.visit_count}}次浏览</span>
                  <router-link :to="{name:'Detail',query:this.$route.query}" 
                                class='scTop'  
                                tag='span'
                                v-if="d.author.loginname == ''"
                  >
                    编辑点击
                  </router-link>
                  <span class='scTop' :class="{color:d.is_collect}"  @click="Collection">{{d.is_collect?'取消收藏':'收藏'}}</span>
                </div>
            </div>
            <div class="conCon">
              <div v-html="d.content"></div>
            </div>
        </div>
        <div class="pinglun">
            <div class="huifu"  v-if="d.replies">{{d.replies.length}} 回复</div>
            <div >
                <div 
                class="pingli"
                v-for="(item,index) in d.replies"
                :key = "item.id"
                >
                  <div class="liTop">
                      <a href="" class="touxiang">
                        <img :src="item.author.avatar_url">
                      </a>
                      <div>
                        <a href="" class="name">{{item.author.loginname}}</a>
                        <a href="" class="louS">{{index+1}}楼</a>
                      </div>
                      <div class="zan">
                        <span class="dianZ"
                              @click="upGive(item.id)"
                        >
                        赞</span>
                        <span>{{item.ups.length}}</span>
                      </div>
                  </div>
                  <div class="liBot" v-html="item.content"></div>
                </div>
            </div>
            <div class="panel">
              <div class="addPanel">
                  添加回复
              </div>
              <div class="addCon">
                  <textarea v-model="content"></textarea>
                  <button style="display:block" @click = "upComment">回复</button>
              </div>
            </div>
        </div>
      </div>
      <div class="right">
        <div class="zzxx">
          <div class="zzHead">作者</div>
          <div class="zzCon">
            <div>
              <router-link
                class="zzConTou"
                :to="{name:'Information',params:{name:usreData.loginname}}"
              >
                <img :src="usreData.avatar_url" >
              </router-link>
              <span>{{usreData.loginname}}</span>
            </div>
            <div id="jifen">积分:{{usreData.score}}</div>
          </div>
        </div>
        <div>
          <div class="zzHead">作者其他话题</div>
        </div>
        <router-link 
            tag="div" 
            :to="{name:'Detail',params:{abc:item.id},query:{loginname:item.author.loginname}}" 
            v-for="item in usreData.recent_topics " 
            :key="item.id"
            class="qtht"
        >{{item.title}}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
 import detail from '../topic/detail'
 import information from '../information/information'
  export default {
    props: ['abc','loginname'],
    data(){     
      return {
                d:{
                  author: {},
                  create_at:''
                },
                spinShow: true,
                usreData:{
                  recent_topics:[]
                },
                token:'ed216930-69ba-481d-a9d0-5d837bea3400',
                content:''
            }
    },
    watch:{
        $route:{
              handler: 'created',
              immediate: true
        }
    },
    methods:{
      //请求数据
      async created(){
          this.spinShow = true;
          let id = this.abc;
          let {data} = await this.http.getTopicsById({id,token:this.token});
          this.d = data.data;
          this.spinShow = false;
          let loginname = this.$route.query.loginname;
          let lname = await this.http.getLoginname({loginname});
          this.usreData = lname.data.data;
          console.log(lname.data.data)
      },
      //点赞
      async upGive(id){
        await this.http.postUpGive({id,token:this.token})
        let {data} = await this.http.getTopicsById({id: this.abc,token:this.token})
        this.d = data.data;
      },
      // //评论 
      async upComment(){
        if(this.content == '') {alert('请输入内容')}
        let data1 =await this.http.postComment({id:this.abc, token:this.token,  content:this.content})
        let {data} = await this.http.getTopicsById({id:this.abc,token:this.token})
        this.d = data.data;
        this.content=''
      },
      //收藏
      async Collection(){
        if(!this.d.is_collect){
            await this.http.postCollection({id:this.abc,token:this.token})
        }else{
            await this.http.postNoCollection({id:this.abc,token:this.token})
        }
        let {data} = await this.http.getTopicsById({id:this.abc,token:this.token})
        this.d = data.data;
      }
    },
  }
</script>
<style>
  body{
    background-color: #e1e1e1;
  }
  ul{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li{
    padding-bottom: 5px;
    font: 15px/20px "宋体";
  }
  #box{
    margin: 15px 220px;
    width: 1400px;
    height: 1000px;
  }
  .left{
    float: left;
    width: 1095px;
  }
  .content{
    width: 1095PX;
    margin-bottom: 13px;
    background-color: #ffffff;
  }
  .conHead{
    padding: 10PX;
    width: 1075px;
    height: 67PX;
    border-bottom: 1px solid #e1e1e1;
  }
  .conHead span {
    margin-right: 5px;
  }
  .conHead .scTop{
    float: right;
    color: #fff;
    padding: 4px;
    text-align: center;
    border-radius: 3px;
    font: 12px/12px arial,'微软雅黑';
    background-color: #80bd01;
    cursor: pointer;
  }
  .conCon{
    padding: 10px;
  }
  .conCon p{
    font: 15px/25px "宋体";
    text-indent: 2em;
  }
  .conCon p img{
    max-width: 100%;
  }
  .pinglun{
    width: 1095PX;
    background-color: #ffffff;
  }
  .huifu{
    padding:10px ;
  }
  .pingli{
    padding: 10px;
    width: 1075px;
    border-top: 1px solid #f0f0f0;
    font: 15px/20px "宋体";
  }
  .liTop{
    font: 14px;
    height: 30px;
  }
  .liTop div{
    float: left;
    margin-left: 5px;
  }
  .liTop .name{
    font-size: 12px/12px "微软雅黑";
    font-weight: 600;
    color: black;
  }
  .liTop .louS{
    font-size: 11px;
    color: #08c;
  }
  .liTop .zan{
    float: right;
    margin-left: 20px;
    font-size: 15px;
  }
  .zan .dianZ{
    display:inline-block;
    width: 18px;
    height: 18px;
    cursor:pointer;
  }
  .panel .addPanel{
    font: 16px/24px arial,'微软雅黑';
    padding: 10px;
    border-bottom: 2px solid #e1e1e1;
    background-color:#f1f1f1;
    border-radius: 3px 3px 0 0;
  }
  .panel .addCon{
    height: 164px;
  }
  .panel .addCon textarea{
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
    resize: none;
    font: 14px/20px '微软雅黑';
    border: none;
    outline:none;
  }
  .panel .addCon button{
    /* height: 36px; */
    color: #fff;
    background-color: #c135f8 ;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font: 14px/28px '微软雅黑';
    margin: 5px;
  }
  .touxiang{
    width: 30px;
    height: 30px;
    float: left;
  }
  .touxiang img{
    width: 100%;
    height: 100%;
  }
  .liBot{
    font-size: 15px;
    width: 1025px;
    margin-bottom: 15px;
    margin-left: 50px;
  }
  .liBot img{
     width: 100%;
  }
  .right{
    float: right;
    width: 270px;
  }
  .zzxx{
    margin-bottom: 10px;
  }
  .zzHead{
    padding: 10px;
    background-color: #f6f6f6;
  }
  .zzCon{
    background-color: #ffffff;
    width: 270px;
    padding: 10px;
    font: 14px;
  }
  .zzCon div{
    height: 50px;
  }
  .zzCon span{
    float: left;
    color: #778087;
    margin-left: 20px;
    font: 20px/50px "宋体";
  }
  .zzConTou{
    float: left;
    width: 48px;
    height: 48px;
  }
  .zzConTou img{
    width: 100%;
  }
  #jifen{
    margin-top: 10px;
    font: 16px/20px "宋体";
    height: 20px;
  }
  .qtht{
    color: #778087;
    font: 14px/40px "微软雅黑";
    height: 40px;
    padding-left: 10px;
    overflow: hidden;
    background-color: #ffffff;
  }
</style>