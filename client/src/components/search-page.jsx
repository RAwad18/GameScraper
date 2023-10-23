import { Form, redirect } from "react-router-dom"

export async function action({ request, params }) {
    const formData = await request.formData()
    const { query } = Object.fromEntries(formData)
    return redirect(`/search?q=${query}`)
}

const SearchPage = () => {
    return (
        <>
            <header>
                WELCOME TO THE HOME PAGE
            </header>
            <main>
                <Form method="post">
                    <input type="text" name="query" />
                    <button type="submit">Submit</button>
                </Form>
            </main>
        </>
    )
}

export default SearchPage