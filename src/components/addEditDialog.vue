<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    destroy-on-close
    width="400px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form ref="form" :model="form" :rules="rules" :inline="true" label-width="80px">
        <el-form-item prop="name" label="学生姓名">
            <el-input v-model="form.name" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item prop="parentName" label="家长姓名">
            <el-input v-model="form.parentName" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item prop="class" label="班级">
            <el-input v-model="form.class" maxlength="5"></el-input>
        </el-form-item>
    </el-form>

    <template slot="footer">
        <el-button type="primary" @click="saveHandle" :loading="saveLoading">保存</el-button>
        <el-button @click="cancelHandle">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import Mock from 'mockjs';
export default {
    props: ['clickType', 'row'],
    data() {
        return {
            title: '',
            dialogVisible: false,
            form: {
                name: '',
                parentName: '',
                class: '',
            },
            rules: {
                name: [{required: true, validator: this.validatorFn}],
                parentName: [{required: true, validator: this.validatorFn}],
                class: [{required: true, validator: this.validatorFn}]
            },
            saveLoading: false,
            requestUrl: '',
        }
    },
    mounted() {
        
    },
    methods: {
        validatorFn(rule, value, callback) {
            const reg = /^[\u4E00-\u9FA5]+$/g
            if (!value) {
                callback(new Error('必填'))
            } else if (!reg.test(value)) {
                callback(new Error('只能输入中文'))
            } else {
                callback()
            }
        },
        saveHandle() {
            if (!this.requestUrl) {
                this.$message({
                    type: 'error',
                    message: '请求地址不存在！'
                })
                return
            }
            this.$refs['form'].validate(valid => {
                if (valid) {
                    this.saveLoading = true
                    const params = {
                        ...this.form,
                    }
                    if (this.row) {
                        params.id = this.row.id
                    } else {
                        params.id = Mock.mock('@id')
                    }
                    this.$axios.post(this.requestUrl, params).then(res => {
                        if (res.status === 200) {
                            this.$emit('save', res.data.data)
                            this.resetFormHandle()
                        }
                    })
                }
            })
            
        },
        cancelHandle() {
            this.resetFormHandle()
        },
        resetFormHandle() {
            if (this.row) {
                this.form = {
                    name: this.row.name,
                    parentName: this.row.parentName,
                    class: this.row.class,
                }
            } else {
                this.form = {
                    name: '',
                    parentName: '',
                    class: '',
                }
            }
            this.saveLoading = false
            this.dialogVisible = false
        }
    },
    watch: {
        clickType(val) {
            switch (this.clickType) {
                case 'add':
                    this.title = '新增'
                    this.form = {
                        name: '',
                        parentName: '',
                        class: '',
                    }
                    this.requestUrl = '/listAdd'
                    break;
                case 'edit':
                    this.title = '修改'
                    this.form = {
                        name: this.row.name,
                        parentName: this.row.parentName,
                        class: this.row.class
                    }
                    this.requestUrl = '/listUpdate'
                    break;
                default:
                    this.title = ''
                    this.requestUrl = ''
                    break;
            }
        }
    }
}
</script>

<style>

</style>