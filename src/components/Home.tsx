/* eslint-disable no-alert */
import React, { useState } from 'react';
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { getSecToMin } from '../helpers';
import { version } from '../package.json';

const CHROME_VER = '113.0.5672.93';

const Home = () => {
  // convertBtn.addEventListener("click", (e) => {
  //   convertAll.innerText = `.\\ffmpeg -headers "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${CHROME_VER} Safari/537.36" -i "${
  //     url.value
  //   }" -c copy -bsf:a aac_adtstoasc "${url.value.substring(-8)}.mp4"`;

  //   convertHour.innerText = `.\\ffmpeg -headers "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${CHROME_VER} Safari/537.36" -i "${
  //     url.value
  //   }" -c copy -flags +global_header -f segment -segment_time 3600 -segment_format_options movflags=+faststart -reset_timestamps 1  "${url.value.substring(
  //     -8
  //   )}_60_%d.mp4"`;
  // });

  const [values, setValues] = useState({
    url: '',
  });
  const [divideTime, setDivideTime] = useState(30);
  const [result, setResult] = useState('');

  const copyToClipBoard = async (str: string) => {
    await window.navigator.clipboard.writeText(str);
    alert('Thank U! Text Copy Complete!');
  };

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

    const timeString = getSecToMin(divideTime);

    const agent = `"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${CHROME_VER} Safari/537.36"`;

    const res = `.\\\\ffmpeg -headers ${agent} -i "${url}" -c copy -flags +global_header -f segment -segment_time ${timeString} -segment_format_options movflags=+faststart -reset_timestamps 1 "${format}_%d.mp4"`;

    setResult(res);

    copyToClipBoard(res);

    return res;
  };

  const handleChange = (e: { target: { value: any } }) => {
    setValues({ url: e.target.value });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'inherit',
        overflow: 'hidden',
      }}
    >
      <Typography style={{ textAlign: 'center' }} variant="h4">
        FFmpeg Command Generator - M3U8 (v{version})
      </Typography>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#ffffffab',
          borderRadius: 26,
          margin: '24px 0 0 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '64px',
          }}
        >
          <TextField
            variant="outlined"
            color="primary"
            autoFocus
            onChange={handleChange}
            style={{
              width: '320px',
              height: 48,
              margin: '0 32px 0 0',
              padding: 0,
            }}
          />
          <Select
            value={divideTime}
            variant="outlined"
            style={{ width: 80, margin: '8px 24px 0 0' }}
            onChange={(e) => {
              setDivideTime(e.target.value as number);
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              generateAddr(values?.url);
            }}
            style={{ height: 48, margin: '8px 0 0 0', padding: 16 }}
          >
            <Typography variant="h6">변환 및 복사</Typography>
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            height: '100%',
            marginTop: '32px',
          }}
        >
          <TextField
            variant="outlined"
            fullWidth
            multiline
            value={result}
            style={{
              width: 800,
              height: 240,
              textAlign: 'center',
              padding: '32px',
              wordBreak: 'break-word',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
