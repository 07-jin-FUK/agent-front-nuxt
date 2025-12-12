<template>
  <div class="results-page">
    <!-- ページヘッダー -->
    <div class="page-header">
      <div class="header-left">
        <button class="back-btn" @click="goBack">
          <span class="back-icon">←</span>
          戻る
        </button>
        <h1 class="page-title">検索結果</h1>
      </div>
      <button class="condition-btn" @click="openConditionModal">
        <span class="icon">📋</span>
        検索条件を確認する
      </button>
    </div>

    <!-- 検索結果サマリー -->
    <div class="results-summary">
      <p class="summary-text">
        <span class="count">{{ matchedUsers.length }}</span>件の求職者が見つかりました
      </p>
    </div>

    <!-- マッチしたユーザー一覧 -->
    <section class="users-section">
      <div class="users-list">
        <div v-for="user in matchedUsers" :key="user.id" class="user-card">
          <div class="user-header">
            <div class="user-avatar">
              <span class="avatar-icon">👤</span>
            </div>
            <div class="user-basic-info">
              <h3 class="user-name">{{ user.name }}</h3>
              <p class="user-id">ID: {{ user.id }}</p>
            </div>
            <div class="match-score">
              <span class="score-label">マッチ度</span>
              <span class="score-value">{{ user.matchScore }}%</span>
            </div>
          </div>

          <div class="user-body">
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">年齢</span>
                <span class="info-value">{{ user.age }}歳</span>
              </div>
              <div class="info-item">
                <span class="info-label">性別</span>
                <span class="info-value">{{ user.gender }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">現住所</span>
                <span class="info-value">{{ user.location }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">希望年収</span>
                <span class="info-value">{{ user.desiredSalary }}</span>
              </div>
            </div>

            <div class="experience-section">
              <p class="experience-label">経験職種</p>
              <p class="experience-value">{{ user.experience }}</p>
            </div>

            <div class="skills-section">
              <p class="skills-label">スキル・資格</p>
              <div class="skills-tags">
                <span v-for="skill in user.skills" :key="skill" class="skill-tag">{{ skill }}</span>
              </div>
            </div>
          </div>

          <div class="user-footer">
            <button class="detail-btn" @click="viewUserDetail(user.id)">詳細を見る</button>
            <button class="offer-btn" @click="sendOffer(user.id)">オファーを送る</button>
          </div>
        </div>
      </div>
    </section>

    <!-- ページネーション -->
    <div class="pagination">
      <button class="page-btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
        ← 前へ
      </button>
      <div class="page-numbers">
        <button
          v-for="page in totalPages"
          :key="page"
          class="page-number"
          :class="{ active: page === currentPage }"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
      </div>
      <button class="page-btn" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
        次へ →
      </button>
    </div>

    <!-- 検索条件確認モーダル -->
    <div v-if="isConditionModalOpen" class="modal-overlay" @click.self="closeConditionModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">検索条件</h3>
          <button class="modal-close" @click="closeConditionModal">✕</button>
        </div>

        <div class="modal-body">
          <!-- 経験職種 -->
          <div class="condition-block">
            <h4 class="condition-title">経験職種</h4>
            <div class="condition-content">
              <div v-for="category in searchCondition.jobCategories" :key="category.id" class="category-item">
                <p class="major-category">{{ category.name }}</p>
                <div v-for="middle in category.middleCategories" :key="middle.id" class="middle-item">
                  <p class="middle-name">{{ middle.name }}</p>
                  <p class="minor-content">{{ middle.minorCategories }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- パーソナル -->
          <div class="condition-block">
            <h4 class="condition-title">パーソナル</h4>
            <div class="condition-content">
              <div class="personal-grid">
                <div v-for="(item, index) in searchCondition.personal" :key="index" class="personal-item">
                  <span class="personal-label">{{ item.label }}：</span>
                  <span class="personal-value">{{ item.value || '指定なし' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 希望勤務地 -->
          <div class="condition-block">
            <h4 class="condition-title">希望勤務地</h4>
            <div class="condition-content">
              <div v-for="location in searchCondition.locations" :key="location.id" class="location-item">
                <p class="location-name">{{ location.name }}</p>
                <p class="location-cities">{{ location.cities }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-edit" @click="goToEditCondition">条件を編集する</button>
          <button class="btn-close" @click="closeConditionModal">閉じる</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mypage'
})

const route = useRoute()
const conditionId = route.query.id || '1'

// ページネーション
const currentPage = ref(1)
const totalPages = ref(5)

// モーダル制御
const isConditionModalOpen = ref(false)

// 検索条件データ（API想定）
const searchCondition = ref({
  id: conditionId,
  title: `求職者条件${conditionId}`,
  jobCategories: [
    {
      id: 1,
      name: 'ソフトウェア・ネットワーク関連',
      middleCategories: [
        {
          id: 1,
          name: 'オープン・Web系：5年以上',
          minorCategories: 'プロジェクトマネージャー・リーダー　システムエンジニア　プログラマー'
        },
        {
          id: 2,
          name: '汎用系：年齢問わず',
          minorCategories: 'システムエンジニア（汎用系）　プログラマー（汎用系）'
        }
      ]
    }
  ],
  personal: [
    { label: '年齢', value: '20～40' },
    { label: '性別', value: '指定しない' },
    { label: '現住所', value: '東京都世田谷区在住' },
    { label: '希望年収', value: '500万円以上～' },
    { label: '直近の勤務形態', value: '正社員' },
    { label: '雇用形態希望', value: '常駐' }
  ],
  locations: [
    { id: 1, name: '東京都', cities: '港区 新宿区 渋谷区 千代田区' },
    { id: 2, name: '神奈川県', cities: '横浜市 川崎市' }
  ]
})

// マッチしたユーザーデータ（API想定）
const matchedUsers = ref([
  {
    id: 'U001',
    name: '田中 一郎',
    age: 32,
    gender: '男性',
    location: '東京都渋谷区',
    desiredSalary: '550万円',
    experience: 'オープン・Web系 / システムエンジニア / 7年',
    skills: ['Java', 'Python', 'AWS', 'プロジェクトマネジメント'],
    matchScore: 95
  },
  {
    id: 'U002',
    name: '佐藤 花子',
    age: 28,
    gender: '女性',
    location: '東京都港区',
    desiredSalary: '480万円',
    experience: 'オープン・Web系 / プログラマー / 5年',
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
    matchScore: 88
  },
  {
    id: 'U003',
    name: '鈴木 太郎',
    age: 35,
    gender: '男性',
    location: '神奈川県横浜市',
    desiredSalary: '600万円',
    experience: '汎用系 / システムエンジニア / 10年',
    skills: ['COBOL', 'DB2', 'Linux', 'シェルスクリプト'],
    matchScore: 82
  },
  {
    id: 'U004',
    name: '山本 美咲',
    age: 26,
    gender: '女性',
    location: '東京都新宿区',
    desiredSalary: '450万円',
    experience: 'オープン・Web系 / プログラマー / 4年',
    skills: ['PHP', 'Laravel', 'MySQL', 'Docker'],
    matchScore: 78
  },
  {
    id: 'U005',
    name: '高橋 健一',
    age: 40,
    gender: '男性',
    location: '東京都千代田区',
    desiredSalary: '700万円',
    experience: 'オープン・Web系 / プロジェクトマネージャー / 12年',
    skills: ['PMP', 'Scrum Master', 'AWS', 'Azure'],
    matchScore: 75
  }
])

// モーダル開閉
const openConditionModal = () => {
  isConditionModalOpen.value = true
}

const closeConditionModal = () => {
  isConditionModalOpen.value = false
}

// ページ遷移
const goBack = () => {
  navigateTo('/mypage/matching')
}

const goToEditCondition = () => {
  closeConditionModal()
  navigateTo(`/mypage/matching/${conditionId}`)
}

const viewUserDetail = (userId: string) => {
  console.log('ユーザー詳細:', userId)
  // navigateTo(`/mypage/matching/user/${userId}`)
}

const sendOffer = (userId: string) => {
  console.log('オファー送信:', userId)
  // navigateTo(`/mypage/offer/new?userId=${userId}`)
}

// ページネーション
const changePage = (page: number) => {
  currentPage.value = page
  // API呼び出し
}
</script>

<style lang="scss" scoped>
.results-page {
  max-width: 1200px;
  margin: 0 auto;
}

// ページヘッダー
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
    color: #333;
  }

  .back-icon {
    font-size: 16px;
  }
}

.page-title {
  color: #0d0d0d;
  font-family: 'noto-sans-cjk-jp', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  margin: 0;
}

.condition-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #fff;
  border: 2px solid #2d2d2d;
  border-radius: 6px;
  font-family: 'noto-sans-cjk-jp', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #2d2d2d;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2d2d2d;
    color: #fff;
  }

  .icon {
    font-size: 16px;
  }
}

