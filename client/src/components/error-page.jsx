import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError()
    console.error(error)

    return (
        <>
            <i>{error.statusText}</i>
            <br></br>
            <i>{error.message}</i>
        </>
    )
}

export default ErrorPage