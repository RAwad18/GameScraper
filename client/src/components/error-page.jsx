import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError()
    console.error(error)

    return (
        <div className="error-page">
            <img src="/broken-robot.svg" alt="" />

            <div className="error-status">
                {error.status || <div className="debug-error">
                    Debugging Error
                </div>}
            </div>

            <div className="error-status-text">
                {error.statusText ||
                    <div className="error-message">
                        {error.message}
                    </div>}
            </div>

            <Link to={`/`} className="return-btn">
                <div>Return Home</div>
            </Link>

            {/* <br></br>
                <i>{error.message}</i> */}

        </div>
    )
}

export default ErrorPage