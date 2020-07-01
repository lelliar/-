<template>
    <div>
        <h1 class="classify">{{id ? '编辑':'新建'}}广告位</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="名称">
            <el-input style="width:600px;" v-model="model.name"></el-input>
        </el-form-item>
         <el-form-item>
            <el-button type="priamry" @click="model.items.push({})">
                <i class="el-icon-plus"></i>
                添加广告
            </el-button>
            <el-row type="flex" style='flex-wrap:wrap'>
                <el-col :md="24" v-for="(item , i) in model.items" :key="i">
                    <el-form-item label="跳转连接">
                        <el-input v-model="item.url"></el-input>
                    </el-form-item>
                    <el-form-item label="图片" style="margin-top: 0.5rem;">
              <el-upload
                class="avatar-uploader-banner"
                :action="$http.defaults.baseURL + '/upload'"
                 :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatarbanner">
                <i v-else class="el-icon-plus avatar-uploader-icon-banner"></i>
              </el-upload>
            </el-form-item>

            <el-form-item>
                <el-button @click="model.items.splice(i , 1)" type="danger">删除</el-button>
            </el-form-item>

                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" native-type="submit" style="margin-left:230px;">保存</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
export default {
    props:{
        id:[]
    },
    data(){
        return {
            model : {
                items:[],
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
                res = await this.$http.put(`rest/ads/${this.id}` , this.model)
            }else{
                res = await this.$http.post('rest/ads' , this.model)
            }
            this.$router.push('/ads/info')
            console.log(res)
            this.$message({
                type : 'success',
                message:'保存成功'
            })
        },
        async fetch(){
            const res = await this.$http.get(`rest/ads/${this.id}`)
            this.model = Object.assign({} , this.model , res.data)
        },
    },
    created() {
        this.id && this.fetch()
    }
}
</script>

<style lang="scss">
    .classify{
        margin: 20px;
    }
</style>