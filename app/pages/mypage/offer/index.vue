<template>
  <div class="offer-page all-page">
    <!-- ページヘッダー -->
    <div class="page-header">
      <h1 class="page-title">オファー状況</h1>
    </div>

    <!-- オファーカード一覧 -->
    <section class="offers-section">
      <div class="offers-list">
        <div v-for="offer in offerList" :key="offer.id" class="offer-card">
          <!-- 左側：基本情報 -->
          <div class="offer-left">
            <div class="user-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="76" height="76" viewBox="0 0 76 76" fill="none">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M38.0019 14.6144C34.1257 14.6144 30.4082 16.1543 27.6673 18.8953C24.9264 21.6362 23.3866 25.3537 23.3866 29.23C23.3866 33.1063 24.9264 36.8239 27.6673 39.5648C30.4082 42.3058 34.1257 43.8456 38.0019 43.8456C41.8782 43.8456 45.5957 42.3058 48.3366 39.5648C51.0775 36.8239 52.6173 33.1063 52.6173 29.23C52.6173 25.3537 51.0775 21.6362 48.3366 18.8953C45.5957 16.1543 41.8782 14.6144 38.0019 14.6144ZM38.0019 20.4607C35.6762 20.4607 33.4457 21.3846 31.8012 23.0292C30.1566 24.6737 29.2327 26.9043 29.2327 29.23C29.2327 31.5558 30.1566 33.7863 31.8012 35.4309C33.4457 37.0755 35.6762 37.9994 38.0019 37.9994C40.3277 37.9994 42.5582 37.0755 44.2027 35.4309C45.8473 33.7863 46.7712 31.5558 46.7712 29.23C46.7712 26.9043 45.8473 24.6737 44.2027 23.0292C42.5582 21.3846 40.3277 20.4607 38.0019 20.4607Z"
                  :fill="offer.gender === '女性' ? '#EF0399' : '#2E06C0'"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M38 0C30.2951 0 22.7723 2.3422 16.4291 6.71597C10.0859 11.0898 5.22217 17.2885 2.48282 24.49C-0.256536 31.6916 -0.742043 39.5558 1.09069 47.0396C2.92309 54.5221 6.98635 61.271 12.7417 66.3915C19.6935 72.5924 28.6868 76.0132 38.0021 76C47.3156 76.0122 56.3113 72.5916 63.2622 66.3915C69.0183 61.2703 73.0771 54.5212 74.9093 47.0396C76.742 39.5558 76.2565 31.6916 73.5172 24.49C70.7778 17.2885 65.9141 11.0898 59.5709 6.71597C53.2277 2.3422 45.7049 0 38 0ZM38 5.84624C31.4805 5.84624 25.115 7.8281 19.7477 11.529C14.3804 15.2299 10.2649 20.4749 7.947 26.5686C5.62909 32.6622 5.21827 39.3165 6.76904 45.649C8.08016 51.0029 10.7411 55.9128 14.4761 59.9211C17.0996 57.1032 20.2149 54.7733 23.6783 53.0509C28.1293 50.8372 33.0335 49.6874 38.0046 49.6919C42.9739 49.6882 47.8762 50.838 52.3256 53.0509C55.7889 54.7733 58.9042 57.1031 61.5277 59.921C65.2613 55.9132 67.9197 51.0035 69.231 45.649C70.7817 39.3165 70.3709 32.6622 68.053 26.5686C65.7351 20.4749 61.6196 15.2299 56.2523 11.529C50.885 7.8281 44.5195 5.84624 38 5.84624ZM57.1714 63.8218C55.0419 61.5542 52.521 59.6774 49.7224 58.2855C46.0818 56.4749 42.0705 55.5344 38.0046 55.5381H37.9993C33.9334 55.5344 29.9221 56.4749 26.2815 58.2855C23.4828 59.6774 20.962 61.5542 18.8324 63.8219C24.3506 67.9283 31.0688 70.1644 37.9975 70.1537H38.0061C44.9338 70.1636 51.6536 67.9274 57.1714 63.8218Z"
                  :fill="offer.gender === '女性' ? '#EF0399' : '#2E06C0'"
                />
              </svg>
            </div>
            <div class="user-id-badge">No.{{ offer.userId }}</div>
            <div class="user-years">
              <span class="years-number">{{ offer.age }}</span>
              <span class="years-unit">歳</span>
            </div>
            <div class="user-status">
              <span class="status-label">希望勤務地：</span>
              <span class="status-value">{{ offer.currentCompany }}</span>
            </div>
          </div>

          <!-- 中央：オファー詳細 -->
          <div class="offer-center">
            <!-- 職種情報 -->
            <div class="job-info">
              <p class="job-category">希望職種</p>
              <p class="job-title">{{ offer.jobTitle }}</p>
            </div>

            <!-- オファー価格 -->
            <div class="offer-price-section">
              <p class="price-label">参加中のオファー価格</p>
              <p class="price-value">
                {{ offer.offerPrice }}
                <span class="price-unit">万円</span>
              </p>
            </div>

            <!-- 年収情報とアクション -->
            <div class="bottom-actions">
              <div class="salary-label-btn current-label">現在の年収</div>
              <div class="salary-value-btn current-value">
                {{ offer.currentSalaryMin }} - {{ offer.currentSalaryMax }}
                <span class="quo">万円</span>
              </div>
              <div class="salary-label-btn desired-label">希望年収</div>
              <div class="salary-value-btn desired-value">
                {{ offer.desiredSalary }}
                <span class="quo">万円以上</span>
              </div>
            </div>
          </div>

          <!-- 右側：アクションとタイマー -->
          <div class="offer-right">
            <div class="action-buttons">
              <button class="action-btn detail" @click="viewJobInfo(offer.id)">求人情報</button>
              <button class="action-btn change-price" @click="changeOfferPrice(offer.id)">オファー価格変更</button>
            </div>
            
            <!-- タイマー表示 -->
            <div class="timer-badge">
              <span class="timer-icon">⏱</span>
              オファー期限
              <div class="timer-value">
                あと
                <span class="time-number">{{ offer.remainingHours }}</span>
                時間
                <span class="time-number">{{ offer.remainingMinutes }}</span>
                分
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "mypage",
});

