import React, { useState } from 'react';

// Dummy lecture data
const lectures = [
    {
        id: 1,
        title: 'Introduction to Python',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        completed: true,
    },
    {
        id: 2,
        title: 'Variables and Data Types',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4',
        completed: false,
    },
    {
        id: 3,
        title: 'Control Flow',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        completed: true,
    },
    {
        id: 4,
        title: 'Functions',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4',
        completed: false,
    },
];

const CourseProgress = () => {
    const [selectedLecture, setSelectedLecture] = useState(lectures[0]);

    return (
        <div className='mt-14 max-w-7xl p-4 mx-auto'>

            <div className="flex h-screen bg-gray-50">
                <div className="flex-2 w-2/3 p-8 pt-6 flex flex-col items-center">
                    <div className="w-full max-w-3xl aspect-video bg-black rounded-xl shadow-2xl flex items-center justify-center border border-gray-300 mt-2">
                        <video
                            src={selectedLecture.videoUrl}
                            controls
                            className="w-full h-full rounded-xl bg-black"
                            style={{ objectFit: "cover" }}
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                {/* Right: Lecture List */}
                <div className="flex-1 w-1/3 p-6 overflow-y-auto border-l border-gray-200 bg-white">
                    <h1>Course Title</h1>
                    <h2 className="text-xl font-bold mb-4">Lectures</h2>
                    <div className="space-y-3">
                        {lectures.map((lecture) => (
                            <div key={lecture.id} className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-all ${selectedLecture.id === lecture.id
                                ? 'bg-blue-50 border-blue-400'
                                : 'bg-gray-100 border-gray-200'
                                }`}
                                onClick={() => setSelectedLecture(lecture)}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{lecture.title}</span>
                                    {lecture.completed && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-700 ml-2">
                                            <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                            Completed
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseProgress;