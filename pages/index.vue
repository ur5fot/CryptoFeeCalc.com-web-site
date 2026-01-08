<script setup>
const walletAddress = 'TGrzqMjhZH85X8q3EkUfFdXUB3zSW8oDH7'
const qrCodeImage = '/qr-code-walet.jpeg'
const copied = ref(false)
let copyTimer

const title = `Crypto Fee Calculator \u2014 calculate crypto fees | CryptoFeeCalc`
const metaDescription =
  'Calculate real crypto transfer fees with a focused TRON preview. Understand bandwidth costs and net received amounts.'

const leadText =
  'CryptoFeeCalc is a service for estimating real crypto transfer fees. We are building precise'
  + ' on-chain calculators that show the net amount after fees. The first release focuses on TRON,'
  + ' with BTC, ETH, and other networks next.'

useHead({
  title,
  meta: [{ name: 'description', content: metaDescription }],
  htmlAttrs: { lang: 'en' }
})

const apiBase = useRuntimeConfig().public?.apiBase || ''
const isApiConfigured = Boolean(apiBase)

const form = reactive({
  chain: 'tron',
  asset: 'TRX',
  amount: '',
  from: '',
  to: '',
  signatureCount: 2
})

const result = ref(null)
const errorMessage = ref('')
const isLoading = ref(false)

const copyAddress = async () => {
  copied.value = false

  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(walletAddress)
    } else {
      // Fallback for older browsers without the Clipboard API.
      const textarea = document.createElement('textarea')
      textarea.value = walletAddress
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }

    copied.value = true
    clearTimeout(copyTimer)
    copyTimer = window.setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    copied.value = false
  }
}

const estimateFee = async () => {
  errorMessage.value = ''
  result.value = null

  if (!isApiConfigured) {
    errorMessage.value = 'API endpoint is not configured yet. This preview will go live soon.'
    return
  }

  isLoading.value = true

  try {
    const response = await $fetch(`${apiBase}/api/estimate`, {
      method: 'POST',
      body: {
        chain: form.chain,
        asset: form.asset,
        amount: form.amount,
        from: form.from,
        to: form.to,
        signatureCount: form.signatureCount
      }
    })

    result.value = response
  } catch (error) {
    errorMessage.value = 'Unable to calculate the fee right now. Please try again later.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="page">
    <div class="frame">
      <header class="hero">
        <p class="brand">CryptoFeeCalc</p>
        <h1>Crypto Fee Calculator &mdash; coming soon</h1>
        <p class="lead">
          {{ leadText }}
        </p>
        <div class="social">
          <a
            class="x-link"
            href="https://x.com/cryptofeecalc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow updates on X
          </a>
        </div>
      </header>

      <section class="estimator" aria-labelledby="estimator-title">
        <h2 id="estimator-title">Fee estimator preview</h2>
        <p class="support-text">
          Try the upcoming calculator experience. This is a test preview and the estimate may be inaccurate.
        </p>

        <form class="form" @submit.prevent="estimateFee">
          <div class="field-grid">
            <label class="field">
              <span class="field-label">Network</span>
              <select v-model="form.chain" class="field-input">
                <option value="tron">TRON</option>
              </select>
            </label>

            <label class="field">
              <span class="field-label">Asset</span>
              <select v-model="form.asset" class="field-input">
                <option value="TRX">TRX</option>
              </select>
            </label>

            <label class="field">
              <span class="field-label">Amount</span>
              <input v-model.trim="form.amount" class="field-input" required type="number" placeholder="100..." min="0.000000001" />
            </label>

            <label class="field">
              <span class="field-label">Signatures</span>
              <input
                v-model.number="form.signatureCount"
                class="field-input"
                type="number"
                min="1"
                step="1"
              />
            </label>

            <label class="field field-wide">
              <span class="field-label">From address</span>
              <input v-model.trim="form.from" class="field-input" type="text" required  placeholder="T..." />
            </label>

            <label class="field field-wide">
              <span class="field-label">To address</span>
              <input v-model.trim="form.to" class="field-input" type="text" required placeholder="T..." />
            </label>
          </div>

          <button class="submit-button" type="submit" :disabled="isLoading">
            {{ isLoading ? 'Calculating...' : 'Estimate fee' }}
          </button>
        </form>

        <p v-if="errorMessage" class="form-status" role="status">
          {{ errorMessage }}
        </p>

        <div class="result-card">
          <p class="result-title">Estimated fee</p>
          <div v-if="result" class="result-grid">
            <div>
              <span class="result-label">Total fee</span>
              <span class="result-value">{{ result.totalFeeTrx }} TRX</span>
            </div>
            <div>
              <span class="result-label">Bandwidth used</span>
              <span class="result-value">{{ result.bandwidth?.usedBytes }} bytes</span>
            </div>
            <div>
              <span class="result-label">Burned sun</span>
              <span class="result-value">{{ result.bandwidth?.burnSun }} sun</span>
            </div>
          </div>
          <p v-else class="result-placeholder">
            Enter a sample transfer to preview the calculation layout.
          </p>
        </div>
      </section>

      <section class="support" aria-labelledby="support-title">
        <div class="support-wrapper">
          <div class="support-content">
            <h2 id="support-title">Support the project</h2>
            <p class="support-text">
              Support helps accelerate development and launch of the calculator.
            </p>
            <div class="donation">
              <span class="label"><strong>USDT (TRC-20)</strong> donation address:</span>
              <div class="address-row">
                <code class="address">{{ walletAddress }}</code>
                <button class="copy-button" type="button" @click="copyAddress">
                  Copy address
                </button>
              </div>
              <p v-if="copied" class="copy-status" role="status" aria-live="polite">
                Address copied to clipboard.
              </p>
            </div>
          </div>
          <img :src="qrCodeImage" alt="Donation wallet QR code" class="qr-code" />
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&family=IBM+Plex+Sans:wght@400;500&family=Space+Grotesk:wght@500;600&display=swap');

:global(body) {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(72, 160, 255, 0.18), transparent 55%),
    linear-gradient(140deg, #f5f7fb 0%, #f0f5ff 45%, #f9fafc 100%);
  color: #0b1523;
  font-family: 'IBM Plex Sans', 'Space Grotesk', sans-serif;
}

:global(*) {
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 72px 20px;
}

.frame {
  width: min(860px, 100%);
  text-align: center;
  padding: 48px 42px;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 28px;
  box-shadow: 0 32px 80px rgba(15, 30, 60, 0.12);
  border: 1px solid rgba(9, 24, 46, 0.08);
  backdrop-filter: blur(12px);
}

.brand {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.28em;
  font-weight: 600;
  color: #2a4a7b;
  margin: 0 0 20px;
}

.hero h1 {
  font-family: 'Space Grotesk', 'IBM Plex Sans', sans-serif;
  font-size: clamp(28px, 4vw, 40px);
  margin: 0 0 20px;
  line-height: 1.2;
  color: #0a1830;
}

.lead {
  margin: 0 auto 36px;
  max-width: 640px;
  line-height: 1.6;
  font-size: 16px;
  color: #2b3b53;
}

.social {
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
}

.x-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid rgba(9, 24, 46, 0.15);
  background: #ffffff;
  color: #1e2d42;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.x-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 20px rgba(10, 24, 48, 0.12);
  border-color: rgba(30, 79, 211, 0.35);
}

.support {
  padding-top: 30px;
  border-top: 1px solid rgba(9, 24, 46, 0.08);
}

.support h2 {
  font-family: 'Space Grotesk', 'IBM Plex Sans', sans-serif;
  margin: 0 0 14px;
  font-size: 22px;
  color: #0a1830;
}

.support-text {
  margin: 0 auto 24px;
  max-width: 540px;
  color: #31425d;
}

.donation {
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
}

.label {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #41597c;
}

.address-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  align-items: center;
}

