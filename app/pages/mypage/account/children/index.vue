<template>
  <div class="children-account-page">
    <h1>子アカウント管理</h1>

    <div class="page-header">
      <div class="account-summary">
        <p>登録済み: <strong>{{ childAccounts.length }}名</strong></p>
        <p class="limit-info">（上限: {{ accountLimit }}名）</p>
      </div>
      <button 
        class="btn btn-primary" 
        @click="openAddModal"
        :disabled="childAccounts.length >= accountLimit"
      >
        + 新規追加
      </button>
    </div>

    <!-- 子アカウント一覧 -->
    <div class="account-list">
      <div v-for="account in childAccounts" :key="account.id" class="account-card">
        <div class="account-header">
          <div class="account-info">
            <span class="account-name">{{ account.lastName }} {{ account.firstName }}</span>
            <span :class="['status-badge', account.status]">{{ getStatusLabel(account.status) }}</span>
          </div>
          <div class="account-actions">
            <button class="btn-icon" @click="openEditModal(account)" title="編集">✏️</button>
            <button class="btn-icon" @click="openPermissionModal(account)" title="権限設定">🔑</button>
            <button class="btn-icon danger" @click="confirmDelete(account)" title="削除">🗑️</button>
          </div>
        </div>

        <div class="account-body">
          <div class="info-grid">
            <div class="info-item">
              <span class="label">メールアドレス</span>
              <span class="value">{{ account.email }}</span>
            </div>
            <div class="info-item">
              <span class="label">役職</span>
              <span class="value">{{ getPositionLabel(account.position) }}</span>
            </div>
            <div class="info-item">
              <span class="label">部署</span>
              <span class="value">{{ account.department || '未設定' }}</span>
            </div>
            <div class="info-item">
              <span class="label">登録日</span>
              <span class="value">{{ account.createdAt }}</span>
            </div>
          </div>

          <div class="permission-summary">
            <span class="permission-label">権限:</span>
            <span 
              v-for="perm in account.permissions" 
              :key="perm" 
              class="permission-tag"
            >
              {{ getPermissionLabel(perm) }}
            </span>
          </div>
        </div>

        <div class="account-footer">
          <span class="last-login">最終ログイン: {{ account.lastLogin || '未ログイン' }}</span>
          <button 
            v-if="account.status === 'pending'"
            class="btn btn-secondary btn-small"
            @click="resendInvite(account.id)"
          >
            招待メール再送
          </button>
        </div>
      </div>

      <div v-if="childAccounts.length === 0" class="empty-state">
        <p>子アカウントはまだ登録されていません</p>
        <button class="btn btn-primary" @click="openAddModal">子アカウントを追加する</button>
      </div>
    </div>

    <!-- 新規追加モーダル -->
    <div v-if="isAddModalOpen" class="modal">
      <div class="modal-overlay" @click="closeAddModal"></div>
      <div class="modal-container">
        <div class="modal-header">
          <h3>子アカウント新規追加</h3>
          <button class="close-btn" @click="closeAddModal">✕</button>
        </div>

        <form class="modal-body" @submit.prevent="handleAdd">
          <div class="form-group">
            <label>担当者名 <span class="required">必須</span></label>
            <div class="name-inputs">
              <input type="text" v-model="addForm.lastName" placeholder="姓">
              <input type="text" v-model="addForm.firstName" placeholder="名">
            </div>
          </div>

          <div class="form-group">
            <label>担当者名（カナ） <span class="required">必須</span></label>
            <div class="name-inputs">
              <input type="text" v-model="addForm.lastNameKana" placeholder="セイ">
              <input type="text" v-model="addForm.firstNameKana" placeholder="メイ">
            </div>
          </div>

          <div class="form-group">
            <label>メールアドレス <span class="required">必須</span></label>
            <input type="email" v-model="addForm.email" placeholder="example@company.com">
            <p class="form-hint">招待メールが送信されます</p>
          </div>

          <div class="form-group">
            <label>役職</label>
            <select v-model="addForm.position">
              <option value="">選択してください</option>
              <option value="none">役職なし</option>
              <option value="leader">係長／リーダークラス</option>
              <option value="manager">課長／マネージャークラス</option>
              <option value="general_manager">部長／ゼネラルマネージャークラス</option>
              <option value="executive">役員クラス</option>
            </select>
          </div>

          <div class="form-group">
            <label>部署</label>
            <input type="text" v-model="addForm.department" placeholder="人事部">
          </div>

          <div class="form-group">
            <label>権限設定 <span class="required">必須</span></label>
            <div class="permission-options">
              <label v-for="perm in permissionOptions" :key="perm.value" class="permission-option">
                <input type="checkbox" :value="perm.value" v-model="addForm.permissions">
                <div class="permission-content">
                  <span class="permission-name">{{ perm.label }}</span>
                  <span class="permission-desc">{{ perm.description }}</span>
                </div>
              </label>
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" @click="closeAddModal">キャンセル</button>
            <button type="submit" class="btn btn-primary" :disabled="!isAddFormValid">追加する</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 編集モーダル -->
    <div v-if="isEditModalOpen" class="modal">
      <div class="modal-overlay" @click="closeEditModal"></div>
      <div class="modal-container">
        <div class="modal-header">
          <h3>子アカウント編集</h3>
          <button class="close-btn" @click="closeEditModal">✕</button>
        </div>

        <form class="modal-body" @submit.prevent="handleEdit">
          <div class="form-group">
            <label>担当者名 <span class="required">必須</span></label>
            <div class="name-inputs">
              <input type="text" v-model="editForm.lastName" placeholder="姓">
              <input type="text" v-model="editForm.firstName" placeholder="名">
            </div>
          </div>

          <div class="form-group">
            <label>担当者名（カナ） <span class="required">必須</span></label>
            <div class="name-inputs">
              <input type="text" v-model="editForm.lastNameKana" placeholder="セイ">
              <input type="text" v-model="editForm.firstNameKana" placeholder="メイ">
            </div>
          </div>

          <div class="form-group">
            <label>メールアドレス <span class="required">必須</span></label>
            <input type="email" v-model="editForm.email" placeholder="example@company.com">
          </div>

          <div class="form-group">
            <label>役職</label>
            <select v-model="editForm.position">
              <option value="">選択してください</option>
              <option value="none">役職なし</option>
              <option value="leader">係長／リーダークラス</option>
              <option value="manager">課長／マネージャークラス</option>
              <option value="general_manager">部長／ゼネラルマネージャークラス</option>
              <option value="executive">役員クラス</option>
            </select>
          </div>

          <div class="form-group">
            <label>部署</label>
            <input type="text" v-model="editForm.department" placeholder="人事部">
          </div>

          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" @click="closeEditModal">キャンセル</button>
            <button type="submit" class="btn btn-primary">保存する</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 権限設定モーダル -->
    <div v-if="isPermissionModalOpen" class="modal">
      <div class="modal-overlay" @click="closePermissionModal"></div>
      <div class="modal-container">
        <div class="modal-header">
          <h3>権限設定</h3>
          <button class="close-btn" @click="closePermissionModal">✕</button>
        </div>

        <div class="modal-body">
          <p class="target-account">対象: {{ selectedAccount?.lastName }} {{ selectedAccount?.firstName }}</p>

          <div class="permission-options">
            <label v-for="perm in permissionOptions" :key="perm.value" class="permission-option">
              <input type="checkbox" :value="perm.value" v-model="permissionForm.permissions">
              <div class="permission-content">
                <span class="permission-name">{{ perm.label }}</span>
                <span class="permission-desc">{{ perm.description }}</span>
              </div>
            </label>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" @click="closePermissionModal">キャンセル</button>
            <button type="button" class="btn btn-primary" @click="handlePermissionSave">保存する</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 削除確認モーダル -->
    <div v-if="isDeleteModalOpen" class="modal">
      <div class="modal-overlay" @click="closeDeleteModal"></div>
      <div class="modal-container modal-small">
        <div class="modal-header">
          <h3>アカウント削除</h3>
          <button class="close-btn" @click="closeDeleteModal">✕</button>
        </div>

        <div class="modal-body">
          <p class="delete-warning">以下のアカウントを削除しますか？</p>
          <p class="delete-target">{{ selectedAccount?.lastName }} {{ selectedAccount?.firstName }}</p>
          <p class="delete-note">※この操作は取り消せません</p>

          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" @click="closeDeleteModal">キャンセル</button>
            <button type="button" class="btn btn-danger" @click="handleDelete">削除する</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mypage'
})

