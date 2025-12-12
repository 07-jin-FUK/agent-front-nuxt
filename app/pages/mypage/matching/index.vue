<template>
  <div>
    <h1 class="page-title">求職者検索</h1>

    <!-- フィルターセクション -->
    <section class="filter-section">
      <div class="filter-row">
        <label class="filter-label">経験職種</label>
        <button class="dropdown-btn" @click="openModal('jobType')">
          選択する <span class="arrow">+</span>
        </button>
      </div>

      <div class="filter-row">
        <label class="filter-label">希望職種</label>
        <button class="dropdown-btn" @click="openModal('desiredJob')">
          選択する <span class="arrow">+</span>
        </button>
      </div>

      <div class="filter-row">
        <label class="filter-label">希望勤務地</label>
        <button class="dropdown-btn" @click="openModal('location')">
          選択する <span class="arrow">+</span>
        </button>
      </div>

      <div class="filter-row">
        <label class="filter-label">年齢</label>
        <div class="age-range">
          <input v-model="filters.ageMin" type="number" class="age-input" />
          <span class="age-unit">歳</span>
          <span class="age-separator">～</span>
          <input v-model="filters.ageMax" type="number" class="age-input" />
          <span class="age-unit">歳</span>
        </div>
      </div>
<div class="filter-actions">
  <button class="add-condition-btn" @click="toggleAdvanced">
    {{ isAdvancedOpen ? '－' : '＋' }} さらに詳しい条件を追加
  </button>
  <div class="filter-actions-right">
    <button class="save-condition-btn" @click="handleSaveCondition">
      条件を保存する
    </button>
    <button class="search-main-btn" @click="handleMainSearch">
      検索
    </button>
  </div>
</div>

      <!-- 詳細条件セクション（アコーディオン） -->
      <div v-if="isAdvancedOpen" class="advanced-section">
        
        <!-- 性別 -->
        <div class="advanced-block">
          <h3 class="advanced-title">性別</h3>
          <div class="advanced-box">
            <div class="radio-group">
              <label v-for="opt in genderOptions" :key="opt.value" class="radio-label">
                <input type="radio" v-model="advancedFilters.gender" :value="opt.value" />
                {{ opt.label }}
              </label>
            </div>
          </div>
        </div>

        <!-- 現住所 -->
        <div class="advanced-block">
          <h3 class="advanced-title">現住所</h3>
          <div class="advanced-box">
            <p class="form-note">後日実装予定</p>
          </div>
        </div>

        <!-- 希望年収 -->
        <div class="advanced-block">
          <h3 class="advanced-title">希望年収</h3>
          <div class="advanced-box">
            <div class="range-input">
              <input 
                v-model="advancedFilters.salary.min" 
                type="number" 
                class="number-input" 
                :disabled="advancedFilters.salary.notSpecified"
              />
              <span class="range-unit">万円</span>
              <span class="range-separator">～</span>
              <input 
                v-model="advancedFilters.salary.max" 
                type="number" 
                class="number-input" 
                :disabled="advancedFilters.salary.notSpecified"
              />
              <span class="range-unit">万円</span>
            </div>
            <label class="checkbox-label">
              <input type="checkbox" v-model="advancedFilters.salary.notSpecified" />
              指定しない
            </label>
          </div>
        </div>

        <!-- 転職希望時期 -->
        <div class="advanced-block">
          <h3 class="advanced-title">転職希望時期</h3>
          <div class="advanced-box">
            <select v-model="advancedFilters.jobChangeTiming" class="form-select">
              <option v-for="opt in jobChangeTimingOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- 役職 -->
        <div class="advanced-block">
          <h3 class="advanced-title">役職</h3>
          <div class="advanced-box">
            <div class="checkbox-group">
              <label v-for="opt in positionOptions" :key="opt.value" class="checkbox-label">
                <input 
                  type="checkbox" 
                  :value="opt.value" 
                  v-model="advancedFilters.positions.values"
                  :disabled="advancedFilters.positions.notSpecified"
                />
                {{ opt.label }}
              </label>
            </div>
            <label class="checkbox-label not-specified">
              <input type="checkbox" v-model="advancedFilters.positions.notSpecified" @change="onPositionsNotSpecifiedChange" />
              指定しない
            </label>
          </div>
        </div>

        <!-- マネジメント年数 -->
        <div class="advanced-block">
          <h3 class="advanced-title">マネジメント年数</h3>
          <div class="advanced-box">
            <select v-model="advancedFilters.managementYears" class="form-select">
              <option v-for="opt in managementYearsOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- 英語力 -->
        <div class="advanced-block">
          <h3 class="advanced-title">英語力</h3>
          <div class="advanced-box">
            <select v-model="advancedFilters.englishLevel" class="form-select">
              <option v-for="opt in englishLevelOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </div>
        </div>
        
          <!-- 詳細条件の下部アクション -->
  <div class="advanced-actions">
    <button class="save-condition-btn" @click="handleSaveCondition">
      条件を保存する
    </button>
  </div>

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

    <!-- 選択モーダル -->
    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">{{ getModalTitle() }}</h3>
          <button class="modal-close" @click="closeModal">✕</button>
        </div>
        <div class="modal-body">
          <p class="form-note">この機能は開発中です</p>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="closeModal">キャンセル</button>
          <button class="btn-save" @click="closeModal">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mypage'
})

