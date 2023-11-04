const ErrorMessage = ({ errorDetails }) => {
    const { code, message } = errorDetails;
    return (
        <div className="error-message-container">

            <span className="error-message-code">
                {`${code}:`}
            </span>

            <span
                className="error-message-message">
                {`A(n) ${message} has occured. Please refresh to try again later.`}
            </span>

        </div>
    )
}

export default ErrorMessage