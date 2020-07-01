<template>
    <div>
        <h1 class="classify">{{id ? '编辑':'新建'}}文章</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="所属分类" >
                <el-select v-model="model.classifies" multiple>
                    <el-option 
                    v-for="item in classifies"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
        <el-form-item label="标题">
            <el-input style="width:600px;" v-model="model.title"></el-input>
        </el-form-item>
         <el-form-item label="内容">
            <vue-editor useCustomImageHandler @image-added="handleImageAdded" style="width:600px;" v-model="model.body"></vue-editor>
         </el-form-item>
        <el-form-item>
            <el-button type="primary" native-type="submit" style="margin-left:230px;">保存</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor"
export default {
    props:{
        id:{}
    },
    components:{
        VueEditor
    },
    data(){
        return {
            model : {},
            classifies:[],
        }
    },
    methods: {
        //上传图片
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
       const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
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
                res = await this.$http.put(`rest/aricles/${this.id}` , this.model)
            }else{
                res = await this.$http.post('rest/aricles' , this.model)
            }
            this.$router.push('/aricles/info')
            console.log(res)
            this.$message({
                type : 'success',
                message:'保存成功'
            })
        },
        async fetch(){
            const res = await this.$http.get(`rest/aricles/${this.id}`)
            this.model = res.data
        },
        async fetchCatgories(){
            const res = await this.$http.get(`rest/classifies`)
            this.classifies = res.data
        }
    },
    created() {
        this.id && this.fetch()
        this.fetchCatgories()
    }
}
</script>

<style lang="scss">
    .classify{
        margin: 20px;
    }
</style>