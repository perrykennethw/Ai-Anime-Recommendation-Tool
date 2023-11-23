import PropTypes from 'prop-types';
import AnimeDisplayImages from '../base/AnimeDisplayImages.jsx';

export default function Modal({ onClose, chatData, chatLoading }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">   
                <AnimeDisplayImages
                    animeNames={Object.keys(chatData)}
                    loading={chatLoading}
                    isModal={true}
                    />
                <ul>
                    {Object.entries(chatData).map(([key, value]) => {
                        return (
                            <li className='text-slate-950 pb-5' key={key}>
                                <h3 className="text-lg font-bold mb-4">{key}</h3>
                                <p>{value}</p>
                            </li>
                        );
                    })}
                </ul>

                <button 
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    chatData: PropTypes.object.isRequired,
    chatLoading: PropTypes.bool.isRequired
};