<template>
  <el-card class="swiper-container">
    <template #header>
      <div class="header">
        <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon>增加</el-button>
        <el-popconfirm
          title="确定删除吗？"
          confirm-button-text="确定"
          cancel-button-text="取消"
          @confirm="handleDelete"
        >
          <template #reference>
            <el-button type="danger"><el-icon><Delete /></el-icon>批量删除</el-button>
          </template>
        </el-popconfirm>
      </div>
    </template>
    <el-table
      v-loading="loading"
      ref="multipleTalble"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
     >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="轮播图"
        width="200">
        <template #default="scope">
          <img style="width: 150px;height: 150px" :src="scope.row.carouselUrl" alt="轮播图">
        </template>
      </el-table-column>
      <el-table-column
        label="跳转链接"
        >
        <template #default="scope">
          <a target="_blank" :href="scope.row.redirectUrl">{{ scope.row.redirectUrl }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="carouselRank"
        label="排序值"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="添加时间"
        width="200"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="100"
      >
        <template #default="scope">
          <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.configId)">修改</a>
          <el-popconfirm
            title="确定删除吗？"
            confirmButtonText='确定'
            cancelButtonText='取消'
            @confirm="handleDeleteOne(scope.row.configId)"
          >
            <template #reference>
              <a style="cursor: pointer">删除</a>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="changePage"
    />
  </el-card>
  <DialogAddSwiper ref='addSwiper' :reload="getCarousels" :type="type" />
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import DialogAddSwiper from '@/components/DialogAddSwiper.vue'
import axios from '@/utils/axios'
export default {
  name: 'Swiper',
  components: {
    DialogAddSwiper
  },
  setup() {
    const addSwiper = ref(null)
    const state = reactive({
      loading: false, // 控制加载动画
      tableData: [], // 数据列表
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页请求数
      type: 'add', // 操作类型
      multipleSelection: [], // 选中项
      total: 0, // 总条数
    })
    
     onMounted(() => {
      getCarousels()
    })
    // 获取轮播图列表
    const getCarousels = () => {
      state.loading = true
      axios.get('/carousels', {
        params: {
          pageNumber: state.currentPage,
          pageSize: state.pageSize
        }
      }).then(res => {
        state.tableData = res.list
        state.total = res.totalCount
        state.currentPage = res.currPage
        state.loading = false
      })
    }
    const changePage = (val) => {
      state.currentPage = val
      getCarousels()
    }
    // 添加轮播项
    const handleAdd = () => {
      state.type = 'add'
      addSwiper.value.open()
    }
    // 修改轮播图
    const handleEdit = (id) => {
      state.type = 'edit'
      addSwiper.value.open(id)
    }
    // 选中之后的change方法，一旦选项有变化，就会触发该方法
    const handleSelectionChange = (val) => {
      state.multipleSelection = val
    }
    // 批量删除
    const handleDelete = () => {
      if (!state.multipleSelection.length) {
        ElMessage.error('请选择项')
        return
      }
      axios.delete('/carousels', {
        data: {
          ids: state.multipleSelection.map(i => i.carouselId)
        }
      }).then(() => {
        ElMessage.success('删除成功')
        getCarousels()
      })
    }
    const handleDeleteOne = (id) => {
        axios.delete('/carousels', {
          data: {
            ids: [id]
          }
        }).then(() => {
          ElMessage.success('删除成功')
          getIndexConfig()
        })
      }
    return {
      ...toRefs(state),
      addSwiper,
      handleAdd,
      handleEdit,
      getCarousels,
      handleSelectionChange,
      handleDelete,
      handleDeleteOne,
      changePage,
    }
  }
}
</script>