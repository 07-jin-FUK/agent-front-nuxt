<template>
  <div class="detail-page all-page">
    <!-- 黒帯ヘッダー（グレー背景の上に配置） -->
    <div class="black-header">
      <h1 class="page-title">{{ conditionData.title }}</h1>
    </div>

    <!-- 白い背景のコンテンツ全体 -->
    <div class="white-container">
      <!-- 経験職種セクション -->
      <section class="content-section">
        <div class="gray-box">
          <div class="section-header-in-box">
            <h2 class="section-title">経験職種</h2>
            <button class="edit-btn-small" @click="openEditModal('jobCategories')">編集</button>
          </div>

          <!-- 大分類ループ -->
          <div v-for="majorCategory in conditionData.jobCategories" :key="majorCategory.id" class="major-category-block">
            <!-- 大分類名（オレンジ） -->
            <p class="major-category-name">{{ majorCategory.name }}</p>

            <!-- 中分類ループ -->
            <div v-for="(middleCategory, index) in majorCategory.middleCategories" :key="middleCategory.id">
              <div class="middle-category-block">
                <!-- 中分類名（黒・太字） -->
                <p class="middle-category-name">{{ middleCategory.name }}</p>
                <!-- 小分類（黒・細字） -->
                <p class="minor-category-content">{{ middleCategory.minorCategories }}</p>
              </div>
              <!-- 中分類の間に線を追加（最後以外） -->
              <div v-if="index < majorCategory.middleCategories.length - 1" class="middle-category-line"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- 経験職種（2つ目） -->
      <section class="content-section">
        <div class="gray-box">
          <div class="section-header-in-box">
            <h2 class="section-title">経験職種</h2>
            <button class="edit-btn-small" @click="openEditModal('experienceCategory')">編集</button>
          </div>
          <p class="category-name-black">{{ conditionData.experienceCategory }}</p>
        </div>
      </section>

      <!-- パーソナル -->
      <section class="content-section">
        <div class="gray-box">
          <div class="section-header-in-box">
            <h2 class="section-title">パーソナル</h2>
            <button class="edit-btn-small" @click="openEditModal('personal')">編集</button>
          </div>
          <div class="personal-grid">
            <div class="personal-row">
              <span class="personal-label">年齢：</span>
              <span class="personal-value">{{ getAgeDisplay() }}</span>
            </div>
            <div class="personal-row">
              <span class="personal-label">性別：</span>
              <span class="personal-value">{{ getGenderDisplay() }}</span>
            </div>
            <div class="personal-row">
              <span class="personal-label">現住所：</span>
              <span class="personal-value">{{ getResidenceDisplay() }}</span>
            </div>
            <div class="personal-row">
              <span class="personal-label">希望年収：</span>
              <span class="personal-value">{{ getSalaryDisplay() }}</span>
            </div>
            <div class="personal-row">
              <span class="personal-label">転職希望時期：</span>
              <span class="personal-value">{{ getJobChangeTimingDisplay() }}</span>
            </div>
            <div class="personal-row">
              <span class="personal-label">役職：</span>
              <span class="personal-value">{{ getPositionsDisplay() }}</span>
            </div>
            <div class="personal-row">
              <span class="personal-label">マネジメント年数：</span>
              <span class="personal-value">{{ getManagementYearsDisplay() }}</span>
            </div>
            <div class="personal-row">
              <span class="personal-label">海外経験：</span>
              <span class="personal-value">{{ getOverseasDisplay() }}</span>
            </div>
            <div class="personal-row">
              <span class="personal-label">英語力：</span>
              <span class="personal-value">{{ getEnglishLevelDisplay() }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 希望勤務地 -->
      <section class="content-section">
        <div class="gray-box">
          <div class="section-header-in-box">
            <h2 class="section-title">希望勤務地</h2>
            <button class="edit-btn-small" @click="openEditModal('locations')">編集</button>
          </div>
          <div v-for="(location, index) in conditionData.locations" :key="location.id">
            <p class="location-name">{{ location.name }}</p>
            <p class="location-cities">{{ location.cities }}</p>
            <div v-if="index < conditionData.locations.length - 1" class="location-line"></div>
          </div>
        </div>
      </section>

      <!-- 確定ボタン -->
      <div class="button-container">
        <button class="confirm-button" @click="handleConfirm">編集を確定する</button>
      </div>
    </div>

    <!-- 編集モーダル -->
    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeEditModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">{{ getModalTitle() }}を編集</h3>
          <button class="modal-close" @click="closeEditModal">✕</button>
        </div>

        <div class="modal-body">
          <!-- パーソナル編集フォーム -->
          <div v-if="editingSection === 'personal'" class="edit-form">
            
            <!-- 年齢 -->
            <div class="form-group">
              <label class="form-label">年齢</label>
              <div class="range-input">
                <select v-model="editData.age.min" class="form-select" :disabled="editData.age.notSpecified">
                  <option v-for="n in 63" :key="n" :value="n + 17">{{ n + 17 }}歳</option>
                </select>
                <span class="range-separator">〜</span>
                <select v-model="editData.age.max" class="form-select" :disabled="editData.age.notSpecified">
                  <option v-for="n in 63" :key="n" :value="n + 17">{{ n + 17 }}歳</option>
                </select>
              </div>
              <label class="checkbox-label">
                <input type="checkbox" v-model="editData.age.notSpecified" />
                指定しない
              </label>
            </div>

            <!-- 性別 -->
            <div class="form-group">
              <label class="form-label">性別</label>
              <div class="radio-group">
                <label v-for="opt in genderOptions" :key="opt.value" class="radio-label">
                  <input type="radio" v-model="editData.gender.value" :value="opt.value" />
                  {{ opt.label }}
                </label>
              </div>
            </div>

            <!-- 現住所（後々実装） -->
            <div class="form-group">
              <label class="form-label">現住所</label>
              <p class="form-note">後日実装予定</p>
            </div>

            <!-- 希望年収 -->
            <div class="form-group">
              <label class="form-label">希望年収</label>
              <div class="range-input">
                <input 
                  type="number" 
                  v-model="editData.salary.min" 
                  class="form-input-number" 
                  placeholder="下限"
                  :disabled="editData.salary.notSpecified"
                />
                <span class="range-unit">万円</span>
                <span class="range-separator">〜</span>
                <input 
                  type="number" 
                  v-model="editData.salary.max" 
                  class="form-input-number" 
                  placeholder="上限"
                  :disabled="editData.salary.notSpecified"
                />
                <span class="range-unit">万円</span>
              </div>
              <label class="checkbox-label">
                <input type="checkbox" v-model="editData.salary.notSpecified" />
                指定しない
              </label>
            </div>

            <!-- 転職希望時期 -->
            <div class="form-group">
              <label class="form-label">転職希望時期</label>
              <select v-model="editData.jobChangeTiming.value" class="form-select full-width">
                <option v-for="opt in jobChangeTimingOptions" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
            </div>

            <!-- 役職（複数選択） -->
            <div class="form-group">
              <label class="form-label">役職</label>
              <div class="checkbox-group">
                <label v-for="opt in positionOptions" :key="opt.value" class="checkbox-label">
                  <input 
                    type="checkbox" 
                    :value="opt.value" 
                    v-model="editData.positions.values"
                    :disabled="editData.positions.notSpecified"
                  />
                  {{ opt.label }}
                </label>
              </div>
              <label class="checkbox-label not-specified">
                <input type="checkbox" v-model="editData.positions.notSpecified" @change="onPositionsNotSpecifiedChange" />
                指定しない
              </label>
            </div>

            <!-- マネジメント年数 -->
            <div class="form-group">
              <label class="form-label">マネジメント年数</label>
              <select v-model="editData.managementYears.value" class="form-select full-width">
                <option v-for="opt in managementYearsOptions" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
            </div>

            <!-- 海外経験 -->
            <div class="form-group">
              <label class="form-label">海外経験</label>
              <div class="radio-group">
                <label v-for="opt in overseasOptions" :key="opt.value" class="radio-label">
                  <input type="radio" v-model="editData.overseasExperience.value" :value="opt.value" />
                  {{ opt.label }}
                </label>
              </div>
            </div>

            <!-- 英語力 -->
            <div class="form-group">
              <label class="form-label">英語力</label>
              <select v-model="editData.englishLevel.value" class="form-select full-width">
                <option v-for="opt in englishLevelOptions" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
            </div>

          </div>

          <!-- 希望勤務地編集フォーム -->
          <div v-if="editingSection === 'locations'" class="edit-form">
            <div v-for="(location, index) in editData" :key="location.id" class="form-group">
              <label class="form-label">{{ location.name }}</label>
              <textarea v-model="location.cities" class="form-textarea" rows="3"></textarea>
              <div v-if="index < editData.length - 1" class="form-divider"></div>
            </div>
          </div>

          <!-- 経験職種・経験職種2は開発中 -->
          <div v-if="editingSection === 'jobCategories' || editingSection === 'experienceCategory'">
            <p style="text-align: center; color: #666; padding: 40px 20px">この機能は開発中です</p>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click="closeEditModal">キャンセル</button>
          <button class="btn-save" @click="saveEdit">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "mypage",
});