// オファーデータ（API想定）
const offerList = ref([
  {
    id: 1,
    userId: "1010101",
    gender: "男性",
    age: 42,
    currentCompany: "福岡",
    jobTitle: "プログラマー（組込み・制御系）　システムエンジニア（組込み・制御系）",
    offerPrice: 500,
    currentSalaryMin: 400,
    currentSalaryMax: 449,
    desiredSalary: 500,
    remainingHours: 35,
    remainingMinutes: 25,
  },
  {
    id: 2,
    userId: "1010101",
    gender: "女性",
    age: 35,
    currentCompany: "福岡",
    jobTitle: "プログラマー（組込み・制御系）　システムエンジニア（組込み・制御系）",
    offerPrice: 300,
    currentSalaryMin: 200,
    currentSalaryMax: 249,
    desiredSalary: 300,
    remainingHours: 15,
    remainingMinutes: 25,
  },
  {
    id: 3,
    userId: "1010101",
    gender: "男性",
    age: 39,
    currentCompany: "福岡",
    jobTitle: "プログラマー（組込み・制御系）　システムエンジニア（組込み・制御系）",
    offerPrice: 200,
    currentSalaryMin: 400,
    currentSalaryMax: 449,
    desiredSalary: 200,
    remainingHours: 35,
    remainingMinutes: 25,
  },
]);

// アクション
const viewJobInfo = (offerId: number) => {
  console.log("求人情報:", offerId);
  // navigateTo(`/mypage/offer/${offerId}/job-info`)
};

