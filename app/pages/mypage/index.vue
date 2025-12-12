<template>
  <div class="dashboard">
    <!-- 統計カード -->
    <div class="stats-grid">
      <div class="stat-card">
        <p class="stat-label">オファー求職者数</p>
        <p class="stat-value">
          38
          <span class="stat-unit">人</span>
        </p>
      </div>
      <div class="stat-card">
        <p class="stat-label">交渉権獲得数</p>
        <p class="stat-value">
          18
          <span class="stat-unit">人</span>
        </p>
      </div>
      <div class="stat-card">
        <p class="stat-label">コンタクト数</p>
        <p class="stat-value">
          15
          <span class="stat-unit">人</span>
        </p>
      </div>
      <div class="stat-card">
        <p class="stat-label">コンタクト待機数</p>
        <p class="stat-value">
          3
          <span class="stat-unit">人</span>
        </p>
      </div>
    </div>
    
    <!-- マッチング条件 -->
    <section class="matching-section">
      <h2 class="section-title">マッチング条件</h2>
      <div class="matching-grid">
        <div class="matching-card" v-for="(condition, index) in matchingConditions" :key="condition.id">
          <h3 class="matching-title">{{ condition.title }}</h3>
          <div class="matching-details">
            <p>年齢：{{ condition.age }}</p>
            <p>経験職種：{{ condition.jobType }}</p>
            <p>希望勤務地：{{ condition.location }}</p>
          </div>
          <div class="button-wrap">
            <button class="search-button" @click="handleSearch(condition.id)">検索する</button>
          </div>
        </div>
      </div>
    </section>

    <!-- インフォメーション -->
    <section class="information-section">
      <h2 class="section-title">インフォメーション</h2>
      <div class="information-list">
        <div class="information-item">
          <div class="info-left">
            <p class="info-date">2025.12.21</p>
            <p class="info-text">キャンペーン開始のお知らせ</p>
          </div>
        </div>
        <div class="information-item">
          <div class="info-left">
            <p class="info-date">2025.08.15</p>
            <p class="info-text">システムメンテナンスのお知らせ</p>
          </div>
        </div>
        <div class="information-item">
          <div class="info-left">
            <p class="info-date">2025.08.15</p>
            <p class="info-text">システムメンテナンスのお知らせ</p>
          </div>
        </div>
        <div class="information-item">
          <div class="info-left">
            <p class="info-date">2025.12.21</p>
            <p class="info-text">キャンペーン開始のお知らせ</p>
          </div>
        </div>
        <div class="information-item">
          <div class="info-left">
            <p class="info-date">2025.08.15</p>
            <p class="info-text">システムメンテナンスのお知らせ</p>
          </div>
        </div>
      </div>
      <div class="read-more">
        <a href="#" class="read-more-link">
          Read more
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect width="16" height="16" transform="matrix(0 1 -1 0 16 0)" fill="white" fill-opacity="0.01" style="mix-blend-mode: multiply" />
            <path d="M11 8L6 13L5.3 12.3L9.6 8L5.3 3.7L6 3L11 8Z" fill="#161616" />
          </svg>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "mypage",
});

// マッチング条件データ
const matchingConditions = ref([
  {
    id: 1,
    title: '求職者条件1',
    age: '20～40',
    jobType: 'オープン・Web系：5年以上',
    location: '東京都　港区 新宿区 渋谷区'
  },
  {
    id: 1,
    title: '求職者条件1',
    age: '20～40',
    jobType: 'オープン・Web系：5年以上',
    location: '東京都　港区 新宿区 渋谷区'
  },
  {
    id: 1,
    title: '求職者条件1',
    age: '20～40',
    jobType: 'オープン・Web系：5年以上',
    location: '東京都　港区 新宿区 渋谷区'
  }
])

// 検索ボタンクリック時の処理
const handleSearch = (id: number) => {
  navigateTo(`/mypage/matching/${id}`)
}
</script>

<style lang="scss" scoped>
.dashboard {
  max-width: 1190px;
}

// 統計カードのグリッド
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 860px;
  height: 100px;
  margin-bottom: 50px;
}

.stat-card {
  border-radius: 14px;
  border: 0 solid #554a4a;
  background: #fff;
  box-shadow: 6px 6px 54px 0 rgba(0, 0, 0, 0.05);
  padding: 20px;
  text-align: center;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;

  .stat-label {
    color: #000;
    font-family: "noto-sans-cjk-jp", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 25px; /* 178.571% */
    letter-spacing: 1px;
    margin: 0;
    line-height: 1;
    margin-bottom: 20px;
  }

  .stat-value {
    color: #000;
    font-family: "noto-sans-cjk-jp", sans-serif;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: 25px; /* 69.444% */
    letter-spacing: 3px;
    margin: 0;
    line-height: 1;

    .stat-unit {
      color: #000;
      font-family: "noto-sans-cjk-jp", sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 25px; /* 156.25% */
      letter-spacing: 1px;
      line-height: 1;
      margin-left: 12px;
    }
  }
}

// セクションタイトル
.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 20px;
}

// マッチング条件
.matching-section {
  margin-bottom: 40px;
}

.matching-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  width: 1050px;
  gap: 15px;
}

.matching-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  .matching-title {
    background: #2d2d2d;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    padding: 10px 15px;
    line-height: 1;
    border-radius: 10px 10px 0 0;
  }

  .matching-details {
    padding: 10px 15px;

    p {
      color: #000;
      font-family: "noto-sans-cjk-jp", sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 14px; /* 100% */
      letter-spacing: 0.5px;
      margin-bottom: 10px;
      
          overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
  }

  .button-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;

    .search-button {
      width: 100px;
      padding: 5px 20px;
      background: #f3f3f3;
      border-radius: 4px;
      color: #202224;
      font-family: "noto-sans-cjk-jp", sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 14px; /* 100% */
      letter-spacing: 1px;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.2s ease;
    }
  }
}

// インフォメーション
.information-section {
  margin-bottom: 40px;
}

.information-list {
  border-radius: 8px;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 1050px;
  gap: 5px;
}

.information-item {
  padding: 20px;
  background: #fff;
  border-bottom: 1px solid #f1f5f9;
  border-left: 3px solid transparent;
  transition: all 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  // 青、オレンジ、緑の順番で繰り返し
  &:nth-child(3n + 1) {
    border-left-color: #4589ff; // 青
  }

  &:nth-child(3n + 2) {
    border-left-color: #ffb145; // オレンジ
  }

  &:nth-child(3n + 3) {
    border-left-color: #18db73; // 緑
  }

  .info-left {
    .info-date {
      color: #000;
      font-family: "noto-sans-cjk-jp", sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 300;
      line-height: 18px; /* 128.571% */
      letter-spacing: 0.16px;
      margin-bottom: 6px;
    }

    .info-text {
      color: #000;
      font-family: "noto-sans-cjk-jp", sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 300;
      line-height: 18px; /* 128.571% */
      letter-spacing: 0.16px;
    }
  }
}

.read-more {
  text-align: right;
  margin-top: 30px;
  width: 1050px;

  .read-more-link {
    background: #fff;
    padding: 10px 15px;
    color: var(--Text-text-primary, #161616);
    font-family: Arial;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 128.571% */
    letter-spacing: 0.16px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
