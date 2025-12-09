<template>
  <div class="mypage-layout">
    <MypageHeader @toggle-sidebar="toggleSidebar" />
    <MypageSidebar :is-open="isSidebarOpen" />
    
    <div class="sidebar-overlay" :class="{ 'is-visible': isSidebarOpen }" @click="closeSidebar"></div>

    <main class="mypage-main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}
</script>

<style lang="scss" scoped>
.mypage-layout {
  min-height: 100vh;
  background: #f8fafc;
}

.mypage-main {
  padding: 110px 35px 40px;

  @media (min-width: 1024px) {
    margin-left: 250px;
  padding: 110px 35px 40px;
  }
}

.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 80;

  &.is-visible {
    opacity: 1;
    visibility: visible;
  }

  @media (min-width: 1024px) {
    display: none;
  }
}
</style>
