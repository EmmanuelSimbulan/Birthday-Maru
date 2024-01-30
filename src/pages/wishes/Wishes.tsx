import "./Wishes.css";

import { useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";
import { usePalette } from "@roylee1997/react-palette";

import Progress from "../../components/Progress/Progress";
import MusicCard from "../../components/MusicCard/MusicCard";
import TMessagesData from "../../typings/MessagesData";

// albumArts
import firstAlbumArt from "../../assets/sampleData/red-album.webp";
import secondAlbumArt from "../../assets/sampleData/niki-album.jpeg";

// musicFilePaths
import firstMusic from "../../assets/sampleData/music/taylor.mp3";
import secondMusic from "../../assets/sampleData/music/Take-a-chance.mp3";

// framer transition and variants
const commonTransition = {
  ease: [0.43, 0.13, 0.23, 0.96],
  duration: 0.5,
};

const messageContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96],
      duration: 0.5,
    },
  },
};

const messages = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

/* Each message must have music details (can be fetched through an API) with Album Art to be must) and message itself in multiple p tags (if possible) */
// Sample Data
const sampleMessagesDataArray: TMessagesData[] = [
  {
    albumArt: firstAlbumArt,
    musicName: "The Moment I Knew 'turning 21' (Taylor's Version) - Taylor Swift",
    messageInParas: [
      "Hey there, Maru! It’s your birthday, and I wish you the happiest of birthdays filled with all the things you love the most.",
      "I hope you have achieved all your dreams and goals in life. I know you'll be a great nurse someday. So, I wish you can pass all the courses and exams you'll face this year. I know you can do it. Good luck, future nurse!",
      "Turning 21 is a big deal, and I hope you take a moment to appreciate how far you've come. Here's to you being the happiest version of yourself this year and in all the years ahead.",
      "I don’t know why I chose this song, 'The Moment I Knew' by Taylor Swift, but I feel that this song is magical and emotional. There are some people we wish were here in our special moments, like our birthdays. I know we are waiting for someone we love to come on this special day. I hope you will know that they are still here, protecting and guiding you, and wishing you well through the hardest times. Even if they are not physically present, I hope you will still have yourself as well as someone you can count on, like your family and friends. Who knows what the future holds?",
      "I hope you'll feel better. Happy Birthday again, Nurse Maru! 🥳🎂",
      "Tap the next page for more surprises! ➡️🎁",
    ],
    musicFilePath: firstMusic,
  },
  {
    albumArt: secondAlbumArt,
    musicName: 'Take A Chance With Me - Niki',
    messageInParas: [
      "Hi again, Nurse Maru! Happy Birthday!",

      "You know, I'm really grateful that I met you. Even though we don't know each other well and haven't met in person yet, would you like to ‘Take A Chance With Me’ to get to know each other better and spend some time together?",

      "I'm genuinely pleased to know you, and I'm eager to know you on a more personal level. I understand we're still getting to know each other, but would you be interested in joining me at the upcoming 'UP Fair: REV Music Festival' on February 17, 2024, Saturday? I have two tickets, and I'm willing to take a chance and invite you to come along with me.",
    ],
    musicFilePath: secondMusic,
  },
];

const Wishes = () => {
  const navigate = useNavigate();
  const { id = 0 } = useParams();

  if (Number(id) < 0 || sampleMessagesDataArray[Number(id)] == undefined) {
    return <p>Invalid Wish Message Id</p>;
  }

  const {
    data: colorData,
    loading: colorDataIsLoading,
    error,
  } = usePalette(sampleMessagesDataArray[Number(id)].albumArt);

  if (error) {
    return <h1>Invalid Wish Message Id</h1>;
  }

  return (
    <motion.main
      initial="initial"
      animate="animate"
      exit="exit"
      className="wishes-wrapper h-screen w-screen flex flex-col justify-between items-center"
    >
      <Progress
        primaryColor={colorData?.vibrant}
        secondaryColor={colorData?.darkVibrant}
        messageDataArrayLength={sampleMessagesDataArray.length}
      />
      <motion.div
        className="lg:w-11/12 rounded-t-2xl md:rounded-t-xl flex md:flex-row flex-col-reverse"
        style={{
          backgroundColor: colorDataIsLoading ? "#fff" : colorData?.vibrant,
        }}
        initial={{ y: "1000px" }}
        animate={{ y: "0px" }}
        exit={{ y: "1000px" }}
        transition={commonTransition}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.x > 50) {
            if (Number(id) > 0 && Number(id) < sampleMessagesDataArray.length) {
              navigate(`/wishes/${Number(id) - 1}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          } else if (info.offset.x < -50) {
            if (
              Number(id) >= 0 &&
              Number(id) < sampleMessagesDataArray.length - 1
            ) {
              navigate(`/wishes/${Number(id) + 1}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          } else {
            console.log(null);
          }
        }}
      >
        <motion.div
          className="md:w-1/2"
          initial="hidden"
          animate="show"
          variants={messageContainer}
        >
          {sampleMessagesDataArray[Number(id)].messageInParas.map(
            (eachPara, index) => {
              return (
                <motion.p
                  className="p-8 message text-3xl"
                  variants={messages}
                  key={index + 2045}
                >
                  {eachPara}
                </motion.p>
              );
            }
          )}
        </motion.div>
        <div className="md:w-1/2 h-1/2 md:h-auto flex justify-center items-center">
          <MusicCard
            albumArt={sampleMessagesDataArray[Number(id)].albumArt}
            primaryColor={colorData?.vibrant}
            musicName={sampleMessagesDataArray[Number(id)].musicName}
            musicFilePath={sampleMessagesDataArray[Number(id)].musicFilePath}
          />
        </div>
      </motion.div>
    </motion.main>
  );
};

export default Wishes;
