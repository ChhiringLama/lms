import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import Footer from "./Footer";

const AboutUs = () => {
    return (
        <>
            <div className="w-[80%] m-auto">
                <div className="min-h-screen ">
                    {/* First Section - Text Left, Image Right */}
                    <section className="flex flex-col lg:flex-row items-center min-h-screen p-8">
                        <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                About Our Learning Platform
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                Our learning management system is designed to provide students with a comprehensive
                                educational experience. We believe in making quality education accessible to everyone
                                through innovative technology and user-friendly interfaces. Our platform connects
                                learners with expert instructors and provides a seamless learning journey from
                                enrollment to completion.
                            </p>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="relative">
                                <div className="w-full h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <img
                                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                                        alt="Students learning together"
                                        className="w-full h-full object-cover mix-blend-multiply"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Second Section - Image Left, Text Right */}
                    <section className="flex flex-col lg:flex-row-reverse items-center min-h-screen p-8">
                        <div className="lg:w-1/2 lg:pl-12 mb-8 lg:mb-0">
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                Our Mission & Vision
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                We are committed to revolutionizing the way education is delivered and consumed.
                                Our mission is to break down barriers to learning by providing flexible,
                                accessible, and engaging educational content. Through our platform, we aim to
                                empower students to achieve their academic and professional goals while fostering
                                a community of lifelong learners who support and inspire each other.
                            </p>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="relative">
                                <div className="w-full h-96 bg-gradient-to-br from-green-400 to-blue-600 rounded-2xl overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <img
                                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop"
                                        alt="Online learning concept"
                                        className="w-full h-full object-cover mix-blend-multiply"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer /></>
    );
};

export default AboutUs;