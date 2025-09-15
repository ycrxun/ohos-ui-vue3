<template>
  <div class="min-h-screen bg-ohos-bg-primary">
    <!-- AppBar 组件 -->
    <OhosAppBar
        title="HarmonyOS UI 组件库"
        :actions="appBarActions"
        fixed
    >
      <template #actions>
        <button class="p-ohos-2 rounded-ohos-sm hover:bg-ohos-bg-secondary transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 7V13M10 13L12 11M10 13L8 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
          </svg>
        </button>
      </template>
    </OhosAppBar>

    <!-- 主要内容 -->
    <OhosContainer size="7xl" class="pt-ohos-6 pb-ohos-20">
      <!-- 按钮组件 -->
      <section class="mb-ohos-8">
        <h2 class="text-ohos-lg mb-ohos-4 flex items-center">
          <span class="w-2 h-6 bg-ohos-primary rounded-full mr-ohos-2"></span>
          按钮组件
        </h2>
        <div class="p-ohos-4 bg-ohos-bg-secondary/50 rounded-ohos">
          <div class="flex flex-wrap gap-ohos-3 mb-ohos-4">
            <OhosButton type="primary">主要按钮</OhosButton>
            <OhosButton type="secondary">次要按钮</OhosButton>
            <OhosButton type="text">文本按钮</OhosButton>
            <OhosButton type="primary" disabled>禁用按钮</OhosButton>
          </div>

          <div class="flex flex-wrap gap-ohos-3">
            <OhosButton type="primary" size="small">小按钮</OhosButton>
            <OhosButton type="primary" size="medium">中按钮</OhosButton>
            <OhosButton type="primary" size="large">大按钮</OhosButton>
          </div>
        </div>
      </section>

      <!-- 输入框和开关组件 -->
      <section class="mb-ohos-8">
        <h2 class="text-ohos-lg mb-ohos-4 flex items-center">
          <span class="w-2 h-6 bg-ohos-primary rounded-full mr-ohos-2"></span>
          输入框和开关组件
        </h2>
        <div class="p-ohos-4 bg-ohos-bg-secondary/50 rounded-ohos">
          <div class="space-y-ohos-4 max-w-md">
            <div>
              <label class="block text-ohos-sm mb-ohos-1">普通输入框</label>
              <OhosInput v-model="inputValue" placeholder="请输入内容"/>
            </div>

            <div>
              <label class="block text-ohos-sm mb-ohos-1">密码输入框</label>
              <OhosInput v-model="passwordValue" type="password" placeholder="请输入密码"/>
            </div>
            <div>
              <label class="block text-ohos-sm mb-ohos-1">禁用输入框</label>
              <OhosInput v-model="disabledInputValue" placeholder="禁用状态" disabled/>
            </div>

            <div class="flex items-center">
              <OhosSwitch v-model="switchValue"/>
              <span class="ml-ohos-2 text-ohos-sm">开关 {{ switchValue ? '开启' : '关闭' }}</span>
            </div>

            <div class="flex items-center">
              <OhosSwitch v-model="disabledSwitchValue" disabled/>
              <span class="ml-ohos-2 text-ohos-sm">禁用开关</span>
            </div>

            <div class="button"></div>
            <OhosDialog closable title="我是标题啊" v-model="switchValue"></OhosDialog>
          </div>
        </div>

      </section>

      <!-- 选择器和标签组件 -->
      <section class="mb-ohos-8">
        <h2 class="text-ohos-lg mb-ohos-4 flex items-center">
          <span class="w-2 h-6 bg-ohos-primary rounded-full mr-ohos-2"></span>
          选择器和标签组件
        </h2>
        <div class="p-ohos-4 bg-ohos-bg-secondary/50 rounded-ohos">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-ohos-4">
            <div>
              <label class="block text-ohos-sm mb-ohos-1">下拉选择器</label>
              <OhosSelect
                  v-model="selectValue"
                  :options="selectOptions"
                  placeholder="请选择"
              />
            </div>

            <div>
              <label class="block text-ohos-sm mb-ohos-1">标签示例</label>
              <div class="flex flex-wrap gap-ohos-2 mt-ohos-1">
                <OhosTag>标签1</OhosTag>
                <OhosTag type="primary">主要标签</OhosTag>
                <OhosTag type="success">成功标签</OhosTag>
                <OhosTag type="warning">警告标签</OhosTag>
                <OhosTag type="danger" closable @close="handleTagClose">可关闭标签</OhosTag>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 表格组件 -->
      <section class="mb-ohos-8">
        <h2 class="text-ohos-lg mb-ohos-4 flex items-center">
          <span class="w-2 h-6 bg-ohos-primary rounded-full mr-ohos-2"></span>
          表格组件
        </h2>
        <div class="p-ohos-4 bg-ohos-bg-secondary/50 rounded-ohos">
          <OhosTable
              :data="tableData"
              :columns="tableColumns"
              keyField="id"
              :currentPage="tableCurrentPage"
              :pageSize="tablePageSize"
              @update:currentPage="tableCurrentPage = $event"
              @update:pageSize="tablePageSize = $event"
          />
        </div>
      </section>

      <!-- 图片上传组件 -->
      <section class="mb-ohos-8">
        <h2 class="text-ohos-lg mb-ohos-4 flex items-center">
          <span class="w-2 h-6 bg-ohos-primary rounded-full mr-ohos-2"></span>
          图片上传组件
        </h2>
        <div class="p-ohos-4 bg-ohos-bg-secondary/50 rounded-ohos">
          <OhosUpload
              v-model="uploadFiles"
              :multiple="true"
              :maxSize="5 * 1024 * 1024"
              @upload="handleFileUpload"
              @error="handleUploadError"
          />
        </div>
      </section>

      <section class="mb-ohos-8">
        <OhosCard header="我是标题">
          我可能是内容
          <OhosAvatar
              src="https://picsum.photos/id/1/200"
              name="张三"
              size="small"
              status="online"
          />
          <div slot="footer" class="mt-ohos-4 pt-ohos-3 border-t border-ohos-bg-tertiary flex justify-end gap-ohos-3">
            <OhosButton type="text" size="small">取消</OhosButton>
            <OhosButton type="primary" size="small">确认</OhosButton>
          </div>
        </OhosCard>
      </section>

      <section class="mb-ohos-8">
        <OhosCalendar></OhosCalendar>
        <OhosDateTimePicker type="date"></OhosDateTimePicker>
      </section>

      <!-- 图片查看器 + 头像组件 -->
      <section class="mb-ohos-8">
        <h2 class="text-ohos-lg mb-ohos-4 flex items-center">
          <span class="w-2 h-6 bg-ohos-primary rounded-full mr-ohos-2"></span>
          图片查看器 & 头像组件
        </h2>
        <div class="p-ohos-4 bg-ohos-bg-secondary/50 rounded-ohos">
          <div class="mb-ohos-6">
            <h3 class="text-ohos-sm font-medium mb-ohos-3">头像示例</h3>
            <div class="flex flex-wrap gap-ohos-4">
              <OhosAvatar
                  src="https://picsum.photos/id/1/200"
                  name="张三"
                  size="small"
                  status="online"
              />
              <OhosAvatar
                  src="https://picsum.photos/id/2/200"
                  name="李四"
                  size="medium"
                  status="away"
                  bordered
              />
              <OhosAvatar
                  src="https://picsum.photos/id/3/200"
                  name="王五"
                  size="large"
                  status="offline"
              />
              <OhosAvatar
                  name="赵六"
                  size="xlarge"
                  uploadable
                  @upload="handleAvatarUpload"
              />
            </div>
          </div>

          <div>
            <h3 class="text-ohos-sm font-medium mb-ohos-3">图片查看器示例</h3>
            <div class="grid grid-cols-3 gap-ohos-2">
              <img
                  v-for="(img, index) in viewerImages"
                  :key="index"
                  :src="img"
                  alt="缩略图"
                  class="w-full aspect-square object-cover rounded-ohos cursor-pointer"
                  @click="openImageViewer(index)"
              >
            </div>
            <OhosImageViewer
                :visible="viewerVisible"
                :images="viewerImages"
                :initialIndex="viewerIndex"
                @update:visible="viewerVisible = $event"
            />
          </div>
        </div>
      </section>

      <!-- 布局组件 -->
      <section class="mb-ohos-8">
        <h2 class="text-ohos-lg mb-ohos-4 flex items-center">
          <span class="w-2 h-6 bg-ohos-primary rounded-full mr-ohos-2"></span>
          布局组件
        </h2>
        <div class="p-ohos-4 bg-ohos-bg-secondary/50 rounded-ohos">
          <h3 class="text-ohos-sm font-medium mb-ohos-3">栅格布局示例</h3>
          <OhosRow :gutter="16" justify="space-between" class="mb-ohos-4">
            <OhosCol :span="8">
              <div class="h-16 bg-ohos-primary/10 rounded-ohos flex items-center justify-center">span=8</div>
            </OhosCol>
            <OhosCol :span="8">
              <div class="h-16 bg-ohos-primary/10 rounded-ohos flex items-center justify-center">span=8</div>
            </OhosCol>
            <OhosCol :span="8">
              <div class="h-16 bg-ohos-primary/10 rounded-ohos flex items-center justify-center">span=8</div>
            </OhosCol>
          </OhosRow>

          <OhosDivider hasText text="分隔线示例" dashed/>
        </div>
      </section>
    </OhosContainer>

    <!-- 底部导航栏 -->
    <OhosNavBar
        :items="navBarItems"
        fixed
        @change="handleNavChange"
    />
  </div>
