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
const route = useRoute()

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}


// ルート変更時にサイドバーを閉じる
watch(() => route.path, () => {
  closeSidebar()
})


</script>

<style lang="scss">
// scopedを外してグローバルに適用
@media (max-width: 480px) {
  html, body {
    overflow-x: hidden;
    width: 100%;
    max-width: 100vw; // ← 追加
    position: relative;
  }
}
</style>

<style lang="scss" scoped>
.mypage-layout {
  min-height: 100vh;
  background: #f8fafc;
  
  @media (max-width: 480px) {
    overflow-x: hidden; // ← 追加
    width: 100%; // ← 追加
    max-width: 100vw; // ← 追加
  }
}

.mypage-main {
  padding: 110px 35px 40px;

  @media (min-width: 836px) {
    margin-left: 250px;
    padding: 110px 35px 40px;
  }
  
  @media (max-width: 480px) {
    padding: 80px 7.5% 40px;
    overflow-x: hidden; // ← 追加
    width: 100%; // ← 追加
    max-width: 100vw; // ← 追加
    box-sizing: border-box; // ← 追加
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

  @media (min-width: 836px) {
    display: none;
  }
}
</style>
