import Header from "../components/Header"
import '../pages/NotFoundPage.css'

function NotFoundPage() {
  return (
    <>
      <link rel="icon" type="image" href="/not-found-favicon.png" />

      <title>404 Page Not Found</title>

      <Header />

      <div className="not-found-message">
        Page not found
      </div>
    </>
  );
}

export default NotFoundPage;