.address {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 15px;
  padding: 10px 14px;
  border-radius: 12px;
  background: #f1f5ff;
  border: 1px solid rgba(9, 24, 46, 0.12);
  color: #12233a;
}

.copy-button {
  border: none;
  border-radius: 999px;
  padding: 10px 18px;
  font-weight: 600;
  background: #1e4fd3;
  color: #ffffff;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.copy-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 18px rgba(30, 79, 211, 0.25);
}

.copy-button:active {
  transform: translateY(0);
  box-shadow: none;
}

.copy-status {
  margin: 0;
  color: #1a7f4b;
  font-weight: 500;
}

.estimator {
  margin-top: 36px;
  padding-top: 32px;
  border-top: 1px solid rgba(9, 24, 46, 0.08);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}

.field-wide {
  grid-column: span 2;
}

.field-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #4b5f7a;
}

.field-input {
  border: 1px solid rgba(9, 24, 46, 0.12);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 14px;
  font-family: 'IBM Plex Sans', sans-serif;
  background: #ffffff;
  color: #12233a;
}

.field-input:focus {
  outline: 2px solid rgba(30, 79, 211, 0.25);
  border-color: rgba(30, 79, 211, 0.35);
}

.submit-button {
  align-self: center;
  border: none;
  border-radius: 999px;
  padding: 12px 28px;
  font-weight: 600;
  background: #0f2f8a;
  color: #ffffff;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.submit-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 20px rgba(15, 47, 138, 0.2);
}

.submit-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
  box-shadow: none;
}

.form-status {
  margin: 0;
  color: #7a3d3d;
}

.result-card {
  margin-top: 24px;
  padding: 20px;
  border-radius: 18px;
  background: #f5f7ff;
  border: 1px solid rgba(9, 24, 46, 0.1);
  text-align: left;
}

.result-title {
  margin: 0 0 12px;
  font-weight: 600;
  color: #0a1830;
}

.result-grid {
  display: grid;
  gap: 12px;
}

.result-label {
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #526480;
}

.result-value {
  font-size: 16px;
  font-weight: 600;
  color: #0a1830;
}

.result-placeholder {
  margin: 0;
  color: #4f5f79;
}

@media (max-width: 640px) {
  .frame {
    padding: 36px 22px;
    border-radius: 22px;
  }

  .address-row {
    flex-direction: column;
  }

  .address {
    font-size: 14px;
  }

  .copy-button {
    width: 100%;
    max-width: 240px;
  }

  .field-grid {
    grid-template-columns: 1fr;
  }

  .field-wide {
    grid-column: span 1;
  }

  .submit-button {
    width: 100%;
    max-width: 240px;
  }

  .support-wrapper {
    flex-direction: column;
    align-items: center;
  }

  .qr-code {
    width: 140px;
    height: 140px;
  }
}

.support-wrapper {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
}

.qr-code {
  width: 180px;
  height: 180px;
  border-radius: 16px;
  border: 1px solid rgba(9, 24, 46, 0.12);
  background: #fff;
  flex-shrink: 0;
}

.support-content {
  flex: 1;
  max-width: 600px;
  text-align: center;
}

.support-content h2 {
  margin-top: 0;
}
</style>
