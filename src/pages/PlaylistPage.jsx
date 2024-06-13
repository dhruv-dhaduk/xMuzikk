import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaylistMetaData from '../components/PlaylistMetaData.jsx';
import PlaylistFeed from '../components/PlaylistFeed.jsx';

function PlaylistPage() {
    const { documentId } = useParams();
    const [playlist, setPlaylist] = useState({
        owner: 'youtube',
        ytId: 'PLsm6x0zLuEYKUyUSORRbETUlzJZrIwvrS',
        title: 'Top Gujarati Garba Songs for Navratri - 2022',
        channelTitle: 'AllEvents',
        thumbnail: 'https://i.ytimg.com/vi/Jv8KRwF1zQs/maxresdefault.jpg',
        itemCount: 21,
        items: ["pGG_Zosn-qo","gBeBK9QQtv8","Jv8KRwF1zQs","Jh_VKJAEnUY","lfm-NIrZyV0","tTfF5klskmo","sDZA54sTqwQ","OPWik6jypxs","BmWkUAU1ktk","asYxxtiWUyw","dlz09a-pyPE","GZwvya3eFG0","ccqg6e2rfLU","YMrVf4O65Ss","Q_ZXz9Omq4k","P4OlI-ksWMM","46f6aPSXN7Y","vFORQ0vbadQ","C7u6rtswjCU","i4D2s21LboQ","KwUIzf3eM9I"]
    });
    const [playlistItems, setPlaylistItems] = useState([
        {
          "id": "Jv8KRwF1zQs",
          "title": "Moti Veraana | New Navratri Song 2020 | Songs of Faith | Amit Trivedi feat. Osman Mir | AT Azaad",
          "thumbnail": "https://i.ytimg.com/vi/Jv8KRwF1zQs/maxresdefault.jpg",
          "duration": "PT3M59S",
          "uploadTime": "2020-04-01T04:29:11Z",
          "channelTitle": "Amit Trivedi Azaad",
          "channelLink": "https://www.youtube.com/channel/UCV-l3a6kn4443HWJxPv4pVQ"
        },
        {
          "id": "lfm-NIrZyV0",
          "title": "Mor Bani Thanghat Kare - Full Audio Song | Deepika Padukone & Ranveer Singh",
          "thumbnail": "https://i.ytimg.com/vi/lfm-NIrZyV0/maxresdefault.jpg",
          "duration": "PT4M11S",
          "uploadTime": "2018-01-23T12:12:07Z",
          "channelTitle": "Eros Now Music",
          "channelLink": "https://www.youtube.com/channel/UCX52tYZiEh_mHoFja3Veciw"
        },
        {
          "id": "pGG_Zosn-qo",
          "title": "Gori Tame Manda Lidha Mohi Raj - Umesh Barot | Ishani Dave | Saiyar Mori Re | New Gujarati Song 2022",
          "thumbnail": "https://i.ytimg.com/vi/pGG_Zosn-qo/maxresdefault.jpg",
          "duration": "PT2M51S",
          "uploadTime": "2022-07-01T03:29:23Z",
          "channelTitle": "Saga Music Gujarati",
          "channelLink": "https://www.youtube.com/channel/UCJ53PHcdd0sPyzZwLtRSybA"
        },
        {
          "id": "gBeBK9QQtv8",
          "title": "Bandish Projekt - Dakla - Feat. @Aishwaryajoshimusic  & Mc Todfod  Music Video",
          "thumbnail": "https://i.ytimg.com/vi/gBeBK9QQtv8/maxresdefault.jpg",
          "duration": "PT4M17S",
          "uploadTime": "2016-09-21T12:14:37Z",
          "channelTitle": "Bandish Projekt",
          "channelLink": "https://www.youtube.com/channel/UCFBGbC39RzNUkYsN8_Y49yA"
        },
        {
          "id": "Jh_VKJAEnUY",
          "title": "Gangubai Kathiawadi | Dholida | Sanjay Leela Bhansali | Alia Bhatt | Official Video | Ajay Devgn",
          "thumbnail": "https://i.ytimg.com/vi/Jh_VKJAEnUY/maxresdefault.jpg",
          "duration": "PT2M48S",
          "uploadTime": "2022-02-10T05:36:28Z",
          "channelTitle": "Saregama Music",
          "channelLink": "https://www.youtube.com/channel/UC_A7K2dXFsTMAciGmnNxy-Q"
        }
    ]);
    
    return (
        <div className='laptop:flex laptop:justify-center laptop:items-start'>
            <div className='flex-1 laptop:max-w-[30rem] laptop:sticky top-header-height p-4 tablet:p-6'>
                <PlaylistMetaData playlist={playlist} />
            </div>

            <div className='flex-1 laptop:max-w-[60rem] tablet:py-6'>
                <PlaylistFeed playlistItems={playlistItems} />
            </div>
        </div>
    );
}

export default PlaylistPage;