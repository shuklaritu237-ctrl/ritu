import { redirect } from "react-router-dom";

export const AdminPage = () => {
    return (
        <>
            <div>
                <h2>Visitors  Related Details</h2>
                <a href="./visitors">Visitors Details</a>
            </div>

            <div><form action=""></form></div>

            <div><form action=""></form></div>

            <div><form action=""></form></div>

            <button
                onClick={() => {
                    sessionStorage.clear();
                    window.location.href = "/";
                }}
            >
                Logout
            </button>
        </>
    )
}