
<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <!-- 修改height -->
  <el-aside width="200px" style="background-color: rgb(238, 241, 246);height:100vh;">
    <el-menu>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>系统管理</template>
        <el-menu-item-group>
          <template slot="title">分类</template>
          <!-- 添加router-link 使用tag将它定义为div类型 -->
          <router-link tag="div" to="/classifies/create"><el-menu-item index="1-1">新建分类</el-menu-item></router-link>
           <router-link tag="div" to="/classifies/info"><el-menu-item index="1-2">分类列表</el-menu-item></router-link>
        </el-menu-item-group>
        <el-menu-item-group>

          <template slot="title">管理员</template>
          <!-- 添加router-link 使用tag将它定义为div类型 -->
          <router-link tag="div" to="/admin_user/create"><el-menu-item index="1-1">新建管理员</el-menu-item></router-link>
           <router-link tag="div" to="/admin_user/info"><el-menu-item index="1-2">管理员列表</el-menu-item></router-link>
        </el-menu-item-group>

        
      </el-submenu>
      
<el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>内容管理</template>
        <el-menu-item-group>
          <template slot="title">英雄分类</template>
          <!-- 添加router-link 使用tag将它定义为div类型 -->
          <router-link tag="div" to="/heroes/create"><el-menu-item index="2-3">新建英雄</el-menu-item></router-link>
           <router-link tag="div" to="/heroes/info"><el-menu-item index="2-4">英雄列表</el-menu-item></router-link>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">装备分类</template>
          <!-- 添加router-link 使用tag将它定义为div类型 -->
           <router-link tag="div" to="/items/create"><el-menu-item index="2-5">新建装备</el-menu-item></router-link>
           <router-link tag="div" to="/items/info"><el-menu-item index="2-6">装备列表</el-menu-item></router-link>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">文章分类</template>
          <!-- 添加router-link 使用tag将它定义为div类型 -->
           <router-link tag="div" to="/aricles/create"><el-menu-item index="2-7">新建文章</el-menu-item></router-link>
           <router-link tag="div" to="/aricles/info"><el-menu-item index="2-8">文章列表</el-menu-item></router-link>
        </el-menu-item-group>
         <el-menu-item-group>
          <template slot="title">广告分类</template>
          <!-- 添加router-link 使用tag将它定义为div类型 -->
           <router-link tag="div" to="/ads/create"><el-menu-item index="2-9">新建广告位</el-menu-item></router-link>
           <router-link tag="div" to="/ads/info"><el-menu-item index="2-10">广告列表</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>廖星宇</span>
    </el-header>
    <!-- 添加router-view挖一个坑，等同于使得其他代码能在此处执行 -->
    <router-view></router-view>
  </el-container>
</el-container>
</template>


<style>
  *{
    margin:0px;
    border:0px;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>


  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>