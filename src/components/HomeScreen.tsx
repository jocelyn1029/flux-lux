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

export function HomeScreen() {
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
    </div>
  )
}
