
import { AnalyticsRoomSystem } from '../../src/array-operation'
// ================== 使用示例 ==================
// 创建分析系统（12小时制）
const analyticsRoom = new AnalyticsRoomSystem(12);

// 预定会议室
analyticsRoom.bookRoom(1, 3, "Alice");
analyticsRoom.bookRoom(2, 4, "Bob");
analyticsRoom.bookRoom(5, 7, "Charlie");
analyticsRoom.bookRoom(8, 10, "Alice");
const booking5 = analyticsRoom.bookRoom(9, 11, "Bob");

// 取消一个预定
analyticsRoom.cancelBooking(booking5);

// 可视化当前状态
const analyticsRoomVisualizeArray: string[] = [];
console.log("当前资源状态:");
analyticsRoomVisualizeArray.push("当前资源状态:");
analyticsRoomVisualizeArray.push(analyticsRoom.visualize());
analyticsRoomVisualizeArray.push(" 0 1 2 3 4 5 6 7 8 9 10");


// 获取统计信息

analyticsRoomVisualizeArray.push("\n统计信息:");
analyticsRoomVisualizeArray.push("历史占用率:" + analyticsRoom.getHistoricalOccupancyRate().toFixed(2));

analyticsRoomVisualizeArray.push("当前占用率:" + analyticsRoom.getCurrentOccupancyRate().toFixed(2));
analyticsRoomVisualizeArray.push("\n时间段分析:");
analyticsRoomVisualizeArray.push("\n时间段分析:");


analyticsRoomVisualizeArray.push("\n时间段分析:");
analyticsRoom.getSlotStatistics().forEach(stat => {
  analyticsRoomVisualizeArray.push(
    `时段 ${stat.hour}:00 - ` +
    `当前: ${stat.currentStatus}, ` +
    `历史占用: ${stat.occupancyPercentage}`
  );
});
analyticsRoomVisualizeArray.push("\n时间段分析:");

analyticsRoomVisualizeArray.push("\n热点时段:");

analyticsRoom.getPeakHours().forEach(({ hour, count }) => {
  analyticsRoomVisualizeArray.push(`  时段 ${hour}:00 - ${count} 次请求`);
});
analyticsRoomVisualizeArray.push("\n热点时段:");

analyticsRoomVisualizeArray.push("\n优化建议:");
analyticsRoom.getOptimizationSuggestions().forEach(suggestion => {
  analyticsRoomVisualizeArray.push(suggestion);
});
analyticsRoomVisualizeArray.push("\n优化建议:");

// 测试批量操作
analyticsRoomVisualizeArray.push("\n批量操作测试:");
const bookingsToAdd = [
  { start: 0, end: 1, user: "Admin" },
  { start: 3, end: 4, user: "Admin" },
  { start: 6, end: 7, user: "Admin" }
];
analyticsRoomVisualizeArray.push("\n批量操作测试:");

const newBookingIds = analyticsRoom.batchBook(bookingsToAdd);
analyticsRoomVisualizeArray.push("批量预定结果:" + (newBookingIds.length > 0 ? "成功" : "失败"));
analyticsRoomVisualizeArray.push("\n新状态:");
analyticsRoomVisualizeArray.push(analyticsRoom.visualize());
analyticsRoomVisualizeArray.push("\nAlice的预定记录:");
const info1 = analyticsRoom.getUserBookings("Alice")
analyticsRoomVisualizeArray.push(JSON.stringify(info1));

analyticsRoomVisualizeArray.push("\n寻找2小时空闲时段:");
analyticsRoomVisualizeArray.push(JSON.stringify(analyticsRoom.findAvailableSlots(2)));

// 寻找空闲时段
analyticsRoomVisualizeArray.push("\n寻找2小时空闲时段:");
analyticsRoomVisualizeArray.push(JSON.stringify(analyticsRoom.findAvailableSlots(2)));

export default function  AnalyticsRoomVisualizeArray() {
  return (
    <div style={{
      width: '100%',
      height: '30vh'
    }}>
    {analyticsRoomVisualizeArray.map((item, index) => (
      <div key={index} style={{ whiteSpace: 'pre-wrap' }}>
        {Object.is(item, info1) ? JSON.stringify(item) : item}
      </div>
    ))}
    </div>
  )
}