</template>

<script setup lang="ts">
import {h, ref} from 'vue'
// 导入所有组件
import OhosButton from './components/base/OhosButton.vue'
import OhosInput from './components/base/OhosInput.vue'
import OhosSwitch from './components/base/OhosSwitch.vue'
import OhosSelect from './components/base/OhosSelect.vue'
import OhosTag from './components/base/OhosTag.vue'
import OhosTable from './components/base/OhosTable.vue'
import OhosUpload from './components/base/OhosUpload.vue'
import OhosImageViewer from './components/base/OhosImageViewer.vue'
import OhosAvatar from './components/base/OhosAvatar.vue'
import OhosAppBar from './components/layout/OhosAppBar.vue'
import OhosNavBar from './components/layout/OhosNavBar.vue'
import OhosRow from './components/layout/OhosRow.vue'
import OhosCol from './components/layout/OhosCol.vue'
import OhosContainer from './components/layout/OhosContainer.vue'
import OhosDivider from './components/layout/OhosDivider.vue'
import OhosCalendar from "@/components/date/OhosCalendar.vue";
import OhosDatePicker from "@/components/date/OhosDatePicker.vue";
import OhosDateTimePicker from "@/components/date/OhosDateTimePicker.vue";
import OhosCard from "@/components/layout/OhosCard.vue";
import OhosDialog from "@/components/base/OhosDialog.vue";

