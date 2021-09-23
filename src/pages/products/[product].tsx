import { useRouter } from "next/router";
import { ParsedUrlQuery } from 'querystring';
import { Header } from "../../components";

/**
 * Producr Page
 * 
 * @returns {JSX.Element}
 */
export default function ProductPage(): JSX.Element {
    const router = useRouter();
    // Destruturign assignment
    const { product }: ParsedUrlQuery = router.query;

    return (
        <div>
            <Header />
            <h1>{product} page</h1>
        </div>
    );
}