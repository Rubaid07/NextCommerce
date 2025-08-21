// file: src/app/dashboard/add-product/page.jsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddProductForm from "@/components/AddProductForm";

export default async function AddProductPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <>
            <Navbar />
            <main className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Add New Product</h1>
                <AddProductForm />
            </main>
            <Footer />
        </>
    );
}