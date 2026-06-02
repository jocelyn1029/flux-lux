/**
 * Shared UI bindings for LuxOOCSI state (dashboard, emotion, intensity, analysis).
 */
;(function (global) {
  const Lux = global.LuxOOCSI
  if (!Lux) return

  const TRANSITION = '0.5s ease'
  const WEEKDAY_INDEX = { 0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5 }

  function scaleFromIntensity(value) {
    return 0.88 + (value / 100) * 0.2
  }

  function bindConnectionStatus(rootEl) {
    if (!rootEl) return
    const dot = rootEl.querySelector('.oocsi-status__dot')
    const text = rootEl.querySelector('.oocsi-status__text')

    function render(connected) {
      rootEl.classList.toggle('oocsi-status--live', connected)
      if (dot) dot.setAttribute('aria-label', connected ? 'Connected' : 'Disconnected')
      if (text) text.textContent = connected ? 'live' : ''
    }

    render(Lux.getState().connected)
    global.addEventListener('luxOOCSIStatus', (e) => render(e.detail.connected))
    global.addEventListener('luxEmotionUpdate', () => render(Lux.getState().connected))
  }

  function bindDashboard() {
    const banner = document.getElementById('todayBanner')
    if (!banner) return

    function swapBanner(nextSrc, nextAlt) {
      if (banner.getAttribute('src') === nextSrc) {
        banner.setAttribute('alt', nextAlt)
        return
      }

      banner.classList.add('is-fading')
      window.setTimeout(() => {
        banner.setAttribute('src', nextSrc)
        banner.setAttribute('alt', nextAlt)
        banner.classList.remove('is-fading')
      }, 180)
    }

    function apply({ config }) {
      swapBanner(config.todayBanner || '/today-joyful.png', `You're feeling ${config.label} today`)
    }

    Lux.onUpdate(apply)
  }

  function bindEmotionScreen() {
    const EMOTION_LIST = ['joyful', 'angry', 'stressful', 'relaxed', 'upset']
    const root = document.documentElement
    const avatarImg = document.getElementById('avatar')
    const glowEl = document.getElementById('glow')
    const pillsEl = document.getElementById('pills')
    if (!avatarImg || !pillsEl) return

    let activeIndex = EMOTION_LIST.indexOf(Lux.getState().emotion)
    if (activeIndex < 0) activeIndex = 0

    function applyFromIndex(index, intensity) {
      const emotion = EMOTION_LIST[index]
      const config = Lux.EMOTIONS[emotion]
      if (!config) return

      root.style.setProperty('--glow', config.color)
      root.style.setProperty('--avatar-scale', String(scaleFromIntensity(intensity)))

      avatarImg.src = config.faceSelect
      avatarImg.alt = config.label

      pillsEl.querySelectorAll('.pill').forEach((btn, i) => {
        const active = i === index
        btn.classList.toggle('pill--active', active)
        btn.setAttribute('aria-selected', active ? 'true' : 'false')
        if (active) {
          btn.style.background = config.color
          btn.style.borderColor = 'transparent'
          btn.style.color = '#0d0d0d'
        } else {
          btn.style.background = 'transparent'
          btn.style.borderColor = ''
          btn.style.color = ''
        }
      })

      const activePill = pillsEl.children[index]
      if (activePill) {
        activePill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      }
    }

    global.LuxEmotionScreen = {
      setEmotion(index) {
        activeIndex = ((index % EMOTION_LIST.length) + EMOTION_LIST.length) % EMOTION_LIST.length
        const id = EMOTION_LIST[activeIndex]
        Lux.updateEmotion(id, Lux.getState().intensity)
        applyFromIndex(activeIndex, Lux.getState().intensity)
      },
      getActiveIndex: () => activeIndex,
    }

    Lux.onUpdate(({ emotion, intensity }) => {
      const idx = EMOTION_LIST.indexOf(emotion)
      if (idx >= 0) activeIndex = idx
      applyFromIndex(activeIndex, intensity)
    })
  }

  function bindIntensityScreen() {
    const EMOTIONS = {
      joyful: { label: 'joyful', color: '#F5C842', light: '#FFE48A' },
      angry: { label: 'angry', color: '#EF5350', light: '#FFAB91' },
      stressful: { label: 'stressful', color: '#E87D3E', light: '#FFCC80' },
      relaxed: { label: 'relaxed', color: '#8BC34A', light: '#DCEDC8' },
      upset: { label: 'upset', color: '#64B5F6', light: '#BBDEFB' },
    }

    const OUTER = 240
    const INNER_MIN = 48
    const INNER_MAX = 212

    const root = document.documentElement
    const subtitleEl = document.getElementById('subtitle')
    const intensityLabelEl = document.getElementById('intensityLabel')
    if (!intensityLabelEl) return

    let emotionId =
      new URLSearchParams(location.search).get('emotion') ||
      Lux.getState().emotion ||
      'joyful'
    let intensity = Lux.getState().intensity

    function innerSizeFor(value) {
      return INNER_MIN + (INNER_MAX - INNER_MIN) * (value / 100)
    }

    function applyIntensity() {
      const emotion = EMOTIONS[emotionId] || EMOTIONS.joyful
      const inner = innerSizeFor(intensity)
      const glowStrength = 0.35 + (intensity / 100) * 0.65

      root.style.setProperty('--emotion', emotion.color)
      root.style.setProperty('--emotion-light', emotion.light)
      root.style.setProperty('--inner-size', `${inner}px`)
      root.style.setProperty('--glow-strength', String(glowStrength))
      if (subtitleEl) {
        subtitleEl.textContent = `Press as hard as you feel ${emotion.label}`
      }
      intensityLabelEl.textContent = `Intensity: ${intensity}`
    }

    global.LuxIntensityScreen = {
      getEmotionId: () => emotionId,
      getIntensity: () => intensity,
      setIntensity(value) {
        intensity = Math.max(0, Math.min(100, value))
        applyIntensity()
      },
      applyIntensity,
    }

    Lux.onUpdate(({ emotion, intensity: nextIntensity }) => {
      if (EMOTIONS[emotion]) emotionId = emotion
      intensity = nextIntensity
      applyIntensity()
    })

    applyIntensity()
  }

  function bindAnalysisScreen() {
    const grid = document.querySelector('.weekly-grid')
    if (!grid) return

    const dayEls = [...grid.querySelectorAll('.weekly-day')]

    Lux.onUpdate(({ config }) => {
      const idx = WEEKDAY_INDEX[new Date().getDay()]
      const day = dayEls[idx]
      if (!day) return
      const img = day.querySelector('img')
      if (img) {
        img.src = config.faceWeekly
        img.alt = config.label
      }
    })
  }

  global.LuxOOCSIUI = {
    bindConnectionStatus,
    bindDashboard,
    bindEmotionScreen,
    bindIntensityScreen,
    bindAnalysisScreen,
  }

  const page = document.body.dataset.luxPage
  if (page === 'dashboard') bindDashboard()
  if (page === 'intensity') bindIntensityScreen()
  if (page === 'analysis') bindAnalysisScreen()
})(window)
