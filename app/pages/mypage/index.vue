<template>
  <div class="dashboard">
    <!-- 統計カード -->
<div class="stats-container">
  <div class="stats-grid">
    <!-- 元のカードのみ -->
    <div class="stat-card" v-for="stat in statsData" :key="stat.id">
      <p class="stat-label">{{ stat.label }}</p>
      <p class="stat-value">
        {{ stat.value }}
        <span class="stat-unit">{{ stat.unit }}</span>
      </p>
    </div>
  </div>
</div>
    
<!-- マッチング条件 -->
<section class="matching-section">
  <h2 class="section-title">マッチング条件</h2>
  
  <div class="matching-grid">
    <div class="matching-card" v-for="(condition, index) in displayedConditions" :key="condition.id">
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
  
  <!-- Search moreボタン（スマホのみ表示） -->
  <div class="search-more">
    <a href="/mypage/matching" class="search-more-link">
      Search more
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect width="16" height="16" transform="matrix(0 1 -1 0 16 0)" fill="white" fill-opacity="0.01" style="mix-blend-mode: multiply" />
        <path d="M11 8L6 13L5.3 12.3L9.6 8L5.3 3.7L6 3L11 8Z" fill="#161616" />
      </svg>
    </a>
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

// 統計データ（API用モックデータ）
const statsData = ref([
  {
    id: 1,
    label: 'オファー求職者数',
    value: 38,
    unit: '人'
  },
  {
    id: 2,
    label: '交渉権獲得数',
    value: 18,
    unit: '人'
  },
  {
    id: 3,
    label: 'コンタクト数',
    value: 15,
    unit: '人'
  },
  {
    id: 4,
    label: 'コンタクト待機数',
    value: 3,
    unit: '人'
  }
])

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
    id: 2,
    title: '求職者条件2',
    age: '20～40',
    jobType: 'オープン・Web系：5年以上',
    location: '東京都　港区 新宿区 渋谷区'
  },
  {
    id: 3,
    title: '求職者条件3',
    age: '20～40',
    jobType: 'オープン・Web系：5年以上',
    location: '東京都　港区 新宿区 渋谷区'
  }
])

// 画面幅をリアクティブに監視
const windowWidth = ref(0)

onMounted(() => {
  // 初期値を設定
  windowWidth.value = window.innerWidth
  
  // リサイズイベントを監視
  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }
  
  window.addEventListener('resize', handleResize)
  
  // クリーンアップ
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})

// 表示する条件（スマホ: 1つ、PC: 3つ）
const displayedConditions = computed(() => {
  if (windowWidth.value <= 480) {
    return matchingConditions.value.slice(0, 1) // 直近1つ
  }
  return matchingConditions.value.slice(0, 3) // 直近3つ
})

// 検索ボタンクリック時の処理
const handleSearch = (id: number) => {
  navigateTo(`/mypage/matching/${id}`)
}


</script>

<style lang="scss" scoped>
.dashboard {
  max-width: 1190px;
  
  @media (max-width: 480px) {
    max-width: 100%;
    width: 100%;
  }
}

.stats-container {
  margin-bottom: 50px;
  width: 860px;
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 100%;
    margin-left: 0;
    margin-right: 0;
    padding: 0;
    overflow-x: hidden;
    box-sizing: border-box;
    margin-bottom: 40px;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 860px;
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    width: 100%;
    max-width: 100%;
    padding: 0;
    box-sizing: border-box;
  }
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
  
  @media (max-width: 480px) {
    min-width: auto;
    flex-shrink: 1;
    box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, 0.08);
  }

  .stat-label {
    color: #000;
    font-family: "noto-sans-cjk-jp", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 25px;
    letter-spacing: 1px;
    margin: 0;
    line-height: 1;
    margin-bottom: 20px;
    
    @media (max-width: 480px) {
      font-size: 12px;
      margin-bottom: 12px;
    }
  }

  .stat-value {
    color: #000;
    font-family: "noto-sans-cjk-jp", sans-serif;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: 25px;
    letter-spacing: 3px;
    margin: 0;
    line-height: 1;
    
    @media (max-width: 480px) {
      font-size: 28px;
    }

    .stat-unit {
      color: #000;
      font-family: "noto-sans-cjk-jp", sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 25px;
      letter-spacing: 1px;
      line-height: 1;
      margin-left: 12px;
      
      @media (max-width: 480px) {
        font-size: 14px;
        margin-left: 8px;
      }
    }
  }
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 20px;
      @media (max-width: 480px) {
      font-size: 16px;
    }
}

.matching-section {
  margin-bottom: 40px;
}

.matching-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  width: 1050px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    width: 100%;
    max-width: 100%;
    gap: 15px;
    box-sizing: border-box;
  }
}

.search-more {
  display: none;
  text-align: right;
  margin-top: 30px;
  
  @media (max-width: 480px) {
    display: block;
    width: 100%;
  }

  .search-more-link {
    background: #fff;
    padding: 10px 15px;
    color: var(--Text-text-primary, #161616);
    font-family: Arial;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.16px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    
        @media (max-width: 480px) {
      font-size: 12px;
    }
  }
}

.matching-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 480px) {
    width: 100%;
    min-width: 100%;
    flex-shrink: 0;
  }

  .matching-title {
    background: #2d2d2d;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    padding: 10px 15px;
    line-height: 1;
    border-radius: 10px 10px 0 0;
        @media (max-width: 480px) {
      font-size: 12px;
    }
  }

  .matching-details {
    padding: 10px 15px;

    p {
      color: #000;
      font-family: "noto-sans-cjk-jp", sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 14px;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
          @media (max-width: 480px) {
      font-size: 12px;
    }
    }
  }

  .button-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    
    @media (max-width: 480px) {
      margin-bottom: 10px;
    }

    .search-button {
      width: 100px;
      padding: 5px 20px;
      background: #E2EAF8;
      border-radius: 4px;
      color: #202224;
      font-family: "noto-sans-cjk-jp", sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 14px;
      letter-spacing: 1px;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
          @media (max-width: 480px) {
      font-size: 12px;
    }
    }
  }
}

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
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }
}

.information-item {
  padding: 20px;
  background: #fff;
  border-bottom: 1px solid #f1f5f9;
  border-left: 3px solid transparent;
  transition: all 0.2s ease;
  
  @media (max-width: 480px) {
    padding: 10px 15px;
  }

  &:last-child {
    border-bottom: none;
  }

  &:nth-child(3n + 1) {
    border-left-color: #4589ff;
  }

  &:nth-child(3n + 2) {
    border-left-color: #ffb145;
  }

  &:nth-child(3n + 3) {
    border-left-color: #18db73;
  }

  .info-left {
    .info-date {
      color: #000;
      font-family: "noto-sans-cjk-jp", sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 300;
      line-height: 18px;
      letter-spacing: 0.16px;
      margin-bottom: 6px;
      
      @media (max-width: 480px) {
        font-size: 12px;
        margin-bottom: 4px;
      }
    }

    .info-text {
      color: #000;
      font-family: "noto-sans-cjk-jp", sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 300;
      line-height: 18px;
      letter-spacing: 0.16px;
      
      @media (max-width: 480px) {
        font-size: 12px;
      }
    }
  }
}

.read-more {
  text-align: right;
  margin-top: 30px;
  width: 1050px;
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .read-more-link {
    background: #fff;
    padding: 10px 15px;
    color: var(--Text-text-primary, #161616);
    font-family: Arial;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.16px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
        @media (max-width: 480px) {
      font-size: 12px;
    }
  }
}
</style>