// 输入框示例数据
const inputValue = ref('')
const passwordValue = ref('')
const disabledInputValue = ref('不可编辑')

// 开关示例数据
const switchValue = ref(true)
const disabledSwitchValue = ref(false)

// 选择器示例数据
const selectValue = ref('')
const selectOptions = ref([
  {label: '选项1', value: '1'},
  {label: '选项2', value: '2'},
  {label: '选项3', value: '3'}
])

// 标签示例方法
const handleTagClose = () => {
  console.log('标签被关闭')
}

// 表格数据
const tableData = ref([
  {id: 1, name: '张三', age: 28, gender: '男', department: '技术部'},
  {id: 2, name: '李四', age: 32, gender: '女', department: '市场部'},
  {id: 3, name: '王五', age: 45, gender: '男', department: '产品部'},
  {id: 4, name: '赵六', age: 24, gender: '女', department: '技术部'},
  {id: 5, name: '钱七', age: 36, gender: '男', department: '财务部'}
])

const tableColumns = ref([
  {key: 'name', title: '姓名', sortable: true},
  {key: 'age', title: '年龄', sortable: true},
  {key: 'gender', title: '性别'},
  {key: 'department', title: '部门', sortable: true},
  {
    key: 'operation',
    title: '操作',
    render: () => h(
        'button', // 标签名
        {
          class: 'text-ohos-primary text-ohos-sm' // 属性/样式
        },
        '编辑' // 文本内容
    )
  }
])

const tableCurrentPage = ref(1)
const tablePageSize = ref(5)

interface UploadFile {
  uid: string | number; // 唯一标识
  name: string; // 文件名
  size?: number; // 文件大小
  type?: string; // 文件类型
  url?: string; // 文件路径（上传后返回的地址）
  status?: 'ready' | 'uploading' | 'success' | 'error'; // 上传状态
  raw?: File; // 原生File对象（可选，用于保存原始文件）
  // 其他可能的属性（如百分比、响应数据等）
}

// 图片上传
const uploadFiles = ref<UploadFile[]>([])

const handleFileUpload = (files: File[]) => {
  console.log('上传文件:', files)
  // 模拟上传成功
  setTimeout(() => {
    uploadFiles.value = uploadFiles.value.map(file => ({
      ...file,
      status: 'success'
    }))
  }, 1000)
}

const handleUploadError = (message: string) => {
  console.error('上传错误:', message)
}

// 头像上传
const handleAvatarUpload = (file: File) => {
  console.log('上传头像:', file)
}

// 图片查看器
const viewerImages = ref([
  'https://picsum.photos/id/237/800/600',
  'https://picsum.photos/id/238/800/600',
  'https://picsum.photos/id/239/800/600',
])

const viewerVisible = ref(false)
const viewerIndex = ref(0)

const openImageViewer = (index: number) => {
  viewerIndex.value = index
  viewerVisible.value = true
}

// AppBar 操作
const appBarActions = ref([
  {
    icon: 'M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z',
    handler: () => console.log('点击了搜索按钮')
  }
])

// 导航栏
const navBarItems = ref([
  {
    text: '首页',
    icon: 'M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z',
    active: true
  },
  {
    text: '组件',
    icon: 'M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 15C8 13.8954 8.89543 13 10 13H14C15.1046 13 16 13.8954 16 15C16 16.1046 15.1046 17 14 17H10C8.89543 17 8 16.1046 8 15ZM10 11C8.89543 11 8 10.1046 8 9C8 7.89543 8.89543 7 10 7H14C15.1046 7 16 7.89543 16 9C16 10.1046 15.1046 11 14 11H10Z',
    active: false
  },
  {
    text: '我的',
    icon: 'M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4Z',
    active: false
  }
])

const handleNavChange = (index: number) => {
  navBarItems.value = navBarItems.value.map((item, i) => ({
    ...item,
    active: i === index
  }))
}
</script>
    