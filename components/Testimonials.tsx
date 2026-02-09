'use client'

import { useState, useEffect } from 'react'

interface Testimonial {
    id: number
    name: string
    location: string
    avatar: string
    rating: number
    text: string
    date: string
    gender: 'male' | 'female'
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Priya Sharma',
        location: 'Mumbai, Maharashtra',
        avatar: 'PS',
        rating: 5,
        text: 'This is absolutely amazing! My boyfriend sent me the link and I was smiling the whole time. The animations are so cute and romantic. Perfect for Valentine\'s Day! 💕',
        date: 'Feb 8, 2026',
        gender: 'female'
    },
    {
        id: 2,
        name: 'Rahul Verma',
        location: 'Delhi, NCR',
        avatar: 'RV',
        rating: 5,
        text: 'Bhai, this saved my Valentine\'s! Super easy to use and my girlfriend loved it. She kept clicking "No" just to see the animations. 10/10 would recommend!',
        date: 'Feb 7, 2026',
        gender: 'male'
    },
    {
        id: 3,
        name: 'Ananya Reddy',
        location: 'Hyderabad, Telangana',
        avatar: 'AR',
        rating: 5,
        text: 'So creative and thoughtful! The personalized touch with my name made it feel extra special. This is way better than generic Valentine messages. Love it! ❤️',
        date: 'Feb 9, 2026',
        gender: 'female'
    },
    {
        id: 4,
        name: 'Arjun Patel',
        location: 'Ahmedabad, Gujarat',
        avatar: 'AP',
        rating: 5,
        text: 'Simple yet effective! Created a link in seconds and my girlfriend couldn\'t stop laughing at the clever design. Great job on making romance fun and tech-savvy!',
        date: 'Feb 6, 2026',
        gender: 'male'
    },
    {
        id: 5,
        name: 'Sneha Gupta',
        location: 'Bangalore, Karnataka',
        avatar: 'SG',
        rating: 5,
        text: 'This made my day! My partner is not usually romantic but this really showed effort. The fact that it\'s personalized makes all the difference. Highly recommend! 🌹',
        date: 'Feb 8, 2026',
        gender: 'female'
    },
    {
        id: 6,
        name: 'Vikram Singh',
        location: 'Jaipur, Rajasthan',
        avatar: 'VS',
        rating: 5,
        text: 'Perfect solution for expressing feelings! Easy to share, looks professional, and the interactive elements are genius. My girlfriend said YES immediately! 😊',
        date: 'Feb 7, 2026',
        gender: 'male'
    },
    {
        id: 7,
        name: 'Pooja Mehta',
        location: 'Pune, Maharashtra',
        avatar: 'PM',
        rating: 5,
        text: 'Absolutely adorable! The animations, the colors, everything is so well designed. It felt like a mini romantic movie. Thank you for making Valentine\'s special! 💖',
        date: 'Feb 9, 2026',
        gender: 'female'
    },
    {
        id: 8,
        name: 'Aditya Kumar',
        location: 'Kolkata, West Bengal',
        avatar: 'AK',
        rating: 5,
        text: 'This is brilliant! Modern, fun, and romantic. My girlfriend loved the surprise and shared it with all her friends. You guys nailed it! 🔥',
        date: 'Feb 6, 2026',
        gender: 'male'
    }
]

export default function Testimonials() {
    const [visibleTestimonials, setVisibleTestimonials] = useState<number[]>([])

    useEffect(() => {
        // Animate testimonials appearing one by one
        testimonials.forEach((_, index) => {
            setTimeout(() => {
                setVisibleTestimonials(prev => [...prev, index])
            }, index * 100)
        })
    }, [])

    const getAvatarGradient = (gender: 'male' | 'female') => {
        return gender === 'female'
            ? 'from-pink-400 to-rose-600'
            : 'from-blue-400 to-indigo-600'
    }

    return (
        <section className="container mx-auto px-4 py-12 sm:py-16">
            <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent mb-4 px-2" style={{ fontFamily: 'var(--font-outfit)' }}>
                    Love Stories from India 💕
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                    Join thousands of couples who made their Valentine's Day unforgettable
                </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 px-4">
                <div className="text-center min-w-[100px] transform hover:scale-110 transition-premium">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-outfit)' }}>
                        200+
                    </div>
                    <div className="text-gray-600 font-medium mt-2 text-sm sm:text-base">Happy Couples</div>
                </div>
                <div className="text-center min-w-[100px] transform hover:scale-110 transition-premium">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-outfit)' }}>
                        4.9⭐
                    </div>
                    <div className="text-gray-600 font-medium mt-2 text-sm sm:text-base">Average Rating</div>
                </div>
                <div className="text-center min-w-[100px] transform hover:scale-110 transition-premium">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-outfit)' }}>
                        250+
                    </div>
                    <div className="text-gray-600 font-medium mt-2 text-sm sm:text-base">Shared Messages</div>
                </div>
            </div>

            {/* Testimonials Grid - Twitter/X Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 max-w-7xl mx-auto">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={testimonial.id}
                        className={`transition-all duration-700 ease-out transform ${visibleTestimonials.includes(index)
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-8'
                            }`}
                    >
                        {/* Twitter/X Style Card - Enhanced */}
                        <div className="bg-white rounded-2xl p-5 sm:p-6 h-full shadow-md hover:shadow-2xl transition-premium hover:-translate-y-2 border border-gray-100 hover:border-pink-200">
                            {/* Header */}
                            <div className="flex items-start gap-3 mb-4">
                                {/* Avatar */}
                                <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarGradient(testimonial.gender)} flex items-center justify-center text-white font-bold text-lg shadow-md hover:scale-110 transition-premium`}>
                                    {testimonial.avatar}
                                </div>

                                {/* Name & Username Style */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 text-base hover:text-pink-600 transition-colors" style={{ fontFamily: 'var(--font-outfit)' }}>
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 truncate">
                                        {testimonial.location}
                                    </p>
                                </div>

                                {/* Twitter-style verified badge / rating */}
                                <div className="flex-shrink-0">
                                    <div className="flex gap-0.5">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className="w-4 h-4 text-yellow-400 fill-current hover:scale-125 transition-premium"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Tweet Text */}
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                                {testimonial.text}
                            </p>

                            {/* Footer - Date (like Twitter timestamp) */}
                            <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                                <span>{testimonial.date}</span>
                                <div className="flex items-center gap-4">
                                    {/* Twitter-style interactions */}
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                                        </svg>
                                        <span className="text-xs">{Math.floor(Math.random() * 50) + 10}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom CTA - Enhanced */}
            <div className="text-center mt-10 sm:mt-12 px-4 animate-fade-in-scale">
                <div className="inline-block glass-strong rounded-2xl p-5 sm:p-6 border-2 border-pink-200 shadow-md hover:shadow-lg transition-premium max-w-md">
                    <p className="text-gray-700 font-semibold mb-2 text-base sm:text-lg" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Ready to create your own love story?
                    </p>
                    <p className="text-sm text-gray-600">
                        Join thousands of happy couples today! 💖
                    </p>
                </div>
            </div>
        </section>
    )
}
