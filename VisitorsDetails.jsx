import { useLoaderData } from "react-router-dom"

export const Visitors = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <>
            <h1>hi</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone number</th>
                        <th>Block</th>
                        <th>Flat</th>
                        <th>Date</th>
                        <th>time</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((curElem, index) => {
                        return (
                            <tr key={index} >
                                <td>{curElem.name}</td>
                                <td>{curElem.phone}</td>
                                <td>{curElem.block}</td>
                                <td>{curElem.flat}</td>
                                <td>{curElem.date}</td>
                                <td>{curElem.time}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}