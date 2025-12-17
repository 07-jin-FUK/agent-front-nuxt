<template>
  <header class="mypage-header">
    <div class="header-left">
      <NuxtLink to="/mypage" class="logo">
        イチヅケ
      </NuxtLink>
    </div>

    <div class="header-right">
      <div class="notifications">
        <button class="notification-btn">
          <img src="/images/bell-icon.svg" alt="通知" class="icon-img">
          <span v-if="notificationCount > 0" class="badge">{{ notificationCount }}</span>
        </button>
      </div>

      <div class="user-menu">
        <div class="user-info">
          <img src="/images/user-icon.png" alt="ユーザー" class="user-icon">
          <span class="user-name">{{ userName }}</span>
        </div>
      </div>
      
      <button class="menu-toggle" @click="$emit('toggle-sidebar')">
        <span class="menu-icon"></span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
defineEmits(['toggle-sidebar'])

const userName = ref('田中たろう')
const notificationCount = ref(6)
const isUserMenuOpen = ref(false)

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const handleLogout = () => {
  navigateTo('/login')
}
</script>

<style lang="scss" scoped>
.mypage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 60px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  
  @media (max-width: 480px) {
    padding: 0 7.5%;
    height: 60px;
    width: 100%; // ← 追加
    max-width: 100vw; // ← 追加
    overflow-x: hidden; // ← 追加
    box-sizing: border-box; // ← 追加
  }
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  
    @media (max-width: 480px) {
    flex-shrink: 0; // ← 追加（縮まないようにする）
  }
}

.logo {
  font-size: 18px;
  font-weight: 700;
  color: #1e3a5f;
  text-decoration: none;
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
  
  @media (max-width: 480px) {
    gap: 8px;
    flex-shrink: 0; // ← 追加（縮まないようにする）
  }
}

.notifications {
  position: relative;
}

.notification-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;

  .icon-img {
    margin-top: 3px;
    width: 24px;
    height: 24px;
  }

  .badge {
    position: absolute;
    top: 5px;
    right: 3px;
    min-width: 18px;
    height: 18px;
    background: #e94560;
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.user-menu {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;

  .user-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .user-name {
    color: var(--black-100, #1C1C1C);
    font-family: "Noto Sans JP";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    
    @media (max-width: 480px) {
      display: none; // スマホ時は名前を非表示
    }
  }
}

.menu-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  
  @media (max-width: 835px) {
    display: flex;
  }
}

.menu-icon {
  display: block;
  width: 20px;
  height: 2px;
  background: #1e3a5f;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: #1e3a5f;
  }

  &::before {
    top: -6px;
  }

  &::after {
    bottom: -6px;
  }
}
</style>
