import { useEffect, useState } from "react"

const Alert = (props) => {
    const [isShow, setIsShow] = useState(false)
    useEffect(() => {
        if (props.message) {
            setIsShow(true);
        }
    }, [props.message])

    return (
        <>
            { isShow &&
                <>
                    <div className="z-10 absolute left-0 right-0 top-0 bottom-0 bg-black-50"></div>
                    <div className="z-20 left-0 right-0 mx-8 absolute  absolute-y bg-white p-3 border border-gray-200 shadow-lg rounded-md">
                        {props.message}
                        <button onClick={(e) => setIsShow(false)} className="btn mt-3 w-full">Close</button>
                    </div>
                </>
            }
        </>
    )
}
export default Alert