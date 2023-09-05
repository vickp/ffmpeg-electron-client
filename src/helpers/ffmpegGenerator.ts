/* eslint-disable import/prefer-default-export */
import { getSecToMin } from '.';

type FFmpegOptions = {
  videoCodec?: 'libx264' | 'libx265' | 'other_video_codec';
  crf?: 0 | 18 | 20 | 22 | 24 | 26 | 28; // Specific CRF values you want to support
  audioCodec?: 'aac' | 'mp3' | 'other_audio_codec';
  audioBitrate?: '32k' | '64k' | '128k' | '192k' | '256k' | '320k'; // Specific bitrates you want to support
};

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

  generateFFmpegCommand = (
    inputFilePath: string,
    options: FFmpegOptions = {}
  ): string => {
    const {
      videoCodec = 'libx264',
      crf = 23,
      audioCodec = 'aac',
      audioBitrate = '128k',
    } = options;

    const outputFilePath = this.generateFileName(inputFilePath);

    const ffmpegCommand = `.\\\\ffmpeg -i ${inputFilePath} -c:v ${videoCodec} -crf ${crf} -c:a ${audioCodec} -b:a ${audioBitrate} ${outputFilePath}`;

    return ffmpegCommand;
  };

  generateCommand = (url: string, divideTime: number) => {
    const timeString = getSecToMin(divideTime);

    const inputFile = `-i "${url}"`;

    const fileName = this.generateFileName(url);

    const videoCodecOption = `-c:v libx264 -preset fast -crf 23`;

    const audioCodecOption = `-c:a aac -b:a 128k`;

    const codecOption = `${videoCodecOption} ${audioCodecOption}`;

    const res = `.\\\\ffmpeg ${inputFile} ${codecOption} -flags +global_header -f segment -segment_time ${timeString} -segment_format_options movflags=+faststart -reset_timestamps 1 "${fileName}_%d.mp4"`;

    return res;
  };
}

const ffmpegGenerator = new FFmpegGenerator();

export { ffmpegGenerator };
