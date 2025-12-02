<template>
  <div class="login-page">
    <header class="login-header">
      <div class="header-content">
        <h1>ログイン</h1>
        <NuxtLink to="/" class="register-button">新規登録</NuxtLink>
      </div>
    </header>

    <form class="login-form" @submit.prevent="handleLogin">
      <!-- メールアドレス -->
      <div class="form-group">
        <label>メールアドレス</label>
        <input type="email" v-model="form.email" placeholder="メールアドレスを入力">
      </div>

      <!-- パスワード -->
      <div class="form-group">
        <label>パスワード</label>
        <input type="password" v-model="form.password" placeholder="パスワードを入力">
      </div>

      <!-- ログインボタン -->
      <div class="form-actions">
        <button type="submit">ログイン</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  email: '',
  password: ''
})

const handleLogin = () => {
  console.log('ログイン:', form)
  navigateTo('/mypage')
}
</script>

<style lang="scss" scoped>
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.login-header {
  margin-bottom: 32px;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .register-button {
    padding: 8px 16px;
    background: #333;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
}

.login-form {
  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }

  .form-actions {
    margin-top: 32px;

    button {
      width: 100%;
      padding: 16px;
      background: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;

      &:hover {
        background: darken(#3498db, 10%);
      }
    }
  }
}
</style>
