// file: src/app/products/[id]/page.jsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// আপনার ব্যাকএন্ডের URL
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

async function getProduct(id) {
    try {
        const res = await fetch(`${BACKEND_URL}/products/${id}`, { cache: 'no-store' });
        if (!res.ok) {
            return null;
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching product details:", error);
        return null;
    }
}

export default async function ProductDetailsPage({ params }) {
    const product = await getProduct(params.id);

    if (!product) {
        return (
            <div className="text-center p-8">
                <h1 className="text-2xl font-bold">Product not found</h1>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <main className="container mx-auto p-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-600 text-lg mb-4">{product.description}</p>
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                </div>
            </main>
            <Footer />
        </>
    );
}