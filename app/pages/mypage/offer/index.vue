<template>
  <div class="offer-page">
    <h1>オファー</h1>

    <div class="offer-stats">
      <div class="stat-card">
        <p class="stat-value">{{ stats.pending }}</p>
        <p class="stat-label">オファー中</p>
      </div>
      <div class="stat-card">
        <p class="stat-value">{{ stats.accepted }}</p>
        <p class="stat-label">承諾済み</p>
      </div>
      <div class="stat-card">
        <p class="stat-value">{{ stats.rejected }}</p>
        <p class="stat-label">見送り</p>
      </div>
    </div>

    <div class="offer-filters">
      <select v-model="filters.status">
        <option value="">すべてのステータス</option>
        <option value="pending">オファー中</option>
        <option value="accepted">承諾済み</option>
        <option value="rejected">見送り</option>
      </select>

      <select v-model="filters.sort">
        <option value="newest">新しい順</option>
        <option value="oldest">古い順</option>
        <option value="match">マッチング率順</option>
      </select>
    </div>

    <div class="offer-list">
      <div v-for="offer in filteredOffers" :key="offer.id" class="offer-card">
        <div class="offer-header">
          <div class="offer-info">
            <span class="candidate-id">候補者ID: {{ offer.candidateId }}</span>
            <span :class="['status-badge', offer.status]">{{ getStatusLabel(offer.status) }}</span>
          </div>
          <span class="match-rate">マッチング率 {{ offer.matchRate }}%</span>
        </div>

        <div class="offer-body">
          <div class="info-grid">
            <div class="info-item">
              <span class="label">希望職種</span>
              <span class="value">{{ offer.jobType }}</span>
            </div>
            <div class="info-item">
              <span class="label">経験年数</span>
              <span class="value">{{ offer.experience }}年</span>
            </div>
            <div class="info-item">
              <span class="label">希望勤務地</span>
              <span class="value">{{ offer.location }}</span>
            </div>
            <div class="info-item">
              <span class="label">提示年収</span>
              <span class="value">{{ offer.offeredSalary }}万円</span>
            </div>
          </div>

          <div class="offer-message">
            <p class="label">オファーメッセージ</p>
            <p class="message">{{ offer.message }}</p>
          </div>
        </div>

        <div class="offer-footer">
          <span class="offer-date">オファー日: {{ offer.offeredAt }}</span>
          <div class="offer-actions">
            <button class="btn btn-secondary" @click="handleDetail(offer.id)">詳細</button>
            <button 
              v-if="offer.status === 'pending'" 
              class="btn btn-danger" 
              @click="handleCancel(offer.id)"
            >
              取り下げ
            </button>
            <button 
              v-if="offer.status === 'accepted'" 
              class="btn btn-primary" 
              @click="handleNegotiation(offer.id)"
            >
              交渉へ進む
            </button>
          </div>
        </div>
      </div>

      <div v-if="filteredOffers.length === 0" class="empty-state">
        <p>オファーはありません</p>
        <NuxtLink to="/mypage/matching" class="btn btn-primary">マッチング候補を見る</NuxtLink>
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
  sort: 'newest'
})

const stats = reactive({
  pending: 3,
  accepted: 2,
  rejected: 1
})

const offers = ref([
  {
    id: 1,
    candidateId: 'A001',
    status: 'pending',
    matchRate: 95,
    jobType: '営業',
    experience: 5,
    location: '東京都',
    offeredSalary: 550,
    message: '貴方の経験を活かして、当社の営業チームを牽引していただきたいと考えております。',
    offeredAt: '2024-01-15'
  },
  {
    id: 2,
    candidateId: 'A002',
    status: 'accepted',
    matchRate: 87,
    jobType: 'エンジニア',
    experience: 3,
    location: '大阪府',
    offeredSalary: 480,
    message: 'フロントエンド開発のご経験を活かしていただければと思います。',
    offeredAt: '2024-01-10'
  },
  {
    id: 3,
    candidateId: 'A003',
    status: 'rejected',
    matchRate: 78,
    jobType: '管理職',
    experience: 10,
    location: '東京都',
    offeredSalary: 750,
    message: 'マネジメント経験を活かしていただきたいです。',
    offeredAt: '2024-01-08'
  },
  {
    id: 4,
    candidateId: 'A004',
    status: 'pending',
    matchRate: 82,
    jobType: 'マーケティング',
    experience: 4,
    location: '東京都',
    offeredSalary: 520,
    message: 'デジタルマーケティングの知見を活かしていただきたいです。',
    offeredAt: '2024-01-14'
  }
])

const filteredOffers = computed(() => {
  let result = [...offers.value]
  
  if (filters.status) {
    result = result.filter(o => o.status === filters.status)
  }

  if (filters.sort === 'newest') {
    result.sort((a, b) => new Date(b.offeredAt).getTime() - new Date(a.offeredAt).getTime())
  } else if (filters.sort === 'oldest') {
    result.sort((a, b) => new Date(a.offeredAt).getTime() - new Date(b.offeredAt).getTime())
  } else if (filters.sort === 'match') {
    result.sort((a, b) => b.matchRate - a.matchRate)
  }

  return result
})

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'オファー中',
    accepted: '承諾済み',
    rejected: '見送り'
  }
  return labels[status] || status
}

const handleDetail = (id: number) => {
  console.log('詳細:', id)
}

const handleCancel = (id: number) => {
  console.log('取り下げ:', id)
}

const handleNegotiation = (id: number) => {
  console.log('交渉へ:', id)
  navigateTo('/mypage/negotiation')
}
</script>

<style lang="scss" scoped>
.offer-page {
  h1 {
    margin-bottom: 24px;
    font-size: 24px;
    color: #1e3a5f;
  }
}

.offer-stats {
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
  }
}

.offer-filters {
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

.offer-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.offer-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.offer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;

  .offer-info {
    display: flex;
    align-items: center;
    gap: 12px;

    .candidate-id {
      font-size: 14px;
      font-weight: 600;
      color: #1e3a5f;
    }
  }

  .match-rate {
    font-size: 14px;
    color: #3b82f6;
    font-weight: 600;
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

  &.accepted {
    background: #d1fae5;
    color: #059669;
  }

  &.rejected {
    background: #fee2e2;
    color: #dc2626;
  }
}

.offer-body {
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
    }
  }
}

.offer-message {
  background: #f8fafc;
  padding: 16px;
  border-radius: 6px;

  .label {
    font-size: 12px;
    color: #94a3b8;
    margin-bottom: 8px;
  }

  .message {
    font-size: 14px;
    color: #475569;
    line-height: 1.6;
  }
}

.offer-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;

  .offer-date {
    font-size: 13px;
    color: #94a3b8;
  }

  .offer-actions {
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

.btn-danger {
  background: #fee2e2;
  color: #dc2626;

  &:hover {
    background: #fecaca;
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
