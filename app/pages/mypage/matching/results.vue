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
        <!-- <span class="icon"></span> -->
        検索条件を確認する
      </button>
    </div>

<!-- 検索結果サマリー -->
<div class="results-summary">
  <p class="summary-text">
    <span class="condition-name">{{ searchCondition.title }}</span>で検索した結果、
    <span class="count">{{ matchedUsers.length }}</span>名の求職者が見つかりました
  </p>
</div>

    <!-- マッチしたユーザー一覧 -->
    <section class="users-section">
      <div class="users-list">
        <div v-for="user in matchedUsers" :key="user.id" class="user-card">
          <!-- 左側：基本情報 -->
          <div class="user-left">
            <div class="user-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="76" height="76" viewBox="0 0 76 76" fill="none">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M38.0019 14.6144C34.1257 14.6144 30.4082 16.1543 27.6673 18.8953C24.9264 21.6362 23.3866 25.3537 23.3866 29.23C23.3866 33.1063 24.9264 36.8239 27.6673 39.5648C30.4082 42.3058 34.1257 43.8456 38.0019 43.8456C41.8782 43.8456 45.5957 42.3058 48.3366 39.5648C51.0775 36.8239 52.6173 33.1063 52.6173 29.23C52.6173 25.3537 51.0775 21.6362 48.3366 18.8953C45.5957 16.1543 41.8782 14.6144 38.0019 14.6144ZM38.0019 20.4607C35.6762 20.4607 33.4457 21.3846 31.8012 23.0292C30.1566 24.6737 29.2327 26.9043 29.2327 29.23C29.2327 31.5558 30.1566 33.7863 31.8012 35.4309C33.4457 37.0755 35.6762 37.9994 38.0019 37.9994C40.3277 37.9994 42.5582 37.0755 44.2027 35.4309C45.8473 33.7863 46.7712 31.5558 46.7712 29.23C46.7712 26.9043 45.8473 24.6737 44.2027 23.0292C42.5582 21.3846 40.3277 20.4607 38.0019 20.4607Z"
                  :fill="user.gender === '女性' ? '#EF0399' : '#2E06C0'"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M38 0C30.2951 0 22.7723 2.3422 16.4291 6.71597C10.0859 11.0898 5.22217 17.2885 2.48282 24.49C-0.256536 31.6916 -0.742043 39.5558 1.09069 47.0396C2.92309 54.5221 6.98635 61.271 12.7417 66.3915C19.6935 72.5924 28.6868 76.0132 38.0021 76C47.3156 76.0122 56.3113 72.5916 63.2622 66.3915C69.0183 61.2703 73.0771 54.5212 74.9093 47.0396C76.742 39.5558 76.2565 31.6916 73.5172 24.49C70.7778 17.2885 65.9141 11.0898 59.5709 6.71597C53.2277 2.3422 45.7049 0 38 0ZM38 5.84624C31.4805 5.84624 25.115 7.8281 19.7477 11.529C14.3804 15.2299 10.2649 20.4749 7.947 26.5686C5.62909 32.6622 5.21827 39.3165 6.76904 45.649C8.08016 51.0029 10.7411 55.9128 14.4761 59.9211C17.0996 57.1032 20.2149 54.7733 23.6783 53.0509C28.1293 50.8372 33.0335 49.6874 38.0046 49.6919C42.9739 49.6882 47.8762 50.838 52.3256 53.0509C55.7889 54.7733 58.9042 57.1031 61.5277 59.921C65.2613 55.9132 67.9197 51.0035 69.231 45.649C70.7817 39.3165 70.3709 32.6622 68.053 26.5686C65.7351 20.4749 61.6196 15.2299 56.2523 11.529C50.885 7.8281 44.5195 5.84624 38 5.84624ZM57.1714 63.8218C55.0419 61.5542 52.521 59.6774 49.7224 58.2855C46.0818 56.4749 42.0705 55.5344 38.0046 55.5381H37.9993C33.9334 55.5344 29.9221 56.4749 26.2815 58.2855C23.4828 59.6774 20.962 61.5542 18.8324 63.8219C24.3506 67.9283 31.0688 70.1644 37.9975 70.1537H38.0061C44.9338 70.1636 51.6536 67.9274 57.1714 63.8218Z"
                  :fill="user.gender === '女性' ? '#EF0399' : '#2E06C0'"
                />
              </svg>
            </div>
            <div class="user-id-badge">No.{{ user.id }}</div>
            <div class="user-years">
              <span class="years-number">{{ user.workYears }}</span>
              <span class="years-unit">歳</span>
            </div>
            <div class="user-desired-location">
              <span class="location-label">希望勤務地：</span>
              <span class="location-name">{{ user.desiredLocation }}</span>
            </div>
            <div class="user-login">最終ログイン：{{ user.lastLogin }}</div>
            <div class="user-registered">登録日：{{ user.registeredDate }}</div>
          </div>

          <div class="user-right">
            <div class="user-content">
              <div class="info-section experience-combined">
                <p class="info-label">経験職種</p>
                <p class="info-text">{{ user.experienceCategory1 }}</p>
                <p class="info-label secondary">経験職種</p>
                <p class="info-text">{{ user.experienceCategory2 }}</p>
              </div>

              <div class="info-section work-history">
                <p class="info-label">直近の職歴</p>
                <div class="info-text">
                  <p class="work-line">【会社名】{{ user.workHistory.companyName }}【業種】{{ user.workHistory.industry }}【従業員数】{{ user.workHistory.employeeCount }}【雇用形態】{{ user.workHistory.employmentType }}</p>
                  <p class="work-line">【勤務期間】{{ user.workHistory.workPeriod }}【年収】{{ user.workHistory.salary }}【マネジメント経験】{{ user.workHistory.management }}</p>
                  <p class="work-line">【職種】{{ user.workHistory.jobType }}【業務内容】{{ user.workHistory.duties }}</p>
                </div>
              </div>

              <div class="bottom-actions">
                <div class="salary-label-btn current-label">現在の年収</div>
                <div class="salary-value-btn current-value">
                  {{ user.currentSalaryMin }} - {{ user.currentSalaryMax }}
                  <span class="quo">万円</span>
                </div>
                <div class="salary-label-btn desired-label">希望年収</div>
                <div class="salary-value-btn desired-value">
                  {{ user.desiredSalary }}
                  <span class="quo">万円以上</span>
                </div>
                <button class="action-btn detail" @click="viewUserDetail(user.id)">詳しく見る</button>
                <button class="action-btn offer" @click="sendOffer(user.id)">オファーする</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ページネーション -->
    <div class="pagination">
      <button class="page-btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">← 前へ</button>
      <div class="page-numbers">
        <button v-for="page in totalPages" :key="page" class="page-number" :class="{ active: page === currentPage }" @click="changePage(page)">
          {{ page }}
        </button>
      </div>
      <button class="page-btn" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">次へ →</button>
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
                  <span class="personal-value">{{ item.value || "指定なし" }}</span>
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
  layout: "mypage",
});

