<template>
  <div class="negotiation-page">
    <h1>交渉</h1>

    <div class="negotiation-stats">
      <div class="stat-card">
        <p class="stat-value">{{ negotiations.length }}</p>
        <p class="stat-label">交渉中</p>
      </div>
      <div class="stat-card">
        <p class="stat-value">{{ waitingResponse }}</p>
        <p class="stat-label">返答待ち</p>
      </div>
      <div class="stat-card">
        <p class="stat-value">{{ needsAction }}</p>
        <p class="stat-label">要対応</p>
      </div>
    </div>

    <div class="negotiation-list">
      <div 
        v-for="item in negotiations" 
        :key="item.id" 
        :class="['negotiation-card', { urgent: item.needsAction }]"
      >
        <div class="negotiation-header">
          <div class="negotiation-info">
            <span class="candidate-id">候補者ID: {{ item.candidateId }}</span>
            <span :class="['status-badge', item.status]">{{ getStatusLabel(item.status) }}</span>
          </div>
          <span class="last-update">最終更新: {{ item.lastUpdate }}</span>
        </div>

        <div class="negotiation-body">
          <div class="info-grid">
            <div class="info-item">
              <span class="label">希望職種</span>
              <span class="value">{{ item.jobType }}</span>
            </div>
            <div class="info-item">
              <span class="label">当初提示年収</span>
              <span class="value">{{ item.initialSalary }}万円</span>
            </div>
            <div class="info-item">
              <span class="label">現在提示年収</span>
              <span class="value highlight">{{ item.currentSalary }}万円</span>
            </div>
            <div class="info-item">
              <span class="label">候補者希望</span>
              <span class="value">{{ item.candidateRequest }}万円</span>
            </div>
          </div>

          <div class="message-preview">
            <p class="message-label">最新メッセージ</p>
            <div class="message-content">
              <span class="message-from">{{ item.lastMessage.from }}:</span>
              <p class="message-text">{{ item.lastMessage.text }}</p>
            </div>
          </div>
        </div>

        <div class="negotiation-footer">
          <div class="negotiation-round">
            <span class="round-label">交渉ラウンド:</span>
            <span class="round-value">{{ item.round }}回目</span>
          </div>
          <div class="negotiation-actions">
            <button class="btn btn-secondary" @click="handleHistory(item.id)">履歴</button>
            <button class="btn btn-primary" @click="openChat(item.id)">メッセージを送る</button>
            <button 
              v-if="item.status === 'waiting_decision'" 
              class="btn btn-success" 
              @click="handleAccept(item.id)"
            >
              条件を承諾
            </button>
          </div>
        </div>
      </div>

      <div v-if="negotiations.length === 0" class="empty-state">
        <p>交渉中の候補者はいません</p>
        <NuxtLink to="/mypage/offer" class="btn btn-primary">オファー一覧を見る</NuxtLink>
      </div>
    </div>

    <!-- チャットモーダル -->
    <div v-if="isChatOpen" class="chat-modal">
      <div class="chat-overlay" @click="closeChat"></div>
      <div class="chat-container">
        <div class="chat-header">
          <h3>候補者ID: {{ selectedNegotiation?.candidateId }}</h3>
          <button class="close-btn" @click="closeChat">✕</button>
        </div>
        
        <div class="chat-messages">
          <div 
            v-for="msg in chatMessages" 
            :key="msg.id" 
            :class="['message', msg.isOwn ? 'own' : 'other']"
          >
            <p class="message-sender">{{ msg.sender }}</p>
            <p class="message-body">{{ msg.text }}</p>
            <span class="message-time">{{ msg.time }}</span>
          </div>
        </div>

        <div class="chat-input">
          <textarea 
            v-model="newMessage" 
            placeholder="メッセージを入力..."
            rows="3"
          ></textarea>
          <button class="btn btn-primary" @click="sendMessage">送信</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mypage'
})

const negotiations = ref([
  {
    id: 1,
    candidateId: 'A001',
    status: 'in_progress',
    jobType: '営業',
    initialSalary: 550,
    currentSalary: 580,
    candidateRequest: 600,
    lastUpdate: '2024-01-16 14:30',
    round: 2,
    needsAction: true,
    lastMessage: {
      from: '候補者',
      text: '年収600万円でご検討いただけないでしょうか。前職での実績を考慮いただければ幸いです。'
    }
  },
  {
    id: 2,
    candidateId: 'A004',
    status: 'waiting_response',
    jobType: 'マーケティング',
    initialSalary: 520,
    currentSalary: 540,
    candidateRequest: 550,
    lastUpdate: '2024-01-15 10:00',
    round: 1,
    needsAction: false,
    lastMessage: {
      from: 'あなた',
      text: '540万円でいかがでしょうか。入社後の評価次第で昇給も検討いたします。'
    }
  },
  {
    id: 3,
    candidateId: 'A007',
    status: 'waiting_decision',
    jobType: 'エンジニア',
    initialSalary: 600,
    currentSalary: 620,
    candidateRequest: 620,
    lastUpdate: '2024-01-16 09:00',
    round: 3,
    needsAction: true,
    lastMessage: {
      from: '候補者',
      text: '620万円で承諾いたします。入社日についてご相談させてください。'
    }
  }
])