// 基本フィルター
const filters = reactive({
  jobType: '',
  desiredJob: '',
  location: '',
  ageMin: '',
  ageMax: ''
})

// 詳細条件の開閉
const isAdvancedOpen = ref(false)

const toggleAdvanced = () => {
  isAdvancedOpen.value = !isAdvancedOpen.value
}

// 選択肢の定数
const genderOptions = [
  { value: 'male', label: '男性' },
  { value: 'female', label: '女性' },
  { value: 'notSpecified', label: '指定しない' },
]

const jobChangeTimingOptions = [
  { value: '1month', label: '1ヶ月以内' },
  { value: '3months', label: '3ヶ月以内' },
  { value: '6months', label: '6ヶ月以内' },
  { value: '1year', label: '1年以内' },
  { value: 'over1year', label: '1年よりも先' },
  { value: 'notConsidering', label: '転職を考えていない' },
  { value: 'notSpecified', label: '指定しない' },
]

const positionOptions = [
  { value: 'none', label: '役職なし' },
  { value: 'leader', label: '係長／リーダークラス' },
  { value: 'manager', label: '課長／マネージャー' },
  { value: 'director', label: '部長／ゼネラルマネージャークラス' },
  { value: 'executive', label: '役員クラス' },
  { value: 'president', label: '代表・社長' },
]

const managementYearsOptions = [
  { value: 'none', label: '経験なし' },
  { value: 'lessThan1', label: '1年未満' },
  { value: '1', label: '1年以上' },
  { value: '2', label: '2年以上' },
  { value: '3', label: '3年以上' },
  { value: '5', label: '5年以上' },
  { value: '10', label: '10年以上' },
  { value: 'notSpecified', label: '指定しない' },
]

const englishLevelOptions = [
  { value: 'native', label: 'ネイティブレベル' },
  { value: 'business', label: 'ビジネス会話レベル以上' },
  { value: 'daily', label: '日常会話レベル以上' },
  { value: 'none', label: '当てはまるものはない' },
  { value: 'notSpecified', label: '指定しない' },
]

// 詳細フィルター
const advancedFilters = reactive({
  gender: 'notSpecified',
  salary: { min: '', max: '', notSpecified: true },
  jobChangeTiming: 'notSpecified',
  positions: { values: [] as string[], notSpecified: true },
  managementYears: 'notSpecified',
  englishLevel: 'notSpecified',
})

// 役職の「指定しない」チェック時
const onPositionsNotSpecifiedChange = () => {
  if (advancedFilters.positions.notSpecified) {
    advancedFilters.positions.values = []
  }
}

// モーダル制御
const isModalOpen = ref(false)
const currentModalType = ref('')

