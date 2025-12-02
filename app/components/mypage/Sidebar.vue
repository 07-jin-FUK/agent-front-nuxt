<template>
  <aside class="sidebar" :class="{ 'is-open': isOpen }">
    <nav class="sidebar-nav">
      <div class="nav-section">
        <p class="nav-label">メイン</p>
        <NuxtLink to="/mypage" class="nav-item">
          <span class="nav-icon">📊</span>
          ダッシュボード
        </NuxtLink>
        <NuxtLink to="/mypage/matching" class="nav-item">
          <span class="nav-icon">🤝</span>
          マッチング
        </NuxtLink>
        <NuxtLink to="/mypage/notifications" class="nav-item">
          <span class="nav-icon">🔔</span>
          通知
        </NuxtLink>
      </div>

      <div class="nav-section">
        <p class="nav-label">入札・交渉</p>
        <NuxtLink to="/mypage/offer" class="nav-item">
          <span class="nav-icon">📝</span>
          オファー画面
        </NuxtLink>
        <NuxtLink to="/mypage/offer/active" class="nav-item">
          <span class="nav-icon">⏳</span>
          参加中のオファー会
        </NuxtLink>
        <NuxtLink to="/mypage/cart" class="nav-item">
          <span class="nav-icon">🛒</span>
          カート
        </NuxtLink>
        <NuxtLink to="/mypage/negotiation" class="nav-item">
          <span class="nav-icon">💬</span>
          交渉
        </NuxtLink>
      </div>

      <div class="nav-section">
        <p class="nav-label">アカウント</p>
        <NuxtLink to="/mypage/corporate" class="nav-item">
          <span class="nav-icon">🏢</span>
          法人情報
        </NuxtLink>
        <NuxtLink to="/mypage/account" class="nav-item">
          <span class="nav-icon">👤</span>
          プロフィール編集
        </NuxtLink>
        <NuxtLink to="/mypage/account/children" class="nav-item">
          <span class="nav-icon">👥</span>
          子アカウント追加
        </NuxtLink>
      </div>

      <div class="nav-section">
        <p class="nav-label">その他</p>
        <NuxtLink to="/mypage/billing" class="nav-item">
          <span class="nav-icon">💰</span>
          請求
        </NuxtLink>
        <NuxtLink to="/mypage/contact" class="nav-item">
          <span class="nav-icon">✉️</span>
          問い合わせ
        </NuxtLink>
        <NuxtLink to="/mypage/withdraw" class="nav-item">
          <span class="nav-icon">🚪</span>
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
  padding: 20px 0;
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
  padding: 12px 20px;
  font-size: 14px;
  color: #475569;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    color: #1e3a5f;
  }

  &.router-link-active,
  &.router-link-exact-active {
    background: #eff6ff;
    color: #3b82f6;
    border-right: 3px solid #3b82f6;
  }

  .nav-icon {
    font-size: 16px;
  }
}
</style>