const route = useRoute();
const conditionId = route.params.id;

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
  { value: '4', label: '4年以上' },
  { value: '5', label: '5年以上' },
  { value: '6', label: '6年以上' },
  { value: '7', label: '7年以上' },
  { value: '8', label: '8年以上' },
  { value: '9', label: '9年以上' },
  { value: '10', label: '10年以上' },
  { value: 'notSpecified', label: '指定しない' },
]

const overseasOptions = [
  { value: 'yes', label: 'あり' },
  { value: 'no', label: 'なし' },
  { value: 'notSpecified', label: '指定しない' },
]

const englishLevelOptions = [
  { value: 'native', label: 'ネイティブレベル' },
  { value: 'business', label: 'ビジネス会話レベル以上' },
  { value: 'daily', label: '日常会話レベル以上' },
  { value: 'none', label: '当てはまるものはない' },
  { value: 'notSpecified', label: '指定しない' },
]

// API想定のダミーデータ
const conditionData = ref({
  id: conditionId,
  title: `求職者条件${conditionId}`,

  jobCategories: [
    {
      id: 1,
      name: "ソフトウェア・ネットワーク関連",
      middleCategories: [
        {
          id: 1,
          name: "オープン・Web系：5年以上",
          minorCategories:
            "ブリッジSE・オフショア開発　プロジェクトマネージャー・リーダー（SI技術経験）　データベースエンジニア（オープン・Web系）プロジェクトマネージャー・リーダー（SI・受託開発）　システムエンジニア（SI・受託開発）　システムエンジニア（SI技術経験）プログラマー（SI技術経験）　プログラマー（SI・受託開発）",
        },
        {
          id: 2,
          name: "汎用系：年齢問わず",
          minorCategories: "プロジェクトマネージャー・リーダー（汎用系）　ブリッジSE・オフショア開発　システムエンジニア（汎用系）データベースエンジニア（汎用系）　プログラマー（汎用系）",
        },
        {
          id: 3,
          name: "組込み・制御系：3年以上",
          minorCategories: "プロジェクトマネージャー・リーダー（汎用系）　システムエンジニア（組込み・制御系）　プログラマー（組込み・制御系）",
        },
        {
          id: 4,
          name: "ネットワーク・サーバー設計・構築：年齢問わず",
          minorCategories: "ネットワーク設計・構築　セキュリティ診断ASE　サーバー・システム構築・保守　ネットワーク監視・運用・保守個人・技術営業・MIS・社内システム運用　サーバー設計・構築　カスタマーサポートエンジニア・フィールドエンジニア",
        },
      ],
    },
  ],

  experienceCategory: "ソフトウェア・情報処理：5年以上",

  personal: {
    age: { min: 20, max: 40, notSpecified: false },
    gender: { value: 'notSpecified' },
    residence: { value: '', notSpecified: true },
    salary: { min: 500, max: 800, notSpecified: false },
    jobChangeTiming: { value: '3months' },
    positions: { values: ['leader', 'manager'], notSpecified: false },
    managementYears: { value: '3' },
    overseasExperience: { value: 'notSpecified' },
    englishLevel: { value: 'business' },
  },

  locations: [
    {
      id: 1,
      name: "福岡圏",
      cities: "福岡県全て　北九州市　久留米市　大牟田市　嘉万市　飯塚市　田川市　柳川市　八女市　筑後市　大川市　行橋市　豊前市",
    },
    {
      id: 2,
      name: "佐賀県",
      cities: "佐賀県全て",
    },
    {
      id: 3,
      name: "長崎県",
      cities: "長崎県全て",
    },
  ],
});

