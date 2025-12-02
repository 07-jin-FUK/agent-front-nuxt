<template>
  <div class="withdraw-page">
    <h1>退会</h1>

    <div class="withdraw-warning">
      <div class="warning-icon">⚠️</div>
      <div class="warning-content">
        <h2>退会する前にご確認ください</h2>
        <p>退会すると以下のデータがすべて削除され、復元できません。</p>
      </div>
    </div>

    <div class="withdraw-info">
      <h3>削除されるデータ</h3>
      <ul class="delete-list">
        <li>アカウント情報・ログイン情報</li>
        <li>法人情報・担当者情報</li>
        <li>マッチング履歴・オファー履歴</li>
        <li>交渉履歴・メッセージ履歴</li>
        <li>請求・支払い履歴</li>
        <li>問い合わせ履歴</li>
      </ul>
    </div>

    <div class="withdraw-check">
      <h3>退会前の確認事項</h3>
      <div class="check-items">
        <div :class="['check-item', { ok: checks.noPendingOffer }]">
          <span class="check-icon">{{ checks.noPendingOffer ? '✓' : '!' }}</span>
          <div class="check-content">
            <p class="check-title">進行中のオファーがないこと</p>
            <p class="check-status" v-if="!checks.noPendingOffer">
              現在 {{ pendingOfferCount }}件のオファーが進行中です
            </p>
            <p class="check-status ok" v-else>確認済み</p>
          </div>
        </div>

        <div :class="['check-item', { ok: checks.noUnpaidBilling }]">
          <span class="check-icon">{{ checks.noUnpaidBilling ? '✓' : '!' }}</span>
          <div class="check-content">
            <p class="check-title">未払いの請求がないこと</p>
            <p class="check-status" v-if="!checks.noUnpaidBilling">
              現在 {{ unpaidBillingCount }}件の未払い請求があります
            </p>
            <p class="check-status ok" v-else>確認済み</p>
          </div>
        </div>

        <div :class="['check-item', { ok: checks.noActiveNegotiation }]">
          <span class="check-icon">{{ checks.noActiveNegotiation ? '✓' : '!' }}</span>
          <div class="check-content">
            <p class="check-title">進行中の交渉がないこと</p>
            <p class="check-status" v-if="!checks.noActiveNegotiation">
              現在 {{ activeNegotiationCount }}件の交渉が進行中です
            </p>
            <p class="check-status ok" v-else>確認済み</p>
          </div>
        </div>
      </div>
    </div>

    <div class="withdraw-reason">
      <h3>退会理由をお聞かせください</h3>
      <div class="reason-options">
        <label v-for="reason in reasonOptions" :key="reason.value" class="reason-option">
          <input type="radio" v-model="form.reason" :value="reason.value">
          <span>{{ reason.label }}</span>
        </label>
      </div>

      <div v-if="form.reason === 'other'" class="reason-other">
        <textarea 
          v-model="form.reasonDetail" 
          placeholder="具体的な理由をご記入ください"
          rows="4"
        ></textarea>
      </div>
    </div>

    <div class="withdraw-feedback">
      <h3>サービス改善のためのご意見（任意）</h3>
      <textarea 
        v-model="form.feedback" 
        placeholder="ご意見・ご要望があればお聞かせください"
        rows="4"
      ></textarea>
    </div>

    <div class="withdraw-confirm">
      <label class="confirm-checkbox">
        <input type="checkbox" v-model="form.confirmed">
        <span>上記の内容を確認し、退会することに同意します</span>
      </label>
    </div>

    <div class="withdraw-actions">
      <button class="btn btn-secondary" @click="handleCancel">キャンセル</button>
      <button 
        class="btn btn-danger" 
        :disabled="!canWithdraw"
        @click="handleWithdraw"
      >
        退会する
      </button>
    </div>

    <!-- 退会確認モーダル -->
    <div v-if="isConfirmModalOpen" class="confirm-modal">
      <div class="modal-overlay" @click="closeConfirmModal"></div>
      <div class="modal-container">
        <div class="modal-header">
          <h3>最終確認</h3>
        </div>
        <div class="modal-body">
          <p class="confirm-message">本当に退会しますか？</p>
          <p class="confirm-warning">この操作は取り消せません。</p>
          
          <div class="password-confirm">
            <label>確認のためパスワードを入力してください</label>
            <input type="password" v-model="confirmPassword" placeholder="パスワード">
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn btn-secondary" @click="closeConfirmModal">キャンセル</button>
          <button 
            class="btn btn-danger" 
            :disabled="!confirmPassword"
            @click="confirmWithdraw"
          >
            退会を確定する
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mypage'
})

const checks = reactive({
  noPendingOffer: false,
  noUnpaidBilling: true,
  noActiveNegotiation: false
})

const pendingOfferCount = ref(2)
const unpaidBillingCount = ref(0)
const activeNegotiationCount = ref(1)

const reasonOptions = [
  { value: 'not_needed', label: 'サービスが不要になった' },
  { value: 'found_candidate', label: '他の方法で採用が決まった' },
  { value: 'too_expensive', label: '料金が高い' },
  { value: 'not_satisfied', label: 'サービス内容に満足できなかった' },
  { value: 'hard_to_use', label: '使いにくかった' },
  { value: 'few_candidates', label: '候補者が少なかった' },
  { value: 'other', label: 'その他' }
]

const form = reactive({
  reason: '',
  reasonDetail: '',
  feedback: '',
  confirmed: false
})

const canWithdraw = computed(() => {
  return checks.noPendingOffer && 
         checks.noUnpaidBilling && 
         checks.noActiveNegotiation && 
         form.reason && 
         form.confirmed
})

const isConfirmModalOpen = ref(false)
const confirmPassword = ref('')

const handleCancel = () => {
  navigateTo('/mypage')
}

const handleWithdraw = () => {
  isConfirmModalOpen.value = true
}

const closeConfirmModal = () => {
  isConfirmModalOpen.value = false
  confirmPassword.value = ''
}

const confirmWithdraw = () => {
  console.log('退会処理:', {
    reason: form.reason,
    reasonDetail: form.reasonDetail,
    feedback: form.feedback
  })
  
  alert('退会処理が完了しました')
  navigateTo('/')
}
</script>

<style lang="scss" scoped>
.withdraw-page {
  max-width: 720px;

  h1 {
    margin-bottom: 24px;
    font-size: 24px;
    color: #1e3a5f;
  }

  h3 {
    font-size: 16px;
    color: #1e3a5f;
    margin-bottom: 16px;
  }
}

.withdraw-warning {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  margin-bottom: 24px;

  .warning-icon {
    font-size: 32px;
  }

  .warning-content {
    h2 {
      font-size: 18px;
      color: #dc2626;
      margin-bottom: 8px;
    }

    p {
      font-size: 14px;
      color: #7f1d1d;
    }
  }
}

.withdraw-info {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;

  .delete-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 10px 0;
      padding-left: 24px;
      position: relative;
      font-size: 14px;
      color: #475569;
      border-bottom: 1px solid #f1f5f9;

      &:last-child {
        border-bottom: none;
      }

      &::before {
        content: '×';
        position: absolute;
        left: 0;
        color: #dc2626;
        font-weight: bold;
      }
    }
  }
}

.withdraw-check {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
}

.check-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.check-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: #fef2f2;
  border-radius: 6px;

  &.ok {
    background: #f0fdf4;

    .check-icon {
      background: #059669;
    }
  }

  .check-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #dc2626;
    color: #fff;
    border-radius: 50%;
    font-size: 12px;
    font-weight: bold;
    flex-shrink: 0;
  }

  .check-content {
    .check-title {
      font-size: 14px;
      font-weight: 600;
      color: #1e3a5f;
      margin-bottom: 4px;
    }

    .check-status {
      font-size: 13px;
      color: #dc2626;

      &.ok {
        color: #059669;
      }
    }
  }
}

.withdraw-reason {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
}

.reason-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.reason-option {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  input {
    width: 18px;
    height: 18px;
  }

  span {
    font-size: 14px;
    color: #475569;
  }
}

.reason-other {
  margin-top: 16px;

  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 14px;
    resize: vertical;

    &:focus {
      outline: none;
      border-color: #3b82f6;
    }
  }
}

.withdraw-feedback {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;

  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 14px;
    resize: vertical;

    &:focus {
      outline: none;
      border-color: #3b82f6;
    }
  }
}

.withdraw-confirm {
  margin-bottom: 32px;

  .confirm-checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    input {
      width: 20px;
      height: 20px;
    }

    span {
      font-size: 14px;
      color: #1e3a5f;
      font-weight: 600;
    }
  }
}

.withdraw-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
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

/* 確認モーダル */
.confirm-modal {
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
  max-width: 400px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;

  h3 {
    font-size: 18px;
    color: #1e3a5f;
    margin: 0;
  }
}

.modal-body {
  padding: 24px 20px;

  .confirm-message {
    font-size: 16px;
    color: #1e3a5f;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .confirm-warning {
    font-size: 14px;
    color: #dc2626;
    margin-bottom: 24px;
  }

  .password-confirm {
    label {
      display: block;
      font-size: 14px;
      color: #64748b;
      margin-bottom: 8px;
    }

    input {
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
  }
}

.modal-actions {
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
</style>
