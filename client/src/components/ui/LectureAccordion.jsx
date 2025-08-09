import { useState } from "react";
import { ChevronDown, PlayCircle, Lock } from "lucide-react";

const LectureAccordion = ({ lectures = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full border border-gray-200 rounded-md divide-y divide-gray-200">
      {lectures.map((lecture, index) => {
        const isOpen = openIndex === index;
        const isFree = Boolean(lecture?.isPreviewFree);
        return (
          <div key={lecture?._id || index}>
            <button
              type="button"
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                {isFree ? <PlayCircle size={16} /> : <Lock size={16} />}
                <span className="font-medium text-gray-800">
                  {lecture?.lectureTitle || "Untitled Lecture"}
                </span>
              </div>
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-sm text-gray-600">
                {lecture?.description ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: lecture.description }}
                  />
                ) : (
                  <p>No description available.</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LectureAccordion;


