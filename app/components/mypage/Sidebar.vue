<template>
  <aside class="sidebar" :class="{ 'is-open': isOpen }">
    <nav class="sidebar-nav">
      <div class="nav-section">
        <NuxtLink to="/mypage" class="nav-item">
          
          ダッシュボード
        </NuxtLink>
<NuxtLink 
  to="/mypage/matching" 
  class="nav-item"
  :class="{ 'router-link-active': $route.path.startsWith('/mypage/matching') }"
>
  求職者検索
</NuxtLink>
                <NuxtLink to="/mypage/offer" class="nav-item">
          オファー状況
        </NuxtLink>
                <NuxtLink to="/mypage/billing" class="nav-item">
          請求管理
        </NuxtLink>
      </div>

      <div class="nav-section">
        <p class="nav-label">検討中（開発）</p>
        
                <NuxtLink to="/mypage/notifications" class="nav-item">
          通知
        </NuxtLink>

        <NuxtLink to="/mypage/offer/active" class="nav-item">
          
          参加中のオファー会
        </NuxtLink>
        <NuxtLink to="/mypage/cart" class="nav-item">
          
          カート
        </NuxtLink>
        <NuxtLink to="/mypage/negotiation" class="nav-item">
        
          交渉
        </NuxtLink>
      </div>

      <div class="nav-section">
        <p class="nav-label">アカウント</p>
        <NuxtLink to="/mypage/corporate" class="nav-item">
          
          法人情報
        </NuxtLink>
        <NuxtLink to="/mypage/account" class="nav-item">
         
          プロフィール編集
        </NuxtLink>
        <NuxtLink to="/mypage/account/children" class="nav-item">
          
          子アカウント追加
        </NuxtLink>
      </div>

      <div class="nav-section">
        <p class="nav-label">その他</p>
        <NuxtLink to="/mypage/contact" class="nav-item">
        
          問い合わせ
        </NuxtLink>
        <NuxtLink to="/mypage/withdraw" class="nav-item">
        
          退会
        </NuxtLink>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 250px;
  background: #fff;
  border-right: 1px solid #e2e8f0;
  overflow-y: auto;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 90;

  @media (min-width: 1024px) {
    transform: translateX(0);
  }

  &.is-open {
    transform: translateX(0);
  }
}

.sidebar-nav {
  padding: 40px 0;
}

.nav-section {
  margin-bottom: 24px;
}

.nav-label {
  padding: 8px 20px;
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 0 15px 65px;  // 上下15px、左65px
  font-size: 14px;
  color: #475569;
  text-decoration: none;
  transition: all 0.2s ease;
  line-height: 1;

&:hover {
  background: rgba(0, 0, 0, 0.05);
}

&.router-link-active,
&.router-link-exact-active {
  position: relative;
  color: #fff;
  padding-left: 55px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 20px;
    width: 225px;  // 250px - 20px(左) - 20px(右)
    height: 45px;
    background: #000;
    border-radius: 6px;
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 45px;
    border-radius: 4px;
    background: #000;
  }
}

  .nav-icon {
    font-size: 16px;
  }
}
</style>
