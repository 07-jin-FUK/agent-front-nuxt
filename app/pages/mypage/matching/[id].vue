<template>
  <div class="detail-page">
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
            <div v-for="(item, index) in conditionData.personal" :key="index" class="personal-row">
              <span class="personal-label">{{ item.label }}：</span>
              <span class="personal-value">{{ item.value }}</span>
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

      <!-- 検索ボタン -->
      <div class="button-container">
        <button class="search-button" @click="handleFinalSearch">検索する</button>
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
            <div v-for="(item, index) in editData" :key="index" class="form-row">
              <label class="form-label">{{ item.label }}</label>
              <input v-model="item.value" class="form-input" type="text" />
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

// API想定のダミーデータ
const conditionData = ref({
  id: conditionId,
  title: `求職者条件${conditionId}`,

  jobCategories: [
    {
      id: 1,
      name: "ソフトウェア・ネットワーク関連", // 大分類（オレンジ）
      middleCategories: [
        {
          id: 1,
          name: "オープン・Web系：5年以上", // 中分類（黒・太字）
          minorCategories:
            "ブリッジSE・オフショア開発　プロジェクトマネージャー・リーダー（SI技術経験）　データベースエンジニア（オープン・Web系）プロジェクトマネージャー・リーダー（SI・受託開発）　システムエンジニア（SI・受託開発）　システムエンジニア（SI技術経験）プログラマー（SI技術経験）　プログラマー（SI・受託開発）", // 小分類（黒・細字）
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

  personal: [
    { label: "年齢", value: "20～40" },
    { label: "性別", value: "指定しない" },
    { label: "現住所", value: "東京都世田谷区在住" },
    { label: "通勤時間", value: "500万円以上～" },
    { label: "直近の勤務形態", value: "正社員" },
    { label: "雇用形態希望", value: "常駐" },
    { label: "海外経験", value: "指定しない" },
    { label: "語学スキル", value: "英語" },
    { label: "保有資格", value: "" },
  ],

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

const handleFinalSearch = () => {
  console.log("最終検索実行:", conditionId);
  navigateTo("/mypage/matching/results");
};

// モーダル制御
const isModalOpen = ref(false);
const editingSection = ref("");
const editData = ref<any>(null);

// モーダルタイトルを取得
const getModalTitle = () => {
  const titles: Record<string, string> = {
    jobCategories: "経験職種",
    experienceCategory: "経験職種",
    personal: "パーソナル",
    locations: "希望勤務地",
  };
  return titles[editingSection.value] || "";
};

// 編集モーダルを開く
const openEditModal = (section: string) => {
  editingSection.value = section;

  // セクションに応じてデータをコピー
  if (section === "personal") {
    editData.value = JSON.parse(JSON.stringify(conditionData.value.personal));
  } else if (section === "locations") {
    editData.value = JSON.parse(JSON.stringify(conditionData.value.locations));
  }

  isModalOpen.value = true;
};

// 閉じる
const closeEditModal = () => {
  isModalOpen.value = false;
  editingSection.value = "";
  editData.value = null;
};

// 保存
const saveEdit = () => {
  // 実際のAPIではここでPUT/PATCHリクエスト
  if (editingSection.value === "personal") {
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
  line-height: 20px; /* 125% */
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
  line-height: 16px; /* 114.286% */
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
  line-height: 16px; /* 114.286% */
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
  line-height: 1.8; /* 114.286% */
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
  line-height: 16px; /* 114.286% */
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
  line-height: 16px; /* 114.286% */
  letter-spacing: 0.3px;
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

// 検索ボタン
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.search-button {
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
  gap: 20px;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
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
