<template>
  <div class="billing-page">
    <h1>請求</h1>

    <div class="billing-stats">
      <div class="stat-card">
        <p class="stat-value">{{ totalUnpaid.toLocaleString() }}<span class="unit">円</span></p>
        <p class="stat-label">未払い金額</p>
      </div>
      <div class="stat-card">
        <p class="stat-value">{{ unpaidCount }}</p>
        <p class="stat-label">未払い件数</p>
      </div>
      <div class="stat-card">
        <p class="stat-value">{{ totalPaid.toLocaleString() }}<span class="unit">円</span></p>
        <p class="stat-label">今月の支払い済み</p>
      </div>
    </div>

    <div class="billing-filters">
      <select v-model="filters.status">
        <option value="">すべてのステータス</option>
        <option value="unpaid">未払い</option>
        <option value="paid">支払い済み</option>
        <option value="overdue">支払期限超過</option>
      </select>

      <select v-model="filters.period">
        <option value="">すべての期間</option>
        <option value="thisMonth">今月</option>
        <option value="lastMonth">先月</option>
        <option value="last3Months">過去3ヶ月</option>
      </select>
    </div>

    <div class="billing-list">
      <div 
        v-for="bill in filteredBillings" 
        :key="bill.id" 
        :class="['billing-card', { overdue: bill.status === 'overdue' }]"
      >
        <div class="billing-header">
          <div class="billing-info">
            <span class="invoice-number">請求番号: {{ bill.invoiceNumber }}</span>
            <span :class="['status-badge', bill.status]">{{ getStatusLabel(bill.status) }}</span>
          </div>
          <span class="billing-date">請求日: {{ bill.billingDate }}</span>
        </div>

        <div class="billing-body">
          <div class="billing-details">
            <div class="detail-row">
              <span class="label">対象候補者</span>
              <span class="value">{{ bill.candidateId }}</span>
            </div>
            <div class="detail-row">
              <span class="label">サービス内容</span>
              <span class="value">{{ bill.serviceName }}</span>
            </div>
            <div class="detail-row">
              <span class="label">支払期限</span>
              <span :class="['value', { urgent: bill.status === 'overdue' }]">{{ bill.dueDate }}</span>
            </div>
          </div>

          <div class="billing-amount">
            <p class="amount-label">請求金額（税込）</p>
            <p class="amount-value">¥{{ bill.amount.toLocaleString() }}</p>
          </div>
        </div>

        <div class="billing-footer">
          <div class="payment-method" v-if="bill.status === 'paid'">
            <span class="label">支払方法:</span>
            <span class="value">{{ bill.paymentMethod }}</span>
            <span class="paid-date">（{{ bill.paidDate }}）</span>
          </div>
          <div v-else></div>
          
          <div class="billing-actions">
            <button class="btn btn-secondary" @click="handleDownload(bill.id)">請求書DL</button>
            <button 
              v-if="bill.status !== 'paid'" 
              class="btn btn-primary" 
              @click="handlePayment(bill.id)"
            >
              支払いへ進む
            </button>
            <button 
              v-if="bill.status === 'paid'" 
              class="btn btn-secondary" 
              @click="handleReceipt(bill.id)"
            >
              領収書DL
            </button>
          </div>
        </div>
      </div>

      <div v-if="filteredBillings.length === 0" class="empty-state">
        <p>請求はありません</p>
      </div>
    </div>

    <!-- 支払い履歴サマリー -->
    <div class="payment-summary">
      <h2>支払い履歴サマリー</h2>
      <div class="summary-table">
        <div class="summary-header">
          <span>月</span>
          <span>件数</span>
          <span>金額</span>
        </div>
        <div v-for="summary in paymentSummary" :key="summary.month" class="summary-row">
          <span>{{ summary.month }}</span>
          <span>{{ summary.count }}件</span>
          <span>¥{{ summary.amount.toLocaleString() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mypage'
})

const filters = reactive({
  status: '',
  period: ''
})

const billings = ref([
  {
    id: 1,
    invoiceNumber: 'INV-2024-0012',
    status: 'unpaid',
    candidateId: 'A002',
    serviceName: '人材紹介手数料',
    billingDate: '2024-01-15',
    dueDate: '2024-01-31',
    amount: 1650000,
    paymentMethod: '',
    paidDate: ''
  },
  {
    id: 2,
    invoiceNumber: 'INV-2024-0008',
    status: 'overdue',
    candidateId: 'A005',
    serviceName: '人材紹介手数料',
    billingDate: '2024-01-01',
    dueDate: '2024-01-15',
    amount: 2200000,
    paymentMethod: '',
    paidDate: ''
  },
  {
    id: 3,
    invoiceNumber: 'INV-2023-0098',
    status: 'paid',
    candidateId: 'A003',
    serviceName: '人材紹介手数料',
    billingDate: '2023-12-15',
    dueDate: '2023-12-31',
    amount: 1980000,
    paymentMethod: '銀行振込',
    paidDate: '2023-12-28'
  },
  {
    id: 4,
    invoiceNumber: 'INV-2023-0085',
    status: 'paid',
    candidateId: 'A001',
    serviceName: '人材紹介手数料',
    billingDate: '2023-12-01',
    dueDate: '2023-12-15',
    amount: 1540000,
    paymentMethod: 'クレジットカード',
    paidDate: '2023-12-10'
  }
])

