"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import MapToggleGallery from "@/components/MapToggleGallery";
import ContactUsForm from "@/components/ContactUsForm";
// Your provided Supabase client

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [mapUrl, setMapUrl] = useState("");
  const [loadingMapData, setLoadingMapData] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await fetch("/api/contact_assets");
        const data = await res.json();

        setImageList(data.images);
        setMapUrl(data.mapUrl);
      } catch (err) {
        console.error("Failed to load contact assets:", err);
      } finally {
        setLoadingMapData(false);
      }
    };

    fetchAssets();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center min-h-[400px] bg-cover bg-center"
        style={{ backgroundImage: "url('/assisant.jpg')" }}
      >
        {/* Optional Gradient Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.4)_10%,rgba(0,0,0,1)_90%)] pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Get In <span className="text-blue-400">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Ready to book your celebrity talent?
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <ContactUsForm />

            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">
                Contact <span className="text-blue-400">Information</span>
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-600 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">
                        Address
                      </h3>
                      <p className="text-gray-300">
                        123A Hughes Estate, Monita, Avrk,
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-600 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">
                        Phone
                      </h3>
                      <p className="text-gray-300">+1 (555) 123-STAR</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-600 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">
                        Email
                      </h3>
                      <p className="text-gray-300">bookings@starbook.com</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-600 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">
                        Hours
                      </h3>
                      <div className="text-gray-300 space-y-1">
                        <p>Mon-Fri: 9AM - 7PM</p>
                        <p>Sat: 10AM - 5PM</p>
                        <p>Sun: 12PM - 4PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}

      {loadingMapData ? (
        <div className="h-96 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <MapToggleGallery iframeSrc={mapUrl} imageList={imageList} />
      )}

      {/* CTA 
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Make Your Event{" "}
            <span className="text-blue-400">Legendary</span>?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Live Chat
            </button>
            <button className="border-2 border-gray-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800/50 transition-all duration-300">
              <Link href="/list">Browse Celebrities</Link>
            </button>
          </div>
        </div>
      </section>*/}
    </div>
  );
}
