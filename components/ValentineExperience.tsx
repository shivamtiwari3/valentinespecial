'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ValentineExperienceProps {
    partnerName: string
    coupleImage?: string
}

export default function ValentineExperience({ partnerName, coupleImage }: ValentineExperienceProps) {
    const [counter, setCounter] = useState(0)
    const [showSadModal, setShowSadModal] = useState(false)
    const [showHappyModal, setShowHappyModal] = useState(false)
    const [mainImage, setMainImage] = useState('https://github.com/NikhilMarko03/resources/blob/main/happy1.gif?raw=true')
    const [sadModalImage, setSadModalImage] = useState('')
    const [sadModalText, setSadModalText] = useState('Please')
    const [transitionToFlowers, setTransitionToFlowers] = useState(false)

    // Removed audio refs to prevent 404 errors since files are missing
    // You can re-add them if you add happy.mp3 and sad.mp3 to public/resources/

    const sadCat = [
        'https://media1.tenor.com/images/9413ffc5a11722a3cc456a88810750bd/tenor.gif?itemid=14193216',
        'https://emoji.gg/assets/emoji/5228_cat_cri.gif',
        'https://media1.tenor.com/images/a0554662ae7c3c60c0a7fdadac74ef18/tenor.gif?itemid=13931206',
        'https://media3.giphy.com/media/qpCvOBBmBkble/giphy.gif',
        'https://c.tenor.com/fpIAhF2jIY0AAAAC/cat-crying.gif',
        'https://c.tenor.com/BP70qe8X0J8AAAAC/crycat-crying-cat.gif',
    ]

    const blackmail = [
        'Please',
        "I'm begging you",
        "I'm crying",
        "I'm sad",
        'HUHUHUHU',
        'Please Say Yes',
        "I'm gonna cry",
    ]

    const handleNo = () => {
        const newCounter = counter + 1
        setCounter(newCounter)

        const randomIndex = Math.floor(Math.random() * sadCat.length)
        setSadModalImage(sadCat[randomIndex])
        setSadModalText(blackmail[Math.min(newCounter, blackmail.length - 1)])

        setShowSadModal(true)
        setMainImage('https://github.com/NikhilMarko03/resources/blob/main/sad1.gif?raw=true')
    }

    const handleYes = () => {
        if (counter >= 3) {
            setShowSadModal(false)
            setShowHappyModal(true)
            setMainImage('https://github.com/NikhilMarko03/resources/blob/main/happy3.gif?raw=true')
        } else {
            alert("Don't say yes right away, cutie. Play around a bit 😉😘")
        }
    }

    const handleLoveYouToo = () => {
        setShowHappyModal(false)
        document.body.classList.add('page-transition-out')
        setTimeout(() => {
            setTransitionToFlowers(true)
        }, 1000)
    }

    const closeSadModal = () => {
        setShowSadModal(false)
        setMainImage('https://github.com/NikhilMarko03/resources/blob/main/happy1.gif?raw=true')
    }

    if (transitionToFlowers) {
        return <HeartsPage partnerName={partnerName} coupleImage={coupleImage} />
    }

    return (
        <>
            <link rel="stylesheet" href="/style2.css" />

            <h1 className="headerText">{`Hey ${partnerName}… Valentine banogi?`}</h1>

            <div style={{ position: 'relative', display: 'inline-block' }}>
                <img className="image" src={mainImage} alt="cat" id="mainImg" />

                <div className="floating-hearts">
                    {[...Array(6)].map((_, i) => (
                        <span
                            key={i}
                            className="heart-float"
                            style={{
                                '--delay': `${i * 0.5}s`,
                                '--x': `${(i % 3) * 50}px`,
                                '--y': `${Math.floor(i / 3) * 50}px`
                            } as React.CSSProperties}
                        >
                            ❤️
                        </span>
                    ))}
                </div>
            </div>

            <div id="btns" className="flex">
                <button
                    className="button"
                    onMouseEnter={() => setMainImage('https://github.com/NikhilMarko03/resources/blob/main/happy3.gif?raw=true')}
                    onMouseLeave={() => setMainImage('https://github.com/NikhilMarko03/resources/blob/main/happy1.gif?raw=true')}
                    onClick={handleYes}
                >
                    Yes 🥰
                </button>
                <button
                    className="button"
                    onMouseEnter={() => setMainImage('https://github.com/NikhilMarko03/resources/blob/main/sad1.gif?raw=true')}
                    onMouseLeave={() => setMainImage('https://github.com/NikhilMarko03/resources/blob/main/happy1.gif?raw=true')}
                    onClick={handleNo}
                >
                    No 😢
                </button>
            </div>

            {showSadModal && (
                <div className="model" style={{ display: 'flex' }}>
                    <div className="model-content">
                        <p className="modelText">{sadModalText}</p>
                        <img className="modelImg" src={sadModalImage} alt="sad cat" />
                        <div className="flex">
                            <button className="button" onClick={handleYes}>Yes 🥰</button>
                            <button className="button" onClick={closeSadModal}>No 😢</button>
                        </div>
                    </div>
                </div>
            )}

            {showHappyModal && (
                <div className="model2" style={{ display: 'flex' }}>
                    <div className="model-content">
                        <p className="modelText">I Love you 😘😘</p>
                        <img className="modelImg" src="https://github.com/NikhilMarko03/resources/blob/main/happy3.gif?raw=true" alt="happy cat" />
                        <button className="button" onClick={handleLoveYouToo}>Love You Too 🥰</button>
                    </div>
                </div>
            )}

            {/* Clean Footer Bar */}
            <div style={{
                position: 'fixed',
                bottom: '0',
                left: '0',
                right: '0',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(255, 192, 203, 0.3)',
                padding: '12px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '13px',
                zIndex: 1000
            }}>
                <span style={{ color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Made with ❤️ by{' '}
                    <a
                        href="https://www.instagram.com/shivamtiwari.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#ec4899', textDecoration: 'none', fontWeight: '500' }}
                    >
                        Shivam
                    </a>
                </span>
                <Link
                    href="/"
                    style={{
                        color: '#ec4899',
                        textDecoration: 'none',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'transform 0.2s'
                    }}
                    className="hover-scale"
                >
                    Make your own →
                </Link>
            </div>
        </>
    )
}

function HeartsPage({ partnerName, coupleImage }: { partnerName: string, coupleImage?: string }) {
    // Robust fallback if image is missing or base64 is broken
    const imageUrl = coupleImage || 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?q=80&w=1000&auto=format&fit=crop'

    return (
        <div className="min-h-screen bg-pink-900 flex flex-col items-center justify-center relative overflow-hidden text-center p-4">
            <style jsx global>{`
                @keyframes float-up {
                    0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
                    20% { opacity: 0.8; }
                    100% { transform: translateY(-20vh) scale(1.5); opacity: 0; }
                }
                .animate-float {
                    animation-name: float-up;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
            `}</style>

            {/* Background Image Layer */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-30 blur-sm transform scale-105"
                style={{ backgroundImage: `url(${imageUrl})` }}
            />

            {/* Content Layer */}
            <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center animate-fade-in space-y-8">

                {/* Heading */}
                <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md animate-bounce px-2 leading-tight">
                    {`Status update: ${partnerName} is mine 💖`}
                </h1>

                {/* Photo Frame */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-pink-300 shadow-[0_0_40px_rgba(255,105,180,0.6)] overflow-hidden mx-auto bg-black/20 backdrop-blur-sm transform hover:scale-105 transition-transform duration-700">
                    <img
                        src={imageUrl}
                        alt="Us"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            // Fallback if image fails to load
                            e.currentTarget.src = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW5sMHZ2bWxnbGd6bXBibG5sMHZ2bWxnbGd6bXBibG5sMHZ2bWxneiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LODtI956WpY5y/giphy.gif'
                        }}
                    />
                </div>

                {/* Message */}
                <p className="text-pink-100 text-xl md:text-2xl font-light italic mt-6 px-4">
                    "Every love story is beautiful, but ours is my favorite."
                    <br />
                    <span className="text-2xl mt-4 block font-semibold text-pink-200">Happy Valentine's Day! 💝</span>
                </p>

            </div>

            {/* Floating Hearts Animation */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                {/* Generating fixed number of hearts to ensure rendering stability */}
                <div className="heart-0 absolute text-4xl left-[10%] animate-[float-up_8s_linear_infinite]" style={{ animationDelay: '0s' }}>❤️</div>
                <div className="heart-1 absolute text-3xl left-[20%] animate-[float-up_7s_linear_infinite]" style={{ animationDelay: '1s' }}>💖</div>
                <div className="heart-2 absolute text-5xl left-[30%] animate-[float-up_9s_linear_infinite]" style={{ animationDelay: '2s' }}>💕</div>
                <div className="heart-3 absolute text-4xl left-[50%] animate-[float-up_6s_linear_infinite]" style={{ animationDelay: '0.5s' }}>💗</div>
                <div className="heart-4 absolute text-4xl left-[70%] animate-[float-up_8s_linear_infinite]" style={{ animationDelay: '1.5s' }}>🥰</div>
                <div className="heart-5 absolute text-3xl left-[85%] animate-[float-up_7s_linear_infinite]" style={{ animationDelay: '3s' }}>💓</div>
                <div className="heart-6 absolute text-5xl left-[15%] animate-[float-up_9s_linear_infinite]" style={{ animationDelay: '4s' }}>💝</div>
                <div className="heart-7 absolute text-4xl left-[60%] animate-[float-up_8s_linear_infinite]" style={{ animationDelay: '2.5s' }}>💞</div>
                <div className="heart-8 absolute text-3xl left-[40%] animate-[float-up_7s_linear_infinite]" style={{ animationDelay: '1.2s' }}>💟</div>
                <div className="heart-9 absolute text-5xl left-[90%] animate-[float-up_9s_linear_infinite]" style={{ animationDelay: '0.8s' }}>💌</div>
            </div>

            {/* Clean Footer Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-30" style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '12px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '13px'
            }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Made with ❤️ by{' '}
                    <a
                        href="https://www.instagram.com/shivamtiwari.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#ffc0cb', textDecoration: 'none', fontWeight: '500' }}
                    >
                        Shivam
                    </a>
                </span>
                <Link
                    href="/"
                    style={{
                        color: '#ffc0cb',
                        textDecoration: 'none',
                        fontWeight: '600'
                    }}
                    className="hover:text-pink-300 transition-colors"
                >
                    Make your own →
                </Link>
            </div>
        </div>
    )
}
