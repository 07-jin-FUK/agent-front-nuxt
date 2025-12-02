<template>
  <div class="notifications-page">
    <h1>通知</h1>

    <div class="notification-tabs">
      <button 
        :class="['tab', { active: activeTab === 'all' }]" 
        @click="activeTab = 'all'"
      >
        すべて
      </button>
      <button 
        :class="['tab', { active: activeTab === 'matching' }]" 
        @click="activeTab = 'matching'"
      >
        マッチング
      </button>
      <button 
        :class="['tab', { active: activeTab === 'bid' }]" 
        @click="activeTab = 'bid'"
      >
        オファー
      </button>
      <button 
        :class="['tab', { active: activeTab === 'system' }]" 
        @click="activeTab = 'system'"
      >
        システム
      </button>
    </div>

    <div class="notification-actions">
      <button class="mark-all-read" @click="markAllAsRead">すべて既読にする</button>
    </div>

    <div class="notification-list">
      <div 
        v-for="notification in filteredNotifications" 
        :key="notification.id" 
        :class="['notification-item', { unread: !notification.isRead }]"
        @click="handleNotificationClick(notification)"
      >
        <div class="notification-icon">
          <span>{{ getIcon(notification.type) }}</span>
        </div>
        
        <div class="notification-content">
          <p class="notification-title">{{ notification.title }}</p>
          <p class="notification-message">{{ notification.message }}</p>
          <span class="notification-time">{{ notification.time }}</span>
        </div>

        <div class="notification-status">
          <span v-if="!notification.isRead" class="unread-dot"></span>
        </div>
      </div>

      <div v-if="filteredNotifications.length === 0" class="empty-state">
        <p>通知はありません</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mypage'
})

const activeTab = ref('all')

const notifications = ref([
  {
    id: 1,
    type: 'matching',
    title: '新しいマッチング候補',
    message: 'マッチング率95%の候補者が見つかりました',
    time: '5分前',
    isRead: false
  },
  {
    id: 2,
    type: 'bid',
    title: 'オファーが受理されました',
    message: '候補者ID: A001へのオファーが受理されました',
    time: '1時間前',
    isRead: false
  },
  {
    id: 3,
    type: 'matching',
    title: '新しいマッチング候補',
    message: 'マッチング率87%の候補者が見つかりました',
    time: '3時間前',
    isRead: true
  },
  {
    id: 4,
    type: 'system',
    title: 'プロフィールを更新してください',
    message: '法人情報の更新をお願いします',
    time: '1日前',
    isRead: true
  },
  {
    id: 5,
    type: 'bid',
    title: '情報開示の権利を獲得しました',
    message: '候補者ID: A003の情報が開示されました',
    time: '2日前',
    isRead: true
  }
])

const filteredNotifications = computed(() => {
  if (activeTab.value === 'all') {
    return notifications.value
  }
  return notifications.value.filter(n => n.type === activeTab.value)
})

const getIcon = (type: string) => {
  const icons: Record<string, string> = {
    matching: '🤝',
    bid: '📝',
    system: '⚙️'
  }
  return icons[type] || '📣'
}

const handleNotificationClick = (notification: any) => {
  notification.isRead = true
  console.log('通知クリック:', notification.id)
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.isRead = true)
}
</script>

<style lang="scss" scoped>
.notifications-page {
  h1 {
    margin-bottom: 24px;
    font-size: 24px;
    color: #1e3a5f;
  }
}

.notification-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;

  .tab {
    padding: 8px 16px;
    font-size: 14px;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #f8fafc;
    }

    &.active {
      background: #3b82f6;
      color: #fff;
      border-color: #3b82f6;
    }
  }
}

.notification-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;

  .mark-all-read {
    padding: 8px 16px;
    font-size: 13px;
    color: #3b82f6;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

.notification-list {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  transition: background 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f8fafc;
  }

  &.unread {
    background: #eff6ff;

    &:hover {
      background: #dbeafe;
    }
  }
}

.notification-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  border-radius: 50%;
  font-size: 18px;
}

.notification-content {
  flex: 1;

  .notification-title {
    font-size: 14px;
    font-weight: 600;
    color: #1e3a5f;
    margin-bottom: 4px;
  }

  .notification-message {
    font-size: 13px;
    color: #64748b;
    margin-bottom: 8px;
  }

  .notification-time {
    font-size: 12px;
    color: #94a3b8;
  }
}

.notification-status {
  .unread-dot {
    display: block;
    width: 8px;
    height: 8px;
    background: #3b82f6;
    border-radius: 50%;
  }
}

.empty-state {
  padding: 48px;
  text-align: center;
  color: #94a3b8;
}
</style>
