import React from 'react'
import Chart from 'react-apexcharts'
import { TrendingUp, TrendingDown, Users, BookOpen, Award, Clock } from 'lucide-react'

const StatsCard = ({ title, value, change, changeType, icon: Icon, color = "primary" }) => {
  const colorClasses = {
    primary: "bg-primary-light text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-white",
    danger: "bg-red-500 text-white",
    info: "bg-blue-500 text-white"
  }

  return (
    <div className="bg-secondary-light  rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-text-muted text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-text-light  mt-1">{value}</p>
          
          {change && (
            <div className={`flex items-center gap-1 mt-2 ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
              {changeType === 'increase' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  )
}

export default StatsCard