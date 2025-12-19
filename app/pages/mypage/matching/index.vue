<template>
  <div class="all-page">
    <h1 class="page-title">求職者検索</h1>

    <!-- フィルターセクション -->
    <section class="filter-section">
      <div class="filter-row">
        <label class="filter-label">経験職種</label>
        <button class="dropdown-btn" @click="openModal('jobType')">
          選択する
          <span class="arrow">+</span>
        </button>
      </div>

      <div class="filter-row">
        <label class="filter-label">希望職種</label>
        <button class="dropdown-btn" @click="openModal('desiredJob')">
          選択する
          <span class="arrow">+</span>
        </button>
      </div>

      <div class="filter-row">
        <label class="filter-label">希望勤務地</label>
        <button class="dropdown-btn" @click="openModal('location')">
          選択する
          <span class="arrow">+</span>
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
          <span class="toggle-status">{{ isAdvancedOpen ? "－" : "＋" }}</span>
          さらに詳しい条件を追加
        </button>
        <button class="search-main-btn" @click="handleMainSearch">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 3.5C7.54131 3.5 6.14236 4.07946 5.11091 5.11091C4.07946 6.14236 3.5 7.54131 3.5 9C3.5 10.4587 4.07946 11.8576 5.11091 12.8891C6.14236 13.9205 7.54131 14.5 9 14.5C10.4587 14.5 11.8576 13.9205 12.8891 12.8891C13.9205 11.8576 14.5 10.4587 14.5 9C14.5 7.54131 13.9205 6.14236 12.8891 5.11091C11.8576 4.07946 10.4587 3.5 9 3.5ZM2 9C2.00009 7.88067 2.26861 6.77768 2.78303 5.78356C3.29745 4.78944 4.04276 3.93318 4.95645 3.28659C5.87015 2.64001 6.92557 2.22197 8.0342 2.06754C9.14282 1.9131 10.2723 2.02677 11.3279 2.39902C12.3836 2.77127 13.3345 3.39123 14.101 4.20691C14.8676 5.02259 15.4273 6.0102 15.7333 7.08689C16.0393 8.16358 16.0827 9.29795 15.8597 10.3949C15.6368 11.4918 15.154 12.5192 14.452 13.391L17.78 16.72C17.8537 16.7887 17.9128 16.8715 17.9538 16.9635C17.9948 17.0555 18.0168 17.1548 18.0186 17.2555C18.0204 17.3562 18.0018 17.4562 17.9641 17.5496C17.9264 17.643 17.8703 17.7278 17.799 17.799C17.7278 17.8703 17.643 17.9264 17.5496 17.9641C17.4562 18.0018 17.3562 18.0204 17.2555 18.0186C17.1548 18.0168 17.0555 17.9948 16.9635 17.9538C16.8715 17.9128 16.7887 17.8537 16.72 17.78L13.391 14.452C12.3625 15.2804 11.1207 15.8009 9.80901 15.9536C8.49727 16.1062 7.16912 15.8846 5.97795 15.3145C4.78677 14.7444 3.78117 13.849 3.07727 12.7316C2.37338 11.6143 1.99991 10.3206 2 9Z" fill="white"/>
</svg>
            検索</button>
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
              <input v-model="advancedFilters.salary.min" type="number" class="number-input" :disabled="advancedFilters.salary.notSpecified" />
              <span class="range-unit">万円</span>
              <span class="range-separator">～</span>
              <input v-model="advancedFilters.salary.max" type="number" class="number-input" :disabled="advancedFilters.salary.notSpecified" />
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
                <input type="checkbox" :value="opt.value" v-model="advancedFilters.positions.values" :disabled="advancedFilters.positions.notSpecified" />
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
        
        <!-- 条件名（追加） -->
<div class="advanced-block">
  <h3 class="advanced-title">条件名</h3>
  <div class="advanced-box">
    <input 
      v-model="advancedFilters.conditionName" 
      type="text" 
      class="condition-name-input" 
      placeholder="例: エンジニア条件、営業職条件"
    />
    <p class="input-note">※条件を保存したいは記入ください。未入力で保存する場合は「求職者条件◯」として保存されます。</p>
  </div>
