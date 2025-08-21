import Link from 'next/link';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

async function getProducts() {
    try {
        const res = await fetch(`${BACKEND_URL}/products?limit=3`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch products');
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export default async function ProductHighlights() {
    const products = await getProducts();
    const featuredProducts = products.slice(0, 3);

    return (
        <section className="py-12 bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredProducts.length > 0 ? (
                        featuredProducts.map((product) => (
                            <div key={product._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{product.name}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
                                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">${product.price}</span>
                                <Link href={`/products/${product._id}`} className="block mt-4 text-blue-600 dark:text-blue-400 hover:underline">
                                    View Details
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No featured products found.</p>
                    )}
                </div>
            </div>
        </section>
    );
}