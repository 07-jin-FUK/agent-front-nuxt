<template>
  <header class="mypage-header">
    <div class="header-left">
      <button class="menu-toggle" @click="$emit('toggle-sidebar')">
        <span class="menu-icon"></span>
      </button>
      <NuxtLink to="/mypage" class="logo">
        イチヅケ
      </NuxtLink>
    </div>

    <div class="header-right">
      <div class="notifications">
        <NuxtLink to="/mypage/notifications" class="notification-btn">
          <span class="icon">🔔</span>
          <span v-if="notificationCount > 0" class="badge">{{ notificationCount }}</span>
        </NuxtLink>
      </div>

      <div class="user-menu">
        <button class="user-btn" @click="toggleUserMenu">
          <span class="user-name">{{ userName }}</span>
          <span class="arrow">▼</span>
        </button>
        
        <div v-if="isUserMenuOpen" class="dropdown">
          <NuxtLink to="/mypage/account" class="dropdown-item">アカウント設定</NuxtLink>
          <button @click="handleLogout" class="dropdown-item">ログアウト</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineEmits(['toggle-sidebar'])

const userName = ref('山田 太郎')
const notificationCount = ref(3)
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
  height: 60px;
  padding: 0 20px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
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

.logo {
  font-size: 18px;
  font-weight: 700;
  color: #1e3a5f;
  text-decoration: none;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
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
  text-decoration: none;
  position: relative;

  .icon {
    font-size: 20px;
  }

  .badge {
    position: absolute;
    top: 4px;
    right: 4px;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
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
  position: relative;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: none;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;

  .user-name {
    font-size: 14px;
    color: #1e3a5f;
  }

  .arrow {
    font-size: 10px;
    color: #64748b;
  }
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  min-width: 160px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  color: #1e3a5f;
  text-decoration: none;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background: #f8fafc;
  }
}
</style>
