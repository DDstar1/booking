"use client";

import { useEffect, useState } from "react";
import { Star, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
export default function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const res = await fetch("/api/all_tags");
        const data = await res.json();

        const allTags = data.tags || [];

        const uniqueSortedTags = [...new Set(allTags)].sort(
          (a, b) => b.length - a.length
        );

        setCategories(uniqueSortedTags.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };

    getTags();
  }, []);

  return (
    <footer className="bg-black/80 backdrop-blur-sm py-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Star className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">StarBook</span>
            </div>
            <p className="text-gray-400">
              The premier platform for booking celebrity talent for your events.
            </p>
          </div>

          {/* Services & Categories */}
          <div className="col-span-2 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Celebrity Booking</li>
                <li>Event Planning</li>
                <li>Talent Management</li>
                <li>Contract Negotiation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-400">
                {categories.length > 0 ? (
                  categories.map((tag) => (
                    <li key={tag}>
                      <Link
                        href={`/list?tag=${encodeURIComponent(tag)}`}
                        className="hover:text-white transition-colors"
                      >
                        {tag}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>Loading...</li>
                )}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
  
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>alex@elitestarbook.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Los Angeles, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 StarBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
