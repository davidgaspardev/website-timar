import { CSSProperties, ReactNode, useEffect, Children } from 'react';
import { NextRouter, useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/modules/header.module.css';
import { products } from '../helpers/contants';
import { getActiveLinkIndex } from './utils/links';

/**
 * Menu control
 */
const menu = {
    get: function () {
        const menu: HTMLElement | null = document.getElementById("nav-menu");
        // Checking if exists
        if(menu == null) throw Error("Nav menu not found");

        return menu;
    },
    show: function () {
        // Destruturing assignment
        const { get } = menu;

        get().style.right = "0px";
    },
    hide: function () {
        // Destructuring assignment
        const { get } = menu;

        get().style.right = "-100vw";
    }
};

/**
 * Submenu control
 */
const submenu = {
    hasTimeout: false,
    isMouseOver: false,
    getParent: function() {
        const as = document.getElementsByTagName('a');
        for(let i = 0; i < as.length; i++) {
            if(as.item(i)?.pathname === "/products") {
                return as.item(i) as HTMLElement;
            }
        }
        throw Error("Products button don't found in header");
    },
    get: function () {
        const submenu: HTMLElement | null = document.getElementById("submenu");
        // Checking if exists
        if(!submenu) throw Error("Products list don't found in header");

        return submenu;
    },
    show: function () {
        // Destruturing assignment
        const { get } = submenu;

        get().style.display = "block";
    },
    hide: function () {
        // Destruturing assignment
        const { hasTimeout, get } = submenu;

        if(!hasTimeout) {
            // Update hasTimeout
            submenu.hasTimeout = true;

            setTimeout(() => {
                if(!submenu.isMouseOver) get().style.display = "none";

                submenu.hasTimeout = false;
            }, 1000);
        }
    },

    // Set listen in element ul
    onMouseOver: function() {
        submenu.isMouseOver = true;
    },
    onMouseOut: function() {
        // Destruturing assignment
        const { hide } = submenu;

        submenu.isMouseOver = false;
        hide();
    }
};

type Props = {
    containerStyle?: CSSProperties;
    mode?: "fixed" | "scroll-to-fixed";
    children?: ReactNode;
};

/**
 * Header
 * 
 * @returns {JSX.Element}
 */
export default function Header(props: Props): JSX.Element {
    // Destructuring assignment
    const { containerStyle, mode }: Props = props;
    const { asPath }: NextRouter = useRouter();

    const navIndex = getActiveLinkIndex(asPath);

    function loadContainerStyle(): CSSProperties | undefined {
        return mode === "scroll-to-fixed" ? {
            position: "absolute",
            backgroundColor: "transparent",
            bottom: 0,
            ...containerStyle
        } : containerStyle;
    }

    useEffect(() => {
        if(mode === "scroll-to-fixed") {
            const header = document.getElementById("header");

            if(header) setScrollListener(header);
        }

        setResizeListener();
    }, [ mode ]);
    
    // Return component
    return (
        <header id={"header"} className={styles.container} style={loadContainerStyle()} >

            <Image 
                src="/assets/svg/logo-negative.svg"
                width={120}
                height={45} />

            <div className={styles.menuIconContainer} onClick={menu.show} >
                <Image
                    src="/assets/svg/menu.svg"
                    width={35}
                    height={35} />
            </div>

            <nav id={"nav-menu"} className={styles.menuContainer}>
                <div onClick={menu.hide} >X</div>
                <ul className={styles.menu}>

                    {
                        Children.map(links, (link, index: number) => {
                            const selected = navIndex === index;
                            return (
                                <li key={index} style={{
                                    color: selected ? "var(--color-primary-orange)" : "white",
                                }}> { link }</li>
                            );
                        })
                    }

                </ul>
            </nav>

        </header>
    );
}

/**
 * Navigation links
 * 
 * @type {ReactNode}
 */
const links: ReactNode = [
    // 0
    <Link href="/">
        <a>Ínicio</a>
    </Link>,
    // 1
    <Link href="/about">
        <a>A timar</a>
    </Link>,
    // 2
    <>
        <Link href="/products">
            <a>Produtos</a>
        </Link>
        <ul 
            id="submenu"
            className={styles.submenu} >
            {
                products.map((product: string, index: number) => {
                    return (
                        <li key={index}>
                            <Link href={`/products/${product.toLowerCase()}`}>
                                <a>{product}</a>
                            </Link>
                        </li>
                    );
                })
            }
        </ul>
    </>,
    // 3
    <Link href="/tips">
        <a>Dicas</a>
    </Link>,
    // 4
    <Link href="/contactus">
        <a>Fale conosco</a>
    </Link>
];

/**
 * Setting resize listener
 */
function setResizeListener() {
    // Funcition variable
    let ticking = false;

    setSubmenuEvents();
    configHeightViewPort();
    
    window.onresize = () => {
        if(!ticking) {
            ticking = true;

            window.requestAnimationFrame((time: number) => {
                setSubmenuEvents();

                ticking = false;
            });
        }

        configHeightViewPort();
    };
}

/**
 * Setting submenu events
 * 
 * When the mouse is over the products button, it shows the submenu with the
 * list of Timar products. And when it's out of the button or submenu,
 * it's to hide it again.
 * 
 * Importantly, these events are only present when the screen is greater
 * than 700 pixels wide.
 */
function setSubmenuEvents() {
    const productsButton = submenu.getParent();
    const productsList = submenu.get();

    if(window.innerWidth > 700) {
        productsButton.onmouseover = submenu.show;
        productsButton.onmouseout = submenu.hide;
        productsList.onmouseover = submenu.onMouseOver;
        productsList.onmouseout = submenu.onMouseOut;
    } else {
        productsButton.onmouseover = null;
        productsButton.onmouseout = null;
        productsList.onmouseover = null;
        productsList.onmouseout = null;
    }
}

/**
 * Setting scroll listener
 * 
 * @param {HTMLElement} header 
 */
function setScrollListener(header: HTMLElement) {
    // Function variables
    let currentPosition = 0;
    let ticking = false;

    // Adding event listener on windows scroll 
    window.addEventListener("scroll", function () {
        // Checking 
        if(!ticking) {
            // Update current position 
            currentPosition = window.scrollY;

            window.requestAnimationFrame(function() {
                // Get limit
                let limit = window.innerHeight - Number.parseInt(getComputedStyle(header).height);
                if(currentPosition > limit) {
                    header.style.position = "fixed";
                    header.style.top = "0";
                    header.style.bottom = "auto";
                } else {
                    header.style.position = "absolute";
                    header.style.top = "auto";
                    header.style.bottom = "0";
                }

                let opacity = currentPosition / limit;
                header.style.backgroundColor = `rgba(29, 28, 57, ${opacity})`;

                ticking = false;
            });
            ticking = true;
        }
    });
}

function configHeightViewPort() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}