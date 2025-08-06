import { useState, useEffect } from "react";

export function LiveClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Tokyo'
    });
  };

  return (
    <div className="glass-morphism px-4 py-2 rounded-lg">
      <div className="text-center">
        <div className="text-xl font-semibold text-yellow-400">
          {formatTime(currentTime)}
        </div>
        <div className="text-xs text-gray-400">リアルタイム時計</div>
      </div>
    </div>
  );
}
