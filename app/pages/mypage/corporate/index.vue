<template>
  <div class="corporate-page">
    <h1>法人情報</h1>

    <div class="corporate-header">
      <p class="last-updated">最終更新: {{ lastUpdated }}</p>
      <button 
        v-if="!isEditing" 
        class="btn btn-primary" 
        @click="startEdit"
      >
        編集する
      </button>
    </div>

    <form class="corporate-form" @submit.prevent="handleSave">
      <!-- 基本情報 -->
      <section class="form-section">
        <h2>基本情報</h2>
        
        <div class="form-group">
          <label>企業名 <span class="required">必須</span></label>
          <input 
            type="text" 
            v-model="form.companyName" 
            :disabled="!isEditing"
            placeholder="株式会社〇〇"
          >
          <p class="form-hint">国税庁登録の正式名称をご入力ください</p>
        </div>

        <div class="form-group">
          <label>法人番号</label>
          <input 
            type="text" 
            v-model="form.corporateNumber" 
            :disabled="!isEditing"
            placeholder="1234567890123"
          >
          <p class="form-hint">13桁の法人番号</p>
        </div>

        <div class="form-group">
          <label>本社所在地 <span class="required">必須</span></label>
          <div class="address-inputs">
            <div class="input-row">
              <input 
                type="text" 
                v-model="form.postalCode" 
                :disabled="!isEditing"
                placeholder="000-0000"
                class="postal-code"
              >
              <button 
                type="button" 
                class="btn btn-secondary btn-small"
                :disabled="!isEditing"
                @click="searchAddress"
              >
                住所検索
              </button>
            </div>
            <input 
              type="text" 
              v-model="form.prefecture" 
              :disabled="!isEditing"
              placeholder="都道府県"
            >
            <input 
              type="text" 
              v-model="form.city" 
              :disabled="!isEditing"
              placeholder="市区町村"
            >
            <input 
              type="text" 
              v-model="form.address" 
              :disabled="!isEditing"
              placeholder="番地・建物名"
            >
          </div>
        </div>

        <div class="form-group">
          <label>従業員数 <span class="required">必須</span></label>
          <div class="input-with-unit">
            <input 
              type="number" 
              v-model="form.employeeCount" 
              :disabled="!isEditing"
              placeholder="100"
            >
            <span class="unit">人</span>
          </div>
          <p class="form-hint">パート・アルバイトは含める／業務委託は含めない</p>
        </div>
      </section>

      <!-- 業種・事業内容 -->
      <section class="form-section">
        <h2>業種・事業内容</h2>

        <div class="form-group">
          <label>業種 <span class="required">必須</span></label>
          <select v-model="form.industry" :disabled="!isEditing">
            <option value="">選択してください</option>
            <option value="it">IT・通信</option>
            <option value="finance">金融・保険</option>
            <option value="manufacturing">製造業</option>
            <option value="retail">小売・流通</option>
            <option value="service">サービス業</option>
            <option value="construction">建設・不動産</option>
            <option value="medical">医療・福祉</option>
            <option value="education">教育</option>
            <option value="other">その他</option>
          </select>
        </div>

        <div class="form-group">
          <label>事業内容</label>
          <textarea 
            v-model="form.businessDescription" 
            :disabled="!isEditing"
            rows="4"
            placeholder="主な事業内容をご記入ください"
          ></textarea>
        </div>

        <div class="form-group">
          <label>会社URL</label>
          <input 
            type="url" 
            v-model="form.websiteUrl" 
            :disabled="!isEditing"
            placeholder="https://example.com"
          >
        </div>
      </section>

      <!-- 採用情報 -->
      <section class="form-section">
        <h2>採用情報</h2>

        <div class="form-group">
          <label>求める人材</label>
          <textarea 
            v-model="form.desiredTalent" 
            :disabled="!isEditing"
            rows="4"
            placeholder="求める人材像をご記入ください"
          ></textarea>
        </div>

        <div class="form-group">
          <label>対応勤務地</label>
          <div class="checkbox-group">
            <label v-for="pref in prefectures" :key="pref" class="checkbox-item">
              <input 
                type="checkbox" 
                :value="pref" 
                v-model="form.workLocations"
                :disabled="!isEditing"
              >
              <span>{{ pref }}</span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>対応職種</label>
          <div class="checkbox-group">
            <label v-for="job in jobTypes" :key="job" class="checkbox-item">
              <input 
                type="checkbox" 
                :value="job" 
                v-model="form.jobCategories"
                :disabled="!isEditing"
              >
              <span>{{ job }}</span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>対応ポジション</label>
          <div class="checkbox-group">
            <label v-for="pos in positions" :key="pos" class="checkbox-item">
              <input 
                type="checkbox" 
                :value="pos" 
                v-model="form.targetPositions"
                :disabled="!isEditing"
              >
              <span>{{ pos }}</span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>対応年齢範囲</label>
          <div class="range-inputs">
            <input 
              type="number" 
              v-model="form.ageRangeMin" 
              :disabled="!isEditing"
              placeholder="20"
            >
            <span>〜</span>
            <input 
              type="number" 
              v-model="form.ageRangeMax" 
              :disabled="!isEditing"
              placeholder="50"
            >
            <span>歳</span>
          </div>
        </div>

        <div class="form-group">
          <label>対応言語 / 外国人対応可否</label>
          <div class="checkbox-group">
            <label class="checkbox-item">
              <input 
                type="checkbox" 
                v-model="form.acceptForeigner"
                :disabled="!isEditing"
              >
              <span>外国人対応可</span>
            </label>
          </div>
          <div v-if="form.acceptForeigner" class="sub-options">
            <label v-for="lang in languages" :key="lang" class="checkbox-item">
              <input 
                type="checkbox" 
                :value="lang" 
                v-model="form.supportedLanguages"
                :disabled="!isEditing"
              >
              <span>{{ lang }}</span>
            </label>
          </div>
        </div>
      </section>

      <!-- 自己PR -->
      <section class="form-section">
        <h2>会社PR</h2>

        <div class="form-group">
          <label>会社の魅力・アピールポイント</label>
          <textarea 
            v-model="form.companyPr" 
            :disabled="!isEditing"
            rows="6"
            placeholder="会社の魅力や働く環境についてご記入ください"
          ></textarea>
        </div>
      </section>

      <!-- 編集時のアクション -->
      <div v-if="isEditing" class="form-actions">
        <button type="button" class="btn btn-secondary" @click="cancelEdit">キャンセル</button>
        <button type="submit" class="btn btn-primary">保存する</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mypage'
})

