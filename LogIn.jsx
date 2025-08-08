// import { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./LogIn.css"
// export const LogIn = () => {
//     const [logInType, setLogInType] = useState("");
//     const nameRef = useRef();
//     const passwordRef = useRef();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const name = nameRef.current.value;
//         const password = passwordRef.current.value;

//         try {
//             const res = await fetch("http://localhost:5000/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ type: logInType, name, password }),
//             });

//             const data = await res.json();

//             if (res.status === 200) {
//                 sessionStorage.setItem("userRole", logInType);
//                 sessionStorage.setItem("userName", name);

//                 navigate(logInType === "Admin" ? "/admin" : "/guard");
//             } else {
//                 alert(data.msg);
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             alert("Unable to connect to server");
//         }
//     };

//     const Admin_Guard = () => (
//         <>
//             <h3 onClick={() => setLogInType("Admin")}>Log in As Admin</h3>
//             <h3 onClick={() => setLogInType("Guard")}>Log in As Guard</h3>
//         </>
//     );

//     const Login = () => (
//         <form onSubmit={handleSubmit}>
//             <label>{logInType} Name:</label>
//             <input type="text" ref={nameRef} placeholder="Enter name" required />

//             <label>{logInType} Password:</label>
//             <input type="password" ref={passwordRef} placeholder="Enter password" required />

//             <input type="submit" value="Login" />
//         </form>
//     );

//     return <>{!logInType ? <Admin_Guard /> : <Login />}</>;
// };

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {
    const [logInType, setLogInType] = useState("");
    const nameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = nameRef.current.value;
        const password = passwordRef.current.value;

        try {
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: logInType, name, password }),
            });

            const data = await res.json();

            if (res.status === 200) {
                sessionStorage.setItem("token", data.token)
                sessionStorage.setItem("userRole", logInType);
                sessionStorage.setItem("userName", name);
                navigate(logInType === "Admin" ? "/admin" : "/guard");
            } else {
                alert(data.msg);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Unable to connect to server");
        }
    };

    const containerStyle = {
        minHeight: "100vh",
        background: "linear-gradient(to right, #1c1c1c, #383838)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px"
    };

    const cardStyle = {
        background: "#2c2c2c",
        padding: "40px",
        borderRadius: "15px",
        boxShadow: "0 0 20px rgba(255, 255, 255, 0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
        maxWidth: "400px"
    };

    const buttonStyle = {
        background: "linear-gradient(to right, #4b6cb7, #182848)",
        color: "#fff",
        padding: "12px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
        transition: "transform 0.2s, box-shadow 0.3s"
    };

    const inputStyle = {
        padding: "12px",
        border: "none",
        borderRadius: "8px",
        background: "#444",
        color: "#fff",
        fontSize: "1rem",
        outline: "none"
    };

    const submitStyle = {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        padding: "12px",
        border: "none",
        borderRadius: "8px",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.3s ease"
    };

    const backStyle = {
        color: "#aaa",
        cursor: "pointer",
        textAlign: "center",
        marginTop: "10px",
        fontSize: "0.9rem"
    };

    return (
        <div style={containerStyle}>
            {!logInType ? (
                <div style={cardStyle}>
                    <h2 style={{ textAlign: "center", margin: 0 }}>Select Login Type</h2>
                    <button style={buttonStyle} onClick={() => setLogInType("Admin")}>Log in as Admin</button>
                    <button style={buttonStyle} onClick={() => setLogInType("Guard")}>Log in as Guard</button>
                </div>
            ) : (
                <form style={cardStyle} onSubmit={handleSubmit}>
                    <h2 style={{ textAlign: "center", margin: 0 }}>{logInType} Login</h2>

                    <label>{logInType} Name:</label>
                    <input type="text" ref={nameRef} placeholder="Enter name" required style={inputStyle} />

                    <label>{logInType} Password:</label>
                    <input type="password" ref={passwordRef} placeholder="Enter password" required style={inputStyle} />

                    <input type="submit" value="Login" style={submitStyle} />
                    <p style={backStyle} onClick={() => setLogInType("")}>← Back</p>
                </form>
            )}
        </div>
    );
};
