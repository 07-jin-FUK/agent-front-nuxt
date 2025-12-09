<template>
  <div class="register-page">
<header class="register-header">
  <div class="header-content">
    <h1>新規会員登録</h1>
    <NuxtLink to="/login" class="login-button">ログイン</NuxtLink>
  </div>
</header>

    <section class="register-intro">
      <p>導入企業数</p>
      <p>できることの詳細</p>
      <p>簡単なQ&A</p>
    </section>

    <form class="register-form" @submit.prevent="handleSubmit">
      <!-- 企業名 -->
      <div class="form-group">
        <label>企業名 <span class="required">必須</span></label>
        <input type="text" v-model="form.companyName" placeholder="国税庁が基準">
      </div>

      <!-- 本社所在地 -->
      <div class="form-group">
        <label>本社所在地 <span class="required">必須</span></label>
        <input type="text" v-model="form.address" placeholder="国税庁に登記されている所在地が自動候補で出てくる">
      </div>

      <!-- 従業員数 -->
      <div class="form-group">
        <label>従業員数 <span class="required">必須</span></label>
        <input type="number" v-model="form.employeeCount" placeholder="人（パート・アルバイトは含める／業務委託は含めない）">
      </div>

      <!-- ご担当者名 -->
      <div class="form-group">
        <label>ご担当者名 <span class="required">必須</span></label>
        <div class="name-inputs">
          <input type="text" v-model="form.lastName" placeholder="姓">
          <input type="text" v-model="form.firstName" placeholder="名">
        </div>
      </div>

      <!-- ご担当者名（カナ） -->
      <div class="form-group">
        <label>ご担当者名（カナ） <span class="required">必須</span></label>
        <div class="name-inputs">
          <input type="text" v-model="form.lastNameKana" placeholder="セイ">
          <input type="text" v-model="form.firstNameKana" placeholder="メイ">
        </div>
      </div>

      <!-- 役職 -->
      <div class="form-group">
        <label>役職 <span class="required">必須</span></label>
        <select v-model="form.position">
          <option value="">選択してください</option>
          <option value="none">役職なし</option>
          <option value="leader">係長／リーダークラス</option>
          <option value="manager">課長／マネージャークラス</option>
          <option value="general_manager">部長／ゼネラルマネージャークラス</option>
          <option value="executive">役員クラス</option>
          <option value="ceo">代表クラス</option>
        </select>
      </div>

      <!-- 電話番号 -->
      <div class="form-group">
        <label>電話番号 <span class="required">必須</span></label>
        <input type="tel" v-model="form.phone" placeholder="ハイフンなしで入力（例：01200000000）">
      </div>

      <!-- メールアドレス -->
      <div class="form-group">
        <label>メールアドレス <span class="required">必須</span></label>
        <input type="email" v-model="form.email" placeholder="ログイン時のIDになる">
      </div>

      <!-- イチヅケを知った理由 -->
      <div class="form-group">
        <label>イチヅケを知った理由 <span class="required">必須</span></label>
        <select v-model="form.howFound">
          <option value="">選択してください</option>
          <option value="tv">テレビCMを見た</option>
          <option value="search">インターネットの検索に出てきた</option>
          <option value="flyer">チラシ、ポスティングを見た</option>
          <option value="taxi">タクシー広告を見た</option>
          <option value="news">イチヅケが紹介されている新聞記事・テレビを見た</option>
          <option value="web_article">イチヅケが紹介されているネットの記事を見た</option>
          <option value="referral">知人からの紹介、クチコミを聞いた</option>
          <option value="financial">金融機関からの紹介を受けた</option>
          <option value="sales_call">営業から電話が来た</option>
          <option value="agency">代理店からの紹介を受けた</option>
          <option value="other">その他</option>
        </select>
      </div>

      <!-- キャンペーンコード -->
      <div class="form-group">
        <label>キャンペーンコード <span class="optional">任意</span></label>
        <input type="text" v-model="form.campaignCode" placeholder="4桁の数字をご記入ください">
      </div>

      <!-- 担当者コード -->
      <div class="form-group">
        <label>担当者コード <span class="optional">任意</span></label>
        <input type="text" v-model="form.staffCode" placeholder="具体的に何桁とかの記載はなし">
      </div>

      <!-- 利用規約同意 -->
      <div class="form-group checkbox-group">
        <label>
          <input type="checkbox" v-model="form.agreeTerms">
          サービス利用規約／個人情報の取り扱いについて同意する
        </label>
      </div>

      <!-- 送信ボタン -->
      <div class="form-actions">
        <button type="submit" :disabled="!form.agreeTerms">入力情報を確認する</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  companyName: '',
  address: '',
  employeeCount: null,
  lastName: '',
  firstName: '',
  lastNameKana: '',
  firstNameKana: '',
  position: '',
  phone: '',
  email: '',
  howFound: '',
  campaignCode: '',
  staffCode: '',
  agreeTerms: false
})

const handleSubmit = () => {
  console.log('送信データ:', form)
  // 確認画面への遷移などを後で実装
}
</script>

<style lang="scss" scoped>
.register-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.register-header {
  margin-bottom: 24px;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .login-button {
    padding: 8px 16px;
    background: #333;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
}

.register-intro {
  margin-bottom: 32px;
  padding: 16px;
  background: #f5f5f5;
}

.register-form {
  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    }

    input, select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .name-inputs {
      display: flex;
      gap: 10px;

      input {
        flex: 1;
      }
    }
  }

  .checkbox-group {
    label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: normal;
    }

    input[type="checkbox"] {
      width: auto;
    }
  }

  .required {
    color: red;
    font-size: 12px;
  }

  .optional {
    color: #666;
    font-size: 12px;
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

      &:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
    }
  }
}
</style>