const isEditing = ref(false)
const lastUpdated = ref('2024-01-15 14:30')

const prefectures = ['東京都', '神奈川県', '千葉県', '埼玉県', '大阪府', '愛知県', '福岡県', 'その他']
const jobTypes = ['営業', 'エンジニア', 'マーケティング', '管理職', '事務', 'デザイナー', 'その他']
const positions = ['新卒', '中途', '管理職等']
const languages = ['英語', '中国語', '韓国語', 'ベトナム語', 'その他']

const form = reactive({
  companyName: '株式会社サンプル',
  corporateNumber: '1234567890123',
  postalCode: '100-0001',
  prefecture: '東京都',
  city: '千代田区',
  address: '丸の内1-1-1 サンプルビル5F',
  employeeCount: 150,
  industry: 'it',
  businessDescription: 'Webサービスの企画・開発・運営を行っています。',
  websiteUrl: 'https://example.com',
  desiredTalent: '主体的に行動できる方、チームワークを大切にできる方を求めています。',
  workLocations: ['東京都', '神奈川県'],
  jobCategories: ['営業', 'エンジニア'],
  targetPositions: ['中途'],
  ageRangeMin: 25,
  ageRangeMax: 45,
  acceptForeigner: true,
  supportedLanguages: ['英語'],
  companyPr: '当社は創業10年のIT企業です。リモートワーク可、フレックス制度あり。'
})

const originalForm = ref({})

const startEdit = () => {
  originalForm.value = JSON.parse(JSON.stringify(form))
  isEditing.value = true
}

const cancelEdit = () => {
  Object.assign(form, originalForm.value)
  isEditing.value = false
}

const handleSave = () => {
  console.log('保存:', form)
  lastUpdated.value = new Date().toLocaleString('ja-JP')
  isEditing.value = false
  alert('法人情報を保存しました')
}

const searchAddress = () => {
  console.log('住所検索:', form.postalCode)
}
</script>

<style lang="scss" scoped>
.corporate-page {
  max-width: 800px;

  h1 {
    margin-bottom: 24px;
    font-size: 24px;
    color: #1e3a5f;
  }
}

.corporate-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .last-updated {
    font-size: 13px;
    color: #94a3b8;
  }
}

.corporate-form {
  .form-section {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 24px;

    h2 {
      font-size: 16px;
      color: #1e3a5f;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid #e2e8f0;
    }
  }

  .form-group {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #1e3a5f;
      margin-bottom: 8px;

      .required {
        color: #dc2626;
        font-size: 12px;
        margin-left: 4px;
      }
    }

    input, select, textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: 14px;
      background: #fff;

      &:focus {
        outline: none;
        border-color: #3b82f6;
      }

      &:disabled {
        background: #f8fafc;
        color: #1e3a5f;
        cursor: default;
      }
    }

    textarea {
      resize: vertical;
    }

    .form-hint {
      font-size: 12px;
      color: #94a3b8;
      margin-top: 6px;
    }
  }
}

.address-inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .input-row {
    display: flex;
    gap: 10px;

    .postal-code {
      width: 140px;
    }
  }
}

.input-with-unit {
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    width: 150px;
  }

  .unit {
    font-size: 14px;
    color: #64748b;
  }
}

.range-inputs {
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    width: 100px;
  }

  span {
    font-size: 14px;
    color: #64748b;
  }
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  input {
    width: 18px;
    height: 18px;

    &:disabled {
      cursor: default;
    }
  }

  span {
    font-size: 14px;
    color: #475569;
  }
}

.sub-options {
  margin-top: 12px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 6px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
}

.btn {
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.btn-primary {
  background: #3b82f6;
  color: #fff;

  &:hover:not(:disabled) {
    background: #2563eb;
  }
}

.btn-secondary {
  background: #fff;
  color: #475569;
  border: 1px solid #e2e8f0;

  &:hover:not(:disabled) {
    background: #f8fafc;
  }
}

.btn-small {
  padding: 8px 16px;
  font-size: 13px;
}
</style>
