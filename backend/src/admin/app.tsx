import Logo from "./extensions/logo.png";
import Favicon from "./extensions/favicon.ico";
import type { StrapiApp } from "@strapi/strapi/admin";

export default {
    config: {
        auth: {
            logo: Logo,
        },
        head: {
            favicon: Favicon,
        },
        menu: {
            logo: Logo,
        },
    },

    bootstrap(app: StrapiApp) {
        console.log(app);
    },
};
