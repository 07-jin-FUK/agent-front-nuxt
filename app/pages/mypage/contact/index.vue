<template>
  <div class="contact-page">
    <h1>問い合わせ</h1>

    <div class="contact-tabs">
      <button 
        :class="['tab', { active: activeTab === 'new' }]" 
        @click="activeTab = 'new'"
      >
        新規問い合わせ
      </button>
      <button 
        :class="['tab', { active: activeTab === 'history' }]" 
        @click="activeTab = 'history'"
      >
        問い合わせ履歴
      </button>
    </div>

    <!-- 新規問い合わせフォーム -->
    <div v-if="activeTab === 'new'" class="contact-form-container">
      <form class="contact-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>お問い合わせ種別 <span class="required">必須</span></label>
          <select v-model="form.category">
            <option value="">選択してください</option>
            <option value="service">サービスについて</option>
            <option value="billing">請求・支払いについて</option>
            <option value="technical">技術的な問題</option>
            <option value="candidate">候補者について</option>
            <option value="contract">契約について</option>
            <option value="other">その他</option>
          </select>
        </div>

        <div class="form-group">
          <label>関連する候補者ID（任意）</label>
          <input type="text" v-model="form.candidateId" placeholder="例: A001">
        </div>

        <div class="form-group">
          <label>件名 <span class="required">必須</span></label>
          <input type="text" v-model="form.subject" placeholder="お問い合わせの件名を入力">
        </div>

        <div class="form-group">
          <label>お問い合わせ内容 <span class="required">必須</span></label>
          <textarea 
            v-model="form.message" 
            rows="8" 
            placeholder="お問い合わせ内容を詳しくご記入ください"
          ></textarea>
        </div>

        <div class="form-group">
          <label>添付ファイル（任意）</label>
          <div class="file-upload">
            <input type="file" id="file" @change="handleFileChange" multiple>
            <label for="file" class="file-label">
              <span class="icon">📎</span>
              <span>ファイルを選択</span>
            </label>
            <span class="file-info">※ 最大5MB、PDF・画像ファイルのみ</span>
          </div>
          <div v-if="form.files.length > 0" class="file-list">
            <div v-for="(file, index) in form.files" :key="index" class="file-item">
              <span>{{ file.name }}</span>
              <button type="button" @click="removeFile(index)">✕</button>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="!isFormValid">送信する</button>
        </div>
      </form>
    </div>

    <!-- 問い合わせ履歴 -->
    <div v-if="activeTab === 'history'" class="contact-history">
      <div class="history-filters">
        <select v-model="historyFilter">
          <option value="">すべてのステータス</option>
          <option value="open">対応中</option>
          <option value="answered">回答済み</option>
          <option value="closed">完了</option>
        </select>
      </div>

      <div class="history-list">
        <div 
          v-for="inquiry in filteredInquiries" 
          :key="inquiry.id" 
          class="inquiry-card"
          @click="openInquiryDetail(inquiry)"
        >
          <div class="inquiry-header">
            <div class="inquiry-info">
              <span class="inquiry-number">{{ inquiry.inquiryNumber }}</span>
              <span :class="['status-badge', inquiry.status]">{{ getStatusLabel(inquiry.status) }}</span>
            </div>
            <span class="inquiry-date">{{ inquiry.createdAt }}</span>
          </div>

          <div class="inquiry-body">
            <p class="inquiry-category">{{ inquiry.category }}</p>
            <p class="inquiry-subject">{{ inquiry.subject }}</p>
            <p class="inquiry-preview">{{ inquiry.lastMessage }}</p>
          </div>

          <div class="inquiry-footer">
            <span class="message-count">💬 {{ inquiry.messageCount }}件のやり取り</span>
            <span class="last-update">最終更新: {{ inquiry.updatedAt }}</span>
          </div>
        </div>

        <div v-if="filteredInquiries.length === 0" class="empty-state">
          <p>問い合わせ履歴はありません</p>
        </div>
      </div>
    </div>

    <!-- 問い合わせ詳細モーダル -->
    <div v-if="isDetailOpen" class="detail-modal">
      <div class="detail-overlay" @click="closeDetail"></div>
      <div class="detail-container">
        <div class="detail-header">
          <div>
            <h3>{{ selectedInquiry?.inquiryNumber }}</h3>
            <p class="detail-subject">{{ selectedInquiry?.subject }}</p>
          </div>
          <button class="close-btn" @click="closeDetail">✕</button>
        </div>

        <div class="detail-messages">
          <div 
            v-for="msg in inquiryMessages" 
            :key="msg.id" 
            :class="['message', msg.isOwn ? 'own' : 'support']"
          >
            <p class="message-sender">{{ msg.sender }}</p>
            <p class="message-body">{{ msg.text }}</p>
            <span class="message-time">{{ msg.time }}</span>
          </div>
        </div>

        <div v-if="selectedInquiry?.status !== 'closed'" class="detail-input">
          <textarea 
            v-model="replyMessage" 
            placeholder="返信を入力..."
            rows="3"
          ></textarea>
          <button class="btn btn-primary" @click="sendReply">返信する</button>
        </div>

        <div v-else class="closed-notice">
          <p>この問い合わせは完了しています</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mypage'
})