const openModal = (type: string) => {
  currentModalType.value = type
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const getModalTitle = () => {
  const titles: Record<string, string> = {
    jobType: '経験職種',
    desiredJob: '希望職種',
    location: '希望勤務地',
  }
  return titles[currentModalType.value] || ''
}

// 求職者条件カード
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
    title: '求職者条件2',
    age: '20～40',
    jobType: 'オープン・Web系：5年以上…',
    location: '東京都　港区 新宿区 渋谷区'
  },
  {
    id: 3,
    title: '求職者条件3',
    age: '20～40',
    jobType: 'オープン・Web系：5年以上…',
    location: '東京都　港区 新宿区 渋谷区'
  }
])

const handleSearch = (id: number) => {
  navigateTo(`/mypage/matching/${id}`)
}

const handleMainSearch = () => {
  console.log('検索実行:', { filters, advancedFilters })
}

const handleSaveCondition = () => {
  const conditionToSave = {
    ...filters,
    advanced: { ...advancedFilters }
  }
  console.log('条件を保存:', conditionToSave)
  // TODO: API連携時にここで保存処理
  alert('条件を保存しました（※現在はダミー動作です）')
}
</script>

<style lang="scss" scoped>
.page-title {
  color: #0D0D0D;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 1px;
  margin-bottom: 30px;
}

// フィルターセクション
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
}

.filter-label {
  min-width: 100px;
  color: #000;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
}

.dropdown-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #2D2D2D;
  color: #FFF;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #1a1a1a;
  }

  .arrow {
    font-size: 12px;
  }
}

.age-range {
  display: flex;
  align-items: center;
  gap: 8px;
}

.age-input {
  width: 80px;
  padding: 8px 12px;
  border: 1px solid #D9D9D9;
  border-radius: 4px;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #2D2D2D;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
}

.age-unit,
.age-separator {
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  color: #000;
}

.filter-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
}

.add-condition-btn {
  background: none;
  border: 1px solid #D9D9D9;
  padding: 10px 20px;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  color: #000;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #F5F5F5;
  }
}

.search-main-btn {
  padding: 10px 30px;
  background: #2D2D2D;
  color: #FFF;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #1a1a1a;
  }
}

// 詳細条件セクション
.advanced-section {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #E5E5E5;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.advanced-block {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.advanced-title {
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #000;
  margin: 0 0 10px 0;
}

.advanced-box {
  background: #F0F0F0;
  padding: 20px;
  border-radius: 12px;
}

.range-input {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.number-input {
  width: 100px;
  padding: 8px 12px;
  border: 1px solid #D9D9D9;
  border-radius: 6px;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  background: #FFF;

  &:focus {
    outline: none;
    border-color: #2D2D2D;
  }

  &:disabled {
    background: #F5F5F5;
    color: #999;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
}

.range-unit,
.range-separator {
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  color: #000;
}

.form-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #D9D9D9;
  border-radius: 6px;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  color: #000;
  background: #FFF;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #2D2D2D;
  }
}

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.radio-label,
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  input[type="radio"],
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  &.not-specified {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #D9D9D9;
  }
}

.form-note {
  color: #999;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 13px;
  margin: 0;
  padding: 12px;
  background: #FFF;
  border-radius: 6px;
  text-align: center;
}

// 求職者条件カード
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
}

.modal-content {
  background: #FFF;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E5E5E5;
}

.modal-title {
  font-family: "noto-sans-cjk-jp", sans-serif;
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

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #E5E5E5;
}

.btn-cancel,
.btn-save {
  padding: 10px 24px;
  border-radius: 6px;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel {
  background: #FFF;
  color: #666;
  border: 1px solid #D9D9D9;

  &:hover {
    background: #F5F5F5;
  }
}

.btn-save {
  background: #2D2D2D;
  color: #FFF;
  border: none;

  &:hover {
    background: #1a1a1a;
  }
}

.filter-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
}

.filter-actions-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.save-condition-btn {
  padding: 10px 20px;
  background: #FFF;
  color: #2D2D2D;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #2D2D2D;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2D2D2D;
    color: #FFF;
  }
}

.advanced-actions {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #E5E5E5;
}
</style>
