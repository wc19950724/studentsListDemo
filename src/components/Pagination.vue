<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[5, 10, 20, 50]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
    props: ['total', 'data'],
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val
            this.$parent.listData = this.$parent.sliceDataHandle(this.data)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val
            this.$parent.listData = this.$parent.sliceDataHandle(this.data)
        }
    }
}
</script>

<style>

</style>