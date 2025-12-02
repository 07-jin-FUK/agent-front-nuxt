<template>
  <div class="matching-page">
    <h1>マッチング</h1>
    
    <div class="matching-filters">
      <h2>絞り込み条件</h2>
      <div class="filter-group">
        <label>マッチング率</label>
        <select v-model="filters.matchRate">
          <option value="">すべて</option>
          <option value="90">90%以上</option>
          <option value="80">80%以上</option>
          <option value="70">70%以上</option>
        </select>
      </div>
    </div>

    <div class="matching-list">
      <h2>マッチング候補一覧</h2>
      
      <div v-for="candidate in candidates" :key="candidate.id" class="candidate-card">
        <div class="candidate-header">
          <span class="match-rate">{{ candidate.matchRate }}%</span>
          <span class="candidate-id">ID: {{ candidate.id }}</span>
        </div>
        
        <div class="candidate-body">
          <div class="info-row">
            <span class="label">希望職種</span>
            <span class="value">{{ candidate.jobType }}</span>
          </div>
          <div class="info-row">
            <span class="label">経験年数</span>
            <span class="value">{{ candidate.experience }}年</span>
          </div>
          <div class="info-row">
            <span class="label">希望勤務地</span>
            <span class="value">{{ candidate.location }}</span>
          </div>
          <div class="info-row">
            <span class="label">希望年収</span>
            <span class="value">{{ candidate.salary }}万円</span>
          </div>
        </div>

        <div class="candidate-actions">
          <button class="btn btn-primary" @click="handleBid(candidate.id)">オファーする</button>
          <button class="btn btn-secondary" @click="handleDetail(candidate.id)">詳細を見る</button>
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
  matchRate: ''
})

// ダミーデータ
const candidates = ref([
  {
    id: 'A001',
    matchRate: 95,
    jobType: '営業',
    experience: 5,
    location: '東京都',
    salary: 500
  },
  {
    id: 'A002',
    matchRate: 87,
    jobType: 'エンジニア',
    experience: 3,
    location: '大阪府',
    salary: 450
  },
  {
    id: 'A003',
    matchRate: 78,
    jobType: '管理職',
    experience: 10,
    location: '東京都',
    salary: 700
  }
])

const handleBid = (id: string) => {
  console.log('入札:', id)
  navigateTo('/mypage/bid')
}

const handleDetail = (id: string) => {
  console.log('詳細:', id)
}
</script>

<style lang="scss" scoped>
.matching-page {
  h1 {
    margin-bottom: 24px;
    font-size: 24px;
    color: #1e3a5f;
  }
}

.matching-filters {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 24px;

  h2 {
    font-size: 16px;
    margin-bottom: 16px;
  }

  .filter-group {
    display: flex;
    align-items: center;
    gap: 12px;

    label {
      font-size: 14px;
      color: #64748b;
    }

    select {
      padding: 8px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
    }
  }
}

.matching-list {
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
  }
}

.candidate-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid #e2e8f0;
}

.candidate-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;

  .match-rate {
    font-size: 24px;
    font-weight: 700;
    color: #3b82f6;
  }

  .candidate-id {
    font-size: 14px;
    color: #94a3b8;
  }
}

.candidate-body {
  margin-bottom: 16px;

  .info-row {
    display: flex;
    padding: 8px 0;
    border-bottom: 1px solid #f1f5f9;

    &:last-child {
      border-bottom: none;
    }

    .label {
      width: 120px;
      font-size: 14px;
      color: #64748b;
    }

    .value {
      font-size: 14px;
      color: #1e3a5f;
    }
  }
}

.candidate-actions {
  display: flex;
  gap: 12px;

  .btn {
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    border: none;
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
    color: #1e3a5f;
    border: 1px solid #e2e8f0;

    &:hover {
      background: #f8fafc;
    }
  }
}
</style>
