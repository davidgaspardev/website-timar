import { BannerData } from "./types";

export const products: string[] = [
    "Revestimento",
    "Texturas",
    "Tintas",
    "Vernizes",
    "Bases",
    "Massas",
    "Impermeabilizantes"
];

export const banners: BannerData[] = [
    {
        image: "http://timar.com.br/wp-content/uploads/2019/08/Expedição-2.jpg",
        title: "Experiência industrial",
        description: "Fundada em 2004, a Timar é o resultado de mais de 30 anos de atuação no Mercado da Construção Civil e disponibiliza mais de 40 produtos entre texturas, revestimentos, tintas, vernizes, bases, massas e impermeabilizações.",
        button: {
            name: "Saber mais",
            link: "http://timar.com.br/a-timar/"
        }
    },
    {
        image: "http://timar.com.br/wp-content/uploads/2019/06/Timar_produtos-4.jpg",
        title: "Produtos inovadores",
        description: "Nosso compromisso é oferecer produtos ecologicamente corretos que agregam inovação com alta tecnologia, sem trazer riscos ao consumidor e ao meio-ambiente em geral.",
        button: {
            name: "Ver mais",
            link: "http://timar.com.br/timar-produtos/"
        }
    }
];