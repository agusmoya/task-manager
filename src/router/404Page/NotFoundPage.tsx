import "./NotFoundPage.css"

export const NotFoundPage = () => {
  return (
    <>

      <section className="not-found">
        <span className="not-found__text">4</span>
        <div className="moon-wrapper">
          <svg
            className="moon"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="80" className="moon__glow" />
            <circle cx="130" cy="80" r="10" className="moon__crater" />
            <circle cx="70" cy="110" r="8" className="moon__crater" />
            <circle cx="100" cy="130" r="6" className="moon__crater" />
            <circle cx="85" cy="65" r="5" className="moon__crater" />
          </svg>
        </div>
        <span className="not-found__text">4</span>
        {/* <div>
          <p>The page you are looking for was not found.</p>
        </div>

        <Link className="not-found__go-home" to='/'>Go Home</Link> */}
      </section>
    </>
  )
}