const accountLimit = 10

const permissionOptions = [
  { value: 'matching', label: 'マッチング閲覧', description: 'マッチング候補を閲覧できます' },
  { value: 'offer', label: 'オファー管理', description: 'オファーの作成・管理ができます' },
  { value: 'negotiation', label: '交渉管理', description: '交渉のやり取りができます' },
  { value: 'billing', label: '請求閲覧', description: '請求情報を閲覧できます' },
  { value: 'corporate', label: '法人情報編集', description: '法人情報を編集できます' },
  { value: 'account', label: 'アカウント管理', description: '子アカウントの管理ができます' }
]

const childAccounts = ref([
  {
    id: 1,
    lastName: '佐藤',
    firstName: '花子',
    lastNameKana: 'サトウ',
    firstNameKana: 'ハナコ',
    email: 'sato@example.com',
    position: 'leader',
    department: '人事部',
    status: 'active',
    permissions: ['matching', 'offer'],
    createdAt: '2024-01-10',
    lastLogin: '2024-01-16 09:30'
  },
  {
    id: 2,
    lastName: '鈴木',
    firstName: '一郎',
    lastNameKana: 'スズキ',
    firstNameKana: 'イチロウ',
    email: 'suzuki@example.com',
    position: 'manager',
    department: '営業部',
    status: 'active',
    permissions: ['matching', 'offer', 'negotiation'],
    createdAt: '2024-01-12',
    lastLogin: '2024-01-15 18:00'
  },
  {
    id: 3,
    lastName: '田中',
    firstName: '次郎',
    lastNameKana: 'タナカ',
    firstNameKana: 'ジロウ',
    email: 'tanaka@example.com',
    position: 'none',
    department: '',
    status: 'pending',
    permissions: ['matching'],
    createdAt: '2024-01-15',
    lastLogin: null
  }
])