const route = useRoute();
const conditionId = route.query.id || "1";

// ページネーション
const currentPage = ref(1);
const totalPages = ref(5);

// モーダル制御
const isConditionModalOpen = ref(false);

// 検索条件データ（API想定）
const searchCondition = ref({
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
          minorCategories: "プロジェクトマネージャー・リーダー　システムエンジニア　プログラマー",
        },
        {
          id: 2,
          name: "汎用系：年齢問わず",
          minorCategories: "システムエンジニア（汎用系）　プログラマー（汎用系）",
        },
      ],
    },
  ],
  personal: [
    { label: "年齢", value: "20～40" },
    { label: "性別", value: "指定しない" },
    { label: "現住所", value: "東京都世田谷区在住" },
    { label: "希望年収", value: "500万円以上～" },
    { label: "直近の勤務形態", value: "正社員" },
    { label: "雇用形態希望", value: "常駐" },
  ],
  locations: [
    { id: 1, name: "東京都", cities: "港区 新宿区 渋谷区 千代田区" },
    { id: 2, name: "神奈川県", cities: "横浜市 川崎市" },
  ],
});

// マッチしたユーザーデータ（API想定）
const matchedUsers = ref([
  {
    id: "1010101",
    name: "山田 太郎",
    gender: "男性",
    workYears: 25,
    desiredLocation: "福岡",
    lastLogin: "2日前",
    registeredDate: "2025.12.12",
    experienceCategory1: "プロジェクトマネージャー（組込み・制御系）　プログラマー（組込み・制御系）　システムエンジニア（組込み・制御系）",
    experienceCategory2: "ソフトウェア・情報処理",
    workHistory: {
      companyName: "株式会社テクノプロ",
      industry: "ソフトウェア・情報処理",
      employeeCount: "8922名",
      employmentType: "正社員",
      workPeriod: "2024年11月〜",
      salary: "390万円",
      management: "一般スタッフ(役職・アルバイト含む)",
      jobType: "データベース構築",
      duties: "半導体を製造してい…",
    },
    currentSalaryMin: 400,
    currentSalaryMax: 449,
    desiredSalary: 500,
  },
  {
    id: "1010102",
    name: "佐藤 花子",
    gender: "女性",
    workYears: 28,
    desiredLocation: "東京",
    lastLogin: "2日前",
    registeredDate: "2025.12.12",
    experienceCategory1: "プロジェクトマネージャー（組込み・制御系）　プログラマー（組込み・制御系）　システムエンジニア（組込み・制御系）",
    experienceCategory2: "ソフトウェア・情報処理",
    workHistory: {
      companyName: "株式会社テクノプロ",
      industry: "ソフトウェア・情報処理",
      employeeCount: "8922名",
      employmentType: "正社員",
      workPeriod: "2024年11月〜",
      salary: "300万円",
      management: "一般スタッフ(派遣・アルバイト含む)",
      jobType: "データベース系SE",
      duties: "半導体を製造してい…",
    },
    currentSalaryMin: 400,
    currentSalaryMax: 449,
    desiredSalary: 500,
  },
  {
    id: "1010103",
    name: "鈴木 太郎",
    gender: "男性",
    workYears: 25,
    desiredLocation: "大阪",
    lastLogin: "2日前",
    registeredDate: "2025.12.12",
    experienceCategory1: "プロジェクトマネージャー（組込み・制御系）　プログラマー（組込み・制御系）　システムエンジニア（組込み・制御系）",
    experienceCategory2: "ソフトウェア・情報処理",
    workHistory: {
      companyName: "株式会社テクノプロ",
      industry: "ソフトウェア・情報処理",
      employeeCount: "8922名",
      employmentType: "正社員",
      workPeriod: "2024年11月〜",
      salary: "390万円",
      management: "一般スタッフ(役職・アルバイト含む)",
      jobType: "データベース構築",
      duties: "生涯保を進して…",
    },
    currentSalaryMin: 400,
    currentSalaryMax: 449,
    desiredSalary: 500,
  },
]);

