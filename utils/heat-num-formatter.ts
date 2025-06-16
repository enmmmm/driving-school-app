/**
 * 短剧热度值格式化
 * @param num
 */
export default function heatNumFormatter(num: number) {
  if (num < 1000) {
    return num;
  } else if (num < 1000000) {
    return (num / 1000).toFixed(1) + "k";
  } else {
    return (num / 1000000).toFixed(1) + "M";
  }
}
