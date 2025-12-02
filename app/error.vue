<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-code">
        <span class="digit">4</span>
        <span class="digit zero">
          <svg viewBox="0 0 100 100" class="compass">
            <circle cx="50" cy="50" r="45" class="compass-outer" />
            <circle cx="50" cy="50" r="8" class="compass-center" />
            <line x1="50" y1="50" x2="50" y2="15" class="compass-needle" />
          </svg>
        </span>
        <span class="digit">4</span>
      </div>

      <h1 class="error-title">お探しのページが見つかりません</h1>
      
      <p class="error-message">
        ページが移動または削除された可能性があります。<br />
        URLをご確認いただくか、トップページからお探しください。
      </p>

      <div class="action-buttons">
        <NuxtLink to="/" class="btn btn-primary">
          トップページへ
        </NuxtLink>
        <button @click="goBack" class="btn btn-secondary">
          前のページへ戻る
        </button>
      </div>

      <div class="help-section">
        <p class="help-text">お困りの場合は</p>
        <a href="mailto:support@example.com" class="help-link">サポートへお問い合わせ</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const goBack = () => {
  const router = useRouter()
  router.back()
}
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 20px;
}

.error-container {
  text-align: center;
  max-width: 560px;
}

.error-code {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-bottom: 32px;
}

.digit {
  font-size: 100px;
  font-weight: 700;
  color: #1e3a5f;
  line-height: 1;

  @media (min-width: 768px) {
    font-size: 140px;
  }
}

.zero {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;

  @media (min-width: 768px) {
    width: 140px;
    height: 140px;
  }
}

.compass {
  width: 100%;
  height: 100%;
}

.compass-outer {
  fill: none;
  stroke: #1e3a5f;
  stroke-width: 6;
}

.compass-center {
  fill: #3b82f6;
}

.compass-needle {
  stroke: #3b82f6;
  stroke-width: 4;
  stroke-linecap: round;
  transform-origin: 50px 50px;
  animation: spin 4s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-title {
  font-size: 22px;
  font-weight: 600;
  color: #1e3a5f;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    font-size: 28px;
  }
}

.error-message {
  font-size: 14px;
  color: #64748b;
  line-height: 1.8;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 48px;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: center;
  }
}

.btn {
  padding: 14px 32px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  border: none;

  @media (min-width: 480px) {
    min-width: 180px;
  }
}

.btn-primary {
  background: #3b82f6;
  color: #fff;

  &:hover {
    background: #2563eb;
  }
}

.btn-secondary {
  background: #fff;
  color: #1e3a5f;
  border: 1px solid #cbd5e1;

  &:hover {
    background: #f1f5f9;
  }
}

.help-section {
  padding-top: 32px;
  border-top: 1px solid #e2e8f0;
}

.help-text {
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 8px;
}

.help-link {
  font-size: 14px;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}
</style>
