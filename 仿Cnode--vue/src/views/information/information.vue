<template>
   <div>
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div id="box" class="clearfix" v-if="!spinShow">
            <div id="boxLeft">
                <div class="boxTop">
                    <div class="homepage clearfix" >
                        <router-link :to="{name:'Home'}">
                            主页
                        </router-link>
                        <span>
                            /
                        </span>
                    </div>
                    <div class="homepageCon">
                        <div class="info">
                            <img :src="informationData.avatar_url">
                            <span>{{informationData.loginname}}</span>
                        </div>
                        <div>{{informationData.score?informationData.score:0}}积分</div>
                        <div v-if="informationData.githubUsername">GitHub:@{{informationData.githubUsername}}</div>
                        <div>注册时间:{{informationData.create_at.slice(0,10)}}</div>
                    </div>
                </div>
                <div class="boxTop">
                    <div class="homepage clearfix" >
                        <span>
                        最近新建的话题
                        </span>
                    </div>
                    <ul id='list'>
                        <li v-for="item in informationData.recent_topics" 
                            :key="item.id"
                        >
                            <router-link class="info" :to="{name:'User',params:{name:item.author.loginname}}">
                                <img :src="item.author.avatar_url">
                            </router-link>
                            <router-link 
                                :to="{name:'Detail',params:{abc:item.id},query:{loginname:item.author.loginname }}" 
                                active-class='title'
                            >
                                {{item.title}}
                            </router-link>
                            <span class="author">
                                作者：{{item.author.loginname}}
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="boxTop">
                    <div class="homepage clearfix" >
                        <span>
                            最近参与的话题
                        </span>
                    </div>
                    <ul id='listQtht'>
                        <li v-for="item in informationData.recent_replies" 
                            :key="item.id"
                        >
                            <router-link class="info" :to="{name:'User',params:{name:item.author.loginname}}">
                                <img :src="item.author.avatar_url">
                            </router-link>
                            <router-link 
                                :to="{name:'Detail',params:{abc:item.id},query:{loginname:item.author.loginname }}" 
                                active-class='title'
                            >
                                {{item.title}}
                            </router-link>
                            <router-link class="author" :to="{name:'User',params:{name:item.author.loginname}}" tag="span">
                                作者：{{item.author.loginname}}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="boxRight">
                <div class='authorInfo'> 
                    <div class="title">作者</div>
                    <div class="content">
                        <div class="clearfix top">
                            <img :src="informationData.avatar_url"/>
                            <span>{{informationData.loginname}}</span>
                        </div>
                        <div class="bot">
                            <span class="score">积分：{{informationData.score}}</span>   
                        </div>
                        <div class="bot">
                            <span class="score">“这家伙什么也没留下o(╥﹏╥)o”</span>   
                        </div>
                    </div>
                </div>
                <div class='authorInfo'> 
                    <div class="title">客户端二维码</div>
                    <div class="content">
                        <img style="width: 80%;height:80%;display:block;margin: 0 auto;" src="//dn-cnode.qbox.me/FtG0YVgQ6iginiLpf9W4_ShjiLfU" >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                informationData:{
                    recent_topics:[],
                    create_at:''
                },
                spinShow: true,
            }
        },
        methods:{
            async getInFor(){
                let loginname = this.$route.params.name;
                console.log(loginname)
                let informationData = await this.http.getLoginname({loginname})
                this.informationData = informationData.data.data
                this.spinShow = false
                console.log(this.informationData)
            }
        },
        watch:{
            $router:{
                  handler: 'getInFor',
                  immediate: true
            }
        }
    }

