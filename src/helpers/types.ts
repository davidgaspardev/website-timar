export type Paint = {
    image: string;
    name: string;
    yield: {
        area: number;
        weight: number;
        volume: number;
    };
}

export type Coating = Paint & {
    category: "projetados" | "desempenados";
};

export type BannerData = {
    image: string;
    title: string;
    description: string;
    button: {
        name: string;
        link: string;
    }
};