// 検索結果サマリー
.results-summary {
  background: #fff;
  padding: 16px 24px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.summary-text {
  font-family: 'noto-sans-cjk-jp', sans-serif;
  font-size: 16px;
  color: #333;
  margin: 0;

  .count {
    font-size: 24px;
    font-weight: 700;
    color: #2d2d2d;
  }
}

// ユーザー一覧
.users-section {
  margin-bottom: 32px;
}

.users-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.user-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  }
}

.user-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: #fafafa;
  border-bottom: 1px solid #e5e5e5;
}

.user-avatar {
  width: 50px;
  height: 50px;
  background: #e0e0e0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  .avatar-icon {
    font-size: 24px;
  }
}

.user-basic-info {
  flex: 1;
}

.user-name {
  font-family: 'noto-sans-cjk-jp', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #0d0d0d;
  margin: 0 0 4px 0;
}

.user-id {
  font-size: 12px;
  color: #999;
  margin: 0;
}

.match-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
}

.score-label {
  font-size: 11px;
  color: #666;
}

.score-value {
  font-size: 20px;
  font-weight: 700;
  color: #c97d02;
}

.user-body {
  padding: 24px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 12px;
  color: #999;
}

.info-value {
  font-family: 'noto-sans-cjk-jp', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.experience-section,
.skills-section {
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
}

.experience-label,
.skills-label {
  font-size: 12px;
  color: #999;
  margin: 0 0 6px 0;
}

.experience-value {
  font-family: 'noto-sans-cjk-jp', sans-serif;
  font-size: 14px;
  color: #333;
  margin: 0;
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  padding: 4px 12px;
  background: #f0f0f0;
  border-radius: 16px;
  font-size: 12px;
  color: #555;
}

.user-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  background: #fafafa;
  border-top: 1px solid #e5e5e5;
}

