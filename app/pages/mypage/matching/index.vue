<template>
  <div>
    <h1 class="page-title">求職者検索</h1>

    <!-- フィルターセクション -->
    <section class="filter-section">
      <div class="filter-row">
        <label class="filter-label">経験職種</label>
        <select v-model="filters.jobType" class="filter-select">
          <option value="">選択してください</option>
          <option value="sales">営業</option>
          <option value="engineer">エンジニア</option>
          <option value="management">管理職</option>
        </select>
        <button class="submit-btn">送信する ▼</button>
      </div>

      <div class="filter-row">
        <label class="filter-label">希望年収</label>
        <select v-model="filters.salary" class="filter-select">
          <option value="">選択してください</option>
          <option value="300-400">300-400万円</option>
          <option value="400-500">400-500万円</option>
          <option value="500-600">500-600万円</option>
          <option value="600+">600万円以上</option>
        </select>
        <button class="submit-btn">送信する ▼</button>
      </div>

      <div class="filter-row">
        <label class="filter-label">希望勤務地</label>
        <select v-model="filters.location" class="filter-select">
          <option value="">選択してください</option>
          <option value="tokyo">東京都</option>
          <option value="osaka">大阪府</option>
          <option value="nagoya">愛知県</option>
        </select>
        <button class="submit-btn">送信する ▼</button>
      </div>
    </section>

    <!-- 求職者条件カード -->
    <section class="candidates-section">
      <div class="candidates-grid">
        <div v-for="condition in conditions" :key="condition.id" class="condition-card">
          <div class="card-header">
            <h3 class="card-title">{{ condition.title }}</h3>
          </div>
          <div class="card-body">
            <p class="condition-text">年齢：{{ condition.age }}</p>
            <p class="condition-text">経験職種：{{ condition.jobType }}</p>
            <p class="condition-text">希望勤務地：{{ condition.location }}</p>
          </div>
          <div class="card-footer">
            <button class="search-btn" @click="handleSearch(condition.id)">検索する</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mypage'
})

const filters = reactive({
  jobType: '',
  salary: '',
  location: ''
})

const conditions = ref([
  {
    id: 1,
    title: '求職者条件1',
    age: '20～40',
    jobType: 'オープン・Web系：5年以上…',
    location: '東京都　港区 新宿区 渋谷区'
  },
  {
    id: 2,
    title: '求職者条件1',
    age: '20～40',
    jobType: 'オープン・Web系：5年以上…',
    location: '東京都　港区 新宿区 渋谷区'
  },
  {
    id: 3,
    title: '求職者条件1',
    age: '20～40',
    jobType: 'オープン・Web系：5年以上…',
    location: '東京都　港区 新宿区 渋谷区'
  }
])

const handleSearch = (id: number) => {
  navigateTo(`/mypage/matching/${id}`)
}
</script>

<style lang="scss" scoped>
.page-title {
  color: #0D0D0D;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 1px;
  margin-bottom: 30px;
}

.filter-section {
  background: #FFF;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 6px 6px 54px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px 0;
  border-bottom: 1px solid #E5E5E5;

  &:last-child {
    border-bottom: none;
  }
}

.filter-label {
  min-width: 100px;
  color: #000;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 1;
}

.filter-select {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #D9D9D9;
  border-radius: 4px;
  background: #FFF;
  color: #000;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
}

.submit-btn {
  min-width: 120px;
  padding: 8px 20px;
  background: #2D2D2D;
  color: #FFF;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 1;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #1a1a1a;
  }
}

.candidates-section {
  margin-bottom: 40px;
}

.candidates-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.condition-card {
  background: #FFF;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  background: #2D2D2D;
  padding: 15px 20px;

  .card-title {
    color: #FFF;
    font-family: "noto-sans-cjk-jp", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 1;
    margin: 0;
  }
}

.card-body {
  padding: 20px;

  .condition-text {
    color: #000;
    font-family: "noto-sans-cjk-jp", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.6;
    margin: 0 0 10px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.card-footer {
  padding: 0 20px 20px 20px;
  display: flex;
  justify-content: center;
}

.search-btn {
  width: 100%;
  max-width: 120px;
  padding: 8px 20px;
  background: #F3F3F3;
  color: #202224;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #E0E0E0;
  }
}
</style>
