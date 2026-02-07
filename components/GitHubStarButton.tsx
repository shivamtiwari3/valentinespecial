'use client'

import { useEffect, useState } from 'react'

export default function GitHubStarButton() {
    const [stars, setStars] = useState<number | null>(null)
    const repoUrl = 'https://github.com/shivamtiwari3/valentinespecial'

    useEffect(() => {
        // Fetch GitHub star count
        fetch('https://api.github.com/repos/shivamtiwari3/valentinespecial')
            .then(res => res.json())
            .then(data => {
                if (data.stargazers_count !== undefined) {
                    setStars(data.stargazers_count)
                }
            })
            .catch(err => console.error('Failed to fetch stars:', err))
    }, [])

    return (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 md:p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Love This Project?</h3>
            <p className="text-lg mb-4 opacity-90">
                Give it a star on GitHub and help others create magical moments!
            </p>
            <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
                <span className="text-xl">⭐</span>
                <span>Star on GitHub</span>
                {stars !== null && (
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm">
                        {stars}
                    </span>
                )}
            </a>
        </div>
    )
}