const waitingResponse = computed(() => {
  return negotiations.value.filter(n => n.status === 'waiting_response').length
})

const needsAction = computed(() => {
  return negotiations.value.filter(n => n.needsAction).length
})

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    in_progress: '交渉中',
    waiting_response: '返答待ち',
    waiting_decision: '承諾待ち'
  }
  return labels[status] || status
}

// チャット機能
const isChatOpen = ref(false)
const selectedNegotiation = ref<any>(null)
const newMessage = ref('')

const chatMessages = ref([
  { id: 1, sender: 'あなた', text: '年収550万円でオファーさせていただきます。', time: '1/14 10:00', isOwn: true },
  { id: 2, sender: '候補者', text: '前職の年収を考慮いただき、580万円でご検討いただけないでしょうか。', time: '1/14 15:30', isOwn: false },
  { id: 3, sender: 'あなた', text: '580万円で再検討いたします。', time: '1/15 09:00', isOwn: true },
  { id: 4, sender: '候補者', text: '年収600万円でご検討いただけないでしょうか。前職での実績を考慮いただければ幸いです。', time: '1/16 14:30', isOwn: false }
])

const openChat = (id: number) => {
  selectedNegotiation.value = negotiations.value.find(n => n.id === id)
  isChatOpen.value = true
}

const closeChat = () => {
  isChatOpen.value = false
  selectedNegotiation.value = null
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  
  chatMessages.value.push({
    id: chatMessages.value.length + 1,
    sender: 'あなた',
    text: newMessage.value,
    time: '今',
    isOwn: true
  })
  newMessage.value = ''
}

const handleHistory = (id: number) => {
  console.log('履歴:', id)
}

const handleAccept = (id: number) => {
  console.log('承諾:', id)
  navigateTo('/mypage/cart')
}
</script>

<style lang="scss" scoped>
.negotiation-page {
  h1 {
    margin-bottom: 24px;
    font-size: 24px;
    color: #1e3a5f;
  }
}

.negotiation-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  .stat-card {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    border: 1px solid #e2e8f0;

    .stat-value {
      font-size: 32px;
      font-weight: 700;
      color: #3b82f6;
    }

    .stat-label {
      font-size: 14px;
      color: #64748b;
      margin-top: 4px;
    }

    &:nth-child(3) .stat-value {
      color: #f59e0b;
    }
  }
}

.negotiation-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.negotiation-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  overflow: hidden;

  &.urgent {
    border-color: #f59e0b;
    box-shadow: 0 0 0 1px #fef3c7;
  }
}

.negotiation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;

  .negotiation-info {
    display: flex;
    align-items: center;
    gap: 12px;

    .candidate-id {
      font-size: 14px;
      font-weight: 600;
      color: #1e3a5f;
    }
  }

  .last-update {
    font-size: 13px;
    color: #94a3b8;
  }
}

.status-badge {
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px;

  &.in_progress {
    background: #dbeafe;
    color: #2563eb;
  }

  &.waiting_response {
    background: #fef3c7;
    color: #d97706;
  }

  &.waiting_decision {
    background: #d1fae5;
    color: #059669;
  }
}

.negotiation-body {
  padding: 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
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
      font-weight: 500;

      &.highlight {
        color: #3b82f6;
        font-weight: 700;
      }
    }
  }
}

.message-preview {
  background: #f8fafc;
  padding: 16px;
  border-radius: 6px;

  .message-label {
    font-size: 12px;
    color: #94a3b8;
    margin-bottom: 8px;
  }

  .message-content {
    .message-from {
      font-size: 13px;
      font-weight: 600;
      color: #475569;
    }

    .message-text {
      font-size: 14px;
      color: #1e3a5f;
      margin-top: 4px;
      line-height: 1.6;
    }
  }
}

.negotiation-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;

  .negotiation-round {
    .round-label {
      font-size: 12px;
      color: #94a3b8;
      margin-right: 8px;
    }

    .round-value {
      font-size: 14px;
      color: #1e3a5f;
      font-weight: 600;
    }
  }

  .negotiation-actions {
    display: flex;
    gap: 8px;
  }
}

.btn {
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #3b82f6;
  color: #fff;

  &:hover {
    background: #2563eb;
  }
}

.btn-secondary {
  background: #fff;
  color: #475569;
  border: 1px solid #e2e8f0;

  &:hover {
    background: #f8fafc;
  }
}

.btn-success {
  background: #059669;
  color: #fff;

  &:hover {
    background: #047857;
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

/* チャットモーダル */
.chat-modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.chat-container {
  position: relative;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  background: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;

  h3 {
    font-size: 16px;
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

.chat-messages {
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

  &.other {
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

.chat-input {
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
</style>
