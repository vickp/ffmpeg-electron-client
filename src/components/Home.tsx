import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { ipcRenderer } from 'electron';

const Home = () => {
  // convertBtn.addEventListener("click", (e) => {
  //   convertAll.innerText = `.\\ffmpeg -headers "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36" -i "${
  //     url.value
  //   }" -c copy -bsf:a aac_adtstoasc "${url.value.substring(-8)}.mp4"`;

  //   convertHour.innerText = `.\\ffmpeg -headers "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36" -i "${
  //     url.value
  //   }" -c copy -flags +global_header -f segment -segment_time 3600 -segment_format_options movflags=+faststart -reset_timestamps 1  "${url.value.substring(
  //     -8
  //   )}_60_%d.mp4"`;
  // });

  const [values, setValues] = useState({
    address: '',
  });

  const [result, setResult] = useState('');

  const generateAddr = (url: string) => {
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

    const agent = `"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36"`;

    setResult(
      `.\\\\ffmpeg -headers ${agent} -i "${url}" -c copy -flags +global_header -f segment -segment_time 3600 -segment_format_options movflags=+faststart -reset_timestamps 1 "${format}_%d.mp4"`
    );
  };

  const handleChange = (e: { target: { value: any } }) => {
    setValues({
      address: e.target.value,
    });
  };

  return (
    <div
      style={{
        width: 'inherit',
        height: 'inherit',
        overflow: 'hidden',
      }}
    >
      <Typography style={{ textAlign: 'center' }} variant="h4">
        FFmpeg Generator - Converting M3U8 to Command
      </Typography>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '64px',
        }}
      >
        <input
          type="text"
          onChange={handleChange}
          style={{ width: '306px', height: '28px' }}
        />
        <button
          type="button"
          onClick={() => {
            generateAddr(values?.address);
          }}
          style={{ width: '96px', height: '48px', marginLeft: '12px' }}
        >
          변환
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 'inherit',
          marginTop: '32px',
          overflow: 'hidden',
        }}
      >
        <Typography variant="body2" style={{ textAlign: 'center' }}>
          {result}
        </Typography>
      </div>
    </div>
  );
};

export default Home;
