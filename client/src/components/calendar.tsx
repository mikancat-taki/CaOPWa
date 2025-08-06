import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long'
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const today = new Date();
  const isCurrentMonth = currentDate.getMonth() === today.getMonth() && 
                         currentDate.getFullYear() === today.getFullYear();

  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
  const calendarDays = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="cosmic-glow rounded-2xl p-6 animate-float">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-white flex items-center">
          <CalendarIcon className="text-yellow-500 mr-3" />
          カレンダー
        </h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-lg glass-morphism hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="text-gray-300" />
          </button>
          <span className="px-4 py-2 glass-morphism rounded-lg text-white font-medium min-w-[140px] text-center">
            {formatMonth(currentDate)}
          </span>
          <button 
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-lg glass-morphism hover:bg-white/20 transition-all"
          >
            <ChevronRight className="text-gray-300" />
          </button>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map(day => (
          <div key={day} className="text-center py-2 text-gray-400 font-medium text-sm">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <button
            key={index}
            disabled={day === null}
            className={`aspect-square rounded-lg transition-all flex items-center justify-center text-sm font-medium ${
              day === null 
                ? 'cursor-default' 
                : day === today.getDate() && isCurrentMonth
                  ? 'bg-yellow-500 text-white font-bold'
                  : 'glass-morphism hover:bg-yellow-500/30'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}
