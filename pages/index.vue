<script setup>
const walletAddress = 'TGrzqMjhZH85X8q3EkUfFdXUB3zSW8oDH7'
const copied = ref(false)
let copyTimer

const title = `Crypto Fee Calculator \u2014 calculate crypto fees | CryptoFeeCalc`
const metaDescription =
  'Calculate real crypto transfer fees. ETH, BTC, TRON, USDT. See how much you receive after fees.'

const leadText =
  'CryptoFeeCalc is a service for calculating real crypto transfer fees. Find out how much you actually receive after network and exchange fees. Supports ETH, BTC, TRON, USDT, and more networks.'

useHead({
  title,
  meta: [{ name: 'description', content: metaDescription }],
  htmlAttrs: { lang: 'en' }
})

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
      </header>

      <section class="support" aria-labelledby="support-title">
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
}
</style>
