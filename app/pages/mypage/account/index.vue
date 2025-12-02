<template>
  <div class="profile-page">
    <h1>プロフィール編集</h1>

    <div class="profile-header">
      <p class="last-updated">最終更新: {{ lastUpdated }}</p>
      <button 
        v-if="!isEditing" 
        class="btn btn-primary" 
        @click="startEdit"
      >
        編集する
      </button>
    </div>

    <form class="profile-form" @submit.prevent="handleSave">
      <!-- 基本情報 -->
      <section class="form-section">
        <h2>基本情報</h2>

        <div class="form-group">
          <label>担当者名 <span class="required">必須</span></label>
          <div class="name-inputs">
            <div class="input-wrapper">
              <span class="input-label">姓</span>
              <input 
                type="text" 
                v-model="form.lastName" 
                :disabled="!isEditing"
                placeholder="山田"
              >
            </div>
            <div class="input-wrapper">
              <span class="input-label">名</span>
              <input 
                type="text" 
                v-model="form.firstName" 
                :disabled="!isEditing"
                placeholder="太郎"
              >
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>担当者名（カナ） <span class="required">必須</span></label>
          <div class="name-inputs">
            <div class="input-wrapper">
              <span class="input-label">セイ</span>
              <input 
                type="text" 
                v-model="form.lastNameKana" 
                :disabled="!isEditing"
                placeholder="ヤマダ"
              >
            </div>
            <div class="input-wrapper">
              <span class="input-label">メイ</span>
              <input 
                type="text" 
                v-model="form.firstNameKana" 
                :disabled="!isEditing"
                placeholder="タロウ"
              >
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>役職 <span class="required">必須</span></label>
          <select v-model="form.position" :disabled="!isEditing">
            <option value="">選択してください</option>
            <option value="none">役職なし</option>
            <option value="leader">係長／リーダークラス</option>
            <option value="manager">課長／マネージャークラス</option>
            <option value="general_manager">部長／ゼネラルマネージャークラス</option>
            <option value="executive">役員クラス</option>
            <option value="ceo">代表クラス</option>
          </select>
        </div>

        <div class="form-group">
          <label>部署</label>
          <input 
            type="text" 
            v-model="form.department" 
            :disabled="!isEditing"
            placeholder="人事部"
          >
        </div>
      </section>

      <!-- 連絡先情報 -->
      <section class="form-section">
        <h2>連絡先情報</h2>

        <div class="form-group">
          <label>メールアドレス <span class="required">必須</span></label>
          <input 
            type="email" 
            v-model="form.email" 
            :disabled="!isEditing"
            placeholder="example@company.com"
          >
          <p class="form-hint">ログインIDとして使用されます</p>
        </div>

        <div class="form-group">
          <label>電話番号 <span class="required">必須</span></label>
          <input 
            type="tel" 
            v-model="form.phone" 
            :disabled="!isEditing"
            placeholder="09012345678"
          >
          <p class="form-hint">ハイフンなしで入力してください</p>
        </div>

        <div class="form-group">
          <label>内線番号</label>
          <input 
            type="text" 
            v-model="form.extension" 
            :disabled="!isEditing"
            placeholder="1234"
          >
        </div>
      </section>

      <!-- 通知設定 -->
      <section class="form-section">
        <h2>通知設定</h2>

        <div class="form-group">
          <label>メール通知</label>
          <div class="toggle-options">
            <label class="toggle-item">
              <input 
                type="checkbox" 
                v-model="form.notifications.matching"
                :disabled="!isEditing"
              >
              <span class="toggle-label">マッチング通知</span>
              <span class="toggle-desc">新しいマッチング候補が見つかったとき</span>
            </label>

            <label class="toggle-item">
              <input 
                type="checkbox" 
                v-model="form.notifications.offer"
                :disabled="!isEditing"
              >
              <span class="toggle-label">オファー通知</span>
              <span class="toggle-desc">オファーのステータスが変更されたとき</span>
            </label>

            <label class="toggle-item">
              <input 
                type="checkbox" 
                v-model="form.notifications.negotiation"
                :disabled="!isEditing"
              >
              <span class="toggle-label">交渉通知</span>
              <span class="toggle-desc">交渉に新しいメッセージがあるとき</span>
            </label>

            <label class="toggle-item">
              <input 
                type="checkbox" 
                v-model="form.notifications.billing"
                :disabled="!isEditing"
              >
              <span class="toggle-label">請求通知</span>
              <span class="toggle-desc">請求書が発行されたとき、支払期限が近づいたとき</span>
            </label>

            <label class="toggle-item">
              <input 
                type="checkbox" 
                v-model="form.notifications.system"
                :disabled="!isEditing"
              >
              <span class="toggle-label">システム通知</span>
              <span class="toggle-desc">メンテナンス情報やお知らせ</span>
            </label>
          </div>
        </div>
      </section>

      <!-- パスワード変更 -->
      <section class="form-section">
        <h2>パスワード変更</h2>

        <div v-if="!isChangingPassword" class="password-info">
          <p>パスワードを変更する場合は下のボタンをクリックしてください</p>
          <button 
            type="button" 
            class="btn btn-secondary"
            @click="isChangingPassword = true"
          >
            パスワードを変更する
          </button>
        </div>

        <div v-else class="password-form">
          <div class="form-group">
            <label>現在のパスワード <span class="required">必須</span></label>
            <input 
              type="password" 
              v-model="passwordForm.currentPassword"
              placeholder="現在のパスワード"
            >
          </div>

          <div class="form-group">
            <label>新しいパスワード <span class="required">必須</span></label>
            <input 
              type="password" 
              v-model="passwordForm.newPassword"
              placeholder="新しいパスワード"
            >
            <p class="form-hint">8文字以上、英数字を含む</p>
          </div>

          <div class="form-group">
            <label>新しいパスワード（確認） <span class="required">必須</span></label>
            <input 
              type="password" 
              v-model="passwordForm.confirmPassword"
              placeholder="新しいパスワードを再入力"
            >
          </div>

          <div class="password-actions">
            <button 
              type="button" 
              class="btn btn-secondary"
              @click="cancelPasswordChange"
            >
              キャンセル
            </button>
            <button 
              type="button" 
              class="btn btn-primary"
              @click="handlePasswordChange"
              :disabled="!isPasswordValid"
            >
              パスワードを変更
            </button>
          </div>
        </div>
      </section>

      <!-- アカウント情報 -->
      <section class="form-section">
        <h2>アカウント情報</h2>

        <div class="account-info">
          <div class="info-row">
            <span class="label">アカウントID</span>
            <span class="value">{{ accountInfo.id }}</span>
          </div>
          <div class="info-row">
            <span class="label">アカウント種別</span>
            <span class="value">{{ accountInfo.type }}</span>
          </div>
          <div class="info-row">
            <span class="label">登録日</span>
            <span class="value">{{ accountInfo.createdAt }}</span>
          </div>
          <div class="info-row">
            <span class="label">所属法人</span>
            <span class="value">{{ accountInfo.companyName }}</span>
          </div>
        </div>
      </section>

      <!-- 編集時のアクション -->
      <div v-if="isEditing" class="form-actions">
        <button type="button" class="btn btn-secondary" @click="cancelEdit">キャンセル</button>
        <button type="submit" class="btn btn-primary">保存する</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mypage'
})

