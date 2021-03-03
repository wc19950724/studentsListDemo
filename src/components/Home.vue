<template>
  <div class="box-wrapper">
    <div class="search-wrapper">
        <seatch @search="seatchHandle" @reset="resetHandle" @add="addInfoHandle"/>
    </div>
    <div class="list-wrapper">
        <students-list @edit="editHandle" @delete="deleteHandle"/>
    </div>
    <div class="pagination-wrapper">
        <pagination ref="pagination" :total="allData.length" :data="allData"/>
    </div>
    <add-edit-dialog ref="addEditDialog" :clickType="clickType" :row="rowData" @save="saveHandle"/>
  </div>
</template>

<script>
import Seatch from './Search';
import StudentsList from './Table';
import AddEditDialog from './addEditDialog';
import Pagination from './Pagination';
export default {
    components: {
        Seatch,
        StudentsList,
        AddEditDialog,
        Pagination
    },
    data() {
        return {
            allData: [], // 所有数据
            listData: [], // 当前页数据

            clickType: null, // 区分新增和编辑类型

            rowData: null, // 编辑传入数据
        }
    },
    mounted() {
        this.getListHandle()
    },
    methods: {
        // 获取初始数据
        getListHandle() {
            this.$axios.get('/list').then(res => {
                if (res.status === 200) {
                    this.listData = this.sliceDataHandle(res.data.data)
                }
            })
        },
        // 搜索事件
        seatchHandle(form) {
            this.$axios.post('/listSearch', form).then(res => {
                if (res.status === 200) {
                    this.listData = this.sliceDataHandle(res.data.data)
                }
            })
        },
        // 重置事件
        resetHandle() {
            this.getListHandle()
        },
        // 添加事件
        addInfoHandle() {
            this.clickType = 'add'
            this.$refs['addEditDialog'].dialogVisible = true
        },
        // 编辑事件
        editHandle(row) {
            this.clickType = 'edit'
            this.rowData = row
            this.$refs['addEditDialog'].dialogVisible = true
        },
        // 添加、编辑保存事件
        saveHandle(data) {
            this.listData = this.sliceDataHandle(data)
            this.clickType = null
            this.rowData = null
        },
        // 删除事件
        deleteHandle(row) {
            this.$confirm('确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('/list', row).then(res => {
                    if (res.status === 200) {
                        this.listData = this.sliceDataHandle(res.data.data)
                    }
                })
            })
        },
        // 根据分页, 截取数据长度
        sliceDataHandle(arr) {
            this.allData = arr
            const pageSize = this.$refs['pagination'].pageSize || 10
            const currentPage = this.$refs['pagination'].currentPage || 1
            const start = (currentPage-1)*pageSize
            const end = currentPage*pageSize

            if (arr.length > start) {
                return arr.slice(start, end)
            }
            return arr
        }

    }
}
</script>

<style>
.box-wrapper {
    width: 100%;
    height: 100%;
    padding: 0 60px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.search-wrapper {
    margin: 40px auto 0;
}

.list-wrapper {
    flex: 1;
}

.pagination-wrapper {
    text-align: right;
    margin: 10px 0;
}
</style>