// モーダル状態
const isAddModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isPermissionModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectedAccount = ref<any>(null)

// フォーム
const addForm = reactive({
  lastName: '',
  firstName: '',
  lastNameKana: '',
  firstNameKana: '',
  email: '',
  position: '',
  department: '',
  permissions: [] as string[]
})

const editForm = reactive({
  id: 0,
  lastName: '',
  firstName: '',
  lastNameKana: '',
  firstNameKana: '',
  email: '',
  position: '',
  department: ''
})

const permissionForm = reactive({
  permissions: [] as string[]
})

const isAddFormValid = computed(() => {
  return addForm.lastName && 
         addForm.firstName && 
         addForm.lastNameKana && 
         addForm.firstNameKana && 
         addForm.email && 
         addForm.permissions.length > 0
})

// ラベル取得
const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    active: '有効',
    pending: '招待中',
    inactive: '無効'
  }
  return labels[status] || status
}

const getPositionLabel = (position: string) => {
  const labels: Record<string, string> = {
    none: '役職なし',
    leader: '係長／リーダークラス',
    manager: '課長／マネージャークラス',
    general_manager: '部長／ゼネラルマネージャークラス',
    executive: '役員クラス'
  }
  return labels[position] || '未設定'
}

const getPermissionLabel = (perm: string) => {
  const option = permissionOptions.find(p => p.value === perm)
  return option?.label || perm
}

// モーダル操作
const openAddModal = () => {
  isAddModalOpen.value = true
}

const closeAddModal = () => {
  isAddModalOpen.value = false
  addForm.lastName = ''
  addForm.firstName = ''
  addForm.lastNameKana = ''
  addForm.firstNameKana = ''
  addForm.email = ''
  addForm.position = ''
  addForm.department = ''
  addForm.permissions = []
}

const openEditModal = (account: any) => {
  selectedAccount.value = account
  editForm.id = account.id
  editForm.lastName = account.lastName
  editForm.firstName = account.firstName
  editForm.lastNameKana = account.lastNameKana
  editForm.firstNameKana = account.firstNameKana
  editForm.email = account.email
  editForm.position = account.position
  editForm.department = account.department
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
  selectedAccount.value = null
}

const openPermissionModal = (account: any) => {
  selectedAccount.value = account
  permissionForm.permissions = [...account.permissions]
  isPermissionModalOpen.value = true
}

const closePermissionModal = () => {
  isPermissionModalOpen.value = false
  selectedAccount.value = null
}

const confirmDelete = (account: any) => {
  selectedAccount.value = account
  isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
  selectedAccount.value = null
}

// 操作
const handleAdd = () => {
  console.log('追加:', addForm)
  childAccounts.value.push({
    id: Date.now(),
    lastName: addForm.lastName,
    firstName: addForm.firstName,
    lastNameKana: addForm.lastNameKana,
    firstNameKana: addForm.firstNameKana,
    email: addForm.email,
    position: addForm.position,
    department: addForm.department,
    status: 'pending',
    permissions: [...addForm.permissions],
    createdAt: new Date().toISOString().split('T')[0],
    lastLogin: null
  })
  alert('招待メールを送信しました')
  closeAddModal()
}

const handleEdit = () => {
  console.log('編集:', editForm)
  const account = childAccounts.value.find(a => a.id === editForm.id)
  if (account) {
    account.lastName = editForm.lastName
    account.firstName = editForm.firstName
    account.lastNameKana = editForm.lastNameKana
    account.firstNameKana = editForm.firstNameKana
    account.email = editForm.email
    account.position = editForm.position
    account.department = editForm.department
  }
  alert('保存しました')
  closeEditModal()
}

const handlePermissionSave = () => {
  console.log('権限保存:', permissionForm.permissions)
  if (selectedAccount.value) {
    const account = childAccounts.value.find(a => a.id === selectedAccount.value.id)
    if (account) {
      account.permissions = [...permissionForm.permissions]
    }
  }
  alert('権限を保存しました')
  closePermissionModal()
}

