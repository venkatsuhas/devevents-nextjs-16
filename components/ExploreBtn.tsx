'use client'
import Image from "next/image";
import posthog from "posthog-js";

const ExploreBtn = () => {
    return (
        <button type={"button"} id={"explore-btn"} className={"mt-7 mx-auto"} onClick={() => {
            console.log("Explore Events");
            posthog.capture("explore_events_clicked");
        }}>
            <a href={"/app/dashboard"}>
            Explore Events
                <Image src={"/icons/arrow-down.svg"} alt={"arrow-right"} width={20} height={20} />
            </a>
        </button>
    )
}
export default ExploreBtn
