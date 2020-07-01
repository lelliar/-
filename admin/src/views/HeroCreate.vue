<template>
    <div class="all">
        <!-- 使用id?判断id是否存在，若存在，则编辑，若不存在，则新建 -->
        <h1 class="classify">{{id ? '编辑':'新建'}}英雄</h1>
            
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-tabs value="basic">
                <el-tab-pane label="基础信息" name="basic">
                      <el-form-item label="名称">
            <el-input style="width:600px;" v-model="model.name"></el-input>
        </el-form-item>
         <el-form-item label="称号">
            <el-input style="width:600px;" v-model="model.title"></el-input>
        </el-form-item>
       <el-form-item label="类型">
                <el-select v-model="model.classifies" multiple>
                    <el-option
                    v-for="item in classifies"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>

         <el-form-item label="难度">
                <el-rate v-model="model.scores.difficult" :max="9" style="margin-top:0.6rem" show-score></el-rate>
            </el-form-item>
              <el-form-item label="技能">
                <el-rate v-model="model.scores.skills" :max="9" style="margin-top:0.6rem" show-score></el-rate>
            </el-form-item>
              <el-form-item label="攻击">
                <el-rate v-model="model.scores.attack" :max="9" style="margin-top:0.6rem" show-score></el-rate>
            </el-form-item>
              <el-form-item label="生存">
                <el-rate v-model="model.scores.survive" :max="9" style="margin-top:0.6rem" show-score></el-rate>
            </el-form-item>
            <el-form-item label="头像">
                <!-- 上传图片，on-success表示上传成功后执行 -->
                <!-- 使用ELEmentUI导入，能够自动进行上传提交 -->
            <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL+'/upload'"
             :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="res => $set(model , 'avatar' , res.url)"
           >
            <img v-if="model.avatar" :src="model.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>

            <el-form-item label="背景图">
                <!-- 上传图片，on-success表示上传成功后执行 -->
                <!-- 使用ELEmentUI导入，能够自动进行上传提交 -->
                  <el-upload
            class="avatar-uploader-banner"
            
            list-type="width:500px;"
            :action="$http.defaults.baseURL+'/upload'"
             :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="res => $set(model , 'banner' , res.url)"
           >
            <img v-if="model.banner" :src="model.banner" class="avatarbanner" >
            <i v-else class="el-icon-plus avatar-uploader-icon-banner"></i>
            </el-upload>
            </el-form-item>

        <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
                <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
                <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
        </el-form-item>
         <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
        </el-form-item>
         <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
        </el-form-item>
                
         <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
        </el-tab-pane>

                <!-- 技能板块 -->

        <el-tab-pane label="技能" name="skills">
           <el-button @click="model.skills.push({})">
               <i class="el-icon-plus"></i>添加技能
           </el-button>

        <el-row type="flex" style="flex-wrap:wrap;margin-left:5rem;">
            <el-col :md="12" v-for="(item , i) in model.skills" :key="i" style="margin-top:30px;">
                <el-form-item label="名称">
                    <el-input v-model="item.name" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                    <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL+'/upload'"
                     :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="res => $set(item , 'icon' , res.url)"
                >
                    <img v-if="item.icon" :src="item.icon" class="avatar" >
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="冷却值">
                    <el-input v-model="item.delay" type="textarea"></el-input>
                </el-form-item>

                <el-form-item label="消耗">
                    <el-input v-model="item.const" type="textarea"></el-input>
                </el-form-item>

                <el-form-item label="描述">
                    <el-input v-model="item.description" type="textarea"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button size="small" type="danger" @click="model.skills.splice(i , 1)">删除</el-button>
                </el-form-item>
                
            </el-col>
        </el-row>
         <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="最佳搭档" name="partners">
            <el-button @click="model.partners.push({})">
                 <i class="el-icon-plus"></i>添加英雄
            </el-button>
           <el-row type="flex" style="flex-wrap:wrap">
               <el-col :md="12" v-for="(item , i ) in model.partners" :key="i" filterable>
                   <el-form-item label="英雄">
                       <el-select v-model="item.hero" filterable>
                          <el-option
                          v-for="hero in heroes"
                          :key="hero._id"
                          :value="hero._id"
                          :label="hero.name"
                          >
                          </el-option>
                       </el-select>
                   </el-form-item>
                  <el-form-item label="描述">
                      <el-input type="textarea" v-model="item.description"></el-input>
                  </el-form-item>
                   <el-form-item>
                      <el-button @click="model.partners.splice(i , 1)" type="danger">删除</el-button>
                  </el-form-item>
                      
               </el-col>
               
           </el-row>
           <el-form-item style="margin-left:500px;">
                      <el-button native-type="submit" type="primary">保存</el-button>
            </el-form-item>
        </el-tab-pane>

            </el-tabs>
    </el-form>
    </div>
</template>

<script>
export default {
    props:{
        id:{}
    },
    data(){

        return {
             classifies:[],
             items:[],
             heroes:[],
            model : {
                name:'',
                scores:{
                    difficult:0,
                },
                partners:[],
                skills:[]
            },
        }
    },
    methods: {
        // 前端接口,saync,await为ES6语法，将异步请求转换为类似同步语法
        // 防止不断的执行回调，使代码不易读，不易维护
        async save(){
            //请求有两种方式 1.主动点击添加，2.点击修改，点击修改会传一个ID到该页面，
            //ID存在执行修改，ID不存在执行添加
            //利用props进行接受，使用IF 来判断究竟是哪种方式，以便显示不同内容
            //if (this.id)，当前ID存在时执行以下操作
            let res
            if(this.id){
                res = await this.$http.put(`rest/heroes/${this.id}` , this.model)
            }else{
                res = await this.$http.post('rest/heroes' , this.model)
            }
            this.$router.push('/heroes/info')
            console.log(res)
            this.$message({
                type : 'success',
                message:'保存成功'
            })
        },
        async fetch(){
            const res = await this.$http.get(`rest/heroes/${this.id}`)
            this.model = Object.assign({} , this.model , res.data)
        },
        async fetchClassify(){
            const res = await this.$http.get(`rest/classify`)
            this.classifies = res.data
        },
        async fetchItems(){
            const res = await this.$http.get(`rest/items`)
            this.items = res.data
        },
        async fetchHeroes(){
            const res = await this.$http.get('rest/heroes')
            this.heroes = res.data
        }
    },
    created() {
        this.id && this.fetch()
        this.fetchClassify()
        this.fetchItems()
        this.fetchHeroes()
    }
}
</script>

<style>
    .all{
        height:auto;
    }
    .classify{
        margin: 20px;
    }
     .avatar-uploader .el-upload{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover{
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar{
    width: 5rem;
    height: 5rem;
    display: block;
  }

   .avatar-uploader-banner .el-upload{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-banner .el-upload:hover{
    border-color: #409EFF;
  }
  .avatar-uploader-icon-banner {
    font-size: 28px;
    color: #8c939d;
    width: 20rem;
    height: 10rem;
    line-height: 10rem;
    text-align: center;
  }
  .avatarbanner{
    width: 20rem;
    height: 10rem;
    display: block;
  }
</style>