const handleDelete = () => {
  console.log('削除:', selectedAccount.value)
  childAccounts.value = childAccounts.value.filter(a => a.id !== selectedAccount.value.id)
  alert('削除しました')
  closeDeleteModal()
}

const resendInvite = (id: number) => {
  console.log('招待メール再送:', id)
  alert('招待メールを再送しました')
}
</script>

<style lang="scss" scoped>
.children-account-page {
  max-width: 900px;

  h1 {
    margin-bottom: 24px;
    font-size: 24px;
    color: #1e3a5f;
  }
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .account-summary {
    display: flex;
    align-items: center;
    gap: 8px;

    p {
      font-size: 14px;
      color: #64748b;

      strong {
        color: #1e3a5f;
      }
    }

    .limit-info {
      font-size: 13px;
      color: #94a3b8;
    }
  }
}

.account-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.account-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.account-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;

  .account-info {
    display: flex;
    align-items: center;
    gap: 12px;

    .account-name {
      font-size: 16px;
      font-weight: 600;
      color: #1e3a5f;
    }
  }

  .account-actions {
    display: flex;
    gap: 8px;
  }
}

.btn-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }

  &.danger:hover {
    background: #fee2e2;
    border-color: #fecaca;
  }
}

.status-badge {
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px;

  &.active {
    background: #d1fae5;
    color: #059669;
  }

  &.pending {
    background: #fef3c7;
    color: #d97706;
  }

  &.inactive {
    background: #e2e8f0;
    color: #64748b;
  }
}

.account-body {
  padding: 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }

  .info-item {
    .label {
      display: block;
      font-size: 12px;
      color: #94a3b8;
      margin-bottom: 4px;
    }

    .value {
      font-size: 14px;
      color: #1e3a5f;
    }
  }
}

.permission-summary {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  .permission-label {
    font-size: 13px;
    color: #64748b;
  }

  .permission-tag {
    padding: 4px 10px;
    background: #eff6ff;
    color: #3b82f6;
    font-size: 12px;
    border-radius: 12px;
  }
}

.account-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-top: 1px solid #e2e8f0;

  .last-login {
    font-size: 12px;
    color: #94a3b8;
  }
}

.empty-state {
  background: #fff;
  padding: 48px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #e2e8f0;

  p {
    color: #94a3b8;
    margin-bottom: 16px;
  }
}

/* モーダル */
.modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.modal-container {
  position: relative;
  width: 90%;
  max-width: 560px;
  max-height: 90vh;
  background: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &.modal-small {
    max-width: 400px;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;

  h3 {
    font-size: 18px;
    color: #1e3a5f;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 20px;
    color: #94a3b8;
    cursor: pointer;

    &:hover {
      color: #1e3a5f;
    }
  }
}

.modal-body {
  padding: 24px 20px;
  overflow-y: auto;

  .form-group {
    margin-bottom: 20px;

    &:last-of-type {
      margin-bottom: 0;
    }

    label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #1e3a5f;
      margin-bottom: 8px;

      .required {
        color: #dc2626;
        font-size: 12px;
        margin-left: 4px;
      }
    }

    input, select {
      width: 100%;
      padding: 12px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: 14px;

      &:focus {
        outline: none;
        border-color: #3b82f6;
      }
    }

    .form-hint {
      font-size: 12px;
      color: #94a3b8;
      margin-top: 6px;
    }
  }
}

.name-inputs {
  display: flex;
  gap: 12px;

  input {
    flex: 1;
  }
}

.permission-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.permission-option {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 6px;
  cursor: pointer;

  input {
    width: 18px;
    height: 18px;
    margin-top: 2px;
  }

  .permission-content {
    .permission-name {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #1e3a5f;
    }

    .permission-desc {
      display: block;
      font-size: 12px;
      color: #64748b;
      margin-top: 2px;
    }
  }
}

.target-account {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 20px;
}

.delete-warning {
  font-size: 16px;
  color: #1e3a5f;
  margin-bottom: 8px;
}

.delete-target {
  font-size: 18px;
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 16px;
}

.delete-note {
  font-size: 13px;
  color: #94a3b8;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.btn {
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.btn-primary {
  background: #3b82f6;
  color: #fff;

  &:hover:not(:disabled) {
    background: #2563eb;
  }
}

.btn-secondary {
  background: #fff;
  color: #475569;
  border: 1px solid #e2e8f0;

  &:hover:not(:disabled) {
    background: #f8fafc;
  }
}

.btn-danger {
  background: #dc2626;
  color: #fff;

  &:hover:not(:disabled) {
    background: #b91c1c;
  }
}

.btn-small {
  padding: 8px 16px;
  font-size: 13px;
}
</style>
