/* eslint-disable import/prefer-default-export */
import { getSecToMin } from '.';

class FFmpegGenerator {
  private generateNowTimeString = () => {
    const date = new Date();

    const [Y, M, D, H, m, s, ms] = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    ];

    const format = `${Y}-${M}-${D}-${H}-${m}-${s}-${ms}`;

    return format;
  };

  generateFileName = (url: string) => {
    let fileName = this.generateNowTimeString();

    if (url.match(/hls.live/g)) {
      const splitStr = url.split('/').slice(2, 5).join('_');
      fileName = splitStr;
    }

    return `${fileName}`;
  };

  generateCommand = (url: string, divideTime: number) => {
    const timeString = getSecToMin(divideTime);

    const CHROME_VER = '114.0.5735.134';

    const agent = `"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${CHROME_VER} Safari/537.36"`;

    const fileName = this.generateFileName(url);

    const res = `.\\\\ffmpeg -headers ${agent} -i "${url}" -c copy -flags +global_header -f segment -segment_time ${timeString} -segment_format_options movflags=+faststart -reset_timestamps 1 "${fileName}_%d.mp4"`;

    return res;
  };
}

const ffmpegGenerator = new FFmpegGenerator();

export { ffmpegGenerator };