// 表示用ヘルパー関数
const getAgeDisplay = () => {
  const age = conditionData.value.personal.age;
  if (age.notSpecified) return '指定しない';
  return `${age.min}歳〜${age.max}歳`;
};

const getGenderDisplay = () => {
  const gender = conditionData.value.personal.gender.value;
  const opt = genderOptions.find(o => o.value === gender);
  return opt?.label || '指定しない';
};

const getResidenceDisplay = () => {
  const residence = conditionData.value.personal.residence;
  if (residence.notSpecified || !residence.value) return '指定しない';
  return residence.value;
};

const getSalaryDisplay = () => {
  const salary = conditionData.value.personal.salary;
  if (salary.notSpecified) return '指定しない';
  if (salary.min && salary.max) return `${salary.min}万円〜${salary.max}万円`;
  if (salary.min) return `${salary.min}万円以上`;
  if (salary.max) return `${salary.max}万円以下`;
  return '指定しない';
};

const getJobChangeTimingDisplay = () => {
  const timing = conditionData.value.personal.jobChangeTiming.value;
  const opt = jobChangeTimingOptions.find(o => o.value === timing);
  return opt?.label || '指定しない';
};

const getPositionsDisplay = () => {
  const positions = conditionData.value.personal.positions;
  if (positions.notSpecified || positions.values.length === 0) return '指定しない';
  return positions.values
    .map(v => positionOptions.find(o => o.value === v)?.label)
    .filter(Boolean)
    .join('、');
};

