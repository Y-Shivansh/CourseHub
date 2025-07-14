import React from 'react'
import { Link } from 'react-router-dom'
import defaultThumbnail from "../../assets/defaultThumbnail.png"

const CourseCard = ({ course }) => {

  return (
    <div className="bg-background-light dark:bg-secondary-dark rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col justify-between">

      {/* Thumbnail */}
      <img
        src={course.thumbnail || defaultThumbnail}
        alt={course.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />

      {/* Course Info */}
      <h2 className="text-lg font-semibold  text-text-light dark:text-text-dark mb-1">
        {course.name}
      </h2>

      <div className=''>
        <p className="text-sm text-text-muted mb-1">
          Category: {course.category}
        </p>

        <p className="text-sm text-text-muted mb-1">
          Duration: {course.duration}
        </p>
      </div>

      <p className="mt-2 text-sm font-medium dark:text-text-dark text-text-light mb-2">
        By: {course.createdBy?.name}
      </p>

      {/* View Button */}
      <Link
        to={`/course/${course._id}`}
        className="text-center mt-auto inline-block bg-primary-light dark:bg-primary-dark text-white text-sm px-4 py-2 rounded hover:opacity-90 transition"
      >
        View Course
      </Link>
    </div>
  );
}

export default CourseCard