</div>

        <!-- 詳細条件の下部アクション -->
        <div class="advanced-actions">
          <button class="search-main-btn" @click="handleMainSearch">検索する</button>
          <!-- <button class="save-condition-btn" @click="handleSaveCondition">
            条件を保存する
          </button> -->
        </div>
      </div>
    </section>

    <!-- 求職者条件カード -->
    <section class="candidates-section">
          <h2 class="section-subtitle">マッチング条件</h2>
      <div class="candidates-grid">
        <div v-for="condition in conditions" :key="condition.id" class="condition-card">
          <div class="card-header">
            <div v-if="editingId === condition.id" class="title-edit-wrapper">
              <input v-model="editingTitle" @blur="saveTitle(condition.id)" @keyup.enter="saveTitle(condition.id)" @keyup.esc="cancelEdit" class="card-title-input" autofocus />
            </div>
            <div v-else class="title-display-wrapper" @click="startEdit(condition.id, condition.title)">
              <h3 class="card-title">{{ condition.title }}</h3>
              <svg class="edit-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 1.5L12.5 3.5L4.5 11.5H2.5V9.5L10.5 1.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8.5 3.5L10.5 5.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
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

    <!-- 検索条件保存確認モーダル -->
  <!-- 検索条件保存確認モーダル -->
<div v-if="isConfirmModalOpen" class="modal-overlay" @click.self="closeConfirmModal">
  <div class="modal-content confirm-modal">
    <div class="modal-header">
      <h3 class="modal-title">検索条件の保存</h3>
      <button class="modal-close" @click="closeConfirmModal">✕</button>
    </div>
    <div class="modal-body">
      <p class="confirm-text">以下の条件で検索します。この条件を保存しますか？</p>
      
      <!-- 選択中の条件を表示 -->
      <div class="condition-preview">
        <div class="preview-section" v-if="advancedFilters.conditionName.trim()">
          <span class="preview-label">条件名：</span>
          <span class="preview-value">{{ advancedFilters.conditionName }}</span>
        </div>
        
        <div class="preview-section" v-if="filters.ageMin || filters.ageMax">
          <span class="preview-label">年齢：</span>
          <span class="preview-value">
            {{ filters.ageMin || '指定なし' }}～{{ filters.ageMax || '指定なし' }}歳
          </span>
        </div>
        
        <div class="preview-section" v-if="advancedFilters.gender !== 'notSpecified'">
          <span class="preview-label">性別：</span>
          <span class="preview-value">{{ getGenderLabel(advancedFilters.gender) }}</span>
        </div>
        
        <div class="preview-section" v-if="!advancedFilters.salary.notSpecified && (advancedFilters.salary.min || advancedFilters.salary.max)">
          <span class="preview-label">希望年収：</span>
          <span class="preview-value">
            {{ advancedFilters.salary.min || '指定なし' }}～{{ advancedFilters.salary.max || '指定なし' }}万円
          </span>
        </div>
        
        <div class="preview-section" v-if="advancedFilters.jobChangeTiming !== 'notSpecified'">
          <span class="preview-label">転職希望時期：</span>
          <span class="preview-value">{{ getJobChangeTimingLabel(advancedFilters.jobChangeTiming) }}</span>
        </div>
        
        <div class="preview-section" v-if="!advancedFilters.positions.notSpecified && advancedFilters.positions.values.length > 0">
          <span class="preview-label">役職：</span>
          <span class="preview-value">{{ getPositionLabels(advancedFilters.positions.values) }}</span>
        </div>
        
        <div class="preview-section" v-if="advancedFilters.managementYears !== 'notSpecified'">
          <span class="preview-label">マネジメント年数：</span>
          <span class="preview-value">{{ getManagementYearsLabel(advancedFilters.managementYears) }}</span>
        </div>
        
        <div class="preview-section" v-if="advancedFilters.englishLevel !== 'notSpecified'">
          <span class="preview-label">英語力：</span>
          <span class="preview-value">{{ getEnglishLevelLabel(advancedFilters.englishLevel) }}</span>
        </div>
        
        <p class="preview-note" v-if="isAllNotSpecified()">※詳細条件が指定されていません</p>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-cancel" @click="executeSearchWithoutSaving">保存せずに検索</button>
      <button class="btn-save" @click="executeSearchWithSaving">保存して検索</button>
    </div>
  </div>
</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "mypage",
});

// 基本フィルター
const filters = reactive({
  jobType: "",
  desiredJob: "",
  location: "",
  ageMin: "",
  ageMax: "",
});

// 詳細条件の開閉
const isAdvancedOpen = ref(false);

const toggleAdvanced = () => {
  isAdvancedOpen.value = !isAdvancedOpen.value;
};

// 選択肢の定数
const genderOptions = [
  { value: "male", label: "男性" },
  { value: "female", label: "女性" },
  { value: "notSpecified", label: "指定しない" },
];

const jobChangeTimingOptions = [
  { value: "1month", label: "1ヶ月以内" },
  { value: "3months", label: "3ヶ月以内" },
  { value: "6months", label: "6ヶ月以内" },
  { value: "1year", label: "1年以内" },
  { value: "over1year", label: "1年よりも先" },
  { value: "notConsidering", label: "転職を考えていない" },
  { value: "notSpecified", label: "指定しない" },
];

const positionOptions = [
  { value: "none", label: "役職なし" },
  { value: "leader", label: "係長／リーダークラス" },
  { value: "manager", label: "課長／マネージャー" },
  { value: "director", label: "部長／ゼネラルマネージャークラス" },
  { value: "executive", label: "役員クラス" },
  { value: "president", label: "代表・社長" },
];

const managementYearsOptions = [
  { value: "none", label: "経験なし" },
  { value: "lessThan1", label: "1年未満" },
  { value: "1", label: "1年以上" },
  { value: "2", label: "2年以上" },
  { value: "3", label: "3年以上" },
  { value: "5", label: "5年以上" },
  { value: "10", label: "10年以上" },
  { value: "notSpecified", label: "指定しない" },
];

const englishLevelOptions = [
  { value: "native", label: "ネイティブレベル" },
  { value: "business", label: "ビジネス会話レベル以上" },
  { value: "daily", label: "日常会話レベル以上" },
  { value: "none", label: "当てはまるものはない" },
  { value: "notSpecified", label: "指定しない" },
];

// 詳細フィルター
const advancedFilters = reactive({
  gender: "notSpecified",
  salary: { min: "", max: "", notSpecified: true },
  jobChangeTiming: "notSpecified",
  positions: { values: [] as string[], notSpecified: true },
  managementYears: "notSpecified",
  englishLevel: "notSpecified",
    conditionName: "", // 追加

});

// 次の条件番号を取得する関数（追加）
const getNextConditionNumber = () => {
  const existingNumbers = conditions.value
    .map(c => {
      const match = c.title.match(/^求職者条件(\d+)$/);
      return match ? parseInt(match[1]) : 0;
    })
    .filter(n => n > 0);
  
  if (existingNumbers.length === 0) return 1;
  return Math.max(...existingNumbers) + 1;
};

// 役職の「指定しない」チェック時
const onPositionsNotSpecifiedChange = () => {
  if (advancedFilters.positions.notSpecified) {
    advancedFilters.positions.values = [];
  }
};

// モーダル制御
const isModalOpen = ref(false);
const currentModalType = ref("");

