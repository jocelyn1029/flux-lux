/**
 * Lux Flux — OOCSI WebSocket (plain-text protocol)
 */
;(function (global) {
  const EMOTION_MAP = {
    1: 'joyful',
    2: 'angry',
    3: 'stressful',
    4: 'relaxed',
    5: 'upset',
  }

  const EMOTIONS = {
    joyful: {
      id: 'joyful',
      label: 'Joyful',
      labelLower: 'joyful',
      color: '#F5C842',
      light: '#FFE48A',
      faceWeekly: '/emotions/Group_48096381.png',
      faceSelect: '/emotions/Group_48096386.png',
      todayBanner: '/today-joyful.png',
      todayTextColor: '#0d0d0d',
    },
    angry: {
      id: 'angry',
      label: 'Angry',
      labelLower: 'angry',
      color: '#EF5350',
      light: '#FFAB91',
      faceWeekly: '/emotions/Group_48096382.png',
      faceSelect: '/emotions/Group_48096387.png',
      todayBanner: '/today-angry.png',
      todayTextColor: '#ffffff',
    },
    stressful: {
      id: 'stressful',
      label: 'Stressful',
      labelLower: 'stressful',
      color: '#E87D3E',
      light: '#FFCC80',
      faceWeekly: '/emotions/Group_48096384.png',
      faceSelect: '/emotions/Group_48096388.png',
      todayBanner: '/today-stressful.png',
      todayTextColor: '#0d0d0d',
    },
    relaxed: {
      id: 'relaxed',
      label: 'Relax',
      labelLower: 'relaxed',
      color: '#8BC34A',
      light: '#DCEDC8',
      faceWeekly: '/emotions/Group_48096385.png',
      faceSelect: '/emotions/Group_48096389.png',
      todayBanner: '/today-relaxed.png',
      todayTextColor: '#0d0d0d',
    },
    upset: {
      id: 'upset',
      label: 'Upset',
      labelLower: 'upset',
      color: '#64B5F6',
      light: '#BBDEFB',
      faceWeekly: '/emotions/Group_48096383.png',
      faceSelect: '/emotions/Group_48096390.png',
      todayBanner: '/today-upset.png',
      todayTextColor: '#0d0d0d',
    },
  }

  const listeners = new Set()
  let ws = null
  let connected = false
  let reconnectTimer = null

  function getState() {
    const emotion = sessionStorage.getItem('luxEmotion') || 'joyful'
    const intensity = parseInt(sessionStorage.getItem('luxIntensity') || '0', 10)
    return {
      emotion,
      intensity: Number.isFinite(intensity) ? intensity : 0,
      config: EMOTIONS[emotion] || EMOTIONS.joyful,
      connected,
    }
  }

  function notify() {
    const state = getState()
    const detail = { ...state, config: state.config }
    listeners.forEach((fn) => {
      try {
        fn(detail)
      } catch (err) {
        console.error('[LuxOOCSI] listener error', err)
      }
    })
    global.dispatchEvent(new CustomEvent('luxEmotionUpdate', { detail }))
  }

  function setConnected(value) {
    if (connected === value) return
    connected = value
    notify()
    global.dispatchEvent(
      new CustomEvent('luxOOCSIStatus', { detail: { connected } })
    )
  }

  function updateEmotion(emotion, intensity) {
    if (!EMOTIONS[emotion]) return
    const clamped = Math.max(0, Math.min(100, Math.round(intensity)))
    sessionStorage.setItem('luxEmotion', emotion)
    sessionStorage.setItem('luxIntensity', String(clamped))
    notify()
  }

  /** Map |count| to emotion (blue→upset … red→angry). */
  function emotionFromCount(count) {
    const absCount = Math.abs(Number(count) || 0)
    if (absCount >= 16) return 'upset' // blue
    if (absCount >= 12) return 'relaxed' // green
    if (absCount >= 8) return 'joyful' // yellow
    if (absCount >= 4) return 'stressful' // orange
    return 'angry' // red
  }

  function handleOOCSI(data) {
    if (!data || data.count === undefined) return
    const emotion = emotionFromCount(data.count)
    const raw = data.strenth != null ? data.strenth : data.strength
    const intensity = raw != null ? Math.round((Number(raw) / 1023) * 100) : getState().intensity
    updateEmotion(emotion, intensity)
  }

  function initOOCSI() {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
      reconnectTimer = null
    }

    if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
      return
    }

    const clientId = 'LuxFlux_' + Math.floor(Math.random() * 9000 + 1000)
    ws = new WebSocket('wss://oocsi.id.tue.nl/ws')

    ws.onopen = () => {
      setConnected(true)
      ws.send(clientId)
      setTimeout(() => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send('subscribe processing-dinner')
        }
      }, 300)
    }

    ws.onmessage = (event) => {
      if (event.data === 'ping') {
        if (ws && ws.readyState === WebSocket.OPEN) ws.send('.')
        return
      }

      try {
        const msg = JSON.parse(event.data)
        const data = msg.data || msg
        if (data.count !== undefined) {
          handleOOCSI(data)
        }
      } catch (e) {
        /* non-JSON frames ignored */
      }
    }

    ws.onclose = () => {
      setConnected(false)
      ws = null
      reconnectTimer = setTimeout(initOOCSI, 3000)
    }

    ws.onerror = () => {
      setConnected(false)
    }
  }

  function onUpdate(fn) {
    listeners.add(fn)
    fn(getState())
    return () => listeners.delete(fn)
  }

  global.LuxOOCSI = {
    EMOTIONS,
    EMOTION_MAP,
    emotionFromCount,
    init: initOOCSI,
    getState,
    onUpdate,
    updateEmotion,
    handleOOCSI,
  }

  initOOCSI()
})(typeof window !== 'undefined' ? window : globalThis)