const changeOfferPrice = (offerId: number) => {
  console.log("オファー価格変更:", offerId);
  // navigateTo(`/mypage/offer/${offerId}/change-price`)
};
</script>

<style lang="scss" scoped>

// ページヘッダー
.page-header {
  margin-bottom: 24px;
}

.page-title {
  color: #0d0d0d;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  margin: 0;
}

// オファー一覧
.offers-section {
  margin-bottom: 32px;
}

.offers-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.offer-card {
  overflow: hidden;
  display: flex;
  border-radius: 12px;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  position: relative;
}

// 左側
.offer-left {
  width: 160px;
  background: #fff;
  border-right: 1px solid #9D9D9D;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
}

.user-id-badge {
  color: #000;
  text-align: center;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
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
  font-weight: 500;
  line-height: 25px;
  letter-spacing: 0.3px;
}

.years-unit {
  color: #454444;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: 0.3px;
  margin-left: 3px;
}

.user-status {
  font-size: 12px;
  color: #000;
      font-family: "noto-sans-cjk-jp", sans-serif;
font-style: normal;
font-weight: 400;
line-height: 12px;
letter-spacing: 0.3px;
  margin-top: 15px;
    width: 100%; 
  text-align: left;

  .status-label {
    color: #000;
    font-family: "noto-sans-cjk-jp", sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
    letter-spacing: 0.3px;
  }

  .status-value {
    color: #000;
    font-family: "noto-sans-cjk-jp", sans-serif;
    font-size: 15px;
    font-weight: 700;
    line-height: 12px;
    letter-spacing: 0.3px;
  }
}

// 右側
.offer-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.offer-content {
  padding: 20px 30px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

// 職種情報
.job-info {
padding-left: 20px;

  .job-category {
color: #000;
text-align: left;
    font-family: "noto-sans-cjk-jp", sans-serif;

font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: 14px; /* 100% */
letter-spacing: 0.3px;
margin-bottom: 10px;
  }

  .job-title {
    color: #232323;
    font-family: "noto-sans-cjk-jp", sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0.3px;
    margin: 0;
  }
}

// オファー価格
.offer-price-section {
    display: flex;
    align-items: center;
  text-align: left;
background: #F5F5F5;
  padding: 25px 20px;

  .price-label {
    color: #000;
    font-family: "noto-sans-cjk-jp", sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0.3px;
    margin-right: 80px;
  }

  .price-value {
    color: #000;
    font-family: "noto-sans-cjk-jp", sans-serif;
    font-size: 40px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: 0.3px;
    margin: 0;

    .price-unit {
color: #000;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 30px;
letter-spacing: 0.3px;
    font-family: "noto-sans-cjk-jp", sans-serif;
    }
  }
}

// 年収とアクション
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
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.5px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  
  
  &.current-label,
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
  background: #f5f5f5;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.3px;

  .quo {
    color: #000;
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0.3px;
    margin-left: 5px;
  }
}

// 中央
.offer-center {
  flex: 1;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-right: 1px solid #9D9D9D;
}

// 右側
.offer-right {
  width: 250px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
}

// 年収とアクションを修正（ボタンを削除）
.bottom-actions {
  display: flex;
  margin-top: auto;
  padding-top: 16px;
  align-items: center;
}

.action-btn {
  width: 100%;
  padding: 10px 15px;
  border-radius: 20px;
  font-family: "noto-sans-cjk-jp", sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.028px;
  text-align: center;

  &.detail {
    color: #191919;
    border: 1px solid #2e2e2e;
    background: #fff;

    &:hover {
      background: #f5f5f5;
    }
  }

  &.change-price {
    background: #000;
    color: #fff;

    &:hover {
      background: #1a1a1a;
    }
  }
}

// タイマーバッジ
.timer-badge {
  background: #000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 12px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  .timer-icon {
    font-size: 16px;
  }

  .timer-value {
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;

    .time-number {
      font-size: 20px;
      margin: 0 2px;
    }
  }
}
</style>
