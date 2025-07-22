import React from 'react'
import Chart from 'react-apexcharts'
import StatsCard from './StatsCard'
import { Users, BookOpen, Award, Clock, TrendingUp, Eye, Star, Calendar } from 'lucide-react'

const DashboardStats = ({ userRole }) => {
  // Chart configurations
  const lineChartOptions = {
    chart: {
      type: 'line',
      height: 300,
      toolbar: { show: false },
      background: 'transparent'
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    colors: ['#c7c7c7', '#60C3AD'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: {
        style: {
          colors: '#64748B'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#64748B'
        }
      }
    },
    grid: {
      borderColor: '#64748B'
    },
    legend: {
      labels: {
        colors: '#64748B'
      }
    }
  }

  const donutChartOptions = {
    chart: {
      type: 'donut',
      height: 300
    },
    colors: ['#1C3144', '#596F62', '#7EA16B', '#70161E', '#C3D898'],
    labels: ['Development', 'AI/ML', 'Designing', 'Academic', 'Marketing'],
    legend: {
      position: 'bottom',
      labels: {
        colors: '#64748B'
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }


  // Sample data - can be replaced with real data later
  const studentStats = {
    cards: [
      { title: "Enrolled Courses", value: "12", change: "+2 this month", changeType: "increase", icon: BookOpen, color: "primary" },
      { title: "Completed Courses", value: "8", change: "+3 this month", changeType: "increase", icon: Award, color: "success" },
      { title: "Learning Hours", value: "156", change: "+12 this week", changeType: "increase", icon: Clock, color: "info" },
      { title: "Certificates Earned", value: "8", change: "Same as last month", changeType: "neutral", icon: Star, color: "warning" }
    ],
    lineData: [
      { name: 'Learning Hours', data: [20, 35, 45, 30, 55, 5] },
      { name: 'Courses Completed', data: [1, 2, 1, 3, 2, 4] }
    ],
    donutData: [5, 3, 2, 2], // Courses by category
  }

  const teacherStats = {
    cards: [
      { title: "Total Courses", value: "25", change: "+3 this month", changeType: "increase", icon: BookOpen, color: "primary" },
      { title: "Total Students", value: "342", change: "+28 this month", changeType: "increase", icon: Users, color: "success" },
      { title: "Course Views", value: "1,256", change: "+156 this week", changeType: "increase", icon: Eye, color: "info" },
      { title: "Active Enrollments", value: "89", change: "+12 today", changeType: "increase", icon: TrendingUp, color: "warning" }
    ],
    lineData: [
      { name: 'New Enrollments', data: [15, 25, 35, 28, 45, 55] },
      { name: 'Course Views', data: [120, 180, 220, 190, 280, 320] }
    ],
    donutData: [5, 6, 4, 6, 4], // Courses by category
  }

  const currentStats = userRole === 'student' ? studentStats : teacherStats

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {currentStats.cards.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Line Chart */}
        <div className="bg-secondary-light rounded-xl p-4 sm:p-6 shadow-md">
          <h3 className="text-base sm:text-lg font-semibold text-text-light mb-2 sm:mb-4">
            {userRole === 'student' ? 'Learning Progress' : 'Growth Analytics'}
          </h3>
          <Chart
            options={lineChartOptions}
            series={currentStats.lineData}
            type="line"
            height={300}
          />
        </div>

        {/* Donut Chart */}
        <div className="flex justify-content flex-col items-center bg-secondary-light rounded-xl p-4 sm:p-6 shadow-md">
          <h3 className="text-base sm:text-lg font-semibold text-text-light mb-2 sm:mb-4">
            {userRole === 'student' ? 'Courses by Category' : 'Course Distribution'}
          </h3>
          <Chart
            options={donutChartOptions}
            series={currentStats.donutData}
            type="donut"
            height={300}
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardStats