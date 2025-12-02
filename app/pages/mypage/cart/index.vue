<template>
  <div class="cart-page">
    <h1>カート</h1>

    <div class="cart-stats">
      <div class="stat-card">
        <p class="stat-value">{{ cartItems.length }}</p>
        <p class="stat-label">情報開示済み</p>
      </div>
      <div class="stat-card">
        <p class="stat-value">{{ totalAmount.toLocaleString() }}万円</p>
        <p class="stat-label">合計提示年収</p>
      </div>
    </div>

    <div class="cart-list">
      <div v-for="item in cartItems" :key="item.id" class="cart-card">
        <div class="cart-header">
          <div class="cart-info">
            <span class="candidate-id">候補者ID: {{ item.candidateId }}</span>
            <span :class="['status-badge', item.status]">{{ getStatusLabel(item.status) }}</span>
          </div>
          <span class="won-date">情報開示日: {{ item.wonAt }}</span>
        </div>

        <div class="cart-body">
          <div class="info-grid">
            <div class="info-item">
              <span class="label">希望職種</span>
              <span class="value">{{ item.jobType }}</span>
            </div>
            <div class="info-item">
              <span class="label">経験年数</span>
              <span class="value">{{ item.experience }}年</span>
            </div>
            <div class="info-item">
              <span class="label">希望勤務地</span>
              <span class="value">{{ item.location }}</span>
            </div>
            <div class="info-item">
              <span class="label">確定年収</span>
              <span class="value highlight">{{ item.finalSalary }}万円</span>
            </div>
          </div>

          <div class="timeline">
            <p class="timeline-label">進行状況</p>
            <div class="timeline-steps">
              <div 
                v-for="(step, index) in timelineSteps" 
                :key="index"
                :class="['step', { completed: item.currentStep > index, active: item.currentStep === index }]"
              >
                <div class="step-dot"></div>
                <span class="step-label">{{ step }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="cart-footer">
          <div class="next-action">
            <span class="label">次のアクション:</span>
            <span class="action">{{ item.nextAction }}</span>
          </div>
          <div class="cart-actions">
            <button class="btn btn-secondary" @click="handleDetail(item.id)">詳細</button>
            <button class="btn btn-primary" @click="handleProceed(item.id)">手続きへ進む</button>
          </div>
        </div>
      </div>

      <div v-if="cartItems.length === 0" class="empty-state">
        <p>落札した候補者はいません</p>
        <NuxtLink to="/mypage/offer" class="btn btn-primary">オファー一覧を見る</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mypage'
})

const timelineSteps = ['情報開示', '条件確認', '契約準備', '契約締結', '入社']

const cartItems = ref([
  {
    id: 1,
    candidateId: 'A002',
    status: 'contract',
    jobType: 'エンジニア',
    experience: 3,
    location: '大阪府',
    finalSalary: 480,
    wonAt: '2024-01-10',
    currentStep: 2,
    nextAction: '契約書の確認・署名'
  },
  {
    id: 2,
    candidateId: 'A005',
    status: 'confirmed',
    jobType: '営業',
    experience: 7,
    location: '東京都',
    finalSalary: 620,
    wonAt: '2024-01-08',
    currentStep: 3,
    nextAction: '入社日の最終確認'
  },
  {
    id: 3,
    candidateId: 'A009',
    status: 'pending',
    jobType: 'デザイナー',
    experience: 4,
    location: '東京都',
    finalSalary: 450,
    wonAt: '2024-01-12',
    currentStep: 1,
    nextAction: '条件詳細の確認'
  }
])

const totalAmount = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.finalSalary, 0)
})

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: '条件確認中',
    contract: '契約準備中',
    confirmed: '契約締結済み'
  }
  return labels[status] || status
}

const handleDetail = (id: number) => {
  console.log('詳細:', id)
}

const handleProceed = (id: number) => {
  console.log('手続きへ:', id)
  navigateTo('/mypage/negotiation')
}
</script>

<style lang="scss" scoped>
.cart-page {
  h1 {
    margin-bottom: 24px;
    font-size: 24px;
    color: #1e3a5f;
  }
}

.cart-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

    &:last-child .stat-value {
      color: #059669;
    }
  }
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #f0fdf4;
  border-bottom: 1px solid #e2e8f0;

  .cart-info {
    display: flex;
    align-items: center;
    gap: 12px;

    .candidate-id {
      font-size: 14px;
      font-weight: 600;
      color: #1e3a5f;
    }
  }

  .won-date {
    font-size: 13px;
    color: #64748b;
  }
}

.status-badge {
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px;

  &.pending {
    background: #fef3c7;
    color: #d97706;
  }

  &.contract {
    background: #dbeafe;
    color: #2563eb;
  }

  &.confirmed {
    background: #d1fae5;
    color: #059669;
  }
}

.cart-body {
  padding: 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;

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
        color: #059669;
        font-weight: 700;
      }
    }
  }
}

.timeline {
  background: #f8fafc;
  padding: 16px;
  border-radius: 6px;

  .timeline-label {
    font-size: 12px;
    color: #94a3b8;
    margin-bottom: 16px;
  }

  .timeline-steps {
    display: flex;
    justify-content: space-between;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 8px;
      left: 0;
      right: 0;
      height: 2px;
      background: #e2e8f0;
    }
  }

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;

    .step-dot {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #e2e8f0;
      border: 2px solid #fff;
      margin-bottom: 8px;
    }

    .step-label {
      font-size: 11px;
      color: #94a3b8;
      white-space: nowrap;

      @media (min-width: 768px) {
        font-size: 12px;
      }
    }

    &.completed {
      .step-dot {
        background: #059669;
      }

      .step-label {
        color: #059669;
      }
    }

    &.active {
      .step-dot {
        background: #3b82f6;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
      }

      .step-label {
        color: #3b82f6;
        font-weight: 600;
      }
    }
  }
}

.cart-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;

  .next-action {
    .label {
      font-size: 12px;
      color: #94a3b8;
      margin-right: 8px;
    }

    .action {
      font-size: 14px;
      color: #1e3a5f;
      font-weight: 500;
    }
  }

  .cart-actions {
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
</style>