const openModal = (type: string) => {
  currentModalType.value = type;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const getModalTitle = () => {
  const titles: Record<string, string> = {
    jobType: "経験職種",
    desiredJob: "希望職種",
    location: "希望勤務地",
  };
  return titles[currentModalType.value] || "";
};

// 検索条件保存確認モーダル
const isConfirmModalOpen = ref(false);

const closeConfirmModal = () => {
  isConfirmModalOpen.value = false;
};

const executeSearchWithoutSaving = () => {
  closeConfirmModal();
  console.log("検索実行（保存なし）:", { filters, advancedFilters });
  navigateTo("/mypage/matching/results");
};

// 保存して検索する場合の修正
const executeSearchWithSaving = () => {
  closeConfirmModal();
  
  // 条件名が未入力の場合、自動生成
  const conditionName = advancedFilters.conditionName.trim() 
    ? advancedFilters.conditionName.trim()
    : `求職者条件${getNextConditionNumber()}`;
  
  const conditionToSave = {
    ...filters,
    advanced: { ...advancedFilters },
    conditionName: conditionName
  };
  
  console.log('条件を保存して検索:', conditionToSave);
  // TODO: 保存処理
  navigateTo("/mypage/matching/results");
};

// 既存条件カードから検索する場合
const handleSearch = (id: number) => {
  // 直接result.vueへ遷移
  navigateTo("/mypage/matching/results");
};

// 新規で検索条件を入力して検索する場合
const handleMainSearch = () => {
  // 確認モーダルを表示
  isConfirmModalOpen.value = true;
};

// 求職者条件カード
const conditions = ref([
  {
    id: 1,
    title: "求職者条件1",
    age: "20～40",
    jobType: "オープン・Web系：5年以上…",
    location: "東京都　港区 新宿区 渋谷区",
  },
  {
    id: 2,
    title: "求職者条件2",
    age: "20～40",
    jobType: "オープン・Web系：5年以上…",
    location: "東京都　港区 新宿区 渋谷区",
  },
  {
    id: 3,
    title: "求職者条件3",
    age: "20～40",
    jobType: "オープン・Web系：5年以上…",
    location: "東京都　港区 新宿区 渋谷区",
  },
]);
const handleSaveCondition = () => {
  const conditionToSave = {
    ...filters,
    advanced: { ...advancedFilters },
  };
  console.log("条件を保存:", conditionToSave);
  // TODO: API連携時にここで保存処理
  alert("条件を保存しました（※現在はダミー動作です）");
};

// タイトル編集用
const editingId = ref<number | null>(null);
const editingTitle = ref("");

const startEdit = (id: number, currentTitle: string) => {
  editingId.value = id;
  editingTitle.value = currentTitle;
};

const saveTitle = (id: number) => {
  const condition = conditions.value.find((c) => c.id === id);
  if (condition && editingTitle.value.trim()) {
    condition.title = editingTitle.value.trim();
  }
  editingId.value = null;
  editingTitle.value = "";
};

const cancelEdit = () => {
  editingId.value = null;
  editingTitle.value = "";
};

// ラベル取得用の関数（追加）
const getGenderLabel = (value: string) => {
  const option = genderOptions.find(opt => opt.value === value);
  return option ? option.label : value;
};

const getJobChangeTimingLabel = (value: string) => {
  const option = jobChangeTimingOptions.find(opt => opt.value === value);
  return option ? option.label : value;
};

const getPositionLabels = (values: string[]) => {
  return values
    .map(value => positionOptions.find(opt => opt.value === value)?.label || value)
    .join('、');
};

const getManagementYearsLabel = (value: string) => {
  const option = managementYearsOptions.find(opt => opt.value === value);
  return option ? option.label : value;
};

const getEnglishLevelLabel = (value: string) => {
  const option = englishLevelOptions.find(opt => opt.value === value);
  return option ? option.label : value;
};

const isAllNotSpecified = () => {
  return (
    advancedFilters.gender === 'notSpecified' &&
    advancedFilters.salary.notSpecified &&
    advancedFilters.jobChangeTiming === 'notSpecified' &&
    advancedFilters.positions.notSpecified &&
    advancedFilters.managementYears === 'notSpecified' &&
    advancedFilters.englishLevel === 'notSpecified' &&
    !filters.ageMin &&
    !filters.ageMax
  );
};
</script>

<style lang="scss" scoped>
    
.page-title {
  color: #202224;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 0.2px;
  margin-bottom: 40px;
}

// フィルターセクション
.filter-section {
  background: #fff;
  padding: 0px 30px;
  border-radius: 5px;
  background: #fff;
  margin-bottom: 50px;
  width: 1060px;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px 0px;
  border-bottom: 1px solid #e5e5e5;
}

.filter-label {
  min-width: 100px;
  color: #000;
  font-family: "noto-sans-cjk-jp", sans-serif;
  text-align: left;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 125% */
  letter-spacing: 0.3px;
}

.dropdown-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #2d2d2d;
  font-family: "noto-sans-cjk-jp", sans-serif;
  color: #fff;
  font-family: "Noto Sans JP";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 100% */
  letter-spacing: 1px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #1a1a1a;
  }

  .arrow {
    color: #fff;
    text-align: center;
    font-family: "noto-sans-cjk-jp", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
  }
}

.age-range {
  display: flex;
  align-items: center;
  gap: 10px;
}

.age-input {
  width: 100px;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #2d2d2d;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
}

.age-unit {
  color: #000;
  text-align: center;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 133.333% */
  letter-spacing: 0.3px;
  align-self: flex-end; // 「歳」を下に配置
  margin-right: 5px;
}

.age-separator {
  font-family: "noto-sans-cjk-jp", sans-serif;
  color: #000;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 100% */
  letter-spacing: 0.3px;
}

.filter-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0px;
  background: #fff;
  position: relative;
}

.add-condition-btn {
  position: absolute;
  left: 0;
  background: none;
  border: 1px solid #000;
  padding: 10px 15px;
  font-family: "noto-sans-cjk-jp", sans-serif;
  color: #000;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex; // 追加
  align-items: center; // 追加

  &:hover {
    background: #f5f5f5;
  }

  .toggle-status {
    color: #020202;
    text-align: center;
    font-family: "noto-sans-cjk-jp", sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    margin-right: 10px;
    position: relative; // 追加
    top: -1px; // 下に3px移動（数値は調整可能）
  }
}

