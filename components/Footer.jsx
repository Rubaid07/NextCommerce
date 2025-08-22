import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-200 footer text-center py-4">
            <p>&copy; {new Date().getFullYear()} Next.js App. All rights reserved.</p>
        </footer>
    );
}