// モーダル開閉
const openConditionModal = () => {
  isConditionModalOpen.value = true;
};

const closeConditionModal = () => {
  isConditionModalOpen.value = false;
};

// ページ遷移
const goBack = () => {
  navigateTo("/mypage/matching");
};

const goToEditCondition = () => {
  closeConditionModal();
  navigateTo(`/mypage/matching/${conditionId}`);
};

const viewUserDetail = (userId: string) => {
  console.log("ユーザー詳細:", userId);
  // navigateTo(`/mypage/matching/user/${userId}`)
};

const sendOffer = (userId: string) => {
  console.log("オファー送信:", userId);
  // navigateTo(`/mypage/offer/new?userId=${userId}`)
};

// ページネーション
const changePage = (page: number) => {
  currentPage.value = page;
  // API呼び出し
};
</script>

<style lang="scss" scoped>
.results-page {
  width: 1060px;
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
  font-family: "noto-sans-cjk-jp", sans-serif;
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
  font-family: "noto-sans-cjk-jp", sans-serif;
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
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 16px;
  color: #333;
  margin: 0;

  .count {
    font-size: 24px;
    margin-right: 3px;
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
  overflow: hidden;
  display: flex;
  border-radius: 12px;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  background: #fff;
}

// 左側の背景をグレーに
.user-left {
  width: 160px;
  background: #fff; // グレーに変更
  border-right: 1px solid #e5e5e5;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

// 名前を左側に追加
.user-name-left {
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #0d0d0d;
  text-align: center;
  margin-top: 8px;
}

.user-avatar {
  width: 76px;
  height: 76px;
  background: #fff;
  border: 2px solid #e5e5e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;

  .avatar-icon {
    font-size: 32px;
  }
}

.user-id-badge {
  color: #000;
  text-align: center;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 14px; /* 100% */
  letter-spacing: 0.3px;
}

.user-years {
  margin-top: 15px;
  text-align: center;
}

.years-number {
  color: #444;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px; /* 100% */
  letter-spacing: 0.3px;
}

.years-unit {
  color: #454444;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 100% */
  letter-spacing: 0.3px;
  margin-left: 3px;
}

// 希望勤務地のスタイル
.user-desired-location {
  font-size: 10px;
  color: #666;
  text-align: center;
  line-height: 1.4;
  margin-top: 15px;

  .location-label {
    color: #000;
    font-family: "noto-sans-cjk-jp", sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 12px; /* 100% */
    letter-spacing: 0.3px;
  }

  .location-name {
    color: #000;
    font-family: "noto-sans-cjk-jp", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 12px;
    letter-spacing: 0.3px;
  }
}

.user-login,
.user-registered {
  color: #000;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 100% */
  letter-spacing: 0.3px;
  margin-top: 10px;
}

// 右側：詳細情報
.user-right {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.user-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-section {
  background: #f5f5f5;
  padding: 10px 20px;
}

.info-label {
  color: #000;
  text-align: left;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 14px; /* 100% */
  letter-spacing: 0.3px;
}

.info-text {
  font-family: "noto-sans-cjk-jp", sans-serif;
  color: #232323;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px; /* 100% */
  letter-spacing: 0.3px;
  margin-top: 10px;
}

.secondary {
  margin-top: 10px;
}

.work-history {
  .info-text {
    .work-line {
      color: #232323;
      font-family: "noto-sans-cjk-jp", sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 142.857% */
      letter-spacing: 0.3px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.bottom-actions {
  display: flex;
  margin-top: auto;
  padding-top: 16px;
  align-items: center;
}

.salary-label-btn {
  padding: 10px 20px;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.5px;
  white-space: nowrap;
  display: flex;
  align-items: center;

  &.current-label {
    background: #292929;
    color: #fff;
  }

  &.desired-label {
    background: #292929;
    color: #fff;
  }
}

.salary-value-btn {
  padding: 7px 20px;
  font-family: "noto-sans-cjk-jp", sans-serif;
  color: #000;
  white-space: nowrap;
  display: flex;
  align-items: baseline;
  margin-right: 20px;

  &.current-value {
    background: #f5f5f5;
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 100% */
    letter-spacing: 0.3px;
  }

  &.desired-value {
    background: #f5f5f5;
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 100% */
    letter-spacing: 0.3px;
  }

  .quo {
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 100% */
    letter-spacing: 0.3px;
    margin-left: 5px;
  }
}

.action-btn {
  padding: 6px 15px;
  border-radius: 20px; // 丸角（pill型）
  font-family: "noto-sans-cjk-jp", sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &.detail {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 171.429% */
    letter-spacing: 0.028px;
    color: #191919;
    text-align: center;
    border: 1px solid #2e2e2e;
    margin-right: 20px;
    margin-left: auto; // 右端に配置

    &:hover {
      background: #f5f5f5;
    }
  }

  &.offer {
    background: #000;
    color: #fff;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 171.429% */
    letter-spacing: 0.028px;
    &:hover {
      background: #1a1a1a;
    }
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

.condition-block {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
}

.condition-title {
  font-family: "noto-sans-cjk-jp", sans-serif;
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
  font-family: "noto-sans-cjk-jp", sans-serif;
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
  font-family: "noto-sans-cjk-jp", sans-serif;
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
  font-family: "noto-sans-cjk-jp", sans-serif;
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
  font-family: "noto-sans-cjk-jp", sans-serif;
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

  .condition-name {
    font-size: 18px;
    font-weight: 700;
    color: #2d2d2d;
    margin-right: 3px;
  }

  .count {
    font-size: 24px;
    font-weight: 700;
    color: #2d2d2d;
  }
}
</style>