.detail-btn,
.offer-btn {
  padding: 10px 24px;
  border-radius: 6px;
  font-family: 'noto-sans-cjk-jp', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.detail-btn {
  background: #fff;
  border: 1px solid #d9d9d9;
  color: #333;

  &:hover {
    background: #f5f5f5;
  }
}

.offer-btn {
  background: #c97d02;
  border: none;
  color: #fff;

  &:hover {
    background: #b06e00;
  }
}

// ページネーション
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 24px 0;
}

.page-btn {
  padding: 8px 16px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #f5f5f5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.page-numbers {
  display: flex;
  gap: 8px;
}

.page-number {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
  }

  &.active {
    background: #2d2d2d;
    border-color: #2d2d2d;
    color: #fff;
  }
}

// モーダル
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: #fff;
  border-radius: 12px;
  width: 100%;
  max-width: 700px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e5e5;
}

.modal-title {
  font-family: 'noto-sans-cjk-jp', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #000;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #000;
  }
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.condition-block {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
}

.condition-title {
  font-family: 'noto-sans-cjk-jp', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #333;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #2d2d2d;
}

.condition-content {
  background: #f8f8f8;
  padding: 16px;
  border-radius: 8px;
}

.category-item {
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
}

.major-category {
  font-family: 'noto-sans-cjk-jp', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #c97d02;
  margin: 0 0 10px 0;
}

.middle-item {
  padding-left: 12px;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

.middle-name {
  font-family: 'noto-sans-cjk-jp', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #333;
  margin: 0 0 4px 0;
}

.minor-content {
  font-size: 12px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.personal-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.personal-item {
  font-size: 13px;
}

.personal-label {
  font-weight: 700;
  color: #333;
}

.personal-value {
  color: #555;
}

.location-item {
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
}

.location-name {
  font-family: 'noto-sans-cjk-jp', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #333;
  margin: 0 0 4px 0;
}

.location-cities {
  font-size: 12px;
  color: #666;
  margin: 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #e5e5e5;
}

.btn-edit,
.btn-close {
  padding: 10px 24px;
  border-radius: 6px;
  font-family: 'noto-sans-cjk-jp', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-edit {
  background: #fff;
  border: 1px solid #2d2d2d;
  color: #2d2d2d;

  &:hover {
    background: #f5f5f5;
  }
}

.btn-close {
  background: #2d2d2d;
  border: none;
  color: #fff;

  &:hover {
    background: #1a1a1a;
  }
}
</style>
