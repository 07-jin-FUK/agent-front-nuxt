<template>
  <div class="offer-active-page">
    <h1>参加中のオファー</h1>

    <div class="active-stats">
      <div class="stat-card">
        <p class="stat-value">{{ activeOffers.length }}</p>
        <p class="stat-label">参加中</p>
      </div>
      <div class="stat-card">
        <p class="stat-value">{{ expiringCount }}</p>
        <p class="stat-label">期限間近（3日以内）</p>
      </div>
    </div>

    <div class="offer-list">
      <div 
        v-for="offer in activeOffers" 
        :key="offer.id" 
        :class="['offer-card', { expiring: offer.daysLeft <= 3 }]"
      >
        <div class="offer-header">
          <div class="offer-info">
            <span class="candidate-id">候補者ID: {{ offer.candidateId }}</span>
            <span class="match-rate">マッチング率 {{ offer.matchRate }}%</span>
          </div>
          <div :class="['deadline', { urgent: offer.daysLeft <= 3 }]">
            <span class="icon">⏰</span>
            <span>残り {{ offer.daysLeft }}日</span>
          </div>
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

          <div class="offer-progress">
            <p class="progress-label">オファー状況</p>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: offer.progress + '%' }"></div>
            </div>
            <p class="progress-text">{{ offer.progressText }}</p>
          </div>
        </div>

        <div class="offer-footer">
          <span class="offer-date">オファー日: {{ offer.offeredAt }}</span>
          <div class="offer-actions">
            <button class="btn btn-secondary" @click="handleDetail(offer.id)">詳細</button>
            <button class="btn btn-primary" @click="handleEdit(offer.id)">条件変更</button>
            <button class="btn btn-danger" @click="handleCancel(offer.id)">取り下げ</button>
          </div>
        </div>
      </div>

      <div v-if="activeOffers.length === 0" class="empty-state">
        <p>参加中のオファーはありません</p>
        <NuxtLink to="/mypage/matching" class="btn btn-primary">マッチング候補を見る</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mypage'
})

const activeOffers = ref([
  {
    id: 1,
    candidateId: 'A001',
    matchRate: 95,
    jobType: '営業',
    experience: 5,
    location: '東京都',
    offeredSalary: 550,
    offeredAt: '2024-01-15',
    daysLeft: 5,
    progress: 50,
    progressText: '候補者確認中'
  },
  {
    id: 2,
    candidateId: 'A004',
    matchRate: 82,
    jobType: 'マーケティング',
    experience: 4,
    location: '東京都',
    offeredSalary: 520,
    offeredAt: '2024-01-14',
    daysLeft: 2,
    progress: 75,
    progressText: '候補者検討中'
  },
  {
    id: 3,
    candidateId: 'A007',
    matchRate: 88,
    jobType: 'エンジニア',
    experience: 6,
    location: '福岡県',
    offeredSalary: 600,
    offeredAt: '2024-01-12',
    daysLeft: 7,
    progress: 25,
    progressText: '書類確認中'
  }
])

const expiringCount = computed(() => {
  return activeOffers.value.filter(o => o.daysLeft <= 3).length
})

const handleDetail = (id: number) => {
  console.log('詳細:', id)
}

const handleEdit = (id: number) => {
  console.log('条件変更:', id)
}

const handleCancel = (id: number) => {
  console.log('取り下げ:', id)
}
</script>

<style lang="scss" scoped>
.offer-active-page {
  h1 {
    margin-bottom: 24px;
    font-size: 24px;
    color: #1e3a5f;
  }
}

.active-stats {
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
      color: #f59e0b;
    }
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

  &.expiring {
    border-color: #f59e0b;
    box-shadow: 0 0 0 1px #fef3c7;
  }
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
    gap: 16px;

    .candidate-id {
      font-size: 14px;
      font-weight: 600;
      color: #1e3a5f;
    }

    .match-rate {
      font-size: 14px;
      color: #3b82f6;
      font-weight: 600;
    }
  }
}

.deadline {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #e2e8f0;
  border-radius: 16px;
  font-size: 13px;
  color: #475569;

  &.urgent {
    background: #fef3c7;
    color: #d97706;
  }

  .icon {
    font-size: 14px;
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

.offer-progress {
  background: #f8fafc;
  padding: 16px;
  border-radius: 6px;

  .progress-label {
    font-size: 12px;
    color: #94a3b8;
    margin-bottom: 8px;
  }

  .progress-bar {
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 8px;
  }

  .progress-fill {
    height: 100%;
    background: #3b82f6;
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 13px;
    color: #475569;
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
