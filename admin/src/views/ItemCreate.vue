<template>
    <div>
        <!-- 使用id?判断id是否存在，若存在，则编辑，若不存在，则新建 -->
        <h1 class="classify">{{id ? '编辑':'新建'}}装备</h1>
            
           
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="装备图片">
                <!-- 上传图片，on-success表示上传成功后执行 -->
                <!-- 使用ELEmentUI导入，能够自动进行上传提交 -->
                 <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL+'/upload'"
           :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="afterUpload"
           >
            <img v-if="model.icon" :src="model.icon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
    
            </el-form-item>
        <el-form-item label="名称">
            <el-input style="width:600px;" v-model="model.name"></el-input>
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
        id:{}
    },
    data(){
        return {
            model : {
                name: "",
                avatar:"",
            },
            parents:[]
        }
    },
    methods: {
    afterUpload(res) {
        //由于model中之前并不存在icon,若直接赋值会报错
        //则用set方法进行显式赋值。icon代表属性，res代表返回的值
        this.$set(this.model , 'icon' , res.url)
        // this.model.icon = res.url
    },
        // 前端接口,saync,await为ES6语法，将异步请求转换为类似同步语法
        // 防止不断的执行回调，使代码不易读，不易维护
        async save(){
            //请求有两种方式 1.主动点击添加，2.点击修改，点击修改会传一个ID到该页面，
            //ID存在执行修改，ID不存在执行添加
            //利用props进行接受，使用IF 来判断究竟是哪种方式，以便显示不同内容
            //if (this.id)，当前ID存在时执行以下操作
            let res
            if(this.id){
                res = await this.$http.put(`rest/items/${this.id}` , this.model)
            }else{
                res = await this.$http.post('rest/items' , this.model)
            }
            this.$router.push('/items/info')
            console.log(res)
            this.$message({
                type : 'success',
                message:'保存成功'
            })
        },
        async fetch(){
            const res = await this.$http.get(`rest/items/${this.id}`)
            this.model = res.data
        },
        async fetchParents(){
            const res = await this.$http.get(`rest/items`)
            this.parents = res.data
        }
    },
    created() {
        this.id && this.fetch()
        this.fetchParents()
    }
}
</script>

<style scoped>
    .classify{
        margin: 20px;
    }
     .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>