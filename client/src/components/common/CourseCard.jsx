import React from 'react'
import { Link } from 'react-router-dom'
import defaultThumbnail from "../../assets/defaultThumbnail.png"
import { Clock } from "lucide-react";
import { getCategoryIcon } from '../../utils/getCategoryIcon';

const CourseCard = ({ course }) => {



  return (
    <div className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-background-light dark:bg-secondary-light rounded-xl shadow-md p-4 flex flex-col justify-between">

      {/* Thumbnail */}
      <img
        src={course.thumbnail || defaultThumbnail}
        alt={course.name}
        className="line-clamp-2 w-full h-40 object-cover rounded-md mb-4"
      />

      {/* Course Info */}
      <div className='flex justify-between items-center'>
        <h2 className="text-lg font-semibold  text-text-light mb-1">
          {course.name}
        </h2>
        <p className="text-sm text-text-muted">{course.price ? `₹${course.price}` : "Error"}</p>
      </div>

      <div className='flex justify-between items-center '>
        <p className="flex items-center gap-1.5 text-sm text-text-muted mb-1">
          <Clock size={16} className="text-primary-light " />
          {course.duration}
        </p>
        <p className="flex items-center gap-1.5 text-sm text-text-muted mb-1">
          <span className='text-primary-light'>{getCategoryIcon(course.category)}</span>
          {course.category}
        </p>
      </div>

      <p className="mt-2 text-sm font-medium  text-text-light mb-2">
        By: {course.createdBy?.name}
      </p>

      {/* View Button */}
      <Link
        to={`/course/${course._id}`}
        className="text-center mt-auto inline-block bg-primary-light  text-white text-sm px-4 py-2 rounded hover:opacity-90 transition"
      >
        View Course
      </Link>
    </div>
  );
}

export default CourseCard