</script>
<style>
    #list,#listQtht{
        padding: 0;
        margin: 0;
        list-style: none;
        width: 100%;
    }
    #list li,#listQtht li{
        height: 50px;
        padding: 10px;
        border-top: 1px solid #f0f0f0;
        background-color: #fff;
        overflow:hidden;
    }
    #list li:nth-child(1),#listQtht li:nth-child(1){
        border-top: none;
    }
    #list li .info,#listQtht li .info{
        float:left;
        width: 30px;
        height: 30px;
        border-radius: 5px;
        cursor:pointer;
        margin-right: 10px;
    }
    #list li .info img,#listQtht li .info img{
        width: 30px;
        height: 30px;
        border-radius: 5px;
    }
    #list li .visit,#listQtht li .visit{
        font: 14px/30px arial;
        color:#000;
    }
    #list li a,#listQtht li a{
        font: 16px/30px arial,'微软雅黑';
        height: 30px;
        width: 600px;
        color:#333;
        float: left;
        overflow:hidden;
        cursor:pointer;
    }
    #list li a:visited,#listQtht li a:visited{
        color:#a1a1a1;
    }
    #list li:hover,#listQtht li:hover{
        background-color:#f1f1f1;
    }
    #list li a:hover,#listQtht li a:hover{
        color:rgb(72, 80, 190);
        text-decoration:underline;
    }
    #list li .author,#listQtht li .author{
        font: 14px/30px arial,'微软雅黑';
        color:rgb(0, 136, 204);
        cursor:pointer;
    }
    #list li .author:hover,#listQtht li .author:hover{
        text-decoration:underline;
    }
    .clearfix:after{
        content:'';
        clear: both;
        display:block;
    }
    #box{
        width: 90%;
        margin: 0 auto;
        padding-top:10px;
    }
    #boxLeft{
        width: 70%;
        float: left;
    }
    #boxLeft .boxTop{
        margin-bottom: 10px;
        background-color: #fff;
        border-radius: 3px;
    }
    #boxLeft .boxTop .homepage{
        padding: 10px;
        background-color: #f6f6f6;
        border-radius: 3px 3px 0 0 ;
        border-bottom: 2px solid #e1e1e1;
    }
    #boxLeft .boxTop .homepage a,
    #boxLeft .boxTop .homepage span{
        float: left;
        font: 14px/20px '微软雅黑';
    }
    #boxLeft .boxTop .homepage a{
        color: #80bd01;
    }
    #boxLeft .boxTop .homepage span{
        color: #999;
    }
    #boxLeft .boxTop .homepageCon{
        padding: 10px;
        color: #444;
        font: 14px/30px arial,'微软雅黑'; 
    }
    #boxLeft .boxTop .homepageCon .info{
        height: 30px;
        margin-bottom: 5px;
    }
    #boxLeft .boxTop .homepageCon .info img{
        float:left;
        width: 30px;
        height: 30px;
        border-radius: 3px;
        margin-right: 10px; 
    }
    #boxLeft .boxTop .homepageCon .info span{
        float:left;
    }
     #boxRight{
        width: 25%;
        float: right;
    } 
    #boxRight .markdown{
        margin-bottom: 10px;
    }
     #boxRight .authorInfo {
        margin-bottom: 15px;
    }
    #boxRight .authorInfo .title{
        padding: 10px;
        font: 14px/14px '微软雅黑';
        background-color:#f6f6f6;
        color: #51585c;
        border-radius: 3px 3px 0 0;
    }
    #boxRight .authorInfo .content .top,#boxRight .authorInfo .content .bot{
        padding: 10px;
        background-color: #fff;
    }
    #boxRight .authorInfo .content .top img{
        width: 30px;
        height: 30px;
        float: left;
        border-radius: 3px;
    }
    #boxRight .authorInfo .content .top span{
        float: left;
        font: 14px/30px arial,"微软雅黑";
        margin-left: 10px;
        color: #778087;
    }
    #boxRight .authorInfo .content .bot{
        border-radius: 0 0 3px 3px;
    }
    #boxRight .authorInfo .content .bot span{
        display: block;
        font: 14px/30px arial,"微软雅黑";
        overflow: hidden;
        width: 100%;
    }
    #boxRight .authorInfo .content .bot div span{
        cursor: pointer;
    }
    #boxRight .authorInfo .content .bot .score{
        display: block;
        font: 14px/20px arial,"微软雅黑";
    }
    #boxRight .authorInfo .content{
        background-color:#fff;
        padding:15px 0;
        border-radius: 0 0 3px 3px ;
    }
</style>
