<template>
  <div>
    <h1 class="page-title">請求管理</h1>

    <!-- 今月の請求額 -->
    <section class="current-bill-section">
      <h2 class="section-title">今月の請求額</h2>
      <div class="current-bill-card">
        <div class="bill-date">{{ currentBill.date }}</div>
        <div class="bill-info">
          <div class="amount"><span>{{ currentBill.amount }}</span></div>
          <div class="due"><span>[ 支払い期限: {{ currentBill.dueDate }} ]</span></div>
        </div>
        <div class="bill-status" :class="currentBill.statusClass">{{ currentBill.status }}</div>
      </div>
    </section>

    <!-- 請求履歴 -->
    <section class="bill-history-section">
      <h2 class="section-title">請求履歴</h2>
      <div class="bill-history-card" v-for="bill in billHistory" :key="bill.id">
        <div class="bill-date">{{ bill.date }}</div>
        <div class="bill-product">{{ bill.product }}</div>
        <div class="bill-info">
          <div class="amount">{{ bill.amount }}</div>
          <div class="due">[ 請求日: {{ bill.due }} ]</div>
        </div>
        <div class="bill-status" :class="bill.statusClass">{{ bill.status }}</div>
      </div>
      <div class="button-wrap">
        <button class="read-more" @click="navigateToBillHistory">
          Read more
          <span class="arrow-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect width="16" height="16" transform="matrix(0 1 -1 0 16 0)" fill="white" fill-opacity="0.01" style="mix-blend-mode:multiply"/>
              <path d="M11 8L6 13L5.3 12.3L9.6 8L5.3 3.7L6 3L11 8Z" fill="#161616"/>
            </svg>
          </span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mypage'
})

// 今月の請求額
const currentBill = ref({
  date: '2025年8月分',
  amount: '¥ 35,000',
  dueDate: '2025/08/01',
  status: '支払い待ち',
  statusClass: 'status-pending'
})

// 請求履歴
const billHistory = ref([
  { 
    id: 1, 
    date: '2025年7月分', 
    product: 'ReFa BEAUTECH EPI レンタル料', 
    amount: '¥ 35,000', 
    due: '2025/07/01', 
    status: '支払い済み', 
    statusClass: 'status-paid' 
  },
  { 
    id: 2, 
    date: '2025年6月分', 
    product: 'ReFa BEAUTECH EPI レンタル料', 
    amount: '¥ 35,000', 
    due: '2025/06/01', 
    status: '支払い済み', 
    statusClass: 'status-paid' 
  },
  { 
    id: 3, 
    date: '2025年5月分', 
    product: 'ReFa BEAUTECH EPI レンタル料', 
    amount: '¥ 35,000', 
    due: '2025/05/01', 
    status: '支払い済み', 
    statusClass: 'status-paid' 
  },
  { 
    id: 4, 
    date: '2025年4月分', 
    product: 'ReFa BEAUTECH EPI レンタル料', 
    amount: '¥ 35,000', 
    due: '2025/04/01', 
    status: '支払い済み', 
    statusClass: 'status-paid' 
  },
])

const navigateToBillHistory = () => {
  navigateTo('/mypage/billing-history')
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
  margin-bottom: 45px;
}

.section-title {
  color: #0D0D0D;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 1px;
  margin-bottom: 30px;
}

.current-bill-section,
.bill-history-section {
  padding: 30px;
  border-radius: 12px;
  background: #FFF;
  box-shadow: 6px 6px 54px 0 rgba(0, 0, 0, 0.05);
}

.current-bill-section {
  margin-bottom: 30px;
}

.current-bill-card {
  position: relative;
  border-radius: 11px;
  background: #F2F2F2;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 30px;
  
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .bill-info {
    display: flex;
    flex-direction: column;
    justify-content: end;
    text-align: end;
    margin-left: 62px;
    
    @media (max-width: 1200px) {
      justify-content: flex-start;
      text-align: left;
      margin-left: 0;
    }
    
    .amount {
      color: #000;
      font-family: "noto-sans-cjk-jp", sans-serif;
      font-size: 32px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: 0.3px;
    }
    
    .due {
      margin-top: 15px;
      color: #000;
      font-family: "noto-sans-cjk-jp", sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0.3px;
    }
  }
}

.bill-history-card {
  position: relative;
  border-radius: 11px;
  border: 0.5px solid #5C5C5C;
  background: #FFF;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 30px;
  margin-bottom: 15px;
  
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .bill-info {
    display: flex;
    flex-direction: column;
    justify-content: end;
    text-align: end;
    margin-left: 62px;
    
    @media (max-width: 1200px) {
      justify-content: flex-start;
      text-align: left;
      margin-left: 0;
    }
    
    .amount {
      color: #000;
      font-family: "noto-sans-cjk-jp", sans-serif;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: 0.3px;
    }
    
    .due {
      margin-top: 3px;
      color: #6B6B6B;
      font-family: "noto-sans-cjk-jp", sans-serif;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0.3px;
    }
  }
}

.bill-date {
  color: #000;
  text-align: center;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.3px;
}

.bill-product {
  margin-left: 77px;
  color: #000;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.3px;
  
  @media (max-width: 1200px) {
    margin-left: 0;
  }
}

.bill-status {
  position: absolute;
  right: 40px;
  padding: 5px 15px;
  border-radius: 32px;
  text-align: center;
  white-space: nowrap;
  
  @media (min-width: 836px) and (max-width: 1200px) {
    bottom: 30px;
  }
  
  @media (max-width: 835px) {
    bottom: 30px;
    line-height: 1;
    font-size: 0.875em;
  }
}

.status-pending {
  background-color: #FF923A;
  color: var(--white-100, #FFF);
  text-align: center;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.028px;
}

.status-paid {
  background-color: #000000;
  color: var(--white-100, #FFF);
  text-align: center;
  font-family: "noto-sans-cjk-jp", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.028px;
}

.button-wrap {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 20px;
  height: 38px;
  padding: 0;
  background-color: transparent;

  .read-more {
    color: var(--Text-text-primary, #161616);
    font-family: Arial;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.16px;
    background-color: #ffffff;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;

    .arrow-icon {
      display: inline-flex;
      margin-left: 8px;
      
      svg {
        width: 16px;
        height: 16px;
        display: block;
      }
    }
  }
}
</style>
