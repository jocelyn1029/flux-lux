import { useState } from 'react'
import './HomeScreen.css'

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function readStoredAvatar(): number | null {
  const v = sessionStorage.getItem('luxSelectedAvatar')
  if (v === '1') return 1
  if (v === '3') return 3
  return null
}

export function HomeScreen() {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(readStoredAvatar)
  const showAvatarModal = selectedAvatar == null

  function chooseAvatar(avatar: 1 | 3) {
    sessionStorage.setItem('luxSelectedAvatar', String(avatar))
    setSelectedAvatar(avatar)
    window.dispatchEvent(new CustomEvent('luxAvatarChange', { detail: { avatar } }))
  }

  return (
    <div className="home-screen">
      <div className="home-screen__top">
        <h1 className="home-screen__title">
          <span>Wanna Share</span>
          <span>emotions with</span>
          <span>your family?</span>
        </h1>

        <button
          type="button"
          className="home-screen__cta"
          onClick={() => {
            window.location.href = '/lux-dashboard.html'
          }}
        >
          <span className="home-screen__cta-label">Let us help!</span>
          <span className="home-screen__cta-icon" aria-hidden>
            <ArrowIcon />
          </span>
        </button>
      </div>

      <img
        className="home-screen__characters"
        src="/characters-group.png"
        alt=""
        width={786}
        height={852}
        draggable={false}
      />

      {showAvatarModal ? (
        <div className="avatar-modal" role="dialog" aria-modal="true" aria-labelledby="coverAvatarTitle">
          <div className="avatar-modal__card">
            <h2 id="coverAvatarTitle" className="avatar-modal__title">
              Which avatar are you?
            </h2>
            <div className="avatar-modal__actions">
              <button type="button" className="avatar-modal__btn" onClick={() => chooseAvatar(1)}>
                Avatar 1
              </button>
              <button type="button" className="avatar-modal__btn" onClick={() => chooseAvatar(3)}>
                Avatar 3
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
