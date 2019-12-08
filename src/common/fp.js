export function h0(timestamp = Date.now()) {
  const target = new Date(timestamp);

  // 去除时分秒 设置为0
  target.setHours(0);
  target.setMinutes(0);
  target.setSeconds(0);
  target.setMilliseconds(0);

  return target.getTime();
}
