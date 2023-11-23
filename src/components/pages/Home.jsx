import { useState } from 'react';
import OpenAI from "openai";
import CustomInput from '../base/CustomInput.jsx';
import SubmitButton from '../base/SubmitButton.jsx';
import AnimeDisplayImages from '../base/AnimeDisplayImages.jsx';
import { createPortal } from 'react-dom';
import Modal from './Modal.jsx';
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Add this line
});

function Home() {
  const [favAnime, setFavAnime] = useState(['Naruto', 'Dragon Ball Z', 'One Piece']);
  const [showModal, setShowModal] = useState(false);
  const [chatData, setChatData] = useState({});
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);  

  const setFavAnimeByIndex = (index, value) => {
    if (value === '') return;
    const currentFavs = [...favAnime];
    currentFavs[index] = value;
    setFavAnime(currentFavs);
  }

  async function fetchData(anime) {
    setChatLoading(true);
    try {
        const data = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: [
                {
                    role: "user",
                    content: `As a passionate anime enthusiast who has explored a vast array of anime, I seek recommendations that encapsulate the essence of my top three favorites: ${anime[0]}, ${anime[1]}, and ${anime[2]}. I'm interested in anime that blend elements present in these favorites. Could you suggest three anime, explaining for each how it resonates with the themes, styles, or narratives of my favorites? I would like this response to be returned to me as an object containing the recommendation name as the key and the value as the reason why you are recommending it. Answer in json format.`,
                },
            ],
            temperature: 1,
            max_tokens: 4095,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            response_format: { type: "json_object" },
        });
        setChatData(JSON.parse(data.choices[0].message.content));
        return;
    } catch (err) {
        setChatError(err);
    } finally {
        setChatLoading(false);
    }
  }

  const buttonClick = (e) => {
    e.preventDefault();
    fetchData(favAnime);
    setShowModal(true);
  }

  return (
    <>
      <h1 className='mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50 pb-10'>Not Sure What You Want To Watch But Looking For a Great Anime... <br /> I can help you with that!</h1>
      
      <form className="anime__favorite-anime" onSubmit={buttonClick}>
        <h2 className='text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50'> What are your three favorite anime? </h2>
        <br />
        <AnimeDisplayImages 
          animeNames={favAnime}
          isModal={false}
          />
        <br />
        <CustomInput placeholder="Naruto"  onBlur={e => setFavAnimeByIndex(0, e.target.value)}/>
        <CustomInput placeholder="Dragon Ball Z"  onBlur={e => setFavAnimeByIndex(1, e.target.value)}/>
        <CustomInput placeholder="One Piece" onBlur={e => setFavAnimeByIndex(2, e.target.value)}/>
        <br />
        <SubmitButton className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" value="Get Results!" />
        <br />
        {showModal && createPortal(
          <Modal chatData={chatData} chatLoading={chatLoading} onClose={() => setShowModal(false)} />,
          document.body
        )}
      </form>
    </>
  )
}

export default Home;
