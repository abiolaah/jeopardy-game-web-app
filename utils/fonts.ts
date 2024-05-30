import { Pacifico, Amita, Ruslan_Display, Nunito } from "next/font/google";

const pacifico_init = Pacifico({
    subsets: ['latin'],
    weight: "400",
});

const amita_init = Amita({
    subsets: ['latin'],
    weight: "400",
});

const ruslan_display_init = Ruslan_Display({
    subsets: ['latin'],
    weight: "400",
});

const nunito_init = Nunito({
    subsets: ['latin'],
    weight: "400",
});

export const pacifico = pacifico_init.className
export const amita = amita_init.className
export const ruslan_display = ruslan_display_init.className
export const nunito = nunito_init.className