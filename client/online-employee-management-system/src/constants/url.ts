const localHost = "http://localhost:4000";
const liveHost = "https://employee-management-system-backend-beryl.vercel.app/";

export const getUrl = () => {
    // console.log("window.location.hostname", window.location.hostname);
        if (window.location.hostname === "localhost") {
            return localHost;
        } else {
            return liveHost;
        }
}