const isEditing = ref(false)
const isChangingPassword = ref(false)
const lastUpdated = ref('2024-01-15 14:30')

const form = reactive({
  lastName: '山田',
  firstName: '太郎',
  lastNameKana: 'ヤマダ',
  firstNameKana: 'タロウ',
  position: 'manager',
  department: '人事部',
  email: 'yamada@example.com',
  phone: '09012345678',
  extension: '1234',
  notifications: {
    matching: true,
    offer: true,
    negotiation: true,
    billing: true,
    system: false
  }
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const accountInfo = reactive({
  id: 'ACC-2024-00123',
  type: '管理者アカウント',
  createdAt: '2024-01-01',
  companyName: '株式会社サンプル'
})

const originalForm = ref({})

const isPasswordValid = computed(() => {
  return passwordForm.currentPassword &&
         passwordForm.newPassword &&
         passwordForm.newPassword.length >= 8 &&
         passwordForm.newPassword === passwordForm.confirmPassword
})

const startEdit = () => {
  originalForm.value = JSON.parse(JSON.stringify(form))
  isEditing.value = true
}

const cancelEdit = () => {
  Object.assign(form, originalForm.value)
  isEditing.value = false
}

const handleSave = () => {
  console.log('保存:', form)
  lastUpdated.value = new Date().toLocaleString('ja-JP')
  isEditing.value = false
  alert('プロフィールを保存しました')
}

const cancelPasswordChange = () => {
  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  isChangingPassword.value = false
}

const handlePasswordChange = () => {
  console.log('パスワード変更')
  alert('パスワードを変更しました')
  cancelPasswordChange()
}
</script>

<style lang="scss" scoped>
.profile-page {
  max-width: 720px;

  h1 {
    margin-bottom: 24px;
    font-size: 24px;
    color: #1e3a5f;
  }
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .last-updated {
    font-size: 13px;
    color: #94a3b8;
  }
}

.profile-form {
  .form-section {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 24px;

    h2 {
      font-size: 16px;
      color: #1e3a5f;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid #e2e8f0;
    }
  }

  .form-group {
    margin-bottom: 20px;

    &:last-child {
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
      background: #fff;

      &:focus {
        outline: none;
        border-color: #3b82f6;
      }

      &:disabled {
        background: #f8fafc;
        color: #1e3a5f;
        cursor: default;
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
  gap: 16px;

  .input-wrapper {
    flex: 1;

    .input-label {
      display: block;
      font-size: 12px;
      color: #64748b;
      margin-bottom: 4px;
    }
  }
}

.toggle-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.toggle-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 6px;
  cursor: pointer;

  input {
    width: 20px;
    height: 20px;
    margin-top: 2px;

    &:disabled {
      cursor: default;
    }
  }

  .toggle-label {
    font-size: 14px;
    font-weight: 600;
    color: #1e3a5f;
    display: block;
  }

  .toggle-desc {
    font-size: 12px;
    color: #64748b;
    display: block;
    margin-top: 2px;
  }
}

.password-info {
  text-align: center;
  padding: 20px;

  p {
    font-size: 14px;
    color: #64748b;
    margin-bottom: 16px;
  }
}

.password-form {
  .password-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 20px;
  }
}

.account-info {
  .info-row {
    display: flex;
    padding: 12px 0;
    border-bottom: 1px solid #f1f5f9;

    &:last-child {
      border-bottom: none;
    }

    .label {
      width: 140px;
      font-size: 13px;
      color: #64748b;
    }

    .value {
      font-size: 14px;
      color: #1e3a5f;
    }
  }
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
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
</style>
