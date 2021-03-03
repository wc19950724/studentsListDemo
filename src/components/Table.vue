<template>
  <div class="table-wrapper">
      <el-table :data="$parent.listData" border>
        <el-table-column prop="name" label="学生姓名" align="center"></el-table-column>
        <el-table-column prop="parentName" label="家长姓名" align="center"></el-table-column>
        <el-table-column prop="class" label="班级" align="center"></el-table-column>
        <el-table-column prop="oper" label="操作" align="center">
            <template slot-scope="scope">
                <el-button size="mini" @click="editHandle(scope.row)">修改</el-button>
                <el-button size="mini" type="danger" @click="deleteHandle(scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
    methods: {
        editHandle(row) {
            this.$emit('edit', row)
        },
        deleteHandle(row) {
            this.$emit('delete', row)
        }
    }
}
</script>

<style>
.table-wrapper {
}
</style>