const activeTab = ref('new')
const historyFilter = ref('')

const form = reactive({
  category: '',
  candidateId: '',
  subject: '',
  message: '',
  files: [] as File[]
})

const isFormValid = computed(() => {
  return form.category && form.subject && form.message
})

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    form.files = [...form.files, ...Array.from(target.files)]
  }
}

const removeFile = (index: number) => {
  form.files.splice(index, 1)
}

const handleSubmit = () => {
  console.log('送信:', form)
  alert('お問い合わせを送信しました')
  form.category = ''
  form.candidateId = ''
  form.subject = ''
  form.message = ''
  form.files = []
}

// 問い合わせ履歴
const inquiries = ref([
  {
    id: 1,
    inquiryNumber: 'INQ-2024-0015',
    status: 'open',
    category: 'サービスについて',
    subject: 'マッチング条件の変更について',
    lastMessage: 'ご連絡ありがとうございます。条件変更について確認いたします。',
    messageCount: 3,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-16 10:30'
  },
  {
    id: 2,
    inquiryNumber: 'INQ-2024-0012',
    status: 'answered',
    category: '請求・支払いについて',
    subject: '請求書の再発行依頼',
    lastMessage: '請求書を再発行いたしました。ご確認ください。',
    messageCount: 2,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-11 14:00'
  },
  {
    id: 3,
    inquiryNumber: 'INQ-2023-0098',
    status: 'closed',
    category: '候補者について',
    subject: '候補者A003の経歴詳細について',
    lastMessage: 'ご確認いただきありがとうございました。',
    messageCount: 5,
    createdAt: '2023-12-20',
    updatedAt: '2023-12-25 16:00'
  }
])

const filteredInquiries = computed(() => {
  if (!historyFilter.value) return inquiries.value
  return inquiries.value.filter(i => i.status === historyFilter.value)
})

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    open: '対応中',
    answered: '回答済み',
    closed: '完了'
  }
  return labels[status] || status
}

// 詳細モーダル
const isDetailOpen = ref(false)
const selectedInquiry = ref<any>(null)
const replyMessage = ref('')

const inquiryMessages = ref([
  { id: 1, sender: 'あなた', text: 'マッチング条件の変更をお願いしたいのですが、可能でしょうか。', time: '1/15 09:00', isOwn: true },
  { id: 2, sender: 'サポート', text: 'お問い合わせありがとうございます。どのような条件に変更されたいでしょうか。', time: '1/15 14:00', isOwn: false },
  { id: 3, sender: 'あなた', text: '勤務地を東京都から関東圏に広げたいです。', time: '1/16 09:00', isOwn: true },
  { id: 4, sender: 'サポート', text: 'ご連絡ありがとうございます。条件変更について確認いたします。', time: '1/16 10:30', isOwn: false }
])

const openInquiryDetail = (inquiry: any) => {
  selectedInquiry.value = inquiry
  isDetailOpen.value = true
}

const closeDetail = () => {
  isDetailOpen.value = false
  selectedInquiry.value = null
  replyMessage.value = ''
}

const sendReply = () => {
  if (!replyMessage.value.trim()) return
  
  inquiryMessages.value.push({
    id: inquiryMessages.value.length + 1,
    sender: 'あなた',
    text: replyMessage.value,
    time: '今',
    isOwn: true
  })
  replyMessage.value = ''
}
</script>

