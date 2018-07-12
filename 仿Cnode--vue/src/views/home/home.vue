<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu 
                  @on-select="selectMenu" 
                  :active-name="activeClass" 
                  theme="dark" 
                  width="auto"
                >
                    <MenuItem :key="item.name" v-for="item in menusData" :name="item.name">
                        <Icon :type="item.icon"></Icon>
                        <span>{{item.title}}</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Content :style="{padding: '0 16px 16px'}">
                    <Spin size="large" fix v-if="spinShow"></Spin>
                    <ul id="list">
                        <li
                            v-for="item in list" 
                            :key="item.id"
                        >
                            <router-link
                                class="toux"
                                :to="{name:'Information',params:{name:item.author.loginname}}"
                            >
                                <img width="50" :src="item.author.avatar_url" alt="">
                            </router-link>
                            <span class="huifu">{{item.reply_count}}/</span>
                            <span class="fangwen">{{item.visit_count}}</span>
                            <router-link 
                                :to="{name:'Detail',params:{abc:item.id},query:{loginname:item.author.loginname }}" 
                            >
                                {{item.title}}
                            </router-link>
                        </li>
                    </ul>
                    <Page :current='page'  @on-change='changePage' :total="500" style="margin-top:20px;margin-left:50px"></Page>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
 import {menusData} from './menu-data.js'
 import detail from '../topic/detail'
 import information from '../information/information'
    export default {
        components:{
            detail,
            information
        },
        data () {
            return {
                isCollapsed: false,
                menusData,
                list: [],
                activeClass: 'all',
                spinShow: true,
                page: 1
            };
        },
        methods:{
          selectMenu(name){
            this.$router.push({
              query:{
                tab:name
              }
            })
            this.$emit('abc')
          },
          changePage(page){
              this.$router.push({
                  query:{
                    ...this.$route.query,
                    page
                  }
              })
              this.fetchTopic({page: page})
              // 在地址栏记录

          },
          async fetchTopic(params={page:1}){
            let tab = this.$route.query.tab || 'all';
            let page = params.page || this.$route.query.page || 1;
            this.activeClass = tab;
            this.spinShow = true;
            this.page = parseInt(page);
            let {data} = await this.http.getTopics({
                tab,
                page:page,
                limit: 10
            })
            this.list = data.data;
            this.spinShow = false;
          }
        },
        watch:{
          $route:{
              handler: 'fetchTopic',
              immediate: true
          }
        }
    }
</script>
<style scoped>
    .layout-con{
        height: 100%;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
        font: 30px/50px "宋体";
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    #list{
        padding: 0;
        margin: 0;
        list-style: none;
        width: 100%;
    }
    #list li{
        height: 70px;
        overflow:hidden;
        border-bottom: 1px solid #c4c1c1;
        padding: 0;
    }
    #list li .toux{
        width: 50px;
        height: 50px;
    }
    #list li img{
        margin: 10px;
        float: left;
    }
    #list li a{
        height: 70px;
        font: 20px/70px "宋体";
        color: #000;
        float: left;
        margin-left: 10px;
    }
    #list li .huifu{
        width: 30px;
        height: 70px;
        float: left;
        /* 错位的原因 */
        font: 18px/70px "宋体";
        color: #3f3d3d;
        margin-left: 30px;
        padding: 0px;
    }
     #list li .fangwen{
         width: 60px;
        float: left;
        font: 18px/70px "宋体";
        color: darkgrey;

    }
</style>

