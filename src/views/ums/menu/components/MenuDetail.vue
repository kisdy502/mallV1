<template>
    <el-card class="form-container" shadow="never">
        <el-form :model="menu" :rules="rules" ref="menuFrom" label-width="150px">
            <el-form-item label="菜单名称：" prop="title">
                <el-input v-model="menu.title"></el-input>
            </el-form-item>
            <el-form-item label="上级菜单：">
                <el-select v-model="menu.parentId" placeholder="请选择菜单">
                    <el-option v-for="item in selectMenuList" :key="item.id" :label="item.title" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="前端名称：" prop="name">
                <el-input v-model="menu.name"></el-input>
            </el-form-item>
            <el-form-item label="前端图标：" prop="icon">
                <el-input v-model="menu.icon" style="width: 80%"></el-input>
                <svg-icon style="margin-left: 8px" :name="menu.icon"></svg-icon>
            </el-form-item>
            <el-form-item label="是否显示：">
                <el-radio-group v-model="menu.hidden">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序：">
                <el-input v-model="menu.sort"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('menuFrom')">提交</el-button>
                <el-button v-if="!isEdit" @click="resetForm('menuFrom')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script type="text/javascript">
import { fetchList, createMenu, updateMenu, getMenu } from '@/api/menu';
const defaultMenu = {
    title: '',
    parentId: 0,
    name: '',
    icon: '',
    hidden: 0,
    sort: 0
};

export default {
    name: "MenuDetail",
    props: {
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            menu: Object.assign({}, defaultMenu),
            selectMenuList: [],
            rules: {
                title: [
                    { required: true, message: '请输入菜单名称', trigger: 'blur' },
                    { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入前端名称', trigger: 'blur' },
                    { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
                ],
                icon: [
                    { required: true, message: '请输入前端图标', trigger: 'blur' },
                    { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        if (this.isEdit) {
            getMenu(this.$route.query.id).then(response => {
                this.menu = response.data;
            });
        } else {
            this.menu = Object.assign({}, defaultMenu);
        }
        this.getSelectMenuList();
    },
    methods: {
        getSelectMenuList() {
            fetchList(0, { pageSize: 100, pageNum: 1 }).then(response => {
                this.selectMenuList = response.data.list;
                this.selectMenuList.unshift({ id: 0, title: '无上级菜单' });
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.menu = Object.assign({}, defaultMenu);
            this.getSelectMenuList();
        },
    }

}
</script>

<style lang="stylus" scoped>
</style>