<style lang="scss" scoped>
.contact-page {
  h1 {
    margin-bottom: 24px;
    font-size: 24px;
    color: #1e3a5f;
  }
}

.contact-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;

  .tab {
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 600;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #f8fafc;
    }

    &.active {
      background: #3b82f6;
      color: #fff;
      border-color: #3b82f6;
    }
  }
}

.contact-form-container {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  padding: 24px;
}

.contact-form {
  max-width: 640px;

  .form-group {
    margin-bottom: 24px;

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

    input, select, textarea {
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

    textarea {
      resize: vertical;
    }
  }
}

.file-upload {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  input[type="file"] {
    display: none;
  }

  .file-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: #f8fafc;
    border: 1px dashed #cbd5e1;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    color: #64748b;

    &:hover {
      background: #f1f5f9;
    }
  }

  .file-info {
    font-size: 12px;
    color: #94a3b8;
  }
}

.file-list {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .file-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background: #f8fafc;
    border-radius: 4px;
    font-size: 13px;

    button {
      background: none;
      border: none;
      color: #94a3b8;
      cursor: pointer;

      &:hover {
        color: #dc2626;
      }
    }
  }
}

.form-actions {
  margin-top: 32px;
}

.btn {
  padding: 12px 32px;
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

/* 問い合わせ履歴 */
.contact-history {
  .history-filters {
    margin-bottom: 16px;

    select {
      padding: 10px 16px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: 14px;
      background: #fff;
    }
  }
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.inquiry-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
  }
}

.inquiry-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  .inquiry-info {
    display: flex;
    align-items: center;
    gap: 12px;

    .inquiry-number {
      font-size: 14px;
      font-weight: 600;
      color: #1e3a5f;
    }
  }

  .inquiry-date {
    font-size: 13px;
    color: #94a3b8;
  }
}

.status-badge {
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px;

  &.open {
    background: #dbeafe;
    color: #2563eb;
  }

  &.answered {
    background: #fef3c7;
    color: #d97706;
  }

  &.closed {
    background: #e2e8f0;
    color: #64748b;
  }
}

.inquiry-body {
  margin-bottom: 12px;

  .inquiry-category {
    font-size: 12px;
    color: #94a3b8;
    margin-bottom: 4px;
  }

  .inquiry-subject {
    font-size: 15px;
    font-weight: 600;
    color: #1e3a5f;
    margin-bottom: 8px;
  }

  .inquiry-preview {
    font-size: 13px;
    color: #64748b;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.inquiry-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #94a3b8;
}

.empty-state {
  background: #fff;
  padding: 48px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #e2e8f0;

  p {
    color: #94a3b8;
  }
}

/* 詳細モーダル */
.detail-modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.detail-container {
  position: relative;
  width: 90%;
  max-width: 640px;
  max-height: 80vh;
  background: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;

  h3 {
    font-size: 14px;
    color: #64748b;
    margin-bottom: 4px;
  }

  .detail-subject {
    font-size: 16px;
    font-weight: 600;
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

.detail-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 12px;

  &.own {
    align-self: flex-end;
    background: #3b82f6;
    color: #fff;

    .message-sender {
      color: rgba(255, 255, 255, 0.8);
    }

    .message-time {
      color: rgba(255, 255, 255, 0.6);
    }
  }

  &.support {
    align-self: flex-start;
    background: #f1f5f9;

    .message-sender {
      color: #64748b;
    }

    .message-time {
      color: #94a3b8;
    }
  }

  .message-sender {
    font-size: 11px;
    margin-bottom: 4px;
  }

  .message-body {
    font-size: 14px;
    line-height: 1.5;
  }

  .message-time {
    font-size: 10px;
    margin-top: 4px;
    text-align: right;
  }
}

.detail-input {
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 12px;

  textarea {
    flex: 1;
    padding: 12px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    resize: none;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: #3b82f6;
    }
  }

  .btn {
    align-self: flex-end;
  }
}

.closed-notice {
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;
  text-align: center;

  p {
    font-size: 14px;
    color: #94a3b8;
  }
}
</style>