const getManagementYearsDisplay = () => {
  const years = conditionData.value.personal.managementYears.value;
  const opt = managementYearsOptions.find(o => o.value === years);
  return opt?.label || '指定しない';
};

const getOverseasDisplay = () => {
  const overseas = conditionData.value.personal.overseasExperience.value;
  const opt = overseasOptions.find(o => o.value === overseas);
  return opt?.label || '指定しない';
};

const getEnglishLevelDisplay = () => {
  const level = conditionData.value.personal.englishLevel.value;
  const opt = englishLevelOptions.find(o => o.value === level);
  return opt?.label || '指定しない';
};

const handleConfirm = () => {
  console.log("編集確定:", conditionId);
  navigateTo(`/mypage/matching/results?id=${conditionId}`);
};

// モーダル制御
const isModalOpen = ref(false);
const editingSection = ref("");
const editData = ref<any>(null);

const getModalTitle = () => {
  const titles: Record<string, string> = {
    jobCategories: "経験職種",
    experienceCategory: "経験職種",
    personal: "パーソナル",
    locations: "希望勤務地",
  };
  return titles[editingSection.value] || "";
};

const openEditModal = (section: string) => {
  editingSection.value = section;

  if (section === "personal") {
    editData.value = JSON.parse(JSON.stringify(conditionData.value.personal));
  } else if (section === "locations") {
    editData.value = JSON.parse(JSON.stringify(conditionData.value.locations));
  }

  isModalOpen.value = true;
};

const closeEditModal = () => {
  isModalOpen.value = false;
  editingSection.value = "";
  editData.value = null;
};

// 役職の「指定しない」チェック時の処理
const onPositionsNotSpecifiedChange = () => {
  if (editData.value.positions.notSpecified) {
    editData.value.positions.values = [];
  }
};

