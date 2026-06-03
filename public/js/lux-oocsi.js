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

  let holdActive = false

  let selectedAvatar = (() => {
    const v = sessionStorage.getItem('luxSelectedAvatar')
    if (v === '1') return 1
    if (v === '3') return 3
    return null
  })()

  let liveIntensity = (() => {
    const v = parseFloat(sessionStorage.getItem('luxIntensity') || '0')
    return Number.isFinite(v) ? v : 0
  })()

  function getState() {
    const emotion = sessionStorage.getItem('luxEmotion') || 'joyful'
    return {
      emotion,
      intensity: liveIntensity,
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

  function setHoldActive(active) {
    holdActive = !!active
  }

  function setSelectedAvatar(avatar) {
    if (avatar !== 1 && avatar !== 3) return
    selectedAvatar = avatar
    sessionStorage.setItem('luxSelectedAvatar', String(avatar))
    global.dispatchEvent(new CustomEvent('luxAvatarChange', { detail: { avatar } }))
  }

  function getSelectedAvatar() {
    return selectedAvatar
  }

  function publishEmotion(emotion) {
    if (!EMOTIONS[emotion]) return
    sessionStorage.setItem('luxEmotion', emotion)
    sessionStorage.setItem('luxIntensity', String(Math.round(liveIntensity)))
    notify()
  }

  function updateEmotion(emotion, intensity) {
    if (!EMOTIONS[emotion]) return
    liveIntensity = Math.max(0, Math.min(100, intensity))
    publishEmotion(emotion)
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

  function lockEmotionFromUser(emotionId) {
    if (!EMOTIONS[emotionId]) return
    sessionStorage.setItem('luxEmotionLocked', emotionId)
    updateEmotion(emotionId, getState().intensity)
  }

  function getLockedEmotion() {
    const locked = sessionStorage.getItem('luxEmotionLocked')
    return locked && EMOTIONS[locked] ? locked : null
  }

  function clearEmotionLock() {
    sessionStorage.removeItem('luxEmotionLocked')
  }

  let pressStartTime = null
  let heldIntensity = 1
  const CLIMB_DURATION = 3000 // ms to go from 0 to 100, adjust to taste
  let climbRaf = null
  let climbEmotion = 'joyful'
  let climbGeneration = 0

  function stopSensorClimb() {
    if (climbRaf == null && pressStartTime === null) return
    console.log('stopSensorClimb called')
    climbGeneration++
    pressStartTime = null
    if (climbRaf != null) {
      cancelAnimationFrame(climbRaf)
      climbRaf = null
    }
  }

  function stepSensorClimb() {
    climbRaf = null
    if (pressStartTime === null || holdActive) return

    const generation = climbGeneration
    const elapsed = Date.now() - pressStartTime
    heldIntensity = Math.min(100, Math.max(1, Math.round((elapsed / CLIMB_DURATION) * 100)))
    updateEmotion(climbEmotion, heldIntensity)

    if (heldIntensity < 100 && pressStartTime !== null && generation === climbGeneration) {
      climbRaf = requestAnimationFrame(stepSensorClimb)
    }
  }

  function startSensorClimb(emotion) {
    climbEmotion = emotion
    if (climbRaf != null) return
    climbRaf = requestAnimationFrame(stepSensorClimb)
  }

  function handleOOCSI(data) {
    console.log('incoming data.Number:', data?.Number, 'selectedAvatar:', selectedAvatar)
    console.log('full data:', JSON.stringify(data))
    if (!data) return
    if (data.Number !== undefined && data.Number !== selectedAvatar) return

    if (holdActive) {
      console.log('handleOOCSI blocked, holdActive:', holdActive)
      return
    }

    const raw = data.strenth != null ? data.strenth : data.strength
    console.log('raw sensor value:', raw)
    const hasIntensity = raw != null

    const PRESS_THRESHOLD = 900
    const isPressed = hasIntensity && Number(raw) > PRESS_THRESHOLD

    if (!isPressed) {
      stopSensorClimb()
    }

    const locked = getLockedEmotion()

    let emotion = locked
    if (!emotion) {
      if (data.count !== undefined) {
        emotion = emotionFromCount(data.count)
      }
    }

    if (!emotion && !hasIntensity) return

    const current = getState()
    if (!emotion) emotion = current.emotion

    if (isPressed) {
      if (pressStartTime === null) {
        pressStartTime = Date.now()
      }
      const elapsed = Date.now() - pressStartTime
      heldIntensity = Math.min(100, Math.max(1, Math.round((elapsed / CLIMB_DURATION) * 100)))
      startSensorClimb(emotion)
    }
    // on release, stopSensorClimb already ran above; heldIntensity stays as-is

    const intensity = hasIntensity ? heldIntensity : getState().intensity

    console.log('calling updateEmotion:', emotion, intensity)
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
        if (
          data.Number !== undefined ||
          data.count !== undefined ||
          data.strenth !== undefined ||
          data.strength !== undefined
        ) {
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
    setHoldActive,
    setSelectedAvatar,
    getSelectedAvatar,
    lockEmotionFromUser,
    clearEmotionLock,
    getLockedEmotion,
  }

  initOOCSI()
})(typeof window !== 'undefined' ? window : globalThis)
