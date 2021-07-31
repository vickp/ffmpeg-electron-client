// const url = document.getElementById("url");
// const convertBtn = document.getElementById("convertBtn");
// const convertAll = document.getElementById("all");
// const convertHour = document.getElementById("hour");

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