const saveEdit = () => {
  if (editingSection.value === "personal") {
    // バリデーション：年収の下限が上限を超えないようにする
    if (!editData.value.salary.notSpecified) {
      const min = editData.value.salary.min;
      const max = editData.value.salary.max;
      if (min && max && Number(min) > Number(max)) {
        alert('希望年収の下限は上限以下にしてください');
        return;
      }
    }
    conditionData.value.personal = editData.value;
  } else if (editingSection.value === "locations") {
    conditionData.value.locations = editData.value;
  }

  console.log("保存:", editingSection.value, editData.value);
  closeEditModal();
};
</script>

<style lang="scss" scoped>
// 黒帯ヘッダー
.black-header {
  background: #1d1d1d;
  border-radius: 12px 12px 0 0;
  padding: 30px;

  .page-title {
    color: #fff;
    font-family: "noto-sans-cjk-jp", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 1;
    margin: 0;
  }
}

// 白い背景のコンテナ
.white-container {
  background: #fff;
  padding: 10px 30px 30px;
  border-radius: 8px;
}

// セクション
.content-section {
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 20px;
  }
}

// セクションタイトル（白背景の上）
.section-title {
  color: #000;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.3px;
  margin-bottom: 15px;
}

// グレーボックス
.gray-box {
  background: #f0f0f0;
  padding: 30px 20px;
  border-radius: 15px;
}

// 経験職種カテゴリー
.category-block {
  margin-bottom: 18px;

  &:last-child {
    margin-bottom: 0;
  }
}

.major-category-block {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

// 大分類（オレンジ）
.major-category-name {
  color: #c97d02;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.3px;
  margin: 0 0 15px 0;
}

// 中分類（黒・太字）
.middle-category-name {
  color: #000;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.3px;
  margin: 0 0 10px 0;
}

// 小分類（黒・細字）
.minor-category-content {
  color: #000;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.8;
  letter-spacing: 0.3px;
}

// 中分類の間の区切り線
.middle-category-line {
  height: 1px;
  background: #c8c8c8;
  margin: 8px 0 15px;
}

.category-name-black {
  color: #000;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.3px;
}

// パーソナル
.personal-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.personal-row {
  display: flex;
  line-height: 1.6;
}

.personal-label {
  color: #000;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.3px;
  min-width: 140px;
}

.personal-value {
  flex: 1;
  color: #000;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.3px;
}

// 希望勤務地
.location-name {
  color: #000;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.3px;
  margin-bottom: 5px;
}

.location-cities {
  color: #000;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.8;
  margin: 0;
}

.location-line {
  height: 1px;
  background: #c8c8c8;
  margin: 10px 0 15px;
}

// 確定ボタン
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.confirm-button {
  min-width: 200px;
  padding: 12px 50px;
  background: #2d2d2d;
  color: #fff;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 1;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #1a1a1a;
  }
}

.section-header-in-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.edit-btn-small {
  padding: 4px 12px;
  background: #fff;
  border: 1px solid #2d2d2d;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: #2d2d2d;
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
}

.modal-content {
  background: #fff;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
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

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-label {
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #000;
}

.form-input,
.form-textarea {
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  color: #000;

  &:focus {
    outline: none;
    border-color: #2d2d2d;
  }
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-divider {
  height: 1px;
  background: #e5e5e5;
  margin: 10px 0;
}

// 新規追加スタイル
.range-input {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.range-separator {
  color: #666;
  font-size: 14px;
}

.range-unit {
  color: #666;
  font-size: 14px;
}

.form-select {
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  color: #000;
  background: #fff;
  min-width: 120px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #2d2d2d;
  }

  &:disabled {
    background: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }

  &.full-width {
    width: 100%;
  }
}

.form-input-number {
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  color: #000;
  width: 100px;

  &:focus {
    outline: none;
    border-color: #2d2d2d;
  }

  &:disabled {
    background: #f5f5f5;
    color: #999;
  }

  // スピンボタンを非表示
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
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
    margin-top: 8px;
    padding-top: 12px;
    border-top: 1px solid #e5e5e5;
  }
}

.form-note {
  color: #999;
  font-size: 13px;
  margin: 0;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 6px;
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
  background: #2d2d2d;
  color: #fff;
  border: none;

  &:hover {
    background: #1a1a1a;
  }
}
</style>
