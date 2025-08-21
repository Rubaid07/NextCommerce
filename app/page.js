import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProductHighlights from "@/components/ProductHighlights";

export default function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <ProductHighlights />
            </main>
            <Footer />
        </>
    );
}