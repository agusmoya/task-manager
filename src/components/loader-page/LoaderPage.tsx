import './LoaderPage.css'

export const LoaderPage = () => {
  const imgLogo = '/images/todo.webp'
  return (
    <>
      <section className="loader__container">
        <span className="loader__icon" />
        <div className="loader__text">
          <img className="loader__img" src={imgLogo} alt="logo-app" />
          <h3>Loading...</h3>
        </div>
      </section>
    </>
  )
}
