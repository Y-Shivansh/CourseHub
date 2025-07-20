import lightBlob from "../../assets/teacher-lightBlob.svg";
import darkBlob from "../../assets/teacher-darkBlob.svg";

const TeacherBlobBackground = () => {
    return (
        <>
            {/* Light Mode Blob*/}
            <img src={lightBlob}
                alt="Light BG Blob"
                className="absolute top-0 left-0 w-full h-full -z-10 object-cover block dark:hidden"
            />

            {/* Dark Mode Blob*/}
            <img src={darkBlob}
                alt="Light BG Blob"
                className="absolute top-0 left-0 w-full h-full object-cover -z-10 hidden dark:block"
            />
        </>
    )
}

export default TeacherBlobBackground;
