<template>
    <el-form ref="form" :model="form" :inline="true" :rules="rules">
        <el-form-item label="学生姓名" prop="name">
            <el-input v-model="form.name" :maxlength="10" @keyup.enter.native="seatchHandle"></el-input>
        </el-form-item>
        <el-form-item label="家长姓名" prop="parentName">
            <el-input v-model="form.parentName" :maxlength="10" @keyup.enter.native="seatchHandle"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="class">
            <el-input v-model="form.class" :maxlength="5" @keyup.enter.native="seatchHandle"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="seatchHandle">搜索</el-button>
            <el-button @click="resetHandle">重置</el-button>
            <el-button @click="addInfoHandle">新增</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: '',
                parentName: '',
                class: ''
            },
            rules: {
                name: [{validator: this.validatorFn}],
                parentName: [{validator: this.validatorFn}],
                class: [{validator: this.validatorFn}]
            }
        }
    },
    methods: {
        // 中文校验
        validatorFn(rule, value, callback) {
            const reg = /^[\u4E00-\u9FA5]+$/g
            
            if (!reg.test(value) && value) {
                callback(new Error('只能输入中文'))
            } else {
                callback()
            }
        },
        // 搜索事件
        seatchHandle() {
            this.$emit('search', this.form)
        },
        // 重置事件
        resetHandle() {
            this.form = {
                name: '',
                parentName: '',
                class: '',
            }
            this.$emit('reset')
        },
        // 新增事件
        addInfoHandle() {
            this.$emit('add')
        }
    }
}
</script>

<style>

</style>