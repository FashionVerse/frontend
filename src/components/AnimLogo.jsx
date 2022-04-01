import Link from "../components/Link";
import { Box } from "@mui/material";
import {motion} from 'framer-motion';

export default function AnimLogo(props) {
  return (
    <>
    <Link href="/" noLinkStyle>
      <Box sx={{ display: "flex", alignItems: "center" }}>
    <motion.svg 
      height={props.size}
      width={props.size} viewBox="0 0 71 62" fill="none" xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path 
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{
          opacity: 0,
          rotate: -45,
          pathLength: 0, 
        }}
        animate={{
          opacity: 1,
          rotate: 0,
          pathLength: 1, 
        }}
        transition={{
          duration: 1.69,
          ease: 'anticipate',
          repeat: Infinity,
        repeatType: 'reverse',
        }}
        fill="url(#paint0_linear_256_262)"
        d="M70.2069 0.254883C70.4849 0.479889 70.5477 0.939828 70.3724 1.29885C68.7179 4.5868 67.0673 7.87476 65.4206 11.1627C65.227 11.5499 65.1277 11.6078 64.681 11.5945C64.2343 11.5813 63.7793 11.5796 63.3277 11.5763L34.2473 11.391L24.9955 11.3397C23.8176 11.3397 22.6396 11.3397 21.4616 11.3133C21.3329 11.302 21.2036 11.3271 21.0884 11.3856C20.9732 11.444 20.8767 11.5336 20.8098 11.6442C19.827 13.0174 18.8707 14.4121 17.8317 15.7456C16.5396 17.4116 15.1846 19.0247 13.861 20.6659C13.6685 20.9042 13.4906 21.1539 13.3283 21.4137C13.0801 21.8092 12.3456 21.8257 12.1073 21.4137C9.58483 17.1486 7.06509 12.8795 4.5481 8.60658C3.0999 6.15358 1.64949 3.70057 0.19688 1.24756C0.136907 1.15841 0.0711385 1.07329 0 0.992771L0 0.254883H70.2069Z"
      />
      <motion.path 
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{
          opacity: 0,
          rotate: -45,
          pathLength: 0, 
        }}
        animate={{
          opacity: 1,
          rotate: 0,
          pathLength: 1, 
        }}
        transition={{
          duration: 1.69,
          ease: 'anticipate',
          repeat: Infinity,
        repeatType: 'reverse',
        }}
        fill="url(#paint1_linear_256_262)"
        d="M27.8597 23.7051C27.9358 23.8441 27.9788 23.9301 28.0251 24.0145C33.3194 32.9552 38.6169 41.8932 43.9178 50.8283C44.1726 51.2568 44.1875 51.553 43.9062 51.9864C41.8365 55.12 39.7966 58.2734 37.7467 61.4169C37.4621 61.8553 37.0469 61.8536 36.7838 61.4169L26.3541 43.9805C22.2952 37.2061 18.2368 30.4316 14.1789 23.6572C13.719 22.8911 13.6958 22.9855 14.2501 22.2509C16.5663 19.189 18.8776 16.1244 21.1839 13.0571C21.2449 12.9697 21.3273 12.8996 21.4232 12.8532C21.5191 12.8069 21.6252 12.7859 21.7315 12.7923C31.5976 12.8078 41.4632 12.8194 51.3281 12.8271C51.4622 12.8271 51.5945 12.8172 51.7269 12.8172C52.205 12.8172 52.4449 13.2093 52.2116 13.6295L46.9984 23.0136C46.9289 23.1377 46.8528 23.2601 46.7933 23.3908C46.7491 23.496 46.6729 23.5846 46.5755 23.644C46.478 23.7034 46.3644 23.7306 46.2506 23.7217C42.0814 23.7217 37.9121 23.7178 33.7429 23.7101C31.9197 23.7101 30.0965 23.7101 28.2733 23.7101L27.8597 23.7051Z"
      />
          <motion.path 
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{
          opacity: 0,
          rotate: -45,
          pathLength: 0, 
        }}
        animate={{
          opacity: 1,
          rotate: 0,
          pathLength: 1, 
        }}
        transition={{
          duration: 1.69,
          ease: 'anticipate',
          repeat: Infinity,
        repeatType: 'reverse',
        }}
        fill="url(#paint2_linear_256_262)"
        d="M46.417 26.9247C46.5195 26.7494 46.5923 26.6303 46.6602 26.5095C48.2038 23.7283 49.7623 20.9571 51.2811 18.1644C52.0553 16.7383 52.7502 15.2708 53.4914 13.8264C53.6156 13.5706 53.7749 13.3334 53.9646 13.1216C54.0962 12.9996 54.2683 12.9307 54.4477 12.928C57.4687 12.9181 60.4909 12.9181 63.5141 12.928C63.668 12.928 63.8202 12.928 63.9741 12.928C64.4406 12.928 64.6706 13.3168 64.4505 13.7255C63.3476 15.7814 62.2485 17.8368 61.1532 19.8917C55.9141 29.6927 50.675 39.4937 45.4359 49.2947C45.3002 49.5478 45.2291 49.8621 44.8419 49.8721C44.4548 49.882 44.3671 49.571 44.2248 49.3228C40.3534 42.5947 36.4819 35.8665 32.6105 29.1384C32.0927 28.2384 31.5831 27.3334 31.0322 26.4532C30.5954 25.755 31.0652 25.4606 31.6642 25.3067C31.7658 25.2942 31.8686 25.2942 31.9702 25.3067H42.2974C43.3314 25.3067 44.3671 25.3067 45.4011 25.2984C45.5355 25.2886 45.669 25.327 45.7775 25.4067C45.8861 25.4865 45.9627 25.6024 45.9934 25.7335C46.1142 26.1091 46.2598 26.4863 46.417 26.9247Z"
      />
      <defs>
        <linearGradient id="paint0_linear_256_262" x1="39.7283" y1="0.915177" x2="39.1782" y2="21.8203" gradientUnits="userSpaceOnUse">
        <stop stop-color="#01F0FF"/>
        <stop offset="1" stop-color="#05213A"/>
        </linearGradient>
        <linearGradient id="paint1_linear_256_262" x1="35.5205" y1="14.2973" x2="30.3366" y2="61.4447" gradientUnits="userSpaceOnUse">
        <stop stop-color="#01F0FF"/>
        <stop offset="1" stop-color="#05213A"/>
        </linearGradient>
        <linearGradient id="paint2_linear_256_262" x1="49.845" y1="14.0575" x2="46.4604" y2="49.755" gradientUnits="userSpaceOnUse">
        <stop stop-color="#01F0FF"/>
        <stop offset="1" stop-color="#05213A"/>
        </linearGradient>
        </defs>
    </motion.svg> 
    {props.withText && props.children}
    </Box>
    </Link>
    </>
  )
}