const paymentSummary = ref([
  { month: '2024年1月', count: 0, amount: 0 },
  { month: '2023年12月', count: 2, amount: 3520000 },
  { month: '2023年11月', count: 1, amount: 1760000 }
])

const filteredBillings = computed(() => {
  let result = [...billings.value]
  
  if (filters.status) {
    result = result.filter(b => b.status === filters.status)
  }

  return result
})

const totalUnpaid = computed(() => {
  return billings.value
    .filter(b => b.status === 'unpaid' || b.status === 'overdue')
    .reduce((sum, b) => sum + b.amount, 0)
})

const unpaidCount = computed(() => {
  return billings.value.filter(b => b.status === 'unpaid' || b.status === 'overdue').length
})

const totalPaid = computed(() => {
  return billings.value
    .filter(b => b.status === 'paid')
    .reduce((sum, b) => sum + b.amount, 0)
})

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    unpaid: '未払い',
    paid: '支払い済み',
    overdue: '支払期限超過'
  }
  return labels[status] || status
}

const handleDownload = (id: number) => {
  console.log('請求書ダウンロード:', id)
}

const handlePayment = (id: number) => {
  console.log('支払いへ:', id)
}

const handleReceipt = (id: number) => {
  console.log('領収書ダウンロード:', id)
}
</script>

<style lang="scss" scoped>
.billing-page {
  h1 {
    margin-bottom: 24px;
    font-size: 24px;
    color: #1e3a5f;
  }
}

.billing-stats {
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
      font-size: 28px;
      font-weight: 700;
      color: #1e3a5f;

      .unit {
        font-size: 14px;
        font-weight: 400;
        margin-left: 2px;
      }
    }

    .stat-label {
      font-size: 14px;
      color: #64748b;
      margin-top: 4px;
    }

    &:first-child .stat-value {
      color: #dc2626;
    }

    &:last-child .stat-value {
      color: #059669;
    }
  }
}

.billing-filters {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;

  select {
    padding: 10px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 14px;
    background: #fff;
  }
}

.billing-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
}

.billing-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  overflow: hidden;

  &.overdue {
    border-color: #dc2626;
    box-shadow: 0 0 0 1px #fee2e2;
  }
}

.billing-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;

  .billing-info {
    display: flex;
    align-items: center;
    gap: 12px;

    .invoice-number {
      font-size: 14px;
      font-weight: 600;
      color: #1e3a5f;
    }
  }

  .billing-date {
    font-size: 13px;
    color: #94a3b8;
  }
}

.status-badge {
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px;

  &.unpaid {
    background: #fef3c7;
    color: #d97706;
  }

  &.paid {
    background: #d1fae5;
    color: #059669;
  }

  &.overdue {
    background: #fee2e2;
    color: #dc2626;
  }
}

.billing-body {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.billing-details {
  flex: 1;

  .detail-row {
    display: flex;
    padding: 8px 0;
    border-bottom: 1px solid #f1f5f9;

    &:last-child {
      border-bottom: none;
    }

    .label {
      width: 120px;
      font-size: 13px;
      color: #94a3b8;
    }

    .value {
      font-size: 14px;
      color: #1e3a5f;

      &.urgent {
        color: #dc2626;
        font-weight: 600;
      }
    }
  }
}

.billing-amount {
  background: #f8fafc;
  padding: 20px 24px;
  border-radius: 8px;
  text-align: center;
  min-width: 200px;

  .amount-label {
    font-size: 12px;
    color: #94a3b8;
    margin-bottom: 8px;
  }

  .amount-value {
    font-size: 28px;
    font-weight: 700;
    color: #1e3a5f;
  }
}

.billing-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;

  .payment-method {
    font-size: 13px;

    .label {
      color: #94a3b8;
      margin-right: 8px;
    }

    .value {
      color: #1e3a5f;
    }

    .paid-date {
      color: #94a3b8;
      margin-left: 4px;
    }
  }

  .billing-actions {
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
  }
}

.payment-summary {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  padding: 24px;

  h2 {
    font-size: 16px;
    color: #1e3a5f;
    margin-bottom: 16px;
  }
}

.summary-table {
  .summary-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 12px 16px;
    background: #f8fafc;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
    margin-bottom: 8px;
  }

  .summary-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 12px 16px;
    font-size: 14px;
    color: #1e3a5f;
    border-bottom: 1px solid #f1f5f9;

    &:last-child {
      border-bottom: none;
    }

    span:last-child {
      font-weight: 600;
    }
  }
}
</style>