.search-main-btn {
  padding: 15px 70px;
  color: #fff;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 2px;
  border: none;
  border-radius: 10px;
  border: 1px solid #000;
  background: #272727;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex; // 追加
  align-items: center; // 追加
  gap: 5px; // 追加（アイコンとテキストの間隔）

  &:hover {
    background: #1a1a1a;
  }

  svg {
    position: relative; // 追加
    top: 1px; // 下に2px移動（数値は調整可能）
  }
}

// 詳細条件セクション
.advanced-section {
  padding: 30px 0;
  border-top: 1px solid #e5e5e5;
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
  background: #f0f0f0;
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
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  background: #fff;

  &:focus {
    outline: none;
    border-color: #2d2d2d;
  }

  &:disabled {
    background: #f5f5f5;
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
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  color: #000;
  background: #fff;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #2d2d2d;
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
    accent-color: #2d2d2d;
  }

  &.not-specified {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #d9d9d9;
  }
}

.form-note {
  color: #999;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 13px;
  margin: 0;
  padding: 12px;
  background: #fff;
  border-radius: 6px;
  text-align: center;
}

.confirm-text {
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 16px;
  color: #333;
  text-align: center;
  margin: 20px 0;
}

// 求職者条件カード
.candidates-section {
  margin-bottom: 40px;
}

// 中タイトルのスタイル（追加）
.section-subtitle {
  color: #202224;
  font-family: "noto-sans-cjk-jp", sans-serif;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 26px; /* 130% */
letter-spacing: -0.114px;
margin-bottom: 20px;
}

.candidates-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width:1060px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.condition-card {
  background: #fff;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  width:340px;
}

.card-header {
  background: #000;
  padding: 10px 15px;
}

.title-display-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &:hover {
    .card-title {
      opacity: 0.9;
    }

    .edit-icon {
      opacity: 1;
    }
  }
}

.title-edit-wrapper {
  width: 100%;
}

.card-title {
  color: #fff;
  font-family: "noto-sans-cjk-jp", sans-serif;
font-size: 15px;
font-style: normal;
font-weight: 700;
line-height: 15px; /* 100% */
letter-spacing: 0.5px;
  margin: 0;
  transition: opacity 0.2s ease;
}

.edit-icon {
  flex-shrink: 0;
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.card-title-input {
  width: 100%;
  padding: 4px 8px;
  background: #fff;
  color: #000;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-weight: 700;
  border: none;
  border-radius: 4px;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
  }
}

.card-body {
  padding: 15px;

  .condition-text {
    color: #000;
    font-family: "noto-sans-cjk-jp", sans-serif;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 14px; /* 100% */
letter-spacing: 0.5px;
    margin: 0 0 10px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.card-footer {
  padding: 0 20px 15px 20px;
  display: flex;
  justify-content: center;
}

.search-btn {
  width: 100%;
  max-width: 120px;
  padding: 5px 20px;
  background: #E2EAF8;
  font-family: "noto-sans-cjk-jp", sans-serif;
color: #202224;
font-family: "Noto Sans JP";
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 14px; /* 100% */
letter-spacing: 1px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 5px;

  &:hover {
    background: #e0e0e0;
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
  background: #fff;
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
  border-bottom: 1px solid #e5e5e5;
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
  border-top: 1px solid #e5e5e5;
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
  background: #fff;
  color: #666;
  border: 1px solid #d9d9d9;

  &:hover {
    background: #f5f5f5;
  }
}

.btn-save {
  background: #000;
  color: #fff;
  border: none;

  &:hover {
    background: #1a1a1a;
  }
}

.save-condition-btn {
  padding: 10px 20px;
  background: #fff;
  color: #000;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #2d2d2d;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2d2d2d;
    color: #fff;
  }
}

.advanced-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e5e5e5;
}

.condition-name-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  color: #000;
  background: #fff;

  &:focus {
    outline: none;
    border-color: #2d2d2d;
  }

  &::placeholder {
    color: #999;
  }
}

.input-note {
  margin: 8px 0 0 0;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 12px;
  color: #666;
  line-height: 1.4;
}

.confirm-modal {
  max-width: 600px; // 少し広めに
}

.condition-preview {
  background: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  margin-top: 16px;
  max-height: 300px;
  overflow-y: auto;
}

.preview-section {
  display: flex;
  margin-bottom: 12px;
  line-height: 1.6;

  &:last-child {
    margin-bottom: 0;
  }
}

.preview-label {
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #333;
  min-width: 120px;
  flex-shrink: 0;
}

.preview-value {
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  color: #555;
  flex: 1;
}

.preview-note {
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 13px;
  color: #999;
  text-align: center;
  margin: 12px 0 0 0;
  font-style: italic;
}
</style>
