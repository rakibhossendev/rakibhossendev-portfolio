import { Suspense } from "react";
import { HomeDataType } from "../../Typescript/home"
import HomePageComponent from "@/app/components/home/home";

const homeDataApiResponse = async (): Promise<HomeDataType> => {
    const response = await fetch('http://localhost:3000/data/home.json');
    const data: HomeDataType = await response.json();

    return data;
}

export default function HomePage(){

    return (
        <section>
            <Suspense fallback={<p>Loading...</p>}>
                <HomePageComponent homeData={homeDataApiResponse()}></HomePageComponent>
            </Suspense>
        </section>
    )
}